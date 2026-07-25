import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PhoneCall,
  MessageSquare,
  MessageCircle,
  Copy,
  Check,
  HandCoins,
  Zap,
} from "lucide-react";

const WHATSAPP_BRAND = "967781635755";
const CODE = "*100*1#";
const DESCRIPTION =
  "أبشر: تمنحك رصيد 100 ريال لطلب الخدمة اتصل على *100*1# يتم خصم السلفة 100 ريال فقط. الخدمتان متاحتان لجميع مشتركي (3G - 4G - VoLTE) بنظام الدفع المسبق. لا يمكن طلب أبشر وأبشر اكسترا معاً، يشترط التسديد أولاً.";

export function AbsherCard() {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const helpUrl = `https://wa.me/${WHATSAPP_BRAND}?text=${encodeURIComponent(
    "مرحبًا، أحتاج مساعدة بخصوص خدمة: سلفني باقة أبشر",
  )}`;

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white p-5 shadow-[0_10px_30px_-15px_rgba(122,30,43,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-15px_rgba(122,30,43,0.45)]" style={{ borderColor: "#7a1e2b33" }}>
      <div className="absolute inset-x-0 top-0 flex h-1.5"><div className="flex-1" style={{ background: "#7a1e2b" }} /><div className="flex-1" style={{ background: "#2b3f7a" }} /></div>
      <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full opacity-60" style={{ background: "radial-gradient(circle, #f4d7b8 0%, transparent 70%)" }} />
      <div className="relative mb-3 grid h-11 w-11 place-items-center rounded-xl text-white shadow-md" style={{ background: "linear-gradient(135deg, #7a1e2b 0%, #2b3f7a 100%)" }}>
        <HandCoins className="h-5 w-5" />
      </div>
      <h4 className="relative text-base font-extrabold" style={{ color: "#7a1e2b" }}>
        خدمة سلفني باقة أبشر
      </h4>
      <div className="relative mt-1.5 flex-1">
        <p
          className={`text-sm leading-relaxed text-gray-600 ${expanded ? "" : "line-clamp-3"}`}
        >
          {DESCRIPTION}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-xs font-bold hover:underline"
          style={{ color: "#2b3f7a" }}
        >
          {expanded ? "عرض أقل" : "عرض المزيد"}
        </button>
      </div>

      <div className="relative mt-4 space-y-1.5">
        <div className="flex items-center justify-between rounded-full border border-dashed px-4 py-2" style={{ borderColor: "#7a1e2b66", background: "#fff6ec" }}>
          <span className="text-xs font-medium text-gray-500">كود التفعيل</span>
          <span dir="ltr" className="font-mono text-sm font-bold" style={{ color: "#7a1e2b" }}>
            {CODE}
          </span>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border bg-white px-3 py-2.5 text-xs font-bold hover:bg-gray-50"
          style={{ borderColor: "#7a1e2b33", color: "#7a1e2b" }}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "تم النسخ" : "نسخ الكود"}
        </button>
        <a
          href={helpUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-extrabold text-white shadow-sm hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #2b3f7a 0%, #1e2d5c 100%)" }}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          مساعدة
        </a>
        <button
          onClick={() => setOpen(true)}
          className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-extrabold text-white shadow-sm hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7a1e2b 0%, #2b3f7a 100%)" }}
        >
          <Zap className="h-3.5 w-3.5" />
          تفعيل الخدمة
        </button>
      </div>

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
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
            >
              <PhoneCall className="h-4 w-4" />
              تفعيل عبر اتصال
            </a>
            <a
              href="sms:101?body=*1%23"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary"
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
