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
          "اختر تصميماً دعائياً حصرياً بهوية الخليج تيليكوم وأضف اسمك ورقم جوالك ليتم تخصيصه فوراً.",
      },
    ],
  }),
  component: DesignsPage,
});

const BRAND_TEAL = "#0e4754";
const BRAND_TEAL_DEEP = "#072d36";
const BRAND_GOLD = "#fada64";
const BRAND_GOLD_DEEP = "#e6c23a";
const WHATSAPP = "+967 781 635 755";
const SITE = "alkhalijtelecom.com";
const EMAIL = "alkhalijtelecom2021@gmail.com";
const BRAND = "الخليج تيليكوم • للشحن الإلكتروني";

type Variant =
  | "eid-luxe"
  | "ramadan-crescent"
  | "national-day"
  | "new-year-burst"
  | "friday-blessing"
  | "promo-offer";

type Template = {
  id: Variant;
  title: string;
  occasion: string;
  subtitle: string;
};

const TEMPLATES: Template[] = [
  {
    id: "eid-luxe",
    title: "عيد مبارك",
    occasion: "بمناسبة العيد السعيد",
    subtitle: "كل عام وأنتم بألف خير",
  },
  {
    id: "ramadan-crescent",
    title: "رمضان كريم",
    occasion: "حلَّ الشهر الفضيل",
    subtitle: "أعاده الله علينا وعليكم باليُمن والبركات",
  },
  {
    id: "national-day",
    title: "تحيا الجمهورية اليمنية",
    occasion: "بمناسبة اليوم الوطني",
    subtitle: "كل عام واليمن بألف خير",
  },
  {
    id: "new-year-burst",
    title: "عام جديد سعيد",
    occasion: "بداية عام مليء بالنجاح",
    subtitle: "نتمنى لكم عاماً مليئاً بالتوفيق والازدهار",
  },
  {
    id: "friday-blessing",
    title: "جمعة مباركة",
    occasion: "تذكير الجمعة",
    subtitle: "تقبّل الله منا ومنكم صالح الدعاء",
  },
  {
    id: "promo-offer",
    title: "عرض حصري",
    occasion: "خصم خاص لعملائنا",
    subtitle: "اشحن الآن واستمتع بأفضل الأسعار",
  },
];

function DesignsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activeId, setActiveId] = useState<Variant>(TEMPLATES[0].id);
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
            <Sparkles className="h-4 w-4 text-cyan" />
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
            تصاميم رهيبة بالألوان الرسمية للخليج تيليكوم تظهر تلقائياً مع شعار
            الشركة، رقم واتساب، الإيميل والموقع الرسمي.
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

