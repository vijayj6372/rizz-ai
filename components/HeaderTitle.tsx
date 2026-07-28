import React from "react";
import { AppColors } from "@/constants/theme";

interface HeaderTitleProps {
  title: string;
  /** Override the font size (px). Default 28 for headers, 58 for home hero. */
  fontSize?: number;
}

/**
 * Recreates the layered-text thick-white-outline style from the RN source.
 * Uses CSS -webkit-text-stroke + paint-order for the outline effect.
 */
export function HeaderTitle({ title, fontSize = 28 }: HeaderTitleProps) {
  const strokeWidth = Math.round(fontSize * 0.09);
  const shadowOffset = Math.round(fontSize * 0.07);

  const baseStyle: React.CSSProperties = {
    fontSize,
    fontWeight: 700,
    fontFamily: "var(--font-lilita-one), 'LilitaOne', cursive",
    textAlign: "center",
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    letterSpacing: 0.5,
  };

  const shadow = [
    `-${shadowOffset}px 0 #FFFFFF`,
    `${shadowOffset}px 0 #FFFFFF`,
    `0 -${shadowOffset}px #FFFFFF`,
    `0 ${shadowOffset}px #FFFFFF`,
    `-${shadowOffset}px -${shadowOffset}px #FFFFFF`,
    `${shadowOffset}px -${shadowOffset}px #FFFFFF`,
    `-${shadowOffset}px ${shadowOffset}px #FFFFFF`,
    `${shadowOffset}px ${shadowOffset}px #FFFFFF`,
    `0 ${shadowOffset + 4}px 6px rgba(0, 0, 0, 0.15)`,
  ].join(", ");

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          ...baseStyle,
          color: AppColors.primary,
          WebkitTextStroke: `${strokeWidth}px #FFFFFF`,
          paintOrder: "stroke fill",
          textShadow: shadow,
          position: "relative",
          zIndex: 1,
          display: "block",
        }}
      >
        {title}
      </span>
    </div>
  );
}
