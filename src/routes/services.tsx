import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { SiteFooter } from "@/components/site-footer";
import {
  Sparkles,
  Palette,
  Download,
  MessageCircle,
  ArrowLeft,
  Phone,
  Image as ImageIcon,
  Send,
  ShieldCheck,
  Gift,
  Star,
  Gauge,
  Globe,
} from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";
import { COUNTRIES } from "@/data/countries";


export const Route = createFileRoute("/services")({
  validateSearch: (search: Record<string, unknown>) => ({
    dial: typeof search.dial === "string" ? search.dial : undefined,
  }),
  head: () => ({
    meta: [
      { title: "جميع خدمات الموقع — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "تصفّح جميع خدمات الخليج تيليكوم: تصاميم تهاني باسمك، قوالب جاهزة، ومراسلة أي رقم عبر واتساب بدون حفظه.",
      },
      {
        property: "og:title",
        content: "جميع خدمات الموقع — الخليج تيليكوم",
      },
      {
        property: "og:description",
        content:
          "كل خدمات التصميم والتخصيص في مكان واحد، إضافة إلى أداة مراسلة واتساب بدون حفظ الرقم.",
      },
    ],
  }),
  component: ServicesPage,
});


const WHATSAPP = "967775608601";

const SERVICES = [
  {
    icon: Palette,
    title: "قوالب تهاني جاهزة",
    desc: "مجموعة كبيرة من قوالب المناسبات: صباح ومساء، جمعة، رمضان، عيد، مولود، وأكثر.",
    to: "/designs" as const,
    cta: "تصفّح القوالب",
  },
  {
    icon: ImageIcon,
    title: "تصميم باسمك ورقمك",
    desc: "أضف اسمك ورقم جوالك تلقائيًا على التصميم واحصل على صورة احترافية فوراً.",
    to: "/designs" as const,
    cta: "ابدأ التصميم",
  },
  {
    icon: Download,
    title: "تحميل فوري مجاني",
    desc: "حمّل تصاميمك بجودة عالية مباشرة بدون تسجيل دخول وبدون رسوم.",
    to: "/designs" as const,
    cta: "حمّل الآن",
  },
  {
    icon: Gift,
    title: "تهاني المولود الجديد",
    desc: "قوالب مخصصة للترحيب بالمواليد الجدد بتصاميم مميزة وأنيقة.",
    to: "/mawloud" as const,
    cta: "افتح قسم المواليد",
  },
  {
    icon: MessageCircle,
    title: "مراسلة واتساب بدون حفظ الرقم",
    desc: "أرسل رسالة واتساب لأي رقم مباشرة دون الحاجة لإضافته إلى جهات الاتصال.",
    to: "#whatsapp-tool" as const,
    cta: "استخدم الأداة",
  },
  {
    icon: Gauge,
    title: "فحص سرعة الإنترنت",
    desc: "اختبر سرعة اتصالك بالإنترنت واعرف سرعة التحميل والرفع وزمن الاستجابة بسهولة.",
    to: "/speed-test" as const,
    cta: "ابدأ الفحص",
  },
  {
    icon: Star,
    title: "دعم وتواصل مباشر",
    desc: "تواصل مع فريق الخليج تيليكوم عبر واتساب لأي طلب أو استفسار.",
    to: "#" as const,
    cta: "تواصل معنا",
    href: `https://wa.me/${WHATSAPP}`,
  },
];

