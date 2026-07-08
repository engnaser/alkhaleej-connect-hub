import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ArrowLeft,
  Sparkles,
  Wifi,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Monitor,
  MessageCircle,
  Copy,
  CalendarClock,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/bandar-aden-inquiry")({
  head: () => ({
    meta: [
      { title: "استعلام اشتراك بندر عدن — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "اختصار آمن لبوابة بندر عدن للاستعلام عن تاريخ انتهاء الاشتراك وتجديد الخدمة.",
      },
      {
        property: "og:title",
        content: "استعلام اشتراك بندر عدن",
      },
      {
        property: "og:description",
        content:
          "ادخل إلى بوابة بندر عدن الرسمية وتعرّف على تاريخ انتهاء اشتراكك بسهولة وأمان.",
      },
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/bandar-aden-inquiry" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/bandar-aden-inquiry" }],
  }),
  component: BandarAdenPage,
});

const WHATSAPP_BRAND = "967775608601";
const SUPPORT_WHATSAPP = "967781635755";
const OFFICIAL_URL =
  "https://aden.alwaadi.net/web#cids=1&menu_id=119&active_id=60123&model=renewal.proces&view_type=form";
const LOGIN_URL = "https://aden.alwaadi.net/web/login";

function openOfficialInquiry() {
  window.location.assign(OFFICIAL_URL);
}

function BandarAdenPage() {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_URL);
      toast.success("تم نسخ رابط الاستعلام");
    } catch {
      toast.error("لم يتم النسخ، حاول يدوياً");
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
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
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 500px at 20% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              خدمة استعلام إنترنت
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              استعلام اشتراك بندر عدن
            </h1>
            <p className="mx-auto mt-2 text-sm font-bold text-muted-foreground sm:text-base">
              (بوابة الوادي — aden.alwaadi.net)
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              انتقل إلى البوابة الرسمية لاستعلام تاريخ انتهاء اشتراكك في خدمة بندر عدن
              وإدارة عملية التجديد.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-2xl border border-warning-border bg-warning-bg p-4 text-right">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground" />
              <div>
                <p className="text-sm font-bold text-warning-foreground">
                  خصوصيتك وأمانك أولويتنا
                </p>
                <p className="mt-1 text-sm text-warning-foreground/90">
                  لا يتم حفظ أي بيانات داخل موقعنا. تسجيل الدخول والاستعلام يتمّان مباشرة
                  عبر البوابة الرسمية لبندر عدن.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-10">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Wifi className="h-7 w-7" />
            </div>

            <h2 className="text-center text-xl font-black text-foreground sm:text-2xl">
              تاريخ انتهاء اشتراك بندر عدن
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground sm:text-base">
              اضغط على الزر أدناه للانتقال إلى صفحة الاستعلام الرسمية، سجّل دخولك ببياناتك
              ليظهر تاريخ انتهاء الاشتراك.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={openOfficialInquiry}
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
              >
                <ExternalLink className="h-4 w-4" />
                فتح صفحة الاستعلام الرسمية
              </button>

              <a
                href={OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-8 py-3 text-sm font-extrabold text-primary transition-colors hover:bg-primary/15"
              >
                <ExternalLink className="h-4 w-4" />
                فتح في نافذة خارجية
              </a>

              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3 text-sm font-extrabold text-foreground transition-colors hover:bg-secondary/50"
              >
                <KeyRound className="h-4 w-4" />
                صفحة تسجيل الدخول
              </a>

              <a
                href={`https://wa.me/${SUPPORT_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-border bg-secondary px-8 py-3.5 text-sm font-extrabold text-foreground transition-colors hover:bg-secondary/70"
              >
                <MessageCircle className="h-4 w-4" />
                مراسلة الدعم
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-3.5 text-sm font-extrabold text-foreground transition-colors hover:bg-secondary/50"
              >
                <Copy className="h-4 w-4" />
                نسخ الرابط
              </button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>تأكد من أنك تستخدم الموقع الرسمي قبل إدخال أي بيانات</span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-extrabold text-primary">
              <FileText className="h-5 w-5" />
              خطوات الاستعلام عن تاريخ انتهاء الاشتراك
            </h3>
            <div className="space-y-4">
              <InfoItem
                icon={<Monitor className="h-5 w-5" />}
                title="١. افتح البوابة الرسمية"
                desc="اضغط على زر (فتح صفحة الاستعلام الرسمية) للانتقال إلى موقع بندر عدن."
              />
              <InfoItem
                icon={<KeyRound className="h-5 w-5" />}
                title="٢. سجّل الدخول ببياناتك"
                desc="أدخل اسم المستخدم وكلمة المرور الخاصة باشتراكك في بندر عدن."
              />
              <InfoItem
                icon={<CalendarClock className="h-5 w-5" />}
                title="٣. اطّلع على تاريخ انتهاء الاشتراك"
                desc="بعد الدخول ستظهر تفاصيل اشتراكك بما فيها تاريخ بدء الاشتراك وتاريخ انتهائه."
              />
              <InfoItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="لا يتم حفظ أي بيانات"
                desc="بياناتك تبقى داخل البوابة الرسمية فقط، ولا يتم تخزينها عندنا."
              />
              <InfoItem
                icon={<AlertTriangle className="h-5 w-5" />}
                title="في حال تعذر الوصول"
                desc="قد تكون البوابة تحت ضغط أو الشبكة بطيئة، حاول لاحقاً أو تواصل مع الدعم."
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              إذا واجهت مشكلة في الاستعلام أو تحتاج مساعدة، تواصل مع خدمة العملاء عبر واتساب.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_BRAND}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-extrabold text-white shadow-md transition-transform hover:scale-[1.03]"
            >
              <ExternalLink className="h-4 w-4" />
              تواصل معنا عبر واتساب
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function InfoItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-secondary/30 p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-extrabold text-foreground">{title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
