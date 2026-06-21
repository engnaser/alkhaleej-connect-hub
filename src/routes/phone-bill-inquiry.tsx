import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import {
  ArrowLeft,
  Sparkles,
  Phone,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Monitor,
  MessageCircle,
  Receipt,
} from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";

export const Route = createFileRoute("/phone-bill-inquiry")({
  head: () => ({
    meta: [
      { title: "استعلام فاتورة الهاتف الثابت — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "توجيه آمن لصفحة الاستعلام الرسمية عن فاتورة الهاتف الثابت في اليمن.",
      },
      {
        property: "og:title",
        content: "استعلام فاتورة الهاتف الثابت — الخليج تيليكوم",
      },
      {
        property: "og:description",
        content:
          "خدمة توجيه آمن لصفحة الاستعلام الرسمية عن فاتورة الهاتف الثابت.",
      },
    ],
  }),
  component: PhoneBillInquiryPage,
});

const WHATSAPP_BRAND = "967775608601";
const PTC_URL = "https://ptc.gov.ye/?page_id=2354";
const SUPPORT_WHATSAPP = "967781635755";

function PhoneBillInquiryPage() {
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
            <Link to="/" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary">
              الرئيسية
            </Link>
            <Link to="/designs" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary">
              التصاميم
            </Link>
            <Link to="/services" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary">
              الخدمات
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_BRAND}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary"
            >
              تواصل معنا
            </a>
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
                "radial-gradient(900px 500px at 20% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              خدمة استعلام
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              استعلام فاتورة الهاتف الثابت
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              أدخل رقم الهاتف الثابت مع مفتاح المدينة، ثم انتقل إلى صفحة الاستعلام الرسمية
              للمؤسسة العامة للاتصالات.
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
                  لا يتم حفظ رقم الهاتف أو أي بيانات داخل هذا الموقع.
                  سيتم توجيهك إلى الصفحة الرسمية لإدخال بياناتك بأمان.
                </p>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-10">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Receipt className="h-7 w-7" />
            </div>

            <h2 className="text-center text-xl font-black text-foreground sm:text-2xl">
              الاستعلام عن فاتورة الهاتف الثابت
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground sm:text-base">
              أدخل رقم الهاتف الثابت مع مفتاح المدينة، ثم اضغط على الزر للانتقال
              إلى الصفحة الرسمية للاستعلام.
            </p>

            {/* Phone Input */}
            <div className="mx-auto mt-6 max-w-sm">
              <label className="mb-2 block text-sm font-bold text-foreground">
                رقم الهاتف الثابت
              </label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="مثال: 02325419"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-left text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                dir="ltr"
                maxLength={20}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                يرجى إدخال رقم الهاتف الثابت مع مفتاح المدينة.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={PTC_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
              >
                <ExternalLink className="h-4 w-4" />
                فتح صفحة الاستعلام الرسمية
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

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>تأكد من أنك تستخدم الموقع الرسمي قبل إدخال أي بيانات</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-extrabold text-primary">
              <FileText className="h-5 w-5" />
              إرشادات مهمة
            </h3>
            <div className="space-y-4">
              <InfoItem
                icon={<Phone className="h-5 w-5" />}
                title="أدخل رقم الهاتف الثابت مع مفتاح المدينة"
                desc="تأكد من إدخال الرقم بشكل صحيح بما في ذلك مفتاح المدينة (مثال: 01، 02، 03...)."
              />
              <InfoItem
                icon={<Monitor className="h-5 w-5" />}
                title="الاستعلام يتم عبر الموقع الرسمي"
                desc="الاستعلام يتم عبر الموقع الرسمي للمؤسسة العامة للاتصالات، وليس داخل موقعنا."
              />
              <InfoItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="لا يتم حفظ أي بيانات"
                desc="لا يتم حفظ رقم الهاتف أو أي بيانات داخل موقعنا. خصوصيتك محمية بالكامل."
              />
              <InfoItem
                icon={<AlertTriangle className="h-5 w-5" />}
                title="في حال تعذر الوصول"
                desc="في حال لم تعمل الصفحة الرسمية، حاول لاحقًا أو تواصل مع خدمة العملاء عبر واتساب."
              />
            </div>
          </div>

          {/* Help */}
          <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              إذا واجهت مشكلة في الاستعلام أو تحتاج مساعدة، تواصل مع خدمة العملاء
              عبر واتساب للمساعدة.
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
