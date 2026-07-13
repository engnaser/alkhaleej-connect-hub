import { useState } from "react";
import { PhoneCall, ArrowLeftRight } from "lucide-react";
import { CardShell, CodePill, DetailsButton } from "@/components/you-inquiry-cards";

export function YouBalanceTransferCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const digits = phone.replace(/\D/g, "").slice(0, 9);
  const amt = amount.replace(/\D/g, "").slice(0, 6);
  const ready = digits.length === 9 && amt.length > 0;
  const ussd = ready ? `*201*${digits}*${amt}#` : "*201*رقم*المبلغ#";
  const activateHref = ready ? `tel:${encodeURIComponent(`*201*${digits}*${amt}#`)}` : undefined;

  return (
    <CardShell title="خدمة تحويل الرصيد" icon={<ArrowLeftRight className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        حوّل جزءاً من رصيدك بسهولة إلى أي مشترك آخر في شبكة يو.
      </p>

      <div className="mb-3 space-y-2">
        <label className="block text-xs font-bold text-muted-foreground">
          رقم المستفيد
          <span className="mx-2 text-primary">({digits.length}/9)</span>
        </label>
        <input
          dir="ltr"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="7XXXXXXXX"
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground outline-none focus:border-primary"
        />
      </div>

      <div className="mb-3 space-y-2">
        <label className="block text-xs font-bold text-muted-foreground">
          المبلغ
        </label>
        <input
          dir="ltr"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100"
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground outline-none focus:border-primary"
        />
      </div>

      <CodePill code={ussd} />

      <div className="mt-auto grid grid-cols-2 gap-2">
        <a
          href={activateHref}
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-primary-foreground ${
            ready ? "bg-primary hover:bg-primary/90" : "cursor-not-allowed bg-primary/50"
          }`}
        >
          <PhoneCall className="h-4 w-4" />
          تفعيل
        </a>
        <DetailsButton title="خدمة تحويل الرصيد — يو">
          <p>
            تُمكّنك خدمة تحويل الرصيد من إرسال جزء من رصيدك إلى أي مشترك آخر في
            شبكة يو بكل سهولة.
          </p>
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="font-bold">طريقة الاستخدام:</p>
            <ol className="mt-2 list-decimal space-y-1 pr-5 text-muted-foreground">
              <li>أدخل رقم المستفيد (9 أرقام).</li>
              <li>أدخل المبلغ المراد تحويله.</li>
              <li>اضغط زر «تفعيل» لإتمام العملية.</li>
            </ol>
          </div>
          <p className="text-xs text-muted-foreground">
            * قد تُطبَّق رسوم بسيطة على عملية التحويل حسب سياسة الشركة.
          </p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

export default YouBalanceTransferCard;
