import { useState } from "react";
import { Contact, Wand2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function YouBalanceTransferCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const digits = phone.replace(/\D/g, "").slice(0, 9);
  const amt = amount.replace(/\D/g, "").slice(0, 6);
  const ready = digits.length === 9 && amt.length > 0;
  const ussd = ready ? `*201*${digits}*${amt}#` : "";

  return (
    <div
      dir="rtl"
      className="rounded-3xl border-[3px] border-[#F4B942] bg-[#BFE1F2] p-5 shadow-[var(--shadow-card)]"
    >
      <h3 className="mb-4 text-center text-lg font-black text-foreground">
        خدمة تحويل الرصيد
      </h3>

      {/* Phone input */}
      <div className="relative">
        <div className="flex items-center gap-3 rounded-full border-[3px] border-[#F4B942] bg-white px-4 py-3">
          <span className="grid h-8 w-10 shrink-0 place-items-center rounded-md bg-foreground text-white">
            <Contact className="h-4 w-4" />
          </span>
          <input
            dir="rtl"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="أدخـل الـرقم"
            className="flex-1 bg-transparent text-center text-base font-bold text-foreground outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <div className="mt-1 pr-3 text-xs font-bold text-muted-foreground">
          {digits.length}/9
        </div>
      </div>

      {/* Amount input */}
      <div className="relative mt-2">
        <label className="absolute -top-2.5 right-4 z-10 bg-[#BFE1F2] px-2 text-xs font-bold text-foreground">
          المبلغ
        </label>
        <div className="flex items-center gap-3 rounded-2xl border-[3px] border-[#F4B942] bg-transparent px-4 py-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-foreground">
            <Wand2 className="h-4 w-4" />
          </span>
          <input
            dir="ltr"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-transparent text-left text-base font-bold text-foreground outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <a
          href={ready ? `tel:${encodeURIComponent(ussd)}` : undefined}
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-black text-foreground shadow-md transition-transform ${
            ready
              ? "bg-[#F4B942] hover:scale-[1.02]"
              : "cursor-not-allowed bg-[#F4B942]/60"
          }`}
        >
          تفعيل
        </a>
        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-full bg-[#F4B942] px-6 py-3 text-sm font-black text-foreground shadow-md transition-transform hover:scale-[1.02]">
              التفاصيل
            </button>
          </DialogTrigger>
          <DialogContent dir="rtl" className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">خدمة تحويل الرصيد — يو</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm leading-relaxed text-foreground">
              <p>
                تتيح لك خدمة تحويل الرصيد إرسال جزء من رصيدك إلى أي مشترك آخر في
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
