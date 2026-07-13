import { Coins, MessageSquare, Sparkles } from "lucide-react";

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
    </div>
  );
}

