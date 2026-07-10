import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
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
  Lock,
  Wifi,
  Receipt,
  Radio,
  Smartphone,
  Bot,
  Coins,
  ArrowLeftRight,
  GraduationCap,
  CalendarClock,
  Megaphone,
  Wand2,
  Gem,
  PhoneCall,




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
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/services" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/services" }],
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
    icon: MessageCircle,
    title: "مراسلة واتساب بدون حفظ الرقم",
    desc: "أرسل رسالة واتساب لأي رقم مباشرة دون الحاجة لإضافته إلى جهات الاتصال.",
    to: "#whatsapp-tool" as const,
    cta: "استخدم الأداة",
  },
  {
    icon: Bot,
    title: "بوت الواتساب — ردود سريعة",
    desc: "بوت ذكي للرد التلقائي على استفسارات العملاء عبر الواتساب مع قوالب ردود جاهزة.",
    to: "/whatsapp-bot" as const,
    cta: "افتح البوت",
  },
  {
    icon: Gauge,
    title: "فحص سرعة الإنترنت",
    desc: "اختبر سرعة اتصالك بالإنترنت واعرف سرعة التحميل والرفع وزمن الاستجابة بسهولة.",
    to: "/speed-test" as const,
    cta: "ابدأ الفحص",
  },
  {
    icon: Globe,
    title: "مفاتيح دول العالم",
    desc: "ابحث عن مفتاح الاتصال الدولي لأي دولة في العالم وانسخه أو استخدمه في واتساب.",
    to: "/dial-codes" as const,
    cta: "افتح الدليل",
  },
  {
    icon: Lock,
    title: "فك حظر الواتساب",
    desc: "جهّز رسالة طلب مراجعة حظر رقم واتساب وأرسلها بسهولة إلى الدعم.",
    to: "/whatsapp-unblock" as const,
    cta: "ابدأ الآن",
  },
  {
    icon: Wifi,
    title: "استعلام باقات الإنترنت الأرضي",
    desc: "اختصار آمن للوصول إلى صفحة الاستعلام الرسمية لباقات الإنترنت الأرضي (يمن نت).",
    to: "/adsl-inquiry" as const,
    cta: "استعلم الآن",
  },
  {
    icon: Receipt,
    title: "استعلام فاتورة الهاتف الثابت",
    desc: "استعلم عن فاتورة الهاتف الثابت عبر الصفحة الرسمية بسهولة.",
    to: "/phone-bill-inquiry" as const,
    cta: "استعلم الآن",
  },
  {
    icon: Radio,
    title: "استعلام رصيد يمن فورجي",
    desc: "استعلم عن رصيد وحالة اشتراك يمن فورجي عبر الصفحة الرسمية بسهولة.",
    to: "/yemen4g-inquiry" as const,
    cta: "استعلم الآن",
  },
  {
    icon: Smartphone,
    title: "خدمات يمن موبايل",
    desc: "باقات وخدمات يمن موبايل، إدارة الحساب، وإعدادات الإنترنت في مكان واحد.",
    to: "/yemen-mobile" as const,
    cta: "ابدأ الآن",
  },
  {
    icon: Smartphone,
    title: "خدمات شركة يو",
    desc: "باقات وخدمات شركة يو، إدارة الحساب، وإعدادات الإنترنت في مكان واحد.",
    to: "/you-services" as const,
    cta: "ابدأ الآن",
  },

  {
    icon: PhoneCall,
    title: "خدمات الاتصالات (أكواد الشبكة)",
    desc: "فعّل أو ألغِ خدمات: عدم الإزعاج، اتصل بي، البريد الصوتي، تحويل المكالمات بضغطة زر.",
    to: "/telecom-services" as const,
    cta: "افتح الخدمات",
  },
  {
    icon: Coins,
    title: "أسعار صرف الريال اليمني",
    desc: "أسعار العملات في صنعاء وعدن مأخوذة من المصدر مع زر تزامن لتحديث الأسعار لحظياً.",
    to: "/exchange-rates" as const,
    cta: "افتح الأسعار",
  },
  {
    icon: Gem,
    title: "أسعار الذهب في اليمن",
    desc: "أسعار عيار 24 و 21 و 18 بالريال اليمني والدولار مع رسم بياني للتغيرات وزر تزامن مباشر.",
    to: "/gold-prices" as const,
    cta: "افتح الأسعار",
  },
  {
    icon: ArrowLeftRight,
    title: "محوّل العملات العالمية",
    desc: "حوّل أي مبلغ بين أكثر من 20 عملة عالمية (دولار، يورو، ريال، درهم، ...) بأحدث الأسعار.",
    to: "/currency-converter" as const,
    cta: "ابدأ التحويل",
  },
  {
    icon: GraduationCap,
    title: "استعلام شهادة الثانوية العامة",
    desc: "اختصار آمن للموقع الرسمي للاستعلام عن نتائج وشهادات الثانوية العامة للمناطق المحررة.",
    to: "/secondary-certificate" as const,
    cta: "استعلم الآن",
  },
  {
    icon: CalendarClock,
    title: "استعلام اشتراك بندر عدن",
    desc: "اختصار آمن لبوابة بندر عدن لمعرفة تاريخ انتهاء اشتراكك في الإنترنت.",
    to: "/bandar-aden-inquiry" as const,
    cta: "استعلم الآن",
  },
  {
    icon: Wand2,
    title: "توليد الصور بالذكاء الاصطناعي",
    desc: "أنشئ صوراً احترافية من وصف نصي بالعربية خلال ثوانٍ، بمعاينة مباشرة أثناء التوليد.",
    to: "/image-generator" as const,
    cta: "ابدأ التوليد",
  },
  {
    icon: Megaphone,
    title: "مساعد كتابة المحتوى التسويقي",
    desc: "أداة ذكية لصياغة نصوص إعلانية جذابة لمنتجاتك جاهزة للنشر على واتساب والسوشيال ميديا.",
    to: "/marketing-writer" as const,
    cta: "ابدأ الكتابة",
  },
  {
    icon: Wand2,
    title: "أدوات توليد أوامر الذكاء الاصطناعي",
    desc: "14 أداة مجانية: توليد وفحص الأوامر، أوامر الصور والفيديو، كاشف النصوص، إعادة الصياغة، وأكثر.",
    to: "/ai-prompt-tools" as const,
    cta: "افتح الأدوات",
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
  const { dial } = Route.useSearch();
  return (

    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <SiteHeader
        cta={
          <Link
            to="/designs"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            ابدأ الآن
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
              <WhatsAppMessenger initialCountry={dial} />
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

const COUNTRY_CODES = COUNTRIES.map((c) => ({
  code: c.dial,
  label: `${c.flag} ${c.ar}`,
  iso: c.iso,
}));

export function WhatsAppMessenger({
  initialCountry,
}: {
  initialCountry?: string;
}) {
  const [country, setCountry] = useState(initialCountry || "+967");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCountry) setCountry(initialCountry);
  }, [initialCountry]);

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
              <option key={c.iso} value={c.code}>
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
