"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { AppColors } from "@/constants/theme";

interface BackButtonProps {
  label?: string;
  href?: string;
  /** When true, renders a glassmorphic white icon button (for dark-bg pages) */
  darkMode?: boolean;
}

export function BackButton({ label, href, darkMode = false }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  if (darkMode) {
    return (
      <button
        onClick={handleClick}
        aria-label={label ?? "Go back"}
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          backgroundColor: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background-color 0.15s, transform 0.1s",
          flexShrink: 0,
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <ChevronLeft size={24} color="#fff" strokeWidth={2.5} />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-label={label ?? "Go back"}
      style={{
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: "#F86B6D",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 0px #D95657, 0 4px 10px rgba(217, 86, 87, 0.3)",
        flexShrink: 0,
        transition: "transform 0.1s",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <ChevronLeft size={26} color="#FFFFFF" strokeWidth={2.5} />
    </button>
  );
}
