import { useEffect, useState, useCallback } from "react";
import {
  YEMEN_MOBILE_CATEGORIES,
  type YMCategory,
  type YMPackage,
  type NetworkType,
} from "@/data/yemenMobilePackages";

const STORAGE_KEY = "ym_packages_v1";
const EVENT = "ym_packages_changed";

export type { YMCategory, YMPackage, NetworkType };

export const NETWORK_OPTIONS: NetworkType[] = ["4G", "3G", "VoLTE", "4G / 3G"];

function load(): YMCategory[] {
  if (typeof window === "undefined") return YEMEN_MOBILE_CATEGORIES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return YEMEN_MOBILE_CATEGORIES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as YMCategory[];
    return YEMEN_MOBILE_CATEGORIES;
  } catch {
    return YEMEN_MOBILE_CATEGORIES;
  }
}

function save(data: YMCategory[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function usePackagesStore() {
  const [categories, setCategories] = useState<YMCategory[]>(() => load());

  useEffect(() => {
    const sync = () => setCategories(load());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((next: YMCategory[]) => {
    save(next);
    setCategories(next);
  }, []);

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(EVENT));
    }
    setCategories(YEMEN_MOBILE_CATEGORIES);
  }, []);

  return { categories, update, reset };
}

export function makeId(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}
