import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Sparkles, Sun, X } from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";
import posterSabah from "@/assets/poster-sabah.jpg";
import posterMasaa from "@/assets/poster-masaa.jpg";
import posterJumaa from "@/assets/poster-jumaa.jpg";
import posterRamadan from "@/assets/poster-ramadan.jpg";
import posterEid from "@/assets/poster-eid.jpg";
import posterMawloud from "@/assets/poster-mawloud.png";
import posterKhalij from "@/assets/poster-khalij.png.asset.json";

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

type FieldDef = {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "tel" | "textarea";
  dir?: "rtl" | "ltr";
  maxLength?: number;
  required?: boolean;
};

type Template = {
  id: string;
  title: string;
  occasion: string;
  src: string;
  fields: FieldDef[];
  defaults: Record<string, string>;
};

const SIMPLE_FIELDS: FieldDef[] = [
  { key: "name", label: "الاسم الكامل", placeholder: "مثال: محمد علي الأحمدي", type: "text", dir: "rtl", maxLength: 40, required: true },
  { key: "phone", label: "رقم الجوال", placeholder: "+967 7XX XXX XXX", type: "tel", dir: "ltr", maxLength: 20, required: true },
];

const MAWLOUD_FIELDS: FieldDef[] = [
  { key: "name", label: "اسم صاحب الاهداء", placeholder: "مثال: عبدالله", type: "text", dir: "rtl", maxLength: 30, required: true },
  { key: "sender", label: "تهنئة مقدمة من", placeholder: "اسم مقدم التهنئة", type: "text", dir: "rtl", maxLength: 40, required: true },
  { key: "phone", label: "رقم الجوال", placeholder: "+967 7XX XXX XXX", type: "tel", dir: "ltr", maxLength: 20 },
  { key: "note", label: "كلمة تهنئة (اختياري)", placeholder: "ألف ألف مبروك", type: "textarea", dir: "rtl", maxLength: 120 },
];

