import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Wallet,
  ReceiptText,
  BellRing,
  PhoneOff,
  PhoneMissed,
  PhoneForwarded,
  Contact,
  Headphones,
  PhoneIncoming,
  Hash,
  User,
  Music2,
  Voicemail,
  Mic,
  Smartphone,
  CreditCard,
  KeyRound,
  Signal,
  Phone,
  Shield,
  ShieldOff,
  ShieldAlert,
  Users,
  Radio,
  Globe,
  Plane,
  Send,
  Wifi,
  Info as InfoIcon,
} from "lucide-react";
import {
  EditableActionCodes,
  useServiceCode,
  CodeRow,
  TemplateRow,
} from "@/components/editable-action-codes";
import {
  CardShell,
  CodePill,
  DetailsButton,
} from "@/components/you-inquiry-cards";

/* ---------- Phone merge helper (placeholder-based, safe by default) ---------- */
// Merges the user's phone into the code only when the admin included a
// placeholder like {n}, [n], <رقم>, or the literal words "الرقم"/"رقم".
// Codes without a placeholder are left untouched — so codes like *111# don't
// get mangled into *111*7XXXXXXXX#.
const PHONE_PLACEHOLDER_RE =
  /\{\s*(?:n|رقم|الرقم)\s*\}|\[\s*(?:n|رقم|الرقم)\s*\]|<\s*(?:رقم|الرقم)\s*>|#(?:رقم|الرقم)#|الرقم|رقم/gi;

export function hasPhonePlaceholder(code: string): boolean {
  PHONE_PLACEHOLDER_RE.lastIndex = 0;
  const has = PHONE_PLACEHOLDER_RE.test(code);
  PHONE_PLACEHOLDER_RE.lastIndex = 0;
  return has;
}

export function mergePhoneIntoCode(rawCode: string, phone: string): string {
  const code = rawCode.trim().replace(/\s+/g, "");
  const num = phone.replace(/\D+/g, "").slice(0, 9);
  PHONE_PLACEHOLDER_RE.lastIndex = 0;
  if (PHONE_PLACEHOLDER_RE.test(code)) {
    PHONE_PLACEHOLDER_RE.lastIndex = 0;
    return num ? code.replace(PHONE_PLACEHOLDER_RE, num) : code;
  }
  return code;
}

function PhoneMergeField({
  phone,
  setPhone,
}: {
  phone: string;
  setPhone: (v: string) => void;
}) {
  const valid = phone.length >= 8;
  return (
    <div
      className={`mb-3 rounded-xl border-2 p-3 ${
        valid
          ? "border-emerald-500/50 bg-emerald-500/5"
          : "border-amber-500/60 bg-amber-500/10"
      }`}
    >
      <label className="mb-1.5 block text-xs font-bold text-foreground">
        ⚠ أدخل رقم جوالك أولاً ليُدمج مع الكود
      </label>
      <div className="relative">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="tel"
          inputMode="numeric"
          placeholder="مثال: 777123456"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D+/g, "").slice(0, 9))
          }
          className="pr-9 text-right font-mono text-base font-bold"
          dir="ltr"
          maxLength={9}
        />
      </div>
      <div className="mt-1 text-[11px] font-semibold">
        {valid ? (
          <span className="text-emerald-600">✓ سيتم الاتصال بالكود بعد دمج رقمك تلقائياً</span>
        ) : (
          <span className="text-amber-700 dark:text-amber-500">
            {phone.length}/9 — أكمل إدخال الرقم ثم اضغط «تفعيل»
          </span>
        )}
      </div>
    </div>
  );
}




/* ---------- Small reusable factories ---------- */

