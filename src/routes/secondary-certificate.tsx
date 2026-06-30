import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ArrowLeft,
  Sparkles,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Monitor,
  MessageCircle,
  Copy,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/secondary-certificate")({
  head: () => ({
    meta: [
      { title: "استعلام شهادة الثانوية العامة (المناطق المحررة) — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "توجيه آمن للموقع الرسمي للاستعلام عن نتيجة وشهادة الثانوية العامة للمناطق المحررة في اليمن (res-ye.net).",
      },
      {
        property: "og:title",
        content: "استعلام شهادة الثانوية العامة (المناطق المحررة)",
      },
      {
        property: "og:description",
        content:
          "اختصار آمن لصفحة الاستعلام الرسمية عن نتائج وشهادات الثانوية العامة للمناطق المحررة.",
      },
    ],
  }),
  component: SecondaryCertificatePage,
});

const WHATSAPP_BRAND = "967775608601";
const SUPPORT_WHATSAPP = "967781635755";
const OFFICIAL_URL = "https://res-ye.net/";

function SecondaryCertificatePage() {
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
              خدمة استعلام تعليمية
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              استعلام شهادة الثانوية العامة
            </h1>
            <p className="mx-auto mt-2 text-sm font-bold text-muted-foreground sm:text-base">
              (المناطق المحررة — الجمهورية اليمنية)
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              انتقل إلى الموقع الرسمي للاستعلام عن نتائج وشهادات الثانوية العامة في المناطق
              المحررة بسهولة وأمان.
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
                  لا يتم حفظ أي بيانات داخل هذا الموقع. سيتم توجيهك إلى الموقع الرسمي
                  لإدخال رقم الجلوس والاستعلام بأمان.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-10">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <GraduationCap className="h-7 w-7" />
            </div>

            <h2 className="text-center text-xl font-black text-foreground sm:text-2xl">
              نتائج الثانوية العامة للمناطق المحررة
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground sm:text-base">
              اضغط على الزر أدناه للانتقال إلى الموقع الرسمي للاستعلام عن نتيجتك وشهادتك
              عبر إدخال رقم الجلوس.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={OFFICIAL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
              >
                <ExternalLink className="h-4 w-4" />
                فتح الموقع الرسمي للاستعلام
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
              إرشادات مهمة
            </h3>
            <div className="space-y-4">
              <InfoItem
                icon={<Monitor className="h-5 w-5" />}
                title="الاستعلام يتم عبر الموقع الرسمي"
                desc="الاستعلام يتم مباشرة عبر موقع res-ye.net الرسمي، وليس داخل موقعنا."
              />
              <InfoItem
                icon={<BookOpen className="h-5 w-5" />}
                title="جهّز رقم الجلوس"
                desc="ستحتاج إلى إدخال رقم الجلوس الخاص بك في الموقع الرسمي لإظهار النتيجة."
              />
              <InfoItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="لا يتم حفظ أي بيانات"
                desc="لا يتم تخزين أي بيانات داخل موقعنا. خصوصيتك محمية بالكامل."
              />
              <InfoItem
                icon={<AlertTriangle className="h-5 w-5" />}
                title="في حال تعذر الوصول"
                desc="قد يكون الموقع تحت ضغط عالٍ يوم إعلان النتائج، حاول لاحقاً أو تواصل مع الدعم."
              />
              <InfoItem
                icon={<ExternalLink className="h-5 w-5" />}
                title="خدمة اختصار فقط"
                desc="هذه الخدمة توفر اختصاراً سريعاً وآمناً للوصول للموقع الرسمي ولا تحفظ بياناتك."
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
