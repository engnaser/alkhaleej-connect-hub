import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { supabase } from "@/integrations/supabase/client";
import { syncGoldPrices } from "@/lib/goldPrices.functions";
import {
  ArrowLeft,
  RefreshCw,
  Coins,
  ExternalLink,
  AlertCircle,
  Clock,
  LineChart as LineChartIcon,
  Copy,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/gold-prices")({
  head: () => ({
    meta: [
      { title: "أسعار الذهب في اليمن اليوم — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "أسعار الذهب اليوم في اليمن: عيار 24 و 21 و 18 بالريال اليمني والدولار، مع رسم بياني للتغيرات وزر تزامن مع المصدر.",
      },
      { property: "og:title", content: "أسعار الذهب في اليمن اليوم" },
      {
        property: "og:description",
        content:
          "جدول أسعار الذهب في اليمن مع تحديث لحظي ورسم بياني للتغيرات.",
      },
      {
        property: "og:url",
        content: "https://alkhaleej-connect-hub.lovable.app/gold-prices",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://alkhaleej-connect-hub.lovable.app/gold-prices",
      },
    ],
  }),
  component: GoldPricesPage,
});

type GoldRow = {
  id: string;
  karat: string;
  label: string;
  city: string;
  price_yer: number;
  price_usd: number | null;
  fetched_at: string;
  sort_order: number;
};

type HistoryRow = {
  karat: string;
  city: string;
  price_yer: number;
  captured_at: string;
};

const CITIES = ["صنعاء", "عدن"] as const;
type City = (typeof CITIES)[number];


const HIGHLIGHTED_KARATS = new Set(["24", "21", "18"]);

const KARAT_ACCENT: Record<string, string> = {
  "24": "from-amber-400 to-yellow-500",
  "22": "from-amber-300 to-yellow-400",
  "21": "from-yellow-400 to-amber-500",
  "18": "from-yellow-300 to-amber-400",
  "14": "from-orange-300 to-amber-400",
  "9": "from-neutral-300 to-neutral-400",
  pound: "from-yellow-500 to-amber-600",
  ounce: "from-amber-500 to-orange-600",
};

