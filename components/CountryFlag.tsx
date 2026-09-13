"use client";

import React, { useState } from "react";

interface CountryFlagProps {
  countryCode: string;
  flagEmoji?: string;
  size?: number; // Height in px, default 24
  className?: string;
}

export function CountryFlag({
  countryCode,
  flagEmoji,
  size = 24,
  className = "",
}: CountryFlagProps) {
  const [imgError, setImgError] = useState(false);
  const width = Math.round(size * 1.35);

  const code = (countryCode || "us").toLowerCase();

  return (
    <div
      className={className}
      style={{
        width,
        height: size,
        borderRadius: Math.max(4, Math.round(size * 0.2)),
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
        border: "1px solid rgba(0,0,0,0.08)",
        backgroundColor: "#F4F4F6",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {!imgError ? (
        <img
          src={`https://flagcdn.com/w80/${code}.png`}
          srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
          alt={`${code.toUpperCase()} flag`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          style={{
            fontSize: Math.max(10, Math.round(size * 0.5)),
            fontWeight: 700,
            color: "#444",
            letterSpacing: 0.5,
            lineHeight: 1,
          }}
        >
          {flagEmoji || code.toUpperCase()}
        </span>
      )}
    </div>
  );
}
