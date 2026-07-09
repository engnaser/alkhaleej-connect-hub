import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  YEMEN_MOBILE_CATEGORIES,
  type YMCategory,
  type YMPackage,
  type NetworkType,
} from "@/data/yemenMobilePackages";

export type { YMCategory, YMPackage, NetworkType };

export const NETWORK_OPTIONS: NetworkType[] = ["4G", "3G", "VoLTE", "4G / 3G"];

const CHANGE_EVENT = "ym_packages_changed";

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

async function fetchCategories(): Promise<YMCategory[]> {
  const { data: cats, error: catErr } = await supabase
    .from("ym_categories")
    .select("id,title,description,sort_order")
    .order("sort_order", { ascending: true });
  if (catErr) throw catErr;

  const { data: pkgs, error: pkgErr } = await supabase
    .from("ym_packages")
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
      .map<YMPackage>((p) => ({
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

export function usePackagesStore() {
  const [categories, setCategories] = useState<YMCategory[]>([]);
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
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, [refresh]);

  return { categories, loading, error, refresh };
}

/* ---------- Admin CRUD ---------- */

export async function createCategory(input: {
  title: string;
  description?: string;
}) {
  const id = makeId("cat");
  const sort_order = Date.now();
  const { error } = await supabase.from("ym_categories").insert({
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
    .from("ym_categories")
    .update({
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.description !== undefined
        ? { description: patch.description }
        : {}),
    })
    .eq("id", id);
  if (error) throw error;
  emitChange();
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("ym_categories").delete().eq("id", id);
  if (error) throw error;
  emitChange();
}

export async function reorderCategories(orderedIds: string[]) {
  // Update sort_order sequentially so order is deterministic.
  const updates = orderedIds.map((id, index) =>
    supabase
      .from("ym_categories")
      .update({ sort_order: index + 1 })
      .eq("id", id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
  emitChange();
}

function pkgPayload(catId: string, pkg: YMPackage, sortOrder?: number) {
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

export async function createPackage(catId: string, pkg: YMPackage) {
  const { error } = await supabase
    .from("ym_packages")
    .insert(pkgPayload(catId, pkg, Date.now()));
  if (error) throw error;
  emitChange();
}

export async function updatePackage(catId: string, pkg: YMPackage) {
  const { error } = await supabase
    .from("ym_packages")
    .update(pkgPayload(catId, pkg))
    .eq("id", pkg.id);
  if (error) throw error;
  emitChange();
}

export async function deletePackage(pkgId: string) {
  const { error } = await supabase.from("ym_packages").delete().eq("id", pkgId);
  if (error) throw error;
  emitChange();
}

export async function resetToDefaults() {
  // Wipe everything and reinsert the bundled defaults.
  const { error: delPkgErr } = await supabase
    .from("ym_packages")
    .delete()
    .neq("id", "");
  if (delPkgErr) throw delPkgErr;
  const { error: delCatErr } = await supabase
    .from("ym_categories")
    .delete()
    .neq("id", "");
  if (delCatErr) throw delCatErr;

  const cats = YEMEN_MOBILE_CATEGORIES.map((c, i) => ({
    id: c.id,
    title: c.title,
    description: c.description ?? null,
    sort_order: i + 1,
  }));
  const { error: insCatErr } = await supabase.from("ym_categories").insert(cats);
  if (insCatErr) throw insCatErr;

  const pkgs = YEMEN_MOBILE_CATEGORIES.flatMap((c) =>
    c.packages.map((p, i) => pkgPayload(c.id, p, i + 1)),
  );
  const { error: insPkgErr } = await supabase.from("ym_packages").insert(pkgs);
  if (insPkgErr) throw insPkgErr;
  emitChange();
}

/* ---------- Auth helpers ---------- */

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

