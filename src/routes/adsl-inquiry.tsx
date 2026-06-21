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
  Monitor,
  KeyRound,
} from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";

export const Route = createFileRoute("/adsl-inquiry")({
  head: () => ({
    meta: [
      { title: "استعلام باقات الإنترنت الأرضي — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "توجيه آمن لصفحة استعلام باقات الإنترنت الأرضي (يمن نت) لمعرفة حالة الباقة أو التجديد.",
      },
      {
        property: "og:title",
        content: "استعلام باقات الإنترنت الأرضي — الخليج تيليكوم",
      },
      {
        property: "og:description",
        content:
          "خدمة توجيه آمن لصفحة الاستعلام الرسمية لباقات الإنترنت الأرضي.",
      },
    ],
  }),
  component: AdslInquiryPage,
});

const WHATSAPP_BRAND = "967775608601";
const YEMEN_NET_URL = "https://adsl.yemen.net.ye/acct";

function AdslInquiryPage() {
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
                "radial-gradient(900px 500px at 20% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              خدمة استعلام
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              استعلام باقات الإنترنت الأرضي
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              اختصار آمن للوصول إلى صفحة الاستعلام الرسمية لباقات الإنترنت الأرضي (يمن نت)
              لمعرفة حالة الباقة، الاستهلاك، وموعد التجديد.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Security Notice */}
          <div className="mb-6 rounded-2xl border border-warning-border bg-warning-bg p-4 text-right">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground" />
              <div>
                <p className="text-sm font-bold text-warning-foreground">
                  خصوصيتك وأمانك أولويتنا
                </p>
                <p className="mt-1 text-sm text-warning-foreground/90">
                  لا يتم حفظ اسم المستخدم أو كلمة المرور داخل هذا الموقع.
                  سيتم توجيهك إلى الصفحة الرسمية ليمن نت لإدخال بياناتك بأمان.
                </p>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-10">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Wifi className="h-7 w-7" />
            </div>

            <h2 className="text-center text-xl font-black text-foreground sm:text-2xl">
              الاستعلام عن باقة الإنترنت الأرضي
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground sm:text-base">
              اضغط على الزر أدناه للانتقال إلى صفحة الاستعلام الرسمية ليمن نت.
              ستدخل بياناتك مباشرة على الموقع الرسمي.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={YEMEN_NET_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
              >
                <ExternalLink className="h-4 w-4" />
                الانتقال إلى صفحة الاستعلام الرسمية
              </a>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>تأكد من أنك تستخدم الموقع الرسمي قبل إدخال أي بيانات</span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10">
            <h3 className="mb-6 text-lg font-extrabold text-primary">
              خطوات الاستعلام
            </h3>
            <div className="space-y-4">
              <StepItem
                icon={<KeyRound className="h-5 w-5" />}
                title="اضغط على زر الانتقال"
                desc="سيتم فتح صفحة يمن نت الرسمية في نافذة جديدة."
              />
              <StepItem
                icon={<Monitor className="h-5 w-5" />}
                title="أدخل بيانات الدخول"
                desc="أدخل اسم المستخدم وكلمة المرور الخاصة بك في الموقع الرسمي."
              />
              <StepItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="أكمل رمز التحقق"
                desc="أدخل رمز الكابتشا أو التحقق المطلوب يدويًا."
              />
              <StepItem
                icon={<Wifi className="h-5 w-5" />}
                title="اطلع على حالة الباقة"
                desc="ستظهر لك تفاصيل الباقة، الاستهلاك، والأيام المتبقية."
              />
            </div>
          </div>

          {/* Help */}
          <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              إذا واجهت مشكلة في الدخول أو نسيت كلمة المرور، تواصل مع دعم يمن نت مباشرة
              أو راسلنا عبر واتساب للمساعدة.
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

function StepItem({
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
