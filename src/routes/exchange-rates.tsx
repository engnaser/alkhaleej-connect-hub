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
  Legend,
} from "recharts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { supabase } from "@/integrations/supabase/client";
import { syncExchangeRates } from "@/lib/exchangeRates.functions";
import {
  ArrowLeft,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Coins,
  MapPin,
  ExternalLink,
  AlertCircle,
  Clock,
  LineChart as LineChartIcon,
} from "lucide-react";

export const Route = createFileRoute("/exchange-rates")({
  head: () => ({
    meta: [
      { title: "أسعار صرف الريال اليمني اليوم — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "جدول أسعار صرف الريال اليمني في صنعاء وعدن مع وقت آخر تحديث ورسم بياني للتغيرات الأخيرة، وزر تزامن مباشر مع المصدر.",
      },
      { property: "og:title", content: "أسعار صرف الريال اليمني اليوم" },
      {
        property: "og:description",
        content: "جدول واضح للأسعار، رسم بياني للتغيرات، ومصدر مباشر من ye-rial.com.",
      },
    ],
  }),
  component: ExchangeRatesPage,
});

type Rate = {
  id: string;
  city: string;
  currency_code: string;
  currency_name: string;
  buy: number;
  sell: number;
  fetched_at: string;
};

type HistoryRow = {
  city: string;
  currency_code: string;
  buy: number;
  sell: number;
  captured_at: string;
};

const FLAGS: Record<string, string> = {
  USD: "🇺🇸",
  SAR: "🇸🇦",
  EUR: "🇪🇺",
  AED: "🇦🇪",
  KWD: "🇰🇼",
  OMR: "🇴🇲",
  QAR: "🇶🇦",
  GBP: "🇬🇧",
  EGP: "🇪🇬",
  JOD: "🇯🇴",
};

