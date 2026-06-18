import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Download, Sparkles, Phone, User } from "lucide-react";
import posterSabah from "@/assets/poster-sabah.jpg";
import posterMasaa from "@/assets/poster-masaa.jpg";
import posterJumaa from "@/assets/poster-jumaa.jpg";
import posterRamadan from "@/assets/poster-ramadan.jpg";
import posterEid from "@/assets/poster-eid.jpg";
import posterPromo from "@/assets/poster-promo.jpg";

export const Route = createFileRoute("/designs")({
  head: () => ({
    meta: [
      { title: "التصاميم الدعائية للمناسبات | الخليج تيليكوم" },
      {
        name: "description",
        content:
          "تصاميم دعائية حصرية بهوية الخليج تيليكوم — أضف اسمك ورقم جوالك وحمّل البطاقة فوراً.",
      },
    ],
  }),
  component: DesignsPage,
});

const BRAND = "الخليج تيليكوم • للشحن الإلكتروني";

type Template = {
  id: string;
  title: string;
  occasion: string;
  src: string;
};

const TEMPLATES: Template[] = [
  { id: "sabah", title: "صباح الخير", occasion: "تحية الصباح", src: posterSabah },
  { id: "masaa", title: "مساء الخير", occasion: "تحية المساء", src: posterMasaa },
  { id: "jumaa", title: "جمعة مباركة", occasion: "تذكير الجمعة", src: posterJumaa },
  { id: "ramadan", title: "رمضان كريم", occasion: "حلَّ الشهر الفضيل", src: posterRamadan },
  { id: "eid", title: "عيد مبارك", occasion: "بمناسبة العيد السعيد", src: posterEid },
  { id: "promo", title: "عرض حصري", occasion: "خصم خاص لعملائنا", src: posterPromo },
];

/* Position of the empty gold-bordered text box on the poster (relative to image, %). */
const NAME_BOX = { topPct: 63, leftPct: 6, widthPct: 46, heightPct: 13 };

function DesignsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activeId, setActiveId] = useState<string>(TEMPLATES[0].id);
  const imgRefs = useRef<Record<string, HTMLImageElement | null>>({});

  const safeName = useMemo(() => (name.trim() || "اسم العميل").slice(0, 40), [name]);
  const safePhone = useMemo(
    () => (phone.trim() || "+967 7XX XXX XXX").slice(0, 20),
    [phone],
  );

  const downloadPng = async (tpl: Template) => {
    const img = imgRefs.current[tpl.id];
    if (!img) return;
    // ensure loaded
    if (!img.complete) {
      await new Promise<void>((res) => {
        img.onload = () => res();
      });
    }
    const w = img.naturalWidth || 1024;
    const h = img.naturalHeight || 1365;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, w, h);

    const boxX = (NAME_BOX.leftPct / 100) * w;
    const boxY = (NAME_BOX.topPct / 100) * h;
    const boxW = (NAME_BOX.widthPct / 100) * w;
    const boxH = (NAME_BOX.heightPct / 100) * h;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    // Name (gold/white)
    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${Math.round(boxH * 0.38)}px Tajawal, system-ui, sans-serif`;
    ctx.fillText(safeName, boxX + boxW / 2, boxY + boxH * 0.35, boxW * 0.95);

    // Phone (gold)
    ctx.fillStyle = "#fada64";
    ctx.font = `800 ${Math.round(boxH * 0.34)}px ui-monospace, Menlo, monospace`;
    ctx.fillText(safePhone, boxX + boxW / 2, boxY + boxH * 0.75, boxW * 0.95);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `khalij-${tpl.id}-${safeName}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-primary transition-colors hover:bg-secondary"
          >
            <ArrowRight className="h-4 w-4" />
            <span>العودة للرئيسية</span>
          </Link>
          <div className="text-xs font-bold text-muted-foreground sm:text-sm">
            {BRAND}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>تصاميم حصرية بهوية الخليج تيليكوم</span>
          </div>
          <h1 className="text-balance text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            صمّم بطاقتك الدعائية{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              باسمك ورقم جوالك
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            تصاميم احترافية بنفس فكرة بوستر «صباح الخير» — لكل مناسبة بوستر
            خاص بهوية الخليج تيليكوم.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                <User className="h-4 w-4 text-primary" />
                الاسم الكامل
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                placeholder="مثال: محمد علي الأحمدي"
                className="block w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-right text-sm font-semibold text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                <Phone className="h-4 w-4 text-primary" />
                رقم الجوال
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={20}
                placeholder="مثال: +967 777 000 000"
                dir="ltr"
                className="block w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-left text-sm font-semibold text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            * يتم تحديث التصميم لحظياً. التصاميم تُحفظ على جهازك فقط ولا تُرسل
            لأي جهة.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((tpl) => {
            const isActive = activeId === tpl.id;
            return (
              <article
                key={tpl.id}
                onClick={() => setActiveId(tpl.id)}
                className={`group cursor-pointer overflow-hidden rounded-2xl border-2 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] ${
                  isActive ? "border-primary" : "border-border"
                }`}
              >
                <div className="relative w-full overflow-hidden">
                  <img
                    ref={(el) => {
                      imgRefs.current[tpl.id] = el;
                    }}
                    src={tpl.src}
                    alt={tpl.title}
                    crossOrigin="anonymous"
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                  {/* Name/phone overlay inside the gold-bordered empty box */}
                  <div
                    className="pointer-events-none absolute flex flex-col items-center justify-center text-center"
                    style={{
                      top: `${NAME_BOX.topPct}%`,
                      left: `${NAME_BOX.leftPct}%`,
                      width: `${NAME_BOX.widthPct}%`,
                      height: `${NAME_BOX.heightPct}%`,
                    }}
                  >
                    <div
                      className="w-full truncate font-black leading-tight text-white"
                      style={{
                        fontSize: "clamp(10px, 2.1vw, 22px)",
                        textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                      }}
                      dir="rtl"
                    >
                      {safeName}
                    </div>
                    <div
                      className="w-full truncate font-extrabold leading-tight"
                      style={{
                        fontSize: "clamp(9px, 1.9vw, 20px)",
                        color: "#fada64",
                        textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                      }}
                      dir="ltr"
                    >
                      {safePhone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-extrabold text-foreground">
                      {tpl.title}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">
                      {tpl.occasion}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      void downloadPng(tpl);
                    }}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] hover:bg-primary-glow"
                  >
                    <Download className="h-3.5 w-3.5" />
                    تحميل
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
