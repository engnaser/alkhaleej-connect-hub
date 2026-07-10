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
      className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h4 className="pt-1 text-xl font-bold text-gray-900">{title}</h4>
      </div>

      {/* Description */}
      {description && (
        <div className="mt-3 flex-1">
          <p
            className="text-sm leading-relaxed text-gray-500"
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
              className="mt-1.5 text-xs font-semibold text-emerald-700 hover:underline"
            >
              {expanded ? "عرض أقل" : "عرض المزيد"}
            </button>
          )}
        </div>
      )}

      {/* Codes */}
      {(activationCode || requiresInput || derivedDeactivation) && (
        <div className="mt-4 space-y-2">
          {(activationCode || requiresInput) && (
            <div className="flex items-center justify-between gap-3 rounded-full border border-dashed border-emerald-300 bg-emerald-50 px-4 py-2">
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
                  className="w-40 bg-transparent text-left font-mono text-sm font-bold text-emerald-800 placeholder:text-emerald-800/40 focus:outline-none"
                />
              ) : (
                <span
                  dir="ltr"
                  className="font-mono text-sm font-bold text-emerald-800"
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
      <div className="mt-5 grid grid-cols-2 gap-2">
        {helpUrl && (
          <a
            href={helpUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#2f785b] px-3 py-2.5 text-xs font-extrabold text-white hover:bg-[#28684f]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            مساعدة
          </a>
        )}
        {(activationCode || requiresInput || derivedDeactivation) && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
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
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2.5 text-xs font-extrabold text-[#2f785b] hover:bg-emerald-100"
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
              className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2.5 text-xs font-extrabold text-[#2f785b] hover:bg-emerald-100 ${
                !callHref ? "opacity-60" : ""
              }`}
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
                        ? "inline-flex items-center justify-center gap-2 rounded-full bg-[#2f785b] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#28684f]"
                        : "inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50") +
                      (disabled ? " opacity-60 pointer-events-none" : "")
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

export const ServiceCard: (props: ServiceCardProps) => JSX.Element = memo(ServiceCardImpl) as unknown as (props: ServiceCardProps) => JSX.Element;
export default ServiceCard;


