import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useEffect, useState } from "react";
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
  PhoneCall,
  Pencil,
  Loader2,
  PhoneOff,
} from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";
import {
  APN_SETTINGS,
  type YMPackage,
} from "@/data/yemenMobilePackages";
import {
  usePackagesStore,
  updatePackage,
  NETWORK_OPTIONS,
  type NetworkType,
} from "@/lib/packagesStore";
import {
  useServicesStore,
  iconFor,
  type YMServiceRow,
  type ServiceGroup,
} from "@/lib/servicesStore";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { CallMeCard } from "@/components/call-me-card";
import { AbsherCard } from "@/components/absher-card";
import { ServiceCard as UnifiedServiceCard } from "@/components/service-card";
import { Radar, PhoneForwarded } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


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
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/yemen-mobile" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/yemen-mobile" }],
  }),
  component: YemenMobilePage,
});

const WHATSAPP_BRAND = "967775608601";

function YemenMobilePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <SiteHeader
        cta={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
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
                    <PackageCard key={pkg.id} pkg={pkg} catId={cat.id} />
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

function PackageCard({ pkg, catId }: { pkg: YMPackage; catId: string }) {
  const [copied, setCopied] = useState(false);
  const { isAdmin } = useIsAdmin();
  const [editOpen, setEditOpen] = useState(false);

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

  return (
    <div className="relative flex flex-col rounded-2xl border border-border bg-secondary/30 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40">
      {isAdmin && (
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          aria-label="تعديل الباقة"
          className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}
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
      {pkg.code && (
        <a
          href={`tel:${encodeURIComponent(pkg.code)}`}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary/10 px-3 py-2.5 text-xs font-extrabold text-primary transition-transform hover:scale-[1.02]"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          اضغط لتفعيل الباقة
        </a>
      )}

      {isAdmin && (
        <EditPackageDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          pkg={pkg}
          catId={catId}
        />
      )}
    </div>
  );
}

function EditPackageDialog({
  open,
  onOpenChange,
  pkg,
  catId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  pkg: YMPackage;
  catId: string;
}) {
  const [form, setForm] = useState<YMPackage>(pkg);
  const [saving, setSaving] = useState(false);

  // Reset when opened for a different pkg
  useEffect(() => {
    if (open) setForm(pkg);
  }, [open, pkg]);

  const set = <K extends keyof YMPackage>(k: K, v: YMPackage[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePackage(catId, { ...form, code: form.code || undefined });
      toast.success("تم حفظ التعديلات");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "تعذّر حفظ التعديلات");
    } finally {
      setSaving(false);
    }
  };

  const fields: Array<{ k: keyof YMPackage; label: string; dir?: "ltr" }> = [
    { k: "name", label: "اسم الباقة" },
    { k: "price", label: "السعر" },
    { k: "internet", label: "الإنترنت" },
    { k: "minutes", label: "الدقائق" },
    { k: "sms", label: "الرسائل" },
    { k: "validity", label: "الصلاحية" },
    { k: "code", label: "كود التفعيل", dir: "ltr" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">تعديل الباقة</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          {fields.map((f) => (
            <div key={f.k} className="grid gap-1.5">
              <Label htmlFor={`edit-${f.k}`} className="text-right text-xs">
                {f.label}
              </Label>
              <Input
                id={`edit-${f.k}`}
                dir={f.dir}
                value={(form[f.k] as string) ?? ""}
                onChange={(e) => set(f.k, e.target.value as YMPackage[typeof f.k])}
              />
            </div>
          ))}
          <div className="grid gap-1.5">
            <Label className="text-right text-xs">نوع الشبكة</Label>
            <select
              value={form.network}
              onChange={(e) => set("network", e.target.value as NetworkType)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              {NETWORK_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:justify-start">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground hover:scale-[1.02] disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            حفظ التعديلات
          </button>
          <button
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold text-foreground"
          >
            إلغاء
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
          {group === "general" && <CallMeCard />}
          {group === "general" && <AbsherCard />}
          {group === "general" && (
            <UnifiedServiceCard
              title="الكاشف الذكي"
              description="مميزات الخدمة: في حال كان هاتفك مغلقا أو خارج نطاق التغطية، خدمة الكاشف الذكي تسهل عليك التعرف على المتصل مباشرة عبر وصول رسالة (المكالمة المفقودة من رقم المتصل نفسه). الخدمة مجانية."
              icon={Radar}
              activationCode="*122#"
              deactivationCode="*123#"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: الكاشف الذكي")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="تحويل المكالمات لرقم آخر في حالة الخروج عن التغطية أو إغلاق الجهاز"
              description="لتفعيل خدمة تحويل المكالمات لرقم آخر في حالة انشغال الخط، قم بإدخال الرقم المراد التحويل إليه ثم اضغط زر التفعيل. وللإلغاء قم بالضغط على زر إلغاء التفعيل."
              icon={PhoneForwarded}
              requiresInput
              inputPlaceholder="أدخل الرقم هنا..."
              buildCodeFromInput={(n) => `*68*${n}#`}
              activationMethods={[
                {
                  type: "call",
                  label: "تفعيل عادي",
                  buildCode: (n) => `*68*${n}#`,
                },
                {
                  type: "call",
                  label: "تفعيل VoLTE",
                  buildCode: (n) => `*68999*${n}#`,
                },
              ]}
              deactivationCode="*680#"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: تحويل المكالمات")}`}
            />
          )}

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
  const [expanded, setExpanded] = useState(false);
  const [phone, setPhone] = useState("");
  const Icon = iconFor(service.icon);

  const PHONE_TOKEN = /\{phone\}|\{رقم\}|#PHONE#/gi;
  const requiresPhone = !!service.code && PHONE_TOKEN.test(service.code);
  // Reset regex lastIndex after test with /g flag
  PHONE_TOKEN.lastIndex = 0;

  const trimmedPhone = phone.trim().replace(/\s|-/g, "");
  const phoneValid = /^\d{6,}$/.test(trimmedPhone);

  const resolvedCode = requiresPhone
    ? phoneValid
      ? service.code!.replace(PHONE_TOKEN, trimmedPhone)
      : ""
    : service.code ?? "";

  const displayCode = requiresPhone
    ? service.code!.replace(PHONE_TOKEN, trimmedPhone || "رقم_الهاتف")
    : service.code;

  const handleCopy = async () => {
    if (!resolvedCode) {
      if (requiresPhone) toast.error("يرجى إدخال رقم الهاتف أولاً");
      return;
    }
    try {
      await navigator.clipboard.writeText(resolvedCode);
      setCopied(true);
      toast.success("تم نسخ الكود");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const helpUrl = `https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent(
    `مرحبًا، أحتاج مساعدة بخصوص خدمة: ${service.title}`,
  )}`;

  const callHref = resolvedCode
    ? `tel:${encodeURIComponent(resolvedCode)}`
    : undefined;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="text-base font-extrabold text-foreground">
        {service.title}
      </h4>
      <div className="mt-1.5 flex-1">
        <p
          className={`text-sm leading-relaxed text-muted-foreground ${expanded ? "" : "line-clamp-3"}`}
        >
          {service.description}
        </p>
        {(service.description?.length ?? 0) > 120 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs font-bold text-primary hover:underline"
          >
            {expanded ? "عرض أقل" : "عرض المزيد"}
          </button>
        )}
      </div>

      {requiresPhone && (
        <div className="mt-4">
          <Label htmlFor={`phone-${service.id}`} className="text-xs font-bold text-foreground">
            رقم الهاتف المستفيد
          </Label>
          <Input
            id={`phone-${service.id}`}
            type="tel"
            inputMode="numeric"
            dir="ltr"
            placeholder="7XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 text-left font-mono"
          />
          {phone && !phoneValid && (
            <p className="mt-1 text-[11px] text-destructive">أدخل رقماً صحيحاً</p>
          )}
        </div>
      )}

      {(service.code || service.deactivation_code) && (
        <div className="mt-4 space-y-1.5">
          {service.code && (
            <div className="flex items-center justify-between rounded-lg border border-dashed border-border bg-secondary/40 px-3 py-2">
              <span className="text-xs text-muted-foreground">كود التفعيل</span>
              <span dir="ltr" className="font-mono text-sm font-bold text-primary">
                {displayCode}
              </span>
            </div>
          )}
          {service.deactivation_code && (
            <div className="flex items-center justify-between rounded-lg border border-dashed border-destructive/30 bg-destructive/5 px-3 py-2">
              <span className="text-xs text-muted-foreground">كود إلغاء التفعيل</span>
              <span dir="ltr" className="font-mono text-sm font-bold text-destructive">
                {service.deactivation_code}
              </span>
            </div>
          )}
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
        {service.code && (
          <a
            href={callHref}
            aria-disabled={!callHref}
            onClick={(e) => {
              if (!callHref) {
                e.preventDefault();
                toast.error("يرجى إدخال رقم الهاتف أولاً");
              }
            }}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-extrabold text-primary hover:bg-primary/20 ${
              !callHref ? "opacity-60" : ""
            }`}
          >
            <PhoneCall className="h-3.5 w-3.5" />
            اتصل للتفعيل
          </a>
        )}
        {(service.deactivation_code || service.code) && (
          <a
            href={`tel:${encodeURIComponent(service.deactivation_code || (service.code as string).replace(PHONE_TOKEN, trimmedPhone || "").replace(/^\*/, "#"))}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-extrabold text-destructive hover:bg-destructive/20"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            إلغاء التفعيل
          </a>
        )}
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