function formatYER(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
function formatUSD(n: number | null) {
  if (n == null) return "-";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "الآن";
  if (m < 60) return `منذ ${m} دقيقة`;
  const h = Math.floor(m / 60);
  if (h < 24) return `منذ ${h} ساعة`;
  const d = Math.floor(h / 24);
  return `منذ ${d} يوم`;
}

function GoldPricesPage() {
  const [allRows, setAllRows] = useState<GoldRow[]>([]);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedKarat, setSelectedKarat] = useState("24");
  const [city, setCity] = useState<City>("صنعاء");
  const sync = useServerFn(syncGoldPrices);

  const load = useCallback(async () => {
    setError(null);
    const { data, error: e } = await supabase
      .from("gold_prices")
      .select("id,karat,label,city,price_yer,price_usd,fetched_at,sort_order")
      .order("sort_order", { ascending: true });
    if (e) {
      setError(e.message);
    } else {
      setAllRows((data as GoldRow[]) ?? []);
    }

    const sinceIso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: hist } = await supabase
      .from("gold_price_history")
      .select("karat,city,price_yer,captured_at")
      .gte("captured_at", sinceIso)
      .order("captured_at", { ascending: true });
    if (hist) setHistory(hist as HistoryRow[]);
    setLoading(false);
  }, []);


  useEffect(() => {
    load();
  }, [load]);

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    setMessage(null);
    try {
      const res = await sync();
      setMessage(`تم التحديث بنجاح: ${res.count} عيار.`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذّر التزامن");
    } finally {
      setSyncing(false);
    }
  };

  const copyText = async (karat: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(karat);
      setTimeout(() => setCopied((c) => (c === karat ? null : c)), 1500);
    } catch {
      /* ignore */
    }
  };

  const lastUpdated = rows[0]?.fetched_at;

  const chartData = useMemo(() => {
    const filtered = history.filter((h) => h.karat === selectedKarat);
    return filtered.map((h) => ({
      date: new Date(h.captured_at).toLocaleDateString("ar", {
        month: "short",
        day: "numeric",
      }),
      price: h.price_yer,
    }));
  }, [history, selectedKarat]);

  const availableKarats = useMemo(
    () => rows.map((r) => ({ karat: r.karat, label: r.label })),
    [rows],
  );

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            كل الخدمات
          </Link>
        }
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg">
            <Coins className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black text-primary sm:text-4xl">
            أسعار الذهب في اليمن اليوم
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            جدول محدث لأسعار الذهب في اليمن بمختلف العيارات (24، 21، 18) بالريال
            اليمني والدولار، مع رسم بياني للتغيرات الشهرية.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {lastUpdated ? (
              <span>
                آخر تحديث:{" "}
                <span className="font-bold text-foreground">
                  {timeAgo(lastUpdated)}
                </span>
              </span>
            ) : (
              <span>لم يتم التحديث بعد</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://gold-price-today.com/yemen"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              المصدر
            </a>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`}
              />
              {syncing ? "جاري التزامن..." : "تزامن الأسعار"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm font-semibold text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm font-semibold text-primary">
            {message}
          </div>
        )}

        {/* Highlighted karats */}
        {rows.length > 0 && (
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {rows
              .filter((r) => HIGHLIGHTED_KARATS.has(r.karat))
              .map((r) => (
                <div
                  key={r.id}
                  className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${
                    KARAT_ACCENT[r.karat] ?? "from-amber-400 to-yellow-500"
                  } p-5 text-white shadow-[var(--shadow-elevated)]`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold opacity-90">{r.label}</div>
                    <Coins className="h-5 w-5 opacity-80" />
                  </div>
                  <div className="mt-3">
                    <div className="text-3xl font-black">
                      {formatYER(r.price_yer)}
                    </div>
                    <div className="text-xs font-semibold opacity-90">
                      ريال يمني / جرام
                    </div>
                  </div>
                  {r.price_usd != null && (
                    <div className="mt-1 text-sm font-bold opacity-95">
                      ≈ {formatUSD(r.price_usd)} $
                    </div>
                  )}
                  <button
                    onClick={() =>
                      copyText(
                        r.karat,
                        `${r.label}: ${formatYER(r.price_yer)} ريال يمني / جرام`,
                      )
                    }
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur hover:bg-white/30"
                  >
                    {copied === r.karat ? (
                      <>
                        <Check className="h-3 w-3" />
                        تم النسخ
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        نسخ
                      </>
                    )}
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Full table */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="border-b border-border bg-secondary/40 px-5 py-3 text-sm font-extrabold text-foreground">
            جميع العيارات
          </div>
          {loading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              جاري التحميل...
            </div>
          ) : rows.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              لا توجد بيانات. اضغط "تزامن الأسعار" لجلب أحدث الأسعار.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-secondary/20 text-xs font-bold text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">العيار</th>
                    <th className="px-4 py-3">السعر (ريال يمني)</th>
                    <th className="px-4 py-3">السعر (دولار)</th>
                    <th className="px-4 py-3">نسخ</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-border transition-colors hover:bg-secondary/30"
                    >
                      <td className="px-4 py-3 font-bold text-foreground">
                        {r.label}
                      </td>
                      <td
                        className="px-4 py-3 font-extrabold text-primary"
                        dir="ltr"
                      >
                        {formatYER(r.price_yer)}
                      </td>
                      <td className="px-4 py-3 text-foreground" dir="ltr">
                        {formatUSD(r.price_usd)} $
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            copyText(
                              `t-${r.karat}`,
                              `${r.label}: ${formatYER(r.price_yer)} ريال يمني / جرام`,
                            )
                          }
                          className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-bold text-foreground hover:border-primary/40"
                        >
                          {copied === `t-${r.karat}` ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Chart */}
        {availableKarats.length > 0 && (
          <div className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-extrabold text-foreground">
                <LineChartIcon className="h-4 w-4 text-primary" />
                رسم بياني للتغيرات (آخر 30 يوم)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {availableKarats.map((k) => (
                  <button
                    key={k.karat}
                    onClick={() => setSelectedKarat(k.karat)}
                    className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                      selectedKarat === k.karat
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {k.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 w-full">
              {chartData.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} width={70} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="grid h-full place-items-center text-sm text-muted-foreground">
                  اضغط "تزامن الأسعار" عدة مرات في أيام مختلفة لبناء تاريخ
                  للأسعار.
                </div>
              )}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
          <div className="mb-2 font-bold text-foreground">ملاحظات:</div>
          <ul className="list-inside list-disc space-y-1">
            <li>الأسعار مأخوذة من مصدر خارجي وقد تختلف قليلاً حسب المدينة والصائغ.</li>
            <li>الأسعار للجرام الواحد ما عدا الجنيه (8 جرامات) والأونصة (31.1 جرام).</li>
            <li>اضغط "تزامن الأسعار" للحصول على آخر تحديث من المصدر مباشرة.</li>
          </ul>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
