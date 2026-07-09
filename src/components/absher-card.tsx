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
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <HandCoins className="h-5 w-5" />
      </div>
      <h4 className="text-base font-extrabold text-foreground">
        خدمة سلفني باقة أبشر
      </h4>
      <div className="mt-1.5 flex-1">
        <p
          className={`text-sm leading-relaxed text-muted-foreground ${expanded ? "" : "line-clamp-3"}`}
        >
          {DESCRIPTION}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-xs font-bold text-primary hover:underline"
        >
          {expanded ? "عرض أقل" : "عرض المزيد"}
        </button>
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between rounded-lg border border-dashed border-border bg-secondary/40 px-3 py-2">
          <span className="text-xs text-muted-foreground">كود التفعيل</span>
          <span dir="ltr" className="font-mono text-sm font-bold text-primary">
            {CODE}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "تم النسخ" : "نسخ الكود"}
        </button>
        <a
          href={helpUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-extrabold text-primary-foreground hover:scale-[1.02]"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          مساعدة
        </a>
        <button
          onClick={() => setOpen(true)}
          className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-extrabold text-primary hover:bg-primary/20"
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
