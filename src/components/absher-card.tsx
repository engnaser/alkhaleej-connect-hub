import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PhoneCall, MessageSquare, Info, Zap } from "lucide-react";

export function AbsherCard() {
  const [showDetails, setShowDetails] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="flex flex-col rounded-2xl border-2 border-red-500 bg-[#fdf6e3] p-5 shadow-sm transition-all hover:-translate-y-0.5"
    >
      <h4 className="text-center text-lg font-extrabold text-red-700">
        خدمة سلفني باقة أبشر
      </h4>

      <div className="mt-4 flex items-center justify-center gap-3">
        <Button
          onClick={() => setOpen(true)}
          className="gap-1.5 rounded-full bg-red-600 px-6 text-white hover:bg-red-700"
        >
          <Zap className="h-4 w-4" />
          تفعيل
        </Button>
        <Button
          onClick={() => setShowDetails((v) => !v)}
          className="gap-1.5 rounded-full bg-red-600 px-6 text-white hover:bg-red-700"
        >
          <Info className="h-4 w-4" />
          التفاصيل
        </Button>
      </div>

      {showDetails && (
        <div className="mt-4 rounded-xl border border-red-500 bg-gray-50 p-4 text-sm leading-relaxed text-foreground">
          أبشر : تمنحك رصيد 100 ريال لطلب الخدمة اتصل على *100*1# يتم خصم
          السلفة 100 ريال فقط. الخدمتان متاحتان لجميع مشتركي (3G - 4G - VoLTE)
          بنظام الدفع المسبق. لا يمكن طلب أبشر و أبشر اكسترا معاً يشترط التسديد
          أولاً.
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl" className="text-right">
          <DialogHeader>
            <DialogTitle className="text-right">
              اختر طريقة التفعيل
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 grid gap-3">
            <a
              href="tel:*100*1%23"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              <PhoneCall className="h-4 w-4" />
              تفعيل عبر اتصال
            </a>
            <a
              href="sms:101?body=*1%23"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-red-600 bg-white px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50"
            >
              <MessageSquare className="h-4 w-4" />
              تفعيل عبر رسالة نصية
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AbsherCard;
