import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { toast } from "sonner";
import {
  ShieldCheck,
  Mail,
  Copy,
  Info,
  ArrowLeft,
  Sparkles,
  Search,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Phone,
} from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";
import { COUNTRIES, POPULAR_ISO, type Country } from "@/data/countries";

export const Route = createFileRoute("/whatsapp-unblock")({
  head: () => ({
    meta: [
      { title: "فك حظر الواتساب — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "جهّز رسالة طلب مراجعة حظر رقم واتساب الخاص بك وأرسلها بسهولة إلى دعم واتساب عبر البريد الإلكتروني.",
      },
      {
        property: "og:title",
        content: "فك حظر الواتساب — الخليج تيليكوم",
      },
      {
        property: "og:description",
        content:
          "أداة عربية لتجهيز رسالة بريد رسمية إلى دعم واتساب لمراجعة حظر رقمك.",
      },,
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/whatsapp-unblock" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/whatsapp-unblock" }],
  }),
  component: WhatsappUnblockPage,
});

const WHATSAPP_BRAND = "967775608601";
const SUPPORT_EMAIL = "support@support.whatsapp.com";

const ISSUE_OPTIONS = [
  {
    id: "by-mistake",
    label: "تم حظر رقمي عن طريق الخطأ",
    subject: "My phone number has been blocked by mistake",
    extra:
      "I believe my number was blocked by mistake. I have not violated WhatsApp Terms of Service.",
  },
  {
    id: "no-reason",
    label: "تم حظر حسابي بدون سبب واضح",
    subject: "My WhatsApp account has been blocked for no reason",
    extra:
      "My WhatsApp account has been blocked and I am not aware of any reason for this action.",
  },
  {
    id: "official-app",
    label: "أستخدم تطبيق واتساب الرسمي",
    subject: "I only use the official WhatsApp application",
    extra:
      "I only use the official WhatsApp application downloaded from the official store. I do not use any modified or unofficial version.",
  },
  {
    id: "review",
    label: "أريد مراجعة الحظر",
    subject: "Request to review my WhatsApp account ban",
    extra:
      "I kindly request a review of the ban applied to my WhatsApp account.",
  },
] as const;

type IssueId = (typeof ISSUE_OPTIONS)[number]["id"];

function buildMessage(fullNumber: string, issue: (typeof ISSUE_OPTIONS)[number]) {
  const subject = issue.subject;
  const body = `Dear WhatsApp Support Team,

My WhatsApp account has been blocked, and I believe this happened by mistake.

${issue.extra}

I am using the official WhatsApp application and I do not use my account to spam, annoy, or violate WhatsApp policies.

Please review my account and help me restore access as soon as possible.

My WhatsApp number is: ${fullNumber}

Thank you for your time and support.`;
  return { subject, body };
}

