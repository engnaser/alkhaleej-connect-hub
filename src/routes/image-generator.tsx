import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ImageIcon,
  Sparkles,
  Download,
  Share2,
  Loader2,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { streamImage } from "@/lib/streamImage";
import { saveMyPhoto } from "@/lib/my-photos";

export const Route = createFileRoute("/image-generator")({
  head: () => ({
    meta: [
      { title: "توليد الصور بالذكاء الاصطناعي — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "أنشئ صوراً احترافية من وصف نصي بالعربية باستخدام الذكاء الاصطناعي، مع معاينة مباشرة وتحميل ومشاركة فورية.",
      },
      {
        property: "og:title",
        content: "توليد الصور بالذكاء الاصطناعي — الخليج تيليكوم",
      },
      {
        property: "og:description",
        content:
          "حوّل أفكارك إلى صور واقعية أو فنية خلال ثوانٍ عبر مولّد الصور الذكي.",
      },
      {
        property: "og:url",
        content: "https://alkhaleej-connect-hub.lovable.app/image-generator",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://alkhaleej-connect-hub.lovable.app/image-generator",
      },
    ],
  }),
  component: ImageGeneratorPage,
});

const STYLES = [
  { id: "realistic", label: "واقعية", hint: "photorealistic, high detail" },
  { id: "art", label: "فنية", hint: "digital art, vibrant, artistic" },
  { id: "3d", label: "ثلاثية الأبعاد", hint: "3D render, octane, cinematic lighting" },
  { id: "anime", label: "أنمي", hint: "anime style, cel shaded" },
  { id: "logo", label: "شعار", hint: "clean minimal logo, vector, flat" },
];

function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<string>("realistic");
  const [src, setSrc] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    setError(null);
    setSrc(null);
    setIsFinal(false);
    setLoading(true);
    const styleHint = STYLES.find((s) => s.id === style)?.hint ?? "";
    const finalPrompt = styleHint
      ? `${prompt.trim()} — ${styleHint}`
      : prompt.trim();
    try {
      await streamImage("/api/generate-image", finalPrompt, (dataUrl, final) => {
        setSrc(dataUrl);
        if (final) setIsFinal(true);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!src) return;
    const a = document.createElement("a");
    a.href = src;
    a.download = `khalij-ai-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    try {
      saveMyPhoto({
        templateId: "ai-generator",
        title: prompt.slice(0, 60) || "صورة AI",
        occasion: "AI",
        name: "",
        dataUrl: src,
      });
    } catch {
      /* ignore */
    }
  };

  const handleShare = async () => {
    if (!src) return;
    try {
      const blob = await (await fetch(src)).blob();
      const file = new File([blob], "khalij-ai.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "صورة من الخليج تيليكوم" });
        return;
      }
    } catch {
      /* fallback below */
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent("جربت مولّد الصور في الخليج تيليكوم!")}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md sm:text-sm"
          >
            <ArrowRight className="h-4 w-4" />
            كل الخدمات
          </Link>
        }
      />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Wand2 className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black text-primary sm:text-4xl">
            توليد الصور بالذكاء الاصطناعي
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            اكتب وصفاً بالعربية لأي فكرة، واحصل على صورة احترافية خلال ثوانٍ مع
            معاينة تدريجية أثناء التوليد.
          </p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
        >
          <label className="mb-2 block text-sm font-bold text-foreground">
            وصف الصورة
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="مثال: قطة تشرب قهوة في مقهى باريسي وقت الغروب"
            rows={3}
            maxLength={1000}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />

          <div className="mt-4">
            <div className="mb-2 text-sm font-bold text-foreground">النمط</div>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyle(s.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                    style === s.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/40"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري التوليد...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                توليد الصورة
              </>
            )}
          </button>
        </form>

        {/* Preview */}
        <div className="mt-8">
          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-secondary/40">
            {src ? (
              <img
                src={src}
                alt={prompt || "صورة مولّدة"}
                className={`h-full w-full object-cover transition-[filter] duration-500 ${
                  isFinal ? "blur-0" : "blur-2xl"
                }`}
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-muted-foreground">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-10 w-10" />
                  <p className="mt-2 text-sm">ستظهر الصورة هنا بعد التوليد</p>
                </div>
              </div>
            )}
            {loading && !isFinal && (
              <div className="absolute inset-x-0 bottom-0 bg-black/50 py-2 text-center text-xs font-bold text-white">
                جاري الرسم... معاينة مباشرة
              </div>
            )}
          </div>

          {src && isFinal && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md"
              >
                <Download className="h-4 w-4" />
                تحميل وحفظ في صوري
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground hover:border-primary/40"
              >
                <Share2 className="h-4 w-4" />
                مشاركة
              </button>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
          <div className="mb-2 font-bold text-foreground">نصائح لنتائج أفضل:</div>
          <ul className="list-inside list-disc space-y-1">
            <li>كن دقيقاً في الوصف: المكان، الإضاءة، الألوان، الأسلوب.</li>
            <li>حدّد النمط المناسب (واقعية، فنية، شعار...).</li>
            <li>تجنّب طلب صور أشخاص حقيقيين أو شخصيات محمية بحقوق ملكية.</li>
          </ul>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
