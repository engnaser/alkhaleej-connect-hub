import { Coins, MessageSquare, Sparkles, GraduationCap, Zap, FileText, Wallet, Plane } from "lucide-react";

type RoamingRow = {
  category: string;
  intl: string;
  local: string;
  incoming: string;
  toYemen: string;
};

const ROAMING_ROWS: RoamingRow[] = [
  { category: "دول الخليج", intl: "540", local: "200", incoming: "180", toYemen: "425" },
  { category: "الإمارات العربية المتحدة", intl: "1250", local: "650", incoming: "450", toYemen: "950" },
  { category: "الدول العربية", intl: "540", local: "200", incoming: "210", toYemen: "460" },
  { category: "أوروبا، أمريكا وكندا", intl: "650", local: "200", incoming: "280", toYemen: "620" },
  { category: "آسيا وأفريقيا", intl: "705", local: "200", incoming: "310", toYemen: "680" },
  { category: "بقية دول العالم", intl: "740", local: "200", incoming: "330", toYemen: "690" },
  { category: "التجوال الجوي والبحري والأقمار الاصطناعية", intl: "1200", local: "850", incoming: "1600", toYemen: "1000" },
];

function RoamingTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] lg:col-span-2 xl:col-span-3">
      <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
          <Plane className="h-5 w-5" />
        </div>
        <h3 className="text-base font-extrabold text-foreground">
          تعرفة تكلفة المكالمات والرسائل أثناء التجوال الدولي من الرصيد الأساسي
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20 text-xs font-bold text-muted-foreground">
              <th className="px-4 py-3 text-right">الفئة</th>
              <th className="px-4 py-3 text-center">الاتصال الدولي</th>
              <th className="px-4 py-3 text-center">الاتصال المحلي</th>
              <th className="px-4 py-3 text-center">الاتصال الوارد</th>
              <th className="px-4 py-3 text-center">الاتصال إلى اليمن</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ROAMING_ROWS.map((r) => (
              <tr key={r.category} className="transition-colors hover:bg-secondary/30">
                <td className="px-4 py-4 font-semibold text-foreground">{r.category}</td>
                <td className="px-4 py-4 text-center font-mono text-sm font-extrabold text-primary">{r.intl}</td>
                <td className="px-4 py-4 text-center font-mono text-sm font-semibold text-foreground">{r.local}</td>
                <td className="px-4 py-4 text-center font-mono text-sm font-semibold text-foreground">{r.incoming}</td>
                <td className="px-4 py-4 text-center font-mono text-sm font-extrabold text-primary">{r.toYemen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type Row = { label: string; amount: string };

const SAWA_ROWS: Row[] = [
  { label: "اتصال بشبكة GSM محلية أخرى", amount: "22 ريال للدقيقة" },
  { label: "الاتصال بالهاتف الثابت", amount: "22 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة (داخل مجموعة سوا)", amount: "6 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة (خارج مجموعة سوا)", amount: "16 ريال للدقيقة" },
  { label: "اتصال بشبكة CDMA", amount: "22 ريال للدقيقة" },
  { label: "الرسالة لجميع الشبكات المحلية", amount: "5 ريال للرسالة" },
  { label: "الاشتراك الشهري", amount: "بدون اشتراك شهري" },
];

const KALAM_ROWS: Row[] = [
  { label: "اتصال بشبكة GSM محلية أخرى", amount: "22 ريال للدقيقة" },
  { label: "الاتصال بالهاتف الثابت", amount: "22 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة (أول 3 دقائق)", amount: "17 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة (من بعد الدقيقة الثالثة)", amount: "5 ريال للدقيقة" },
  { label: "اتصال بشبكة CDMA", amount: "22 ريال للدقيقة" },
  { label: "الرسالة الواحدة لجميع الشبكات المحلية", amount: "5 ريال" },
  { label: "الاشتراك الشهري للرسائل", amount: "بدون اشتراك شهري" },
];

const SHABAB_ROWS: Row[] = [
  { label: "اتصال بشبكة GSM محلية أخرى", amount: "22 ريال للدقيقة" },
  { label: "الاتصال بالهاتف الثابت", amount: "22 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة (من 11 مساءً إلى 07:00 صباحاً)", amount: "5 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة (من 07:00 صباحاً إلى 11:00 مساءً)", amount: "16 ريال للدقيقة" },
  { label: "اتصال بشبكة CDMA", amount: "22 ريال للدقيقة" },
  { label: "الرسالة إلى جميع الشبكات المحلية", amount: "5 ريال للرسالة" },
  { label: "الاشتراك الشهري", amount: "بدون اشتراك شهري" },
];

const TALEB_ROWS: Row[] = [
  { label: "الرسائل النصية لجميع الشبكات المحلية", amount: "300 رسالة" },
  { label: "الاتصال ضمن الشبكة", amount: "300 دقيقة" },
  { label: "الإنترنت", amount: "300 ميجا" },
  { label: "استخدام لتطبيقات واتساب وفيسبوك", amount: "غير محدود" },
  { label: "صلاحية الباقة", amount: "30 يوماً" },
  { label: "تكلفة الباقة", amount: "1250 ريال" },
  { label: "الاشتراك الشهري", amount: "بدون اشتراك شهري" },
];

const BAWER_ROWS: Row[] = [
  { label: "اتصال بشبكة CDMA", amount: "16 ريال للدقيقة" },
  { label: "اتصال بشبكة GSM محلية أخرى", amount: "16 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة أو الهاتف الثابت", amount: "9 ريال للدقيقة" },
  { label: "الرسالة لجميع الشبكات المحلية", amount: "5 ريال" },
  { label: "الاشتراك الشهري", amount: "200 ريال" },
];

const FATURA_ROWS: Row[] = [
  { label: "الاشتراك الشهري", amount: "500 ريال" },
  { label: "التمنيع على الاتصالات المحلية", amount: "4000 ريال" },
  { label: "دقيقة الاتصال ضمن الشبكة", amount: "8 ريالات" },
  { label: "دقيقة الاتصال إلى الشبكات المحلية الأخرى", amount: "10 ريالات" },
  { label: "الرسالة القصيرة إلى جميع الشبكات المحلية", amount: "5 ريالات" },
  { label: "الرسالة القصيرة الدولية", amount: "15 ريال" },
  { label: "سعر تصفح الإنترنت لكل 10 كيلوبايت", amount: "0.04 ريال" },
];

const RECHARGE_ROWS: { category: string; price: string; days: string }[] = [
  { category: "410", price: "496", days: "7" },
  { category: "830", price: "1004", days: "30" },
  { category: "1000", price: "1210", days: "30" },
  { category: "1250", price: "1513", days: "40" },
  { category: "2500", price: "3025", days: "60" },
  { category: "5000", price: "6050", days: "90" },
  { category: "7500", price: "9075", days: "90" },
  { category: "10000", price: "12100", days: "365" },
];

function RechargeTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
          <Wallet className="h-5 w-5" />
        </div>
        <h3 className="text-base font-extrabold text-foreground">فئات الشحن</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[360px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20 text-xs font-bold text-muted-foreground">
              <th className="px-5 py-3 text-center">الفئة</th>
              <th className="px-5 py-3 text-center">السعر</th>
              <th className="px-5 py-3 text-center">الأيام</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {RECHARGE_ROWS.map((r) => (
              <tr key={r.category} className="transition-colors hover:bg-secondary/30">
                <td className="px-5 py-4 text-center font-mono text-sm font-extrabold text-primary">{r.category}</td>
                <td className="px-5 py-4 text-center font-mono text-sm font-semibold text-foreground">{r.price}</td>
                <td className="px-5 py-4 text-center font-mono text-sm font-semibold text-muted-foreground">{r.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TariffTable({ title, rows, Icon }: { title: string; rows: Row[]; Icon: typeof Coins }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-extrabold text-foreground">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20 text-xs font-bold text-muted-foreground">
              <th className="px-5 py-3 text-right">التفاصيل</th>
              <th className="px-5 py-3 text-left">المبلغ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.label} className="transition-colors hover:bg-secondary/30">
                <td className="px-5 py-4 font-semibold text-foreground">{r.label}</td>
                <td className="px-5 py-4 text-left font-mono text-sm font-extrabold text-primary">
                  {r.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SawaTariffTable() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <TariffTable title="تعرفة باقة سوا" rows={SAWA_ROWS} Icon={Coins} />
      <TariffTable title="تعرفة باقة كلام" rows={KALAM_ROWS} Icon={MessageSquare} />
      <TariffTable title="تعرفة باقة شباب" rows={SHABAB_ROWS} Icon={Sparkles} />
      <TariffTable title="تعرفة باقة الطالب" rows={TALEB_ROWS} Icon={GraduationCap} />
      <TariffTable title="تعرفة باقة باور" rows={BAWER_ROWS} Icon={Zap} />
      <TariffTable title="تعرفة الفوترة" rows={FATURA_ROWS} Icon={FileText} />
      <RechargeTable />
      <RoamingTable />
    </div>
  );
}

