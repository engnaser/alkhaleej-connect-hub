import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  RotateCcw,
  FolderPlus,
  Shield,
  LogOut,
  Loader2,
  GripVertical,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import logoKhalij from "@/assets/logo-khalij.png";
import { supabase } from "@/integrations/supabase/client";
import {
  usePackagesStore,
  makeId,
  NETWORK_OPTIONS,
  getCurrentAdminState,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  createPackage,
  updatePackage,
  deletePackage,
  resetToDefaults,
  type YMCategory,
  type YMPackage,
  type NetworkType,
} from "@/lib/packagesStore";

export const Route = createFileRoute("/admin/packages")({
  head: () => ({
    meta: [
      { title: "إدارة باقات يمن موبايل — الخليج تيليكوم" },
      {
        name: "description",
        content: "لوحة تحكم لإضافة وتعديل وحذف باقات يمن موبايل.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPackagesPage,
});

const emptyPackage = (): YMPackage => ({
  id: makeId("pkg"),
  name: "",
  price: "",
  internet: "—",
  minutes: "—",
  sms: "—",
  validity: "",
  network: "4G",
  code: "",
});

function AdminPackagesPage() {
  const navigate = useNavigate();
  const { categories, loading, refresh } = usePackagesStore();
  const [authState, setAuthState] = useState<
    | { status: "loading" }
    | { status: "guest" }
    | { status: "no-admin"; email: string }
    | { status: "admin"; email: string }
  >({ status: "loading" });

  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editingPkg, setEditingPkg] = useState<string | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const handleDropCategory = (targetId: string) => {
    if (!dragId || dragId === targetId) {
      setDragId(null);
      setOverId(null);
      return;
    }
    const ids = categories.map((c) => c.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(targetId);
    setDragId(null);
    setOverId(null);
    if (from < 0 || to < 0) return;
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    guard(async () => {
      await reorderCategories(ids);
      await refresh();
    });
  };

  const moveCategory = (id: string, dir: -1 | 1) => {
    const ids = categories.map((c) => c.id);
    const idx = ids.indexOf(id);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= ids.length) return;
    [ids[idx], ids[target]] = [ids[target], ids[idx]];
    guard(async () => {
      await reorderCategories(ids);
      await refresh();
    });
  };

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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Shield className="h-3.5 w-3.5" />
              تخزين سحابي — يظهر لكل الزوار
            </div>
            <h1 className="text-2xl font-black text-primary sm:text-3xl">
              إدارة باقات يمن موبايل
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              مسجّل الدخول: <span className="font-bold">{authState.email}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setNewCatOpen(true)}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:scale-[1.02] disabled:opacity-60"
            >
              <FolderPlus className="h-4 w-4" />
              إضافة قسم
            </button>
            <button
              onClick={() =>
                guard(async () => {
                  if (
                    !confirm(
                      "سيتم حذف كل الأقسام والباقات الحالية واستعادة البيانات الافتراضية. هل تريد المتابعة؟",
                    )
                  )
                    return;
                  await resetToDefaults();
                  await refresh();
                })
              }
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold text-foreground hover:border-destructive/50 hover:text-destructive disabled:opacity-60"
            >
              <RotateCcw className="h-4 w-4" />
              استعادة الافتراضي
            </button>
          </div>
        </div>

        {newCatOpen && (
          <CategoryForm
            initial={{ title: "", description: "" }}
            onCancel={() => setNewCatOpen(false)}
            onSave={(data) =>
              guard(async () => {
                await createCategory(data);
                await refresh();
                setNewCatOpen(false);
              })
            }
          />
        )}

        {loading && categories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            جاري التحميل...
          </div>
        ) : (
          <div className="space-y-5">
            {categories.map((cat) => (
              <section
                key={cat.id}
                className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
              >
                <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-start sm:justify-between">
                  {editingCat === cat.id ? (
                    <CategoryForm
                      initial={{
                        title: cat.title,
                        description: cat.description ?? "",
                      }}
                      onCancel={() => setEditingCat(null)}
                      onSave={(data) =>
                        guard(async () => {
                          await updateCategory(cat.id, {
                            title: data.title,
                            description: data.description ?? null,
                          });
                          await refresh();
                          setEditingCat(null);
                        })
                      }
                      inline
                    />
                  ) : (
                    <>
                      <div>
                        <h2 className="text-lg font-extrabold text-foreground">
                          {cat.title}
                        </h2>
                        {cat.description && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {cat.description}
                          </p>
                        )}
                        <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                          {cat.packages.length} باقات
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setAdding(cat.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/20"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          باقة
                        </button>
                        <button
                          onClick={() => setEditingCat(cat.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          تعديل
                        </button>
                        <button
                          onClick={() =>
                            guard(async () => {
                              if (
                                !confirm(
                                  "هل أنت متأكد من حذف هذا القسم وكل الباقات بداخله؟",
                                )
                              )
                                return;
                              await deleteCategory(cat.id);
                              await refresh();
                            })
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold text-destructive hover:border-destructive/50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          حذف القسم
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3 p-5">
                  {adding === cat.id && (
                    <PackageForm
                      initial={emptyPackage()}
                      onCancel={() => setAdding(null)}
                      onSave={(pkg) =>
                        guard(async () => {
                          await createPackage(cat.id, pkg);
                          await refresh();
                          setAdding(null);
                        })
                      }
                    />
                  )}
                  {cat.packages.length === 0 && adding !== cat.id ? (
                    <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                      لا توجد باقات بعد. اضغط "باقة" لإضافة واحدة.
                    </div>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2">
                      {cat.packages.map((pkg) =>
                        editingPkg === pkg.id ? (
                          <PackageForm
                            key={pkg.id}
                            initial={pkg}
                            onCancel={() => setEditingPkg(null)}
                            onSave={(p) =>
                              guard(async () => {
                                await updatePackage(cat.id, p);
                                await refresh();
                                setEditingPkg(null);
                              })
                            }
                          />
                        ) : (
                          <PackageRow
                            key={pkg.id}
                            pkg={pkg}
                            onEdit={() => setEditingPkg(pkg.id)}
                            onDelete={() =>
                              guard(async () => {
                                if (!confirm("هل أنت متأكد من حذف هذه الباقة؟"))
                                  return;
                                await deletePackage(pkg.id);
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
            ))}
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

function PackageRow({
  pkg,
  onEdit,
  onDelete,
}: {
  pkg: YMPackage;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="font-extrabold text-foreground">{pkg.name}</div>
          <div className="text-lg font-black text-primary">{pkg.price}</div>
        </div>
        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary">
          {pkg.network}
        </span>
      </div>
      <ul className="space-y-1 text-xs text-foreground/80">
        <li>الإنترنت: <span className="font-bold">{pkg.internet}</span></li>
        <li>الدقائق: <span className="font-bold">{pkg.minutes}</span></li>
        <li>الرسائل: <span className="font-bold">{pkg.sms}</span></li>
        <li>الصلاحية: <span className="font-bold">{pkg.validity}</span></li>
        {pkg.code && (
          <li>
            الكود:{" "}
            <span dir="ltr" className="font-mono font-bold text-primary">
              {pkg.code}
            </span>
          </li>
        )}
      </ul>
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

function CategoryForm({
  initial,
  onCancel,
  onSave,
  inline,
}: {
  initial: { title: string; description: string };
  onCancel: () => void;
  onSave: (data: { title: string; description?: string }) => void;
  inline?: boolean;
}) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);

  const submit = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim().slice(0, 100),
      description: description.trim().slice(0, 300) || undefined,
    });
  };

  return (
    <div
      className={
        inline
          ? "w-full space-y-3"
          : "mb-5 space-y-3 rounded-2xl border border-primary/30 bg-card p-5"
      }
    >
      {!inline && (
        <h3 className="text-base font-extrabold text-primary">قسم جديد</h3>
      )}
      <Field label="اسم القسم">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="مثال: باقات مزايا فورجي"
        />
      </Field>
      <Field label="وصف مختصر (اختياري)">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={300}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
      </Field>
      <div className="flex gap-2">
        <button
          onClick={submit}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
        >
          <Save className="h-3.5 w-3.5" />
          حفظ
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold text-foreground"
        >
          <X className="h-3.5 w-3.5" />
          إلغاء
        </button>
      </div>
    </div>
  );
}

function PackageForm({
  initial,
  onCancel,
  onSave,
}: {
  initial: YMPackage;
  onCancel: () => void;
  onSave: (pkg: YMPackage) => void;
}) {
  const [form, setForm] = useState<YMPackage>(initial);
  const set = <K extends keyof YMPackage>(k: K, v: YMPackage[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name.trim() || !form.price.trim()) {
      alert("الرجاء إدخال اسم الباقة والسعر على الأقل.");
      return;
    }
    onSave({
      ...form,
      name: form.name.trim().slice(0, 100),
      price: form.price.trim().slice(0, 50),
      internet: form.internet.trim().slice(0, 50) || "—",
      minutes: form.minutes.trim().slice(0, 50) || "—",
      sms: form.sms.trim().slice(0, 50) || "—",
      validity: form.validity.trim().slice(0, 50),
      code: form.code?.trim().slice(0, 30) || "",
    });
  };

  return (
    <div className="space-y-3 rounded-xl border border-primary/40 bg-card p-4 md:col-span-2">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="اسم الباقة">
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            maxLength={100}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </Field>
        <Field label="السعر">
          <input
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            maxLength={50}
            placeholder="مثال: 500 ريال"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </Field>
        <Field label="الإنترنت">
          <input
            value={form.internet}
            onChange={(e) => set("internet", e.target.value)}
            maxLength={50}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </Field>
        <Field label="الدقائق">
          <input
            value={form.minutes}
            onChange={(e) => set("minutes", e.target.value)}
            maxLength={50}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </Field>
        <Field label="الرسائل">
          <input
            value={form.sms}
            onChange={(e) => set("sms", e.target.value)}
            maxLength={50}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </Field>
        <Field label="الصلاحية">
          <input
            value={form.validity}
            onChange={(e) => set("validity", e.target.value)}
            maxLength={50}
            placeholder="مثال: 7 أيام"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </Field>
        <Field label="نوع الشبكة">
          <select
            value={form.network}
            onChange={(e) => set("network", e.target.value as NetworkType)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {NETWORK_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field label="كود التفعيل (اختياري)">
          <input
            value={form.code ?? ""}
            onChange={(e) => set("code", e.target.value)}
            maxLength={30}
            dir="ltr"
            placeholder="*500#"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"
          />
        </Field>
      </div>
      <div className="flex gap-2">
        <button
          onClick={submit}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
        >
          <Save className="h-3.5 w-3.5" />
          حفظ الباقة
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold text-foreground"
        >
          <X className="h-3.5 w-3.5" />
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
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

// Suppress unused import warning when category type is exported elsewhere
export type _Unused = YMCategory;
