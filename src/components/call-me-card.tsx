import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneCall, Contact } from "lucide-react";
import { toast } from "sonner";

export function CallMeCard() {
  const [phone, setPhone] = useState("");

  const handleActivate = () => {
    const trimmed = phone.trim().replace(/\s|-/g, "");
    if (!trimmed) {
      toast.error("يرجى إدخال رقم الهاتف أولاً");
      return;
    }
    if (!/^\d{6,}$/.test(trimmed)) {
      toast.error("الرجاء إدخال رقم صحيح");
      return;
    }
    window.location.href = `tel:*555*${trimmed}%23`;
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <PhoneCall className="h-5 w-5" />
      </div>
      <h4 className="text-base font-extrabold text-foreground">
        خدمة اتصل بي
      </h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        أرسل تنبيه مجاني إلى رقم آخر ليقوم بالاتصال بك عند نفاد رصيدك. أدخل رقم
        الشخص المطلوب ثم اضغط تفعيل.
      </p>

      <div className="relative mt-4">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="tel"
          inputMode="tel"
          placeholder="أدخل رقم الهاتف هنا..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="pr-9 text-right"
          dir="ltr"
        />
      </div>

      <Button
        onClick={handleActivate}
        className="mt-3 w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <PhoneCall className="h-4 w-4" />
        تفعيل
      </Button>

      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        سيتم فتح تطبيق الاتصال بالكود:{" "}
        <span dir="ltr" className="font-mono text-primary">
          *555*{phone || "رقم"}#
        </span>
      </p>
    </div>
  );
}

export default CallMeCard;
