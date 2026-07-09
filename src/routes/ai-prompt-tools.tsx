import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Sparkles,
  ArrowLeft,
  Wand2,
  ShieldCheck,
  ScanText,
  Image as ImageIcon,
  Video,
  SearchCheck,
  RefreshCw,
  FileImage,
  FileText,
  Images,
  ShoppingBag,
  MessageSquare,
  Bot,
  Brain,
  Braces,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/ai-prompt-tools")({
  head: () => ({
    meta: [
      { title: "أدوات توليد أوامر الذكاء الاصطناعي — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "مجموعة أدوات مجانية لتوليد أوامر (Prompts) الذكاء الاصطناعي: توليد وفحص الأوامر، أوامر الصور والفيديو، كاشف النصوص، إعادة الصياغة، وأكثر.",
      },
      { property: "og:title", content: "أدوات توليد أوامر الذكاء الاصطناعي" },
      {
        property: "og:description",
        content:
          "14 أداة مجانية لتوليد وتحسين أوامر الذكاء الاصطناعي لمنصات ChatGPT وClaude وGemini وDeepSeek وVEO3.",
      },
    ],
  }),
  component: AiPromptToolsPage,
});

const BASE = "https://generateprompt.ai";

const TOOLS: {
  icon: any;
  title: string;
  desc: string;
  href: string;
}[] = [
  {
    icon: Wand2,
    title: "توليد الأوامر",
    desc: "حوّل أفكارك إلى أوامر (Prompts) احترافية جاهزة للاستخدام مع أي نموذج ذكاء اصطناعي.",
    href: `${BASE}/`,
  },
  {
    icon: SearchCheck,
    title: "فحص الأوامر",
    desc: "تحقّق من جودة أوامرك واحصل على اقتراحات لتحسينها والوصول لنتائج أدق.",
    href: `${BASE}/prompt-checker`,
  },
  {
    icon: ImageIcon,
    title: "توليد أوامر الصور",
    desc: "أنشئ أوامر دقيقة لتوليد صور مذهلة بالذكاء الاصطناعي (Midjourney، DALL·E، Stable Diffusion).",
    href: `${BASE}/image-prompt-generator`,
  },
  {
    icon: Video,
    title: "توليد أوامر الفيديو — VEO3",
    desc: "أوامر جاهزة لتوليد مقاطع فيديو احترافية عبر Google VEO3 ونماذج الفيديو الأخرى.",
    href: `${BASE}/veo3-prompt-generator`,
  },
  {
    icon: ScanText,
    title: "كاشف النصوص",
    desc: "اكتشف ما إذا كان النص مكتوباً بواسطة الذكاء الاصطناعي أم إنسان بدقة عالية.",
    href: `${BASE}/ai-text-detector`,
  },
  {
    icon: RefreshCw,
    title: "إعادة الصياغة",
    desc: "حوّل النصوص المولّدة بالذكاء الاصطناعي إلى أسلوب بشري طبيعي غير قابل للكشف.",
    href: `${BASE}/humanize-ai-text`,
  },
  {
    icon: FileImage,
    title: "محوّل الصور إلى أوامر",
    desc: "ارفع صورة واحصل على الأمر (Prompt) الذي يمكن استخدامه لتوليد صورة مشابهة.",
    href: `${BASE}/image-to-prompt`,
  },
  {
    icon: FileText,
    title: "تحويل الصورة إلى نص",
    desc: "استخرج النصوص من داخل الصور (OCR) بسهولة وبدقة عالية للعربية والإنجليزية.",
    href: `${BASE}/image-to-text`,
  },
  {
    icon: Images,
    title: "محوّل صورتين إلى أمر",
    desc: "ادمج صورتين واحصل على أمر واحد يجمع خصائصهما لتوليد صورة جديدة مبتكرة.",
    href: `${BASE}/two-images-to-prompt`,
  },
  {
    icon: ShoppingBag,
    title: "توليد وصف المنتجات",
    desc: "أنشئ أوصاف منتجات احترافية جاهزة للنشر على المتاجر الإلكترونية والسوشيال ميديا.",
    href: `${BASE}/product-description-generator`,
  },
  {
    icon: MessageSquare,
    title: "مولّد أوامر ChatGPT",
    desc: "أوامر محسّنة ومخصّصة لتحقيق أفضل النتائج من ChatGPT في مختلف المهام.",
    href: `${BASE}/chatgpt-prompt-generator`,
  },
  {
    icon: Bot,
    title: "مولّد أوامر DeepSeek",
    desc: "أوامر احترافية مصمّمة خصيصاً لتناسب أسلوب نموذج DeepSeek وقدراته.",
    href: `${BASE}/deepseek-prompt-generator`,
  },
  {
    icon: Brain,
    title: "مولّد أوامر Claude",
    desc: "أوامر مُحسّنة تستفيد من نقاط قوة نموذج Claude في التحليل والكتابة الطويلة.",
    href: `${BASE}/claude-prompt-generator`,
  },
  {
    icon: Braces,
    title: "تحويل الصورة إلى JSON",
    desc: "حوّل أي صورة إلى كود JSON منظّم يصف عناصرها لاستخدامها في التطبيقات والتصاميم.",
    href: `${BASE}/image-to-json`,
  },
];

function AiPromptToolsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
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
                "radial-gradient(1200px 600px at 80% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%), radial-gradient(900px 500px at 10% 10%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Wand2 className="h-3.5 w-3.5" />
              أدوات الذكاء الاصطناعي
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              أدوات توليد أوامر الذكاء الاصطناعي
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              14 أداة مجانية لتوليد وتحسين أوامر (Prompts) الذكاء الاصطناعي —
              تدعم ChatGPT، Claude، Gemini، DeepSeek، وVEO3. بدون تسجيل.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              الأدوات مستضافة على generateprompt.ai — تفتح في نافذة جديدة.
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <a
                key={t.title}
                href={t.href}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-2xl border border-border bg-card p-6 text-right shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <t.icon className="h-6 w-6" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="text-lg font-extrabold text-foreground">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  افتح الأداة
                  <ArrowLeft className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* NOTE */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-secondary/40 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
            <div className="mb-2 flex items-center gap-2 font-bold text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              ملاحظة
            </div>
            هذه الأدوات مقدّمة من موقع{" "}
            <a
              href={BASE}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-primary underline"
            >
              generateprompt.ai
            </a>{" "}
            وهي مجانية بالكامل بدون تسجيل. لا يتم جمع بياناتك من قبل الخليج
            تيليكوم عند استخدامها، ونحن نوفّرها لك كاختصار سريع من مكان واحد.
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
