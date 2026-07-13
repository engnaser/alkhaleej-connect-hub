import { Coins } from "lucide-react";

type Row = { label: string; amount: string };

const ROWS: Row[] = [
  { label: "اتصال بشبكة GSM محلية أخرى", amount: "22 ريال للدقيقة" },
  { label: "الاتصال بالهاتف الثابت", amount: "22 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة (داخل مجموعة سوا)", amount: "6 ريال للدقيقة" },
  { label: "اتصال ضمن الشبكة (خارج مجموعة سوا)", amount: "16 ريال للدقيقة" },
  { label: "اتصال بشبكة CDMA", amount: "22 ريال للدقيقة" },
  { label: "الرسالة لجميع الشبكات المحلية", amount: "5 ريال للرسالة" },
  { label: "الاشتراك الشهري", amount: "بدون اشتراك شهري" },
];

export function SawaTariffTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
          <Coins className="h-5 w-5" />
        </div>
        <h3 className="text-base font-extrabold text-foreground">تعرفة باقة سوا</h3>
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
            {ROWS.map((r) => (
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
