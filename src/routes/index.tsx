import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  MessageCircle,
  Phone,
  MapPin,
  Mail,
  X,
  Plus,
  Minus,
  Star,
  ShieldCheck,
  Clock,
  Wallet,
  Sparkles,
  ChevronDown,
  Smartphone,
  Wifi,
  Receipt,
  Gamepad2,
  Palette,
  UserCheck,
  LayoutGrid,
  Send,
  Trash2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الخليج تيليكوم — منصة خدمات الاتصالات والدفع الإلكتروني" },
      {
        name: "description",
        content:
          "منصة الخليج تيليكوم اليمنية لشحن الرصيد، باقات الإنترنت، تسديد الفواتير، البطاقات الإلكترونية، وتصاميم التهاني الرقمية.",
      },
      { property: "og:title", content: "الخليج تيليكوم — كل خدماتك في تطبيق واحد" },
      {
        property: "og:description",
        content:
          "اطلب خدمات الاتصالات اليمنية، الدفع الإلكتروني، وتصاميم التهاني بسهولة وأمان عبر واتساب.",
      },
    ],
  }),
  component: HomePage,
});

// ============================================================
// CONFIG — يسهل تعديل كل البيانات من هنا
// ============================================================
const BRAND = {
  name: "الخليج تيليكوم",
  tagline: "كل خدماتك في تطبيق واحد",
  whatsapp1: "967775608601",
  whatsapp2: "967781635755",
  address: "عدن - المنصورة - شارع السجن مقابل شركة عدن للصرافة",
};

const COLORS = {
  green: "#004C45",
  teal: "#00796B",
  gold: "#D6A84F",
  bg: "#F7FAF9",
};

type Category = {
  id: string;
  label: string;
  icon: typeof Smartphone;
};

const CATEGORIES: Category[] = [
  { id: "all", label: "الكل", icon: LayoutGrid },
  { id: "recharge", label: "شحن الرصيد", icon: Smartphone },
  { id: "internet", label: "باقات الإنترنت", icon: Wifi },
  { id: "bills", label: "تسديد الفواتير", icon: Receipt },
  { id: "games", label: "بطاقات وألعاب", icon: Gamepad2 },
  { id: "design", label: "خدمات تصميم", icon: Palette },
  { id: "agents", label: "خدمات الوكلاء", icon: UserCheck },
];

type Service = {
  id: string;
  category: string;
  title: string;
  desc: string;
  price: string;
  badge?: "الأكثر طلباً" | "عرض خاص" | "متاح الآن";
  icon: typeof Smartphone;
};

const SERVICES: Service[] = [
  { id: "s1", category: "recharge", title: "شحن رصيد يمن موبايل", desc: "شحن فوري لجميع فئات يمن موبايل خلال ثوانٍ.", price: "حسب الفئة", badge: "الأكثر طلباً", icon: Smartphone },
  { id: "s2", category: "recharge", title: "شحن رصيد YOU", desc: "تعبئة رصيد YOU بكل سهولة وأمان.", price: "حسب الفئة", icon: Smartphone },
  { id: "s3", category: "recharge", title: "شحن رصيد سبأفون", desc: "شحن إلكتروني فوري لشبكة سبأفون.", price: "حسب الفئة", icon: Smartphone },
  { id: "s4", category: "recharge", title: "شحن رصيد واي", desc: "تعبئة فورية لخطوط واي بأفضل الأسعار.", price: "حسب الفئة", badge: "متاح الآن", icon: Smartphone },
  { id: "s5", category: "internet", title: "تفعيل باقات الإنترنت", desc: "تفعيل باقات يومية وأسبوعية وشهرية لجميع الشبكات.", price: "حسب الباقة", badge: "عرض خاص", icon: Wifi },
  { id: "s6", category: "bills", title: "تسديد يمن نت", desc: "ادفع فاتورة يمن نت دون الحاجة لزيارة المركز.", price: "حسب الفاتورة", icon: Receipt },
  { id: "s7", category: "bills", title: "تسديد ADSL", desc: "تسديد فواتير ADSL بكل سهولة.", price: "حسب الفاتورة", icon: Receipt },
  { id: "s8", category: "bills", title: "تسديد يمن فورجي", desc: "تسديد فواتير 4G لجميع الباقات.", price: "حسب الباقة", badge: "الأكثر طلباً", icon: Receipt },
  { id: "s9", category: "bills", title: "تسديد عدن نت", desc: "خدمة تسديد فواتير عدن نت إلكترونياً.", price: "حسب الفاتورة", icon: Receipt },
  { id: "s10", category: "games", title: "شحن ألعاب وبطاقات إلكترونية", desc: "بطاقات PUBG، Free Fire، iTunes وغيرها.", price: "حسب البطاقة", badge: "متاح الآن", icon: Gamepad2 },
  { id: "s11", category: "design", title: "تصميم بطاقة تهنئة باسم العميل", desc: "تصاميم احترافية للمناسبات بأسماء الأحبة.", price: "حسب الطلب", badge: "عرض خاص", icon: Palette },
  { id: "s12", category: "design", title: "تصميم بوستر إعلاني", desc: "تصاميم إعلانية لمتجرك أو نشاطك التجاري.", price: "حسب الطلب", icon: Palette },
  { id: "s13", category: "agents", title: "وكيل معتمد لدى الخليج تيليكوم", desc: "انضم لشبكة وكلائنا واحصل على عمولات مميزة.", price: "حسب الاتفاق", badge: "الأكثر طلباً", icon: UserCheck },
];

