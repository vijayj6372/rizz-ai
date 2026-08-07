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
  // Always use the default signature brand light theme across all devices
  const mode: ThemeMode = "light";
  const isDark = false;
  const theme = Colors.light;

  const setMode = useCallback((_m: ThemeMode) => {}, []);
  const toggleTheme = useCallback(() => {}, []);

  const value = useMemo(
    () => ({ theme, isDark, mode, toggleTheme, setMode }),
    [theme, isDark, mode, toggleTheme, setMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-theme="light"
        style={{ minHeight: "100vh", background: theme.backgroundRoot }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
