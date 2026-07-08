import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Save, RotateCcw } from "lucide-react";
import posterMawloud from "@/assets/poster-mawloud.png?format=webp&quality=78&as=src";
import { drawCard, loadSettings, saveSettings } from "./mawloud.index";

export const Route = createFileRoute("/mawloud/settings")({
  head: () => ({
    meta: [{ title: "إعدادات بطاقة المولود | الخليج تيليكوم" }],
  }),
  component: SettingsPage,
});

const DEFAULTS = {
  recipient: { x: 315, y: 850, fontSize: 34, color: "#f4d28a" },
  sender: { x: 315, y: 1025, fontSize: 30, color: "#f4d28a" },
};

function SettingsPage() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = posterMawloud;
    img.onload = () => {
      imgRef.current = img;
      setReady(true);
    };
  }, []);

  useEffect(() => {
    if (!ready || !imgRef.current || !canvasRef.current) return;
    drawCard(
      canvasRef.current,
      imgRef.current,
      "اسم المهدى إليه (معاينة)",
      "اسم مقدم التهنئة (معاينة)",
      settings,
    );
  }, [settings, ready]);

  const update = (
    field: "recipient" | "sender",
    key: "x" | "y" | "fontSize" | "color",
    value: string | number,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: { ...prev[field], [key]: value },
    }));
    setSaved(false);
  };

  const onSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const onReset = () => {
    setSettings(DEFAULTS);
    saveSettings(DEFAULTS);
  };

  const Field = ({
    title,
    field,
  }: {
    title: string;
    field: "recipient" | "sender";
  }) => {
    const v = settings[field];
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 text-base font-extrabold text-primary">{title}</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-bold">
            X
            <input
              type="number"
              value={v.x}
              onChange={(e) => update(field, "x", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border-2 border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            Y
            <input
              type="number"
              value={v.y}
              onChange={(e) => update(field, "y", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border-2 border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            حجم الخط
            <input
              type="number"
              value={v.fontSize}
              onChange={(e) => update(field, "fontSize", Number(e.target.value))}
              className="mt-1 w-full rounded-lg border-2 border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-bold">
            اللون
            <input
              type="color"
              value={v.color}
              onChange={(e) => update(field, "color", e.target.value)}
              className="mt-1 h-10 w-full rounded-lg border-2 border-border bg-background"
            />
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <h1 className="text-sm font-extrabold text-primary sm:text-base">
            إعدادات بطاقة المولود
          </h1>
          <Link
            to="/mawloud"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2 text-xs font-bold text-primary hover:bg-primary/10"
          >
            <ArrowRight className="h-4 w-4" />
            عودة للبطاقة
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <Field title="حقل: اسم المهدى إليه" field="recipient" />
            <Field title="حقل: اسم مقدم التهنئة" field="sender" />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onSave}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary-glow"
              >
                <Save className="h-4 w-4" />
                حفظ الإعدادات
              </button>
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-secondary px-4 py-3 text-sm font-bold text-foreground hover:bg-muted"
              >
                <RotateCcw className="h-4 w-4" />
                إرجاع الافتراضي
              </button>
              {saved && (
                <span className="self-center text-sm font-bold text-primary">
                  ✓ تم الحفظ
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              الإعدادات تُحفظ في متصفحك وتُستخدم تلقائياً عند توليد البطاقة.
            </p>
          </div>

          <section className="rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
              <canvas ref={canvasRef} className="block h-auto w-full" />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              معاينة مباشرة بالإعدادات الحالية.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
