import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowLeftRight, RefreshCw, Coins, TrendingUp, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/currency-converter")({
  head: () => ({
    meta: [
      { title: "محوّل العملات العالمية — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "حوّل بين العملات العالمية بأحدث الأسعار: دولار، يورو، ريال سعودي، درهم إماراتي، جنيه إسترليني، ريال يمني (صنعاء/عدن) وغيرها.",
      },
      { property: "og:title", content: "محوّل العملات العالمية" },
      {
        property: "og:description",
        content: "أداة سريعة لتحويل أي مبلغ بين العملات العالمية بأحدث الأسعار.",
      },
    ],
  }),
  component: CurrencyConverterPage,
});

type Rates = Record<string, number>;
type YerCity = "صنعاء" | "عدن";

const CURRENCIES: { code: string; ar: string; flag: string }[] = [
  { code: "USD", ar: "دولار أمريكي", flag: "🇺🇸" },
  { code: "EUR", ar: "يورو", flag: "🇪🇺" },
  { code: "GBP", ar: "جنيه إسترليني", flag: "🇬🇧" },
  { code: "SAR", ar: "ريال سعودي", flag: "🇸🇦" },
  { code: "AED", ar: "درهم إماراتي", flag: "🇦🇪" },
  { code: "KWD", ar: "دينار كويتي", flag: "🇰🇼" },
  { code: "QAR", ar: "ريال قطري", flag: "🇶🇦" },
  { code: "BHD", ar: "دينار بحريني", flag: "🇧🇭" },
  { code: "OMR", ar: "ريال عماني", flag: "🇴🇲" },
  { code: "YER", ar: "ريال يمني", flag: "🇾🇪" },
  { code: "EGP", ar: "جنيه مصري", flag: "🇪🇬" },
  { code: "JOD", ar: "دينار أردني", flag: "🇯🇴" },
  { code: "TRY", ar: "ليرة تركية", flag: "🇹🇷" },
  { code: "CNY", ar: "يوان صيني", flag: "🇨🇳" },
  { code: "JPY", ar: "ين ياباني", flag: "🇯🇵" },
  { code: "INR", ar: "روبية هندية", flag: "🇮🇳" },
  { code: "CAD", ar: "دولار كندي", flag: "🇨🇦" },
  { code: "AUD", ar: "دولار أسترالي", flag: "🇦🇺" },
  { code: "CHF", ar: "فرنك سويسري", flag: "🇨🇭" },
  { code: "RUB", ar: "روبل روسي", flag: "🇷🇺" },
];

