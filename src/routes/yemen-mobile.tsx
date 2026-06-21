import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Sparkles,
  Smartphone,
  Package,
  Wrench,
  UserCog,
  Settings2,
  Copy,
  Check,
  Share2,
  Send,
  AlertTriangle,
  MessageCircle,
  Wifi,
  Phone,
  MessageSquare,
} from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";
import {
  APN_SETTINGS,
  type YMPackage,
} from "@/data/yemenMobilePackages";
import { usePackagesStore } from "@/lib/packagesStore";
import {
  useServicesStore,
  iconFor,
  type YMServiceRow,
  type ServiceGroup,
} from "@/lib/servicesStore";

export const Route = createFileRoute("/yemen-mobile")({
  head: () => ({
    meta: [
      { title: "خدمات يمن موبايل — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "تصفّح باقات يمن موبايل وخدماتها العامة، إدارة الحساب والرصيد، وإعدادات ضبط الإنترنت APN في مكان واحد.",
      },
      { property: "og:title", content: "خدمات يمن موبايل — الخليج تيليكوم" },
      {
        property: "og:description",
        content:
          "كل ما تحتاجه من باقات وخدمات يمن موبايل وإعدادات الإنترنت بواجهة عربية حديثة.",
      },
    ],
  }),
  component: YemenMobilePage,
});

const WHATSAPP_BRAND = "967775608601";

