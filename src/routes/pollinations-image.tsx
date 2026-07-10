import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ImageIcon,
  Sparkles,
  Download,
  Loader2,
  ArrowRight,
  Palette,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/pollinations-image")({
  head: () => ({
    meta: [
      { title: "توليد الصور المجاني (Pollinations AI) — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "توليد صور فورية ومجانية من وصف نصي بالعربية باستخدام Pollinations AI بدون تسجيل ولا مفاتيح.",
      },
      { property: "og:title", content: "توليد الصور المجاني بالذكاء الاصطناعي" },
      {
        property: "og:description",
        content: "اكتب وصفك واحصل على صورة جاهزة للتحميل خلال ثوانٍ.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://alkhaleej-connect-hub.lovable.app/pollinations-image",
      },
    ],
  }),
  component: PollinationsPage,
});

function PollinationsPage() {
  const [prompt, setPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const text = prompt.trim();
    if (!text) {
      setError("من فضلك اكتب وصفاً للصورة قبل التوليد.");
      return;
    }
    setError(null);
    setLoaded(false);
    setLoading(true);
    // Cache-buster seed to force a fresh image each click
    const seed = Date.now();
    const url = `https://pollinations.ai/p/${encodeURIComponent(text)}?seed=${seed}`;
    setImgUrl(url);
  };

  const handleDownload = async () => {
    if (!imgUrl) return;
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `pollinations-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // Fallback: open in a new tab so user can save manually
      window.open(imgUrl, "_blank", "noopener,noreferrer");
    }
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

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Palette className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black text-primary sm:text-4xl">
            توليد الصور بالذكاء الاصطناعي
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            خدمة سريعة ومجانية عبر Pollinations AI — اكتب وصفك بالعربية أو
            الإنجليزية، واحصل على صورتك جاهزة للتحميل.
          </p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
        >
          <label
            htmlFor="prompt"
            className="mb-2 block text-sm font-bold text-foreground"
          >
            وصف الصورة
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (error) setError(null);
            }}
            placeholder="مثال: مدينة صنعاء القديمة عند الغروب بأسلوب لوحة زيتية"
            rows={3}
            maxLength={500}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading && !loaded}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && !loaded ? (
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

        {/* Image display container */}
        <div className="mt-8">
          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-secondary/40">
            {imgUrl ? (
              <>
                <img
                  key={imgUrl}
                  src={imgUrl}
                  alt={prompt || "صورة مولّدة"}
                  onLoad={() => {
                    setLoaded(true);
                    setLoading(false);
                  }}
                  onError={() => {
                    setLoading(false);
                    setError("تعذّر توليد الصورة. حاول مرة أخرى.");
                    setImgUrl(null);
                  }}
                  className={`h-full w-full object-cover transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />
                {!loaded && (
                  <div className="absolute inset-0 grid place-items-center bg-secondary/60">
                    <div className="flex flex-col items-center gap-2 text-primary">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="text-xs font-bold">
                        جاري رسم صورتك...
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="grid h-full w-full place-items-center text-muted-foreground">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-10 w-10" />
                  <p className="mt-2 text-sm">
                    ستظهر الصورة هنا بعد التوليد
                  </p>
                </div>
              </div>
            )}
          </div>

          {imgUrl && loaded && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md"
              >
                <Download className="h-4 w-4" />
                تحميل الصورة
              </button>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
          <div className="mb-2 font-bold text-foreground">نصائح لنتائج أفضل:</div>
          <ul className="list-inside list-disc space-y-1">
            <li>كن واضحاً في الوصف: الموضوع، الألوان، الإضاءة، النمط.</li>
            <li>جرّب أوصافاً بالإنجليزية للحصول على تفاصيل أدق أحياناً.</li>
            <li>الخدمة مقدَّمة عبر Pollinations AI وقد تختلف السرعة بحسب الشبكة.</li>
          </ul>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
