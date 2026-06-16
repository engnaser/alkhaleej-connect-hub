import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Download, Sparkles, Phone, User } from "lucide-react";

export const Route = createFileRoute("/designs")({
  head: () => ({
    meta: [
      { title: "التصاميم الدعائية للمناسبات | الخليج تيليكوم" },
      {
        name: "description",
        content:
          "اختر تصميماً دعائياً جاهزاً للمناسبات وأضف اسمك ورقم جوالك ليتم تخصيصه تلقائياً بهوية الخليج تيليكوم.",
      },
    ],
  }),
  component: DesignsPage,
});

type Template = {
  id: string;
  title: string;
  occasion: string;
  subtitle: string;
  bg: string; // svg gradient/scene
  accent: string; // hex for accent text
  textColor: string; // main text color
};

const TEMPLATES: Template[] = [
  {
    id: "eid-fitr",
    title: "عيد الفطر المبارك",
    occasion: "عيد الفطر",
    subtitle: "كل عام وأنتم بخير",
    bg: "linear-gradient(135deg,#0b3d2e 0%,#1f7a55 55%,#d4af37 100%)",
    accent: "#FFD56B",
    textColor: "#FFFFFF",
  },
  {
    id: "eid-adha",
    title: "عيد أضحى مبارك",
    occasion: "عيد الأضحى",
    subtitle: "تقبل الله منا ومنكم صالح الأعمال",
    bg: "linear-gradient(135deg,#3a1c0a 0%,#8a3b14 55%,#e7b75f 100%)",
    accent: "#FFE3A3",
    textColor: "#FFFFFF",
  },
  {
    id: "ramadan",
    title: "رمضان كريم",
    occasion: "شهر رمضان المبارك",
    subtitle: "أعاده الله علينا وعليكم بالخير واليُمن والبركات",
    bg: "linear-gradient(135deg,#1a0b3d 0%,#3b1f7a 55%,#c9a227 100%)",
    accent: "#F7D774",
    textColor: "#FFFFFF",
  },
  {
    id: "new-year",
    title: "عام جديد سعيد",
    occasion: "بمناسبة العام الجديد",
    subtitle: "نتمنى لكم عاماً مليئاً بالنجاح والتوفيق",
    bg: "linear-gradient(135deg,#0a1f44 0%,#1e3a8a 55%,#22d3ee 100%)",
    accent: "#7DD3FC",
    textColor: "#FFFFFF",
  },
  {
    id: "national",
    title: "تحيا الجمهورية اليمنية",
    occasion: "بمناسبة اليوم الوطني",
    subtitle: "كل عام واليمن بألف خير",
    bg: "linear-gradient(135deg,#7f1d1d 0%,#111827 50%,#065f46 100%)",
    accent: "#FCA5A5",
    textColor: "#FFFFFF",
  },
  {
    id: "congrats",
    title: "ألف مبروك",
    occasion: "تهنئة خاصة",
    subtitle: "أجمل التهاني وأطيب الأمنيات",
    bg: "linear-gradient(135deg,#042f2e 0%,#0e7490 55%,#fbbf24 100%)",
    accent: "#FDE68A",
    textColor: "#FFFFFF",
  },
];

const BRAND = "الخليج تيليكوم لخدمات الشحن الإلكتروني";

function DesignsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activeId, setActiveId] = useState(TEMPLATES[0].id);
  const svgRefs = useRef<Record<string, SVGSVGElement | null>>({});

  const safeName = useMemo(() => (name.trim() || "اسم العميل").slice(0, 40), [name]);
  const safePhone = useMemo(
    () => (phone.trim() || "+967 7XX XXX XXX").slice(0, 20),
    [phone],
  );

  const downloadPng = async (tpl: Template) => {
    const svg = svgRefs.current[tpl.id];
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const url = `data:image/svg+xml;base64,${svg64}`;
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("svg load failed"));
      img.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, 1080, 1080);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${tpl.id}-${safeName}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
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
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <Sparkles className="h-4 w-4 text-cyan" />
            <span>التصاميم الدعائية للمناسبات</span>
          </div>
          <h1 className="text-balance text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            خصّص تصميمك الدعائي{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              باسمك ورقم جوالك
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            اكتب اسمك ورقم هاتفك، ثم اختر التصميم المناسب للمناسبة، وسيتم تحديث
            التصميم تلقائياً وتحميله بصيغة صورة جاهزة للنشر.
          </p>
        </div>

        {/* Form */}
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
            * يتم تعديل التصميم لحظياً بمجرد الكتابة. التصاميم تُحفظ على جهازك
            فقط ولا تُرسل لأي جهة.
          </p>
        </div>

        {/* Templates grid */}
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
                <div className="relative aspect-square w-full overflow-hidden">
                  <DesignSvg
                    template={tpl}
                    name={safeName}
                    phone={safePhone}
                    svgRef={(el) => {
                      svgRefs.current[tpl.id] = el;
                    }}
                  />
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