function SimpleCard({
  id,
  title,
  icon,
  description,
  defaultCode,
  label = "كود التفعيل",
  detailsTitle,
  detailsBody,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  defaultCode: string;
  label?: string;
  detailsTitle?: string;
  detailsBody?: React.ReactNode;
}) {
  const code = useServiceCode(id, "activate", defaultCode);
  const [phone, setPhone] = useState("");
  const showPhoneField = hasPhonePlaceholder(code);
  const phoneReady = phone.length >= 8;
  const displayCode = showPhoneField ? mergePhoneIntoCode(code, phone) : code;
  const transformFn = showPhoneField
    ? (c: string) => (phoneReady ? mergePhoneIntoCode(c, phone) : "")
    : undefined;
  return (
    <CardShell title={title} icon={icon}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {showPhoneField && <PhoneMergeField phone={phone} setPhone={setPhone} />}
      <CodePill code={displayCode} label={label} />
      <EditableActionCodes
        id={id}
        activateCode={defaultCode}
        transformActivate={transformFn}
        onActivateClick={
          showPhoneField && !phoneReady
            ? (e) => {
                e.preventDefault();
                toast.error("أدخل رقم جوالك أولاً في الحقل أعلى الكود");
              }
            : undefined
        }
        detailsSlot={
          <DetailsButton title={detailsTitle ?? title}>
            {detailsBody ?? (
              <p>
                اطلب الرمز{" "}
                <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>
                  {displayCode}
                </bdi>{" "}
                من هاتفك لاستخدام الخدمة.
              </p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              نصيحة للمسؤول: أضف {"{n}"} أو كلمة «الرقم» داخل الكود لتفعيل خانة الرقم ودمجه تلقائياً.
            </p>
          </DetailsButton>
        }
      />
    </CardShell>
  );
}


function ActCancelCard({
  id,
  title,
  icon,
  description,
  activateCode,
  cancelCode,
  detailsTitle,
  detailsBody,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  activateCode: string;
  cancelCode: string;
  detailsTitle?: string;
  detailsBody?: React.ReactNode;
}) {
  const act = useServiceCode(id, "activate", activateCode);
  const cancel = useServiceCode(id, "cancel", cancelCode);
  const [phone, setPhone] = useState("");
  const showPhoneField = hasPhonePlaceholder(act);
  const actDisplay = showPhoneField ? mergePhoneIntoCode(act, phone) : act;
  return (
    <CardShell title={title} icon={icon}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <CodePill code={actDisplay} label="تفعيل" />
        <CodePill code={cancel} label="إلغاء" />
      </div>
      {showPhoneField && <PhoneMergeField phone={phone} setPhone={setPhone} />}
      <EditableActionCodes
        id={id}
        activateCode={activateCode}
        cancelCode={cancelCode}
        transformActivate={(c) => mergePhoneIntoCode(c, phone)}
        detailsSlot={
          <DetailsButton title={detailsTitle ?? title}>
            {detailsBody ?? (
              <p>
                للتفعيل اطلب{" "}
                <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>{actDisplay}</bdi>{" "}
                وللإلغاء اطلب{" "}
                <bdi dir="ltr" className="font-mono font-bold text-destructive" style={{ unicodeBidi: "isolate" }}>{cancel}</bdi>.
              </p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              نصيحة للمسؤول: أضف {"{n}"} داخل كود التفعيل لتفعيل خانة الرقم.
            </p>
          </DetailsButton>
        }
      />
    </CardShell>
  );
}


function PhoneInputCard({
  id,
  title,
  icon,
  description,
  template,
  cancelCode,
  hasCancel = true,
  detailsTitle,
  placeholder = "أدخل الرقم",
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  template: string; // e.g. "*62*{n}#"
  cancelCode?: string;
  hasCancel?: boolean;
  detailsTitle?: string;
  placeholder?: string;
}) {
  const [phone, setPhone] = useState("");
  const trimmed = phone.trim().replace(/\s|-/g, "");
  const validN = /^\d{6,}$/.test(trimmed) ? trimmed : "";
  return (
    <CardShell title={title} icon={icon}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="relative mb-3">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="tel"
          inputMode="tel"
          placeholder={placeholder}
          value={phone}
          onChange={(e) => setPhone(e.target.value.slice(0, 9))}
          className="pr-9 text-right"
          dir="ltr"
          maxLength={9}
        />
        <div className="mt-1 text-[11px] text-muted-foreground">{phone.length}/9</div>
      </div>
      <div className={`mt-auto grid gap-2 ${hasCancel ? "grid-cols-3" : "grid-cols-2"}`}>
        <TemplateRow id={id} defaultTemplate={template} values={{ n: validN }} />
        {hasCancel && cancelCode && (
          <CodeRow id={id} kind="cancel" defaultCode={cancelCode} />
        )}
        <DetailsButton title={detailsTitle ?? title}>
          <p>{description}</p>
          <p>
            للتفعيل: أدخل الرقم ثم اضغط «تفعيل» ليتم استدعاء{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>
              {template.replace("{n}", "الرقم")}
            </bdi>
            .
          </p>
          {hasCancel && cancelCode && (
            <p>
              للإلغاء اطلب{" "}
              <bdi dir="ltr" className="font-mono font-bold text-destructive" style={{ unicodeBidi: "isolate" }}>{cancelCode}</bdi>.
            </p>
          )}
        </DetailsButton>
      </div>
    </CardShell>
  );
}

/* ============================================================
   Sabafon Service Cards — same design as YOU
   ============================================================ */

// 1. Call Me
export function SabafonCallMeCard() {
  return (
    <PhoneInputCard
      id="sabafon-call-me"
      title="خدمة اتصل بي"
      icon={<Phone className="h-5 w-5" />}
      description="أرسل طلب اتصال مجاني إلى رقم آخر ليتصل بك."
      template="*140*{n}#"
      hasCancel={false}
    />
  );
}

// 2. Call on my account
export function SabafonCallOnMeCard() {
  return (
    <PhoneInputCard
      id="sabafon-call-on-me"
      title="خدمة اتصل على حسابي"
      icon={<PhoneIncoming className="h-5 w-5" />}
      description="اطلب من الآخرين الاتصال بك على حسابك الخاص من رصيدك."
      template="*141*{n}#"
      hasCancel={false}
    />
  );
}

// 3. Salifni
export function SabafonSalifniCard() {
  return (
    <SimpleCard
      id="sabafon-salifni"
      title="خدمة سلفني"
      icon={<Wallet className="h-5 w-5" />}
      description="احصل على سلفة رصيد عندما ينخفض رصيدك، ويتم استرداد المبلغ من أول عملية شحن."
      defaultCode="*141#"
    />
  );
}

// 4. Balance Transfer (phone + amount + pin)
export function SabafonBalanceTransferCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const trimmed = phone.trim().replace(/\s|-/g, "");
  const validN = /^\d{6,}$/.test(trimmed) ? trimmed : "";
  const validAmt = /^\d+$/.test(amount.trim()) ? amount.trim() : "";
  const validPin = /^\d+$/.test(pin.trim()) ? pin.trim() : "";
  return (
    <CardShell title="خدمة تحويل الرصيد" icon={<Send className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        حوّل جزءاً من رصيدك إلى رقم سبافون آخر باستخدام رقمك ومبلغ التحويل والرمز السري.
      </p>
      <div className="relative mb-2">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="tel" placeholder="أدخل الرقم" value={phone} onChange={(e) => setPhone(e.target.value.slice(0, 9))} className="pr-9 text-right" dir="ltr" maxLength={9} />
      </div>
      <Input type="number" placeholder="أدخل المبلغ" value={amount} onChange={(e) => setAmount(e.target.value)} className="mb-2 text-right" dir="ltr" />
      <Input type="password" placeholder="أدخل الرمز السري" value={pin} onChange={(e) => setPin(e.target.value)} className="mb-3 text-right" dir="ltr" />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <TemplateRow
          id="sabafon-balance-transfer"
          defaultTemplate="*142*{n}*{a}*{p}#"
          values={{ n: validN, a: validAmt, p: validPin }}
        />
        <DetailsButton title="تحويل الرصيد">
          <p>أدخل رقم المستفيد والمبلغ والرمز السري ثم اضغط «تفعيل».</p>
          <p>الصيغة: <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>*142*الرقم*المبلغ*الرمز#</bdi></p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

// 5. Balance inquiry
export function SabafonBalanceInquiryCard() {
  return (
    <SimpleCard
      id="sabafon-balance-inquiry"
      title="خدمة الاستعلام عن الرصيد"
      icon={<Wallet className="h-5 w-5" />}
      description="اعرف رصيدك الأساسي بسرعة عبر كود مختصر ومجاني."
      defaultCode="*111#"
      label="كود الاستعلام"
    />
  );
}

// 6. Package balance inquiry
export function SabafonPackageBalanceInquiryCard() {
  return (
    <SimpleCard
      id="sabafon-package-balance"
      title="خدمة الاستعلام عن رصيد الباقات"
      icon={<Wallet className="h-5 w-5" />}
      description="استعلم عن رصيد باقات المكالمات والرسائل والإنترنت المفعّلة على خطك."
      defaultCode="*111*1#"
      label="كود الاستعلام"
    />
  );
}

// 7. Bill inquiry
export function SabafonBillInquiryCard() {
  return (
    <SimpleCard
      id="sabafon-bill-inquiry"
      title="خدمة الاستعلام عن الفاتورة"
      icon={<ReceiptText className="h-5 w-5" />}
      description="اعرف قيمة فاتورتك وتاريخ استحقاقها لخطوط الفوترة الشهرية من سبافون."
      defaultCode="*112#"
      label="كود الاستعلام"
    />
  );
}

// 8. Forgi balance inquiry
export function SabafonForgiBalanceCard() {
  return (
    <SimpleCard
      id="sabafon-forgi-balance"
      title="خدمة الاستعلام عن رصيد فورجي"
      icon={<Wifi className="h-5 w-5" />}
      description="استعلم عن رصيد باقات فورجي (4G) المفعّلة على خطك."
      defaultCode="*150#"
      label="كود الاستعلام"
    />
  );
}

// 9-12. Super Kashef (4 variants)
export function SabafonKashefOffCard() {
  return (
    <ActCancelCard
      id="sabafon-kashef-off"
      title="الكاشف المحترف — مقفل أو خارج نطاق التغطية"
      icon={<BellRing className="h-5 w-5" />}
      description="تصلك رسالة SMS بأرقام من حاول الاتصال بك أثناء إغلاق جهازك أو خروجه عن التغطية."
      activateCode="*62#"
      cancelCode="##62#"
    />
  );
}
export function SabafonKashefBusyCard() {
  return (
    <ActCancelCard
      id="sabafon-kashef-busy"
      title="الكاشف المحترف — في حالة انشغال الخط"
      icon={<PhoneOff className="h-5 w-5" />}
      description="تصلك رسالة SMS بأرقام من حاول الاتصال بك أثناء انشغال خطك."
      activateCode="*67#"
      cancelCode="##67#"
    />
  );
}
export function SabafonKashefNoAnswerCard() {
  return (
    <ActCancelCard
      id="sabafon-kashef-noanswer"
      title="الكاشف المحترف — في حالة عدم الإجابة"
      icon={<PhoneMissed className="h-5 w-5" />}
      description="تصلك رسالة SMS بأرقام من حاول الاتصال بك ولم يتم الرد."
      activateCode="*61#"
      cancelCode="##61#"
    />
  );
}
export function SabafonKashefAllCard() {
  return (
    <ActCancelCard
      id="sabafon-kashef-all"
      title="الكاشف المحترف — تحويل جميع المكالمات (إغلاق وفتح الشريحة)"
      icon={<PhoneForwarded className="h-5 w-5" />}
      description="تصلك رسالة SMS بجميع الأرقام التي حاولت الاتصال بك بميزة إغلاق وفتح الشريحة."
      activateCode="*21#"
      cancelCode="##21#"
    />
  );
}

// 13-16. Call Forwarding (4 variants) with phone input
export function SabafonForwardOffCard() {
  return (
    <PhoneInputCard
      id="sabafon-forward-off"
      title="تحويل المكالمات — في حالة الخروج عن التغطية أو إغلاق الهاتف"
      icon={<PhoneForwarded className="h-5 w-5" />}
      description="حوّل المكالمات الواردة إلى رقم آخر عند إغلاق الجهاز أو الخروج عن التغطية."
      template="*62*{n}#"
      cancelCode="##62#"
    />
  );
}
export function SabafonForwardBusyCard() {
  return (
    <PhoneInputCard
      id="sabafon-forward-busy"
      title="تحويل المكالمات — في حالة إنشغال الخط"
      icon={<PhoneForwarded className="h-5 w-5" />}
      description="حوّل المكالمات الواردة إلى رقم آخر عندما يكون خطك مشغولاً."
      template="*67*{n}#"
      cancelCode="##67#"
    />
  );
}
export function SabafonForwardNoAnswerCard() {
  return (
    <PhoneInputCard
      id="sabafon-forward-noanswer"
      title="تحويل المكالمات — في حالة عدم الإجابة"
      icon={<PhoneForwarded className="h-5 w-5" />}
      description="حوّل المكالمات الواردة إلى رقم آخر عند عدم الرد."
      template="*61*{n}#"
      cancelCode="##61#"
    />
  );
}
export function SabafonForwardAllCard() {
  return (
    <PhoneInputCard
      id="sabafon-forward-all"
      title="تحويل المكالمات — تحويل جميع المكالمات"
      icon={<PhoneForwarded className="h-5 w-5" />}
      description="حوّل جميع المكالمات الواردة تلقائياً إلى رقم آخر تختاره."
      template="*21*{n}#"
      cancelCode="##21#"
    />
  );
}

// 17. Customer Care
export function SabafonCustomerCareCard() {
  return (
    <SimpleCard
      id="sabafon-customer-care"
      title="خدمة العملاء"
      icon={<Headphones className="h-5 w-5" />}
      description="تواصل مع مركز خدمة عملاء شركة سبافون للاستفسار والشكاوى."
      defaultCode="123"
      label="اتصال بخدمة العملاء"
    />
  );
}

// 18. Call Waiting
export function SabafonCallWaitingCard() {
  return (
    <ActCancelCard
      id="sabafon-call-waiting"
      title="وضع المكالمات في الانتظار"
      icon={<PhoneIncoming className="h-5 w-5" />}
      description="فعّل خدمة الانتظار لاستقبال مكالمة جديدة أثناء انشغالك بأخرى."
      activateCode="*43#"
      cancelCode="#43#"
    />
  );
}

// 19. Know your number
export function SabafonKnowMyNumberCard() {
  return (
    <SimpleCard
      id="sabafon-know-number"
      title="للاستعلام عن رقمك"
      icon={<Hash className="h-5 w-5" />}
      description="اعرف رقم خطك من سبافون بسرعة عبر كود مختصر ومجاني."
      defaultCode="*888#"
      label="كود عرض الرقم"
    />
  );
}

// 20. Change PIN (old + new)
export function SabafonChangePinCard() {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  return (
    <CardShell title="تغيير الرمز السري" icon={<KeyRound className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        غيّر الرمز السري (PIN) لبطاقتك بإدخال الرمز القديم ثم الجديد.
      </p>
      <Input type="password" placeholder="أدخل الرمز السري القديم" value={oldPin} onChange={(e) => setOldPin(e.target.value)} className="mb-2 text-right" dir="ltr" />
      <Input type="password" placeholder="أدخل الرمز السري الجديد" value={newPin} onChange={(e) => setNewPin(e.target.value)} className="mb-3 text-right" dir="ltr" />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <TemplateRow
          id="sabafon-change-pin"
          defaultTemplate="**04*{a}*{b}*{b}#"
          values={{ a: oldPin.trim(), b: newPin.trim() }}
        />
        <DetailsButton title="تغيير الرمز السري">
          <p>الصيغة: <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>**04*القديم*الجديد*الجديد#</bdi></p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

// 21. Ringtone
export function SabafonRingtoneCard() {
  return (
    <SimpleCard
      id="sabafon-ringtone"
      title="خدمة رنتي"
      icon={<Music2 className="h-5 w-5" />}
      description="اختر نغمة رنين مميزة يسمعها من يتصل بك بدلاً من نغمة الرنين الاعتيادية."
      defaultCode="900"
      label="رقم الاشتراك"
    />
  );
}

// 22. Mawjood (I'm here)
export function SabafonMawjoodCard() {
  return (
    <ActCancelCard
      id="sabafon-mawjood"
      title="خدمة موجود"
      icon={<Signal className="h-5 w-5" />}
      description="أعلم الآخرين أنك متاح الآن بعد أن كنت خارج التغطية أو مغلق الجهاز."
      activateCode="*56#"
      cancelCode="##56#"
    />
  );
}

// 23. Privacy mode
export function SabafonPrivacyCard() {
  return (
    <ActCancelCard
      id="sabafon-privacy"
      title="وضع الخصوصية"
      icon={<Shield className="h-5 w-5" />}
      description="تحكّم في إظهار أو إخفاء رقمك عند إجراء المكالمات الصادرة."
      activateCode="*31#"
      cancelCode="#31#"
    />
  );
}

// 24. Forgi service details
export function SabafonForgiDetailsCard() {
  return (
    <SimpleCard
      id="sabafon-forgi-details"
      title="تفاصيل خدمة الفورجي"
      icon={<Wifi className="h-5 w-5" />}
      description="اعرف تفاصيل باقات وخدمات فورجي (4G) من سبافون."
      defaultCode="*150#"
      label="كود التفاصيل"
    />
  );
}

// 25. New SIM number
export function SabafonNewSimNumberCard() {
  return (
    <SimpleCard
      id="sabafon-new-sim-number"
      title="معرفة رقم شريحتك"
      icon={<Smartphone className="h-5 w-5" />}
      description="اعرف رقم شريحتك الجديدة من سبافون بسرعة عبر كود مختصر."
      defaultCode="*888#"
      label="كود عرض الرقم"
    />
  );
}

// 26. Voice mail
export function SabafonVoiceMailCard() {
  return (
    <SimpleCard
      id="sabafon-voicemail"
      title="خدمة البريد الصوتي العادي"
      icon={<Mic className="h-5 w-5" />}
      description="خدمة البريد الصوتي تتيح للمتصلين ترك رسالة صوتية عند عدم قدرتك على الرد."
      defaultCode="121"
      label="التحكم / الاستماع"
    />
  );
}

// 27. Combined kashef - all forwarding cases
export function SabafonKashefCombinedCard() {
  return (
    <ActCancelCard
      id="sabafon-kashef-combined"
      title="الكاشف المحترف — لتفعيل جميع حالات التحويل مجتمعة في نفس الوقت"
      icon={<BellRing className="h-5 w-5" />}
      description="فعّل جميع حالات الكاشف (إغلاق، انشغال، عدم رد) دفعة واحدة."
      activateCode="*004#"
      cancelCode="##004#"
    />
  );
}

// 28. Block all incoming
export function SabafonBlockAllIncomingCard() {
  return (
    <ActCancelCard
      id="sabafon-block-all-in"
      title="حجب جميع المكالمات الواردة"
      icon={<ShieldOff className="h-5 w-5" />}
      description="امنع استقبال جميع المكالمات الواردة إلى خطك."
      activateCode="*35*0000#"
      cancelCode="#35*0000#"
    />
  );
}

// 29. Block all outgoing
export function SabafonBlockAllOutgoingCard() {
  return (
    <ActCancelCard
      id="sabafon-block-all-out"
      title="حجب جميع المكالمات الصادرة"
      icon={<ShieldOff className="h-5 w-5" />}
      description="امنع إجراء أي مكالمات صادرة من خطك."
      activateCode="*33*0000#"
      cancelCode="#33*0000#"
    />
  );
}

// 30. Block international outgoing
export function SabafonBlockIntlOutgoingCard() {
  return (
    <ActCancelCard
      id="sabafon-block-intl-out"
      title="حجب المكالمات الدولية الصادرة"
      icon={<ShieldAlert className="h-5 w-5" />}
      description="امنع إجراء المكالمات الدولية الصادرة من خطك."
      activateCode="*331*0000#"
      cancelCode="#331*0000#"
    />
  );
}

// 31. Block outgoing while roaming (except Yemen)
export function SabafonBlockOutRoamingCard() {
  return (
    <ActCancelCard
      id="sabafon-block-out-roam"
      title="حجب المكالمات الصادرة أثناء التجوال باستثناء اليمن"
      icon={<ShieldAlert className="h-5 w-5" />}
      description="امنع إجراء المكالمات الصادرة أثناء التجوال، باستثناء اليمن."
      activateCode="*332*0000#"
      cancelCode="#332*0000#"
    />
  );
}

// 32. Block incoming while roaming
export function SabafonBlockInRoamingCard() {
  return (
    <ActCancelCard
      id="sabafon-block-in-roam"
      title="حجب المكالمات الواردة أثناء التجوال"
      icon={<ShieldAlert className="h-5 w-5" />}
      description="امنع استقبال المكالمات الواردة أثناء تواجدك في التجوال."
      activateCode="*351*0000#"
      cancelCode="#351*0000#"
    />
  );
}

// 33. Cancel all blocks
export function SabafonCancelAllBlocksCard() {
  return (
    <SimpleCard
      id="sabafon-cancel-all-blocks"
      title="إلغاء جميع حالات الحجب"
      icon={<Shield className="h-5 w-5" />}
      description="ألغِ جميع حالات حجب المكالمات المفعّلة على خطك دفعة واحدة."
      defaultCode="#330*0000#"
      label="كود الإلغاء"
    />
  );
}

// 34. Multi-party call
export function SabafonMultiPartyCard() {
  return (
    <SimpleCard
      id="sabafon-multi-party"
      title="الإتصال المتعدد الأطراف"
      icon={<Users className="h-5 w-5" />}
      description="أجرِ مكالمة جماعية بعدة أطراف في نفس الوقت."
      defaultCode="*43#"
      label="كود التفعيل"
    />
  );
}

// 35. Saba Control (parental)
export function SabafonSabaControlCard() {
  return (
    <SimpleCard
      id="sabafon-saba-control"
      title="خدمة سبأ كنترول"
      icon={<Shield className="h-5 w-5" />}
      description="خدمة الرقابة الأبوية للتحكم في المحتوى والمكالمات على الخط."
      defaultCode="*585#"
      label="كود التفعيل"
    />
  );
}

// 36. Pay Bill (phone + units + pin)
export function SabafonPayBillCard() {
  const [phone, setPhone] = useState("");
  const [units, setUnits] = useState("");
  const [pin, setPin] = useState("");
  const trimmed = phone.trim().replace(/\s|-/g, "");
  const validN = /^\d{6,}$/.test(trimmed) ? trimmed : "";
  return (
    <CardShell title="تسديد الفاتورة" icon={<CreditCard className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        سدّد فاتورة خط سبافون من رصيدك بإدخال الرقم وعدد الوحدات والرمز السري.
      </p>
      <div className="relative mb-2">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="tel" placeholder="أدخل الرقم" value={phone} onChange={(e) => setPhone(e.target.value.slice(0, 9))} className="pr-9 text-right" dir="ltr" maxLength={9} />
      </div>
      <Input type="number" placeholder="عدد الوحدات" value={units} onChange={(e) => setUnits(e.target.value)} className="mb-2 text-right" dir="ltr" />
      <Input type="password" placeholder="أدخل الرمز السري" value={pin} onChange={(e) => setPin(e.target.value)} className="mb-3 text-right" dir="ltr" />
      <div className="mt-auto grid grid-cols-2 gap-2">
        <TemplateRow
          id="sabafon-pay-bill"
          defaultTemplate="*143*{n}*{u}*{p}#"
          values={{ n: validN, u: units.trim(), p: pin.trim() }}
        />
        <DetailsButton title="تسديد الفاتورة">
          <p>الصيغة: <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>*143*الرقم*الوحدات*الرمز#</bdi></p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

// 37. Radiophone
export function SabafonRadiophoneCard() {
  return (
    <SimpleCard
      id="sabafon-radiophone"
      title="راديوفون"
      icon={<Radio className="h-5 w-5" />}
      description="خدمة الاستماع للراديو والقنوات الصوتية عبر خط سبافون."
      defaultCode="*330#"
      label="كود التفعيل"
    />
  );
}

// 38. Intl roaming — postpaid
export function SabafonRoamingPostpaidCard() {
  return (
    <ActCancelCard
      id="sabafon-roaming-postpaid"
      title="التجوال الدولي فوترة"
      icon={<Plane className="h-5 w-5" />}
      description="خدمة التجوال الدولي المخصّصة لمشتركي نظام الفوترة."
      activateCode="*145*11#"
      cancelCode="*145*22#"
    />
  );
}

// 39. Smart Roaming — postpaid
export function SabafonSmartRoamingPostpaidCard() {
  return (
    <SimpleCard
      id="sabafon-smart-roaming-postpaid"
      title="التجوال الذكي فوترة"
      icon={<Globe className="h-5 w-5" />}
      description="باقات التجوال الذكية لمشتركي الفوترة بأسعار مخفضة."
      defaultCode="*145*13#"
      label="كود التفعيل"
    />
  );
}

// 40. SMS roaming — postpaid
export function SabafonSmsRoamingPostpaidCard() {
  return (
    <ActCancelCard
      id="sabafon-sms-roaming-postpaid"
      title="تجوال الرسائل فوترة"
      icon={<Send className="h-5 w-5" />}
      description="خدمة إرسال الرسائل النصية أثناء التجوال لمشتركي الفوترة."
      activateCode="*145*14#"
      cancelCode="*145*24#"
    />
  );
}

// 41. Intl roaming — prepaid
export function SabafonRoamingPrepaidCard() {
  return (
    <SimpleCard
      id="sabafon-roaming-prepaid"
      title="التجوال الدولي دفع مسبق"
      icon={<Plane className="h-5 w-5" />}
      description="خدمة التجوال الدولي لمشتركي الدفع المسبق — تُخصم من رصيدك مباشرة."
      defaultCode="*145*12#"
      label="كود التفعيل"
    />
  );
}
