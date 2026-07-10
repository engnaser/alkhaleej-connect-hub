import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type YouSection = "packages" | "services" | "account" | "internet";

export interface YouItem {
  id: string;
  section: YouSection;
  title: string;
  description: string | null;
  code: string | null;
  price: string | null;
  sort_order: number;
}

let cache: YouItem[] | null = null;
const listeners = new Set<() => void>();

async function fetchAll(): Promise<YouItem[]> {
  const { data, error } = await supabase
    .from("you_services_items")
    .select("id, section, title, description, code, price, sort_order")
    .order("section", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as YouItem[];
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

export async function createYouItem(input: Omit<YouItem, "id" | "sort_order"> & { sort_order?: number }) {
  const { error } = await supabase.from("you_services_items").insert({
    section: input.section,
    title: input.title,
    description: input.description,
    code: input.code,
    price: input.price,
    sort_order: input.sort_order ?? Date.now(),
  });
  if (error) throw error;
  await refreshYouItems();
}

export async function updateYouItem(id: string, patch: Partial<Omit<YouItem, "id">>) {
  const { error } = await supabase
    .from("you_services_items")
    .update(patch)
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