function WhatsappUnblockPage() {
  const yemen = useMemo(
    () => COUNTRIES.find((c) => c.iso === "YE") ?? COUNTRIES[0],
    [],
  );
  const [country, setCountry] = useState<Country>(yemen);
  const [phone, setPhone] = useState("");
  const [issueId, setIssueId] = useState<IssueId>("by-mistake");
  const [generated, setGenerated] = useState<{
    subject: string;
    body: string;
    full: string;
  } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sorted = [...COUNTRIES].sort((a, b) => {
      const ap = POPULAR_ISO.indexOf(a.iso);
      const bp = POPULAR_ISO.indexOf(b.iso);
      const aw = ap === -1 ? 999 : ap;
      const bw = bp === -1 ? 999 : bp;
      if (aw !== bw) return aw - bw;
      return a.ar.localeCompare(b.ar, "ar");
    });
    if (!q) return sorted;
    return sorted.filter(
      (c) =>
        c.ar.toLowerCase().includes(q) ||
        c.en.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.dial.includes(q),
    );
  }, [search]);

  const cleanPhone = (raw: string) => raw.replace(/[^\d]/g, "");

  const validate = (): { ok: boolean; full?: string } => {
    const digits = cleanPhone(phone);
    if (!digits) {
      toast.error("يرجى إدخال رقم الواتساب");
      return { ok: false };
    }
    if (digits.length < 6) {
      toast.error("يرجى إدخال رقم صحيح");
      return { ok: false };
    }
    const trimmed = digits.replace(/^0+/, "");
    const full = `${country.dial}${trimmed}`;
    return { ok: true, full };
  };

  const handleGenerate = () => {
    const v = validate();
    if (!v.ok || !v.full) return;
    const issue = ISSUE_OPTIONS.find((i) => i.id === issueId)!;
    const { subject, body } = buildMessage(v.full, issue);
    setGenerated({ subject, body, full: v.full });
    toast.success("تم تجهيز الرسالة");
  };

  const handleSendEmail = () => {
    const data =
      generated ??
      (() => {
        const v = validate();
        if (!v.ok || !v.full) return null;
        const issue = ISSUE_OPTIONS.find((i) => i.id === issueId)!;
        const { subject, body } = buildMessage(v.full, issue);
        setGenerated({ subject, body, full: v.full });
        return { subject, body, full: v.full };
      })();
    if (!data) return;
    const href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      data.subject,
    )}&body=${encodeURIComponent(data.body)}`;
    window.location.href = href;
  };

  const handleCopy = async () => {
    const data =
      generated ??
      (() => {
        const v = validate();
        if (!v.ok || !v.full) return null;
        const issue = ISSUE_OPTIONS.find((i) => i.id === issueId)!;
        const { subject, body } = buildMessage(v.full, issue);
        setGenerated({ subject, body, full: v.full });
        return { subject, body, full: v.full };
      })();
    if (!data) return;
    const text = `Subject: ${data.subject}\n\n${data.body}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("تم نسخ الرسالة بنجاح");
    } catch {
      toast.error("تعذّر النسخ، انسخ الرسالة يدويًا");
    }
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
                "radial-gradient(900px 500px at 20% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              خدمة دعم
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              فك حظر الواتساب
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              أدخل رقمك المحظور وسيتم تجهيز رسالة رسمية لإرسالها إلى دعم واتساب
              لمراجعة الحظر.
            </p>
          </div>
        </section>

        {/* TOOL */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-10">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-7 w-7" />
            </div>

            {/* Country */}
            <label className="mb-2 block text-sm font-bold text-foreground">
              الدولة / مفتاح الاتصال
            </label>
            <div className="relative mb-5">
              <button
                type="button"
                onClick={() => setPickerOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 text-right text-sm font-semibold text-foreground transition-colors hover:border-primary/50"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl leading-none">{country.flag}</span>
                  <span>{country.ar}</span>
                  <span className="font-mono text-primary">{country.dial}</span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${pickerOpen ? "rotate-180" : ""}`}
                />
              </button>

              {pickerOpen && (
                <div className="absolute z-20 mt-2 max-h-80 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
                  <div className="border-b border-border p-2">
                    <div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <input
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث عن دولة..."
                        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredCountries.length === 0 && (
                      <div className="p-4 text-center text-xs text-muted-foreground">
                        لا توجد نتائج
                      </div>
                    )}
                    {filteredCountries.map((c) => (
                      <button
                        key={c.iso}
                        type="button"
                        onClick={() => {
                          setCountry(c);
                          setPickerOpen(false);
                          setSearch("");
                        }}
                        className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-right text-sm transition-colors hover:bg-secondary/70 ${
                          c.iso === country.iso
                            ? "bg-primary/10 text-primary"
                            : "text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg leading-none">{c.flag}</span>
                          <span className="font-semibold">{c.ar}</span>
                          <span className="text-xs text-muted-foreground">
                            {c.en}
                          </span>
                        </span>
                        <span className="font-mono text-xs text-primary">
                          {c.dial}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Phone */}
            <label className="mb-2 block text-sm font-bold text-foreground">
              رقم الواتساب المحظور
            </label>
            <div className="mb-5 flex items-stretch overflow-hidden rounded-xl border border-border bg-secondary/40 focus-within:border-primary/60">
              <div className="flex items-center gap-1 border-l border-border bg-secondary/60 px-3 text-sm font-bold text-primary">
                <Phone className="h-4 w-4" />
                {country.dial}
              </div>
              <input
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(cleanPhone(e.target.value))}
                placeholder="أدخل رقم الواتساب المحظور — مثال: 780036634"
                maxLength={15}
                className="w-full bg-transparent px-3 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            {/* Issue */}
            <label className="mb-2 block text-sm font-bold text-foreground">
              نوع المشكلة
            </label>
            <div className="mb-6 grid gap-2 sm:grid-cols-2">
              {ISSUE_OPTIONS.map((opt) => {
                const active = issueId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setIssueId(opt.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-right text-xs font-semibold transition-all ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/40 text-foreground/80 hover:border-primary/40"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background"
                      }`}
                    >
                      {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
              >
                <Sparkles className="h-4 w-4" />
                تجهيز الرسالة
              </button>
              <button
                type="button"
                onClick={handleSendEmail}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-extrabold text-white shadow-md transition-transform hover:scale-[1.03]"
              >
                <Mail className="h-4 w-4" />
                إرسال عبر Gmail
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary/40 bg-transparent px-6 py-3 text-sm font-extrabold text-primary transition-colors hover:bg-primary/10"
              >
                <Copy className="h-4 w-4" />
                نسخ الرسالة
              </button>
              <button
                type="button"
                onClick={() => setShowHelp((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-5 py-3 text-sm font-bold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Info className="h-4 w-4" />
                تفاصيل وإرشادات
              </button>
            </div>

            {/* Help */}
            {showHelp && (
              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-right text-sm leading-relaxed text-foreground/90">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-extrabold">إرشادات مهمة</span>
                </div>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-foreground/80">
                  <li>استخدم تطبيق واتساب الرسمي فقط.</li>
                  <li>لا ترسل طلبات كثيرة بشكل متكرر.</li>
                  <li>اكتب رقمك كاملًا مع مفتاح الدولة.</li>
                  <li>لا تستخدم واتساب معدل أو غير رسمي.</li>
                  <li>الرد من واتساب قد يستغرق وقتًا.</li>
                  <li>الخدمة تساعدك في تجهيز الرسالة فقط ولا تضمن فك الحظر.</li>
                </ul>
              </div>
            )}

            {/* Preview */}
            {generated && (
              <div className="mt-8 rounded-2xl border border-border bg-secondary/30 p-5 text-right">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="text-xs font-bold text-muted-foreground">
                    معاينة الرسالة
                  </div>
                  <div className="text-xs font-mono text-primary">
                    {generated.full}
                  </div>
                </div>
                <div className="mb-2 text-sm font-extrabold text-foreground">
                  Subject: {generated.subject}
                </div>
                <pre
                  dir="ltr"
                  className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-background/60 p-4 text-left text-xs leading-relaxed text-foreground/85"
                >
                  {generated.body}
                </pre>
                <div className="mt-3 text-xs text-muted-foreground">
                  ترسل الرسالة إلى:{" "}
                  <span className="font-mono text-primary">{SUPPORT_EMAIL}</span>
                </div>
              </div>
            )}

            <p className="mt-8 text-center text-xs text-muted-foreground">
              هذه الخدمة تساعدك في تجهيز رسالة مراجعة فقط ولا تضمن فك الحظر —
              القرار النهائي يعود إلى دعم واتساب.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
