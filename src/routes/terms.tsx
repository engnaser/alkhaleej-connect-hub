import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط والأحكام — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "الشروط والأحكام الخاصة باستخدام منصة الخليج تيليكوم وخدماتها.",
      },
      { property: "og:title", content: "الشروط والأحكام — الخليج تيليكوم" },
      {
        property: "og:description",
        content: "قواعد وشروط استخدام منصة الخليج تيليكوم.",
      },,
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/terms" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main dir="rtl" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-black text-primary">
        الشروط والأحكام
      </h1>
      <div className="space-y-4 text-foreground/85 leading-relaxed">
        <p>
          باستخدامك لمنصة الخليج تيليكوم فإنك توافق على الالتزام بالشروط
          والأحكام التالية.
        </p>
        <h2 className="text-xl font-bold text-primary">استخدام الخدمة</h2>
        <p>
          يجب استخدام الخدمات لأغراض مشروعة فقط، ويُمنع استخدامها بأي شكل
          يخالف القوانين المحلية أو الدولية.
        </p>
        <h2 className="text-xl font-bold text-primary">
          حقوق الملكية الفكرية
        </h2>
        <p>
          جميع المحتويات والتصاميم على المنصة محمية بحقوق الملكية الفكرية
          للخليج تيليكوم ولا يجوز إعادة استخدامها دون إذن مسبق.
        </p>
        <h2 className="text-xl font-bold text-primary">تعديل الشروط</h2>
        <p>
          نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم إعلامك بأي تغييرات
          جوهرية.
        </p>
      </div>
    </main>
  );
}
