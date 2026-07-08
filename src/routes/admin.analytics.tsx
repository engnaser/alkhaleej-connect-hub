import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Eye,
  Loader2,
  LogOut,
  RefreshCw,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";

import { SiteFooter } from "@/components/site-footer";
import logoKhalij from "@/assets/logo-khalij.png";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentAdminState } from "@/lib/packagesStore";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "لوحة تحليلات الزوار — الخليج تيليكوم" },
      {
        name: "description",
        content: "لوحة تحكم لعرض إحصائيات زوار الموقع والخدمات الأكثر استخدامًا.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminAnalyticsPage,
});

type AnalyticsRow = {
  id: string;
  event_type: string;
  path: string | null;
  service_id: string | null;
  meta: Record<string, unknown> | null;
  referrer: string | null;
  user_agent: string | null;
  session_id: string | null;
  created_at: string;
};

type Range = 7 | 30 | 90;

const PATH_LABELS: Record<string, string> = {
  "/": "الرئيسية",
  "/services": "الخدمات",
  "/designs": "التصاميم",
  "/adsl-inquiry": "استعلام ADSL",
  "/yemen4g-inquiry": "استعلام يمن 4G",
  "/bandar-aden-inquiry": "استعلام بندر عدن",
  "/phone-bill-inquiry": "استعلام فاتورة الهاتف",
  "/yemen-mobile": "يمن موبايل",
  "/whatsapp-bot": "بوت الواتساب",
  "/whatsapp-unblock": "فك حظر واتساب",
  "/speed-test": "قياس السرعة",
  "/currency-converter": "تحويل العملات",
  "/exchange-rates": "أسعار الصرف",
  "/dial-codes": "مفاتيح الاتصال",
  "/mawloud": "المولد",
  "/my-photos": "صوري",
  "/secondary-certificate": "الشهادة الثانوية",
  "/contact": "تواصل معنا",
  "/privacy": "الخصوصية",
  "/terms": "الشروط",
  "/safety": "الأمان",
  "/auth": "تسجيل الدخول",
};

const labelForPath = (p: string | null) => (p ? PATH_LABELS[p] ?? p : "—");

function CenterMessage({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-4 text-center">{children}</div>
    </div>
  );
}

