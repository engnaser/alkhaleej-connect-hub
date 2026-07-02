import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "اتصل بنا — الخليج تيليكوم" },
      {
        name: "description",
        content: "تواصل مع فريق الخليج تيليكوم عبر الهاتف أو الواتساب أو البريد الإلكتروني.",
      },
      { property: "og:title", content: "اتصل بنا — الخليج تيليكوم" },
      {
        property: "og:description",
        content: "جميع وسائل التواصل مع منصة الخليج تيليكوم.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main dir="rtl" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-black text-primary">اتصل بنا</h1>
      <p className="mb-8 text-foreground/85 leading-relaxed">
        يسعدنا تواصلك معنا في أي وقت للاستفسار أو الحصول على الدعم.
      </p>

      <div className="space-y-3">
        <a
          href="https://wa.me/967781635755"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:border-primary/60"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">واتساب</span>
            <span dir="ltr" className="font-bold text-foreground">
              +967 781 635 755
            </span>
          </div>
        </a>

        <a
          href="tel:+967775608601"
          className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:border-primary/60"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
            <Phone className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">اتصال</span>
            <span dir="ltr" className="font-bold text-foreground">
              +967 775 608 601
            </span>
          </div>
        </a>

        <a
          href="mailto:alkhalijtelecom2021@gmail.com"
          className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:border-primary/60"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
            <Mail className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              البريد الإلكتروني
            </span>
            <span dir="ltr" className="font-bold text-foreground">
              alkhalijtelecom2021@gmail.com
            </span>
          </div>
        </a>
      </div>
    </main>
  );
}
