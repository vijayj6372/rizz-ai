import React from "react";
import { AppColors } from "@/constants/theme";

interface HeaderTitleProps {
  title: string;
  /** Maximum font size (px). Scales down fluidly on narrow screens. Default 28. */
  fontSize?: number;
}

/**
 * Recreates the layered-text thick-white-outline style from the RN source.
 * Uses CSS -webkit-text-stroke + paint-order for the outline effect.
 * The size is clamped so titles never overflow 320px-wide viewports.
 */
export function HeaderTitle({ title, fontSize = 28 }: HeaderTitleProps) {
  const strokeWidth = (Math.round(fontSize * 0.09) / fontSize).toFixed(3);
  const shadowOffset = (Math.round(fontSize * 0.07) / fontSize).toFixed(3);
  const minFontSize = Math.max(16, Math.round(fontSize * 0.64));

  const baseStyle: React.CSSProperties = {
    fontSize: `clamp(${minFontSize}px, ${(fontSize / 4.5).toFixed(1)}vw, ${fontSize}px)`,
    fontWeight: 700,
    fontFamily: "var(--font-lilita-one), 'LilitaOne', cursive",
    textAlign: "center",
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    letterSpacing: 0.5,
  };

  const shadow = [
    `-${shadowOffset}em 0 #FFFFFF`,
    `${shadowOffset}em 0 #FFFFFF`,
    `0 -${shadowOffset}em #FFFFFF`,
    `0 ${shadowOffset}em #FFFFFF`,
    `-${shadowOffset}em -${shadowOffset}em #FFFFFF`,
    `${shadowOffset}em ${shadowOffset}em #FFFFFF`,
    `-${shadowOffset}em ${shadowOffset}em #FFFFFF`,
    `${shadowOffset}em -${shadowOffset}em #FFFFFF`,
    `0 0.12em 6px rgba(0, 0, 0, 0.15)`,
  ].join(", ");

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100%",
        minWidth: 0,
      }}
    >
      <span
        style={{
          ...baseStyle,
          color: AppColors.primary,
          WebkitTextStroke: `${strokeWidth}em #FFFFFF`,
          paintOrder: "stroke fill",
          textShadow: shadow,
          position: "relative",
          zIndex: 1,
          display: "block",
          maxWidth: "100%",
          overflowWrap: "break-word",
        }}
      >
        {title}
      </span>
    </div>
  );
}
