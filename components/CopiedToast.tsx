"use client";

import React, { useEffect, useRef } from "react";

interface CopiedToastProps {
  visible: boolean;
  onHide: () => void;
  message?: string;
}

export const CopiedToast: React.FC<CopiedToastProps> = ({ visible, onHide, message = "Copied to clipboard!" }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      timerRef.current = setTimeout(() => {
        onHide();
      }, 2200);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, onHide]);

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 50,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <div
        className={`copied-toast ${visible ? "copied-toast--visible" : ""}`}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 14,
          paddingBottom: 14,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          border: "1px solid #E5E5E5",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 16, color: "#22C55E", fontWeight: "bold" }}>
          ✓
        </span>
        <span
          style={{ fontSize: 15, fontWeight: 600, color: "#1F2937" }}
        >
          {message}
        </span>
      </div>
    </div>
  );
};
