import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, LogOut, Settings2, Sparkles, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { supabase } from "@/integrations/supabase/client";
import { getMyAdminStatus } from "@/lib/admin.functions";
import { saveMyPhoto } from "@/lib/my-photos";
import logoKhalij from "@/assets/logo-khalij.png";
import posterSabah from "@/assets/poster-sabah.jpg?format=webp&quality=72&as=src";
import posterMasaa from "@/assets/poster-masaa.jpg?format=webp&quality=72&as=src";
import posterJumaa from "@/assets/poster-jumaa.jpg?format=webp&quality=72&as=src";
import posterRamadan from "@/assets/poster-ramadan.jpg?format=webp&quality=72&as=src";
import posterEid from "@/assets/poster-eid.jpg?format=webp&quality=72&as=src";
import posterMawloud from "@/assets/poster-mawloud.png?format=webp&quality=78&as=src";
import posterKhalij from "@/assets/poster-khalij.png.asset.json";
import posterJumaaGold from "@/assets/poster-jumaa-gold.png.asset.json";
import posterEidMosque from "@/assets/poster-eid-mosque.png.asset.json";
import posterKhalijServices from "@/assets/poster-khalij-services.jpg.asset.json";
import posterKhalijAgent from "@/assets/poster-khalij-agent-services.png.asset.json";
import posterKhalijEngagement from "@/assets/poster-khalij-engagement.png.asset.json";

const SITE = "https://alkhaleej-connect-hub.lovable.app";

