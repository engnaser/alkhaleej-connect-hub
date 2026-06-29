import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
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
} from "lucide-react";

export const Route = createFileRoute("/exchange-rates")({
  head: () => ({
    meta: [
      { title: "أسعار صرف الريال اليمني اليوم — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "تابع أسعار صرف الريال اليمني مقابل الدولار والريال السعودي في صنعاء وعدن مباشرة من المصدر مع زر تزامن لتحديث الأسعار لحظياً.",
      },
      { property: "og:title", content: "أسعار صرف الريال اليمني اليوم" },
      {
        property: "og:description",
        content: "أسعار الصرف مباشرة من ye-rial.com مع زر تزامن لتحديث الأسعار.",
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

function ExchangeRatesPage() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const sync = useServerFn(syncExchangeRates);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("exchange_rates")
      .select("id,city,currency_code,currency_name,buy,sell,fetched_at")
      .order("city", { ascending: true })
      .order("currency_code", { ascending: true });
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setRates(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSync = async () => {
    setSyncing(true);
    setMessage(null);
    try {
      const res = await sync();
      setMessage({
        type: "success",
        text: `تم تحديث ${res.count} سعر بنجاح من المصدر.`,
      });
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

  // group by city
  const byCity = rates.reduce<Record<string, Rate[]>>((acc, r) => {
    (acc[r.city] ||= []).push(r);
    return acc;
  }, {});

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
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Coins className="h-3.5 w-3.5" />
              أسعار الصرف
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-4xl">
              أسعار صرف الريال اليمني اليوم
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              أسعار صرف الريال اليمني مقابل أبرز العملات في صنعاء وعدن، مأخوذة مباشرة من
              المصدر. اضغط زر التزامن لتحديث الأسعار لحظياً.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
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
              <p className="mt-4 text-xs text-muted-foreground">
                آخر تحديث:{" "}
                <span className="font-semibold text-foreground">
                  {new Date(lastFetched).toLocaleString("ar", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </p>
            )}

            {message && (
              <div
                className={`mx-auto mt-5 inline-flex max-w-xl items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold ${
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
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
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
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(byCity).map(([city, list]) => (
                <div
                  key={city}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-5 py-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h2 className="text-base font-extrabold text-foreground">
                      أسعار الصرف في {city}
                    </h2>
                  </div>
                  <div className="divide-y divide-border">
                    {list.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between gap-3 px-5 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl" aria-hidden>
                            {FLAGS[r.currency_code] ?? "💱"}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-foreground">
                              {r.currency_name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {r.currency_code}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-left">
                          <div>
                            <div className="flex items-center justify-end gap-1 text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                              <TrendingDown className="h-3 w-3" />
                              شراء
                            </div>
                            <div className="font-mono text-base font-extrabold text-foreground">
                              {r.buy.toLocaleString("en")}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-end gap-1 text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">
                              <TrendingUp className="h-3 w-3" />
                              بيع
                            </div>
                            <div className="font-mono text-base font-extrabold text-foreground">
                              {r.sell.toLocaleString("en")}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
