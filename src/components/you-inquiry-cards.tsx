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
  PhoneMissed,
  PhoneForwarded,
  PhoneCall,
  Contact,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

/* ---------- 6) Super Kashef — no answer ---------- */

export function YouSuperKashefNoAnswerCard() {
  const act = useServiceCode("you-kashef-noanswer", "activate", "*61#");
  const cancel = useServiceCode("you-kashef-noanswer", "cancel", "##61#");
  return (
    <CardShell
      title="خدمة سوبر كاشف — عند عدم الرد"
      icon={<PhoneMissed className="h-5 w-5" />}
    >
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        تصلك رسالة SMS بأرقام المتصلين الذين حاولوا الاتصال بك ولم ترد على
        اتصالهم، حتى لا يفوتك أي اتصال مهم.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <CodePill code={act} label="تفعيل" />
        <CodePill code={cancel} label="إلغاء" />
      </div>
      <EditableActionCodes
        id="you-kashef-noanswer"
        activateCode="*61#"
        cancelCode="##61#"
        detailsSlot={
          <DetailsButton title="سوبر كاشف — عند عدم الرد">
            <p>
              الخدمة تُبلّغك عبر رسالة نصية بجميع الأرقام التي حاولت الاتصال بك
              ولم يتم الرد عليها.
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

/* ---------- 7) Super Kashef — forward all calls (close/open SIM) ---------- */

export function YouSuperKashefAllCard() {
  const act = useServiceCode("you-kashef-all", "activate", "*21#");
  const cancel = useServiceCode("you-kashef-all", "cancel", "##21#");
  return (
    <CardShell
      title="خدمة سوبر كاشف — تحويل جميع المكالمات (إغلاق وفتح الشريحة)"
      icon={<PhoneForwarded className="h-5 w-5" />}
    >
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        تصلك رسالة SMS بجميع الأرقام التي حاولت الاتصال بك، وتعمل بميزة إغلاق
        وفتح الشريحة تلقائياً لاستقبال الإشعارات.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <CodePill code={act} label="تفعيل" />
        <CodePill code={cancel} label="إلغاء" />
      </div>
      <EditableActionCodes
        id="you-kashef-all"
        activateCode="*21#"
        cancelCode="##21#"
        detailsSlot={
          <DetailsButton title="سوبر كاشف — تحويل جميع المكالمات">
            <p>
              الخدمة تُبلّغك عبر رسالة نصية بجميع الأرقام التي حاولت الاتصال بك
              في مختلف الحالات، وتعتمد على ميزة إغلاق وفتح الشريحة لاستقبال
              الإشعارات المتراكمة.
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

/* ---------- 8) Call forwarding — device off / out of coverage ---------- */

export function YouForwardOffCard() {
  const [phone, setPhone] = useState("");
  const cancelCode = useServiceCode("you-forward-off", "cancel", "##62#");

  const activate = () => {
    const trimmed = phone.trim().replace(/\s|-/g, "");
    if (!/^\d{6,}$/.test(trimmed)) {
      toast.error("يرجى إدخال رقم صحيح لتحويل المكالمات إليه");
      return;
    }
    window.location.href = `tel:*62*${trimmed}%23`;
  };

  return (
    <CardShell
      title="تحويل المكالمات — عند إغلاق الجهاز أو خارج التغطية"
      icon={<PhoneForwarded className="h-5 w-5" />}
    >
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        حوّل المكالمات الواردة إلى رقم آخر تختاره عندما يكون جهازك مغلقاً أو
        خارج نطاق التغطية.
      </p>

      <div className="relative mb-3">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="tel"
          inputMode="tel"
          placeholder="أدخل الرقم المراد التحويل إليه"
          value={phone}
          onChange={(e) => setPhone(e.target.value.slice(0, 9))}
          className="pr-9 text-right"
          dir="ltr"
          maxLength={9}
        />
        <div className="mt-1 text-[11px] text-muted-foreground">{phone.length}/9</div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2">
        <Button
          onClick={activate}
          className="col-span-1 gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PhoneCall className="h-4 w-4" />
          تفعيل
        </Button>
        <a
          href={`tel:${cancelCode.replace(/#/g, "%23")}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-destructive px-3 py-2 text-sm font-bold text-destructive-foreground hover:bg-destructive/90"
        >
          <PhoneOff className="h-4 w-4" />
          إلغاء التفعيل
        </a>
        <DetailsButton title="تحويل المكالمات — إغلاق أو خارج التغطية">
          <p>
            هذه الخدمة تحوّل المكالمات الواردة إلى رقم بديل تختاره عندما يكون
            جهازك مغلقاً أو خارج نطاق التغطية.
          </p>
          <p>
            للتفعيل: أدخل الرقم في الحقل ثم اضغط «تفعيل» ليتم استدعاء الكود{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>*62*الرقم#</bdi>.
          </p>
          <p>
            للإلغاء اطلب{" "}
            <bdi dir="ltr" className="font-mono font-bold text-destructive" style={{ unicodeBidi: "isolate" }}>{cancelCode}</bdi>.
          </p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

/* ---------- Generic call-forwarding-with-number card ---------- */

function ForwardWithNumberCard({
  id,
  title,
  description,
  activatePrefix,
  cancelDefault,
  detailsTitle,
  condition,
}: {
  id: string;
  title: string;
  description: string;
  activatePrefix: string;
  cancelDefault: string;
  detailsTitle: string;
  condition: string;
}) {
  const [phone, setPhone] = useState("");
  const cancelCode = useServiceCode(id, "cancel", cancelDefault);

  const activate = () => {
    const trimmed = phone.trim().replace(/\s|-/g, "");
    if (!/^\d{6,}$/.test(trimmed)) {
      toast.error("يرجى إدخال رقم صحيح لتحويل المكالمات إليه");
      return;
    }
    window.location.href = `tel:${activatePrefix}${trimmed}%23`;
  };

  return (
    <CardShell title={title} icon={<PhoneForwarded className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="relative mb-3">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="tel"
          inputMode="tel"
          placeholder="أدخل الرقم المراد التحويل إليه"
          value={phone}
          onChange={(e) => setPhone(e.target.value.slice(0, 9))}
          className="pr-9 text-right"
          dir="ltr"
          maxLength={9}
        />
        <div className="mt-1 text-[11px] text-muted-foreground">{phone.length}/9</div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2">
        <Button
          onClick={activate}
          className="gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PhoneCall className="h-4 w-4" />
          تفعيل
        </Button>
        <a
          href={`tel:${cancelCode.replace(/#/g, "%23")}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-destructive px-3 py-2 text-sm font-bold text-destructive-foreground hover:bg-destructive/90"
        >
          <PhoneOff className="h-4 w-4" />
          إلغاء التفعيل
        </a>
        <DetailsButton title={detailsTitle}>
          <p>هذه الخدمة تحوّل المكالمات الواردة إلى رقم بديل تختاره {condition}.</p>
          <p>
            للتفعيل: أدخل الرقم في الحقل ثم اضغط «تفعيل» ليتم استدعاء الكود{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>
              {activatePrefix}الرقم#
            </bdi>
            .
          </p>
          <p>
            للإلغاء اطلب{" "}
            <bdi dir="ltr" className="font-mono font-bold text-destructive" style={{ unicodeBidi: "isolate" }}>
              {cancelCode}
            </bdi>
            .
          </p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

export function YouForwardBusyCard() {
  return (
    <ForwardWithNumberCard
      id="you-forward-busy"
      title="تحويل المكالمات — عند انشغال الخط"
      description="حوّل المكالمات الواردة إلى رقم آخر تختاره عندما يكون خطك مشغولاً بمكالمة أخرى."
      activatePrefix="*67*"
      cancelDefault="##67#"
      detailsTitle="تحويل المكالمات — عند انشغال الخط"
      condition="عندما يكون خطك مشغولاً بمكالمة أخرى"
    />
  );
}

export function YouForwardNoAnswerCard() {
  return (
    <ForwardWithNumberCard
      id="you-forward-noanswer"
      title="تحويل المكالمات — عند عدم الرد"
      description="حوّل المكالمات الواردة إلى رقم آخر تختاره عندما لا ترد على الاتصال."
      activatePrefix="*61*"
      cancelDefault="##61#"
      detailsTitle="تحويل المكالمات — عند عدم الرد"
      condition="عندما لا يتم الرد على الاتصال"
    />
  );
}

export function YouForwardAllCard() {
  return (
    <ForwardWithNumberCard
      id="you-forward-all"
      title="تحويل المكالمات — تحويل جميع المكالمات"
      description="حوّل جميع المكالمات الواردة تلقائياً إلى رقم آخر تختاره في كل الحالات."
      activatePrefix="*21*"
      cancelDefault="##21#"
      detailsTitle="تحويل المكالمات — تحويل جميع المكالمات"
      condition="في كل الحالات (يتم تحويل كل مكالمة واردة مباشرة)"
    />
  );
}


