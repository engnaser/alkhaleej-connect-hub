import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PhoneCall, Info, ArrowLeftRight } from "lucide-react";

export function YouBalanceTransferCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const digits = phone.replace(/\D/g, "").slice(0, 9);
  const amt = amount.replace(/\D/g, "").slice(0, 6);
  const ready = digits.length === 9 && amt.length > 0;
  const ussd = ready ? `*201*${digits}*${amt}#` : "";
  const activateHref = ready ? `tel:${encodeURIComponent(ussd)}` : undefined;

  return (
    <div
      dir="rtl"
      className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="text-base font-extrabold text-foreground">
          خدمة تحويل الرصيد
        </h4>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <ArrowLeftRight className="h-5 w-5" />
        </div>
      </div>

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

      <div className="mb-4 space-y-2">
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

      <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-muted-foreground">كود التفعيل</span>
          <bdi
            dir="ltr"
            className="font-mono text-sm font-black text-primary"
            style={{ unicodeBidi: "isolate" }}
          >
            {ussd || "*201*رقم*المبلغ#"}
          </bdi>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2">
        <a
          href={activateHref}
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-primary-foreground ${
            ready
              ? "bg-primary hover:bg-primary/90"
              : "cursor-not-allowed bg-primary/50"
          }`}
        >
          <PhoneCall className="h-4 w-4" />
          تفعيل
        </a>
        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary">
              <Info className="h-4 w-4" />
              التفاصيل
            </button>
          </DialogTrigger>
          <DialogContent dir="rtl" className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">
                خدمة تحويل الرصيد — يو
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm leading-relaxed text-foreground/85">
              <p>
                تُمكّنك خدمة تحويل الرصيد من إرسال جزء من رصيدك إلى أي مشترك آخر
                في شبكة يو بكل سهولة.
              </p>
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <p className="font-bold">طريقة الاستخدام:</p>
                <ol className="mt-2 list-decimal space-y-1 pr-5 text-muted-foreground">
                  <li>أدخل رقم المستفيد (9 أرقام).</li>
                  <li>أدخل المبلغ المراد تحويله.</li>
                  <li>اضغط زر «تفعيل» لإتمام العملية.</li>
                </ol>
              </div>
              <div className="rounded-xl border border-border bg-background p-3">
                <p className="font-bold">صيغة الكود:</p>
                <bdi dir="ltr" className="mt-1 block font-mono text-primary">
                  *201*رقم_المستفيد*المبلغ#
                </bdi>
              </div>
              <p className="text-xs text-muted-foreground">
                * قد تُطبَّق رسوم بسيطة على عملية التحويل حسب سياسة الشركة.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default YouBalanceTransferCard;
