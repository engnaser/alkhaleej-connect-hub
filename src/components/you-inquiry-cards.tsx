import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import {
  PhoneCall,
  Info,
  Wallet,
  ReceiptText,
  Wifi,
  BellRing,
  PhoneOff,
} from "lucide-react";
import type { ReactNode } from "react";

/* ---------- shared building blocks (match site style) ---------- */

function CodePill({ code }: { code: string }) {
  return (
    <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground">كود التفعيل</span>
        <bdi
          dir="ltr"
          className="font-mono text-lg font-black text-primary"
          style={{ unicodeBidi: "isolate" }}
        >
          {code}
        </bdi>
      </div>
    </div>
  );
}

function ActivateButton({ href, label = "تفعيل" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
    >
      <PhoneCall className="h-4 w-4" />
      {label}
    </a>
  );
}


function DetailsButton({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary">
          <Info className="h-4 w-4" />
          التفاصيل
        </button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm leading-relaxed text-foreground/85">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CardShell({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="text-base font-extrabold text-foreground">{title}</h4>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ---------- 1) Balance & packages inquiry ---------- */

export function YouBalanceInquiryCard() {
  return (
    <CardShell title="الاستعلام عن الرصيد ورصيد الباقات" icon={<Wallet className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        استعلم عن رصيدك الأساسي ورصيد الباقات المفعلة (إنترنت، مكالمات، رسائل)
        عبر كود مختصر ومجاني.
      </p>
      <CodePill code="*111#" />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <ActivateButton href="tel:*111%23" label="استعلام" />
        <DetailsButton title="الاستعلام عن الرصيد ورصيد الباقات">
          <p>
            اطلب الرمز{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>
              *111#
            </bdi>{" "}
            من هاتفك ليعرض لك الرصيد المتاح وباقات المكالمات والرسائل والإنترنت
            المفعلة على خطك.
          </p>
          <p>الخدمة مجانية ومتاحة على مدار الساعة لخطوط الدفع المسبق.</p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

/* ---------- 2) Bill inquiry ---------- */

export function YouBillInquiryCard() {
  return (
    <CardShell title="الاستعلام عن الفاتورة" icon={<ReceiptText className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        اعرف قيمة فاتورتك الحالية وتاريخ استحقاقها لخطوط الفوترة الشهرية من يو.
      </p>
      <CodePill code="*112#" />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <ActivateButton href="tel:*112%23" label="استعلام" />
        <DetailsButton title="الاستعلام عن الفاتورة">
          <p>
            اطلب الرمز{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>
              *112#
            </bdi>{" "}
            من خط الفوترة لعرض قيمة الفاتورة الحالية والمتأخرات وتاريخ
            الاستحقاق.
          </p>
          <p>الخدمة مخصصة لمشتركي الدفع الآجل (فوترة) من شركة يو.</p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

/* ---------- 3) Browse YOU 4G packages ---------- */

export function YouBrowse4GCard() {
  return (
    <CardShell title="تصفح باقات YOU 4G" icon={<Wifi className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        تصفح جميع باقات الإنترنت من يو فورجي (سمارت نت، مكس، وفر) وقارن الأسعار
        والصلاحيات قبل التفعيل.
      </p>
      <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground">
        باقات إنترنت متنوعة تناسب الاستخدام اليومي والاستخدام الكثيف.
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <Link
          to="/you-services"
          hash="packages"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Wifi className="h-4 w-4" />
          تصفح الباقات
        </Link>
        <DetailsButton title="باقات YOU 4G">
          <p>
            توفر شركة يو مجموعة واسعة من باقات الإنترنت فورجي بأسعار وسعات
            متنوعة، منها: باقات <span className="font-bold">سمارت نت</span>{" "}
            الشهرية، وباقات <span className="font-bold">مكس</span> التي تجمع
            بين الإنترنت والمكالمات، وباقات <span className="font-bold">وفر</span>{" "}
            الاقتصادية.
          </p>
          <p>اضغط "تصفح الباقات" للانتقال إلى تبويب الباقات ومقارنة الخيارات.</p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

/* ---------- 4) Super Kashef — off / out of coverage ---------- */

export function YouSuperKashefOffCard() {
  return (
    <CardShell
      title="خدمة سوبر كاشف — عند إغلاق الجهاز أو خارج التغطية"
      icon={<BellRing className="h-5 w-5" />}
    >
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        تصلك رسالة SMS بأرقام المتصلين الذين حاولوا الاتصال بك أثناء إغلاق
        جهازك أو خروجه عن التغطية، حتى لا يفوتك أي اتصال مهم.
      </p>
      <CodePill code="*62#" />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <ActivateButton href="tel:*62%23" />
        <DetailsButton title="سوبر كاشف — خارج التغطية">
          <p>
            الخدمة تُبلّغك عبر رسالة نصية بجميع الأرقام التي حاولت الاتصال بك
            أثناء كون جهازك مغلقاً أو خارج نطاق التغطية.
          </p>
          <p>
            للتفعيل اطلب{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>*62#</bdi>{" "}
            وللإلغاء اطلب{" "}
            <bdi dir="ltr" className="font-mono font-bold text-destructive" style={{ unicodeBidi: "isolate" }}>##62#</bdi>.
          </p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

/* ---------- 5) Super Kashef — busy line ---------- */

export function YouSuperKashefBusyCard() {
  return (
    <CardShell
      title="خدمة سوبر كاشف — عند انشغال الخط"
      icon={<PhoneOff className="h-5 w-5" />}
    >
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        تصلك رسالة SMS بأرقام المتصلين الذين حاولوا الاتصال بك أثناء انشغال خطك
        بمكالمة أخرى.
      </p>
      <CodePill code="*67#" />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <ActivateButton href="tel:*67%23" />
        <DetailsButton title="سوبر كاشف — انشغال الخط">
          <p>
            الخدمة تُبلّغك عبر رسالة نصية بجميع الأرقام التي حاولت الاتصال بك
            أثناء انشغال خطك بمكالمة أخرى.
          </p>
          <p>
            للتفعيل اطلب{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>*67#</bdi>{" "}
            وللإلغاء اطلب{" "}
            <bdi dir="ltr" className="font-mono font-bold text-destructive" style={{ unicodeBidi: "isolate" }}>##67#</bdi>.
          </p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}
