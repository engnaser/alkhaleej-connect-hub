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
  useSabafonItems,
  createSabafonItem,
  updateSabafonItem,
  deleteSabafonItem,
  makeSabafonItemId,
  sabafonIconFor,
  SABAFON_ICON_OPTIONS,
  SECTION_LABELS,
  type SabafonItem,
  type SabafonSection,
} from "@/lib/sabafonServicesStore";

export const Route = createFileRoute("/admin/sabafon-services")({
  head: () => ({
    meta: [
      { title: "إدارة خدمات شركة سبافون — الخليج تيليكوم" },
      {
        name: "description",
        content: "لوحة تحكم لإضافة وتعديل وحذف خدمات شركة سبافون.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminSabafonServicesPage,
});

const emptyItem = (section: SabafonSection): SabafonItem => ({
  id: makeSabafonItemId(),
  section,
  icon: "HelpCircle",
  title: "",
  description: "",
  code: "",
  price: "",
  deactivation_code: "",
  sort_order: Date.now(),
});

function AdminSabafonServicesPage() {
  const navigate = useNavigate();
  const { items, loading, refresh } = useSabafonItems();
  const [authState, setAuthState] = useState<
    | { status: "loading" }
    | { status: "guest" }
    | { status: "no-admin"; email: string }
    | { status: "admin"; email: string }
  >({ status: "loading" });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingSection, setAddingSection] = useState<SabafonSection | null>(null);
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

  const sections: SabafonSection[] = ["packages", "services", "account", "internet"];

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
              to="/sabafon-services"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md hover:scale-[1.03] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              عودة لخدمات شركة سبافون
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
            إدارة خدمات شركة سبافون
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مسجّل الدخول: <span className="font-bold">{authState.email}</span>
          </p>
        </div>

        {loading && items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            جاري التحميل...
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => {
              const list = items.filter((s) => s.section === section);
              return (
                <section
                  key={section}
                  className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
                >
                  <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-extrabold text-foreground">
                        {SECTION_LABELS[section]}
                      </h2>
                      <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        {list.length} عناصر
                      </span>
                    </div>
                    <button
                      onClick={() => setAddingSection(section)}
                      disabled={busy}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:scale-[1.02] disabled:opacity-60"
                    >
                      <Plus className="h-4 w-4" />
                      إضافة عنصر
                    </button>
                  </div>

                  <div className="space-y-3 p-5">
                    {addingSection === section && (
                      <ItemForm
                        initial={emptyItem(section)}
                        onCancel={() => setAddingSection(null)}
                        onSave={(s) =>
                          guard(async () => {
                            await createSabafonItem({
                              section: s.section,
                              icon: s.icon,
                              title: s.title,
                              description: s.description,
                              code: s.code,
                              price: s.price,
                              deactivation_code: s.deactivation_code,
                            });
                            await refresh();
                            setAddingSection(null);
                          })
                        }
                      />
                    )}

                    {list.length === 0 && addingSection !== section ? (
                      <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                        لا توجد عناصر بعد.
                      </div>
                    ) : (
                      <div className="grid gap-3 md:grid-cols-2">
                        {list.map((s) =>
                          editingId === s.id ? (
                            <ItemForm
                              key={s.id}
                              initial={s}
                              onCancel={() => setEditingId(null)}
                              onSave={(updated) =>
                                guard(async () => {
                                  await updateSabafonItem(updated.id, {
                                    section: updated.section,
                                    icon: updated.icon,
                                    title: updated.title,
                                    description: updated.description,
                                    code: updated.code,
                                    price: updated.price,
                                    deactivation_code: updated.deactivation_code,
                                  });
                                  await refresh();
                                  setEditingId(null);
                                })
                              }
                            />
                          ) : (
                            <ItemRow
                              key={s.id}
                              item={s}
                              onEdit={() => setEditingId(s.id)}
                              onDelete={() =>
                                guard(async () => {
                                  if (!confirm("هل أنت متأكد من حذف هذا العنصر؟"))
                                    return;
                                  await deleteSabafonItem(s.id);
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

function ItemRow({
  item,
  onEdit,
  onDelete,
}: {
  item: SabafonItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const Icon = sabafonIconFor(item.icon);
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-extrabold text-foreground">{item.title}</div>
            <div className="mt-0.5 flex flex-wrap gap-1.5">
              {item.code && (
                <span
                  dir="ltr"
                  className="font-mono text-xs font-bold text-primary"
                >
                  {item.code}
                </span>
              )}
              {item.price && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                  {item.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {item.description && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      )}
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

function ItemForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: SabafonItem;
  onCancel: () => void;
  onSave: (s: SabafonItem) => void;
}) {
  const [s, setS] = useState<SabafonItem>(initial);
  const PreviewIcon = sabafonIconFor(s.icon);

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
        <Field label="السعر (اختياري)">
          <input
            value={s.price ?? ""}
            onChange={(e) => setS({ ...s, price: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="500 ريال"
          />
        </Field>
        <Field label="كود التفعيل (اختياري)">
          <input
            value={s.code ?? ""}
            onChange={(e) => setS({ ...s, code: e.target.value })}
            dir="ltr"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"
            placeholder="*111#"
          />
        </Field>
        <Field label="كود إلغاء التفعيل (اختياري)">
          <input
            value={s.deactivation_code ?? ""}
            onChange={(e) =>
              setS({ ...s, deactivation_code: e.target.value })
            }
            dir="ltr"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"
            placeholder="*111*0#"
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
              {SABAFON_ICON_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="القسم">
          <select
            value={s.section}
            onChange={(e) =>
              setS({ ...s, section: e.target.value as SabafonSection })
            }
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {(Object.keys(SECTION_LABELS) as SabafonSection[]).map((k) => (
              <option key={k} value={k}>
                {SECTION_LABELS[k]}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="الوصف">
            <textarea
              value={s.description ?? ""}
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-bold text-muted-foreground">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}
