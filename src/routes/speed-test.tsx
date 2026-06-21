import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useState, useRef } from "react";
import { SiteFooter } from "@/components/site-footer";
import {
  Gauge,
  Download,
  Upload,
  Activity,
  RotateCcw,
  Share2,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";

export const Route = createFileRoute("/speed-test")({
  head: () => ({
    meta: [
      { title: "فحص سرعة الإنترنت — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "اختبر سرعة اتصالك بالإنترنت: التحميل والرفع وزمن الاستجابة (Ping) بسهولة من المتصفح.",
      },
      { property: "og:title", content: "فحص سرعة الإنترنت — الخليج تيليكوم" },
      {
        property: "og:description",
        content:
          "أداة احترافية لقياس سرعة الإنترنت من داخل المتصفح بدون تسجيل دخول.",
      },
    ],
  }),
  component: SpeedTestPage,
});

const WHATSAPP = "967775608601";

type Phase = "idle" | "ping" | "download" | "upload" | "done" | "error";

interface Result {
  download: number; // Mbps
  upload: number; // Mbps
  ping: number; // ms
  quality: string;
}

function qualityFor(downloadMbps: number, pingMs: number): string {
  if (downloadMbps >= 50 && pingMs < 60) return "ممتاز";
  if (downloadMbps >= 20 && pingMs < 120) return "جيد";
  if (downloadMbps >= 5) return "متوسط";
  return "ضعيف";
}

function qualityColor(q: string): string {
  if (q === "ممتاز") return "text-emerald-400";
  if (q === "جيد") return "text-primary";
  if (q === "متوسط") return "text-amber-400";
  return "text-red-400";
}

function SpeedTestPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const measurePing = async (): Promise<number> => {
    const samples: number[] = [];
    for (let i = 0; i < 5; i++) {
      const start = performance.now();
      try {
        await fetch(`/favicon.ico?ping=${Date.now()}-${i}`, {
          cache: "no-store",
          method: "GET",
        });
      } catch {
        // ignore single failures
      }
      samples.push(performance.now() - start);
      setProgress(((i + 1) / 5) * 100);
    }
    samples.sort((a, b) => a - b);
    const trimmed = samples.slice(1, -1);
    const avg =
      trimmed.reduce((a, b) => a + b, 0) / Math.max(trimmed.length, 1);
    return Math.max(1, Math.round(avg));
  };

  const measureDownload = async (signal: AbortSignal): Promise<number> => {
    // Use a public, CORS-enabled CDN test file. ~5MB.
    const urls = [
      "https://speed.cloudflare.com/__down?bytes=5000000",
      "https://proof.ovh.net/files/10Mb.dat",
    ];
    for (const url of urls) {
      try {
        const start = performance.now();
        const res = await fetch(`${url}&_=${Date.now()}`.replace("&_", url.includes("?") ? "&_" : "?_"), {
          cache: "no-store",
          signal,
        });
        if (!res.ok || !res.body) continue;
        const reader = res.body.getReader();
        let received = 0;
        const total = Number(res.headers.get("content-length")) || 5_000_000;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value?.length ?? 0;
          setProgress(Math.min(99, (received / total) * 100));
        }
        const seconds = (performance.now() - start) / 1000;
        if (seconds <= 0 || received <= 0) continue;
        const mbps = (received * 8) / seconds / 1_000_000;
        setProgress(100);
        return Math.max(0.1, Number(mbps.toFixed(2)));
      } catch {
        continue;
      }
    }
    throw new Error("download_failed");
  };

  const measureUpload = async (signal: AbortSignal): Promise<number> => {
    // Upload a 2MB random payload to a CORS-enabled echo endpoint.
    const size = 2 * 1024 * 1024;
    const payload = new Uint8Array(size);
    // light fill to avoid all-zero compression
    for (let i = 0; i < size; i += 1024) payload[i] = i & 0xff;

    const endpoints = ["https://speed.cloudflare.com/__up"];
    for (const url of endpoints) {
      try {
        const start = performance.now();
        // simulate progress while uploading
        let p = 0;
        const interval = setInterval(() => {
          p = Math.min(95, p + 5);
          setProgress(p);
        }, 100);
        const res = await fetch(url, {
          method: "POST",
          body: payload,
          signal,
          cache: "no-store",
        });
        clearInterval(interval);
        if (!res.ok) continue;
        const seconds = (performance.now() - start) / 1000;
        if (seconds <= 0) continue;
        const mbps = (size * 8) / seconds / 1_000_000;
        setProgress(100);
        return Math.max(0.1, Number(mbps.toFixed(2)));
      } catch {
        continue;
      }
    }
    throw new Error("upload_failed");
  };

  const runTest = async () => {
    setError(null);
    setResult(null);
    setProgress(0);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      setPhase("ping");
      setStatus("جاري قياس زمن الاستجابة...");
      const ping = await measurePing();

      setPhase("download");
      setStatus("يتم قياس سرعة التحميل...");
      setProgress(0);
      const download = await measureDownload(controller.signal);

      setPhase("upload");
      setStatus("يتم قياس سرعة الرفع...");
      setProgress(0);
      const upload = await measureUpload(controller.signal);

      const quality = qualityFor(download, ping);
      setResult({ download, upload, ping, quality });
      setStatus("اكتمل الفحص");
      setPhase("done");
    } catch (e) {
      setPhase("error");
      setError(
        "تعذّر إجراء الفحص حاليًا. قد تكون الشبكة بطيئة أو يحجب المتصفح طلبات القياس. حاول مجددًا.",
      );
    }
  };

  const shareWhatsApp = () => {
    if (!result) return;
    const text = [
      "نتيجة فحص سرعة الإنترنت — الخليج تيليكوم",
      `سرعة التحميل: ${result.download} Mbps`,
      `سرعة الرفع: ${result.upload} Mbps`,
      `زمن الاستجابة: ${result.ping} ms`,
      `جودة الاتصال: ${result.quality}`,
    ].join("\n");
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const isRunning =
    phase === "ping" || phase === "download" || phase === "upload";

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
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
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              أداة جديدة
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              فحص سرعة الإنترنت
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              اختبر سرعة اتصالك بالإنترنت واعرف سرعة التحميل والرفع وزمن
              الاستجابة بسهولة، مباشرة من المتصفح.
            </p>
          </div>
        </section>

        {/* TOOL */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-10">
            {/* Gauge */}
            <div className="mx-auto flex max-w-sm flex-col items-center">
              <CircularGauge
                progress={progress}
                running={isRunning}
                phase={phase}
              />

              <div className="mt-6 min-h-[1.5rem] text-center text-sm font-semibold text-muted-foreground">
                {status || (phase === "idle" && "اضغط الزر لبدء الفحص")}
              </div>

              {phase !== "done" && phase !== "error" && (
                <button
                  type="button"
                  onClick={runTest}
                  disabled={isRunning}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
                >
                  <Gauge className="h-5 w-5" />
                  {isRunning ? "جارٍ الفحص..." : "ابدأ الفحص"}
                </button>
              )}
            </div>

            {/* Error */}
            {phase === "error" && error && (
              <div className="mt-8 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-center text-sm font-semibold text-destructive">
                {error}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={runTest}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-extrabold text-primary-foreground shadow-md"
                  >
                    <RotateCcw className="h-4 w-4" />
                    إعادة الفحص
                  </button>
                </div>
              </div>
            )}

            {/* Results */}
            {phase === "done" && result && (
              <div className="mt-10">
                <div className="grid gap-4 sm:grid-cols-3">
                  <ResultCard
                    icon={<Download className="h-5 w-5" />}
                    label="سرعة التحميل"
                    value={result.download}
                    unit="Mbps"
                  />
                  <ResultCard
                    icon={<Upload className="h-5 w-5" />}
                    label="سرعة الرفع"
                    value={result.upload}
                    unit="Mbps"
                  />
                  <ResultCard
                    icon={<Activity className="h-5 w-5" />}
                    label="زمن الاستجابة"
                    value={result.ping}
                    unit="ms"
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5 text-center">
                  <div className="text-xs font-semibold text-muted-foreground">
                    جودة الاتصال
                  </div>
                  <div
                    className={`mt-1 text-3xl font-black ${qualityColor(result.quality)}`}
                  >
                    {result.quality}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={runTest}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary/40 bg-transparent px-6 py-2.5 text-sm font-extrabold text-primary transition-colors hover:bg-primary/10"
                  >
                    <RotateCcw className="h-4 w-4" />
                    إعادة الفحص
                  </button>
                  <button
                    type="button"
                    onClick={shareWhatsApp}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
                  >
                    <Share2 className="h-4 w-4" />
                    مشاركة النتيجة عبر واتساب
                  </button>
                </div>
              </div>
            )}

            <p className="mt-8 text-center text-xs text-muted-foreground">
              النتائج تقريبية وقد تختلف حسب الشبكة والجهاز والمتصفح.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5 text-center">
      <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-black text-foreground">
        {value}
        <span className="ml-1 text-sm font-semibold text-muted-foreground">
          {unit}
        </span>
      </div>
    </div>
  );
}

function CircularGauge({
  progress,
  running,
  phase,
}: {
  progress: number;
  running: boolean;
  phase: Phase;
}) {
  const size = 220;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, progress)) / 100) * c;
  const label =
    phase === "ping"
      ? "Ping"
      : phase === "download"
        ? "Download"
        : phase === "upload"
          ? "Upload"
          : phase === "done"
            ? "Done"
            : "Ready";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className={running ? "animate-pulse" : ""}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="color-mix(in oklab, var(--primary) 18%, transparent)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 200ms linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Gauge className="mb-1 h-8 w-8 text-primary" />
        <div className="text-3xl font-black text-foreground">
          {Math.round(progress)}%
        </div>
        <div className="text-xs font-semibold text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}
