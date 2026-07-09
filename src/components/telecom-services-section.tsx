import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Contact,
  Info,
  PhoneCall,
  PhoneOff,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export type TelecomService = {
  id: string;
  title: string;
  description: string;
  activationCode: string;
  deactivationCode: string;
  actionType: "call" | "sms";
  requiresInput?: boolean;
};

export const TELECOM_SERVICES: TelecomService[] = [
  {
    id: "dnd",
    title: "خدمة عدم الإزعاج",
    description:
      "توقف جميع المكالمات والرسائل الترويجية الواردة إلى رقمك من الشركة. مثالية لتفادي الإزعاج أثناء الاجتماعات أو النوم.",
    activationCode: "*90#",
    deactivationCode: "*90*0#",
    actionType: "call",
  },
  {
    id: "call-me",
    title: "اتصل بي",
    description:
      "إرسال طلب اتصال مجاني إلى رقم آخر ليقوم بالاتصال بك عند نفاد رصيدك. أدخل رقم الشخص المطلوب ثم اضغط تفعيل.",
    activationCode: "*199*",
    deactivationCode: "*199*0#",
    actionType: "call",
    requiresInput: true,
  },
  {
    id: "voicemail",
    title: "البريد الصوتي",
    description:
      "استقبل رسائل صوتية عندما يكون هاتفك مغلقاً أو خارج التغطية، واستمع إليها لاحقاً بسهولة.",
    activationCode: "*100#",
    deactivationCode: "*100*0#",
    actionType: "call",
  },
  {
    id: "balance-transfer",
    title: "تحويل الرصيد",
    description:
      "أرسل مبلغاً من رصيدك إلى رقم آخر عبر رسالة نصية. تصلك رسالة تأكيد بعد إتمام العملية.",
    activationCode: "TRANSFER",
    deactivationCode: "STOP",
    actionType: "sms",
    requiresInput: true,
  },
  {
    id: "caller-id",
    title: "إظهار هوية المتصل",
    description:
      "إظهار رقمك للطرف الآخر عند الاتصال به. يمكنك تفعيل أو إلغاء الإظهار في أي وقت.",
    activationCode: "*31#",
    deactivationCode: "#31#",
    actionType: "call",
  },
  {
    id: "call-forward",
    title: "تحويل المكالمات",
    description:
      "قم بتحويل مكالماتك الواردة تلقائياً إلى رقم آخر. أدخل الرقم المطلوب التحويل إليه ثم اضغط تفعيل.",
    activationCode: "**21*",
    deactivationCode: "##21#",
    actionType: "call",
    requiresInput: true,
  },
];

function buildCode(base: string, input: string, forActivation: boolean) {
  if (!forActivation) return base;
  const trimmed = input.trim().replace(/\s|-/g, "");
  if (!trimmed) return base;
  // For USSD patterns like *199* → *199*<num>#
  if (base.endsWith("*")) return `${base}${trimmed}#`;
  // For SMS content: append number after a space
  return `${base} ${trimmed}`;
}

function ServiceCard({ service }: { service: TelecomService }) {
  const [value, setValue] = useState("");

  const runAction = (code: string, forActivation: boolean) => {
    if (service.requiresInput && forActivation && !value.trim()) {
      toast.error("يرجى إدخال رقم الهاتف أولاً");
      return;
    }
    const finalCode = buildCode(code, value, forActivation);
    const scheme = service.actionType === "call" ? "tel:" : "sms:";
    const href =
      service.actionType === "call"
        ? `${scheme}${encodeURIComponent(finalCode)}`
        : `${scheme}${encodeURIComponent(service.activationCode.split(" ")[0] || "")}?body=${encodeURIComponent(finalCode)}`;
    window.location.href = href;
  };

  return (
    <Card className="group flex flex-col overflow-hidden border-border/70 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <CardHeader className="pb-3 text-center sm:text-right">
        <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:mx-0">
          {service.actionType === "call" ? (
            <PhoneCall className="h-5 w-5" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
        </div>
        <CardTitle className="text-lg font-black text-foreground sm:text-xl">
          {service.title}
        </CardTitle>
        <div className="mt-1 flex flex-wrap justify-center gap-1.5 sm:justify-start">
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
            تفعيل: {service.activationCode}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
            إلغاء: {service.deactivationCode}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        {service.requiresInput && (
          <div className="relative">
            <Contact className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="tel"
              inputMode="tel"
              placeholder="أدخل رقم الهاتف"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="pr-9 text-right"
              dir="ltr"
            />
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-1.5"
              >
                <Info className="h-3.5 w-3.5" />
                التفاصيل
              </Button>
            </DialogTrigger>
            <DialogContent dir="rtl" className="text-right">
              <DialogHeader>
                <DialogTitle className="text-right">
                  {service.title}
                </DialogTitle>
                <DialogDescription className="text-right leading-relaxed text-foreground/80">
                  {service.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 grid gap-2 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
                  <span className="font-bold">كود التفعيل</span>
                  <span dir="ltr" className="font-mono text-primary">
                    {service.activationCode}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
                  <span className="font-bold">كود الإلغاء</span>
                  <span dir="ltr" className="font-mono text-destructive">
                    {service.deactivationCode}
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            className="rounded-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => runAction(service.activationCode, true)}
          >
            <PhoneCall className="h-3.5 w-3.5" />
            تفعيل
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="rounded-full gap-1.5"
            onClick={() => runAction(service.deactivationCode, false)}
          >
            <PhoneOff className="h-3.5 w-3.5" />
            إلغاء التفعيل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function TelecomServicesSection({
  services = TELECOM_SERVICES,
  title = "خدمات الاتصالات",
  subtitle = "فعّل أو ألغِ خدمات شبكتك بضغطة زر — بدون الحاجة لتذكر الأكواد.",
}: {
  services?: TelecomService[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section dir="rtl" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          مركز الخدمات
        </div>
        <h2 className="text-2xl font-black text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}

export default TelecomServicesSection;
