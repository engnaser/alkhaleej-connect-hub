import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "khalij:analytics_sid";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = window.sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      window.sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return "";
  }
}

type TrackPayload = {
  event_type: string;
  path?: string;
  service_id?: string | null;
  meta?: Record<string, unknown> | null;
};

/** Fire-and-forget analytics event. Never throws, never blocks the UI. */
export function trackEvent(payload: TrackPayload): void {
  if (typeof window === "undefined") return;
  const row = {
    event_type: payload.event_type,
    path: payload.path ?? window.location.pathname,
    service_id: payload.service_id ?? null,
    meta: payload.meta ?? null,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent || null,
    session_id: getSessionId() || null,
  };

  // Best-effort insert; ignore failures so tracking never breaks the page.
  void supabase
    .from("analytics_events")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert(row as any)
    .then(({ error }) => {
      if (error && import.meta.env.DEV) {
        console.warn("[analytics] insert failed", error.message);
      }
    });
}

export function trackPageView(path: string): void {
  trackEvent({ event_type: "page_view", path });
}
