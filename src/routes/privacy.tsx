import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "سياسة الخصوصية الخاصة بمنصة الخليج تيليكوم وحماية بيانات المستخدمين.",
      },
      { property: "og:title", content: "سياسة الخصوصية — الخليج تيليكوم" },
      {
        property: "og:description",
        content: "كيفية جمع واستخدام وحماية بياناتك على منصة الخليج تيليكوم.",
      },,
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/privacy" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main dir="rtl" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-black text-primary">سياسة الخصوصية</h1>
      <div className="space-y-4 text-foreground/85 leading-relaxed">
        <p>
          تلتزم منصة الخليج تيليكوم بحماية خصوصية مستخدميها. نحن نجمع فقط
          البيانات الضرورية لتقديم خدماتنا ولا نشاركها مع أي طرف ثالث دون
          إذنك.
        </p>
        <h2 className="text-xl font-bold text-primary">البيانات التي نجمعها</h2>
        <p>
          نقوم بجمع بيانات الاتصال الأساسية مثل الاسم ورقم الهاتف والبريد
          الإلكتروني لتسهيل تواصلنا معك وتقديم الخدمات المطلوبة.
        </p>
        <h2 className="text-xl font-bold text-primary">استخدام البيانات</h2>
        <p>
          تُستخدم بياناتك حصراً لتقديم الخدمات وتحسين تجربة المستخدم، ولن يتم
          استخدامها لأي غرض تجاري خارج نطاق المنصة.
        </p>
        <h2 className="text-xl font-bold text-primary">حماية البيانات</h2>
        <p>
          نطبق أعلى معايير الأمان لحماية بياناتك من الوصول غير المصرح به.
        </p>
      </div>
    </main>
  );
}
