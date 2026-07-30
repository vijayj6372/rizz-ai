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
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDark ? "rgba(14, 8, 32, 0.82)" : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.18)" : "1px solid rgba(255, 255, 255, 0.55)",
        borderRadius: 24,
        padding: "8px 10px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
        width: "calc(100% - 32px)",
        maxWidth: 420,
        gap: 6,
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
                width: 44,
                height: 44,
                borderRadius: 16,
                backgroundColor: "#F86B6D",
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 4px 12px rgba(248, 107, 109, 0.4)",
                transform: isActive ? "scale(1.1)" : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.18) rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = isActive ? "scale(1.1)" : "none";
              }}
            >
              <Plus size={22} color="#FFF" strokeWidth={3} />
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
              width: 44,
              height: 44,
              borderRadius: 16,
              fontSize: 22,
              textDecoration: "none",
              backgroundColor: isActive
                ? isDark
                  ? "rgba(255, 255, 255, 0.22)"
                  : "rgba(255, 255, 255, 0.85)"
                : "transparent",
              transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              border: isActive ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15) translateY(-2px)";
              e.currentTarget.style.backgroundColor = isDark
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(255, 255, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.backgroundColor = isActive
                ? isDark
                  ? "rgba(255, 255, 255, 0.22)"
                  : "rgba(255, 255, 255, 0.85)"
                : "transparent";
            }}
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
}
