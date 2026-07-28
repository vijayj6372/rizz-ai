"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { CopiedToast } from "@/components/CopiedToast";
import { useTheme } from "@/hooks/useTheme";
import { flirtyLines, poeticLines, boldSexyLines } from "@/data/pickupLines";

type Category = "Flirty" | "Poetic" | "Bold & Sexy";

const categoryData: Record<Category, string[]> = {
  Flirty: flirtyLines,
  Poetic: poeticLines,
  "Bold & Sexy": boldSexyLines,
};

function ChiliSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const trackWidth = 280;
  const thumbSize = 46;
  const leftPos = value * (trackWidth - thumbSize);

  return (
    <div style={{ position: "relative", width: trackWidth, height: thumbSize, display: "flex", alignItems: "center", margin: "20px auto 0" }}>
      {/* Visual Track */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 12,
          borderRadius: 6,
          background: "linear-gradient(90deg, #FF9500 0%, #FF3B30 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Visual Thumb */}
      <div
        style={{
          position: "absolute",
          left: leftPos,
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.16)",
          fontSize: 24,
          pointerEvents: "none",
        }}
      >
        🌶️
      </div>
      {/* Native Input Overlay */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default function PickupLinePage() {
  const { theme, isDark } = useTheme();
  const [lines, setLines] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [toastVisible, setToastVisible] = useState(false);
  const [copiedLine, setCopiedLine] = useState("");

  const generateNewLines = useCallback(() => {
    const f = flirtyLines[Math.floor(Math.random() * flirtyLines.length)];
    const p = poeticLines[Math.floor(Math.random() * poeticLines.length)];
    const b = boldSexyLines[Math.floor(Math.random() * boldSexyLines.length)];
    return [f, p, b];
  }, []);

  // Initialize on mount
  useEffect(() => {
    setLines(generateNewLines());
  }, [generateNewLines]);

  const handleCopy = useCallback(async (line: string) => {
    try {
      await navigator.clipboard.writeText(line);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = line;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedLine(line);
    setToastVisible(true);
  }, []);

  const handleGimmeAnother = useCallback(() => {
    setLines([]);
    setTimeout(() => {
      setLines(generateNewLines());
    }, 50);
  }, [generateNewLines]);



  return (
    <PageLayout
      showBack
      backHref="/"
      header={<HeaderTitle title="Rizz AI" />}
    >
      {/* CSS Styles Injection for iMessage Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes imessagePop {
          0% { opacity: 0; transform: scale(0.85) translateY(18px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .imessage-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          margin: 30px auto 0;
          width: 100%;
          max-width: 400px;
          padding: 0 12px;
        }
        .imessage-bubble {
          position: relative;
          background-color: #2F80ED;
          color: #FFFFFF;
          padding: 14px 20px;
          border-radius: 22px;
          border-bottom-right-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.45;
          text-align: left;
          max-width: 90%;
          box-shadow: 0 4px 12px rgba(47, 128, 237, 0.2);
          cursor: pointer;
          transition: transform 0.1s, background-color 0.15s, box-shadow 0.15s;
          animation: imessagePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .imessage-bubble:hover {
          background-color: #1F70DD;
          box-shadow: 0 6px 16px rgba(47, 128, 237, 0.3);
        }
        .imessage-bubble:active {
          transform: scale(0.97);
        }
        .imessage-bubble::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: -6px;
          width: 12px;
          height: 12px;
          background-color: #2F80ED;
          clip-path: polygon(0 0, 0 100%, 100% 100%);
          transition: background-color 0.15s;
        }
        .imessage-bubble:hover::after {
          background-color: #1F70DD;
        }
      ` }} />

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "calc(100vh - 120px)" }}>
        
        {/* iMessage Stack */}
        <div className="imessage-container">
          {lines.map((line, idx) => (
            <div
              key={`${line}-${idx}`}
              className="imessage-bubble"
              style={{ animationDelay: `${idx * 150}ms` }}
              onClick={() => handleCopy(line)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleCopy(line)}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Action Elements Stack */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, marginTop: 40, marginBottom: 20 }}>
          
          {/* Copy Instruction Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              color: "rgba(100, 116, 139, 0.75)",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            <span>💡</span>
            <span>Tap or press any line to copy</span>
          </div>

          {/* Chilly Slider */}
          <ChiliSlider value={sliderValue} onChange={setSliderValue} />

          {/* gimme another Button */}
          <button
            onClick={handleGimmeAnother}
            style={{
              width: "100%",
              maxWidth: 360,
              height: 56,
              borderRadius: 28,
              backgroundColor: "#F86B6D",
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 0px #D95657, 0 6px 12px rgba(248, 107, 109, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(4px)";
              e.currentTarget.style.boxShadow = "0 2px 0px #D95657, 0 2px 6px rgba(248, 107, 109, 0.25)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 6px 0px #D95657, 0 6px 12px rgba(248, 107, 109, 0.25)";
            }}
            id="gimme-another-btn"
          >
            gimme another
          </button>
        </div>
      </div>

      <CopiedToast visible={toastVisible} onHide={() => setToastVisible(false)} />
    </PageLayout>
  );
}
