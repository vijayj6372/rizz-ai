"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Heart, Upload, RefreshCw, Copy, Shield, Sparkles, MessageSquare } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CopiedToast } from "@/components/CopiedToast";
import { HeaderTitle } from "@/components/HeaderTitle";
import { CRUSH_COMMENTS } from "@/data/crushAnalysisData";

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const BADGES = [
  "Solid 5 Energy 🐝",
  "Top Tier Rizz 👑",
  "Wife Material 💍",
  "Husband Material 🥂",
  "Dangerous Vibe ⚡",
  "Pure Gold ✨"
];

const RECOMMENDATIONS = [
  { verdict: "MARRY THEM", text: "Absolute catch. Send that text right now!" },
  { verdict: "GO FOR IT", text: "High potential. They are definitely interested." },
  { verdict: "WHY NOT", text: "Decent but you could aim higher." },
  { verdict: "DANGER ZONE", text: "High risk of heartbreak. Proceed with caution." }
];

export default function RateMyCrushPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [yourName, setYourName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [animateBars, setAnimateBars] = useState(false);

  // Result parameters
  const [score, setScore] = useState<number>(6.2);
  const [badge, setBadge] = useState<string>("Solid 5 Energy 🐝");
  const [datingPotential, setDatingPotential] = useState<number>(70);
  const [verdict, setVerdict] = useState<string>("WHY NOT");
  const [verdictDesc, setVerdictDesc] = useState<string>("Decent but you could aim higher.");
  const [comment, setComment] = useState<string>("");
  const [breakdown, setBreakdown] = useState<{ label: string; val: number }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
      setHasRated(false);
      setAnimateBars(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!imagePreview || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnimateBars(false);

    setTimeout(() => {
      // Calculate randomized game parameters
      const rawScore = parseFloat((Math.random() * (9.5 - 4.5) + 4.5).toFixed(1));
      setScore(rawScore);
      setBadge(getRandomItem(BADGES));
      setDatingPotential(Math.min(99, Math.max(15, Math.floor(rawScore * 10 - Math.random() * 8))));

      let rec = RECOMMENDATIONS[2];
      if (rawScore >= 8.5) rec = RECOMMENDATIONS[0];
      else if (rawScore >= 7.0) rec = RECOMMENDATIONS[1];
      else if (rawScore < 5.3) rec = RECOMMENDATIONS[3];

      setVerdict(rec.verdict);
      setVerdictDesc(rec.text);

      const generatedBreakdown = [
        { label: "Attractiveness", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Rizz Potential", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Partner Energy", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Face Symmetry", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
        { label: "Vibe Score", val: parseFloat((rawScore + (Math.random() * 1.6 - 0.8)).toFixed(1)) },
      ].map(m => ({
        ...m,
        val: Math.min(10, Math.max(2, m.val))
      }));

      setBreakdown(generatedBreakdown);
      setComment(getRandomItem(CRUSH_COMMENTS));
      setIsAnalyzing(false);
      setHasRated(true);

      // Trigger metric bar fill animations
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const reset = () => {
    setImagePreview(null);
    setHasRated(false);
    setAnimateBars(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fullVerdictString = `Rizz AI Crush Rating: ${score}/10 | Potential: ${datingPotential}%\nRecommendation: ${verdict} - ${verdictDesc}\n"${comment}"`;

  return (
    <PageLayout
      showBack
      backHref="/fun-features"
      variant="dark"
      header={<HeaderTitle title="Rizz AI" />}
    >
      {/* Dynamic Keyframes Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.15); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          70% { transform: scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pulse-heart {
          animation: heartbeat 1.6s infinite ease-in-out;
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

      {/* Hidden file selector */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="crush-file-input"
        aria-label="Upload photo of your crush"
      />

      {/* simulated loader dialog */}
      {isAnalyzing && (
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
            <RefreshCw size={36} color="#E040A0" style={{ animation: "spin 1.2s linear infinite" }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Analyzing photo...</span>
          </div>
        </div>
      )}

      {/* Screen view content */}
      <div className="w-full max-w-[400px] md:max-w-[900px] mx-auto" style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%", gap: 20 }}>
        
        {!hasRated ? (
          /* State 1: Initial Upload Screen */
          <div className="animate-slide-up max-w-[400px] mx-auto w-full" style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.45)",
                fontWeight: 800,
                letterSpacing: 2,
                textAlign: "center",
                textTransform: "uppercase",
                margin: "-6px 0 0",
              }}
            >
              HONEST RATING · 1–10 · NO SUGARCOATING
            </p>

            {/* Optional Names Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Your Name</label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Crush's Name</label>
                <input
                  type="text"
                  value={crushName}
                  onChange={(e) => setCrushName(e.target.value)}
                  placeholder="Enter your crush's name"
                  className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>
            </div>

            {/* Dash container upload zone */}
            <div
              onClick={triggerUpload}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                border: "2px dashed rgba(224, 64, 160, 0.35)",
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
                    alt="Crush photo preview"
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
                  <div className="pulse-heart">
                    <Heart size={48} color="#E040A0" fill="#E040A0" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", margin: 0, textAlign: "center" }}>
                      Upload Photo of Your Crush
                    </p>
                    <p style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.45)", margin: 0, textAlign: "center" }}>
                      We&apos;ll give you the honest truth
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Rate them now button */}
            <button
              onClick={handleAnalyze}
              disabled={!imagePreview || isAnalyzing}
              style={{
                width: "100%",
                height: 56,
                borderRadius: 28,
                backgroundColor: imagePreview ? "#E040A0" : "rgba(255,255,255,0.06)",
                color: imagePreview ? "#FFFFFF" : "rgba(255,255,255,0.25)",
                fontSize: 17,
                fontWeight: 900,
                border: "none",
                cursor: !imagePreview || isAnalyzing ? "not-allowed" : "pointer",
                boxShadow: imagePreview ? "0 6px 0px #C2185B, 0 6px 16px rgba(224, 64, 160, 0.25)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "transform 0.1s, box-shadow 0.1s",
              }}
              onMouseDown={(e) => {
                if (!imagePreview) return;
                e.currentTarget.style.transform = "translateY(4px)";
                e.currentTarget.style.boxShadow = "0 2px 0px #C2185B, 0 2px 6px rgba(224, 64, 160, 0.25)";
              }}
              onMouseUp={(e) => {
                if (!imagePreview) return;
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 6px 0px #C2185B, 0 6px 16px rgba(224, 64, 160, 0.25)";
              }}
            >
              <Heart size={16} fill={imagePreview ? "#fff" : "none"} stroke={imagePreview ? "#fff" : "currentColor"} />
              Rate Them Now!
            </button>

            {/* Bottom details badges */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", marginTop: "auto", opacity: 0.4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>🔒 100% Private</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>⚡ Works Offline</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>✨ Instant Results</span>
            </div>
          </div>
        ) : (
          /* State 2: Post-Upload Result Screen (Image 1) */
          <div className="animate-slide-up flex flex-col md:flex-row gap-6 w-full items-start" style={{ paddingBottom: 40 }}>
            
            {/* Left Column: Rating & Actions */}
            <div className="w-full md:w-[340px] flex-shrink-0 flex flex-col gap-4">
              {/* Card 1: Overall Rating card */}
              <div
                className="interactive-card"
                style={{
                  backgroundColor: "#161622",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 24,
                  padding: 16,
                  display: "flex",
                  flexDirection: "row",
                  gap: 16,
                  position: "relative",
                }}
              >
                {/* Photo Left */}
                <div style={{ width: 90, height: 100, borderRadius: 16, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Crush photo small"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>

                {/* Stats Right */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
                    Overall Rating
                  </span>
                  
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginTop: 2 }}>
                    <span style={{ fontSize: 38, fontWeight: 950, color: "#D946EF", lineHeight: 1 }}>
                      {score}
                    </span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontWeight: 700 }}>/10</span>
                  </div>

                  {/* Star rating icons */}
                  <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: 16,
                          color: s <= Math.round(score / 2) ? "#D946EF" : "rgba(255,255,255,0.12)"
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Energy Badge Top-Right */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    backgroundColor: "rgba(217, 70, 239, 0.15)",
                    border: "1.5px solid rgba(217, 70, 239, 0.4)",
                    color: "#D946EF",
                    borderRadius: 12,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.2,
                  }}
                >
                  {badge}
                </div>
              </div>

              {/* Dating Potential Row */}
              <div
                className="interactive-card"
                style={{
                  backgroundColor: "#161622",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 18,
                  padding: "14px 18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.65)" }}>
                  Dating Potential
                </span>

                {/* Slider Track */}
                <div style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: animateBars ? `${datingPotential}%` : "0%",
                      backgroundColor: "#D946EF",
                      borderRadius: 4,
                      transition: "width 1s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                  />
                </div>

                <span style={{ fontSize: 13, fontWeight: 900, color: "#D946EF" }}>
                  {datingPotential}%
                </span>
              </div>

              {/* Actions dual buttons */}
              <div style={{ display: "flex", flexDirection: "row", gap: 12, marginTop: 4 }}>
                {/* Try another */}
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
                  Try Another
                </button>

                {/* Re-Rate */}
                <button
                  onClick={handleAnalyze}
                  style={{
                    flex: 1,
                    paddingTop: 16,
                    paddingBottom: 16,
                    borderRadius: 18,
                    backgroundColor: "#D946EF",
                    border: "none",
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(217, 70, 239, 0.35)",
                    transition: "all 0.15s",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Re-Rate
                </button>
              </div>
            </div>

            {/* Right Column: Breakdown & analysis cards */}
            <div className="flex-1 w-full flex flex-col gap-4">
              {/* Card 2: AI Recommendation Card */}
              <div
                className="interactive-card"
                style={{
                  backgroundColor: "#161622",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 24,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5 }}>
                  AI RECOMMENDATION
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 950, color: "#D946EF", margin: 0, letterSpacing: 0.5 }}>
                  {verdict}
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500, margin: 0 }}>
                  {verdictDesc}
                </p>
              </div>

              {/* Card 3: Detailed Breakdown Card */}
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
                  Detailed Breakdown
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {breakdown.map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Label */}
                      <span style={{ width: 100, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)" }}>
                        {item.label}
                      </span>

                      {/* Progress Fill bar */}
                      <div style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: animateBars ? `${item.val * 10}%` : "0%",
                            backgroundColor: "#D946EF",
                            borderRadius: 3,
                            transition: "width 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
                          }}
                        />
                      </div>

                      {/* Score */}
                      <span style={{ width: 24, fontSize: 12, fontWeight: 900, color: "#D946EF", textAlign: "right" }}>
                        {item.val.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: AI Analysis speech bubble card */}
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
                      AI Analysis
                    </span>
                  </div>

                  {/* Small tap-to-copy button */}
                  <button
                    onClick={() => handleCopyText(comment)}
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
                  {comment}
                </p>
              </div>

              {/* Tap to copy full verdict button */}
              <button
                onClick={() => handleCopyText(fullVerdictString)}
                style={{
                  width: "100%",
                  paddingTop: 14,
                  paddingBottom: 14,
                  borderRadius: 16,
                  border: "1px solid rgba(217, 70, 239, 0.25)",
                  backgroundColor: "rgba(217, 70, 239, 0.03)",
                  color: "#D946EF",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(217, 70, 239, 0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(217, 70, 239, 0.03)")}
              >
                <Copy size={13} />
                Tap to copy full verdict
              </button>

              {/* Rating count info */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: 0.35, marginTop: 4 }}>
                <span style={{ fontSize: 12 }}>👥</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
                  2,745 people rated crushes today
                </span>
              </div>
            </div>
            
          </div>
        )}
      </div>

      <CopiedToast visible={toastVisible} onHide={() => setToastVisible(false)} />
    </PageLayout>
  );
}
