import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
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
  Package,
  Wrench,
  UserCog,
  Settings2,
  AlertTriangle,
  Clock,
  Phone,
  Settings,
  Copy,
  Check,
  Share2,
  PhoneCall,
} from "lucide-react";
import { useState } from "react";
import { useYouItems, youIconFor, type YouSection, type YouItem } from "@/lib/youServicesStore";
import { useYouPackagesStore, type YouPackage } from "@/lib/youPackagesStore";
import { useIsAdmin } from "@/hooks/use-is-admin";

export const Route = createFileRoute("/you-services")({
  head: () => ({
    meta: [
      { title: "خدمات شركة يو — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "تصفّح باقات وخدمات شركة يو، إدارة الحساب والرصيد، وإعدادات ضبط الإنترنت في مكان واحد.",
      },
      { property: "og:title", content: "خدمات شركة يو — الخليج تيليكوم" },
      {
        property: "og:description",
        content:
          "كل ما تحتاجه من باقات وخدمات شركة يو وإعدادات الإنترنت بواجهة عربية حديثة.",
      },
    ],
  }),
  component: YouServicesPage,
});

function YouServicesPage() {
  const { isAdmin } = useIsAdmin();
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                <Link
                  to="/admin/you-packages"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/20"
                >
                  <Package className="h-3.5 w-3.5" />
                  إدارة الباقات
                </Link>
                <Link
                  to="/admin/you-services"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/20"
                >
                  <Settings className="h-3.5 w-3.5" />
                  إدارة الخدمات
                </Link>
              </>
            )}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              كل الخدمات
            </Link>
          </div>
        }
      />

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
              مركز شركة يو
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              خدمات شركة يو
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              تصفّح الباقات والخدمات وأكواد الاستعلام وإعدادات الإنترنت بسهولة
              من مكان واحد.
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
                أسعار ومعلومات
              </TabsTrigger>
              <TabsTrigger
                value="internet"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <Settings2 className="h-4 w-4" />
                ضبط الإنترنت
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-warning-border bg-warning-bg p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground" />
              <p className="text-sm font-semibold text-warning-foreground">
                قد تتغير الأكواد والأسعار من الشركة، يرجى التأكد قبل الاشتراك.
              </p>
            </div>

            <TabsContent value="packages" className="mt-6">
              <PackagesPanel />
            </TabsContent>
            <TabsContent value="services" className="mt-6">
              <SectionList section="services" />
            </TabsContent>
            <TabsContent value="account" className="mt-6">
              <SectionList section="account" />
            </TabsContent>
            <TabsContent value="internet" className="mt-6">
              <SectionList section="internet" />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function SectionList({ section }: { section: YouSection }) {
  const { items, loading } = useYouItems(section);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Clock className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-black text-foreground">قريباً</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          سيتم إضافة المحتوى قريباً بإذن الله.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <YouItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function YouItemCard({ item }: { item: YouItem }) {
  const dialCode = item.code?.trim();
  const deactivateCode = item.deactivation_code?.trim();
  const Icon = youIconFor(item.icon);
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-black text-foreground">{item.title}</h3>
        </div>
        {item.price && (
          <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {item.price}
          </span>
        )}
      </div>
      {item.description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      )}
      {dialCode && (
        <div className="mt-auto flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-3">
          <span className="font-mono text-sm font-bold text-foreground" dir="ltr">
            {dialCode}
          </span>
          <a
            href={`tel:${encodeURIComponent(dialCode)}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:scale-[1.02]"
          >
            <Phone className="h-3.5 w-3.5" />
            تفعيل
          </a>
        </div>
      )}
      {deactivateCode && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3">
          <span className="font-mono text-sm font-bold text-destructive" dir="ltr">
            {deactivateCode}
          </span>
          <a
            href={`tel:${encodeURIComponent(deactivateCode)}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 bg-background px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/10"
          >
            <Phone className="h-3.5 w-3.5" />
            إلغاء
          </a>
        </div>
      )}
    </div>
  );
}

function PackagesPanel() {
  const { categories, loading } = useYouPackagesStore();

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Package className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-black text-foreground">لا توجد باقات بعد</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          سيتم إضافة باقات شركة يو قريباً بإذن الله.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        {/* placeholder to preserve layout parity */}
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
                    <YouPackageCard key={pkg.id} pkg={pkg} />
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

function YouPackageCard({ pkg }: { pkg: YouPackage }) {
  const [copied, setCopied] = useState(false);
  const dialCode = pkg.code?.trim();

  const details = [
    `📦 ${pkg.name}`,
    `💰 السعر: ${pkg.price}`,
    `🌐 الإنترنت: ${pkg.internet}`,
    `📞 الدقائق: ${pkg.minutes}`,
    `✉️ الرسائل: ${pkg.sms}`,
    `⏳ الصلاحية: ${pkg.validity}`,
    `📶 الشبكة: ${pkg.network}`,
    dialCode ? `🔢 كود التفعيل: ${dialCode}` : "",
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

  return (
    <div className="relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h4 className="text-base font-extrabold leading-tight text-foreground">
          {pkg.name}
        </h4>
        <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
          {pkg.network}
        </span>
      </div>
      <div className="mb-4 text-3xl font-black text-primary" dir="rtl">
        ريال {pkg.price}
      </div>
      <ul className="space-y-2 text-sm text-foreground/85">
        <li className="flex items-center justify-between border-b border-border/50 pb-1.5">
          <span className="text-muted-foreground">الإنترنت</span>
          <span className="font-bold">{pkg.internet}</span>
        </li>
        <li className="flex items-center justify-between border-b border-border/50 pb-1.5">
          <span className="text-muted-foreground">الدقائق</span>
          <span className="font-bold">{pkg.minutes}</span>
        </li>
        <li className="flex items-center justify-between border-b border-border/50 pb-1.5">
          <span className="text-muted-foreground">الرسائل</span>
          <span className="font-bold">{pkg.sms}</span>
        </li>
        <li className="flex items-center justify-between border-b border-border/50 pb-1.5">
          <span className="text-muted-foreground">الصلاحية</span>
          <span className="font-bold">{pkg.validity}</span>
        </li>
        {dialCode && (
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">كود التفعيل</span>
            <span dir="ltr" className="font-mono font-bold text-primary">
              {dialCode}
            </span>
          </li>
        )}
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "تم النسخ" : "نسخ التفاصيل"}
        </button>
        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          <Share2 className="h-3.5 w-3.5" />
          مشاركة
        </a>
      </div>
      {dialCode ? (
        <a
          href={`tel:${encodeURIComponent(dialCode)}`}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-primary/10 px-3 py-2.5 text-sm font-extrabold text-primary transition-transform hover:scale-[1.02]"
        >
          <PhoneCall className="h-4 w-4" />
          اضغط لتفعيل الباقة
        </a>
      ) : (
        <button
          type="button"
          disabled
          title="لم يتم تحديد كود تفعيل لهذه الباقة"
          className="mt-2 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-dashed border-border bg-muted/40 px-3 py-2.5 text-sm font-extrabold text-muted-foreground"
        >
          <PhoneCall className="h-4 w-4" />
          كود التفعيل غير متوفر
        </button>
      )}
    </div>
  );
}