function ServicesPage() {
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
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary"
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
              className="rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary"
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
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              مركز الخدمات
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              جميع خدمات الموقع
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              هنا تجد جميع خدمات التصميم والتخصيص المتاحة في الخليج تيليكوم،
              بالإضافة إلى أداة جديدة لمراسلة أي رقم عبر واتساب بدون الحاجة
              لحفظه.
            </p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Inner = (
                <>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    {s.cta}
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                </>
              );
              const className =
                "group block rounded-2xl border border-border bg-card p-6 text-right shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]";
              if (s.href) {
                return (
                  <a
                    key={s.title}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                  >
                    {Inner}
                  </a>
                );
              }
              if (s.to.startsWith("#")) {
                return (
                  <a key={s.title} href={s.to} className={className}>
                    {Inner}
                  </a>
                );
              }
              return (
                <Link key={s.title} to={s.to} className={className}>
                  {Inner}
                </Link>
              );
            })}
          </div>
        </section>

        {/* WHATSAPP TOOL */}
        <section
          id="whatsapp-tool"
          className="border-y border-border bg-secondary/40 scroll-mt-24"
        >
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <MessageCircle className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-black text-primary sm:text-3xl">
                مراسلة رقم عبر واتساب
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                أرسل رسالة واتساب لأي رقم مباشرة بدون الحاجة لحفظه في جهات
                الاتصال.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
              <WhatsAppMessenger />
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                لا يتم حفظ الرقم في جهات الاتصال ولا في قاعدة البيانات.
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl border border-border p-8 text-center shadow-[var(--shadow-elevated)] sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, color-mix(in oklab, var(--primary) 70%, black) 100%)",
            }}
          >
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              جاهز تبدأ تصميمك؟
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
              اختر قالبك المفضل وأضف اسمك ورقمك للحصول على تصميم احترافي فوري.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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

const COUNTRY_CODES = [
  { code: "+967", label: "اليمن" },
  { code: "+966", label: "السعودية" },
  { code: "+971", label: "الإمارات" },
  { code: "+974", label: "قطر" },
  { code: "+973", label: "البحرين" },
  { code: "+965", label: "الكويت" },
  { code: "+968", label: "عُمان" },
  { code: "+20", label: "مصر" },
  { code: "+962", label: "الأردن" },
  { code: "+963", label: "سوريا" },
  { code: "+964", label: "العراق" },
  { code: "+212", label: "المغرب" },
  { code: "+216", label: "تونس" },
  { code: "+213", label: "الجزائر" },
  { code: "+218", label: "ليبيا" },
  { code: "+90", label: "تركيا" },
  { code: "+1", label: "أمريكا/كندا" },
  { code: "+44", label: "بريطانيا" },
];

export function WhatsAppMessenger() {
  const [country, setCountry] = useState("+967");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const cleaned = useMemo(() => phone.replace(/\D+/g, ""), [phone]);
  const fullNumber = useMemo(
    () => `${country.replace(/\D+/g, "")}${cleaned.replace(/^0+/, "")}`,
    [country, cleaned],
  );

  const handleOpen = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (cleaned.length < 6) {
      setError("الرجاء إدخال رقم هاتف صحيح.");
      return;
    }
    if (fullNumber.length < 8 || fullNumber.length > 15) {
      setError("الرقم غير صحيح. تأكد من الدولة وعدد الأرقام.");
      return;
    }

    const base = `https://wa.me/${fullNumber}`;
    const url = message.trim()
      ? `${base}?text=${encodeURIComponent(message.trim())}`
      : base;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleOpen} className="space-y-4" dir="rtl">
      <div>
        <label className="mb-2 block text-sm font-bold text-foreground">
          رقم الهاتف
        </label>
        <div className="flex gap-2">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-32 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold text-foreground focus:border-primary focus:outline-none"
            aria-label="مفتاح الدولة"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} {c.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="مثال: 7XXXXXXXX"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-left text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            dir="ltr"
            maxLength={20}
          />
        </div>
        {cleaned && (
          <p className="mt-2 text-xs text-muted-foreground">
            الرقم النهائي:{" "}
            <span dir="ltr" className="font-bold text-primary">
              +{fullNumber}
            </span>
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-foreground">
          الرسالة <span className="font-normal text-muted-foreground">(اختياري)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب رسالتك الجاهزة هنا..."
          rows={4}
          maxLength={1000}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
      >
        <Send className="h-4 w-4" />
        فتح المحادثة في واتساب
      </button>
    </form>
  );
}
