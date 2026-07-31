"use client";

import React from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

interface FooterProps {
  variant?: "light" | "dark";
  currentPath?: string;
  showInlineNav?: boolean;
}

export function Footer({
  variant = "light",
  currentPath = "/",
  showInlineNav = true,
}: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer
      style={{
        width: "100%",
        marginTop: "auto",
        paddingTop: 36,
        paddingBottom: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* ── 1. Bottom Navigation Bar before footer ruler ── */}
      {showInlineNav && (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 12, marginBottom: 24 }}>
          <BottomNav currentPath={currentPath} variant={variant} inline />
        </div>
      )}

      {/* ── 2. Footer Ruler (Gradient Divider) ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          height: 2,
          borderRadius: 999,
          background: isDark
            ? "linear-gradient(90deg, rgba(244, 63, 94, 0) 0%, rgba(244, 63, 94, 0.6) 25%, rgba(168, 85, 247, 0.7) 50%, rgba(99, 102, 241, 0.6) 75%, rgba(99, 102, 241, 0) 100%)"
            : "linear-gradient(90deg, rgba(248, 107, 109, 0) 0%, rgba(248, 107, 109, 0.6) 25%, rgba(168, 85, 247, 0.7) 50%, rgba(99, 102, 241, 0.6) 75%, rgba(99, 102, 241, 0) 100%)",
          boxShadow: isDark
            ? "0 0 12px rgba(244, 63, 94, 0.3)"
            : "0 0 12px rgba(248, 107, 109, 0.25)",
          margin: "6px auto 12px",
        }}
      />

      {/* ── 3. Links: About • Contact • Privacy Policy • Terms of Service ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        <Link
          href="/about"
          style={{
            color: isDark ? "#FB7185" : "#E11D48",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 8,
            transition: "all 0.2s",
          }}
        >
          About
        </Link>
        <span style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(17,24,28,0.25)", fontSize: 16 }}>•</span>
        <Link
          href="/contact"
          style={{
            color: isDark ? "#FB7185" : "#E11D48",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 8,
            transition: "all 0.2s",
          }}
        >
          Contact
        </Link>
        <span style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(17,24,28,0.25)", fontSize: 16 }}>•</span>
        <Link
          href="/privacy"
          style={{
            color: isDark ? "#FB7185" : "#E11D48",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 8,
            transition: "all 0.2s",
          }}
        >
          Privacy Policy
        </Link>
        <span style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(17,24,28,0.25)", fontSize: 16 }}>•</span>
        <Link
          href="/terms"
          style={{
            color: isDark ? "#FB7185" : "#E11D48",
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 8,
            transition: "all 0.2s",
          }}
        >
          Terms of Service
        </Link>
      </div>

      {/* ── 5. Copyright line ── */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: isDark ? "rgba(226, 232, 240, 0.5)" : "rgba(17,24,28,0.6)",
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        Rizz AI © 2025 · Made with ❤️
      </p>
    </footer>
  );
}