const OFFERS = [
  { title: "خصم 20% على تصميم بطاقات التهاني", desc: "بمناسبة الأعياد، تصاميم مخصصة بأقل الأسعار.", icon: Palette },
  { title: "كن وكيلاً معتمداً", desc: "افتح بوابة دخل جديدة كوكيل للخليج تيليكوم.", icon: UserCheck },
  { title: "عروض حصرية على باقات الإنترنت", desc: "خصومات على جميع باقات يمن نت و4G.", icon: Wifi },
];

const REVIEWS = [
  { name: "أحمد علي", stars: 5, text: "خدمة سريعة جداً، شحنت رصيدي خلال ثواني. شكراً للخليج تيليكوم." },
  { name: "فاطمة محمد", stars: 5, text: "صممت لي بطاقة تهنئة رائعة باسم ابنتي بمناسبة عيد ميلادها." },
  { name: "خالد السقاف", stars: 4, text: "تعاملت معهم لتسديد فاتورة يمن نت، تجربة ممتازة وسهلة." },
  { name: "منى صالح", stars: 5, text: "أفضل منصة لخدمات الاتصالات في اليمن، أنصح بها بشدة." },
];

const FAQS = [
  { q: "كيف أطلب خدمة؟", a: "اختر الخدمة، اضغط على زر «اطلب الخدمة»، عبّئ بياناتك ثم أرسل الطلب عبر واتساب." },
  { q: "هل الدفع آمن؟", a: "نعم، نتعامل بطرق دفع موثوقة ومعتمدة، ونلتزم بحماية بيانات عملائنا بشكل تام." },
  { q: "كم يستغرق تنفيذ الطلب؟", a: "أغلب الطلبات تُنفّذ خلال دقائق. الطلبات الخاصة قد تستغرق ساعات معدودة." },
  { q: "هل يمكنني طلب تصميم تهنئة باسمي؟", a: "بالتأكيد، قسم خدمات التصميم يوفر تهاني مخصصة بأسماء الأحبة." },
  { q: "كيف أصبح وكيلاً معتمداً؟", a: "تواصل معنا عبر واتساب من قسم خدمات الوكلاء وسنرشدك للخطوات." },
];

const INFO_BAR = [
  { icon: Sparkles, text: "خدمات متعددة في تطبيق واحد" },
  { icon: ShieldCheck, text: "دفع آمن وسريع" },
  { icon: Clock, text: "دعم فني على مدار الساعة" },
  { icon: Wallet, text: "سهولة ومرونة في الاستخدام" },
];

// ============================================================
// HELPERS
// ============================================================
const waLink = (msg: string, phone = BRAND.whatsapp1) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