const CURRENCY_COLORS: Record<string, string> = {
  USD: "hsl(142 71% 45%)",
  SAR: "hsl(217 91% 60%)",
  EUR: "hsl(45 93% 47%)",
  AED: "hsl(280 65% 60%)",
};

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "قبل لحظات";
  if (diff < 3600) return `قبل ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `قبل ${Math.floor(diff / 3600)} ساعة`;
  return `قبل ${Math.floor(diff / 86400)} يوم`;
}

function ExchangeRatesPage() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const sync = useServerFn(syncExchangeRates);

  const load = useCallback(async () => {
    const [ratesRes, historyRes] = await Promise.all([
      supabase
        .from("exchange_rates")
        .select("id,city,currency_code,currency_name,buy,sell,fetched_at")
        .order("city", { ascending: true })
        .order("currency_code", { ascending: true }),
      supabase
        .from("exchange_rate_history")
        .select("city,currency_code,buy,sell,captured_at")
        .order("captured_at", { ascending: true })
        .limit(500),
    ]);
    if (ratesRes.error) setMessage({ type: "error", text: ratesRes.error.message });
    else setRates(ratesRes.data ?? []);
    if (!historyRes.error) setHistory(historyRes.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // pick a default active city when data lands
  useEffect(() => {
    if (!activeCity && rates.length) setActiveCity(rates[0].city);
  }, [rates, activeCity]);

  const handleSync = async () => {
    setSyncing(true);
    setMessage(null);
    try {
      const res = await sync();
      setMessage({ type: "success", text: `تم تحديث ${res.count} سعر بنجاح من المصدر.` });
      await load();
    } catch (e) {
      setMessage({
        type: "error",
        text: e instanceof Error ? e.message : "تعذّر التزامن مع المصدر.",
      });
    } finally {
      setSyncing(false);
    }
  };

  const cities = useMemo(
    () => Array.from(new Set(rates.map((r) => r.city))),
    [rates],
  );
  const cityRates = useMemo(
    () => rates.filter((r) => r.city === activeCity),
    [rates, activeCity],
  );

  // Build chart series for active city — one line per currency (sell price)
  const chartData = useMemo(() => {
    if (!activeCity) return { points: [], codes: [] as string[] };
    const filtered = history.filter((h) => h.city === activeCity);
    const codes = Array.from(new Set(filtered.map((h) => h.currency_code)));
    // group by timestamp bucket (minute)
    const byTime = new Map<string, Record<string, number | string>>();
    for (const h of filtered) {
      const ts = new Date(h.captured_at);
      const key = ts.toISOString();
      const label = ts.toLocaleString("ar", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const row = byTime.get(key) ?? { _t: key, label };
      row[h.currency_code] = h.sell;
      byTime.set(key, row);
    }
    const points = [...byTime.values()].sort((a, b) =>
      String(a._t).localeCompare(String(b._t)),
    );
    return { points, codes };
  }, [history, activeCity]);

  const lastFetched = rates[0]?.fetched_at;

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            كل الخدمات
          </Link>
        }
      />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                <Coins className="h-3.5 w-3.5" />
                أسعار الصرف
              </div>
              <h1 className="text-balance text-3xl font-black text-primary sm:text-4xl">
                أسعار صرف الريال اليمني اليوم
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                جدول واضح لأسعار العملات في صنعاء وعدن مع وقت آخر تحديث ورسم بياني للتغيرات
                الأخيرة. اضغط زر التزامن لجلب أحدث الأسعار مباشرة من المصدر.
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] disabled:opacity-60"
                >
                  <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "جاري التزامن..." : "تزامن الأسعار الآن"}
                </button>
                <a
                  href="https://ye-rial.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/40"
                >
                  <ExternalLink className="h-4 w-4" />
                  المصدر: ye-rial.com
                </a>
              </div>

              {lastFetched && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  آخر تحديث:{" "}
                  <span className="text-foreground">
                    {new Date(lastFetched).toLocaleString("ar", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                  <span className="text-muted-foreground">· {timeAgo(lastFetched)}</span>
                </div>
              )}

              {message && (
                <div
                  className={`inline-flex max-w-xl items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold ${
                    message.type === "success"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-destructive/40 bg-destructive/10 text-destructive"
                  }`}
                >
                  <AlertCircle className="h-4 w-4" />
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {loading ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              جاري التحميل...
            </div>
          ) : rates.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                لا توجد بيانات حتى الآن. اضغط زر <strong>"تزامن الأسعار الآن"</strong> للحصول
                على أحدث الأسعار.
              </p>
            </div>
          ) : (
            <>
              {/* City tabs */}
              {cities.length > 0 && (
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                  {cities.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCity(c)}
                      className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-bold transition-all ${
                        activeCity === c
                          ? "border-primary bg-primary text-primary-foreground shadow-md"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {/* Table */}
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary/40 px-5 py-3">
                  <h2 className="text-base font-extrabold text-foreground">
                    أسعار الصرف في {activeCity}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {cityRates.length} عملة
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/20 text-xs font-bold text-muted-foreground">
                        <th className="px-5 py-3 text-right">العملة</th>
                        <th className="px-5 py-3 text-right">الرمز</th>
                        <th className="px-5 py-3 text-left">
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <TrendingDown className="h-3.5 w-3.5" /> شراء
                          </span>
                        </th>
                        <th className="px-5 py-3 text-left">
                          <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
                            <TrendingUp className="h-3.5 w-3.5" /> بيع
                          </span>
                        </th>
                        <th className="px-5 py-3 text-left">الفارق</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {cityRates.map((r) => {
                        const spread = (r.sell - r.buy).toFixed(2);
                        return (
                          <tr
                            key={r.id}
                            className="transition-colors hover:bg-secondary/30"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl" aria-hidden>
                                  {FLAGS[r.currency_code] ?? "💱"}
                                </span>
                                <span className="font-bold text-foreground">
                                  {r.currency_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4 font-mono text-xs font-semibold text-muted-foreground">
                              {r.currency_code}
                            </td>
                            <td className="px-5 py-4 text-left font-mono text-base font-extrabold text-foreground">
                              {r.buy.toLocaleString("en")}
                            </td>
                            <td className="px-5 py-4 text-left font-mono text-base font-extrabold text-foreground">
                              {r.sell.toLocaleString("en")}
                            </td>
                            <td className="px-5 py-4 text-left font-mono text-xs font-semibold text-muted-foreground">
                              {spread}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary/40 px-5 py-3">
                  <h2 className="inline-flex items-center gap-2 text-base font-extrabold text-foreground">
                    <LineChartIcon className="h-4 w-4 text-primary" />
                    تغيرات أسعار البيع — {activeCity}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    آخر {chartData.points.length} لقطة
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  {chartData.points.length < 2 ? (
                    <div className="flex h-56 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                      <LineChartIcon className="h-6 w-6 opacity-40" />
                      <p>
                        لا توجد بيانات تاريخية كافية بعد. كل ضغطة على زر{" "}
                        <strong>التزامن</strong> تُسجّل لقطة جديدة وتظهر هنا.
                      </p>
                    </div>
                  ) : (
                    <div className="h-64 w-full" dir="ltr">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData.points} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                            tickLine={false}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                          />
                          <YAxis
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                            tickLine={false}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                            domain={["auto", "auto"]}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: 12,
                              fontSize: 12,
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: 12 }} />
                          {chartData.codes.map((code) => (
                            <Line
                              key={code}
                              type="monotone"
                              dataKey={code}
                              name={`${FLAGS[code] ?? ""} ${code}`}
                              stroke={CURRENCY_COLORS[code] ?? "hsl(var(--primary))"}
                              strokeWidth={2.5}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                              connectNulls
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <p className="mt-8 text-center text-xs text-muted-foreground">
            البيانات مأخوذة من{" "}
            <a
              href="https://ye-rial.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-primary hover:underline"
            >
              ye-rial.com
            </a>{" "}
            وتُحدّث عند الضغط على زر التزامن.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
