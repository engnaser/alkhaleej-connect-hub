import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PhoneCall, Contact, Info, Settings2 } from "lucide-react";
import { toast } from "sonner";

export function YouCallOnMeCard() {
  const [phone, setPhone] = useState("");

  const digits = phone.replace(/\D/g, "").slice(0, 9);

  const handleActivate = () => {
    if (digits.length < 7) {
      toast.error("الرجاء إدخال رقم صحيح");
      return;
    }
    window.location.href = `tel:*73${digits}`;
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="text-base font-extrabold text-foreground">
          مكالمتك على حسابي
        </h4>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <PhoneCall className="h-5 w-5" />
        </div>
      </div>

      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
        اتصل بأي مشترك ضمن شبكة YOU على حسابك. سيتلقى المستقبل رسالة صوتية
        وله حرية الموافقة أو الرفض.
      </p>

      <div className="relative">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="tel"
          inputMode="numeric"
          placeholder="أدخل الرقم"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="pr-9 text-center font-mono"
          dir="ltr"
          maxLength={9}
        />
      </div>
      <div className="mt-1 text-xs font-bold text-muted-foreground">
        {digits.length}/9
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button
          onClick={handleActivate}
          className="col-span-1 gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PhoneCall className="h-4 w-4" />
          تفعيل
        </Button>
        <a
          href="tel:*800%23"
          className="col-span-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-bold text-primary hover:bg-primary/20"
        >
          <Settings2 className="h-4 w-4" />
          تحكم
        </a>
        <Dialog>
          <DialogTrigger asChild>
            <button className="col-span-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary">
              <Info className="h-4 w-4" />
              التفاصيل
            </button>
          </DialogTrigger>
          <DialogContent dir="rtl" className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">مكالمتك على حسابي</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm leading-relaxed text-foreground/85">
              <p>
                تمكّنك هذه الخدمة من الاتصال بأي مشترك ضمن شبكة YOU على حسابك،
                وستصل رسالة صوتية للشخص الذي ستكون المكالمة على حسابه محتواها
                "المتصل يطلب أن تكون مكالمته على حسابك"، وله حرية الموافقة أو
                الرفض.
              </p>
              <p>
                للاتصال بالرقم المراد دفع المكالمة على حسابه، اتصل برقمه
                مسبوقاً بالنجمة{" "}
                <bdi dir="ltr" className="font-mono font-bold text-primary">
                  *73XXXXXXX
                </bdi>
                .
              </p>
              <p>
                سيتم خصم قيمة المكالمة من الرصيد الأساسي أو من رصيد الباقة
                للمستقبل.
              </p>
              <p>يمكن استخدام هذه الخدمة مرتين في اليوم.</p>
              <p>
                للتحكم وإدارة الخدمة اطلب الرمز{" "}
                <bdi dir="ltr" className="font-mono font-bold text-primary">
                  *800#
                </bdi>
                .
              </p>
              <p>
                للمزيد حول قوائم الخدمة وشروطها، أرسل "حسابي" إلى{" "}
                <bdi dir="ltr" className="font-mono font-bold text-primary">
                  111
                </bdi>{" "}
                مجاناً.
              </p>
              <p className="text-xs text-muted-foreground">
                هذه الخدمة متاحة لمشتركي الدفع المسبق.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        سيتم فتح تطبيق الاتصال بالكود:{" "}
        <bdi dir="ltr" className="font-mono text-primary">
          *73{digits || "XXXXXXX"}
        </bdi>
      </p>
    </div>
  );
}

export default YouCallOnMeCard;
