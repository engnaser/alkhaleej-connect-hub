import {
  Wallet,
  Zap,
  Phone,
  Sparkles,
  Coins,
  MoonStar,
  FileText,
  CreditCard,
  Globe,
  Plane,
  type LucideIcon,
} from "lucide-react";

function TableCard({
  title,
  Icon,
  children,
  wide,
}: {
  title: string;
  Icon: LucideIcon;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] ${
        wide ? "lg:col-span-2 xl:col-span-3" : ""
      }`}
    >
      <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-extrabold text-foreground">{title}</h3>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

const thBase =
  "px-4 py-3 text-center text-xs font-bold text-muted-foreground";
const tdBase = "px-4 py-4 text-center text-sm font-semibold text-foreground";
const tdAccent =
  "px-4 py-4 text-center font-mono text-sm font-extrabold text-primary";

// 1. سوبر نبأ
const SUPER_NABA = [
  { price: "600", period: "7 أيام", receive: "90 يوماً" },
  { price: "1000", period: "15 يوماً", receive: "90 يوماً" },
  { price: "1650", period: "30 يوماً", receive: "90 يوماً" },
  { price: "2500", period: "45 يوماً", receive: "90 يوماً" },
  { price: "5000", period: "100 يوماً", receive: "90 يوماً" },
  { price: "10000", period: "220 يوماً", receive: "90 يوماً" },
];

// 2. الشحن الفوري
const INSTANT_RECHARGE = [
  { unit: "22", price: "272", days: "5" },
  { unit: "40", price: "484", days: "8" },
  { unit: "45", price: "545", days: "8" },
  { unit: "60", price: "726", days: "14" },
  { unit: "85", price: "1029", days: "40" },
  { unit: "100", price: "1210", days: "50" },
  { unit: "125", price: "1513", days: "60" },
  { unit: "150", price: "1815", days: "60" },
  { unit: "209", price: "2529", days: "180" },
  { unit: "300", price: "3630", days: "365" },
  { unit: "505", price: "6111", days: "365" },
  { unit: "1270", price: "15367", days: "365" },
];

// 3. بلقيس
const BALQEES = [
  { type: "اتصال", detail: "رسوم تحويل من باقة إلى أخرى", orig: "100", kalam: "100" },
  { type: "اتصال", detail: "من بلقيس إلى بلقيس", orig: "15", kalam: "4" },
  { type: "اتصال", detail: "من بلقيس إلى بلقيس ليالي", orig: "9", kalam: "2" },
  { type: "اتصال", detail: "من بلقيس إلى سبأفون", orig: "15", kalam: "7" },
  { type: "اتصال", detail: "من بلقيس إلى سبأفون ليالي", orig: "9", kalam: "5" },
  { type: "اتصال", detail: "من بلقيس إلى جي اس ام طوال اليوم", orig: "20", kalam: "15" },
  { type: "اتصال", detail: "من بلقيس إلى سي دي ام ايه طوال اليوم", orig: "22", kalam: "22" },
  { type: "اتصال", detail: "من بلقيس إلى الشبكة الثابتة", orig: "16", kalam: "16" },
  { type: "رسالة", detail: "من بلقيس إلى سبأفون", orig: "9", kalam: "4" },
  { type: "رسالة", detail: "من بلقيس إلى جي اس ام", orig: "15", kalam: "5" },
  { type: "رسالة", detail: "من بلقيس إلى سي دي ام ايه", orig: "17.5", kalam: "5" },
  { type: "رسالة", detail: "من بلقيس إلى بلقيس", orig: "9", kalam: "2" },
];

// 4. يلّا
const YALLA = [
  { type: "اتصال", detail: "من يلا إلى يلا", orig: "1.5", kalam: "0.5" },
  { type: "اتصال", detail: "من يلا إلى يلا ليالي", orig: "0.9", kalam: "0.5" },
  { type: "اتصال", detail: "من يلا إلى سبأفون", orig: "1.5", kalam: "1" },
  { type: "اتصال", detail: "من يلا إلى سبأفون ليالي", orig: "0.9", kalam: "0.9" },
  { type: "اتصال", detail: "من يلا إلى جي.اس.ام طوال اليوم", orig: "2", kalam: "2" },
  { type: "اتصال", detail: "من يلا إلى يمن موبايل", orig: "2.2", kalam: "2.2" },
  { type: "اتصال", detail: "من يلا إلى الشبكة الثابتة", orig: "1.6", kalam: "1.6" },
  { type: "رسالة", detail: "من يلا إلى سبأفون", orig: "0.9", kalam: "0.3" },
  { type: "رسالة", detail: "من يلا إلى يو", orig: "1.5", kalam: "0.5" },
  { type: "رسالة", detail: "من يلا إلى واي", orig: "1.5", kalam: "0.5" },
  { type: "رسالة", detail: "من يلا إلى يمن موبايل", orig: "1.75", kalam: "0.5" },
  { type: "رسالة", detail: "من يلا إلى الشبكات الدولية", orig: "2.5", kalam: "2.5" },
  { type: "رسالة", detail: "من يلا إلى يلا", orig: "0.9", kalam: "0.2" },
];

// 5. باقة 7 ريال
const SEVEN_RIYAL = [
  { type: "اتصال", detail: "إلى سبأفون", m12: "1.5", m3: "0.7" },
  { type: "اتصال", detail: "إلى سبأفون ليالي", m12: "0.9", m3: "0.7" },
  { type: "اتصال", detail: "إلى جي.اس.ام", m12: "2", m3: "0.7" },
  { type: "اتصال", detail: "إلى يمن موبايل", m12: "2.2", m3: "0.7" },
  { type: "اتصال", detail: "إلى الشبكة الثابتة", m12: "1.6", m3: "0.7" },
  { type: "رسالة", detail: "إلى جميع الشبكات المحلية", m12: "0.5", m3: "---" },
  { type: "رسالة", detail: "إلى الشبكات الدولية", m12: "2.5", m3: "---" },
];

// 6. سوبر ليالي
const SUPER_LAYALI = [
  { type: "اتصال", detail: "إلى سبأفون", v: "1.5" },
  { type: "اتصال", detail: "إلى سبأفون ليالي", v: "0.5" },
  { type: "اتصال", detail: "إلى جي.اس.ام", v: "2" },
  { type: "اتصال", detail: "إلى جي.اس.ام ليالي", v: "1" },
  { type: "اتصال", detail: "إلى يمن موبايل", v: "2.2" },
  { type: "اتصال", detail: "إلى يمن موبايل ليالي", v: "1" },
  { type: "اتصال", detail: "إلى الشبكة الثابتة", v: "1.6" },
  { type: "رسالة", detail: "إلى سبأفون", v: "0.5" },
  { type: "رسالة", detail: "إلى جميع الشبكات المحلية", v: "0.5" },
  { type: "رسالة", detail: "إلى سبأفون ليالي", v: "0.1" },
  { type: "رسالة", detail: "إلى الشبكات الدولية", v: "2.5" },
];

// 7. الرصيد الأساسي للفوترة
const POSTPAID_BASE = [
  { type: "الاتصال", detail: "إلى سبأفون", v: "7.5" },
  { type: "الاتصال", detail: "إلى سبأفون في وقت الذروة", v: "3" },
  { type: "الاتصال", detail: "إلى شبكات الجي إس إم الأخرى", v: "9.5" },
  { type: "الاتصال", detail: "إلى يمن موبايل", v: "10" },
  { type: "الاتصال", detail: "إلى الشبكة الثابتة", v: "9" },
  { type: "الاتصال", detail: "الدولي", v: "تعرفة تليمن" },
  { type: "الرسائل", detail: "إلى سبأفون", v: "5" },
  { type: "الرسائل", detail: "إلى شبكات الجي إس إم الأخرى", v: "9" },
  { type: "الرسائل", detail: "إلى يمن موبايل", v: "12.5" },
  { type: "الرسائل", detail: "الرسائل الدولية", v: "تعرفة تليمن" },
];

// 8. الاشتراك في الفوترة
const POSTPAID_SUB = [
  { label: "سعر الخط", amount: "مجاناً" },
  { label: "مبلغ التأمين", amount: "2,000" },
  { label: "الاشتراك الشهري", amount: "500" },
];

// 9. الإنترنت لخطوط الفوترة والدفع المسبق
const INTERNET = [
  {
    type: "تعرفة الإنترنت العادية لخطوط الفوترة",
    rate: "50 ريال",
    note: "توجد باقات إنترنت مخفضة تعمل على خطوط الفوترة",
  },
  {
    type: "تعرفة الإنترنت العادية لخطوط الدفع المسبق",
    rate: "7.17 وحدة",
    note: "توجد باقات إنترنت مخفضة تعمل على والدفع المسبق",
  },
];

// 10. التجوال الدولي
const ROAMING = [
  { dest: "الاتصال للوطن", gulf: "42.5", arab: "46", eu: "62", rest: "68" },
  { dest: "الاتصال المحلي", gulf: "20", arab: "20", eu: "20", rest: "20" },
  { dest: "دولي أخرى", gulf: "53.5", arab: "53.5", eu: "65", rest: "72.5" },
  { dest: "الرسائل", gulf: "10", arab: "10", eu: "10", rest: "10" },
  { dest: "استقبال المكالمات", gulf: "18", arab: "21", eu: "28", rest: "32" },
  { dest: "إنترنت", gulf: "0.4", arab: "0.4", eu: "0.4", rest: "0.4" },
];

export function SabafonTariffTables() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {/* سوبر نبأ */}
      <TableCard title="فئات الشحن (سوبر نبأ)" Icon={Wallet}>
        <table className="w-full min-w-[360px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>الفئة (ريال يمني)</th>
              <th className={thBase}>فترة الإرسال والاستقبال</th>
              <th className={thBase}>الإستقبال</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SUPER_NABA.map((r) => (
              <tr key={r.price} className="transition-colors hover:bg-secondary/30">
                <td className={tdAccent}>{r.price}</td>
                <td className={tdBase}>{r.period}</td>
                <td className={tdBase}>{r.receive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* الشحن الفوري */}
      <TableCard title="فئات الشحن الفوري" Icon={Zap}>
        <table className="w-full min-w-[360px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>الوحدة</th>
              <th className={thBase}>السعر</th>
              <th className={thBase}>الأيام</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {INSTANT_RECHARGE.map((r, i) => (
              <tr key={i} className="transition-colors hover:bg-secondary/30">
                <td className={tdAccent}>{r.unit}</td>
                <td className={tdBase}>{r.price}</td>
                <td className={tdBase}>{r.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* بلقيس */}
      <TableCard title="تعرفة خط بلقيس" Icon={Phone}>
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>النوع</th>
              <th className={thBase}>التفاصيل</th>
              <th className={thBase}>الأصلي (ريال)</th>
              <th className={thBase}>كلام (ريال)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {BALQEES.map((r, i) => (
              <tr key={i} className="transition-colors hover:bg-secondary/30">
                <td className={tdBase}>{r.type}</td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-foreground">{r.detail}</td>
                <td className={tdBase}>{r.orig}</td>
                <td className={tdAccent}>{r.kalam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* يلّا */}
      <TableCard title="تعرفة خط يلّا" Icon={Sparkles}>
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>النوع</th>
              <th className={thBase}>التفاصيل</th>
              <th className={thBase}>الأصلي (وحدة)</th>
              <th className={thBase}>كلام (وحدة)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {YALLA.map((r, i) => (
              <tr key={i} className="transition-colors hover:bg-secondary/30">
                <td className={tdBase}>{r.type}</td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-foreground">{r.detail}</td>
                <td className={tdBase}>{r.orig}</td>
                <td className={tdAccent}>{r.kalam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* باقة 7 ريال */}
      <TableCard title="تعرفة باقة 7 ريال" Icon={Coins}>
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>النوع</th>
              <th className={thBase}>التفاصيل</th>
              <th className={thBase}>الدقيقة 1 و 2 (وحدة)</th>
              <th className={thBase}>من الدقيقة 3 (وحدة)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SEVEN_RIYAL.map((r, i) => (
              <tr key={i} className="transition-colors hover:bg-secondary/30">
                <td className={tdBase}>{r.type}</td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-foreground">{r.detail}</td>
                <td className={tdBase}>{r.m12}</td>
                <td className={tdAccent}>{r.m3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* سوبر ليالي */}
      <TableCard title="تعرفة خط سوبر ليالي" Icon={MoonStar}>
        <table className="w-full min-w-[440px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>النوع</th>
              <th className={thBase}>التفاصيل</th>
              <th className={thBase}>التعرفة (وحدة)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {SUPER_LAYALI.map((r, i) => (
              <tr key={i} className="transition-colors hover:bg-secondary/30">
                <td className={tdBase}>{r.type}</td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-foreground">{r.detail}</td>
                <td className={tdAccent}>{r.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* الرصيد الأساسي للفوترة */}
      <TableCard
        title="تعرفة المكالمات والرسائل من الرصيد الأساسي للفوترة"
        Icon={FileText}
      >
        <table className="w-full min-w-[440px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>النوع</th>
              <th className={thBase}>التفاصيل</th>
              <th className={thBase}>التعرفة بالريال</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {POSTPAID_BASE.map((r, i) => (
              <tr key={i} className="transition-colors hover:bg-secondary/30">
                <td className={tdBase}>{r.type}</td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-foreground">{r.detail}</td>
                <td className={tdAccent}>{r.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* الاشتراك في الفوترة */}
      <TableCard title="تكلفة الإشتراك في نظام الفوترة" Icon={CreditCard}>
        <table className="w-full min-w-[320px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>التفاصيل</th>
              <th className={thBase}>المبلغ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {POSTPAID_SUB.map((r) => (
              <tr key={r.label} className="transition-colors hover:bg-secondary/30">
                <td className="px-5 py-4 text-right font-semibold text-foreground">{r.label}</td>
                <td className={tdAccent}>{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* الإنترنت */}
      <TableCard
        title="تعرفة الإنترنت لخطوط الفوترة والدفع المسبق"
        Icon={Globe}
      >
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>النوع</th>
              <th className={thBase}>التعرفة لكل 1 ميجا</th>
              <th className={thBase}>ملاحظات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {INTERNET.map((r, i) => (
              <tr key={i} className="transition-colors hover:bg-secondary/30">
                <td className="px-4 py-4 text-right text-sm font-semibold text-foreground">{r.type}</td>
                <td className={tdAccent}>{r.rate}</td>
                <td className="px-4 py-4 text-right text-sm font-semibold text-muted-foreground">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* التجوال الدولي */}
      <TableCard
        title="تعرفة تكلفة المكالمات والرسائل أثناء التجوال الدولي من الرصيد الأساسي"
        Icon={Plane}
        wide
      >
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/20">
              <th className={thBase}>وجهة الاتصال</th>
              <th className={thBase}>دول مجلس التعاون (وحدة)</th>
              <th className={thBase}>الدول العربية (وحدة)</th>
              <th className={thBase}>أوروبا / تركيا / أمريكا / كندا (وحدة)</th>
              <th className={thBase}>باقي دول العالم (وحدة)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ROAMING.map((r) => (
              <tr key={r.dest} className="transition-colors hover:bg-secondary/30">
                <td className="px-4 py-4 text-right font-semibold text-foreground">{r.dest}</td>
                <td className={tdAccent}>{r.gulf}</td>
                <td className={tdBase}>{r.arab}</td>
                <td className={tdBase}>{r.eu}</td>
                <td className={tdAccent}>{r.rest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}
