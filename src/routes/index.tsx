import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Zap,
  ListChecks,
  Headphones,
  BellRing,
  Wrench,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Building2,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  MessageCircle,
  Download,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/967781635755";
const APP_URL =
  "https://play.google.com/store/apps/details?id=alkhalijtele.comapp&hl=ar";
const SUPPORT_EMAIL = "alkhalijtelecom2021@gmail.com";
const SUPPORT_PHONE = "‎+967 781 635 755";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الخليج تيليكوم لخدمات الشحن الإلكتروني | المنصة الرسمية" },
      {
        name: "description",
        content:
          "المنصة الرسمية للخليج تيليكوم لخدمات الشحن الإلكتروني — شحن فوري، دعم وكلاء، وخدمات اتصالات موثوقة في الجمهورية اليمنية.",
      },
      { property: "og:title", content: "الخليج تيليكوم لخدمات الشحن الإلكتروني" },
      {
        property: "og:description",
        content:
          "المنصة الرسمية للخليج تيليكوم — شحن إلكتروني فوري، متابعة العمليات، ودعم فني معتمد.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navLinks = [
  { href: "#home", label: "الرئيسية" },
  { href: "#services", label: "الخدمات" },
  { href: "#about", label: "من نحن" },
  { href: "#privacy", label: "سياسة الخصوصية" },
];

const metrics = [
  {
    icon: Building2,
    label: "الاسم التجاري القانوني",
    value: "الخليج تيليكوم لخدمات الشحن الإلكتروني",
  },
  { icon: Phone, label: "هاتف التواصل المعتمد", value: "‎+967 777 000 000" },
  { icon: Mail, label: "البريد الإلكتروني الرسمي", value: "support@alkhaleej-telecom.ye" },
  { icon: MapPin, label: "العنوان", value: "الجمهورية اليمنية" },
];

const services = [
  {
    n: "01",
    icon: Zap,
    title: "شحن فوري وباقات",
    desc: "تقديم شحن إلكتروني رسمي وفوري لجميع شبكات الاتصالات المحلية وباقات الإنترنت.",
  },
  {
    n: "02",
    icon: ListChecks,
    title: "متابعة العمليات",
    desc: "تنظيم ومتابعة طلبات الشحن الإلكتروني وتحديث العميل بحالة عمليته أولًا بأول.",
  },
  {
    n: "03",
    icon: Headphones,
    title: "دعم الوكلاء والعملاء",
    desc: "استقبال والرد على استفسارات نقاط البيع والوكلاء عبر قنوات رسمية واضحة.",
  },
  {
    n: "04",
    icon: BellRing,
    title: "إشعارات خدمية",
    desc: "إرسال تنبيهات تشغيلية وتحديثات الدفع بشكل آلي وفق شروط استخدام المنصة.",
  },
  {
    n: "05",
    icon: Wrench,
    title: "الدعم الفني",
    desc: "حلول عامة لمشاكل الوصول للنظام، رموز الشحن، والاستعلام عن المعلومات.",
  },
  {
    n: "06",
    icon: MessageSquare,
    title: "الرسائل الخدمية",
    desc: "إدارة حالة الطلبات وتحديثات الرصيد الآلية وفق الأنظمة الرسمية المعتمدة.",
  },
];

const privacy = [
  "الأسماء التي يقدمها العميل طوعًا عند التواصل أو طلب الخدمة.",
  "أرقام الهاتف والبريد الإلكتروني لأغراض التواصل وتقديم الدعم فقط.",
  "تفاصيل الاستفسار اللازمة لمعالجة الطلب بدقة وسرعة.",
  "لا تُباع البيانات أو تُستخدم في تسويق غير مصرّح من طرف ثالث، إطلاقًا.",
];

const terms = [
  "التزام المستخدم بصحة المعلومات المقدمة عند طلب أي خدمة شحن أو اتصال.",
  "التحقق من وثائق الهوية لأي تفعيل لشريحة SIM أو عمليات شحن وفق الأنظمة المعتمدة.",
  "الاعتماد على لوائح نقاط البيع الرسمية الصادرة من الجهات التنظيمية في الجمهورية اليمنية.",
  "يحق للمنصة إيقاف أي عملية مخالفة للسياسات الرسمية دون إشعار مسبق.",
];

