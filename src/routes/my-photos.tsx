import { createFileRoute, Link } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";

export const Route = createFileRoute("/my-photos")({
  head: () => ({
    meta: [
      { title: "صوري — الخليج تيليكوم" },
      {
        name: "description",
        content: "استعرض الصور والتصاميم المخصصة الخاصة بك على منصة الخليج تيليكوم.",
      },
      { property: "og:title", content: "صوري — الخليج تيليكوم" },
      {
        property: "og:description",
        content: "معرض الصور الشخصية والتصاميم على منصة الخليج تيليكوم.",
      },
    ],
  }),
  component: MyPhotosPage,
});

function MyPhotosPage() {
  return (
    <main dir="rtl" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-3xl font-black text-primary">صوري</h1>
      <p className="mb-10 text-foreground/75 leading-relaxed">
        هنا ستظهر جميع الصور والتصاميم التي قمت بحفظها أو تخصيصها.
      </p>

      <div className="grid place-items-center rounded-3xl border border-dashed border-primary/30 bg-primary/5 px-6 py-16 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <ImageIcon className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-lg font-extrabold text-foreground">
          لا توجد صور بعد
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          ابدأ بتصفح التصاميم المتاحة وخصّصها لتظهر هنا في معرضك الخاص.
        </p>
        <Link
          to="/designs"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          تصفح التصاميم
        </Link>
      </div>
    </main>
  );
}
