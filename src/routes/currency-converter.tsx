import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowLeftRight, RefreshCw, Coins, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/currency-converter")({
  head: () => ({
    meta: [
      { title: "محوّل العملات العالمية — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "حوّل بين العملات العالمية بأحدث الأسعار: دولار، يورو، ريال سعودي، درهم إماراتي، جنيه إسترليني، ريال يمني وغيرها.",
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
  const [to, setTo] = useState("SAR");
  const [rates, setRates] = useState<Rates | null>(null);
  const [base, setBase] = useState<string>("USD");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setBase(json.base_code || "USD");
      setUpdatedAt(json.time_last_update_utc || new Date().toUTCString());
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطأ غير معروف");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRates();
  }, []);

  const converted = useMemo(() => {
    if (!rates) return null;
    const amt = parseFloat(amount.replace(/,/g, ""));
    if (!isFinite(amt)) return null;
    const fromRate = rates[from];
    const toRate = rates[to];
    if (!fromRate || !toRate) return null;
    // base is USD: amount in USD = amt / fromRate, then * toRate
    return (amt / fromRate) * toRate;
  }, [amount, from, to, rates]);

  const singleRate = useMemo(() => {
    if (!rates) return null;
    const fromRate = rates[from];
    const toRate = rates[to];
    if (!fromRate || !toRate) return null;
    return (1 / fromRate) * toRate;
  }, [from, to, rates]);

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
            حوّل أي مبلغ بين أكثر من 20 عملة بأحدث الأسعار العالمية.
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

          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
            {loading && !rates ? (
              <p className="text-sm text-muted-foreground">جاري جلب الأسعار...</p>
            ) : error ? (
              <p className="text-sm font-semibold text-destructive">{error}</p>
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
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">أدخل مبلغاً صحيحاً</p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              {updatedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  آخر تحديث: {new Date(updatedAt).toLocaleString("ar")}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                fetchRates();
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
          المصدر: open.er-api.com (أسعار السوق العالمية، قد تختلف عن أسعار الصرّافين المحليين).
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