// ============================================================
// PAGE
// ============================================================
function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [orderService, setOrderService] = useState<Service | null>(null);
  const [cart, setCart] = useState<Service[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      const catOk = activeCat === "all" || s.category === activeCat;
      const q = query.trim();
      const qOk = !q || s.title.includes(q) || s.desc.includes(q);
      return catOk && qOk;
    });
  }, [query, activeCat]);

  const addToCart = (s: Service) => {
    setCart((c) => (c.find((x) => x.id === s.id) ? c : [...c, s]));
    setCartOpen(true);
  };

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: COLORS.bg, fontFamily: "Tajawal, Cairo, system-ui, sans-serif" }}>
      <TopStrip />
      <Header cartCount={cart.length} onCartClick={() => setCartOpen(true)} />

      <main>
        <Hero />
        <InfoBar />
        <SearchSection query={query} setQuery={setQuery} />
        <CategoriesTabs active={activeCat} onChange={setActiveCat} />
        <ServicesGrid services={filtered} onOrder={setOrderService} onAdd={addToCart} />
        <OffersSection />
        <ReviewsSection />
        <FaqSection open={openFaq} setOpen={setOpenFaq} />
      </main>

      <Footer />

      {orderService && (
        <OrderModal service={orderService} onClose={() => setOrderService(null)} />
      )}
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={(id) => setCart((c) => c.filter((x) => x.id !== id))}
      />

      {/* Floating WhatsApp */}
      <a
        href={waLink("السلام عليكم، أحتاج مساعدة من الخليج تيليكوم")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-xl transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
        aria-label="واتساب"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

// ============================================================
// COMPONENTS
// ============================================================
function TopStrip() {
  return (
    <div className="text-white text-xs sm:text-sm" style={{ background: COLORS.green }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
        <span className="truncate font-semibold">{BRAND.tagline}</span>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline opacity-90">خدمة سريعة وآمنة على مدار الساعة</span>
          <a
            href={waLink("مرحباً، أود الاستفسار عن خدماتكم")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-bold"
            style={{ background: COLORS.gold, color: COLORS.green }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            واتساب
          </a>
        </div>
      </div>
    </div>
  );
}

function Header({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  const links = [
    { href: "#home", label: "الرئيسية" },
    { href: "#services", label: "الخدمات" },
    { href: "#offers", label: "العروض" },
    { href: "#reviews", label: "التقييمات" },
    { href: "#faq", label: "الأسئلة الشائعة" },
    { href: "#contact", label: "تواصل معنا" },
  ];
  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 shadow-sm backdrop-blur" style={{ borderColor: "#E5EFEC" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3">
        <a href="#home" className="flex items-center gap-2 min-w-0">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white font-black"
            style={{ background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})` }}
          >
            خ
          </div>
          <div className="min-w-0">
            <div className="truncate text-base font-extrabold" style={{ color: COLORS.green }}>
              الخليج تيليكوم
            </div>
            <div className="hidden text-[10px] sm:block" style={{ color: COLORS.teal }}>
              منصة خدمات إلكترونية
            </div>
          </div>
        </a>

        <nav className="hidden items-center justify-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-emerald-50"
              style={{ color: COLORS.green }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#search"
            className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-emerald-50"
            style={{ borderColor: "#D9E8E5", color: COLORS.green }}
            aria-label="بحث"
          >
            <Search className="h-4 w-4" />
          </a>
          <button
            onClick={onCartClick}
            className="relative grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-emerald-50"
            style={{ borderColor: "#D9E8E5", color: COLORS.green }}
            aria-label="سلة الطلبات"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -left-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-black text-white"
                style={{ background: COLORS.gold }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.teal} 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(214,168,79,0.25) 0px, transparent 40%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0px, transparent 50%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="text-white">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold"
            style={{ background: "rgba(214,168,79,0.2)", color: COLORS.gold }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            المنصة الرسمية للخليج تيليكوم
          </div>
          <h1 className="text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            مرحبًا بكم في <span style={{ color: COLORS.gold }}>الخليج تيليكوم</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-loose text-white/90 sm:text-lg">
            خدمات الاتصالات اليمنية والدفع الإلكتروني في مكان واحد. اطلب خدمتك بسهولة وأمان على مدار الساعة.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold shadow-lg transition-transform hover:scale-105"
              style={{ background: COLORS.gold, color: COLORS.green }}
            >
              <LayoutGrid className="h-4 w-4" />
              تصفح الخدمات
            </a>
            <a
              href={waLink("مرحباً، أود التواصل مع الخليج تيليكوم")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" />
              تواصل عبر واتساب
            </a>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative mx-auto aspect-[9/18] w-64 rounded-[2.5rem] border-[10px] border-black/80 bg-white shadow-2xl sm:w-72">
            <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black/80" />
            <div
              className="absolute inset-0 m-1 overflow-hidden rounded-[2rem] p-4 pt-10"
              style={{ background: `linear-gradient(180deg, ${COLORS.green}, ${COLORS.teal})` }}
            >
              <div className="text-center text-white">
                <div className="text-xs opacity-80">مرحباً بك في</div>
                <div className="text-lg font-black" style={{ color: COLORS.gold }}>الخليج تيليكوم</div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {[Smartphone, Wifi, Receipt, Gamepad2, Palette, UserCheck].map((Ic, i) => (
                  <div key={i} className="grid aspect-square place-items-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <Ic className="h-6 w-6 text-white" />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl p-3 text-center text-xs font-bold" style={{ background: COLORS.gold, color: COLORS.green }}>
                اطلب خدمتك الآن
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBar() {
  return (
    <section className="border-y bg-white" style={{ borderColor: "#E5EFEC" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4">
        {INFO_BAR.map((it) => (
          <div key={it.text} className="flex items-center gap-3">
            <div
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
              style={{ background: "#E8F4F1", color: COLORS.green }}
            >
              <it.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 text-xs font-bold leading-tight sm:text-sm" style={{ color: COLORS.green }}>
              {it.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SearchSection({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  return (
    <section id="search" className="mx-auto max-w-4xl px-4 pt-10">
      <h2 className="mb-3 text-center text-2xl font-black sm:text-3xl" style={{ color: COLORS.green }}>
        ابحث عن الخدمة
      </h2>
      <p className="mb-5 text-center text-sm text-gray-500">اكتب اسم الخدمة وسيتم فلترة الكروت مباشرة</p>
      <div className="relative">
        <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: COLORS.teal }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="مثال: شحن رصيد، تسديد فاتورة، تصميم تهنئة..."
          className="w-full rounded-2xl border-2 bg-white py-4 pr-12 pl-4 text-sm font-semibold shadow-sm outline-none transition-colors focus:shadow-md"
          style={{ borderColor: "#D9E8E5", color: COLORS.green }}
          onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#D9E8E5")}
        />
      </div>
    </section>
  );
}

function CategoriesTabs({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8">
      <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {CATEGORIES.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all"
              style={
                isActive
                  ? { background: COLORS.green, color: "white", borderColor: COLORS.green }
                  : { background: "white", color: COLORS.green, borderColor: "#D9E8E5" }
              }
            >
              <c.icon className="h-4 w-4" />
              {c.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ServicesGrid({
  services,
  onOrder,
  onAdd,
}: {
  services: Service[];
  onOrder: (s: Service) => void;
  onAdd: (s: Service) => void;
}) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-10">
      {services.length === 0 ? (
        <div className="mx-auto max-w-md rounded-3xl border-2 border-dashed bg-white p-10 text-center" style={{ borderColor: "#D9E8E5" }}>
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl" style={{ background: "#E8F4F1", color: COLORS.teal }}>
            <Search className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-black" style={{ color: COLORS.green }}>لا توجد نتائج</h3>
          <p className="mt-2 text-sm text-gray-500">جرّب كلمة بحث أخرى أو تصفّح من التبويبات أعلاه.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} onOrder={onOrder} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}

function ServiceCard({ s, onOrder, onAdd }: { s: Service; onOrder: (s: Service) => void; onAdd: (s: Service) => void }) {
  const badgeColor =
    s.badge === "الأكثر طلباً" ? COLORS.gold : s.badge === "عرض خاص" ? "#E11D48" : COLORS.teal;
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border-2 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ borderColor: "#E5EFEC" }}
    >
      {s.badge && (
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-black text-white"
          style={{ background: badgeColor }}
        >
          {s.badge}
        </span>
      )}
      <div
        className="mb-4 grid h-16 w-16 place-items-center rounded-2xl transition-transform group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})`, color: "white" }}
      >
        <s.icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-extrabold leading-tight" style={{ color: COLORS.green }}>
        {s.title}
      </h3>
      <p className="mt-2 grow text-sm leading-relaxed text-gray-600">{s.desc}</p>
      <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: "#E5EFEC" }}>
        <span className="text-sm font-black" style={{ color: COLORS.gold }}>
          {s.price}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAdd(s)}
            className="grid h-9 w-9 place-items-center rounded-full border-2 transition-colors hover:bg-emerald-50"
            style={{ borderColor: "#D9E8E5", color: COLORS.green }}
            aria-label="إضافة للسلة"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => onOrder(s)}
            className="rounded-full px-4 py-2 text-xs font-extrabold text-white shadow transition-transform hover:scale-105"
            style={{ background: COLORS.green }}
          >
            اطلب الخدمة
          </button>
        </div>
      </div>
    </article>
  );
}

