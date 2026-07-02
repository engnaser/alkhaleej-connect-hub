import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, ImageIcon, Trash2 } from "lucide-react";
import {
  loadMyPhotos,
  removeMyPhoto,
  clearMyPhotos,
  type MyPhotoItem,
} from "@/lib/my-photos";

export const Route = createFileRoute("/my-photos")({
  head: () => ({
    meta: [
      { title: "صوري — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "معرض التصاميم التي قمت بتخصيصها وتنزيلها من منصة الخليج تيليكوم.",
      },
      { property: "og:title", content: "صوري — الخليج تيليكوم" },
      {
        property: "og:description",
        content: "استعرض جميع تصاميمك المحفوظة وأعد تنزيلها في أي وقت.",
      },
    ],
  }),
  component: MyPhotosPage,
});

function MyPhotosPage() {
  const [photos, setPhotos] = useState<MyPhotoItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => setPhotos(loadMyPhotos());
    refresh();
    setReady(true);
    const onChange = () => refresh();
    window.addEventListener("khalij:my-photos:changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("khalij:my-photos:changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const handleDownload = (p: MyPhotoItem) => {
    const a = document.createElement("a");
    a.href = p.dataUrl;
    a.download = `khalij-${p.templateId}-${p.name || "design"}.png`;
    a.click();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("هل تريد حذف هذا التصميم من صورك؟")) return;
    removeMyPhoto(id);
  };

  const handleClearAll = () => {
    if (!window.confirm("سيتم حذف جميع الصور المحفوظة. هل أنت متأكد؟")) return;
    clearMyPhotos();
  };

  return (
    <main
      dir="rtl"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary sm:text-4xl">
            صوري
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            جميع التصاميم التي قمت بتخصيصها وتنزيلها تظهر هنا. البيانات محفوظة
            على جهازك فقط.
          </p>
        </div>
        {photos.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-bold text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4" />
            حذف الكل
          </button>
        )}
      </div>

      {!ready ? null : photos.length === 0 ? (
        <div className="grid place-items-center rounded-3xl border border-dashed border-primary/30 bg-primary/5 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
            <ImageIcon className="h-7 w-7" />
          </span>
          <h2 className="mt-4 text-lg font-extrabold text-foreground">
            لا توجد صور بعد
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            توجّه إلى صفحة التصاميم، خصّص تصميماً وحمّله، وسيظهر تلقائياً هنا.
          </p>
          <Link
            to="/designs"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            تصفح التصاميم
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border-2 border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="relative w-full overflow-hidden bg-background/50">
                <img
                  src={p.dataUrl}
                  alt={p.title}
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3 p-4">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-extrabold text-foreground">
                    {p.title}
                    {p.name ? ` — ${p.name}` : ""}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {p.occasion} ·{" "}
                    {new Date(p.createdAt).toLocaleDateString("ar-EG", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(p)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    تنزيل
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    aria-label="حذف"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-secondary text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
