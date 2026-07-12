import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type NetworkType = "4G" | "3G" | "VoLTE" | "4G / 3G";

export type YouPackage = {
  id: string;
  name: string;
  price: string;
  internet: string;
  minutes: string;
  sms: string;
  validity: string;
  network: NetworkType;
  code?: string;
};

export type YouCategory = {
  id: string;
  title: string;
  description?: string;
  packages: YouPackage[];
};

export const NETWORK_OPTIONS: NetworkType[] = ["4G", "3G", "VoLTE", "4G / 3G"];

const CHANGE_EVENT = "you_packages_changed";

function emitChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }
}

export function makeId(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

async function fetchCategories(): Promise<YouCategory[]> {
  const { data: cats, error: catErr } = await supabase
    .from("you_categories")
    .select("id,title,description,sort_order")
    .order("sort_order", { ascending: true });
  if (catErr) throw catErr;

  const { data: pkgs, error: pkgErr } = await supabase
    .from("you_packages")
    .select(
      "id,category_id,name,price,internet,minutes,sms,validity,network,code,sort_order",
    )
    .order("sort_order", { ascending: true });
  if (pkgErr) throw pkgErr;

  return (cats ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description ?? undefined,
    packages: (pkgs ?? [])
      .filter((p) => p.category_id === c.id)
      .map<YouPackage>((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        internet: p.internet,
        minutes: p.minutes,
        sms: p.sms,
        validity: p.validity,
        network: p.network as NetworkType,
        code: p.code ?? undefined,
      })),
  }));
}

export function useYouPackagesStore() {
  const [categories, setCategories] = useState<YouCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchCategories();
      setCategories(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذّر تحميل الباقات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const sync = () => refresh();
    if (typeof window !== "undefined") {
      window.addEventListener(CHANGE_EVENT, sync);
    }
    const channel = supabase
      .channel("you_packages_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "you_categories" },
        () => refresh(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "you_packages" },
        () => refresh(),
      )
      .subscribe();
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(CHANGE_EVENT, sync);
      }
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  return { categories, loading, error, refresh };
}

/* ---------- Admin CRUD ---------- */

export async function createCategory(input: {
  title: string;
  description?: string;
}) {
  const id = makeId("you-cat");
  const { data: maxRow } = await supabase
    .from("you_categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sort_order = (maxRow?.sort_order ?? 0) + 1;
  const { error } = await supabase.from("you_categories").insert({
    id,
    title: input.title,
    description: input.description ?? null,
    sort_order,
  });
  if (error) throw error;
  emitChange();
}

export async function updateCategory(
  id: string,
  patch: { title?: string; description?: string | null },
) {
  const { error } = await supabase
    .from("you_categories")
    .update({
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.description !== undefined ? { description: patch.description } : {}),
    })
    .eq("id", id);
  if (error) throw error;
  emitChange();
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("you_categories").delete().eq("id", id);
  if (error) throw error;
  emitChange();
}

export async function reorderCategories(orderedIds: string[]) {
  const updates = orderedIds.map((id, index) =>
    supabase
      .from("you_categories")
      .update({ sort_order: index + 1 })
      .eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
  emitChange();
}

function pkgPayload(catId: string, pkg: YouPackage, sortOrder?: number) {
  return {
    id: pkg.id,
    category_id: catId,
    name: pkg.name,
    price: pkg.price,
    internet: pkg.internet || "—",
    minutes: pkg.minutes || "—",
    sms: pkg.sms || "—",
    validity: pkg.validity || "",
    network: pkg.network,
    code: pkg.code ?? null,
    ...(sortOrder !== undefined ? { sort_order: sortOrder } : {}),
  };
}

export async function createPackage(catId: string, pkg: YouPackage) {
  const { data: maxRow } = await supabase
    .from("you_packages")
    .select("sort_order")
    .eq("category_id", catId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextSort = (maxRow?.sort_order ?? 0) + 1;
  const { error } = await supabase
    .from("you_packages")
    .insert(pkgPayload(catId, pkg, nextSort));
  if (error) throw error;
  emitChange();
}

export async function updatePackage(catId: string, pkg: YouPackage) {
  const { error } = await supabase
    .from("you_packages")
    .update(pkgPayload(catId, pkg))
    .eq("id", pkg.id);
  if (error) throw error;
  emitChange();
}

export async function deletePackage(pkgId: string) {
  const { error } = await supabase.from("you_packages").delete().eq("id", pkgId);
  if (error) throw error;
  emitChange();
}

export async function getCurrentAdminState() {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user ?? null;
  if (!user) return { user: null, isAdmin: false };
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: user.id,
    _role: "admin",
  });
  if (error) return { user, isAdmin: false };
  return { user, isAdmin: Boolean(data) };
}