/* ============================================================== */
/* SVG TEMPLATE                                                    */
/* ============================================================== */

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
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1080 1080"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full"
    >
      <defs>
        <linearGradient id={`bg-${template.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND_TEAL_DEEP} />
          <stop offset="60%" stopColor={BRAND_TEAL} />
          <stop offset="100%" stopColor="#0a3a45" />
        </linearGradient>
        <linearGradient id={`gold-${template.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND_GOLD} />
          <stop offset="100%" stopColor={BRAND_GOLD_DEEP} />
        </linearGradient>
        <radialGradient id={`glow-${template.id}`} cx="50%" cy="0%" r="65%">
          <stop offset="0%" stopColor={BRAND_GOLD} stopOpacity="0.28" />
          <stop offset="100%" stopColor={BRAND_GOLD} stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`dots-${template.id}`}
          x="0"
          y="0"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.4" fill={BRAND_GOLD} opacity="0.18" />
        </pattern>
      </defs>

      {/* base */}
      <rect width="1080" height="1080" fill={`url(#bg-${template.id})`} />
      <rect width="1080" height="1080" fill={`url(#dots-${template.id})`} />
      <rect width="1080" height="1080" fill={`url(#glow-${template.id})`} />

      {/* gold frame */}
      <rect
        x="36"
        y="36"
        width="1008"
        height="1008"
        rx="40"
        fill="none"
        stroke={`url(#gold-${template.id})`}
        strokeWidth="3"
        opacity="0.85"
      />
      <rect
        x="56"
        y="56"
        width="968"
        height="968"
        rx="32"
        fill="none"
        stroke={BRAND_GOLD}
        strokeOpacity="0.18"
        strokeWidth="1"
      />

      {/* variant-specific motif */}
      <Motif variant={template.id} />

      {/* TOP: brand badge with logo */}
      <g transform="translate(540 150)">
        <BrandBadge id={template.id} />
      </g>

      {/* occasion small */}
      <text
        x="540"
        y="360"
        textAnchor="middle"
        fontSize="34"
        fontWeight="600"
        fill={BRAND_GOLD}
        opacity="0.95"
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        {template.occasion}
      </text>

      {/* main title */}
      <text
        x="540"
        y="490"
        textAnchor="middle"
        fontSize="104"
        fontWeight="900"
        fill="#ffffff"
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
        style={{ letterSpacing: "-2px" }}
      >
        {template.title}
      </text>

      {/* subtitle */}
      <text
        x="540"
        y="560"
        textAnchor="middle"
        fontSize="30"
        fontWeight="500"
        fill="#ffffff"
        opacity="0.86"
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        {template.subtitle}
      </text>

      {/* gold ornamental divider */}
      <g transform="translate(540 600)">
        <line x1="-180" y1="0" x2="-30" y2="0" stroke={BRAND_GOLD} strokeWidth="2" />
        <line x1="30" y1="0" x2="180" y2="0" stroke={BRAND_GOLD} strokeWidth="2" />
        <polygon points="0,-10 12,0 0,10 -12,0" fill={BRAND_GOLD} />
      </g>

      {/* personal card */}
      <g>
        <rect
          x="110"
          y="650"
          width="860"
          height="230"
          rx="28"
          fill="#ffffff"
          opacity="0.06"
        />
        <rect
          x="110"
          y="650"
          width="860"
          height="230"
          rx="28"
          fill="none"
          stroke={BRAND_GOLD}
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <text
          x="540"
          y="720"
          textAnchor="middle"
          fontSize="28"
          fontWeight="600"
          fill={BRAND_GOLD}
          fontFamily="Tajawal, system-ui, sans-serif"
          direction="rtl"
        >
          مع أطيب التهاني من
        </text>
        <text
          x="540"
          y="790"
          textAnchor="middle"
          fontSize="58"
          fontWeight="900"
          fill="#ffffff"
          fontFamily="Tajawal, system-ui, sans-serif"
          direction="rtl"
        >
          {name}
        </text>
        <text
          x="540"
          y="850"
          textAnchor="middle"
          fontSize="34"
          fontWeight="700"
          fill={BRAND_GOLD}
          fontFamily="ui-monospace, Menlo, monospace"
          direction="ltr"
        >
          {phone}
        </text>
      </g>

      {/* FOOTER: contact strip */}
      <g transform="translate(0 920)">
        <rect x="60" y="0" width="960" height="100" rx="22" fill={BRAND_GOLD} />
        <text
          x="540"
          y="42"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill={BRAND_TEAL_DEEP}
          fontFamily="Tajawal, system-ui, sans-serif"
          direction="rtl"
        >
          للتواصل والشحن الإلكتروني عبر تطبيق الخليج تيليكوم
        </text>
        <text
          x="540"
          y="78"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill={BRAND_TEAL_DEEP}
          fontFamily="ui-monospace, Menlo, monospace"
          direction="ltr"
        >
          WhatsApp {WHATSAPP}  •  {EMAIL}  •  {SITE}
        </text>
      </g>
    </svg>
  );
}

/* --- Brand badge: stylized logo (yellow disk + teal mark) --- */
function BrandBadge({ id }: { id: string }) {
  return (
    <g>
      {/* glow halo */}
      <circle r="98" fill={BRAND_GOLD} opacity="0.18" />
      {/* yellow disk */}
      <circle r="78" fill={BRAND_GOLD} stroke={BRAND_TEAL_DEEP} strokeWidth="4" />
      {/* inner ring */}
      <circle r="64" fill="none" stroke={BRAND_TEAL} strokeWidth="2" opacity="0.45" />
      {/* signal arcs */}
      <g stroke={BRAND_TEAL_DEEP} strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M -30 8 q 30 -36 60 0" />
        <path d="M -44 22 q 44 -52 88 0" />
      </g>
      {/* dot */}
      <circle cx="0" cy="36" r="7" fill={BRAND_TEAL_DEEP} />
      {/* brand wordmark */}
      <text
        x="0"
        y="-6"
        textAnchor="middle"
        fontSize="20"
        fontWeight="900"
        fill={BRAND_TEAL_DEEP}
        fontFamily="Tajawal, system-ui, sans-serif"
        direction="rtl"
      >
        الخليج تيليكوم
      </text>
      {/* arc label */}
      <defs>
        <path
          id={`arc-${id}`}
          d="M -88 0 A 88 88 0 0 1 88 0"
          fill="none"
        />
      </defs>
    </g>
  );
}

