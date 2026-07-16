import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PhoneCall, Contact } from "lucide-react";
import { CardShell, CodePill } from "@/components/you-inquiry-cards";
import { TemplateRow } from "@/components/editable-action-codes";

export function CallMeCard() {
  const [phone, setPhone] = useState("");
  const digits = phone.replace(/\D/g, "");
  const ussd = digits ? `*555*${digits}#` : "*555*رقم#";

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

      <div className="mt-auto">
        <TemplateRow
          id="you-call-me"
          defaultTemplate="*555*{n}#"
          values={{ n: digits }}
        />
      </div>
    </CardShell>
  );
}

export default CallMeCard;
