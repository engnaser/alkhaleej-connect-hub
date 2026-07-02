export type MyPhotoItem = {
  id: string;
  templateId: string;
  title: string;
  occasion: string;
  name: string;
  dataUrl: string;
  createdAt: number;
};

const KEY = "khalij:my-photos:v1";
const MAX_ITEMS = 40;

export function loadMyPhotos(): MyPhotoItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MyPhotoItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMyPhoto(item: Omit<MyPhotoItem, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  const list = loadMyPhotos();
  const entry: MyPhotoItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
  };
  const next = [entry, ...list].slice(0, MAX_ITEMS);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("khalij:my-photos:changed"));
  } catch {
    // storage full — drop oldest until it fits
    let trimmed = next;
    while (trimmed.length > 1) {
      trimmed = trimmed.slice(0, trimmed.length - 1);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(trimmed));
        window.dispatchEvent(new CustomEvent("khalij:my-photos:changed"));
        return;
      } catch {
        // keep trimming
      }
    }
  }
}

export function removeMyPhoto(id: string) {
  if (typeof window === "undefined") return;
  const next = loadMyPhotos().filter((p) => p.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("khalij:my-photos:changed"));
}

export function clearMyPhotos() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("khalij:my-photos:changed"));
}
