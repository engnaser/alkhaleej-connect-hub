import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PhoneCall, Contact, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { CardShell, CodePill, DetailsButton } from "@/components/you-inquiry-cards";

export function YouCallOnMeCard() {
  const [phone, setPhone] = useState("");
  const digits = phone.replace(/\D/g, "").slice(0, 9);
  const ussd = digits ? `*73${digits}` : "*73XXXXXXX";

  const handleActivate = () => {
    if (digits.length < 7) {
      toast.error("الرجاء إدخال رقم صحيح");
      return;
    }
    window.location.href = `tel:*73${digits}`;
  };

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
        <button
          onClick={handleActivate}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          <PhoneCall className="h-4 w-4" />
          تفعيل
        </button>
        <a
          href="tel:*800%23"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2.5 text-sm font-bold text-primary hover:bg-primary/20"
        >
          <Settings2 className="h-4 w-4" />
          تحكم
        </a>
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
          <p>
            للتحكم وإدارة الخدمة اطلب الرمز{" "}
            <bdi dir="ltr" className="font-mono font-bold text-primary">
              *800#
            </bdi>
            .
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
