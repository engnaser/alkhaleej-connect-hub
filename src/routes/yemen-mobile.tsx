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
import { Radar, PhoneForwarded, Globe, PhoneIncoming, PhoneOutgoing, MapPin } from "lucide-react";
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
            <TabsContent value="account" className="mt-6 space-y-6">
              <PrepaidTariffTable />
              <PrepaidTariffTableGray />
              <PrepaidMmsTariffTable />
              <InternationalRoamingTariff />
              <RoamingSmsTariffTable />
              <SabahiServiceCard />
              <SalifniServiceCard />




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

function PrepaidTariffTable() {
  const rows = [
    { to: "داخل الشبكة", call: "9 ريال", sms: "4 ريال" },
    { to: "يمن موبايل إلى الثابت", call: "5 ريال", sms: "---" },
    { to: "من يمن موبايل إلى GSM", call: "20 ريال", sms: "8 ريال" },
    { to: "من ثابت إلى يمن موبايل", call: "5 ريال", sms: "---" },
    { to: "من يمن موبايل إلى خارج اليمن", call: "بحسب تعرفة تيليمن", sms: "20 ريال" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-center text-base font-bold text-foreground md:text-lg">
        تعرفة المكالمات والرسائل لنظام الدفع المسبق
      </h3>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-emerald-50 text-emerald-900">
              <th className="border-b border-border px-3 py-2.5 text-center font-bold">جهة الاتصال</th>
              <th className="border-b border-border px-3 py-2.5 text-center font-bold">الاتصال (دقيقة)</th>
              <th className="border-b border-border px-3 py-2.5 text-center font-bold">رسائل</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.to} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                <td className="border-b border-border px-3 py-2.5 text-center text-foreground">{r.to}</td>
                <td className="border-b border-border px-3 py-2.5 text-center text-foreground">{r.call}</td>
                <td className="border-b border-border px-3 py-2.5 text-center text-foreground">{r.sms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PrepaidTariffTableGray() {
  const rows = [
    { to: "داخل الشبكة", call: "9 ريال", sms: "4 ريال" },
    { to: "يمن موبايل إلى الثابت", call: "5 ريال", sms: "---" },
    { to: "من يمن موبايل إلى GSM", call: "20 ريال", sms: "8 ريال" },
    { to: "من ثابت إلى يمن موبايل", call: "5 ريال", sms: "---" },
    { to: "من يمن موبايل إلى خارج اليمن", call: "بحسب تعرفة تيليمن", sms: "20 ريال" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold text-foreground md:text-xl">
        تعرفة المكالمات والرسائل لنظام الدفع المسبق
      </h3>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-foreground">
              <th className="border-b border-border px-4 py-3 text-center font-bold">جهة الاتصال</th>
              <th className="border-b border-border px-4 py-3 text-center font-bold">الاتصال (دقيقة)</th>
              <th className="border-b border-border px-4 py-3 text-center font-bold">رسائل</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.to} className="bg-background hover:bg-muted/40 transition-colors">
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.to}</td>
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.call}</td>
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.sms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PrepaidMmsTariffTable() {
  const rows = [
    { to: "رسالة وسائط (MMS) داخل الشبكة", price: "20 ريال" },
    { to: "رسالة وسائط (MMS) إلى خارج الشبكة (GSM)", price: "30 ريال" },
    { to: "استقبال رسالة وسائط (MMS)", price: "مجاناً" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold text-foreground md:text-xl">
        تعرفة رسائل الوسائط المتعددة (MMS)
      </h3>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-foreground">
              <th className="border-b border-border px-4 py-3 text-center font-bold">جهة الاتصال</th>
              <th className="border-b border-border px-4 py-3 text-center font-bold">التعرفة</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.to} className="bg-background hover:bg-muted/40 transition-colors">
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.to}</td>
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoamingSmsTariffTable() {
  const rows = [
    { type: "الرسائل الواحدة الصادرة", price: "140 ريال" },
    { type: "الرسائل الواردة إلى الهاتف", price: "40 ريال" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold text-foreground md:text-xl">
        تعرفة تكلفة الرسائل أثناء التجوال الدولي من الرصيد الأساسي
      </h3>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-foreground">
              <th className="border-b border-border px-4 py-3 text-center font-bold">نوع الرسالة</th>
              <th className="border-b border-border px-4 py-3 text-center font-bold">التكلفة</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.type} className="bg-background hover:bg-muted/40 transition-colors">
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.type}</td>
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SabahiServiceCard() {
  const rows = [
    { s: "عند الاتصال ضمن شبكة يمن موبايل", d: "1 ريال فقط للدقيقة الواحدة" },
    { s: "عند الاتصال إلى الثابت", d: "3 ريال للدقيقة الواحدة" },
    { s: "الاتصال إلى الشبكات المحلية الأخرى (GSM)", d: "7 ريال للدقيقة الواحدة" },
    { s: "الرسائل SMS ضمن شبكة يمن موبايل وإلى الشبكات المحلية الأخرى", d: "1 ريال للرسالة الواحدة" },
    { s: "استخدام الانترنت", d: "3 ريال للميجا الواحد" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-3 text-center text-lg font-bold text-foreground md:text-xl">
        خدمة صباحي
      </h3>
      <div className="space-y-3 text-sm leading-relaxed text-foreground">
        <p>
          تمنحك تخفيض في تعرفة الاتصال والرسائل النصية إلى جميع الشبكات المحلية والانترنت،
          وذلك من الساعة 3:00 فجراً وحتى الساعة 7:00 صباحاً.
          <span className="text-muted-foreground"> (ما عدا شهر رمضان فتبدأ من الساعة 5 فجراً وحتى الساعة 9 صباحاً).</span>
        </p>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-emerald-900">
          الخدمة مفعلة لدى جميع مشتركي يمن موبايل وبشكل آلي.
        </div>
        <p className="text-muted-foreground">
          العرض بدون أي اشتراك شهري؛ حيث أنها مفعلة بشكل آلي، وعند الاتصال في الأوقات المذكورة أعلاه
          تحسب الخدمة بتخفيض كما هو موضح بالجدول التالي:
        </p>
      </div>

      <h4 className="mb-2 mt-5 text-center text-base font-bold text-foreground">جدول التخفيضات</h4>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-foreground">
              <th className="border-b border-border px-4 py-3 text-center font-bold">الخدمة</th>
              <th className="border-b border-border px-4 py-3 text-center font-bold">التخفيض</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.s} className="bg-background hover:bg-muted/40 transition-colors">
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.s}</td>
                <td className="border-b border-border px-4 py-3 text-center font-medium text-emerald-800">{r.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SalifniServiceCard() {
  const [open, setOpen] = useState(false);
  const rows = [
    { a: "100 ريال", f: "10 ريال", t: "110 ريال" },
    { a: "200 ريال", f: "20 ريال", t: "220 ريال" },
    { a: "300 ريال", f: "30 ريال", t: "330 ريال" },
    { a: "400 ريال", f: "40 ريال", t: "440 ريال" },
    { a: "500 ريال", f: "50 ريال", t: "550 ريال" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-3 text-center text-lg font-bold text-foreground md:text-xl">
        خدمة سلفني
      </h3>
      <div className="space-y-3 text-sm leading-relaxed text-foreground">
        <p>
          خدمة تمكن مشتركي الدفع المسبق من الحصول على رصيد إضافي عند نفاذ رصيدهم الأساسي،
          ليتم استقطاع المبلغ عند قيام المشترك بعملية الشحن التالية.
        </p>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-emerald-900">
          شرط التفعيل: يجب أن يكون قد مر على تفعيل الرقم أكثر من 3 أشهر.
        </div>
      </div>

      <h4 className="mb-2 mt-5 text-center text-base font-bold text-foreground">قائمة مبالغ سلفني</h4>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-foreground">
              <th className="border-b border-border px-4 py-3 text-center font-bold">المبلغ</th>
              <th className="border-b border-border px-4 py-3 text-center font-bold">رسوم الخدمة</th>
              <th className="border-b border-border px-4 py-3 text-center font-bold">المبلغ الإجمالي المستحق</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.a} className="bg-background hover:bg-muted/40 transition-colors">
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.a}</td>
                <td className="border-b border-border px-4 py-3 text-center text-foreground">{r.f}</td>
                <td className="border-b border-border px-4 py-3 text-center font-medium text-emerald-800">{r.t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-2.5 text-sm font-bold text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
        >
          <span aria-hidden>⚡</span>
          تفعيل الخدمة
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">تفعيل خدمة سلفني</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm text-foreground">
            <p>للحصول على سلفة رصيد، اتصل بالرقم التالي واتبع التعليمات الصوتية:</p>
            <div className="rounded-full border-2 border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-2xl font-extrabold tracking-widest text-emerald-800">
              333
            </div>
            <p className="text-muted-foreground text-xs">
              سيتم استقطاع المبلغ الإجمالي (المبلغ + الرسوم) تلقائياً عند عملية الشحن التالية.
            </p>
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <a
              href="tel:333"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
            >
              📞 اتصل الآن بـ 333
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}





const ROAMING_ZONES = [
  {
    id: 1,
    label: "نطاق جغرافي 1",
    code: "أ",
    tariff: { outYemen: "150", incoming: "100", a: "60", b: "200", c: "400" },
    countries: [
      "السعودية", "الإمارات", "الكويت", "قطر", "البحرين", "عُمان", "الأردن",
      "مصر", "سوريا", "لبنان", "العراق", "السودان",
    ],
  },
  {
    id: 2,
    label: "نطاق جغرافي 2",
    code: "ب",
    tariff: { outYemen: "200", incoming: "150", a: "250", b: "80", c: "500" },
    countries: [
      "تركيا", "المغرب", "تونس", "الجزائر", "ليبيا", "موريتانيا",
      "الصومال", "جيبوتي", "فلسطين",
    ],
  },
  {
    id: 3,
    label: "نطاق جغرافي 3",
    code: "ج",
    tariff: { outYemen: "400", incoming: "250", a: "500", b: "350", c: "120" },
    countries: [
      "بريطانيا", "فرنسا", "ألمانيا", "إيطاليا", "إسبانيا", "هولندا",
      "الولايات المتحدة", "كندا", "الصين", "ماليزيا", "إندونيسيا", "الهند",
    ],
  },
  {
    id: 4,
    label: "نطاق جغرافي 4",
    code: "ش",
    tariff: { outYemen: "600", incoming: "400", a: "700", b: "500", c: "300" },
    countries: [
      "أستراليا", "نيوزيلندا", "اليابان", "كوريا الجنوبية", "البرازيل",
      "الأرجنتين", "جنوب أفريقيا", "روسيا", "المكسيك", "باقي دول العالم",
    ],
  },
] as const;

function InternationalRoamingTariff() {
  const [activeZone, setActiveZone] = useState<number>(1);
  const zone = ROAMING_ZONES.find((z) => z.id === activeZone)!;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-center gap-2 text-center">
        <Globe className="h-5 w-5 shrink-0 text-emerald-600" />
        <h3 className="text-base font-bold text-foreground md:text-lg">
          تعرفة تكلفة المكالمات أثناء التجوال الدولي من الرصيد الأساسي
        </h3>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-foreground">
              <th className="border-b border-l border-border px-3 py-3 text-center font-bold">
                <div className="flex items-center justify-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span>النطاق الجغرافي</span>
                </div>
              </th>
              <th className="border-b border-l border-border px-3 py-3 text-center font-bold">
                <div className="flex items-center justify-center gap-1.5">
                  <PhoneOutgoing className="h-4 w-4 text-emerald-600" />
                  <span>صادرة لليمن</span>
                </div>
              </th>
              <th className="border-b border-l border-border px-3 py-3 text-center font-bold">
                <div className="flex items-center justify-center gap-1.5">
                  <PhoneIncoming className="h-4 w-4 text-emerald-600" />
                  <span>واردة للهاتف</span>
                </div>
              </th>
              <th className="border-b border-l border-border px-3 py-3 text-center font-bold">صادر من "أ"</th>
              <th className="border-b border-l border-border px-3 py-3 text-center font-bold">صادر من "ب"</th>
              <th className="border-b border-border px-3 py-3 text-center font-bold">صادر من "ج"</th>
            </tr>
          </thead>
          <tbody>
            {ROAMING_ZONES.map((z) => {
              const isActive = z.id === activeZone;
              return (
                <tr
                  key={z.id}
                  className={
                    isActive
                      ? "bg-emerald-50/70 font-bold text-emerald-900"
                      : "bg-background hover:bg-muted/40 transition-colors"
                  }
                >
                  <td className="border-b border-l border-border px-3 py-3 text-center">
                    النطاق {z.id} ({z.code})
                  </td>
                  <td className="border-b border-l border-border px-3 py-3 text-center">{z.tariff.outYemen}</td>
                  <td className="border-b border-l border-border px-3 py-3 text-center">{z.tariff.incoming}</td>
                  <td className="border-b border-l border-border px-3 py-3 text-center">{z.tariff.a}</td>
                  <td className="border-b border-l border-border px-3 py-3 text-center">{z.tariff.b}</td>
                  <td className="border-b border-border px-3 py-3 text-center">{z.tariff.c}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        الأسعار بالريال اليمني للدقيقة الواحدة، وقد تتغير حسب تعرفة الشركة.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {ROAMING_ZONES.map((z) => {
          const isActive = z.id === activeZone;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => setActiveZone(z.id)}
              className={
                "rounded-full border px-4 py-2 text-xs font-bold transition-all sm:text-sm " +
                (isActive
                  ? "border-emerald-700 bg-emerald-700 text-white shadow-md"
                  : "border-border bg-background text-foreground hover:border-emerald-500 hover:text-emerald-700")
              }
            >
              {z.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-emerald-600" />
          <h4 className="text-sm font-bold text-foreground">
            دول {zone.label} ({zone.code})
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {zone.countries.map((country) => (
            <div
              key={country}
              className="rounded-lg border border-border bg-card px-3 py-2 text-center text-xs font-medium text-foreground shadow-sm sm:text-sm"
            >
              {country}
            </div>
          ))}
        </div>
      </div>
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
          {group === "general" && (
            <UnifiedServiceCard
              title="تحويل المكالمات لرقم آخر في حالة انشغال الخط"
              description="لتفعيل خدمة تحويل المكالمات لرقم آخر في حالة انشغال الخط، قم بإدخال الرقم المراد التحويل إليه ثم اضغط زر التفعيل. ولإلغاء التفعيل قم بالضغط على زر الإلغاء."
              icon={PhoneForwarded}
              requiresInput
              inputPlaceholder="أدخل الرقم..."
              buildCodeFromInput={(n) => `*90*${n}#`}
              activationMethods={[
                { type: "call", label: "تفعيل عادي", buildCode: (n) => `*90*${n}#` },
                { type: "call", label: "تفعيل VoLTE", buildCode: (n) => `*90999*${n}#` },
              ]}
              deactivationCode="*900#"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: تحويل المكالمات عند الانشغال")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="تحويل المكالمات لرقم آخر في حالة عدم الرد"
              description="لتفعيل خدمة تحويل المكالمات لرقم آخر في حالة عدم الرد، قم بإدخال الرقم المراد التحويل إليه ثم اضغط زر التفعيل. ولإلغاء التفعيل قم بالضغط على زر الإلغاء."
              icon={PhoneForwarded}
              requiresInput
              inputPlaceholder="أدخل الرقم..."
              buildCodeFromInput={(n) => `*92*${n}#`}
              activationMethods={[
                { type: "call", label: "تفعيل عادي", buildCode: (n) => `*92*${n}#` },
                { type: "call", label: "تفعيل VoLTE", buildCode: (n) => `*92999*${n}#` },
              ]}
              deactivationCode="*920#"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: تحويل المكالمات عند عدم الرد")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="تحويل جميع المكالمات لرقم آخر"
              description="تمكنك هذه الخدمة من تحويل جميع مكالماتك إلى رقم آخر."
              icon={PhoneForwarded}
              requiresInput
              inputPlaceholder="أدخل الرقم..."
              buildCodeFromInput={(n) => `*72*${n}#`}
              activationMethods={[
                { type: "call", label: "تفعيل عادي", buildCode: (n) => `*72*${n}#` },
                { type: "call", label: "تفعيل VoLTE", buildCode: (n) => `*72999*${n}#` },
              ]}
              deactivationCode="*720#"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: تحويل جميع المكالمات")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة إلغاء تحويل جميع المكالمات"
              description="تمكنك هذه الخدمة من إلغاء تحويل مكالماتك إلى رقم آخر."
              icon={PhoneForwarded}
              deactivationCode="*730#"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: إلغاء تحويل جميع المكالمات")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة التنبية بوجود مكالمة"
              description="تمكنك من وصول المكالمة إلى رقمك أثناء انشغال رقمك بمكالمة أخرى."
              icon={PhoneCall}
              activationCode="*74#"
              deactivationCode="*740#"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: التنبيه بوجود مكالمة")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة معرفة رقم حسابك"
              description="لحماية رقمك عند تعبئة الرصيد تمكنك خدمة سداد من معرفة رقم حسابك لرقم تلفونك. يمكنك استخدام رقم الحساب في تعبئة رصيد عبر نقاط البيع ومكاتب البريد. اضغط تفعيل وسوف يتم ارسال رسالة تحتوي على رقم حسابك."
              icon={PhoneCall}
              activationCode="1003"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: معرفة رقم الحساب")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="تغيير الرمز السري"
              description="تغيير الرمز السري يتم استخدامه في عملية تحويل الرصيد لرقم أخرى أو خدمات أخرى. اضغط تفعيل واتبع التعليمات الصوتية واضغط رقم 9 ثم الرقم 5 ثم إدخال الرمز الجديد."
              icon={PhoneCall}
              activationCode="95"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: تغيير الرمز السري")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة رنات"
              description="نغمتك عنوان تميزك .. اختر اروع النغمات واجعل حياتك اكثر متعه تسمح خدمة رنات لمشتركي يمن موبايل باستبدال نغمة الرنين العادية بنغمات يسمعها المتصل بك مع العديد من الخيارات. وتتنوع النغمات ما بين ادعيه واناشيد وتواشيح واغاني وموسيقي رسوم الخدمة (100) ريال اشتراك شهري للخدمة تكلفة الاتصال (5) ريال للدقيقة."
              icon={PhoneCall}
              activationCode="9900"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: رنات")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="للحصول على الرقم ( السري/الشخصي )"
              description="للحصول على الرقم ( السري/الشخصي ) اتصل بالرقم (188) ، واتبع التعليمات الصوتية."
              icon={PhoneCall}
              activationCode="188"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: الحصول على الرقم السري")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة أهلا كل الناس (وخدمة أحبائي)"
              description={`باقة تمنحك تعرفة مخفضة لجميع الشبكات المحلية باشتراك شهري، بالإضافة لخدمة "أحبائي" لتخفيض تكلفة الاتصال ضمن مجموعة أرقام محددة.

• أهلا كل الناس: تعرفة مخفضة 9 ريال للشبكة المحلية و20 ريال للشبكات الأخرى، اشتراك شهري 300 ريال. التفعيل والإلغاء عبر الاتصال مجاناً بـ 333.

• خدمة أحبائي: تخفيض 30% ضمن مجموعة 10 أرقام (يمن موبايل). تكلفة استبدال الرقم 30 ريال. تدار القائمة عبر الاتصال بـ 333.`}
              icon={PhoneCall}
              activationCode="333"
              deactivationCode="333"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص خدمة: أهلا كل الناس / أحبائي")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="باقة سهيل توفير"
              description={`باقة تمنحك مزايا خط الفوترة والتعرفة المخفضة مع الاحتفاظ بمزايا الدفع المسبق، وبدون دفع تأمين للرقم.

• مميزات الباقة: تمنحك الانتقال إلى مزايا خط الفوترة والتمتع بمميزات (التعرفة المخفضة) مع الاحتفاظ بمزايا الدفع المسبق من خدمات وباقات وغيرها. لا تحتاج أن تدفع تأمين للرقم كخطوط نظام الفوترة.

• رسوم الباقة: 500 ريال اشتراك شهري وتلقائي.

• لتفعيل أو إلغاء الباقة: يتم التفعيل أو الإلغاء بالاتصال على 333 واتباع التعليمات الصوتية.`}
              icon={PhoneCall}
              activationCode="333"
              deactivationCode="333"
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: باقة سهيل توفير")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة تسديد الفواتير"
              description={`خيارات متعددة لتسهيل وتيسير عملية تسديد فواتير الهواتف المحمولة وتفعيل الباقات من خلال رصيدك الإلكتروني.

وضعت شركة يمن موبايل لمشتركيها عددًا من الخيارات التي من شأنها تسهيل وتيسير عملية تسديد فواتير هواتفهم المحمولة كلما اقتضت الحاجة إلى ذلك، من خلال:

• رصيدك الإلكتروني: يمكنك القيام بسداد وشحن رقمك أو رقم مشترك آخر، كما يمكنك تفعيل الباقات المختلفة.

اضغط تفعيل واتبع التعليمات.`}
              icon={PhoneCall}
              activationCode="6000"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: خدمة تسديد الفواتير")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة التحويل من فورجي إلى VoLTE"
              description={`خدمة لترقية رقمك للاستفادة من تقنية المكالمات الصوتية عبر الجيل الرابع (VoLTE).

لتحويل رقمك من فورجي إلى VoLTE اتصل من نفس الرقم على 121 ثم اضغط رمز النجمة (*) ليوصلكم بخدمة العملاء.`}
              icon={PhoneCall}
              activationCode="121"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: التحويل من فورجي إلى VoLTE")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة التحويل من VoLTE إلى فورجي"
              description={`خدمة لترقية أو إرجاع حالة رقمك من تقنية VoLTE إلى شبكة فورجي التقليدية.

لتحويل رقمك من VoLTE إلى فورجي اتصل من نفس الرقم على 121 ثم اضغط رمز النجمة (*) ليوصلكم بخدمة العملاء.`}
              icon={PhoneCall}
              activationCode="121"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: التحويل من VoLTE إلى فورجي")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة التحويل من نظام مسبق إلى فوترة"
              description={`إمكانية الانتقال من نظام الدفع المسبق إلى نظام الفوترة مع الاحتفاظ بنفس الرقم والاستمتاع بمزايا الفوترة الجديدة.

• تفاصيل التحويل: بإمكانك الانتقال والتحويل من نظام الدفع المسبق الخاص بك إلى نظام الفوترة الجديد والاستمتاع بمزايا نظام الفوترة مع الاحتفاظ بنفس رقمك.

• ملاحظات هامة: إن كان متوفراً رصيد أساسي أو رصيد إنترنت يظل في الرقم، ولكن يجب إعادة تفعيل خدمة الإنترنت من جديد في الرقم إن كانت مفعلة من سابق، ودفع مبلغ خدمة سلفني (100) ريال إن كان العميل قد استخدمها من قبل.

• تفعيل الخدمة: على المشترك زيارة المركز الرئيسي ليمن موبايل أو أحد فروعنا وإبراز البطاقة الشخصية لتعبئة عقد جديد لخط الفوترة باسمه.

• التكلفة: 1100 ريال رسوم التحويل + 1000 ريال تأمين خط الفوترة.`}
              icon={PhoneCall}
              activationCode="121"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: التحويل من نظام مسبق إلى فوترة")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة التحويل من نظام فوترة إلى نظام دفع مسبق"
              description={`إمكانية الانتقال من نظام الفوترة إلى نظام الدفع المسبق مع الاحتفاظ بنفس الرقم والاستمتاع بمزايا النظام الجديد.

• مميزات الخدمة: إمكانية الانتقال من نظام الفوترة إلى نظام الدفع المسبق والاستمتاع بمزايا الدفع المسبق مع الاحتفاظ بنفس الرقم.

• تنبيهات هامة: يجب إعادة تفعيل خدمة الإنترنت من جديد إن كانت مفعلة، ويجب دفع أي مبالغ مستحقة على الرقم. يجب اصطحاب البطاقة الشخصية. سيتم إعادة مبلغ التأمين للمشترك بعد استكمال دفع المستحق إن وجد.

• تفعيل الخدمة: على المشترك زيارة المركز الرئيسي ليمن موبايل أو أحد الفروع لطلب تفعيل الخدمة، أو إرسال البطاقة الشخصية مع طلب من مالك الرقم بالموافقة على التحويل.

• التكلفة: 1100 ريال رسوم التحويل من نظام الفوترة إلى نظام الدفع المسبق.`}
              icon={PhoneCall}
              activationCode="121"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: التحويل من فوترة إلى دفع مسبق")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة نقل ملكية الرقم"
              description={`إمكانية تحويل ملكية الخط من المالك الحالي إلى شخص آخر.

• تفاصيل الخدمة: بإمكان مشتركي يمن موبايل تحويل ملكية خطوطهم إلى ملكية شخص آخر.

• الشروط الواجب توافرها: الخدمة متوفرة حصرياً في المركز الرئيسي أو أحد الفروع بالأمانة. لإكمال عملية النقل يتطلب حضور المالك الحالي والمالك الجديد للمركز. يجب أن تكون البطاقة الشخصية الإلكترونية متوفرة من قبل الطرفين عند حضورهم. في حالة كون ملكية الرقم تابعة لشركة أو مؤسسة يجب إحضار تخويل مصدق بإمكانية تحويل ملكية الخط من قبل الشركة المعنية.

• التكلفة: نقل الملكية يتم بـ 550 ريال.`}
              icon={PhoneCall}
              activationCode="121"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: نقل ملكية الرقم")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="خدمة التجوال الدولي"
              description={`إمكانية استخدام رقمك خارج أراضي الجمهورية اليمنية (اتصال ورسائل) لمشتركي نظام الفوترة. (خدمة الإنترنت ليست ضمن التجوال).

• أولاً: نبذة عن الخدمة — تقدم للمشتركين إمكانية استخدام الرقم في الخارج للاتصال والرسائل.

• ثانياً: جدول الأسعار (بالريال اليمني)
  — النطاق 1: صادر لليمن 250 | وارد لهاتف 150 | محلي 150 | إلى نطاق آخر 300
  — النطاق 2: صادر لليمن 400 | وارد لهاتف 250 | محلي 250 | إلى نطاق آخر 500
  — النطاق 3: صادر لليمن 700 | وارد لهاتف 500 | محلي 500 | إلى نطاق آخر 900
  — النطاق 4: صادر لليمن 1200 | وارد لهاتف 900 | محلي 900 | إلى نطاق آخر 1500

• ثالثاً: شروط التفعيل — زيارة المركز الرئيسي، تفعيل الصفر الدولي، والتأكد من أن الشريحة تدعم التجوال (GSM).

• رابعاً: التكلفة — رفع سقف التأمين إلى 40 ألف ريال.

• خامساً: ملاحظات — التأكد من تغيير الشريحة إلى (GSM)، وإلغاء تحويل المكالمات قبل السفر.`}
              icon={PhoneCall}
              activationCode="121"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: خدمة التجوال الدولي")}`}
            />
          )}
          {group === "general" && (
            <UnifiedServiceCard
              title="الاشتراك بخط فوترة"
              description={`إمكانية الحصول على خط فوترة والاستمتاع بمزايا الرصيد المجاني والتعرفة الخاصة.

• آلية الاشتراك: للحصول على خط فوترة تفضل بزيارة أقرب مركز خدمات لشركة يمن موبايل مصطحباً البطاقة الشخصية.

• التكلفة: 990 ريال رسوم خط الفوترة العادي (تختلف حسب فئة الرقم المختار) + 1000 ريال مبلغ تأمين (الحد الأدنى).

• الرصيد المجاني: 150 دقيقة داخل الشبكة، 150 ميجا، 100 رسالة.

• صلاحية الرصيد: 10 أيام.`}
              icon={PhoneCall}
              activationCode="121"
              deactivationCode=""
              helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص: الاشتراك بخط فوترة")}`}
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
    <div className="space-y-5">
      <UnifiedServiceCard
        title="تفعيل خدمة الإنترنت 3G"
        description="خدمة لتفعيل الاتصال بإنترنت الجيل الثالث (3G) على رقمك. للتفعيل، قم بالاتصال بالرقم 1112 واتباع التعليمات الصوتية. يرجى التأكد من ضبط إعدادات APN في هاتفك بعد تفعيل الخدمة لضمان عمل الإنترنت بشكل صحيح."
        icon={Wifi}
        activationCode="1112"
        helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص تفعيل خدمة الإنترنت 3G")}`}
      />

      <UnifiedServiceCard
        title="تفعيل خدمة الإنترنت 4G"
        description="خدمة لتفعيل تقنية الإنترنت عالي السرعة (4G) على رقمك. للتفعيل، قم بالاتصال بالرمز *444 واتباع التعليمات الصوتية. يرجى التأكد من أن شريحتك تدعم تقنية 4G وأن هاتفك يدعم هذه الخدمة لضمان أفضل تجربة إنترنت."
        icon={Wifi}
        activationCode="*444"
        helpUrl={`https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent("مرحبًا، أحتاج مساعدة بخصوص تفعيل خدمة الإنترنت 4G")}`}
      />

      <div className="grid gap-5 lg:grid-cols-2">

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
