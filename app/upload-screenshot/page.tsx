"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Plus, RefreshCw, Upload } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { CopiedToast } from "@/components/CopiedToast";
import { useTheme } from "@/hooks/useTheme";
import { flirtyLines, poeticLines, boldSexyLines } from "@/data/pickupLines";

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

export default function UploadScreenshotPage() {
  const { theme, isDark } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [toastVisible, setToastVisible] = useState(false);
  const [copiedLine, setCopiedLine] = useState("");

  const generateNewLines = useCallback(() => {
    const f = flirtyLines[Math.floor(Math.random() * flirtyLines.length)];
    const p = poeticLines[Math.floor(Math.random() * poeticLines.length)];
    const b = boldSexyLines[Math.floor(Math.random() * boldSexyLines.length)];
    return [f, p, b];
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsAnalyzing(true);
      // Simulate screenshot scanning
      setTimeout(() => {
        setIsAnalyzing(false);
        setLines(generateNewLines());
        setHasUploaded(true);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 1500);
    },
    [generateNewLines]
  );

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
    // Generate new lines and trigger pop-in animation
    setLines([]);
    setTimeout(() => {
      setLines(generateNewLines());
    }, 50);
  }, [generateNewLines]);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <PageLayout
      showBack
      backHref="/"
      header={<HeaderTitle title="Rizz AI" />}
      rightAction={
        <button
          onClick={triggerUpload}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            color: "#F86B6D",
            transition: "transform 0.1s",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          aria-label="Upload screenshot"
          id="plus-upload-btn"
        >
          <Plus size={34} color="#F86B6D" strokeWidth={2.5} />
        </button>
      }
    >
      {/* CSS Styles Injection for iMessage Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes imessagePop {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(28px);
          }
          65% {
            opacity: 1;
            transform: scale(1.02) translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .imessage-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 12px;
          margin: 0 auto;
          width: 100%;
          max-width: 380px;
          padding: 0 16px;
          flex: 1;
        }
        .imessage-bubble {
          position: relative;
          background: linear-gradient(180deg, #3478F6 0%, #0066FF 100%);
          color: #FFFFFF;
          padding: 13px 18px;
          border-radius: 20px;
          border-bottom-right-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.4;
          text-align: left;
          max-width: 88%;
          box-shadow: 0 4px 14px rgba(0, 102, 255, 0.25);
          cursor: pointer;
          transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.15s, box-shadow 0.15s;
          animation: imessagePop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
          user-select: none;
        }
        .imessage-bubble:hover {
          filter: brightness(1.06);
          box-shadow: 0 6px 18px rgba(0, 102, 255, 0.35);
        }
        .imessage-bubble:active {
          transform: scale(0.95);
        }
        .imessage-bubble::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: -5px;
          width: 12px;
          height: 12px;
          background-color: #0066FF;
          clip-path: polygon(0 0, 0 100%, 100% 100%);
        }
        .upload-zone-btn {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s, background-color 0.2s;
        }
        .upload-zone-btn:hover {
          transform: translateY(-2px);
          border-color: #F86B6D;
          background-color: rgba(248,107,109,0.02);
        }
        .upload-zone-btn:active {
          transform: scale(0.98);
        }
      ` }} />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="screenshot-file-input"
        aria-label="Upload screenshot"
      />

      {/* Simulated Analyzing Screen Overlay */}
      {isAnalyzing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            style={{
              backgroundColor: "#1E1E2E",
              padding: "24px 32px",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            }}
          >
            <RefreshCw size={36} color="#F86B6D" style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Analyzing screenshot...</span>
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="w-full max-w-[400px] md:max-w-[900px] mx-auto" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "calc(100vh - 120px)" }}>
        
        {!hasUploaded ? (
          /* Initial State - Dashed Upload Zone + Slider + Generate button */
          <div className="max-w-[400px] mx-auto w-full" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, animation: "fadeIn 0.3s ease-out" }}>
            <div
              onClick={triggerUpload}
              className="upload-zone-btn"
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                border: "2px dashed rgba(248,107,109,0.45)",
                borderRadius: 24,
                padding: "54px 24px",
                backgroundColor: "rgba(255,255,255,0.45)",
                backdropFilter: "blur(12px)",
                margin: "40px auto 0",
                width: "100%",
                maxWidth: 400,
                boxShadow: "0 8px 32px rgba(171, 191, 242, 0.25)",
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && triggerUpload()}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "rgba(248,107,109,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Upload size={28} color="#F86B6D" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#1E293B",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  Upload a conversation screenshot
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    fontWeight: 600,
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  JPG, PNG, HEIC — any chat screenshot
                </p>
              </div>
            </div>

            {/* Action elements shown initially */}
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

              {/* Generate Rizz Lines Button */}
              <button
                onClick={triggerUpload}
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
                id="generate-rizz-btn"
              >
                generate rizz lines
              </button>
            </div>
          </div>
        ) : (
          /* Result Area (iMessage + Slider + Action) */
          <div className="flex flex-col md:flex-row gap-6 w-full items-start" style={{ animation: "fadeIn 0.3s ease-out", flex: 1 }}>
            
            {/* Left Column: Stats/Controls */}
            <div className="w-full md:w-[320px] order-last md:order-first flex-shrink-0 flex flex-col gap-4 bg-white/40 dark:bg-white/[0.04] p-5 rounded-[24px] border border-black/[0.04] dark:border-white/[0.05] items-center">
              <div style={{ fontSize: 44 }}>💬</div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--text)", margin: 0, textAlign: "center" }}>Screenshot Analyzed!</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, textAlign: "center", lineHeight: 1.4 }}>
                We&apos;ve scanned the conversation. Adjust the spice levels below to match your vibe.
              </p>

              {/* Chilly Slider */}
              <ChiliSlider value={sliderValue} onChange={setSliderValue} />

              {/* gimme another Button */}
              <button
                onClick={handleGimmeAnother}
                style={{
                  width: "100%",
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: "#F86B6D",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 0px #D95657, 0 4px 10px rgba(248, 107, 109, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.1s, box-shadow 0.1s",
                  marginTop: 10,
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translateY(4px)";
                  e.currentTarget.style.boxShadow = "0 2px 0px #D95657, 0 2px 6px rgba(248, 107, 109, 0.25)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "0 4px 0px #D95657, 0 4px 10px rgba(248, 107, 109, 0.25)";
                }}
                id="gimme-another-btn"
              >
                gimme another
              </button>
            </div>

            {/* Right Column: iMessage Chat Bubbles */}
            <div className="flex-1 w-full order-first md:order-last flex flex-col items-center justify-center gap-4">
              {/* iMessage Stack */}
              <div className="imessage-container" style={{ margin: "0 auto", width: "100%", maxWidth: "380px" }}>
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
                  marginTop: 10,
                }}
              >
                <span>💡</span>
                <span>Tap or press any line to copy</span>
              </div>
            </div>

          </div>
        )}
      </div>

      <CopiedToast visible={toastVisible} onHide={() => setToastVisible(false)} />
    </PageLayout>
  );
}
