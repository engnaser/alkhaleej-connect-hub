import { useCallback, useEffect, useState } from "react";
import {
  Hash,
  Wallet,
  Send,
  Globe2,
  MessageSquare,
  CreditCard,
  PhoneCall,
  RefreshCw,
  Gauge,
  HelpCircle,
  Wifi,
  Phone,
  Smartphone,
  Settings2,
  Sparkles,
  Package,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export type ServiceGroup = "general" | "account";

export type YMServiceRow = {
  id: string;
  group: ServiceGroup;
  icon: string;
  title: string;
  description: string;
  code?: string | null;
  deactivation_code?: string | null;
  sort_order: number;
};

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Hash,
  Wallet,
  Send,
  Globe2,
  MessageSquare,
  CreditCard,
  PhoneCall,
  RefreshCw,
  Gauge,
  HelpCircle,
  Wifi,
  Phone,
  Smartphone,
  Settings2,
  Sparkles,
  Package,
};

export const ICON_OPTIONS = Object.keys(SERVICE_ICONS);

export function iconFor(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? HelpCircle;
}

const CHANGE_EVENT = "ym_services_changed";
function emitChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }
}

export function makeServiceId() {
  return `svc-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

async function fetchServices(): Promise<YMServiceRow[]> {
  const { data, error } = await supabase
    .from("ym_services")
    .select("id,group_key,icon,title,description,code,deactivation_code,sort_order")
    .order("group_key", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.id,
    group: r.group_key as ServiceGroup,
    icon: r.icon,
    title: r.title,
    description: r.description,
    code: r.code,
    deactivation_code: (r as { deactivation_code?: string | null }).deactivation_code ?? null,
    sort_order: r.sort_order,
  }));
}

export function useServicesStore() {
  const [services, setServices] = useState<YMServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchServices();
      setServices(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذّر تحميل الخدمات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const sync = () => refresh();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, [refresh]);

  return { services, loading, error, refresh };
}

function payload(s: YMServiceRow) {
  return {
    id: s.id,
    group_key: s.group,
    icon: s.icon,
    title: s.title,
    description: s.description ?? "",
    code: s.code && s.code.trim() ? s.code : null,
    deactivation_code:
      s.deactivation_code && s.deactivation_code.trim()
        ? s.deactivation_code
        : null,
    sort_order: s.sort_order,
  };
}

export async function createService(s: YMServiceRow) {
  const { error } = await supabase.from("ym_services").insert(payload(s));
  if (error) throw error;
  emitChange();
}

export async function updateService(s: YMServiceRow) {
  const { error } = await supabase
    .from("ym_services")
    .update(payload(s))
    .eq("id", s.id);
  if (error) throw error;
  emitChange();
}

export async function deleteService(id: string) {
  const { error } = await supabase.from("ym_services").delete().eq("id", id);
  if (error) throw error;
  emitChange();
}
