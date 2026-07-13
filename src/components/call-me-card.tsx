import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneCall, Contact } from "lucide-react";
import { toast } from "sonner";
import { CardShell, CodePill } from "@/components/you-inquiry-cards";

export function CallMeCard() {
  const [phone, setPhone] = useState("");
  const digits = phone.replace(/\D/g, "");
  const ussd = digits ? `*555*${digits}#` : "*555*رقم#";

  const handleActivate = () => {
    if (!/^\d{6,}$/.test(digits)) {
      toast.error("الرجاء إدخال رقم صحيح");
      return;
    }
    window.location.href = `tel:*555*${digits}%23`;
  };

  return (
    <CardShell title="خدمة اتصل بي" icon={<PhoneCall className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        أرسل تنبيه مجاني إلى رقم آخر ليقوم بالاتصال بك عند نفاد رصيدك. أدخل رقم
        الشخص المطلوب ثم اضغط تفعيل.
      </p>

      <div className="relative mb-3">
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

      <CodePill code={ussd} />

      <Button
        onClick={handleActivate}
        className="mt-auto w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <PhoneCall className="h-4 w-4" />
        تفعيل
      </Button>
    </CardShell>
  );
}

export default CallMeCard;