function YemenMobilePage() {
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
            <Link to="/" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary">الرئيسية</Link>
            <Link to="/designs" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary">التصاميم</Link>
            <Link to="/services" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary">الخدمات</Link>
            <a href={`https://wa.me/${WHATSAPP_BRAND}`} target="_blank" rel="noreferrer" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary">تواصل معنا</a>
          </nav>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            كل الخدمات
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
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              مركز يمن موبايل
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              خدمات يمن موبايل
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              تصفّح الباقات والخدمات وأكواد الاستعلام وإعدادات الإنترنت بسهولة من
              مكان واحد.
            </p>
          </div>
        </section>

        {/* TABS */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Tabs defaultValue="packages" className="w-full">
            <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]">
              <TabsTrigger
                value="packages"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <Package className="h-4 w-4" />
                تفعيل الباقات
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <Wrench className="h-4 w-4" />
                الخدمات
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <UserCog className="h-4 w-4" />
                إدارة الحساب والرصيد
              </TabsTrigger>
              <TabsTrigger
                value="internet"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <Settings2 className="h-4 w-4" />
                ضبط الإنترنت
              </TabsTrigger>
            </TabsList>

            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-warning-border bg-warning-bg p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground" />
              <p className="text-sm font-semibold text-warning-foreground">
                قد تتغير الأكواد والأسعار من الشركة، يرجى التأكد قبل الاشتراك.
              </p>
            </div>

            <TabsContent value="packages" className="mt-6">
              <PackagesTab />
            </TabsContent>
            <TabsContent value="services" className="mt-6">
              <ServicesTab group="general" />
            </TabsContent>
            <TabsContent value="account" className="mt-6">
              <ServicesTab group="account" />
            </TabsContent>
            <TabsContent value="internet" className="mt-6">
              <InternetTab />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function PackagesTab() {
  const { categories, loading } = usePackagesStore();
  if (loading && categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        جاري تحميل الباقات...
      </div>
    );
  }
  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
        لا توجد باقات حالياً. يمكن للمسؤول إضافتها من{" "}
        <Link to="/admin/packages" className="font-bold text-primary hover:underline">
          لوحة التحكم
        </Link>
        .
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Link
          to="/admin/packages"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          <Settings2 className="h-3.5 w-3.5" />
          إدارة الباقات
        </Link>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[categories[0].id]}
        className="space-y-3"
      >
        {categories.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <AccordionTrigger className="px-5 py-4 text-right hover:no-underline">
              <div className="flex flex-1 items-center justify-between gap-3">
                <div className="text-right">
                  <div className="text-base font-extrabold text-foreground">
                    {cat.title}
                  </div>
                  {cat.description && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      {cat.description}
                    </div>
                  )}
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {cat.packages.length} باقات
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              {cat.packages.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  لا توجد باقات في هذا القسم.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.packages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

function PackageCard({ pkg }: { pkg: YMPackage }) {
  const [copied, setCopied] = useState(false);

  const details = [
    `📦 ${pkg.name}`,
    `💰 السعر: ${pkg.price}`,
    `🌐 الإنترنت: ${pkg.internet}`,
    `📞 الدقائق: ${pkg.minutes}`,
    `✉️ الرسائل: ${pkg.sms}`,
    `⏳ الصلاحية: ${pkg.validity}`,
    `📶 الشبكة: ${pkg.network}`,
    pkg.code ? `🔢 كود التفعيل: ${pkg.code}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const shareUrl = `https://wa.me/?text=${encodeURIComponent(details)}`;
  const requestUrl = `https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent(
    `مرحبًا، أرغب بتفعيل الباقة التالية:\n\n${details}`,
  )}`;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-secondary/30 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-base font-extrabold text-foreground">{pkg.name}</h4>
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold text-primary">
          {pkg.network}
        </span>
      </div>
      <div className="mb-4 text-2xl font-black text-primary">{pkg.price}</div>
      <ul className="space-y-1.5 text-sm text-foreground/85">
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">الإنترنت</span>
          <span className="font-bold">{pkg.internet}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">الدقائق</span>
          <span className="font-bold">{pkg.minutes}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">الرسائل</span>
          <span className="font-bold">{pkg.sms}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">الصلاحية</span>
          <span className="font-bold">{pkg.validity}</span>
        </li>
        {pkg.code && (
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">كود التفعيل</span>
            <span dir="ltr" className="font-mono font-bold text-primary">
              {pkg.code}
            </span>
          </li>
        )}
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "تم النسخ" : "نسخ التفاصيل"}
        </button>
        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          <Share2 className="h-3.5 w-3.5" />
          مشاركة
        </a>
      </div>
      <a
        href={requestUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-extrabold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
      >
        <Send className="h-3.5 w-3.5" />
        طلب تفعيل الباقة
      </a>
    </div>
  );
}

function ServicesTab({ group }: { group: ServiceGroup }) {
  const { services, loading } = useServicesStore();
  const list = services.filter((s) => s.group === group);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Link
          to="/admin/services"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          <Settings2 className="h-3.5 w-3.5" />
          إدارة الخدمات
        </Link>
      </div>
      {loading && list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          جاري تحميل الخدمات...
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          لا توجد خدمات في هذا القسم.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </>
  );
}

function ServiceCard({ service }: { service: YMServiceRow }) {
  const [copied, setCopied] = useState(false);
  const Icon = iconFor(service.icon);

  const handleCopy = async () => {
    if (!service.code) return;
    try {
      await navigator.clipboard.writeText(service.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const helpUrl = `https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent(
    `مرحبًا، أحتاج مساعدة بخصوص خدمة: ${service.title}`,
  )}`;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="text-base font-extrabold text-foreground">
        {service.title}
      </h4>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      {service.code && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-border bg-secondary/40 px-3 py-2">
          <span className="text-xs text-muted-foreground">الكود</span>
          <span dir="ltr" className="font-mono text-sm font-bold text-primary">
            {service.code}
          </span>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {service.code ? (
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "تم النسخ" : "نسخ الكود"}
          </button>
        ) : (
          <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-secondary/30 px-3 py-2 text-xs font-bold text-muted-foreground">
            بدون كود
          </span>
        )}
        <a
          href={helpUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-extrabold text-primary-foreground hover:scale-[1.02]"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          مساعدة
        </a>
      </div>
    </div>
  );
}

function InternetTab() {
  const [copied, setCopied] = useState(false);

  const apnText = [
    `إعدادات APN ليمن موبايل 4G`,
    `الاسم: ${APN_SETTINGS.name}`,
    `APN: ${APN_SETTINGS.apn}`,
    `اسم المستخدم: ${APN_SETTINGS.username || "بدون"}`,
    `كلمة المرور: ${APN_SETTINGS.password || "بدون"}`,
    `نوع التحقق: ${APN_SETTINGS.authType}`,
    `نوع APN: ${APN_SETTINGS.apnType}`,
    `البروتوكول: ${APN_SETTINGS.apnProtocol}`,
  ].join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apnText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const shareUrl = `https://wa.me/?text=${encodeURIComponent(apnText)}`;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* APN Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <Wifi className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-extrabold text-foreground">
            إعدادات APN
          </h3>
        </div>
        <dl className="space-y-2.5 text-sm">
          <ApnRow label="الاسم" value={APN_SETTINGS.name} />
          <ApnRow label="APN" value={APN_SETTINGS.apn} mono />
          <ApnRow label="اسم المستخدم" value={APN_SETTINGS.username || "بدون"} />
          <ApnRow label="كلمة المرور" value={APN_SETTINGS.password || "بدون"} />
          <ApnRow label="نوع التحقق" value={APN_SETTINGS.authType} />
          <ApnRow label="نوع APN" value={APN_SETTINGS.apnType} mono />
          <ApnRow label="البروتوكول" value={APN_SETTINGS.apnProtocol} mono />
        </dl>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "تم النسخ" : "نسخ إعدادات APN"}
          </button>
          <a
            href={shareUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-extrabold text-primary-foreground hover:scale-[1.02]"
          >
            <Share2 className="h-4 w-4" />
            مشاركة عبر واتساب
          </a>
        </div>
      </div>

      {/* Guides */}
      <div className="space-y-3">
        <GuideCard
          icon={<Smartphone className="h-5 w-5" />}
          title="تفعيل بيانات الهاتف"
          steps={[
            "افتح الإعدادات على هاتفك.",
            "اختر «الشبكة المحمولة» أو «الاتصال».",
            "فعّل خيار «بيانات الجوال».",
            "تأكد من تحديد شريحة يمن موبايل كشريحة الإنترنت.",
          ]}
        />
        <GuideCard
          icon={<Settings2 className="h-5 w-5" />}
          title="ضبط 3G / 4G"
          steps={[
            "ادخل إلى إعدادات الشبكة.",
            "اختر «نوع الشبكة المفضّل».",
            "اختر 4G/LTE إن كانت متوفرة، أو 3G في المناطق غير المغطاة.",
            "أعد تشغيل الجوال إذا لزم الأمر.",
          ]}
        />
        <GuideCard
          icon={<Wrench className="h-5 w-5" />}
          title="حلول مشاكل الإنترنت"
          steps={[
            "تأكد من وجود رصيد كافٍ أو باقة فعّالة.",
            "أعد تشغيل الجوال أو فعّل وضع الطيران لثوانٍ.",
            "تحقق من إعدادات APN أعلاه.",
            "إن استمرت المشكلة، تواصل مع خدمة العملاء 118.",
          ]}
        />
      </div>
    </div>
  );
}

function ApnRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        dir={mono ? "ltr" : undefined}
        className={`text-sm font-bold text-foreground ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function GuideCard({
  icon,
  title,
  steps,
}: {
  icon: React.ReactNode;
  title: string;
  steps: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h4 className="text-base font-extrabold text-foreground">{title}</h4>
      </div>
      <ol className="space-y-2 text-sm text-foreground/85">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
              {i + 1}
            </span>
            <span className="leading-relaxed">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