function DesignSvg({
  template,
  name,
  phone,
  svgRef,
}: {
  template: Template;
  name: string;
  phone: string;
  svgRef: (el: SVGSVGElement | null) => void;
}) {
  const gradId = `g-${template.id}`;
  // parse linear-gradient string into stops
  const colors = template.bg.match(/#[0-9a-fA-F]{6}/g) ?? [
    "#0b3d2e",
    "#1f7a55",
    "#d4af37",
  ];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1080 1080"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          {colors.map((c, i) => (
            <stop key={i} offset={`${(i / (colors.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id={`${gradId}-r`} cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1080" height="1080" fill={`url(#${gradId})`} />
      <rect width="1080" height="1080" fill={`url(#${gradId}-r)`} />

      {/* decorative arabesque circles */}
      <circle cx="120" cy="160" r="80" fill="#ffffff" opacity="0.06" />
      <circle cx="960" cy="220" r="140" fill="#ffffff" opacity="0.05" />
      <circle cx="900" cy="900" r="180" fill="#ffffff" opacity="0.05" />
      <circle cx="180" cy="950" r="60" fill="#ffffff" opacity="0.07" />

      {/* top brand strip */}
      <text
        x="540"
        y="120"
        textAnchor="middle"
        fontSize="32"
        fontWeight="700"
        fill={template.accent}
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        الخليج تيليكوم • للشحن الإلكتروني
      </text>

      {/* occasion small */}
      <text
        x="540"
        y="280"
        textAnchor="middle"
        fontSize="42"
        fontWeight="600"
        fill="#ffffff"
        opacity="0.85"
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        {template.occasion}
      </text>

      {/* main title */}
      <text
        x="540"
        y="430"
        textAnchor="middle"
        fontSize="92"
        fontWeight="900"
        fill={template.textColor}
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        {template.title}
      </text>

      {/* subtitle */}
      <text
        x="540"
        y="510"
        textAnchor="middle"
        fontSize="34"
        fontWeight="500"
        fill="#ffffff"
        opacity="0.9"
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        {template.subtitle}
      </text>

      {/* divider */}
      <rect x="380" y="560" width="320" height="3" rx="2" fill={template.accent} />

      {/* personal card */}
      <rect
        x="120"
        y="640"
        width="840"
        height="280"
        rx="28"
        fill="#000000"
        opacity="0.32"
      />
      <rect
        x="120"
        y="640"
        width="840"
        height="280"
        rx="28"
        fill="none"
        stroke={template.accent}
        strokeOpacity="0.55"
        strokeWidth="2"
      />

      <text
        x="540"
        y="720"
        textAnchor="middle"
        fontSize="32"
        fontWeight="600"
        fill={template.accent}
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        مع أطيب التهاني من
      </text>

      <text
        x="540"
        y="800"
        textAnchor="middle"
        fontSize="64"
        fontWeight="900"
        fill="#ffffff"
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        {name}
      </text>

      <text
        x="540"
        y="870"
        textAnchor="middle"
        fontSize="40"
        fontWeight="700"
        fill={template.accent}
        fontFamily="ui-monospace, Menlo, monospace"
        direction="ltr"
      >
        {phone}
      </text>

      {/* footer brand */}
      <text
        x="540"
        y="1010"
        textAnchor="middle"
        fontSize="26"
        fontWeight="500"
        fill="#ffffff"
        opacity="0.75"
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        {BRAND}
      </text>
    </svg>
  );
}
