import { Wallet } from "lucide-react";
import { CardShell, CodePill, DetailsButton } from "@/components/you-inquiry-cards";
import { EditableActionCodes } from "@/components/editable-action-codes";

export function YouSalifniCard() {
  return (
    <CardShell title="خدمة سلفني - خدمة واصل" icon={<Wallet className="h-5 w-5" />}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        احصل على <span className="font-bold text-foreground">100 ريال</span>{" "}
        سلفة بدون رسوم إضافية لاستخدامها على جميع الشبكات المحلية، ويُخصم المبلغ
        عند أول تعبئة رصيد.
      </p>

      <CodePill code="*202#" />

      <EditableActionCodes
        id="you-salifni"
        activateCode="*202#"
        detailsSlot={
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
        }
      />
    </CardShell>
  );
}

export default YouSalifniCard;
