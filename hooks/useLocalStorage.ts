"use client";

import { useState, useEffect, useCallback } from "react";
import { storageGetJSON, storageSetJSON } from "@/lib/localStorage";

/**
 * A generic, SSR-safe hook that mirrors a value to localStorage.
 * Hydration-safe: renders with initialValue on first pass, then syncs
 * to the stored value after mount.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Sync from storage after mount (client-only)
  useEffect(() => {
    const stored = storageGetJSON<T>(key, initialValue);
    setStoredValue(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === "function" ? (value as (p: T) => T)(prev) : value;
        storageSetJSON(key, next);
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
