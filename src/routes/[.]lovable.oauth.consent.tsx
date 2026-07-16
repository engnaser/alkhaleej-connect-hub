import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type AuthorizationDetails = {
  client?: { name?: string; redirect_uri?: string } | null;
  redirect_url?: string | null;
  redirect_to?: string | null;
  scopes?: string[] | null;
};

type OAuthNamespace = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

function oauthApi(): OAuthNamespace {
  return (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) throw redirect({ to: "/auth", search: { next } });
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main dir="rtl" className="mx-auto max-w-md p-6">
      <h1 className="text-xl font-bold text-destructive">تعذّر تحميل طلب المصادقة</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("لم يُرجع خادم المصادقة عنوان إعادة توجيه.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "التطبيق الخارجي";

  return (
    <main
      dir="rtl"
      className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6"
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
        <h1 className="text-2xl font-black text-primary">
          ربط {clientName} بحسابك
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          سيتمكن <strong>{clientName}</strong> من استخدام هذا التطبيق نيابةً عنك
          مع احترام صلاحياتك ضمن التطبيق.
        </p>
        {details?.client?.redirect_uri && (
          <p className="mt-2 break-all text-xs text-muted-foreground">
            عنوان الإرجاع: <code>{details.client.redirect_uri}</code>
          </p>
        )}
        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-destructive/10 p-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="mt-6 flex gap-3">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md disabled:opacity-60"
          >
            موافقة
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-bold text-foreground disabled:opacity-60"
          >
            رفض
          </button>
        </div>
      </div>
    </main>
  );
}