function AdminAnalyticsPage() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<
    | { status: "loading" }
    | { status: "guest" }
    | { status: "no-admin"; email: string }
    | { status: "admin"; email: string }
  >({ status: "loading" });

  const [rows, setRows] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState<Range>(7);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { user, isAdmin } = await getCurrentAdminState();
      if (!active) return;
      if (!user) setAuthState({ status: "guest" });
      else if (!isAdmin) setAuthState({ status: "no-admin", email: user.email ?? "" });
      else setAuthState({ status: "admin", email: user.email ?? "" });
    };
    void check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => void check());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const load = useMemo(
    () => async () => {
      setLoading(true);
      setError(null);
      const since = subDays(new Date(), range).toISOString();
      const { data, error: err } = await supabase
        .from("analytics_events")
        .select("*")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(10000);
      if (err) setError(err.message);
      setRows((data ?? []) as AnalyticsRow[]);
      setLoading(false);
    },
    [range],
  );

  useEffect(() => {
    if (authState.status === "admin") void load();
  }, [authState.status, load]);

  const stats = useMemo(() => {
    const views = rows.filter((r) => r.event_type === "page_view");
    const events = rows.filter((r) => r.event_type !== "page_view");
    const uniqueSessions = new Set(rows.map((r) => r.session_id).filter(Boolean)).size;

    const byPath = new Map<string, number>();
    for (const r of views) {
      const key = r.path ?? "—";
      byPath.set(key, (byPath.get(key) ?? 0) + 1);
    }
    const topPages = [...byPath.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, label: labelForPath(path), count }));

    const byEvent = new Map<string, number>();
    for (const r of events) {
      byEvent.set(r.event_type, (byEvent.get(r.event_type) ?? 0) + 1);
    }
    const topEvents = [...byEvent.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([event_type, count]) => ({ event_type, count }));

    const byService = new Map<string, number>();
    for (const r of events) {
      if (!r.service_id) continue;
      byService.set(r.service_id, (byService.get(r.service_id) ?? 0) + 1);
    }
    const topServices = [...byService.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([service_id, count]) => ({ service_id, count }));

    // Daily buckets
    const days: { day: string; views: number; events: number }[] = [];
    for (let i = range - 1; i >= 0; i--) {
      const d = startOfDay(subDays(new Date(), i));
      days.push({ day: format(d, "MM/dd"), views: 0, events: 0 });
    }
    const dayIndex = new Map(days.map((d, i) => [d.day, i]));
    for (const r of rows) {
      const key = format(startOfDay(new Date(r.created_at)), "MM/dd");
      const idx = dayIndex.get(key);
      if (idx == null) continue;
      if (r.event_type === "page_view") days[idx].views++;
      else days[idx].events++;
    }

    return {
      totalViews: views.length,
      totalEvents: events.length,
      uniqueSessions,
      topPages,
      topEvents,
      topServices,
      days,
    };
  }, [rows, range]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (authState.status === "loading") {
    return (
      <CenterMessage>
        <Loader2 className="h-5 w-5 animate-spin" />
        جاري التحقق من الصلاحيات...
      </CenterMessage>
    );
  }
  if (authState.status === "guest") {
    return (
      <CenterMessage>
        <Shield className="h-6 w-6 text-primary" />
        <p className="text-sm font-bold">لوحة الإدارة محمية. سجّل الدخول كمشرف أولًا.</p>
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
        >
          الذهاب لتسجيل الدخول
        </Link>
      </CenterMessage>
    );
  }
  if (authState.status === "no-admin") {
    return (
      <CenterMessage>
        <Shield className="h-6 w-6 text-destructive" />
        <p className="text-sm font-bold text-destructive">
          حسابك ({authState.email}) لا يملك صلاحية المشرف.
        </p>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold"
        >
          <LogOut className="h-4 w-4" /> تسجيل خروج
        </button>
      </CenterMessage>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={logoKhalij}
              alt="الخليج تيليكوم"
              className="h-10 w-10 shrink-0 rounded-full ring-2 ring-primary/40"
            />
            <span className="truncate text-sm font-extrabold text-primary sm:text-base">
              تحليلات الزوار
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/admin/services"
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-bold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> الخدمات
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-bold"
            >
              <LogOut className="h-3.5 w-3.5" /> خروج
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">
              إحصائيات استخدام الموقع
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              عرض جميع أحداث الزوار وأكثر الخدمات استخدامًا خلال آخر {range} يوم.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-border bg-card">
              {([7, 30, 90] as Range[]).map((n) => (
                <button
                  key={n}
                  onClick={() => setRange(n)}
                  className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                    range === n
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {n} يوم
                </button>
              ))}
            </div>
            <button
              onClick={() => void load()}
              disabled={loading}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5" />
              )}
              تحديث
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
            تعذر تحميل البيانات: {error}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={<Eye className="h-5 w-5" />} label="مشاهدات الصفحات" value={stats.totalViews} />
          <StatCard icon={<Users className="h-5 w-5" />} label="جلسات فريدة" value={stats.uniqueSessions} />
          <StatCard icon={<Zap className="h-5 w-5" />} label="أحداث تفاعل" value={stats.totalEvents} />
        </div>

        <section className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-extrabold">الزوار اليومي</h2>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.days}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="views" name="مشاهدات" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="events" name="أحداث" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <TableCard title="أكثر الصفحات زيارة" empty="لا توجد بيانات بعد">
            <table className="w-full text-right text-xs">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="pb-2">الصفحة</th>
                  <th className="pb-2">المسار</th>
                  <th className="pb-2 text-left">الزيارات</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPages.map((row) => (
                  <tr key={row.path} className="border-t border-border/60">
                    <td className="py-2 font-bold">{row.label}</td>
                    <td className="py-2 text-muted-foreground" dir="ltr">
                      {row.path}
                    </td>
                    <td className="py-2 text-left font-mono font-bold text-primary">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>

          <TableCard title="أكثر الأحداث تكرارًا" empty="لم يتم تسجيل أحداث تفاعل بعد">
            <table className="w-full text-right text-xs">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="pb-2">نوع الحدث</th>
                  <th className="pb-2 text-left">العدد</th>
                </tr>
              </thead>
              <tbody>
                {stats.topEvents.map((row) => (
                  <tr key={row.event_type} className="border-t border-border/60">
                    <td className="py-2 font-bold" dir="ltr">
                      {row.event_type}
                    </td>
                    <td className="py-2 text-left font-mono font-bold text-primary">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>

          {stats.topServices.length > 0 ? (
            <TableCard title="أكثر الخدمات استخدامًا" empty="">
              <table className="w-full text-right text-xs">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="pb-2">معرّف الخدمة</th>
                    <th className="pb-2 text-left">التفاعلات</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topServices.map((row) => (
                    <tr key={row.service_id} className="border-t border-border/60">
                      <td className="py-2 font-bold" dir="ltr">
                        {row.service_id}
                      </td>
                      <td className="py-2 text-left font-mono font-bold text-primary">
                        {row.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableCard>
          ) : null}

          <TableCard title="أحدث الأحداث" empty="لا توجد بيانات بعد">
            <div className="max-h-96 overflow-auto">
              <table className="w-full text-right text-xs">
                <thead className="sticky top-0 bg-card text-muted-foreground">
                  <tr>
                    <th className="pb-2">الوقت</th>
                    <th className="pb-2">الحدث</th>
                    <th className="pb-2">الصفحة</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 100).map((row) => (
                    <tr key={row.id} className="border-t border-border/60">
                      <td className="py-1.5 text-muted-foreground" dir="ltr">
                        {format(new Date(row.created_at), "MM/dd HH:mm")}
                      </td>
                      <td className="py-1.5 font-bold" dir="ltr">
                        {row.event_type}
                      </td>
                      <td className="py-1.5 text-muted-foreground" dir="ltr">
                        {row.path ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableCard>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <span className="text-2xl font-black text-foreground tabular-nums">
          {value.toLocaleString("en-US")}
        </span>
      </div>
      <p className="mt-2 text-xs font-bold text-muted-foreground">{label}</p>
    </div>
  );
}

function TableCard({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h3 className="mb-3 text-sm font-extrabold text-foreground">{title}</h3>
      <div className="min-h-[3rem]">
        {children}
        {empty ? (
          <p className="mt-2 hidden text-center text-xs text-muted-foreground only:block">
            {empty}
          </p>
        ) : null}
      </div>
    </section>
  );
}