export const Route = createFileRoute("/designs")({
  head: () => ({
    meta: [
      { title: "قوالب تهاني جاهزة باسمك — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "تصاميم دعائية حصرية بهوية الخليج تيليكوم — أضف اسمك ورقم جوالك وحمّل البطاقة فوراً مجاناً.",
      },
      { property: "og:title", content: "قوالب تهاني جاهزة باسمك — الخليج تيليكوم" },
      {
        property: "og:description",
        content: "مكتبة قوالب تهاني للمناسبات — خصّصها باسمك وحمّلها بضغطة.",
      },
      { property: "og:url", content: `${SITE}/designs` },
      { property: "og:image", content: `${SITE}${posterEid}` },
      { name: "twitter:image", content: `${SITE}${posterEid}` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/designs` }],
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

type FieldLayout = {
  x: number;       // center x in %
  y: number;       // center y in %
  size: number;    // font size in % of image height
  color: string;
  dir: "rtl" | "ltr";
  weight?: number; // css font weight (default 800)
  mono?: boolean;  // monospace font (good for phone numbers)
  maxWidth?: number; // max text width in % of image width
};

type Template = {
  id: string;
  title: string;
  occasion: string;
  src: string;
  fields: FieldDef[];
  defaults: Record<string, string>;
  layout: Record<string, FieldLayout>;
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

const SIMPLE_LAYOUT: Record<string, FieldLayout> = {
  name:  { x: 32, y: 56.5, size: 3, color: "#ffffff", dir: "rtl", weight: 900, maxWidth: 44 },
  phone: { x: 32, y: 61.5, size: 3, color: "#ffffff", dir: "ltr", weight: 800, mono: true, maxWidth: 44 },
};

const EID_MOSQUE_LAYOUT: Record<string, FieldLayout> = {
  name:  { x: 23.5, y: 83.5, size: 2.2, color: "#ffffff", dir: "rtl", weight: 900, maxWidth: 44 },
  phone: { x: 23.5, y: 88,   size: 2.2, color: "#ffffff", dir: "ltr", weight: 800, mono: true, maxWidth: 44 },
};

const TEMPLATES: Template[] = [
  { id: "sabah",   title: "صباح الخير",  occasion: "تحية الصباح",       src: posterSabah,   fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" }, layout: SIMPLE_LAYOUT },
  { id: "masaa",   title: "مساء الخير",  occasion: "تحية المساء",       src: posterMasaa,   fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" }, layout: SIMPLE_LAYOUT },
  { id: "jumaa",   title: "جمعة مباركة", occasion: "تذكير الجمعة",      src: posterJumaa,   fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" }, layout: SIMPLE_LAYOUT },
  { id: "jumaa-gold", title: "جمعة مباركة", occasion: "تصميم ذهبي أبيض", src: posterJumaaGold.url, fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" }, layout: SIMPLE_LAYOUT },
  { id: "ramadan", title: "رمضان كريم",  occasion: "حلَّ الشهر الفضيل", src: posterRamadan, fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" }, layout: SIMPLE_LAYOUT },
  { id: "eid",     title: "عيد مبارك",   occasion: "بمناسبة العيد السعيد", src: posterEid,  fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" }, layout: SIMPLE_LAYOUT },
  { id: "eid-mosque", title: "عيد مبارك", occasion: "تهنئة عيد بالمسجد", src: posterEidMosque.url, fields: SIMPLE_FIELDS, defaults: { name: "اسم العميل", phone: "+967 7XX XXX XXX" }, layout: EID_MOSQUE_LAYOUT },
  {
    id: "mawloud", title: "مبارك المولود", occasion: "تهنئة بمناسبة المولود", src: posterMawloud,
    fields: MAWLOUD_FIELDS,
    defaults: { name: "اسم المولود", sender: "مقدم التهنئة", phone: "+967 7XX XXX XXX", note: "" },
    layout: {
      name:   { x: 28, y: 60.6, size: 3.8, color: "#f4d28a", dir: "rtl", weight: 800, maxWidth: 50 },
      sender: { x: 28, y: 73.1, size: 3.4, color: "#f4d28a", dir: "rtl", weight: 800, maxWidth: 50 },
      phone:  { x: 28, y: 80,   size: 2.8, color: "#f4d28a", dir: "ltr", weight: 700, mono: true, maxWidth: 50 },
      note:   { x: 28, y: 86,   size: 2.6, color: "#f4d28a", dir: "rtl", weight: 700, maxWidth: 50 },
    },
  },
  {
    id: "khalij", title: "وكيل معتمد", occasion: "بطاقة الوكيل المعتمد", src: posterKhalij.url,
    fields: SIMPLE_FIELDS,
    defaults: { name: "اسم الوكيل", phone: "+967 7XX XXX XXX" },
    layout: {
      name:  { x: 32, y: 59, size: 3, color: "#ffffff", dir: "rtl", weight: 900, maxWidth: 45 },
      phone: { x: 31, y: 65, size: 3, color: "#ffffff", dir: "ltr", weight: 800, mono: true, maxWidth: 45 },
    },
  },
  {
    id: "khalij-services", title: "كل الخدمات الرقمية", occasion: "وكيل معتمد — الخليج تيليكوم", src: posterKhalijServices.url,
    fields: SIMPLE_FIELDS,
    defaults: { name: "اسم الوكيل", phone: "+967 7XX XXX XXX" },
    layout: {
      name:  { x: 50, y: 62,   size: 2.6, color: "#0d3b46", dir: "rtl", weight: 900, maxWidth: 70 },
      phone: { x: 50, y: 66.5, size: 2.2, color: "#b98a3a", dir: "ltr", weight: 800, mono: true, maxWidth: 70 },
    },
  },
  {
    id: "khalij-agent", title: "كل الخدمات الرقمية بين يديك", occasion: "وكيل معتمد — الخليج تيليكوم", src: posterKhalijAgent.url,
    fields: SIMPLE_FIELDS,
    defaults: { name: "اسم الوكيل", phone: "+967 7XX XXX XXX" },
    layout: {
      name:  { x: 46, y: 75.5, size: 2.4, color: "#000000", dir: "rtl", weight: 900, maxWidth: 55 },
      phone: { x: 46, y: 82,   size: 2.4, color: "#000000", dir: "ltr", weight: 900, maxWidth: 55 },
    },
  },
  {
    id: "khalij-engagement", title: "تهانينا بمناسبة الخطوبة", occasion: "تهنئة خطوبة — الخليج تيليكوم", src: posterKhalijEngagement.url,
    fields: [
      { key: "toName",   label: "تهنئة مقدمة إلى الأخ", placeholder: "اسم المهنّأ", type: "text", dir: "rtl", maxLength: 40, required: true },
      { key: "fromName", label: "تهنئة مرسلة من الأخ",  placeholder: "اسم مقدم التهنئة", type: "text", dir: "rtl", maxLength: 40, required: true },
    ],
    defaults: { toName: "اسم المهنّأ", fromName: "اسم مقدم التهنئة" },
    layout: {
      toName:   { x: 42, y: 65.5, size: 2.6, color: "#0d3b46", dir: "rtl", weight: 800, maxWidth: 55 },
      fromName: { x: 42, y: 78,   size: 2.6, color: "#0d3b46", dir: "rtl", weight: 800, maxWidth: 55 },
    },
  },
];

function useSession() {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);
  const queryClient = useQueryClient();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUserId(data.session?.user.id ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setUserId(session?.user.id ?? null);
      queryClient.invalidateQueries({ queryKey: ["admin-status"] });
    });
    return () => sub.subscription.unsubscribe();
  }, [queryClient]);
  return userId;
}

function DesignsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const activeTpl = TEMPLATES.find((t) => t.id === openId) ?? null;
  const userId = useSession();

  const { data: adminData } = useQuery({
    queryKey: ["admin-status", userId],
    queryFn: () => getMyAdminStatus(),
    enabled: !!userId,
    staleTime: 60_000,
  });
  const adminMode = Boolean(adminData?.isAdmin);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {adminMode && (
        <div className="bg-primary/10 px-4 py-2 text-center text-xs font-bold text-primary">
          وضع المسؤول مفعّل — أدوات ضبط النصوص ظاهرة لك فقط.
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src={logoKhalij} alt="الخليج تيليكوم" className="h-10 w-10 shrink-0 rounded-full ring-2 ring-primary/40" />
            <span className="truncate text-sm font-extrabold text-primary sm:text-base">الخليج تيليكوم</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "/", label: "الرئيسية" },
              { href: "/my-photos", label: "صوري" },
              { href: "/privacy", label: "سياسة الخصوصية" },
              { href: "/contact", label: "اتصل بنا" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {userId && (
              <button
                type="button"
                onClick={signOut}
                title="تسجيل الخروج"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-secondary px-3 text-xs font-bold text-primary transition-colors hover:bg-primary/10"
              >
                <LogOut className="h-3.5 w-3.5" />
                خروج
              </button>
            )}
            <ThemeToggle />

          </div>
        </div>
      </header>

      {/* Visible admin entry — sign-in button for admin access */}
      {!userId && (
        <Link
          to="/auth"
          className="fixed bottom-4 left-4 z-30 inline-flex items-center gap-2 rounded-full border-2 border-primary bg-background px-4 py-2.5 text-xs font-black text-primary shadow-lg transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <Settings2 className="h-4 w-4" />
          دخول المسؤول
        </Link>
      )}

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

      {activeTpl && <TemplateModal tpl={activeTpl} adminMode={adminMode} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function TemplateModal({ tpl, adminMode, onClose }: { tpl: Template; adminMode: boolean; onClose: () => void }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(tpl.fields.map((f) => [f.key, ""])),
  );
  const [layout, setLayout] = useState<Record<string, FieldLayout>>(() => {
    const cloned = JSON.parse(JSON.stringify(tpl.layout)) as Record<string, FieldLayout>;
    // Auto-unify phone color with name color across all templates
    if (cloned.phone && cloned.name) cloned.phone.color = cloned.name.color;
    return cloned;
  });
  const [saving, setSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load cloud-saved layout (shared across all visitors)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("template_layouts")
        .select("layout")
        .eq("template_id", tpl.id)
        .maybeSingle();
      if (cancelled || !data?.layout) return;
      const cloud = data.layout as Record<string, FieldLayout>;
      setLayout((prev) => ({ ...prev, ...cloud }));
    })();
    return () => { cancelled = true; };
  }, [tpl.id]);

  const saveLayout = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("template_layouts")
        .upsert({ template_id: tpl.id, layout: layout as never }, { onConflict: "template_id" });
      if (error) throw error;
      setShowAdvanced(false);
      alert("تم حفظ الإحداثيات لجميع الزوار.");
    } catch (e) {
      alert("تعذّر الحفظ: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSaving(false);
    }
  };

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
  const updateLayout = (key: string, patch: Partial<FieldLayout>) =>
    setLayout((p) => ({ ...p, [key]: { ...p[key], ...patch } }));
  const resetLayout = () =>
    setLayout(JSON.parse(JSON.stringify(tpl.layout)) as Record<string, FieldLayout>);

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

    for (const f of tpl.fields) {
      const L = layout[f.key];
      if (!L) continue;
      const text = v[f.key];
      if (!text) continue;
      ctx.direction = L.dir;
      ctx.fillStyle = L.color;
      const family = L.mono ? "ui-monospace, Menlo, monospace" : "Tajawal, Cairo, system-ui, sans-serif";
      ctx.font = `${L.weight ?? 800} ${Math.round((L.size / 100) * h)}px ${family}`;
      const maxW = ((L.maxWidth ?? 50) / 100) * w;
      ctx.fillText(text, (L.x / 100) * w, (L.y / 100) * h, maxW);
    }

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `khalij-${tpl.id}-${v.name || "design"}.png`;
    a.click();

    saveMyPhoto({
      templateId: tpl.id,
      title: tpl.title,
      occasion: tpl.occasion,
      name: v.name || "",
      dataUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/70 backdrop-blur-sm p-3 sm:items-center sm:p-6" onClick={onClose}>
      <div
        className="relative grid w-full max-w-5xl grid-cols-1 rounded-3xl border border-border bg-card shadow-2xl lg:max-h-[92vh] lg:grid-cols-2 lg:overflow-hidden"
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
        <div className="relative bg-background/40 p-5 sm:p-6 lg:overflow-y-auto">

          <p className="mb-3 text-right text-xs font-bold text-muted-foreground">معاينة مباشرة</p>
          <div className="relative overflow-hidden rounded-2xl" style={{ containerType: "inline-size" }}>
            <img ref={imgRef} src={tpl.src} alt={tpl.title} crossOrigin="anonymous" className="block h-auto w-full" />
            {tpl.fields.map((f) => {
              const L = layout[f.key];
              if (!L) return null;
              const text = v[f.key];
              if (!text) return null;
              // size is % of image height; cqw is % of container width.
              // assume natural aspect ratio of image; approximate using img if available.
              const ar = (imgRef.current?.naturalHeight ?? 1365) / (imgRef.current?.naturalWidth ?? 1024);
              const cqw = L.size * ar;
              const maxW = L.maxWidth ?? 50;
              return (
                <div
                  key={f.key}
                  className="pointer-events-none absolute flex items-center justify-center text-center"
                  style={{
                    top: `${L.y}%`,
                    left: `${L.x - maxW / 2}%`,
                    width: `${maxW}%`,
                    transform: "translateY(-50%)",
                  }}
                >
                  <div
                    className="w-full truncate leading-tight"
                    style={{
                      fontSize: `${cqw}cqw`,
                      color: L.color,
                      fontWeight: L.weight ?? 800,
                      fontFamily: L.mono ? "ui-monospace, Menlo, monospace" : "Tajawal, Cairo, system-ui, sans-serif",
                      textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                    }}
                    dir={L.dir}
                  >
                    {text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col p-5 sm:p-7 lg:max-h-[92vh] lg:overflow-y-auto">
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

          {/* Advanced layout controls — admin only */}
          {adminMode && (
            <div className="mt-5 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-3">
              <button
                type="button"
                onClick={() => setShowAdvanced((s) => !s)}
                className="flex w-full items-center justify-between gap-2 text-right text-sm font-bold text-primary"
              >
                <span className="inline-flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  أدوات المسؤول — ضبط مكان النص وحجمه
                </span>
                <span className="text-xs text-muted-foreground">{showAdvanced ? "إخفاء" : "إظهار"}</span>
              </button>

              {showAdvanced && (
                <div className="mt-3 space-y-4">
                  {tpl.fields.map((f) => {
                    const L = layout[f.key];
                    if (!L) return null;
                    return (
                      <div key={f.key} className="rounded-lg bg-background/60 p-3">
                        <div className="mb-2 text-right text-xs font-bold text-foreground">{f.label}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <NumberControl label="أفقي %" value={L.x} min={0} max={100} step={0.5}
                            onChange={(x) => updateLayout(f.key, { x })} />
                          <NumberControl label="رأسي %" value={L.y} min={0} max={100} step={0.5}
                            onChange={(y) => updateLayout(f.key, { y })} />
                          <NumberControl label="الحجم" value={L.size} min={1} max={15} step={0.1}
                            onChange={(size) => updateLayout(f.key, { size })} />
                        </div>
                        <div className="mt-2 text-left text-[10px] text-muted-foreground" dir="ltr">
                          x:{L.x} y:{L.y} size:{L.size}
                        </div>
                      </div>
                    );
                  })}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={resetLayout}
                      className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-bold text-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      إعادة تعيين
                    </button>
                    <button
                      type="button"
                      onClick={() => void saveLayout()}
                      disabled={saving}
                      className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-primary-foreground shadow hover:bg-primary-glow disabled:opacity-60"
                    >
                      {saving ? "جاري الحفظ..." : "حفظ للزوار (سحابي)"}
                    </button>
                  </div>
                  <p className="text-right text-[10px] text-muted-foreground">
                    سيتم حفظ الإحداثيات في السحابة وتطبيقها لجميع زوار الموقع.
                  </p>
                </div>
              )}
            </div>
          )}


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

function NumberControl({
  label, value, min, max, step, onChange,
}: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-right text-[10px] font-bold text-muted-foreground">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
        className="block w-full rounded-md border border-border bg-background px-2 py-1.5 text-center text-xs font-bold text-foreground outline-none focus:border-primary"
      />
    </label>
  );
}
