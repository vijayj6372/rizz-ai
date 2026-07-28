"use client";

import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { BackButton } from "@/components/BackButton";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Show a back button at the top of the page */
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
  /** Optional header slot (e.g. HeaderTitle) */
  header?: React.ReactNode;
  /** Optional right-side action slot (e.g. Plus icon button) */
  rightAction?: React.ReactNode;
  /** Remove the max-width constraint for full-bleed layouts */
  fullWidth?: boolean;
  /**
   * "light"  → home-style gradient (default)
   * "dark"   → dark purple background used by fun-features sub-screens
   */
  variant?: "light" | "dark";
}

/**
 * Common page shell used by every screen.
 * Centers content, applies gradient background, handles safe-area padding.
 */
export function PageLayout({
  children,
  showBack = false,
  backHref,
  backLabel,
  header,
  rightAction,
  fullWidth = false,
  variant = "light",
}: PageLayoutProps) {
  const { theme, isDark } = useTheme();

  const bg =
    variant === "dark"
      ? "linear-gradient(180deg, #08021A 0%, #0E0622 50%, #130929 100%)"
      : isDark
      ? `linear-gradient(160deg, ${theme.backgroundRoot} 0%, ${theme.backgroundDefault} 100%)`
      : "linear-gradient(160deg, #ABBFF2 0%, #BCCFFA 100%)";

  // For dark variant, the back button and header text should be white
  const isDarkVariant = variant === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Inner container */}
      <div
        style={{
          width: "100%",
          maxWidth: fullWidth ? "100%" : 480,
          padding: "16px 16px 40px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        {/* Top bar */}
        {(showBack || header) && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent:
                showBack && header
                  ? "space-between"
                  : showBack
                  ? "flex-start"
                  : "center",
              paddingBottom: 8,
              paddingTop: 8,
              minHeight: 52,
            }}
          >
            {showBack && (
              <BackButton href={backHref} label={backLabel} darkMode={isDarkVariant} />
            )}
            {header && (
              <div
                style={{
                  flex: showBack ? 1 : undefined,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {header}
              </div>
            )}
            {/* Spacer/Container to center header when back button present */}
            {showBack && header && (
              <div style={{ width: 46, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                {rightAction}
              </div>
            )}
          </div>
        )}

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
