"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/sound";

interface BottomNavProps {
  currentPath?: string;
  variant?: "light" | "dark";
  inline?: boolean;
}

function playNavHoverSound() {
  playHoverSound();
}

function playNavClickSound() {
  playClickSound();
}

export function BottomNav({ currentPath, variant = "dark", inline = false }: BottomNavProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname || "";
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);

  const isDark = variant === "dark";

  const navItems = [
    { href: "/", label: "Home", icon: "🏠", id: "nav-home" },
    { href: "/lovetest", label: "Love Test", icon: "❤️", id: "nav-lovetest" },
    { href: "/looksmaxing", label: "Looksmaxing", icon: "🗿", id: "nav-looksmaxing" },
    { href: "/fun-features", label: "Fun Features", isPlus: true, id: "nav-fun-features" },
    { href: "/firefun", label: "FireFun AI", icon: "🔥", id: "nav-firefun" },
    { href: "/lovelife", label: "LoveLife", icon: "💋", id: "nav-lovelife" },
    { href: "/couple-games", label: "Couple Games", icon: "🎮", id: "nav-couple-games" },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      style={{
        position: inline ? "relative" : "fixed",
        bottom: inline ? "auto" : "max(12px, env(safe-area-inset-bottom, 12px))",
        left: inline ? "auto" : "50%",
        transform: inline ? "none" : "translateX(-50%)",
        zIndex: inline ? 10 : 9999,
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
        width: inline ? "100%" : "calc(100% - 24px)",
        maxWidth: 440,
        gap: 4,
        margin: inline ? "0 auto" : undefined,
      }}
    >
      {navItems.map((item) => {
        const isActive = activePath === item.href;
        const isHovered = hoveredId === item.id;
        const isPressed = pressedId === item.id;

        const handleMouseEnter = () => {
          setHoveredId(item.id);
          playNavHoverSound();
        };

        const handleMouseLeave = () => {
          setHoveredId(null);
          setPressedId(null);
        };

        const handleMouseDown = () => {
          setPressedId(item.id);
        };

        const handleMouseUp = () => {
          setPressedId(null);
        };

        const handleClick = () => {
          playNavClickSound();
        };

        if (item.isPlus) {
          const transform = isPressed
            ? "scale(0.9)"
            : isHovered
            ? "scale(1.18)"
            : isActive
            ? "scale(1.08)"
            : "scale(1)";

          const boxShadow = isHovered
            ? "0 6px 20px rgba(248, 107, 109, 0.75), 0 0 12px rgba(248, 107, 109, 0.5)"
            : "0 4px 12px rgba(248, 107, 109, 0.4)";

          return (
            <Link
              key={item.href}
              href={item.href}
              id={item.id}
              aria-label={item.label}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              onClick={handleClick}
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
                transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s, background-color 0.18s",
                boxShadow,
                transform,
                flexShrink: 0,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <Plus size={20} color="#FFF" strokeWidth={3} />
            </Link>
          );
        }

        const transform = isPressed
          ? "scale(0.86)"
          : isHovered
          ? "scale(1.22)"
          : isActive
          ? "scale(1.08)"
          : "scale(1)";

        const backgroundColor = isPressed
          ? isDark
            ? "rgba(255, 255, 255, 0.35)"
            : "rgba(248, 107, 109, 0.3)"
          : isHovered
          ? isDark
            ? "rgba(255, 255, 255, 0.28)"
            : "rgba(248, 107, 109, 0.2)"
          : isActive
          ? isDark
            ? "rgba(255, 255, 255, 0.22)"
            : "rgba(255, 255, 255, 0.85)"
          : "transparent";

        const border = isHovered
          ? "1px solid rgba(248, 107, 109, 0.6)"
          : isActive
          ? "1px solid rgba(255, 255, 255, 0.35)"
          : "1px solid transparent";

        const boxShadow = isHovered
          ? "0 4px 16px rgba(248, 107, 109, 0.35)"
          : "none";

        return (
          <Link
            key={item.href}
            href={item.href}
            id={item.id}
            aria-label={item.label}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onClick={handleClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(38px, 11.5vw, 44px)",
              height: "clamp(38px, 11.5vw, 44px)",
              borderRadius: 16,
              fontSize: "clamp(18px, 5.5vw, 22px)",
              textDecoration: "none",
              backgroundColor,
              transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.18s, border 0.18s, box-shadow 0.18s",
              border,
              boxShadow,
              transform,
              flexShrink: 0,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {item.icon}
          </Link>
        );
      })}
    </nav>
  );
}
