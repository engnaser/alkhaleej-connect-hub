import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  Shield,
  LogOut,
  Loader2,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import logoKhalij from "@/assets/logo-khalij.png";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentAdminState } from "@/lib/packagesStore";
import {
  useServicesStore,
  createService,
  updateService,
  deleteService,
  makeServiceId,
  iconFor,
  ICON_OPTIONS,
  type YMServiceRow,
  type ServiceGroup,
} from "@/lib/servicesStore";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [
      { title: "إدارة خدمات يمن موبايل — الخليج تيليكوم" },
      {
        name: "description",
        content: "لوحة تحكم لإضافة وتعديل وحذف خدمات يمن موبايل.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminServicesPage,
});

const GROUP_LABELS: Record<ServiceGroup, string> = {
  general: "الخدمات العامة",
  account: "إدارة الحساب والرصيد",
};

const emptyService = (group: ServiceGroup): YMServiceRow => ({
  id: makeServiceId(),
  group,
  icon: "HelpCircle",
  title: "",
  description: "",
  code: "",
  sort_order: Date.now(),
});

function AdminServicesPage() {
  const navigate = useNavigate();
  const { services, loading, refresh } = useServicesStore();
  const [authState, setAuthState] = useState<
    | { status: "loading" }
    | { status: "guest" }
    | { status: "no-admin"; email: string }
    | { status: "admin"; email: string }
  >({ status: "loading" });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingGroup, setAddingGroup] = useState<ServiceGroup | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { user, isAdmin } = await getCurrentAdminState();
      if (!active) return;
      if (!user) setAuthState({ status: "guest" });
      else if (!isAdmin)
        setAuthState({ status: "no-admin", email: user.email ?? "" });
      else setAuthState({ status: "admin", email: user.email ?? "" });
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const guard = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      alert(e instanceof Error ? e.message : "حدث خطأ غير متوقع");
    } finally {
      setBusy(false);
    }
  };

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
        <p className="text-sm font-bold">
          لوحة الإدارة محمية. سجّل الدخول كمشرف أولًا.
        </p>
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

  const groups: ServiceGroup[] = ["general", "account"];

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
              الخليج تيليكوم
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-destructive/40 hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" />
              خروج
            </button>
            <Link
              to="/yemen-mobile"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md hover:scale-[1.03] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              عودة لخدمات يمن موبايل
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Shield className="h-3.5 w-3.5" />
            تخزين سحابي — يظهر لكل الزوار
          </div>
          <h1 className="text-2xl font-black text-primary sm:text-3xl">
            إدارة خدمات يمن موبايل
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مسجّل الدخول: <span className="font-bold">{authState.email}</span>
          </p>
        </div>

        {loading && services.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            جاري التحميل...
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map((group) => {
              const list = services.filter((s) => s.group === group);
              return (
                <section
                  key={group}
                  className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
                >
                  <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-extrabold text-foreground">
                        {GROUP_LABELS[group]}
                      </h2>
                      <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        {list.length} خدمات
                      </span>
                    </div>
                    <button
                      onClick={() => setAddingGroup(group)}
                      disabled={busy}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:scale-[1.02] disabled:opacity-60"
                    >
                      <Plus className="h-4 w-4" />
                      إضافة خدمة
                    </button>
                  </div>

                  <div className="space-y-3 p-5">
                    {addingGroup === group && (
                      <ServiceForm
                        initial={emptyService(group)}
                        onCancel={() => setAddingGroup(null)}
                        onSave={(s) =>
                          guard(async () => {
                            await createService(s);
                            await refresh();
                            setAddingGroup(null);
                          })
                        }
                      />
                    )}

                    {list.length === 0 && addingGroup !== group ? (
                      <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                        لا توجد خدمات بعد.
                      </div>
                    ) : (
                      <div className="grid gap-3 md:grid-cols-2">
                        {list.map((s) =>
                          editingId === s.id ? (
                            <ServiceForm
                              key={s.id}
                              initial={s}
                              onCancel={() => setEditingId(null)}
                              onSave={(updated) =>
                                guard(async () => {
                                  await updateService(updated);
                                  await refresh();
                                  setEditingId(null);
                                })
                              }
                            />
                          ) : (
                            <ServiceRow
                              key={s.id}
                              service={s}
                              onEdit={() => setEditingId(s.id)}
                              onDelete={() =>
                                guard(async () => {
                                  if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟"))
                                    return;
                                  await deleteService(s.id);
                                  await refresh();
                                })
                              }
                            />
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function CenterMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      className="grid min-h-screen place-items-center bg-background px-4 text-foreground"
    >
      <div className="flex max-w-sm flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
        {children}
      </div>
    </div>
  );
}

function ServiceRow({
  service,
  onEdit,
  onDelete,
}: {
  service: YMServiceRow;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const Icon = iconFor(service.icon);
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-extrabold text-foreground">{service.title}</div>
            {service.code && (
              <div
                dir="ltr"
                className="mt-0.5 font-mono text-xs font-bold text-primary"
              >
                {service.code}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={onEdit}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          <Pencil className="h-3.5 w-3.5" />
          تعديل
        </button>
        <button
          onClick={onDelete}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold text-destructive hover:border-destructive/50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          حذف
        </button>
      </div>
    </div>
  );
}

function ServiceForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: YMServiceRow;
  onCancel: () => void;
  onSave: (s: YMServiceRow) => void;
}) {
  const [s, setS] = useState<YMServiceRow>(initial);
  const PreviewIcon = iconFor(s.icon);

  return (
    <div className="rounded-xl border border-primary/30 bg-background p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="العنوان">
          <input
            value={s.title}
            onChange={(e) => setS({ ...s, title: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="اسم الخدمة"
          />
        </Field>
        <Field label="الكود (اختياري)">
          <input
            value={s.code ?? ""}
            onChange={(e) => setS({ ...s, code: e.target.value })}
            dir="ltr"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"
            placeholder="*111#"
          />
        </Field>
        <Field label="الأيقونة">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <PreviewIcon className="h-5 w-5" />
            </div>
            <select
              value={s.icon}
              onChange={(e) => setS({ ...s, icon: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              {ICON_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="القسم">
          <select
            value={s.group}
            onChange={(e) =>
              setS({ ...s, group: e.target.value as ServiceGroup })
            }
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="general">الخدمات العامة</option>
            <option value="account">إدارة الحساب والرصيد</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="الوصف">
            <textarea
              value={s.description}
              onChange={(e) => setS({ ...s, description: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              placeholder="وصف مختصر للخدمة"
            />
          </Field>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            if (!s.title.trim()) {
              alert("الرجاء إدخال عنوان الخدمة");
              return;
            }
            onSave(s);
          }}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground hover:scale-[1.02]"
        >
          <Save className="h-4 w-4" />
          حفظ
        </button>
        <button
          onClick={onCancel}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold text-foreground hover:border-destructive/40 hover:text-destructive"
        >
          <X className="h-4 w-4" />
          إلغاء
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold text-muted-foreground">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}
