import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PhoneCall, Contact } from "lucide-react";
import { CardShell, CodePill, DetailsButton } from "@/components/you-inquiry-cards";
import { TemplateRow, CodeRow } from "@/components/editable-action-codes";

export function YouCallOnMeCard() {
  const [phone, setPhone] = useState("");
  const digits = phone.replace(/\D/g, "").slice(0, 9);
  const ussd = digits ? `*73${digits}` : "*73XXXXXXX";

  return (
    <CardShell title="مكالمتك على حسابي" icon={<PhoneCall className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        اتصل بأي مشترك ضمن شبكة YOU على حسابك. سيتلقى المستقبل رسالة صوتية
        وله حرية الموافقة أو الرفض.
      </p>

      <div className="relative mb-3">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="tel"
          inputMode="numeric"
          placeholder="أدخل الرقم (9 أرقام)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="pr-9 text-right"
          dir="ltr"
          maxLength={9}
        />
      </div>

      <CodePill code={ussd} />

      <div className="mt-auto grid grid-cols-3 gap-2">
        <TemplateRow
          id="you-call-on-me"
          defaultTemplate="*73{n}"
          values={{ n: digits }}
        />
        <CodeRow id="you-call-on-me-control" kind="cancel" defaultCode="*800#" />
        <DetailsButton title="مكالمتك على حسابي">
          <p>
            تمكّنك هذه الخدمة من الاتصال بأي مشترك ضمن شبكة YOU على حسابك،
            وستصل رسالة صوتية للشخص الذي ستكون المكالمة على حسابه محتواها
            "المتصل يطلب أن تكون مكالمته على حسابك"، وله حرية الموافقة أو
            الرفض.
          </p>
          <p>
            للاتصال بالرقم المراد دفع المكالمة على حسابه، اتصل برقمه مسبوقاً
            بالنجمة{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary">
              *73XXXXXXX
            </bdi>
            .
          </p>
          <p>
            سيتم خصم قيمة المكالمة من الرصيد الأساسي أو من رصيد الباقة
            للمستقبل. يمكن استخدام الخدمة مرتين في اليوم.
          </p>
          <p className="text-xs text-muted-foreground">
            هذه الخدمة متاحة لمشتركي الدفع المسبق.
          </p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

export default YouCallOnMeCard;