/* --- Per-template decorative motif --- */
function Motif({ variant }: { variant: Variant }) {
  switch (variant) {
    case "ramadan-crescent":
      return (
        <g opacity="0.85">
          <g transform="translate(160 240)">
            <circle r="70" fill={BRAND_GOLD} opacity="0.95" />
            <circle r="58" cx="22" cy="-6" fill={BRAND_TEAL_DEEP} />
          </g>
          <g fill={BRAND_GOLD} opacity="0.9">
            <polygon points="900,180 910,210 940,210 916,228 925,258 900,240 875,258 884,228 860,210 890,210" />
            <polygon points="940,300 946,320 966,320 950,332 956,352 940,340 924,352 930,332 914,320 934,320" transform="scale(0.7) translate(380 130)" />
          </g>
        </g>
      );
    case "eid-luxe":
      return (
        <g opacity="0.85">
          {/* lantern silhouettes */}
          <g transform="translate(150 220)" fill={BRAND_GOLD}>
            <rect x="-6" y="-70" width="12" height="10" rx="2" />
            <path d="M -40 -60 h 80 l -10 -20 h -60 z" />
            <rect x="-46" y="-60" width="92" height="100" rx="14" />
            <path d="M -40 40 h 80 l -10 18 h -60 z" />
          </g>
          <g transform="translate(930 240)" fill={BRAND_GOLD} opacity="0.85">
            <circle r="46" />
            <circle r="46" cx="14" fill={BRAND_TEAL_DEEP} />
          </g>
        </g>
      );
    case "national-day":
      return (
        <g opacity="0.9">
          <rect x="100" y="200" width="160" height="36" fill="#ef4444" />
          <rect x="100" y="236" width="160" height="36" fill="#ffffff" />
          <rect x="100" y="272" width="160" height="36" fill="#111827" />
          <rect x="100" y="200" width="160" height="108" fill="none" stroke={BRAND_GOLD} strokeWidth="2" />
          <g transform="translate(900 250)" fill={BRAND_GOLD}>
            <polygon points="0,-30 9,-9 31,-9 13,5 20,27 0,14 -20,27 -13,5 -31,-9 -9,-9" />
          </g>
        </g>
      );
    case "new-year-burst":
      return (
        <g stroke={BRAND_GOLD} strokeWidth="2" opacity="0.7" fill="none">
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const x1 = 540 + Math.cos(a) * 60;
            const y1 = 250 + Math.sin(a) * 60;
            const x2 = 540 + Math.cos(a) * 130;
            const y2 = 250 + Math.sin(a) * 130;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      );
    case "friday-blessing":
      return (
        <g opacity="0.8">
          <g transform="translate(160 230)" fill="none" stroke={BRAND_GOLD} strokeWidth="3">
            <path d="M 0 60 q 0 -60 60 -60 v 12 q -48 0 -48 48 z" />
            <rect x="48" y="-12" width="14" height="60" />
            <circle cx="55" cy="-22" r="10" fill={BRAND_GOLD} />
          </g>
          <g transform="translate(900 240)" stroke={BRAND_GOLD} strokeWidth="2" fill="none">
            <path d="M -50 0 q 50 -60 100 0 q -50 60 -100 0 z" />
          </g>
        </g>
      );
    case "promo-offer":
      return (
        <g>
          <g transform="translate(150 230) rotate(-12)">
            <rect x="-70" y="-32" width="140" height="64" rx="14" fill={BRAND_GOLD} />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fontSize="36"
              fontWeight="900"
              fill={BRAND_TEAL_DEEP}
              fontFamily="Tajawal, system-ui, sans-serif"
            >
              %50
            </text>
          </g>
          <g transform="translate(920 240)" fill={BRAND_GOLD} opacity="0.85">
            <polygon points="0,-40 12,-12 42,-12 18,8 28,38 0,20 -28,38 -18,8 -42,-12 -12,-12" />
          </g>
        </g>
      );
  }
}