function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-background/75 shadow-sm backdrop-blur-xl"
            : "bg-background/40 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand (right in RTL) */}
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <div
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-md"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Zap className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold leading-tight text-primary sm:text-base">
                الخليج تيليكوم
              </div>
              <div className="hidden truncate text-[11px] text-muted-foreground sm:block">
                لخدمات الشحن الإلكتروني
              </div>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-bold text-whatsapp-foreground shadow-md transition-transform hover:scale-[1.02] hover:brightness-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">تواصل عبر واتساب</span>
            <span className="sm:hidden">واتساب</span>
          </a>
        </div>
      </header>

      <main className="pt-20">
        {/* HERO */}
        <section
          id="home"
          className="relative overflow-hidden"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
                <ShieldCheck className="h-4 w-4 text-cyan" />
                <span>منصة رسمية موثوقة ومعتمدة</span>
              </div>

              <h1 className="text-balance text-3xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
                خدمات شحن إلكتروني{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  رسمية وموثوقة
                </span>{" "}
                للاتصالات
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                الصفحة الرسمية لـ{" "}
                <span className="font-semibold text-foreground">الخليج تيليكوم</span>،
                تعرض عمليات الشحن الإلكتروني الرسمية، قنوات دعم العملاء، شروط
                الاستخدام، وإجراءات التحقق المعتمدة للدفع الرقمي وشرائح SIM.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/designs"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-[1.02] hover:bg-primary-glow sm:w-auto"
                >
                  تعرف على الخدمات
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-card px-7 py-3.5 text-sm font-bold text-primary transition-all hover:scale-[1.02] hover:border-primary hover:bg-primary/5 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  تواصل مباشرة
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS / IDENTITY */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">
                الهوية الرسمية للنشاط التجاري
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                بيانات التواصل والتسجيل المعتمدة للخليج تيليكوم
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div
                    className="mb-4 grid h-11 w-11 place-items-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground">
                    {m.label}
                  </div>
                  <div className="mt-1 text-sm font-bold leading-snug text-foreground">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="mx-auto mb-3 inline-block rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold text-primary">
                خدماتنا
              </div>
              <h2 className="text-3xl font-black text-foreground sm:text-4xl">
                ست خدمات أساسية ندعم بها عملاءنا
              </h2>
              <p className="mt-3 text-muted-foreground">
                منظومة متكاملة من خدمات الشحن الإلكتروني والدعم الفني وفق أعلى
                معايير الموثوقية.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.n}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1 origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className="grid h-14 w-14 place-items-center rounded-2xl text-primary transition-transform group-hover:scale-110"
                      style={{
                        background:
                          "color-mix(in oklab, var(--cyan) 14%, transparent)",
                      }}
                    >
                      <s.icon className="h-7 w-7" strokeWidth={2} />
                    </div>
                    <span className="text-3xl font-black text-cyan/30 transition-colors group-hover:text-cyan/70">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-extrabold text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                من نحن
              </div>
              <h2 className="text-3xl font-black text-foreground sm:text-4xl">
                هويتنا الرسمية ورسالتنا
              </h2>
            </div>

            <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-12">
              <p className="text-base leading-loose text-foreground sm:text-lg">
                نحن{" "}
                <span className="font-extrabold text-primary">
                  الخليج تيليكوم لخدمات الشحن الإلكتروني
                </span>
                ، مركز خدمات رقمية وإلكترونية معتمد يقدم دعم الشحن المنظم عبر
                قنوات رقمية رسمية. نهدف إلى تسهيل الوصول إلى خدمات الاتصالات،
                وضمان تجربة استخدام آمنة، شفافة، وموثقة. هذه المنصة هي صفحة
                هويتنا الرسمية.
              </p>

              {/* Security notice */}
              <div className="mt-8 flex items-start gap-4 rounded-2xl border-2 border-warning-border/60 bg-warning-bg p-5 sm:p-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-warning-border/30 text-warning-foreground">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1 text-sm font-extrabold text-warning-foreground sm:text-base">
                    تنبيه أمني هام
                  </h3>
                  <p className="text-sm leading-relaxed text-warning-foreground/90">
                    نلتزم في الخليج تيليكوم بعدم طلب كلمات مرور، رموز تحقق، أو
                    أي بيانات حساسة من العملاء عبر الموقع أو المحادثات. أي رسالة
                    تطلب ذلك تعتبر محاولة احتيال.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIVACY & TERMS */}
        <section id="privacy" className="bg-background">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-foreground sm:text-4xl">
                السياسات والشروط
              </h2>
              <p className="mt-2 text-muted-foreground">
                إطار قانوني واضح يضمن حقوق العملاء وشفافية التعامل.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <PolicyAccordion
                defaultOpen
                title="سياسة الخصوصية"
                icon={ShieldCheck}
                items={privacy}
              />
              <PolicyAccordion title="شروط الاستخدام" icon={ShieldAlert} items={terms} />
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
            <div
              className="overflow-hidden rounded-3xl p-8 text-center text-primary-foreground shadow-[var(--shadow-elevated)] sm:p-12"
              style={{ background: "var(--gradient-primary)" }}
            >
              <h3 className="text-2xl font-black sm:text-3xl">
                هل تحتاج إلى مساعدة فورية؟
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
                فريق دعم الخليج تيليكوم متاح للرد على استفساراتك عبر القنوات
                الرسمية المعتمدة.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-card px-7 py-3.5 text-sm font-extrabold text-primary shadow-lg transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل عبر واتساب الآن
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Zap className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div className="text-sm font-extrabold text-primary">
                  الخليج تيليكوم
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                المنصة الرسمية لخدمات الشحن الإلكتروني والاتصالات في الجمهورية
                اليمنية.
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold text-foreground">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold text-foreground">تواصل معنا</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-cyan" />
                  ‎+967 777 000 000
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-cyan" />
                  support@alkhaleej-telecom.ye
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-whatsapp transition-colors hover:brightness-90"
                  >
                    <MessageCircle className="h-4 w-4" />
                    واتساب الدعم الرسمي
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <div>
              جميع الحقوق محفوظة © الخليج تيليكوم لخدمات الشحن الإلكتروني 2026
            </div>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="transition-colors hover:text-primary">
                سياسة الخصوصية
              </a>
              <a href="#privacy" className="transition-colors hover:text-primary">
                شروط الاستخدام
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PolicyAccordion({
  title,
  icon: Icon,
  items,
  defaultOpen = false,
}: {
  title: string;
  icon: typeof ShieldCheck;
  items: string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:border-primary/30">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 p-6 text-right"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="truncate text-lg font-extrabold text-foreground">{title}</h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-3 px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
            {items.map((it, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
