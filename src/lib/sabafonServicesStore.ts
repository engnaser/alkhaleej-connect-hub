import { useEffect, useState } from "react";
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

export type SabafonSection = "packages" | "services" | "account" | "internet";

export interface SabafonItem {
  id: string;
  section: SabafonSection;
  title: string;
  description: string | null;
  code: string | null;
  price: string | null;
  icon: string;
  deactivation_code: string | null;
  sort_order: number;
}

export const SABAFON_SERVICE_ICONS: Record<string, LucideIcon> = {
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

export const SABAFON_ICON_OPTIONS = Object.keys(SABAFON_SERVICE_ICONS);

export function sabafonIconFor(name: string): LucideIcon {
  return SABAFON_SERVICE_ICONS[name] ?? HelpCircle;
}

export function makeSabafonItemId() {
  return `sabafon-svc-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

let cache: SabafonItem[] | null = null;
const listeners = new Set<() => void>();

async function fetchAll(): Promise<SabafonItem[]> {
  const { data, error } = await supabase
    .from("sabafon_services_items")
    .select(
      "id, section, title, description, code, price, icon, deactivation_code, sort_order",
    )
    .order("section", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.id,
    section: r.section as SabafonSection,
    title: r.title,
    description: r.description,
    code: r.code,
    price: r.price,
    icon: (r as { icon?: string | null }).icon ?? "HelpCircle",
    deactivation_code:
      (r as { deactivation_code?: string | null }).deactivation_code ?? null,
    sort_order: r.sort_order,
  }));
}

export async function refreshSabafonItems() {
  cache = await fetchAll();
  listeners.forEach((l) => l());
}

export function useSabafonItems(section?: SabafonSection) {
  const [items, setItems] = useState<SabafonItem[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    const sync = () => setItems(cache ?? []);
    listeners.add(sync);
    if (cache === null) {
      refreshSabafonItems()
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    const channel = supabase
      .channel("sabafon_services_items_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sabafon_services_items" },
        () => {
          refreshSabafonItems().catch(() => {});
        },
      )
      .subscribe();
    return () => {
      listeners.delete(sync);
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = section ? items.filter((i) => i.section === section) : items;
  return { items: filtered, loading, refresh: refreshSabafonItems };
}

function payload(input: Partial<SabafonItem>) {
  return {
    section: input.section,
    title: input.title,
    description: input.description ?? null,
    code: input.code && input.code.trim() ? input.code : null,
    price: input.price && input.price.trim() ? input.price : null,
    icon: input.icon || "HelpCircle",
    deactivation_code:
      input.deactivation_code && input.deactivation_code.trim()
        ? input.deactivation_code
        : null,
  };
}

export async function createSabafonItem(
  input: Omit<SabafonItem, "id" | "sort_order"> & { sort_order?: number },
) {
  const { error } = await supabase.from("sabafon_services_items").insert({
    section: input.section,
    title: input.title,
    description: input.description ?? null,
    code: input.code && input.code.trim() ? input.code : null,
    price: input.price && input.price.trim() ? input.price : null,
    icon: input.icon || "HelpCircle",
    deactivation_code:
      input.deactivation_code && input.deactivation_code.trim()
        ? input.deactivation_code
        : null,
    sort_order: input.sort_order ?? Date.now(),
  });
  if (error) throw error;
  await refreshSabafonItems();
}

export async function updateSabafonItem(id: string, patch: Partial<SabafonItem>) {
  const { error } = await supabase
    .from("sabafon_services_items")
    .update(payload(patch))
    .eq("id", id);
  if (error) throw error;
  await refreshSabafonItems();
}

export async function deleteSabafonItem(id: string) {
  const { error } = await supabase.from("sabafon_services_items").delete().eq("id", id);
  if (error) throw error;
  await refreshSabafonItems();
}

export const SECTION_LABELS: Record<SabafonSection, string> = {
  packages: "تفعيل الباقات",
  services: "الخدمات",
  account: "أسعار ومعلومات",
  internet: "ضبط الإنترنت",
};

