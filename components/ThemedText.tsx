"use client";

import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Typography } from "@/constants/theme";

export type ThemedTextType = "h1" | "h2" | "h3" | "h4" | "body" | "small" | "link";

export interface ThemedTextProps {
  children?: React.ReactNode;
  type?: ThemedTextType;
  lightColor?: string;
  darkColor?: string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}

const tagMap: Record<ThemedTextType, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  small: "span",
  link: "span",
};

export function ThemedText({
  children,
  type = "body",
  lightColor,
  darkColor,
  style,
  className,
  id,
}: ThemedTextProps) {
  const { theme, isDark } = useTheme();

  const color = isDark && darkColor
    ? darkColor
    : !isDark && lightColor
      ? lightColor
      : type === "link"
        ? theme.link
        : theme.text;

  const typeStyle = Typography[type] as React.CSSProperties;
  const Tag = tagMap[type] as React.ElementType;

  return (
    <Tag
      id={id}
      className={className}
      style={{
        margin: 0,
        color,
        ...typeStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
