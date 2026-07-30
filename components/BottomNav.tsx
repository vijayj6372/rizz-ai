"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

interface BottomNavProps {
  currentPath?: string;
  variant?: "light" | "dark";
}

export function BottomNav({ currentPath, variant = "dark" }: BottomNavProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname || "";

  const isDark = variant === "dark";

  const navItems = [
    { href: "/", label: "Home", icon: "🏠", id: "nav-home" },
    { href: "/lovetest", label: "Love Test", icon: "❤️", id: "nav-lovetest" },
    { href: "/fun-features", label: "Fun Features", isPlus: true, id: "nav-fun-features" },
    { href: "/firefun", label: "FireFun AI", icon: "🔥", id: "nav-firefun" },
    { href: "/lovelife", label: "LoveLife", icon: "💋", id: "nav-lovelife" },
    { href: "/couple-games", label: "Couple Games", icon: "🎮", id: "nav-couple-games" },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      style={{
        position: "fixed",
        bottom: "max(12px, env(safe-area-inset-bottom, 12px))",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isDark ? "rgba(14, 8, 32, 0.92)" : "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.18)" : "1px solid rgba(255, 255, 255, 0.65)",
        borderRadius: 24,
        padding: "6px 8px",
        boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.5)" : "0 10px 30px rgba(0, 0, 0, 0.12)",
        width: "calc(100% - 24px)",
        maxWidth: 400,
        gap: 4,
      }}
    >
      {navItems.map((item) => {
        const isActive = activePath === item.href;

        if (item.isPlus) {
          return (
            <Link
              key={item.href}
              href={item.href}
              id={item.id}
              aria-label={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(38px, 11.5vw, 44px)",
                height: "clamp(38px, 11.5vw, 44px)",
                borderRadius: 16,
                backgroundColor: "#F86B6D",
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 4px 12px rgba(248, 107, 109, 0.4)",
                transform: isActive ? "scale(1.08)" : "none",
                flexShrink: 0,
              }}
            >
              <Plus size={20} color="#FFF" strokeWidth={3} />
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            id={item.id}
            aria-label={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(38px, 11.5vw, 44px)",
              height: "clamp(38px, 11.5vw, 44px)",
              borderRadius: 16,
              fontSize: "clamp(18px, 5.5vw, 22px)",
              textDecoration: "none",
              backgroundColor: isActive
                ? isDark
                  ? "rgba(255, 255, 255, 0.22)"
                  : "rgba(255, 255, 255, 0.85)"
                : "transparent",
              transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              border: isActive ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid transparent",
              flexShrink: 0,
            }}
          >
            {item.icon}
          </Link>
        );
      })}
    </nav>
  );
}
