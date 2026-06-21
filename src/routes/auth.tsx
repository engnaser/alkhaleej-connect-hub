import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoKhalij from "@/assets/logo-khalij.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل دخول المسؤول | الخليج تيليكوم" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // Redirect when already signed in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/packages" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        navigate({ to: "/admin/packages" });
      } else {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (err) throw err;
        if (data.session) {
          navigate({ to: "/admin/packages" });
        } else {
          setInfo("تم إنشاء الحساب. إذا طُلب تأكيد البريد، أكّده ثم سجّل الدخول.");
          setMode("signin");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
        <Link to="/" className="mb-6 flex items-center justify-center gap-3">
          <img src={logoKhalij} alt="الخليج تيليكوم" className="h-12 w-12 rounded-full ring-2 ring-primary/40" />
          <span className="text-lg font-extrabold text-primary">الخليج تيليكوم</span>
        </Link>

        <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-8">
          <div className="mb-6 text-center">
            <div
              className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full text-primary"
              style={{ background: "color-mix(in oklab, var(--primary) 14%, transparent)" }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black text-primary">
              {mode === "signin" ? "تسجيل دخول المسؤول" : "إنشاء حساب مسؤول"}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {mode === "signin"
                ? "دخولك يفعّل لوحة إدارة الباقات."
                : "أول حساب يتم إنشاؤه يصبح مشرفًا تلقائيًا."}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-right text-sm font-bold">البريد الإلكتروني</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
                className="block w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-left text-sm font-semibold outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-right text-sm font-bold">كلمة المرور</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr"
                className="block w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-left text-sm font-semibold outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </label>

            {error && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-right text-xs font-bold text-destructive">
                {error}
              </div>
            )}
            {info && (
              <div className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-right text-xs font-bold text-primary">
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {loading ? "..." : mode === "signin" ? "دخول" : "إنشاء الحساب"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "signin" ? "signup" : "signin"));
              setError(null);
              setInfo(null);
            }}
            className="mt-4 block w-full text-center text-xs font-bold text-muted-foreground hover:text-primary"
          >
            {mode === "signin"
              ? "ليس لديك حساب؟ إنشاء حساب مسؤول جديد"
              : "لديك حساب؟ سجّل الدخول"}
          </button>
        </div>

        <Link to="/" className="mt-6 text-center text-xs font-bold text-muted-foreground hover:text-primary">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

