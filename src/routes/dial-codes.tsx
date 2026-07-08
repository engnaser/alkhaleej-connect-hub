import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { Search, Copy, MessageCircle, Globe, Sparkles, ArrowLeft, Check } from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";
import { COUNTRIES, POPULAR_ISO, REGIONS, type Country, type Region } from "@/data/countries";

export const Route = createFileRoute("/dial-codes")({
  head: () => ({
    meta: [
      { title: "مفاتيح دول العالم — الخليج تيليكوم" },
      { name: "description", content: "ابحث عن مفتاح الاتصال الدولي لأي دولة في العالم بسرعة وسهولة." },
      { property: "og:title", content: "مفاتيح دول العالم — الخليج تيليكوم" },
      { property: "og:description", content: "دليل شامل لمفاتيح الاتصال الدولية لجميع دول العالم." },,
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/dial-codes" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/dial-codes" }],
  }),
  component: DialCodesPage,
});

const WHATSAPP = "967775608601";

function DialCodesPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "الكل">("الكل");
  const [copied, setCopied] = useState<string | null>(null);
  const navigate = useNavigate();

  const popular = useMemo(
    () =>
      POPULAR_ISO.map((iso) => COUNTRIES.find((c) => c.iso === iso)).filter(
        (c): c is Country => Boolean(c),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const qDigits = q.replace(/\D+/g, "");
    return COUNTRIES.filter((c) => {
      if (region !== "الكل" && c.region !== region) return false;
      if (!q) return true;
      if (c.ar.toLowerCase().includes(q)) return true;
      if (c.en.toLowerCase().includes(q)) return true;
      if (c.iso.toLowerCase().includes(q)) return true;
      const dialDigits = c.dial.replace(/\D+/g, "");
      if (qDigits && dialDigits.includes(qDigits)) return true;
      if (c.dial.includes(q)) return true;
      return false;
    });
  }, [query, region]);

  const copy = async (dial: string) => {
    try {
      await navigator.clipboard.writeText(dial);
    } catch {
      const el = document.createElement("textarea");
      el.value = dial;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(dial);
    setTimeout(() => setCopied((v) => (v === dial ? null : v)), 1500);
  };

  const useInWhatsApp = (c: Country) => {
    navigate({
      to: "/services",
      search: { dial: c.dial },
      hash: "whatsapp-tool",
    });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <SiteHeader
        cta={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            كل الخدمات
          </Link>
        }
      />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Globe className="h-3.5 w-3.5" />
              دليل عالمي
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">مفاتيح دول العالم</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              ابحث عن مفتاح الاتصال الدولي لأي دولة في العالم بسرعة وسهولة.
            </p>
          </div>
        </section>

        {/* CONTROLS */}
        <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-6">
            <label className="mb-2 block text-sm font-bold text-foreground">
              ابحث باسم الدولة أو المفتاح
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="مثال: اليمن، Saudi Arabia، +967"
                className="w-full rounded-xl border border-border bg-background px-10 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(["الكل", ...REGIONS] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                    region === r
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary/40 text-foreground/80 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* POPULAR */}
        {!query && region === "الكل" && (
          <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-extrabold text-foreground">الأكثر استخدامًا</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((c) => (
                <CountryCard
                  key={`pop-${c.iso}`}
                  c={c}
                  copied={copied === c.dial}
                  onCopy={() => copy(c.dial)}
                  onUseWA={() => useInWhatsApp(c)}
                />
              ))}
            </div>
          </section>
        )}

        {/* RESULTS */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-foreground">
              {query ? "نتائج البحث" : "جميع الدول"}
            </h2>
            <span className="text-xs font-semibold text-muted-foreground">
              {filtered.length} دولة
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-base font-bold text-muted-foreground">
                لم يتم العثور على الدولة
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <CountryCard
                  key={c.iso}
                  c={c}
                  copied={copied === c.dial}
                  onCopy={() => copy(c.dial)}
                  onUseWA={() => useInWhatsApp(c)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function CountryCard({
  c,
  copied,
  onCopy,
  onUseWA,
}: {
  c: Country;
  copied: boolean;
  onCopy: () => void;
  onUseWA: () => void;
}) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-2xl">
          <span aria-hidden>{c.flag}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-extrabold text-foreground">{c.ar}</div>
          <div className="truncate text-xs font-semibold text-muted-foreground" dir="ltr">
            {c.en} · {c.iso}
          </div>
        </div>
        <div dir="ltr" className="rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-black text-primary">
          {c.dial}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              تم نسخ مفتاح الدولة
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              نسخ المفتاح
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onUseWA}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-extrabold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          استخدام في واتساب
        </button>
      </div>
    </div>
  );
}
