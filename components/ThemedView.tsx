"use client";

import React from "react";
import { useTheme } from "@/hooks/useTheme";

export interface ThemedViewProps {
  children?: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  style?: React.CSSProperties;
  className?: string;
  as?: string;
}

export function ThemedView({
  children,
  lightColor,
  darkColor,
  style,
  className,
  as: Tag = "div",
}: ThemedViewProps) {
  const { theme, isDark } = useTheme();

  const backgroundColor =
    isDark && darkColor
      ? darkColor
      : !isDark && lightColor
        ? lightColor
        : theme.backgroundRoot;

  const Component = Tag as React.ElementType;

  return (
    <Component
      className={className}
      style={{ backgroundColor, ...style }}
    >
      {children}
    </Component>
  );
}
