import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PhoneCall, Info, Wallet } from "lucide-react";

export function YouSalifniCard() {
  const activateHref = "tel:*202%23";
  return (
    <div
      dir="rtl"
      className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h4 className="text-base font-extrabold text-foreground">
          خدمة سلفني - خدمة واصل
        </h4>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Wallet className="h-5 w-5" />
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        احصل على <span className="font-bold text-foreground">100 ريال</span>{" "}
        سلفة بدون رسوم إضافية لاستخدامها على جميع الشبكات المحلية، ويُخصم المبلغ
        عند أول تعبئة رصيد.
      </p>

      <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-muted-foreground">كود التفعيل</span>
          <bdi
            dir="ltr"
            className="font-mono text-lg font-black text-primary"
            style={{ unicodeBidi: "isolate" }}
          >
            *202#
          </bdi>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2">
        <a
          href={activateHref}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
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
                خدمة سلفني - خدمة واصل
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm leading-relaxed text-foreground/85">
              <p>
                هذه الخدمة تُمكّن مشتركي الدفع المسبق من الحصول على مبلغ{" "}
                <span className="font-bold">100 ريال</span> بدون أي رسوم إضافية
                يُستخدم إلى كل الشبكات المحلية، بحيث يتم خصم المبلغ عند أول
                تعبئة للرصيد.
              </p>
              <p>
                يستطيع المشترك الاستفادة من الخدمة عندما يصبح رصيده{" "}
                <span className="font-bold">22 ريالاً أو أقل</span>. صلاحية
                استخدام الرصيد يوم واحد.
              </p>
              <p>
                بالإمكان طلب رصيد مرة أخرى بعد تسديد المبلغ السابق. ستكون قيمة
                استهلاك الرصيد حسب تعرفة المشترك.
              </p>
              <p>
                للاستفادة من الخدمة يشترط مرور{" "}
                <span className="font-bold">6 أشهر</span> من تاريخ تفعيل الخط.
              </p>
              <p>
                هذه الخدمة متاحة عند شحن الخط شهرياً بقيمة{" "}
                <span className="font-bold">410 ريال أو أكثر</span> لمدة 3 أشهر
                متتالية.
              </p>
              <p>
                لطلب الخدمة، اتصل بالرمز{" "}
                <bdi
                  dir="ltr"
                  className="font-mono font-bold text-primary"
                  style={{ unicodeBidi: "isolate" }}
                >
                  *202#
                </bdi>
                .
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default YouSalifniCard;
