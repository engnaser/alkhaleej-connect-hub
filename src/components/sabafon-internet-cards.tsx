import { useState } from "react";
import { Wifi, Smartphone, Signal, Copy, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditableActionCodes } from "@/components/editable-action-codes";
import { toast } from "sonner";

// ============================================================
// Sabafon internet setup cards (ضبط الإنترنت)
// ============================================================

function CardShell({
  title,
  icon,
  children,
  tone = "default",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  tone?: "default" | "accent" | "info";
}) {
  const toneClass =
    tone === "accent"
      ? "from-amber-500/10 to-transparent"
      : tone === "info"
      ? "from-sky-500/10 to-transparent"
      : "from-primary/10 to-transparent";
  return (
    <div className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elegant)]">
      <div className={`mb-4 -mx-5 -mt-5 rounded-t-2xl bg-gradient-to-b ${toneClass} px-5 pt-5 pb-3`}>
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
            {icon}
          </div>
          <h3 className="text-lg font-black text-foreground">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );
}

function ApnRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-bold text-foreground ${mono ? "font-mono" : ""}`}
        dir={mono ? "ltr" : undefined}
      >
        {value}
      </span>
    </div>
  );
}

function ApnDetailsDialog({
  triggerLabel = "عرض التفاصيل",
  title,
  intro,
  steps,
  rows,
  extraNote,
}: {
  triggerLabel?: string;
  title: string;
  intro?: string;
  steps?: string[];
  rows: { label: string; value: string; mono?: boolean }[];
  extraNote?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = [title, ...rows.map((r) => `${r.label}: ${r.value}`)].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("تم نسخ إعدادات APN");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("تعذّر النسخ");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-full bg-primary font-bold text-primary-foreground hover:bg-primary/90">
          <Info className="ml-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {intro && (
            <p className="text-sm leading-relaxed text-muted-foreground">{intro}</p>
          )}
          {steps && steps.length > 0 && (
            <ol className="space-y-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed text-foreground">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-primary">{i + 1}-</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          )}
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            {rows.map((r) => (
              <ApnRow key={r.label} label={r.label} value={r.value} mono={r.mono} />
            ))}
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            className="w-full rounded-full font-bold"
          >
            {copied ? <Check className="ml-2 h-4 w-4" /> : <Copy className="ml-2 h-4 w-4" />}
            {copied ? "تم النسخ" : "نسخ إعدادات APN"}
          </Button>
          {extraNote && (
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs leading-relaxed text-foreground">
              {extraNote}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ------------------------------------------------------------
// 1) تفعيل خدمة الإنترنت
// ------------------------------------------------------------
export function SabafonActivateInternetCard() {
  return (
    <CardShell title="تفعيل خدمة الإنترنت" icon={<Wifi className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        للتفعيل، اضغط زر «تفعيل» ثم أرسل الرسالة الفارغة إلى الرقم <bdi dir="ltr" className="font-mono font-bold text-primary">6633</bdi>.
      </p>
      <EditableActionCodes
        id="sabafon-activate-internet"
        activateCode="sms:6633"
        detailsSlot={null}
      />
    </CardShell>
  );
}

// ------------------------------------------------------------
// 2) إعداد نقاط الوصول بنظام التوجي 2G
// ------------------------------------------------------------
export function SabafonApn2GCard() {
  return (
    <CardShell title="اعداد نقاط الوصول بنظام التوجي 2G" icon={<Signal className="h-5 w-5" />} tone="accent">
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        خطوات إعداد نقطة الوصول (APN) لتشغيل إنترنت سبافون على شبكة الجيل الثاني/الثالث.
      </p>
      <ApnDetailsDialog
        title="إعداد APN — سبافون 2G"
        intro="اتّبع الخطوات التالية بالترتيب:"
        steps={[
          "الذهاب إلى الإعدادات / Settings",
          "الذهاب إلى الاتصالات / Connections",
          "الذهاب إلى شبكات الهاتف المحمول / Mobile networks",
          "من نمط الشبكة / Mobile networks اختر LTE/4G أو LTE",
          "الدخول إلى أسماء نقاط الوصول / Access Point Names",
          "إضافة نقطة وصول جديدة / Add",
          "أدخل الإعدادات في كل حقل كما هو موضح بالأسفل",
          "احفظ الإعدادات ثم اختر نقطة الوصول Sabafon حتى تصبح الدائرة أمامها خضراء",
          "شغّل بيانات الجوال، وإن لم يعمل الإنترنت أعد تشغيل الهاتف",
        ]}
        rows={[
          { label: "الاسم / Name", value: "Sabafon" },
          { label: "APN", value: "net", mono: true },
          { label: "اسم المستخدم / Username", value: "internet", mono: true },
          { label: "كلمة المرور / Password", value: "internet", mono: true },
          { label: "نوع المصادقة / Auth", value: "PAP و CHAP", mono: true },
          { label: "نوع نقطة الوصول / APN type", value: "default", mono: true },
        ]}
        extraNote="بعد الحفظ، اختر نقطة الوصول الجديدة كافتراضية بالضغط على الدائرة أمام Sabafon، ثم شغّل إشارة البيانات."
      />
    </CardShell>
  );
}

// ------------------------------------------------------------
// 3) إعداد نقاط الوصول بنظام الفورجي 4G (Android)
// ------------------------------------------------------------
export function SabafonApn4GCard() {
  return (
    <CardShell title="اعداد نقاط الوصول بنظام الفورجي 4G" icon={<Wifi className="h-5 w-5" />} tone="info">
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        إعدادات نقطة الوصول (APN) لتشغيل إنترنت سبافون على شبكة الجيل الرابع لأجهزة أندرويد.
      </p>
      <ApnDetailsDialog
        title="إعداد APN — سبافون 4G (Android)"
        intro="من الإعدادات → الشبكة الخلوية → نقاط الوصول (APN) → إضافة جديدة:"
        rows={[
          { label: "الاسم", value: "Sabafon 4G" },
          { label: "APN", value: "sabafon", mono: true },
          { label: "اسم المستخدم", value: "بدون" },
          { label: "كلمة المرور", value: "بدون" },
          { label: "نوع التحقق", value: "None" },
          { label: "نوع APN", value: "default,supl,ia", mono: true },
          { label: "البروتوكول", value: "IPv4/IPv6", mono: true },
          { label: "نوع شبكة APN", value: "LTE", mono: true },
        ]}
        extraNote="فعّل خيار LTE/4G من إعدادات الشبكة، واختر نقطة الوصول الجديدة كافتراضية."
      />
    </CardShell>
  );
}

// ------------------------------------------------------------
// 4) إعداد نقاط الوصول للأيفون 4G
// ------------------------------------------------------------
export function SabafonApniPhone4GCard() {
  return (
    <CardShell title="اعداد نقاط الوصول للأيفون بنظام الفورجي 4G" icon={<Smartphone className="h-5 w-5" />} tone="info">
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        إعدادات شبكة البيانات الخلوية لتشغيل إنترنت سبافون 4G على أجهزة الأيفون.
      </p>
      <ApnDetailsDialog
        title="إعداد APN — سبافون 4G (iPhone)"
        intro="من الإعدادات → خلوي → شبكة البيانات الخلوية، أدخل القيم في أقسام (بيانات خلوية / LTE / نقطة اتصال):"
        rows={[
          { label: "APN", value: "sabafon", mono: true },
          { label: "اسم المستخدم", value: "بدون" },
          { label: "كلمة المرور", value: "بدون" },
          { label: "MMSC", value: "بدون" },
          { label: "خادم MMS الوكيل", value: "بدون" },
          { label: "الحد الأقصى لـ MMS", value: "1048576" },
        ]}
        extraNote="بعد الإدخال أعد تشغيل الجهاز، وتأكد أن خيار «تمكين LTE» مضبوط على «الصوت والبيانات»."
      />
    </CardShell>
  );
}

export function SabafonInternetCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SabafonActivateInternetCard />
      <SabafonApn2GCard />
      <SabafonApn4GCard />
      <SabafonApniPhone4GCard />
    </div>
  );
}
