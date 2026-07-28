"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Colors } from "@/constants/theme";
import { storageGet, storageSet } from "@/lib/localStorage";

type ThemeMode = "light" | "dark" | "system";
type ThemeColors = (typeof Colors)["light"];

interface ThemeContextValue {
  theme: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [systemDark, setSystemDark] = useState(false);

  // Hydrate from localStorage and system preference after mount
  useEffect(() => {
    const saved = storageGet("rizz_theme_mode") as ThemeMode | null;
    if (saved) setModeState(saved);
    setSystemDark(getSystemDark());

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isDark =
    mode === "dark" ? true : mode === "light" ? false : systemDark;

  const theme = isDark ? Colors.dark : Colors.light;

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    storageSet("rizz_theme_mode", m);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(isDark ? "light" : "dark");
  }, [isDark, setMode]);

  const value = useMemo(
    () => ({ theme, isDark, mode, toggleTheme, setMode }),
    [theme, isDark, mode, toggleTheme, setMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-theme={isDark ? "dark" : "light"}
        style={{ minHeight: "100vh", background: theme.backgroundRoot }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
