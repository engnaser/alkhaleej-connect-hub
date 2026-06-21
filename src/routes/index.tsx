import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import {
  Sparkles,
  Palette,
  Download,
  User,
  Phone,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import logoKhalij from "@/assets/logo-khalij.png";
import posterSabah from "@/assets/poster-sabah.jpg";
import posterMasaa from "@/assets/poster-masaa.jpg";
import posterJumaa from "@/assets/poster-jumaa.jpg";
import posterRamadan from "@/assets/poster-ramadan.jpg";
import posterEid from "@/assets/poster-eid.jpg";
import posterMawloud from "@/assets/poster-mawloud.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الخليج تيليكوم — تصاميم تهاني ومناسبات باسمك" },
      {
        name: "description",
        content:
          "اختر قالب التهنئة المناسب، أضف اسمك ورقم جوالك، وحمّل تصميمك الاحترافي فوراً مجاناً.",
      },
      {
        property: "og:title",
        content: "تصاميم تهاني باسمك — الخليج تيليكوم",
      },
      {
        property: "og:description",
        content:
          "قوالب جاهزة لكل مناسبة. أدخل بياناتك واحصل على تصميمك الخاص بضغطة زر.",
      },
    ],
  }),
  component: HomePage,
});

const WHATSAPP = "967775608601";

const PREVIEW_POSTERS = [
  { src: posterSabah, title: "صباح الخير" },
  { src: posterMasaa, title: "مساء الخير" },
  { src: posterJumaa, title: "جمعة مباركة" },
  { src: posterRamadan, title: "رمضان كريم" },
  { src: posterEid, title: "عيد مبارك" },
  { src: posterMawloud, title: "مبارك المولود" },
];

const STEPS = [
  {
    n: 1,
    title: "اختر القالب",
    desc: "تصفّح قوالب التهاني والمناسبات الجاهزة واختر ما يناسبك.",
    icon: Palette,
  },
  {
    n: 2,
    title: "أدخل بياناتك",
    desc: "اكتب اسمك ورقم جوالك ليُضافا تلقائياً على التصميم.",
    icon: User,
  },
  {
    n: 3,
    title: "حمّل التصميم",
    desc: "احصل على صورتك بجودة عالية فوراً وشاركها مع أحبابك.",
    icon: Download,
  },
];

function HomePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={logoKhalij}
              alt="الخليج تيليكوم"
              className="h-10 w-10 shrink-0 rounded-full ring-2 ring-primary/40"
            />
            <span className="truncate text-sm font-extrabold text-primary sm:text-base">
              الخليج تيليكوم
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className="rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary"
            >
              الرئيسية
            </Link>
            <Link
              to="/designs"
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary"
            >
              التصاميم
            </Link>
            <Link
              to="/services"
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary"
            >
              الخدمات
            </Link>

            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary"
            >
              تواصل معنا
            </a>
          </nav>

          <Link
            to="/designs"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            ابدأ الآن
          </Link>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(1200px 600px at 80% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%), radial-gradient(900px 500px at 10% 10%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="text-center lg:text-right">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  خدمة مجانية من الخليج تيليكوم
                </div>
                <h1 className="text-balance text-4xl font-black leading-tight text-primary sm:text-5xl lg:text-6xl">
                  تصاميم تهاني ومناسبات
                  <br />
                  <span className="text-foreground">باسمك أنت</span>
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                  اختر القالب المناسب لمناسبتك، أدخل اسمك ورقم جوالك، وسيقوم
                  الموقع بإضافتهما تلقائياً على التصميم — ثم حمّل صورتك
                  الاحترافية بضغطة واحدة.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Link
                    to="/designs"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-[1.03]"
                  >
                    اختر قالبك الآن
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                      "مرحباً، أرغب بطلب تصميم تهنئة مخصص",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-card px-6 py-3 text-sm font-extrabold text-primary transition-colors hover:bg-primary/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    تواصل عبر واتساب
                  </a>
                </div>

                <ul className="mt-8 grid gap-3 text-right sm:grid-cols-3">
                  {[
                    "قوالب احترافية",
                    "تحميل فوري ومجاني",
                    "بدون تسجيل دخول",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm font-semibold text-foreground/80"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stacked preview cards */}
              <div className="relative mx-auto w-full max-w-md">
                <div className="relative aspect-[3/4] w-full">
                  <div className="absolute right-0 top-0 h-[88%] w-[78%] -rotate-3 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
                    <img
                      src={posterEid}
                      alt="نموذج تصميم"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 h-[88%] w-[78%] rotate-3 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)]">
                    <img
                      src={posterMawloud}
                      alt="نموذج تصميم"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
                    <Sparkles className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black text-primary sm:text-4xl">
                كيف يعمل الموقع؟
              </h2>
              <p className="mt-3 text-muted-foreground">
                ثلاث خطوات بسيطة تفصلك عن تصميمك الجاهز.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="group relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEMPLATES PREVIEW */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">
            <div>
              <h2 className="text-3xl font-black text-primary sm:text-4xl">
                قوالب التهاني المتوفرة
              </h2>
              <p className="mt-2 text-muted-foreground">
                مجموعة متنوعة لكل المناسبات — وتُحدّث باستمرار.
              </p>
            </div>
            <Link
              to="/designs"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
            >
              عرض جميع القوالب
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {PREVIEW_POSTERS.map((p) => (
              <Link
                key={p.title}
                to="/designs"
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <span className="truncate text-sm font-extrabold text-foreground">
                    {p.title}
                  </span>
                  <Download className="h-4 w-4 shrink-0 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl border border-border p-8 text-center shadow-[var(--shadow-elevated)] sm:p-14"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, color-mix(in oklab, var(--primary) 70%, black) 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <Sparkles className="absolute right-10 top-10 h-24 w-24 text-white" />
              <Palette className="absolute bottom-10 left-10 h-28 w-28 text-white" />
            </div>
            <h2 className="relative text-3xl font-black text-white sm:text-4xl">
              جاهز تصمّم تهنئتك؟
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
              ابدأ الآن واحصل على تصميم احترافي يحمل اسمك ورقمك خلال ثوانٍ.
            </p>
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/designs"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-primary shadow-lg transition-transform hover:scale-[1.03]"
              >
                <Phone className="h-4 w-4" />
                ابدأ التصميم الآن
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-transparent px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                واتساب
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
