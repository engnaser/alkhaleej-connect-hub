import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import {
  Info,
  Wallet,
  ReceiptText,
  Wifi,
  BellRing,
  PhoneOff,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  EditableActionCodes,
  useServiceCode,
} from "@/components/editable-action-codes";

/* ---------- shared building blocks (match site style) ---------- */

function CodePill({ code, label = "كود التفعيل" }: { code: string; label?: string }) {
  return (
    <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground">{label}</span>
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
  const code = useServiceCode("you-balance-inquiry", "activate", "*111#");
  return (
    <CardShell title="الاستعلام عن الرصيد ورصيد الباقات" icon={<Wallet className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        استعلم عن رصيدك الأساسي ورصيد الباقات المفعلة (إنترنت، مكالمات، رسائل)
        عبر كود مختصر ومجاني.
      </p>
      <CodePill code={code} label="كود الاستعلام" />
      <EditableActionCodes
        id="you-balance-inquiry"
        activateCode="*111#"
        detailsSlot={
          <DetailsButton title="الاستعلام عن الرصيد ورصيد الباقات">
            <p>
              اطلب الرمز{" "}
              <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>
                {code}
              </bdi>{" "}
              من هاتفك ليعرض لك الرصيد المتاح وباقات المكالمات والرسائل والإنترنت
              المفعلة على خطك.
            </p>
            <p>الخدمة مجانية ومتاحة على مدار الساعة لخطوط الدفع المسبق.</p>
          </DetailsButton>
        }
      />
    </CardShell>
  );
}

/* ---------- 2) Bill inquiry ---------- */

export function YouBillInquiryCard() {
  const code = useServiceCode("you-bill-inquiry", "activate", "*112#");
  return (
    <CardShell title="الاستعلام عن الفاتورة" icon={<ReceiptText className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        اعرف قيمة فاتورتك الحالية وتاريخ استحقاقها لخطوط الفوترة الشهرية من يو.
      </p>
      <CodePill code={code} label="كود الاستعلام" />
      <EditableActionCodes
        id="you-bill-inquiry"
        activateCode="*112#"
        detailsSlot={
          <DetailsButton title="الاستعلام عن الفاتورة">
            <p>
              اطلب الرمز{" "}
              <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>
                {code}
              </bdi>{" "}
              من خط الفوترة لعرض قيمة الفاتورة الحالية والمتأخرات وتاريخ الاستحقاق.
            </p>
            <p>الخدمة مخصصة لمشتركي الدفع الآجل (فوترة) من شركة يو.</p>
          </DetailsButton>
        }
      />
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
            توفر شركة يو مجموعة واسعة من باقات الإنترنت فورجي بأسعار وسعات متنوعة،
            منها: باقات <span className="font-bold">سمارت نت</span> الشهرية، وباقات{" "}
            <span className="font-bold">مكس</span> التي تجمع بين الإنترنت والمكالمات،
            وباقات <span className="font-bold">وفر</span> الاقتصادية.
          </p>
          <p>اضغط "تصفح الباقات" للانتقال إلى تبويب الباقات ومقارنة الخيارات.</p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

/* ---------- 4) Super Kashef — off / out of coverage ---------- */

export function YouSuperKashefOffCard() {
  const act = useServiceCode("you-kashef-off", "activate", "*62#");
  const cancel = useServiceCode("you-kashef-off", "cancel", "##62#");
  return (
    <CardShell
      title="خدمة سوبر كاشف — عند إغلاق الجهاز أو خارج التغطية"
      icon={<BellRing className="h-5 w-5" />}
    >
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        تصلك رسالة SMS بأرقام المتصلين الذين حاولوا الاتصال بك أثناء إغلاق جهازك
        أو خروجه عن التغطية، حتى لا يفوتك أي اتصال مهم.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <CodePill code={act} label="تفعيل" />
        <CodePill code={cancel} label="إلغاء" />
      </div>
      <EditableActionCodes
        id="you-kashef-off"
        activateCode="*62#"
        cancelCode="##62#"
        detailsSlot={
          <DetailsButton title="سوبر كاشف — خارج التغطية">
            <p>
              الخدمة تُبلّغك عبر رسالة نصية بجميع الأرقام التي حاولت الاتصال بك
              أثناء كون جهازك مغلقاً أو خارج نطاق التغطية.
            </p>
            <p>
              للتفعيل اطلب{" "}
              <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>{act}</bdi>{" "}
              وللإلغاء اطلب{" "}
              <bdi dir="ltr" className="font-mono font-bold text-destructive" style={{ unicodeBidi: "isolate" }}>{cancel}</bdi>.
            </p>
          </DetailsButton>
        }
      />
    </CardShell>
  );
}

/* ---------- 5) Super Kashef — busy line ---------- */

export function YouSuperKashefBusyCard() {
  const act = useServiceCode("you-kashef-busy", "activate", "*67#");
  const cancel = useServiceCode("you-kashef-busy", "cancel", "##67#");
  return (
    <CardShell
      title="خدمة سوبر كاشف — عند انشغال الخط"
      icon={<PhoneOff className="h-5 w-5" />}
    >
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        تصلك رسالة SMS بأرقام المتصلين الذين حاولوا الاتصال بك أثناء انشغال خطك
        بمكالمة أخرى.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <CodePill code={act} label="تفعيل" />
        <CodePill code={cancel} label="إلغاء" />
      </div>
      <EditableActionCodes
        id="you-kashef-busy"
        activateCode="*67#"
        cancelCode="##67#"
        detailsSlot={
          <DetailsButton title="سوبر كاشف — انشغال الخط">
            <p>
              الخدمة تُبلّغك عبر رسالة نصية بجميع الأرقام التي حاولت الاتصال بك
              أثناء انشغال خطك بمكالمة أخرى.
            </p>
            <p>
              للتفعيل اطلب{" "}
              <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>{act}</bdi>{" "}
              وللإلغاء اطلب{" "}
              <bdi dir="ltr" className="font-mono font-bold text-destructive" style={{ unicodeBidi: "isolate" }}>{cancel}</bdi>.
            </p>
          </DetailsButton>
        }
      />
    </CardShell>
  );
}