function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("YER");
  const [rates, setRates] = useState<Rates | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Local YER rates (per 1 USD) from our DB — separate Sanaa/Aden markets
  const [yerCity, setYerCity] = useState<YerCity>("صنعاء");
  const [yerRates, setYerRates] = useState<Record<YerCity, number | null>>({
    "صنعاء": null,
    "عدن": null,
  });
  const [yerUpdatedAt, setYerUpdatedAt] = useState<string | null>(null);

  async function fetchRates() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const json = await res.json();
      if (json.result !== "success" || !json.rates) {
        throw new Error("فشل جلب الأسعار");
      }
      setRates(json.rates as Rates);
      setUpdatedAt(json.time_last_update_utc || new Date().toUTCString());
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطأ غير معروف");
    } finally {
      setLoading(false);
    }
  }

  async function fetchYerRates() {
    const { data, error } = await supabase
      .from("exchange_rates")
      .select("city,currency_code,buy,sell,fetched_at")
      .eq("currency_code", "USD")
      .in("city", ["صنعاء", "عدن"]);
    if (error || !data) return;
    const next: Record<YerCity, number | null> = { "صنعاء": null, "عدن": null };
    let latest: string | null = null;
    for (const row of data as Array<{ city: string; buy: number; sell: number; fetched_at: string }>) {
      if (row.city === "صنعاء" || row.city === "عدن") {
        // mid-market rate between buy/sell
        next[row.city] = (Number(row.buy) + Number(row.sell)) / 2;
        if (!latest || row.fetched_at > latest) latest = row.fetched_at;
      }
    }
    setYerRates(next);
    setYerUpdatedAt(latest);
  }

  useEffect(() => {
    fetchRates();
    fetchYerRates();
  }, []);

  // Build effective rates: override YER with local Sanaa/Aden rate when available
  const effectiveRates = useMemo<Rates | null>(() => {
    if (!rates) return null;
    const local = yerRates[yerCity];
    if (local && local > 0) {
      return { ...rates, YER: local };
    }
    return rates;
  }, [rates, yerRates, yerCity]);

  const involvesYer = from === "YER" || to === "YER";

  const converted = useMemo(() => {
    if (!effectiveRates) return null;
    const amt = parseFloat(amount.replace(/,/g, ""));
    if (!isFinite(amt)) return null;
    const fromRate = effectiveRates[from];
    const toRate = effectiveRates[to];
    if (!fromRate || !toRate) return null;
    return (amt / fromRate) * toRate;
  }, [amount, from, to, effectiveRates]);

  const singleRate = useMemo(() => {
    if (!effectiveRates) return null;
    const fromRate = effectiveRates[from];
    const toRate = effectiveRates[to];
    if (!fromRate || !toRate) return null;
    return (1 / fromRate) * toRate;
  }, [from, to, effectiveRates]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const format = (n: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: n < 1 ? 6 : 4,
    }).format(n);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Coins className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black text-primary sm:text-4xl">
            محوّل العملات العالمية
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            حوّل أي مبلغ بين أكثر من 20 عملة بأحدث الأسعار العالمية، مع دعم سعر صرف صنعاء وعدن للريال اليمني.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          <label className="mb-2 block text-sm font-bold">المبلغ</label>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-left text-lg font-bold text-foreground focus:border-primary focus:outline-none"
            dir="ltr"
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <div>
              <label className="mb-2 block text-sm font-bold">من</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-sm font-semibold focus:border-primary focus:outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.ar} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={swap}
              className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-primary transition-transform hover:scale-110"
              aria-label="عكس العملات"
            >
              <ArrowLeftRight className="h-5 w-5" />
            </button>

            <div>
              <label className="mb-2 block text-sm font-bold">إلى</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-sm font-semibold focus:border-primary focus:outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.ar} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {involvesYer && (
            <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400">
                <MapPin className="h-4 w-4" />
                سعر صرف الريال اليمني (YER)
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["صنعاء", "عدن"] as YerCity[]).map((city) => {
                  const r = yerRates[city];
                  const active = yerCity === city;
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setYerCity(city)}
                      className={`rounded-lg border px-3 py-2.5 text-right transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <div className="text-sm font-bold">{city}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground" dir="ltr">
                        {r ? `1 USD ≈ ${format(r)} YER` : "غير متوفر"}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                المصدر: ye-rial.com (متوسط بين الشراء والبيع). استخدم زر التحديث أدناه لجلب أحدث الأسعار.
              </p>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
            {loading && !rates ? (
              <p className="text-sm text-muted-foreground">جاري جلب الأسعار...</p>
            ) : error ? (
              <p className="text-sm font-semibold text-destructive">{error}</p>
            ) : involvesYer && !yerRates[yerCity] ? (
              <p className="text-sm font-semibold text-amber-600">
                سعر الريال اليمني ({yerCity}) غير متوفر. حدّث الأسعار من صفحة "أسعار الصرف".
              </p>
            ) : converted !== null ? (
              <>
                <p className="text-xs text-muted-foreground">النتيجة</p>
                <p
                  className="mt-1 text-3xl font-black text-primary sm:text-4xl"
                  dir="ltr"
                >
                  {format(converted)}{" "}
                  <span className="text-base font-bold text-foreground">{to}</span>
                </p>
                {singleRate && (
                  <p className="mt-2 text-xs text-muted-foreground" dir="ltr">
                    1 {from} = {format(singleRate)} {to}
                    {involvesYer ? ` (${yerCity})` : ""}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">أدخل مبلغاً صحيحاً</p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground space-y-1">
              {updatedAt && (
                <div className="inline-flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  أسعار عالمية: {new Date(updatedAt).toLocaleString("ar")}
                </div>
              )}
              {involvesYer && yerUpdatedAt && (
                <div className="block">
                  ريال يمني ({yerCity}): {new Date(yerUpdatedAt).toLocaleString("ar")}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={async () => {
                await Promise.all([fetchRates(), fetchYerRates()]);
                toast.success("تم تحديث الأسعار");
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              تحديث الأسعار
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          الأسعار العالمية: open.er-api.com — أسعار الريال اليمني من ye-rial.com (صنعاء/عدن). قد تختلف عن أسعار الصرّافين المحليين.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