const TEMPLATES: Template[] = [
  { id: "sabah", title: "صباح الخير", occasion: "تحية الصباح", src: posterSabah, fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" } },
  { id: "masaa", title: "مساء الخير", occasion: "تحية المساء", src: posterMasaa, fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" } },
  { id: "jumaa", title: "جمعة مباركة", occasion: "تذكير الجمعة", src: posterJumaa, fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" } },
  { id: "ramadan", title: "رمضان كريم", occasion: "حلَّ الشهر الفضيل", src: posterRamadan, fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" } },
  { id: "eid", title: "عيد مبارك", occasion: "بمناسبة العيد السعيد", src: posterEid, fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" } },
  { id: "mawloud", title: "مبارك المولود", occasion: "تهنئة بمناسبة المولود", src: posterMawloud, fields: MAWLOUD_FIELDS, defaults: { name: "اسم المولود", sender: "مقدم التهنئة", phone: "+967 7XX XXX XXX", note: "" } },
  { id: "khalij", title: "وكيل معتمد", occasion: "بطاقة الوكيل المعتمد", src: posterKhalij.url, fields: SIMPLE_FIELDS, defaults: { name: "اسم الوكيل", phone: "+967 7XX XXX XXX" } },
];

const NAME_BOX = { topPct: 52, leftPct: 6, widthPct: 46, heightPct: 13 };

function DesignsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const activeTpl = TEMPLATES.find((t) => t.id === openId) ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src={logoKhalij} alt="الخليج تيليكوم" className="h-10 w-10 shrink-0 rounded-full ring-2 ring-primary/40" />
            <span className="truncate text-sm font-extrabold text-primary sm:text-base">الخليج تيليكوم</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "/", label: "الرئيسية" },
              { href: "/designs", label: "صوري" },
              { href: "/#privacy", label: "سياسة الخصوصية" },
              { href: "/#about", label: "اتصل بنا" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary">
                {l.label}
              </a>
            ))}
          </nav>
          <Link to="/" aria-label="العودة" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary text-primary transition-colors hover:bg-primary/10">
            <Sun className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full text-primary"
            style={{
              background: "color-mix(in oklab, var(--primary) 14%, transparent)",
              boxShadow: "0 0 0 1px color-mix(in oklab, var(--primary) 30%, transparent), 0 12px 40px -10px color-mix(in oklab, var(--primary) 45%, transparent)",
            }}
          >
            <Sparkles className="h-7 w-7" strokeWidth={2.2} />
          </div>
          <h1 className="text-balance text-4xl font-black leading-tight text-primary sm:text-5xl lg:text-6xl">الخليج تيليكوم</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            اضغط على أي تصميم لتعبئة بياناته الخاصة وتحميل البطاقة فوراً.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((tpl) => (
            <article
              key={tpl.id}
              onClick={() => setOpenId(tpl.id)}
              className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="relative w-full overflow-hidden">
                <img src={tpl.src} alt={tpl.title} className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-extrabold text-foreground">{tpl.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">{tpl.occasion}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform group-hover:scale-[1.03]">
                  <Download className="h-3.5 w-3.5" />
                  تخصيص
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {activeTpl && <TemplateModal tpl={activeTpl} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function TemplateModal({ tpl, onClose }: { tpl: Template; onClose: () => void }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(tpl.fields.map((f) => [f.key, ""])),
  );
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const v = useMemo(() => {
    const out: Record<string, string> = {};
    for (const f of tpl.fields) {
      const raw = (values[f.key] ?? "").trim();
      out[f.key] = raw || tpl.defaults[f.key] || "";
    }
    return out;
  }, [values, tpl]);

  const setField = (k: string, val: string) => setValues((p) => ({ ...p, [k]: val }));

  const download = async () => {
    const img = imgRef.current;
    if (!img) return;
    if (!img.complete) await new Promise<void>((res) => { img.onload = () => res(); });
    const w = img.naturalWidth || 1024;
    const h = img.naturalHeight || 1365;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, w, h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;

    if (tpl.id === "mawloud") {
      ctx.direction = "rtl";
      ctx.fillStyle = "#f4d28a";
      ctx.font = `bold ${Math.round(h * 0.038)}px Tajawal, Cairo, system-ui, sans-serif`;
      ctx.fillText(v.name, w * 0.28, h * 0.606, w * 0.5);
      ctx.font = `bold ${Math.round(h * 0.034)}px Tajawal, Cairo, system-ui, sans-serif`;
      ctx.fillText(v.sender, w * 0.28, h * 0.731, w * 0.5);
    } else if (tpl.id === "khalij") {
      ctx.direction = "rtl";
      ctx.fillStyle = "#ffffff";
      ctx.font = `900 ${Math.round(h * 0.032)}px Tajawal, system-ui, sans-serif`;
      ctx.fillText(v.name, w * 0.275, h * 0.77, w * 0.45);
      ctx.fillStyle = "#fada64";
      ctx.font = `800 ${Math.round(h * 0.028)}px ui-monospace, Menlo, monospace`;
      ctx.fillText(v.phone, w * 0.275, h * 0.83, w * 0.45);
    } else {
      const boxX = (NAME_BOX.leftPct / 100) * w;
      const boxY = (NAME_BOX.topPct / 100) * h;
      const boxW = (NAME_BOX.widthPct / 100) * w;
      const boxH = (NAME_BOX.heightPct / 100) * h;
      ctx.fillStyle = "#ffffff";
      ctx.font = `900 ${Math.round(boxH * 0.38)}px Tajawal, system-ui, sans-serif`;
      ctx.fillText(v.name, boxX + boxW / 2, boxY + boxH * 0.35, boxW * 0.95);
      ctx.fillStyle = "#fada64";
      ctx.font = `800 ${Math.round(boxH * 0.34)}px ui-monospace, Menlo, monospace`;
      ctx.fillText(v.phone, boxX + boxW / 2, boxY + boxH * 0.75, boxW * 0.95);
    }

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `khalij-${tpl.id}-${v.name || "design"}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6" onClick={onClose}>
      <div
        className="relative grid max-h-[92vh] w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute left-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Preview */}
        <div className="relative overflow-y-auto bg-background/40 p-5 sm:p-6">
          <p className="mb-3 text-right text-xs font-bold text-muted-foreground">معاينة مباشرة</p>
          <div className="relative overflow-hidden rounded-2xl" style={{ containerType: "inline-size" }}>
            <img ref={imgRef} src={tpl.src} alt={tpl.title} crossOrigin="anonymous" className="block h-auto w-full" />
            {tpl.id === "mawloud" ? (
              <>
                <div className="pointer-events-none absolute flex items-center justify-center text-center" style={{ top: "60%", left: "6%", width: "46%", height: "10%" }}>
                  <div className="w-full truncate font-bold leading-tight" style={{ fontSize: "4cqw", color: "#f4d28a", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }} dir="rtl">
                    {v.name}
                  </div>
                </div>
                <div className="pointer-events-none absolute flex items-center justify-center text-center" style={{ top: "73%", left: "6%", width: "46%", height: "10%" }}>
                  <div className="w-full truncate font-bold leading-tight" style={{ fontSize: "3.6cqw", color: "#f4d28a", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }} dir="rtl">
                    {v.sender}
                  </div>
                </div>
              </>
            ) : tpl.id === "khalij" ? (
              <>
                <div className="pointer-events-none absolute flex items-center justify-center text-center" style={{ top: "77%", left: "5%", width: "45%", height: "6%" }}>
                  <div className="w-full truncate font-black leading-tight text-white" style={{ fontSize: "3.5cqw", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }} dir="rtl">
                    {v.name}
                  </div>
                </div>
                <div className="pointer-events-none absolute flex items-center justify-center text-center" style={{ top: "83%", left: "5%", width: "45%", height: "6%" }}>
                  <div className="w-full truncate font-extrabold leading-tight" style={{ fontSize: "3cqw", color: "#fada64", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }} dir="ltr">
                    {v.phone}
                  </div>
                </div>
              </>
            ) : (
              <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center" style={{ top: `${NAME_BOX.topPct}%`, left: `${NAME_BOX.leftPct}%`, width: `${NAME_BOX.widthPct}%`, height: `${NAME_BOX.heightPct}%` }}>
                <div className="w-full truncate font-black leading-tight text-white" style={{ fontSize: "5.2cqw", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }} dir="rtl">
                  {v.name}
                </div>
                <div className="w-full truncate font-extrabold leading-tight" style={{ fontSize: "4.6cqw", color: "#fada64", textShadow: "0 2px 6px rgba(0,0,0,0.5)", marginTop: "0.4cqw" }} dir="ltr">
                  {v.phone}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="flex max-h-[92vh] flex-col overflow-y-auto p-5 sm:p-7">
          <div className="mb-5 text-right">
            <h2 className="text-xl font-black text-primary">{tpl.title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{tpl.occasion} — أدخل البيانات الخاصة بهذا التصميم</p>
          </div>

          <div className="space-y-4">
            {tpl.fields.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1.5 block text-right text-sm font-bold text-foreground">
                  {f.label}
                  {f.required && <span className="mr-1 text-primary">*</span>}
                </span>
                {f.type === "textarea" ? (
                  <textarea
                    value={values[f.key] ?? ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    maxLength={f.maxLength}
                    placeholder={f.placeholder}
                    dir={f.dir}
                    rows={3}
                    className="block w-full resize-none rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <input
                    type={f.type === "tel" ? "tel" : "text"}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    maxLength={f.maxLength}
                    placeholder={f.placeholder}
                    dir={f.dir}
                    className={`block w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${f.dir === "ltr" ? "text-left" : "text-right"}`}
                  />
                )}
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={() => void download()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-black text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary-glow"
          >
            <Download className="h-4 w-4" />
            تحميل التصميم
          </button>
        </div>
      </div>
    </div>
  );
}
