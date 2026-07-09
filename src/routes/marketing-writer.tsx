import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Wand2,
  Copy,
  Check,
  Loader2,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Megaphone,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { generateMarketingCopy } from "@/lib/marketingCopy.functions";

export const Route = createFileRoute("/marketing-writer")({
  head: () => ({
    meta: [
      { title: "مساعد كتابة المحتوى التسويقي — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "أداة ذكية لصياغة نصوص إعلانية جذابة لمنتجاتك جاهزة للنشر على واتساب والسوشيال ميديا.",
      },
      {
        property: "og:title",
        content: "مساعد كتابة المحتوى التسويقي — الخليج تيليكوم",
      },
      {
        property: "og:description",
        content: "أنشئ نصوص إعلانية احترافية بلمسة زر مع الذكاء الاصطناعي.",
      },
      {
        property: "og:url",
        content: "https://alkhaleej-connect-hub.lovable.app/marketing-writer",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://alkhaleej-connect-hub.lovable.app/marketing-writer",
      },
    ],
  }),
  component: MarketingWriterPage,
});

const TONES = ["جذاب واحترافي", "ودود ومرح", "فاخر وراقٍ", "قوي ومباشر", "عاطفي ملهم"];
const PLATFORMS = [
  "واتساب",
  "فيسبوك",
  "إنستقرام",
  "تويتر / X",
  "تيك توك",
  "واتساب وسوشيال ميديا",
];

function MarketingWriterPage() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [platform, setPlatform] = useState(PLATFORMS[5]);
  const [offer, setOffer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim()) {
      setError("الرجاء إدخال اسم المنتج أو الخدمة");
      return;
    }
    setError(null);
    setResult("");
    setLoading(true);
    try {
      const res = await generateMarketingCopy({
        data: {
          product: product.trim(),
          audience: audience.trim() || undefined,
          tone,
          platform,
          offer: offer.trim() || undefined,
        },
      });
      setResult(res.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذّر توليد المحتوى");
    } finally {
      setLoading(false);
    }
  };

  const copyAll = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md hover:scale-[1.03] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            كل الخدمات
          </Link>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Megaphone className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black text-primary sm:text-4xl">
            مساعد كتابة المحتوى التسويقي
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            أدخل تفاصيل منتجك أو خدمتك، ودع الذكاء الاصطناعي يصيغ لك 3 نصوص
            إعلانية جاهزة للنشر على واتساب والسوشيال ميديا.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="المنتج أو الخدمة *" className="sm:col-span-2">
              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="مثال: كريم مرطب طبيعي بخلاصة العسل"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </Field>
            <Field label="الجمهور المستهدف">
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="مثال: النساء 25-45 سنة"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </Field>
            <Field label="عرض/ميزة خاصة (اختياري)">
              <input
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="مثال: خصم 20% لأول 50 طلب"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </Field>
            <Field label="النبرة">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="منصة النشر">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري التوليد...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                توليد النصوص الإعلانية
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            المحتوى يُولَّد بالذكاء الاصطناعي ولا يتم حفظ بياناتك.
          </p>
        </form>

        {result && (
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="inline-flex items-center gap-2 text-lg font-extrabold text-primary">
                <Sparkles className="h-5 w-5" />
                النصوص المقترحة
              </h2>
              <button
                onClick={copyAll}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> تم النسخ
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> نسخ الكل
                  </>
                )}
              </button>
            </div>
            <pre className="whitespace-pre-wrap break-words rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-foreground font-sans">
              {result}
            </pre>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(result)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" />
                مشاركة عبر واتساب
              </a>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block text-xs font-bold text-muted-foreground ${className}`}>
      <span className="mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
