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

export type YouSection = "packages" | "services" | "account" | "internet";

export interface YouItem {
  id: string;
  section: YouSection;
  title: string;
  description: string | null;
  code: string | null;
  price: string | null;
  icon: string;
  deactivation_code: string | null;
  sort_order: number;
}

export const YOU_SERVICE_ICONS: Record<string, LucideIcon> = {
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

export const YOU_ICON_OPTIONS = Object.keys(YOU_SERVICE_ICONS);

export function youIconFor(name: string): LucideIcon {
  return YOU_SERVICE_ICONS[name] ?? HelpCircle;
}

export function makeYouItemId() {
  return `you-svc-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

let cache: YouItem[] | null = null;
const listeners = new Set<() => void>();

async function fetchAll(): Promise<YouItem[]> {
  const { data, error } = await supabase
    .from("you_services_items")
    .select(
      "id, section, title, description, code, price, icon, deactivation_code, sort_order",
    )
    .order("section", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.id,
    section: r.section as YouSection,
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

export async function refreshYouItems() {
  cache = await fetchAll();
  listeners.forEach((l) => l());
}

export function useYouItems(section?: YouSection) {
  const [items, setItems] = useState<YouItem[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    const sync = () => setItems(cache ?? []);
    listeners.add(sync);
    if (cache === null) {
      refreshYouItems()
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    const channel = supabase
      .channel("you_services_items_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "you_services_items" },
        () => {
          refreshYouItems().catch(() => {});
        },
      )
      .subscribe();
    return () => {
      listeners.delete(sync);
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = section ? items.filter((i) => i.section === section) : items;
  return { items: filtered, loading, refresh: refreshYouItems };
}

function payload(input: Partial<YouItem>) {
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

export async function createYouItem(
  input: Omit<YouItem, "id" | "sort_order"> & { sort_order?: number },
) {
  const { error } = await supabase.from("you_services_items").insert({
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
  await refreshYouItems();
}

export async function updateYouItem(id: string, patch: Partial<YouItem>) {
  const { error } = await supabase
    .from("you_services_items")
    .update(payload(patch))
    .eq("id", id);
  if (error) throw error;
  await refreshYouItems();
}

export async function deleteYouItem(id: string) {
  const { error } = await supabase.from("you_services_items").delete().eq("id", id);
  if (error) throw error;
  await refreshYouItems();
}

export const SECTION_LABELS: Record<YouSection, string> = {
  packages: "تفعيل الباقات",
  services: "الخدمات",
  account: "أسعار ومعلومات",
  internet: "ضبط الإنترنت",
};

