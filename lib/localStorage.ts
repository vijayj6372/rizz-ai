/**
 * SSR-safe localStorage utilities.
 * Always guard with typeof window !== 'undefined' before calling.
 */

export function storageGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function storageSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Silently ignore quota exceeded or private browsing errors
  }
}

export function storageRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function storageGetJSON<T>(key: string, fallback: T): T {
  const raw = storageGet(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function storageSetJSON<T>(key: string, value: T): void {
  storageSet(key, JSON.stringify(value));
}
