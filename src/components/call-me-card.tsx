import { useState } from "react";
import { PhoneCall, Contact, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { TemplateRow } from "@/components/editable-action-codes";

export function CallMeCard() {
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);
  const digits = phone.replace(/\D/g, "");
  const ussd = digits ? `*555*${digits}#` : "*555*رقم#";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ussd);
      setCopied(true);
      toast.success("تم نسخ الكود");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("تعذّر النسخ");
    }
  };

  return (
    <div
      dir="rtl"
      className="relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white p-5 shadow-[0_10px_30px_-15px_rgba(122,30,43,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-15px_rgba(122,30,43,0.45)]"
      style={{ borderColor: "#7a1e2b33" }}
    >
      <div className="absolute inset-x-0 top-0 flex h-1.5">
        <div className="flex-1" style={{ background: "#7a1e2b" }} />
        <div className="flex-1" style={{ background: "#2b3f7a" }} />
      </div>
      <div
        className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, #f4d7b8 0%, transparent 70%)" }}
      />

      <div className="relative flex items-start gap-3 pt-2">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-md"
          style={{ background: "linear-gradient(135deg, #7a1e2b 0%, #2b3f7a 100%)" }}
        >
          <PhoneCall className="h-5 w-5" />
        </div>
        <h4 className="pt-1 text-lg font-extrabold" style={{ color: "#7a1e2b" }}>
          خدمة اتصل بي
        </h4>
      </div>

      <p className="relative mt-3 mb-4 text-sm leading-relaxed text-gray-600">
        أرسل تنبيه مجاني إلى رقم آخر ليقوم بالاتصال بك عند نفاد رصيدك. أدخل رقم
        الشخص المطلوب ثم اضغط تفعيل.
      </p>

      <div className="relative mb-3">
        <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="tel"
          inputMode="tel"
          placeholder="أدخل رقم الهاتف هنا..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-full border bg-white px-9 py-2 text-right text-sm font-bold outline-none focus:border-primary"
          style={{ borderColor: "#7a1e2b33", color: "#7a1e2b" }}
          dir="ltr"
        />
      </div>

      <div
        className="relative mb-3 flex items-center justify-between rounded-full border border-dashed px-4 py-2"
        style={{ borderColor: "#7a1e2b66", background: "#fff6ec" }}
      >
        <span className="text-xs font-medium text-gray-500">كود التفعيل</span>
        <span dir="ltr" className="font-mono text-sm font-bold" style={{ color: "#7a1e2b" }}>
          {ussd}
        </span>
      </div>

      <div className="relative mt-auto grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border bg-white px-3 py-2.5 text-xs font-bold hover:bg-gray-50"
          style={{ borderColor: "#7a1e2b33", color: "#7a1e2b" }}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "تم النسخ" : "نسخ الكود"}
        </button>
        <TemplateRow
          id="you-call-me"
          defaultTemplate="*555*{n}#"
          values={{ n: digits }}
        />
      </div>
    </div>
  );
}

export default CallMeCard;
