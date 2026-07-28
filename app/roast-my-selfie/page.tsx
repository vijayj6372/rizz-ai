"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Camera, Upload, RefreshCw, Copy, MessageSquare, Flame } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CopiedToast } from "@/components/CopiedToast";
import { HeaderTitle } from "@/components/HeaderTitle";
import { ROASTS, RoastMode } from "@/data/roastData";

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const GLOW_UP_TIPS = [
  "Cold shower in the morning — reduces puffiness and boosts energy.",
  "Fix your posture — keeping your shoulders back instantly boosts attractiveness by 20%.",
  "Hydrate more — swap one soda for water daily to clear up your skin.",
  "Get a modern haircut — a high skin fade or textured crop works wonders.",
  "Invest in a basic skincare routine — cleanser, moisturizer, sunscreen.",
  "Start gua sha or face rolling — defines your jawline and reduces swelling."
];

const MODES = [
  { id: "mild" as RoastMode, label: "Mild", color: "#F59E0B", shadow: "#D97706" },
  { id: "savage" as RoastMode, label: "🔥 Savage", color: "#FF5A36", shadow: "#C83C1C" },
  { id: "brutal" as RoastMode, label: "Brutal", color: "#8B5CF6", shadow: "#6D28D9" }
];

export default function RoastMySelfiePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<RoastMode>("savage");
  const [isRoasting, setIsRoasting] = useState(false);
  const [hasRoasted, setHasRoasted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [animateBars, setAnimateBars] = useState(false);

  // Result parameters
  const [score, setScore] = useState<number>(3.1);
  const [roastText, setRoastText] = useState<string>("");
  const [glowUpTip, setGlowUpTip] = useState<string>("");
  const [breakdown, setBreakdown] = useState<{ label: string; val: number }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
      setHasRoasted(false);
      setAnimateBars(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRoast = () => {
    if (!imagePreview || isRoasting) return;
    setIsRoasting(true);
    setAnimateBars(false);

    setTimeout(() => {
      // Calculate randomized score and breakdown based on intensity mode
      let rawScore = 3.1;
      if (selectedMode === "mild") {
        rawScore = parseFloat((Math.random() * (7.5 - 5.0) + 5.0).toFixed(1));
      } else if (selectedMode === "savage") {
        rawScore = parseFloat((Math.random() * (4.8 - 2.8) + 2.8).toFixed(1));
      } else {
        rawScore = parseFloat((Math.random() * (2.7 - 1.0) + 1.0).toFixed(1));
      }

      setScore(rawScore);

      const generatedBreakdown = [
        { label: "Jawline", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Eyes", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Skin", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Hair", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Style", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Vibe", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) }
      ].map(m => ({
        ...m,
        val: Math.min(10, Math.max(1, m.val))
      }));

      setBreakdown(generatedBreakdown);

      // Select roast list based on mode
      const list = ROASTS[selectedMode];
      setRoastText(getRandomItem(list));
      setGlowUpTip(getRandomItem(GLOW_UP_TIPS));

      setIsRoasting(false);
      setHasRoasted(true);

      // Trigger metric bar animations
      setTimeout(() => {
        setAnimateBars(true);
      }, 100);
    }, 1500);
  };

  const handleCopyText = useCallback(async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = textToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedText(textToCopy);
    setToastVisible(true);
  }, []);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setImagePreview(null);
    setHasRoasted(false);
    setAnimateBars(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const activeModeDetails = MODES.find(m => m.id === selectedMode) || MODES[1];

  return (
    <PageLayout
      showBack
      backHref="/fun-features"
      variant="dark"
      header={<HeaderTitle title="Rizz AI" />}
    >
      {/* Keyframe Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: fadeSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .interactive-card {
          transition: transform 0.2s;
        }
        .interactive-card:hover {
          transform: translateY(-2px);
        }
      ` }} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="roast-file-input"
        aria-label="Upload photo to roast"
      />

      {/* simulated loader dialog */}
      {isRoasting && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              backgroundColor: "#1E1E2E",
              padding: "24px 32px",
              borderRadius: 22,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
            }}
          >
            <RefreshCw size={36} color={activeModeDetails.color} style={{ animation: "spin 1.2s linear infinite" }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Generating roast...</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%", maxWidth: 400, margin: "0 auto", gap: 16 }}>
        
        {/* Roast Intensity Selector (Always visible at the top) */}
        <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: "0 4px" }}>
          {MODES.map((m) => {
            const isSelected = selectedMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMode(m.id);
                  if (hasRoasted) {
                    // Regenerate if they switch modes on the result screen
                    setHasRoasted(false);
                    setAnimateBars(false);
                  }
                }}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                  border: isSelected ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: isSelected ? m.color : "rgba(255, 255, 255, 0.04)",
                  color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.45)",
                  transition: "all 0.18s cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isSelected ? `0 4px 12px ${m.color}35` : "none",
                }}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {!hasRoasted ? (
          /* State 1: Initial Upload Screen */
          <div className="animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, marginTop: 12 }}>
            
            {/* Dashed upload zone */}
            <div
              onClick={triggerUpload}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                border: `2px dashed ${activeModeDetails.color}55`,
                borderRadius: 24,
                padding: imagePreview ? "16px" : "80px 24px",
                backgroundColor: "rgba(255,255,255,0.01)",
                transition: "border-color 0.2s, background-color 0.2s",
                position: "relative",
                aspectRatio: imagePreview ? "1/1" : "auto",
                overflow: "hidden",
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && triggerUpload()}
            >
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="Selfie preview"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "rgba(0,0,0,0.55)",
                      padding: "8px 0",
                      textAlign: "center",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                      Tap to change photo
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Camera size={44} color={activeModeDetails.color} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    <p style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF", margin: 0, textAlign: "center" }}>
                      Upload Your Selfie
                    </p>
                    <p style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.45)", margin: 0, textAlign: "center" }}>
                      Tap to pick a photo
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Roast Button */}
            <button
              onClick={handleRoast}
              disabled={!imagePreview || isRoasting}
              style={{
                width: "100%",
                height: 56,
                borderRadius: 28,
                backgroundColor: imagePreview ? activeModeDetails.color : "rgba(255,255,255,0.06)",
                color: imagePreview ? "#FFFFFF" : "rgba(255,255,255,0.25)",
                fontSize: 17,
                fontWeight: 900,
                border: "none",
                cursor: !imagePreview || isRoasting ? "not-allowed" : "pointer",
                boxShadow: imagePreview ? `0 6px 0px ${activeModeDetails.shadow}, 0 6px 16px rgba(255, 90, 54, 0.2)` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "transform 0.1s, box-shadow 0.1s",
              }}
              onMouseDown={(e) => {
                if (!imagePreview) return;
                e.currentTarget.style.transform = "translateY(4px)";
                e.currentTarget.style.boxShadow = `0 2px 0px ${activeModeDetails.shadow}, 0 2px 6px rgba(255, 90, 54, 0.2)`;
              }}
              onMouseUp={(e) => {
                if (!imagePreview) return;
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = `0 6px 0px ${activeModeDetails.shadow}, 0 6px 16px rgba(255, 90, 54, 0.2)`;
              }}
            >
              <Flame size={16} fill={imagePreview ? "#fff" : "none"} stroke={imagePreview ? "#fff" : "currentColor"} />
              Roast Me!
            </button>

            {/* Bottom info row labels */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", marginTop: "auto", paddingBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Flame size={13} color={activeModeDetails.color} fill={activeModeDetails.color} />
                <span style={{ fontSize: 12, fontWeight: 800, color: activeModeDetails.color }}>
                  We will not hold back.
                </span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255, 255, 255, 0.3)" }}>
                👥 256 unique roasts ready
              </span>
            </div>
          </div>
        ) : (
          /* State 2: Result Screen (Image 2 & 3) */
          <div className="animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 40, marginTop: 4 }}>
            
            {/* Mode & Roast Stats row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: `1.5px solid ${activeModeDetails.color}60`,
                  color: activeModeDetails.color,
                  borderRadius: 14,
                  padding: "6px 12px",
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Flame size={11} fill={activeModeDetails.color} stroke={activeModeDetails.color} />
                {selectedMode.toUpperCase()} MODE
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>
                👥 1,935 roasted today
              </span>
            </div>

            {/* Picture Display with Attractiveness Overlay */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Selfie rating display"
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
              
              {/* Attractiveness rating overlay at bottom-left */}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 2,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 800, color: "#FFFFFF", opacity: 0.75, letterSpacing: 0.5, textTransform: "uppercase" }}>
                  Attractiveness
                </span>
                
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginTop: 1 }}>
                  <span style={{ fontSize: 32, fontWeight: 950, color: "#FF9F1C", lineHeight: 1 }}>
                    {score}
                  </span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>/10</span>
                </div>
              </div>

              {/* Bottom vignette overlay to make text pop */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Card 1: Face Breakdown */}
            <div
              className="interactive-card"
              style={{
                backgroundColor: "#161622",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 24,
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <h4 style={{ fontSize: 15, fontWeight: 900, color: "#FFFFFF", margin: 0 }}>
                Face Breakdown
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {breakdown.map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Label */}
                    <span style={{ width: 80, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)" }}>
                      {item.label}
                    </span>

                    {/* Progress Fill bar */}
                    <div style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: animateBars ? `${item.val * 10}%` : "0%",
                          backgroundColor: activeModeDetails.color,
                          borderRadius: 3,
                          transition: "width 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
                        }}
                      />
                    </div>

                    {/* Score */}
                    <span style={{ width: 24, fontSize: 12, fontWeight: 900, color: activeModeDetails.color, textAlign: "right" }}>
                      {item.val.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Roast bubble card */}
            <div
              className="interactive-card"
              style={{
                backgroundColor: "#161622",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 24,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MessageSquare size={15} color="rgba(255,255,255,0.45)" />
                  <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: 0.2 }}>
                    AI Roast
                  </span>
                </div>

                {/* Small tap-to-copy button */}
                <button
                  onClick={() => handleCopyText(roastText)}
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.45)",
                    borderRadius: 8,
                    padding: "3px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.1s",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Copy size={10} />
                  Tap to copy
                </button>
              </div>

              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
                {roastText}
              </p>
            </div>

            {/* Card 3: Glow-Up Tip Card */}
            <div
              className="interactive-card"
              style={{
                backgroundColor: "#161622",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 24,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Flame size={15} color="#FF9F1C" fill="#FF9F1C" />
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#FF9F1C", letterSpacing: 0.2 }}>
                    Glow-Up Tip:
                  </span>
                </div>

                {/* Small tap-to-copy button */}
                <button
                  onClick={() => handleCopyText(glowUpTip)}
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.45)",
                    borderRadius: 8,
                    padding: "3px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.1s",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Copy size={10} />
                  Tap to copy
                </button>
              </div>

              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.55, fontWeight: 500, margin: 0, fontStyle: "italic" }}>
                &ldquo;{glowUpTip}&rdquo;
              </p>
            </div>

            {/* Actions dual buttons */}
            <div style={{ display: "flex", flexDirection: "row", gap: 12, marginTop: 12 }}>
              {/* New Selfie */}
              <button
                onClick={reset}
                style={{
                  flex: 1,
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
              >
                New Selfie
              </button>

              {/* Roast Again */}
              <button
                onClick={handleRoast}
                style={{
                  flex: 1,
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderRadius: 18,
                  backgroundColor: activeModeDetails.color,
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: `0 4px 14px ${activeModeDetails.color}35`,
                  transition: "all 0.15s",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Roast Again
              </button>
            </div>
          </div>
        )}
      </div>

      <CopiedToast visible={toastVisible} onHide={() => setToastVisible(false)} />
    </PageLayout>
  );
}
