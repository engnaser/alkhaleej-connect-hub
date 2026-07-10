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
  Phone,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import logoKhalij from "@/assets/logo-khalij.png";
import { supabase } from "@/integrations/supabase/client";
import {
  useYouItems,
  createYouItem,
  updateYouItem,
  deleteYouItem,
  SECTION_LABELS,
  type YouItem,
  type YouSection,
} from "@/lib/youServicesStore";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/you-services")({
  head: () => ({
    meta: [
      { title: "إدارة خدمات شركة يو — الخليج تيليكوم" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminYouServicesPage,
});

type AuthState =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "no-admin"; email: string }
  | { status: "admin"; email: string };

function AdminYouServicesPage() {
  const navigate = useNavigate();
  const { items, loading } = useYouItems();
  const [authState, setAuthState] = useState<AuthState>({ status: "loading" });
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [addingIn, setAddingIn] = useState<YouSection | null>(null);
  const [form, setForm] = useState<Partial<YouItem>>({});

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user ?? null;
      if (!active) return;
      if (!user) return setAuthState({ status: "guest" });
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!active) return;
      if (data) setAuthState({ status: "admin", email: user.email ?? "" });
      else setAuthState({ status: "no-admin", email: user.email ?? "" });
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
      toast.error(e instanceof Error ? e.message : "حدث خطأ غير متوقع");
    } finally {
      setBusy(false);
    }
  };

  const startAdd = (section: YouSection) => {
    setEditing(null);
    setAddingIn(section);
    setForm({ section, title: "", description: "", code: "", price: "" });
  };

  const startEdit = (item: YouItem) => {
    setAddingIn(null);
    setEditing(item.id);
    setForm(item);
  };

  const cancel = () => {
    setEditing(null);
    setAddingIn(null);
    setForm({});
  };

  const save = () => {
    if (!form.title?.trim()) {
      toast.error("العنوان مطلوب");
      return;
    }
    guard(async () => {
      if (editing) {
        await updateYouItem(editing, {
          title: form.title!,
          description: form.description ?? null,
          code: form.code ?? null,
          price: form.price ?? null,
        });
        toast.success("تم الحفظ");
      } else if (addingIn) {
        await createYouItem({
          section: addingIn,
          title: form.title!,
          description: form.description ?? null,
          code: form.code ?? null,
          price: form.price ?? null,
        });
        toast.success("تمت الإضافة");
      }
      cancel();
    });
  };

  const remove = (id: string) => {
    if (!confirm("حذف هذا العنصر؟")) return;
    guard(async () => {
      await deleteYouItem(id);
      toast.success("تم الحذف");
    });
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

  const sections: YouSection[] = ["packages", "services", "account", "internet"];

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={logoKhalij}
              alt="الخليج تيليكوم"
              width={40}
              height={40}
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
              to="/you-services"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md hover:scale-[1.03] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              عودة لصفحة يو
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Shield className="h-3.5 w-3.5" />
            تخزين سحابي — يظهر لكل الزوار
          </div>
          <h1 className="text-2xl font-black text-primary sm:text-3xl">
            إدارة خدمات شركة يو
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مسجّل الدخول: <span className="font-bold">{authState.email}</span>
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="ml-2 h-5 w-5 animate-spin" /> جاري التحميل...
          </div>
        ) : (
          <div className="space-y-8">
            {sections.map((section) => {
              const rows = items.filter((i) => i.section === section);
              return (
                <section
                  key={section}
                  className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-lg font-black text-foreground">
                      {SECTION_LABELS[section]}
                      <span className="mr-2 text-sm font-bold text-muted-foreground">
                        ({rows.length})
                      </span>
                    </h2>
                    <button
                      onClick={() => startAdd(section)}
                      disabled={busy || addingIn !== null || editing !== null}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:scale-[1.02] disabled:opacity-60"
                    >
                      <Plus className="h-3.5 w-3.5" /> إضافة
                    </button>
                  </div>

                  {addingIn === section && (
                    <ItemForm form={form} setForm={setForm} onCancel={cancel} onSave={save} busy={busy} />
                  )}

                  <div className="space-y-2">
                    {rows.length === 0 && addingIn !== section && (
                      <p className="rounded-lg border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
                        لا توجد عناصر بعد.
                      </p>
                    )}
                    {rows.map((item) =>
                      editing === item.id ? (
                        <ItemForm
                          key={item.id}
                          form={form}
                          setForm={setForm}
                          onCancel={cancel}
                          onSave={save}
                          busy={busy}
                        />
                      ) : (
                        <ItemRow
                          key={item.id}
                          item={item}
                          onEdit={() => startEdit(item)}
                          onDelete={() => remove(item.id)}
                          disabled={busy}
                        />
                      ),
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

function ItemRow({
  item,
  onEdit,
  onDelete,
  disabled,
}: {
  item: YouItem;
  onEdit: () => void;
  onDelete: () => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl border border-border bg-background/60 p-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-bold text-foreground">{item.title}</h3>
          {item.price && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
              {item.price}
            </span>
          )}
          {item.code && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-foreground">
              <Phone className="h-3 w-3" /> {item.code}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        )}
      </div>
      <div className="flex shrink-0 gap-1.5">
        <button
          onClick={onEdit}
          disabled={disabled}
          className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background text-foreground hover:border-primary/50 hover:text-primary disabled:opacity-60"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onDelete}
          disabled={disabled}
          className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-background text-foreground hover:border-destructive/50 hover:text-destructive disabled:opacity-60"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function ItemForm({
  form,
  setForm,
  onCancel,
  onSave,
  busy,
}: {
  form: Partial<YouItem>;
  setForm: (f: Partial<YouItem>) => void;
  onCancel: () => void;
  onSave: () => void;
  busy: boolean;
}) {
  return (
    <div className="mb-3 space-y-2 rounded-xl border border-primary/40 bg-primary/5 p-3">
      <input
        type="text"
        placeholder="العنوان *"
        value={form.title ?? ""}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
      />
      <textarea
        placeholder="الوصف"
        value={form.description ?? ""}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={2}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="الكود (مثال: *151#)"
          value={form.code ?? ""}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="السعر (مثال: 500 ريال)"
          value={form.price ?? ""}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold"
        >
          <X className="h-3.5 w-3.5" /> إلغاء
        </button>
        <button
          onClick={onSave}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          حفظ
        </button>
      </div>
    </div>
  );
}

function CenterMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      className="grid min-h-screen place-items-center bg-background px-4 text-center"
    >
      <div className="flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        {children}
      </div>
    </div>
  );
}
