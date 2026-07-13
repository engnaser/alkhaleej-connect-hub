import { PhoneCall, Info, Wallet } from "lucide-react";
import { CardShell, CodePill, DetailsButton } from "@/components/you-inquiry-cards";

export function YouSalifniCard() {
  return (
    <CardShell title="خدمة سلفني - خدمة واصل" icon={<Wallet className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        احصل على <span className="font-bold text-foreground">100 ريال</span>{" "}
        سلفة بدون رسوم إضافية لاستخدامها على جميع الشبكات المحلية، ويُخصم المبلغ
        عند أول تعبئة رصيد.
      </p>

      <CodePill code="*202#" />

      <div className="mt-auto grid grid-cols-2 gap-2">
        <a
          href="tel:*202%23"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          <PhoneCall className="h-4 w-4" />
          تفعيل
        </a>
        <DetailsButton title="خدمة سلفني - خدمة واصل">
          <p>
            هذه الخدمة تُمكّن مشتركي الدفع المسبق من الحصول على مبلغ{" "}
            <span className="font-bold">100 ريال</span> بدون أي رسوم إضافية
            يُستخدم إلى كل الشبكات المحلية، بحيث يتم خصم المبلغ عند أول تعبئة
            للرصيد.
          </p>
          <p>
            يستطيع المشترك الاستفادة من الخدمة عندما يصبح رصيده{" "}
            <span className="font-bold">22 ريالاً أو أقل</span>. صلاحية استخدام
            الرصيد يوم واحد.
          </p>
          <p>
            بالإمكان طلب رصيد مرة أخرى بعد تسديد المبلغ السابق. ستكون قيمة
            استهلاك الرصيد حسب تعرفة المشترك.
          </p>
          <p>
            للاستفادة من الخدمة يشترط مرور{" "}
            <span className="font-bold">6 أشهر</span> من تاريخ تفعيل الخط، وأن
            يتم شحن الخط شهرياً بقيمة{" "}
            <span className="font-bold">410 ريال أو أكثر</span> لمدة 3 أشهر
            متتالية.
          </p>
        </DetailsButton>
      </div>
    </CardShell>
  );
}

export default YouSalifniCard;
