import * as React from "react";
import { memo, useState, type ComponentType } from "react";

import { toast } from "sonner";
import {
  Copy,
  Check,
  PhoneCall,
  PhoneOff,
  MessageCircle,
  MessageSquare,
  Scissors,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type ActivationMethod = {
  type: "call" | "sms";
  code?: string;
  smsTo?: string;
  label?: string;
  /** If provided (and card requiresInput), builds the code from user input */
  buildCode?: (input: string) => string;
};


export type ServiceCardProps = {
  title: string;
  description?: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  activationCode?: string;
  deactivationCode?: string;
  requiresInput?: boolean;
  inputPlaceholder?: string;
  /** Build the final code using the user input, e.g. (n) => `*555*${n}#` */
  buildCodeFromInput?: (input: string) => string;
  /** If provided, "اتصل للتفعيل" opens a dialog to choose between call/sms */
  activationMethods?: ActivationMethod[];
  helpUrl?: string;
  descriptionClamp?: number;
};

const encodeUssd = (code: string) => code.replace(/#/g, "%23");

function ServiceCardImpl({
  title,
  description,
  icon: Icon,
  activationCode,
  deactivationCode,
  requiresInput = false,
  inputPlaceholder = "أدخل الرقم",
  buildCodeFromInput,
  activationMethods,
  helpUrl,
  descriptionClamp = 3,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [input, setInput] = useState("");
  const [methodOpen, setMethodOpen] = useState(false);

  const resolvedCode =
    requiresInput && buildCodeFromInput
      ? input.trim()
        ? buildCodeFromInput(input.trim())
        : ""
      : activationCode ?? "";

  const derivedDeactivation =
    deactivationCode ??
    (activationCode ? activationCode.replace(/^\*/, "#") : "");

  const copyTarget = resolvedCode || derivedDeactivation;

  const handleCopy = async () => {
    if (!copyTarget) {
      toast.error("لا يوجد كود للنسخ");
      return;
    }
    try {
      await navigator.clipboard.writeText(copyTarget);
      setCopied(true);
      toast.success("تم نسخ الكود");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("تعذّر النسخ");
    }
  };


  const callHref = resolvedCode ? `tel:${encodeUssd(resolvedCode)}` : undefined;
  const deactivateHref = derivedDeactivation
    ? `tel:${encodeUssd(derivedDeactivation)}`
    : undefined;

  const shouldShowMore =
    (description?.length ?? 0) > 120 || (description?.split("\n").length ?? 0) > 3;

  const hasMethodDialog = (activationMethods?.length ?? 0) > 0;

  return (
    <div
      dir="rtl"
      className="relative flex flex-col overflow-hidden rounded-3xl border-2 bg-white p-6 shadow-[0_10px_30px_-15px_rgba(122,30,43,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-15px_rgba(122,30,43,0.45)]"
      style={{ borderColor: "#7a1e2b33" }}
    >
      {/* Brand top strip */}
      <div className="absolute inset-x-0 top-0 flex h-1.5">
        <div className="flex-1" style={{ background: "#7a1e2b" }} />
        <div className="flex-1" style={{ background: "#2b3f7a" }} />
      </div>
      {/* Cream corner accent */}
      <div
        className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, #f4d7b8 0%, transparent 70%)" }}
      />

      {/* Header */}
      <div className="relative flex items-start gap-3 pt-2">
        {Icon && (
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white shadow-md"
            style={{ background: "linear-gradient(135deg, #7a1e2b 0%, #2b3f7a 100%)" }}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h4 className="pt-1 text-xl font-bold" style={{ color: "#7a1e2b" }}>{title}</h4>
      </div>

      {/* Description */}
      {description && (
        <div className="relative mt-3 flex-1">
          <p
            className="text-sm leading-relaxed text-gray-600"
            style={
              expanded
                ? undefined
                : {
                    display: "-webkit-box",
                    WebkitLineClamp: descriptionClamp,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
            }
          >
            {description}
          </p>
          {shouldShowMore && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-1.5 text-xs font-semibold hover:underline"
              style={{ color: "#2b3f7a" }}
            >
              {expanded ? "عرض أقل" : "عرض المزيد"}
            </button>
          )}
        </div>
      )}

      {/* Codes */}
      {(activationCode || requiresInput || derivedDeactivation) && (
        <div className="relative mt-4 space-y-2">
          {(activationCode || requiresInput) && (
            <div
              className="flex items-center justify-between gap-3 rounded-full border border-dashed px-4 py-2"
              style={{ borderColor: "#7a1e2b66", background: "#fff6ec" }}
            >
              <span className="text-xs font-medium text-gray-500">
                كود التفعيل
              </span>
              {requiresInput ? (
                <input
                  type="tel"
                  inputMode="numeric"
                  dir="ltr"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={inputPlaceholder}
                  className="w-40 bg-transparent text-left font-mono text-sm font-bold placeholder:opacity-40 focus:outline-none"
                  style={{ color: "#7a1e2b" }}
                />
              ) : (
                <span
                  dir="ltr"
                  className="font-mono text-sm font-bold"
                  style={{ color: "#7a1e2b" }}
                >
                  {activationCode}
                </span>
              )}
            </div>
          )}
          {derivedDeactivation && (
            <div className="flex items-center justify-between gap-3 rounded-full border border-dashed border-rose-300 bg-rose-50 px-4 py-2">
              <span className="text-xs font-medium text-gray-500">
                كود إلغاء التفعيل
              </span>
              <span
                dir="ltr"
                className="font-mono text-sm font-bold text-rose-600"
              >
                {derivedDeactivation}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="relative mt-5 grid grid-cols-2 gap-2">
        {helpUrl && (
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
        )}
        {(activationCode || requiresInput || derivedDeactivation) && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border bg-white px-3 py-2.5 text-xs font-bold hover:bg-gray-50"
            style={{ borderColor: "#7a1e2b33", color: "#7a1e2b" }}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "تم النسخ" : "نسخ الكود"}
          </button>
        )}

        {(activationCode || requiresInput) &&
          (hasMethodDialog ? (
            <button
              type="button"
              onClick={() => setMethodOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-extrabold text-white shadow-sm hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #7a1e2b 0%, #2b3f7a 100%)" }}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              اتصل للتفعيل
            </button>
          ) : (
            <a
              href={callHref}
              aria-disabled={!callHref}
              onClick={(e) => {
                if (!callHref) {
                  e.preventDefault();
                  toast.error("أدخل الرقم أولاً");
                }
              }}
              className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-extrabold text-white shadow-sm hover:opacity-90 ${
                !callHref ? "opacity-60" : ""
              }`}
              style={{ background: "linear-gradient(135deg, #7a1e2b 0%, #2b3f7a 100%)" }}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              اتصل للتفعيل
            </a>
          ))}
        {deactivateHref && (
          <a
            href={deactivateHref}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-rose-100 px-3 py-2.5 text-xs font-extrabold text-rose-600 hover:bg-rose-200"
          >
            <Scissors className="h-3.5 w-3.5" />
            إلغاء التفعيل
          </a>
        )}
      </div>


      {/* Method Dialog */}
      {hasMethodDialog && (
        <Dialog open={methodOpen} onOpenChange={setMethodOpen}>
          <DialogContent dir="rtl" className="text-right">
            <DialogHeader>
              <DialogTitle className="text-right text-gray-900">
                اختر طريقة التفعيل
              </DialogTitle>
            </DialogHeader>
            <div className="mt-2 grid gap-3">
              {activationMethods!.map((m, i) => {
                const built =
                  m.buildCode && input.trim()
                    ? m.buildCode(input.trim())
                    : m.code ?? "";
                const disabled = !built;
                const href =
                  m.type === "call"
                    ? `tel:${encodeUssd(built)}`
                    : `sms:${m.smsTo ?? ""}?body=${encodeUssd(built)}`;
                const isCall = m.type === "call";
                return (
                  <a
                    key={i}
                    href={disabled ? undefined : href}
                    aria-disabled={disabled}
                    onClick={(e) => {
                      if (disabled) {
                        e.preventDefault();
                        toast.error("أدخل الرقم أولاً");
                        return;
                      }
                      setMethodOpen(false);
                    }}
                    className={
                      (isCall
                        ? "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90"
                        : "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold hover:bg-gray-50") +
                      (disabled ? " opacity-60 pointer-events-none" : "")
                    }
                    style={
                      isCall
                        ? { background: "linear-gradient(135deg, #7a1e2b 0%, #2b3f7a 100%)" }
                        : { borderColor: "#7a1e2b33", color: "#7a1e2b", background: "#fff" }
                    }
                  >
                    {isCall ? (
                      <PhoneCall className="h-4 w-4" />

                    ) : (
                      <MessageSquare className="h-4 w-4" />
                    )}
                    {m.label ??
                      (isCall ? "تفعيل عبر اتصال" : "تفعيل عبر رسالة نصية")}
                  </a>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export const ServiceCard = memo(ServiceCardImpl) as unknown as (props: ServiceCardProps) => React.ReactElement;
export default ServiceCard;


