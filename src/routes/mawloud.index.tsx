import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, RefreshCw, Baby, User, Gift, Settings as SettingsIcon } from "lucide-react";
import posterMawloud from "@/assets/poster-mawloud.png";

export const Route = createFileRoute("/mawloud/")({
  head: () => ({
    meta: [
      { title: "بطاقة تهنئة بالمولود | الخليج تيليكوم" },
      { name: "description", content: "صمّم بطاقة تهنئة بالمولود بنفس هوية الخليج تيليكوم وحمّلها كصورة PNG فوراً." },
    ],
  }),
  component: MawloudPage,
});

type FieldConfig = {
  x: number;
  y: number;
  fontSize: number;
  color: string;
};

type Settings = {
  recipient: FieldConfig;
  sender: FieldConfig;
};

const DEFAULT_SETTINGS: Settings = {
  recipient: { x: 315, y: 850, fontSize: 34, color: "#f4d28a" },
  sender: { x: 315, y: 1025, fontSize: 30, color: "#f4d28a" },
};

const STORAGE_KEY = "mawloud-card-settings-v1";

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Settings;
    return {
      recipient: { ...DEFAULT_SETTINGS.recipient, ...parsed.recipient },
      sender: { ...DEFAULT_SETTINGS.sender, ...parsed.sender },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: Settings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function drawCard(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  recipient: string,
  sender: string,
  settings: Settings,
) {
  const w = img.naturalWidth || 1122;
  const h = img.naturalHeight || 1402;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(img, 0, 0, w, h);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.direction = "rtl";

  const drawField = (text: string, cfg: FieldConfig) => {
    if (!text.trim()) return;
    ctx.fillStyle = cfg.color;
    ctx.font = `bold ${cfg.fontSize}px Tajawal, Cairo, system-ui, sans-serif`;
    ctx.fillText(text, cfg.x, cfg.y);
  };

  drawField(recipient || "—", settings.recipient);
  drawField(sender || "—", settings.sender);
}

function MawloudPage() {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [imgReady, setImgReady] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setSettings(loadSettings());
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = posterMawloud;
    img.onload = () => {
      imgRef.current = img;
      setImgReady(true);
    };
  }, []);

  useEffect(() => {
    if (!imgReady || !imgRef.current || !canvasRef.current) return;
    drawCard(canvasRef.current, imgRef.current, recipient, sender, settings);
  }, [recipient, sender, settings, imgReady]);

  const refresh = () => {
    if (imgRef.current && canvasRef.current) {
      drawCard(canvasRef.current, imgRef.current, recipient, sender, settings);
    }
  };

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = `khalij-mawloud-${(recipient || "card").slice(0, 20)}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-extrabold text-primary">
            <Baby className="h-5 w-5" />
            الخليج تيليكوم
          </Link>
          <Link
            to="/mawloud/settings"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2 text-xs font-bold text-primary hover:bg-primary/10"
          >
            <SettingsIcon className="h-4 w-4" />
            إعدادات المدير
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-3xl font-black leading-tight text-primary sm:text-5xl">
            صمم تهنئتك بالمولود خلال ثواني
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            اكتب الأسماء وسيتم تجهيز بطاقة تهنئة جاهزة للتحميل مباشرة.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <User className="h-4 w-4 text-primary" />
                  اسم المهدى إليه التهنئة
                </span>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  maxLength={60}
                  placeholder="مثال: الأخ الغالي محمد أحمد"
                  className="block w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-right text-sm font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Gift className="h-4 w-4 text-primary" />
                  اسم مقدم التهنئة
                </span>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  maxLength={60}
                  placeholder="مثال: أخوك عبدالله سالم"
                  className="block w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-right text-sm font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={refresh}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-secondary px-4 py-3 text-sm font-bold text-primary hover:bg-primary/10"
                >
                  <RefreshCw className="h-4 w-4" />
                  تحديث المعاينة
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] hover:bg-primary-glow"
                >
                  <Download className="h-4 w-4" />
                  تحميل بطاقة التهنئة PNG
                </button>
              </div>

              <p className="text-xs text-muted-foreground">
                * يتم توليد الصورة داخل متصفحك فقط، بدون استهلاك أي رصيد.
              </p>
            </div>
          </section>

          {/* Preview */}
          <section className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
              <canvas ref={canvasRef} className="block h-auto w-full" />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              معاينة مباشرة — تظهر النصوص في أماكنها الصحيحة على القالب.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
