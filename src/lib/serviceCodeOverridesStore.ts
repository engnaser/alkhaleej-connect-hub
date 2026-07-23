import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type CodeKind = "activate" | "cancel";
export type CodeType = "code" | "template";

type Key = string; // `${serviceId}::${kind}::${codeType}`
const keyOf = (id: string, kind: CodeKind, codeType: CodeType): Key =>
  `${id}::${kind}::${codeType}`;

const CHANGE_EVENT = "service-code-overrides-changed";

let cache: Map<Key, string> | null = null;
let inflight: Promise<void> | null = null;

async function loadAll(): Promise<void> {
  const { data, error } = await supabase
    .from("service_code_overrides")
    .select("service_id, kind, code_type, value");
  if (error) {
    if (!cache) cache = new Map();
    return;
  }
  const next = new Map<Key, string>();
  for (const r of data ?? []) {
    next.set(keyOf(r.service_id, r.kind as CodeKind, r.code_type as CodeType), r.value);
  }
  cache = next;
}

export function ensureLoaded(): Promise<void> {
  if (cache) return Promise.resolve();
  if (!inflight) {
    inflight = loadAll().finally(() => {
      inflight = null;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(CHANGE_EVENT));
      }
    });
  }
  return inflight;
}

export function getOverride(
  id: string,
  kind: CodeKind,
  codeType: CodeType,
): string | undefined {
  return cache?.get(keyOf(id, kind, codeType));
}

export async function setOverride(
  id: string,
  kind: CodeKind,
  codeType: CodeType,
  value: string,
): Promise<void> {
  const { error } = await supabase
    .from("service_code_overrides")
    .upsert(
      { service_id: id, kind, code_type: codeType, value },
      { onConflict: "service_id,kind,code_type" },
    );
  if (error) throw error;
  if (!cache) cache = new Map();
  cache.set(keyOf(id, kind, codeType), value);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

export async function clearOverride(
  id: string,
  kind: CodeKind,
  codeType: CodeType,
): Promise<void> {
  const { error } = await supabase
    .from("service_code_overrides")
    .delete()
    .eq("service_id", id)
    .eq("kind", kind)
    .eq("code_type", codeType);
  if (error) throw error;
  cache?.delete(keyOf(id, kind, codeType));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

let realtimeStarted = false;
function startRealtime() {
  if (realtimeStarted || typeof window === "undefined") return;
  realtimeStarted = true;
  supabase
    .channel("service_code_overrides_realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "service_code_overrides" },
      () => {
        loadAll().then(() => {
          window.dispatchEvent(new Event(CHANGE_EVENT));
        });
      },
    )
    .subscribe();
}

export function useOverride(
  id: string,
  kind: CodeKind,
  codeType: CodeType,
  defaultValue: string,
): string {
  const [value, setValue] = useState<string>(
    () => cache?.get(keyOf(id, kind, codeType)) ?? defaultValue,
  );

  useEffect(() => {
    startRealtime();
    const sync = () => {
      setValue(cache?.get(keyOf(id, kind, codeType)) ?? defaultValue);
    };
    ensureLoaded().then(sync);
    if (typeof window !== "undefined") {
      window.addEventListener(CHANGE_EVENT, sync);
      return () => window.removeEventListener(CHANGE_EVENT, sync);
    }
  }, [id, kind, codeType, defaultValue]);

  return value;
}
