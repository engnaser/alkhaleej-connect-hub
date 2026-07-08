import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "سياسة الأمان — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "الإجراءات الأمنية التي تتبعها منصة الخليج تيليكوم لحماية المستخدمين.",
      },
      { property: "og:title", content: "سياسة الأمان — الخليج تيليكوم" },
      {
        property: "og:description",
        content: "كيف نحمي حسابك وبياناتك على منصة الخليج تيليكوم.",
      },,
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/safety" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/safety" }],
  }),
  component: SafetyPage,
});

function SafetyPage() {
  return (
    <main dir="rtl" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-black text-primary">سياسة الأمان</h1>
      <div className="space-y-4 text-foreground/85 leading-relaxed">
        <p>
          أمانك أولويتنا. تعتمد منصة الخليج تيليكوم على أحدث تقنيات الحماية
          لضمان سلامة بياناتك ومعاملاتك.
        </p>
        <h2 className="text-xl font-bold text-primary">تشفير البيانات</h2>
        <p>
          جميع البيانات المتبادلة بينك وبين المنصة تمر عبر اتصال مشفر (HTTPS)
          لضمان الخصوصية.
        </p>
        <h2 className="text-xl font-bold text-primary">حماية الحسابات</h2>
        <p>
          نوصي دائماً باستخدام كلمات مرور قوية وعدم مشاركة بيانات حسابك مع
          أي شخص.
        </p>
        <h2 className="text-xl font-bold text-primary">الإبلاغ عن مشكلة</h2>
        <p>
          إذا لاحظت أي نشاط مشبوه، يرجى التواصل معنا فوراً عبر قنوات التواصل
          الرسمية.
        </p>
      </div>
    </main>
  );
}