function OffersSection() {
  return (
    <section id="offers" className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4">
        <Heading title="عروض مميزة" subtitle="فرص محدودة لا تفوّتها" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {OFFERS.map((o) => (
            <div
              key={o.title}
              className="group relative overflow-hidden rounded-3xl p-6 text-white shadow-lg transition-transform hover:-translate-y-1"
              style={{ background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.teal})` }}
            >
              <div
                className="absolute -left-6 -top-6 h-32 w-32 rounded-full opacity-20"
                style={{ background: COLORS.gold }}
              />
              <div
                className="relative mb-4 grid h-14 w-14 place-items-center rounded-2xl"
                style={{ background: COLORS.gold, color: COLORS.green }}
              >
                <o.icon className="h-7 w-7" />
              </div>
              <h3 className="relative text-lg font-extrabold">{o.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/90">{o.desc}</p>
              <a
                href={waLink(`السلام عليكم، أرغب بالاستفادة من العرض: ${o.title}`)}
                target="_blank"
                rel="noreferrer"
                className="relative mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black"
                style={{ background: COLORS.gold, color: COLORS.green }}
              >
                استفد الآن
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <Heading title="آراء عملائنا" subtitle="تقييمات حقيقية من مستخدمي الخليج تيليكوم" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="rounded-3xl border-2 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              style={{ borderColor: "#E5EFEC" }}
            >
              <div className="flex items-center gap-1" style={{ color: COLORS.gold }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill={i < r.stars ? COLORS.gold : "none"} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">"{r.text}"</p>
              <div className="mt-4 flex items-center gap-3 border-t pt-3" style={{ borderColor: "#E5EFEC" }}>
                <div
                  className="grid h-10 w-10 place-items-center rounded-full font-black text-white"
                  style={{ background: COLORS.teal }}
                >
                  {r.name.charAt(0)}
                </div>
                <div className="text-sm font-bold" style={{ color: COLORS.green }}>{r.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            className="rounded-full border-2 px-6 py-2.5 text-sm font-extrabold transition-colors hover:bg-emerald-50"
            style={{ borderColor: COLORS.green, color: COLORS.green }}
          >
            عرض جميع التقييمات
          </button>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ open, setOpen }: { open: number | null; setOpen: (v: number | null) => void }) {
  return (
    <section id="faq" className="bg-white py-14">
      <div className="mx-auto max-w-3xl px-4">
        <Heading title="الأسئلة الشائعة" subtitle="أجوبة سريعة لأكثر ما يسأل عنه عملاؤنا" />
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border-2 bg-white transition-shadow"
                style={{ borderColor: isOpen ? COLORS.teal : "#E5EFEC" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-right text-sm font-extrabold"
                  style={{ color: COLORS.green }}
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform"
                    style={{ color: COLORS.teal, transform: isOpen ? "rotate(180deg)" : undefined }}
                  />
                </button>
                {isOpen && (
                  <div className="border-t px-4 py-4 text-sm leading-relaxed text-gray-600" style={{ borderColor: "#E5EFEC" }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="mt-10 text-white" style={{ background: COLORS.green }}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <div
              className="grid h-11 w-11 place-items-center rounded-xl font-black"
              style={{ background: COLORS.gold, color: COLORS.green }}
            >
              خ
            </div>
            <div className="text-lg font-extrabold">الخليج تيليكوم</div>
          </div>
          <p className="mt-4 text-sm leading-loose text-white/80">
            منصة يمنية متخصصة في خدمات الاتصالات والدفع الإلكتروني، نسعى لتقديم تجربة سهلة وآمنة.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold" style={{ color: COLORS.gold }}>روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-white/85">
            <li><a href="#services" className="hover:text-white">الخدمات</a></li>
            <li><a href="#offers" className="hover:text-white">العروض</a></li>
            <li><a href="#reviews" className="hover:text-white">التقييمات</a></li>
            <li><a href="#faq" className="hover:text-white">الأسئلة الشائعة</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold" style={{ color: COLORS.gold }}>تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: COLORS.gold }} /> 775608601</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: COLORS.gold }} /> 781635755</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: COLORS.gold }} /> {BRAND.address}</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold" style={{ color: COLORS.gold }}>تواصل واتساب</h4>
          <div className="flex flex-col gap-2">
            <a
              href={waLink("مرحباً، أود التواصل")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
              style={{ background: COLORS.gold, color: COLORS.green }}
            >
              <MessageCircle className="h-4 w-4" /> 775608601
            </a>
            <a
              href={waLink("مرحباً، أود التواصل", BRAND.whatsapp2)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold text-white"
              style={{ borderColor: COLORS.gold }}
            >
              <MessageCircle className="h-4 w-4" /> 781635755
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/70">
          © {new Date().getFullYear()} الخليج تيليكوم — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-black sm:text-4xl" style={{ color: COLORS.green }}>{title}</h2>
      <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full" style={{ background: COLORS.gold }} />
    </div>
  );
}

// ============================================================
// MODALS
// ============================================================
function OrderModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceName, setServiceName] = useState(service.title);
  const [notes, setNotes] = useState("");

  const submit = () => {
    const msg = `السلام عليكم، أريد طلب خدمة من الخليج تيليكوم
الخدمة: ${serviceName}
الاسم: ${name || "—"}
رقم الجوال: ${phone || "—"}
الملاحظات: ${notes || "—"}`;
    window.open(waLink(msg), "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between p-5 text-white" style={{ background: COLORS.green }}>
          <div>
            <div className="text-xs opacity-80">طلب خدمة</div>
            <div className="text-lg font-extrabold">{service.title}</div>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <Field label="اسم العميل">
            <input value={name} onChange={(e) => setName(e.target.value)} className={fieldCls} placeholder="الاسم الكامل" />
          </Field>
          <Field label="رقم الجوال">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={fieldCls} placeholder="مثال: 7xxxxxxxx" inputMode="tel" />
          </Field>
          <Field label="اختيار الخدمة">
            <select value={serviceName} onChange={(e) => setServiceName(e.target.value)} className={fieldCls}>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </Field>
          <Field label="ملاحظات إضافية">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={fieldCls} placeholder="اكتب أي تفاصيل إضافية..." />
          </Field>
          <button
            onClick={submit}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-lg transition-transform hover:scale-[1.02]"
            style={{ background: "#25D366" }}
          >
            <Send className="h-4 w-4" /> إرسال الطلب عبر واتساب
          </button>
        </div>
      </div>
    </div>
  );
}

const fieldCls =
  "w-full rounded-xl border-2 border-[#D9E8E5] bg-white px-3 py-2.5 text-sm font-semibold text-[#004C45] outline-none focus:border-[#00796B]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-extrabold" style={{ color: COLORS.green }}>{label}</span>
      {children}
    </label>
  );
}

function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
}: {
  open: boolean;
  items: Service[];
  onClose: () => void;
  onRemove: (id: string) => void;
}) {
  if (!open) return null;
  const sendAll = () => {
    if (items.length === 0) return;
    const list = items.map((s, i) => `${i + 1}. ${s.title}`).join("\n");
    const msg = `السلام عليكم، أرغب بطلب الخدمات التالية من الخليج تيليكوم:\n${list}`;
    window.open(waLink(msg), "_blank");
  };
  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60" onClick={onClose}>
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between p-5 text-white" style={{ background: COLORS.green }}>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <div className="text-lg font-extrabold">سلة الطلبات ({items.length})</div>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/25">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="mt-10 text-center text-sm text-gray-500">
              <ShoppingCart className="mx-auto mb-3 h-10 w-10 opacity-30" />
              لا توجد خدمات في السلة بعد.
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-3 rounded-2xl border-2 bg-white p-3"
                  style={{ borderColor: "#E5EFEC" }}
                >
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                    style={{ background: COLORS.teal }}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-extrabold" style={{ color: COLORS.green }}>{s.title}</div>
                    <div className="text-xs font-bold" style={{ color: COLORS.gold }}>{s.price}</div>
                  </div>
                  <button
                    onClick={() => onRemove(s.id)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-red-600 hover:bg-red-50"
                    aria-label="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t p-4" style={{ borderColor: "#E5EFEC" }}>
          <button
            disabled={items.length === 0}
            onClick={sendAll}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-lg transition-transform enabled:hover:scale-[1.02] disabled:opacity-50"
            style={{ background: "#25D366" }}
          >
            <Send className="h-4 w-4" /> إرسال الطلبات عبر واتساب
          </button>
        </div>
      </div>
    </div>
  );
}

// silence unused
void Minus;
void Mail;
