import type { LucideIcon } from "lucide-react";
import {
  Hash,
  Wallet,
  Send,
  Globe2,
  MessageSquare,
  CreditCard,
  PhoneCall,
  RefreshCw,
  Gauge,
  HelpCircle,
} from "lucide-react";

export type YMService = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  code?: string;
};

export const YM_GENERAL_SERVICES: YMService[] = [
  {
    id: "know-number",
    icon: Hash,
    title: "معرفة الرقم",
    desc: "اعرف رقمك الخاص بشريحة يمن موبايل بسهولة.",
    code: "*555#",
  },
  {
    id: "know-balance",
    icon: Wallet,
    title: "معرفة الرصيد",
    desc: "استعلم عن رصيدك الحالي مباشرة.",
    code: "*111#",
  },
  {
    id: "transfer",
    icon: Send,
    title: "تحويل رصيد",
    desc: "حوّل رصيد إلى رقم آخر بسهولة.",
    code: "*121#",
  },
  {
    id: "internet-services",
    icon: Globe2,
    title: "خدمات الإنترنت",
    desc: "تفعيل وإدارة باقات الإنترنت.",
    code: "*502#",
  },
  {
    id: "sms-services",
    icon: MessageSquare,
    title: "خدمات الرسائل",
    desc: "تفعيل باقات الرسائل القصيرة.",
    code: "*503#",
  },
  {
    id: "sim-services",
    icon: CreditCard,
    title: "خدمات الشرائح",
    desc: "إدارة الشرائح والخدمات المضافة.",
    code: "*900#",
  },
];

export const YM_ACCOUNT_SERVICES: YMService[] = [
  {
    id: "balance-inquiry",
    icon: Wallet,
    title: "الاستعلام عن الرصيد",
    desc: "اعرف رصيدك الحالي في أي وقت.",
    code: "*111#",
  },
  {
    id: "recharge",
    icon: CreditCard,
    title: "شحن رصيد",
    desc: "اشحن رصيد عبر بطاقة الشحن.",
    code: "*100*رقم_البطاقة#",
  },
  {
    id: "transfer-balance",
    icon: RefreshCw,
    title: "تحويل رصيد",
    desc: "حوّل رصيد إلى رقم آخر.",
    code: "*121#",
  },
  {
    id: "usage",
    icon: Gauge,
    title: "معرفة الاستهلاك",
    desc: "اطلع على استهلاكك من الباقة الحالية.",
    code: "*112#",
  },
  {
    id: "support",
    icon: HelpCircle,
    title: "طلب مساعدة",
    desc: "تواصل معنا عبر واتساب لأي استفسار.",
  },
  {
    id: "customer-care",
    icon: PhoneCall,
    title: "خدمة العملاء",
    desc: "اتصل بخدمة عملاء يمن موبايل.",
    code: "118",
  },
];
