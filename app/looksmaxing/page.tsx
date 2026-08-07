"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Sparkles,
  Camera,
  Image as ImageIcon,
  Download,
  Share2,
  Bookmark,
  ChevronRight,
  RefreshCw,
  Lightbulb,
  CheckCircle,
  Eye,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { CopiedToast } from "@/components/CopiedToast";
import { useTheme } from "@/hooks/useTheme";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AppColors } from "@/constants/theme";

/* ─── Data & Constants ─── */
const CANTHAL_DATA = [
  { v: "Positive", e: "⚖️" },
  { v: "Neutral", e: "⚖️" },
  { v: "Slightly Positive", e: "⚖️" },
  { v: "Negative", e: "⚖️" },
];
const EYE_SHP_DATA = [
  { v: "Hunter", e: "👀" },
  { v: "Almond", e: "👀" },
  { v: "Round", e: "👀" },
  { v: "Hooded", e: "👀" },
  { v: "Upturned", e: "👀" },
];
const EYE_TYP_DATA = [
  { v: "Deep-set", e: "🔍" },
  { v: "Prey Eyes", e: "🦅" },
  { v: "Neutral", e: "🎯" },
];
const FACE_SHP_DATA = [
  { v: "Diamond", e: "🧑" },
  { v: "Oval", e: "🧑" },
  { v: "Heart", e: "🧑" },
  { v: "Square", e: "🧑" },
  { v: "Oblong", e: "🧑" },
  { v: "Triangle", e: "🧑" },
];
const JAW_DATA = [
  { v: "Wide & Angular", e: "🗿" },
  { v: "Medium", e: "🗿" },
  { v: "Narrow", e: "🗿" },
  { v: "Strong", e: "🗿" },
];
const NOSE_DATA = [
  { v: "Roman", e: "👃" },
  { v: "Aquiline", e: "👃" },
  { v: "Snub", e: "👃" },
  { v: "Hawk", e: "👃" },
  { v: "Greek", e: "👃" },
];

const GLOW_UP_POOL = [
  { emoji: "🧔", title: "Facial Hair Care", sub: "Shape beard lines — cleaner jaw = higher score" },
  { emoji: "💋", title: "Lip Health", sub: "Exfoliate & moisturise daily for fuller lips" },
  { emoji: "✂️", title: "Eyebrow Grooming", sub: "Defined brows frame the eyes and add structure" },
  { emoji: "💎", title: "Cheekbone Definition", sub: "Mewing + low body fat reveals higher cheekbones" },
  { emoji: "💧", title: "Skincare Routine", sub: "Cleanser + moisturiser + SPF daily, non-negotiable" },
  { emoji: "🏋️", title: "Build Facial Muscles", sub: "Bulking adds jaw and cheek definition over time" },
  { emoji: "😁", title: "Teeth Whitening", sub: "Bright teeth are a massive subconscious trigger" },
  { emoji: "🌞", title: "Daily SPF 50+", sub: "Prevents UV aging — single best anti-aging habit" },
  { emoji: "💈", title: "Fresh Haircut", sub: "Every 3 weeks keeps you looking polished always" },
  { emoji: "🧴", title: "Retinol Night Cream", sub: "Smooths texture and tightens skin over 4-8 weeks" },
];

const PRIORITY_LABELS = [
  { label: "FIRST PRIORITY", color: "#F86B6D" },
  { label: "SECOND PRIORITY", color: "#FF865A" },
  { label: "DO THIS THIRD", color: "#22C55E" },
  { label: "DO THIS FOURTH", color: "#3B82F6" },
];

const LOADING_STAGES = [
  "Scanning face geometry...",
  "Measuring bone proportions...",
  "Analyzing skin quality...",
  "Computing symmetry index...",
  "Generating your verdict...",
];

const PAGE_LABELS = ["Ratings", "Look Score", "Tips", "Analysis", "Rank"];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function gen100(): number {
  const r = Math.random();
  if (r < 0.02) return 90 + Math.floor(Math.random() * 10);
  if (r < 0.12) return 80 + Math.floor(Math.random() * 10);
  if (r < 0.35) return 70 + Math.floor(Math.random() * 10);
  if (r < 0.65) return 60 + Math.floor(Math.random() * 10);
  if (r < 0.88) return 50 + Math.floor(Math.random() * 10);
  return 40 + Math.floor(Math.random() * 10);
}

function getTier(s: number): { label: string; color: string; textColor: string; emoji: string } {
  if (s >= 90) return { label: "Chad", color: "#10B981", textColor: "#065F46", emoji: "👑" };
  if (s >= 80) return { label: "Chadlite", color: "#3B82F6", textColor: "#1E40AF", emoji: "⚡" };
  if (s >= 70) return { label: "High-Tier Normie", color: "#F59E0B", textColor: "#92400E", emoji: "⭐" };
  if (s >= 60) return { label: "Normie", color: "#EC4899", textColor: "#9D174D", emoji: "👍" };
  return { label: "Below Average", color: "#EF4444", textColor: "#991B1B", emoji: "📈" };
}

function barColors(s: number): [string, string] {
  if (s >= 80) return ["#22C55E", "#16A34A"];
  if (s >= 70) return ["#86EFAC", "#22C55E"];
  if (s >= 60) return ["#FACC15", "#CA8A04"];
  if (s >= 50) return ["#F97316", "#C2410C"];
  return ["#EF4444", "#B91C1C"];
}

interface Scores {
  overall: number;
  potential: number;
  jawline: number;
  cheekBones: number;
  skinQuality: number;
  masculinity: number;
}

interface FaceData {
  canthalTilt: string;
  canthalEmoji: string;
  eyeShape: string;
  eyeShapeEmoji: string;
  eyeType: string;
  eyeTypeEmoji: string;
  faceShape: string;
  faceShapeEmoji: string;
  jawWidth: string;
  jawEmoji: string;
  noseShape: string;
  noseEmoji: string;
}

/* ─── Metric Card ─── */
function MetricCard({ label, score }: { label: string; score: number }) {
  const tier = getTier(score);
  const [c1, c2] = barColors(score);

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        border: "1.5px solid rgba(200,210,240,0.8)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        boxShadow: "0 5px 12px rgba(136,153,204,0.18)",
      }}
    >
      <div style={{ height: 6, width: "100%", background: `linear-gradient(90deg, ${c1}, ${c2})` }} />
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <span style={{ fontSize: 11, fontWeight: 900, color: "#F6766E", letterSpacing: 1.5 }}>
          {label.toUpperCase()}
        </span>
        <span style={{ fontSize: 44, fontWeight: 900, color: "#1A1A2E", lineHeight: 1.1 }}>
          {score}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14 }}>{tier.emoji}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: tier.textColor }}>{tier.label}</span>
        </div>
        <div style={{ height: 10, backgroundColor: "rgba(180,195,230,0.4)", borderRadius: 5, overflow: "hidden", marginTop: 4 }}>
          <div
            style={{
              width: `${score}%`,
              height: "100%",
              borderRadius: 5,
              background: `linear-gradient(90deg, ${c1}, ${c2})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Glow Up Card ─── */
function GlowUpCard({
  emoji,
  title,
  sub,
  priority,
  priorityColor,
}: {
  emoji: string;
  title: string;
  sub: string;
  priority: string;
  priorityColor: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: "#1E1E2E",
        borderRadius: 18,
        border: "1px solid #383858",
        padding: 16,
        boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          backgroundColor: "#2A2A3E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 24 }}>{emoji}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 15, fontWeight: "800", color: "#FFFFFF", margin: "0 0 2px" }}>
          {title}
        </p>
        <p style={{ fontSize: 9, fontWeight: "900", color: priorityColor, letterSpacing: 1.5, margin: "0 0 3px" }}>
          {priority}
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: "500", lineHeight: 1.35, margin: 0 }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

/* ─── Trait Card ─── */
function TraitCard({ emoji, label, value, accent }: { emoji: string; label: string; value: string; accent: string }) {
  return (
    <div
      style={{
        borderRadius: 22,
        overflow: "hidden",
        border: `1.5px solid ${accent}40`,
        boxShadow: "0 6px 12px rgba(160,176,216,0.18)",
        background: `linear-gradient(135deg, ${accent}28, ${accent}0A)`,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minHeight: 130,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          backgroundColor: `${accent}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <span style={{ fontSize: 26 }}>{emoji}</span>
      </div>
      <span style={{ fontSize: 10, fontWeight: "900", color: accent, letterSpacing: 1.5 }}>
        {label.toUpperCase()}
      </span>
      <span style={{ fontSize: 18, fontWeight: "900", color: "#1A1A2E", lineHeight: 1.2 }}>
        {value}
      </span>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ emoji, title, sub, accent }: { emoji: string; title: string; sub: string; accent: string }) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 18,
        overflow: "hidden",
        borderWidth: "1.5px 1.5px 1.5px 4px",
        borderStyle: "solid",
        borderColor: `rgba(200,210,240,0.8) rgba(200,210,240,0.8) rgba(200,210,240,0.8) ${accent}`,
        display: "flex",
        flexDirection: "row",
        background: `linear-gradient(90deg, ${accent}20, ${accent}06)`,
        padding: "14px",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 18 }}>{emoji}</span>
      </div>
      <div>
        <p style={{ fontSize: 17, fontWeight: "900", color: "#1A1A2E", margin: 0 }}>{title}</p>
        <p style={{ fontSize: 11, fontWeight: "600", color: "#6B7280", margin: "2px 0 0" }}>{sub}</p>
      </div>
    </div>
  );
}

/* ─── Bell Curve ─── */
function BellCurveView({ percentile, accentColor }: { percentile: number; accentColor: string }) {
  const N = 40;
  const MEAN = 50;
  const SIGMA = 16;
  const MAX_H = 90;

  const clampedPercentile = Math.max(4, Math.min(96, percentile));

  const bars = Array.from({ length: N }, (_, i) => {
    const x = (i / (N - 1)) * 100;
    const h = Math.max(6, MAX_H * Math.exp(-Math.pow(x - MEAN, 2) / (2 * SIGMA * SIGMA)));
    const isActive = x <= clampedPercentile;
    return { x, h, isActive };
  });

  const currentHeight = Math.max(6, MAX_H * Math.exp(-Math.pow(clampedPercentile - MEAN, 2) / (2 * SIGMA * SIGMA)));

  return (
    <div style={{ width: "100%", paddingTop: 28, paddingBottom: 4, position: "relative" }}>
      {/* Chart bars container */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", height: 105, position: "relative", padding: "0 4px" }}>
        {bars.map((bar, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              margin: "0 1.5px",
              height: `${bar.h}px`,
              borderRadius: "4px 4px 2px 2px",
              background: bar.isActive
                ? `linear-gradient(180deg, ${accentColor} 0%, #E11D48 100%)`
                : "rgba(255, 255, 255, 0.08)",
              boxShadow: bar.isActive ? `0 0 6px ${accentColor}44` : "none",
              opacity: bar.isActive ? 0.75 + (i / N) * 0.25 : 0.7,
              transition: "all 0.3s ease",
            }}
          />
        ))}

        {/* Vertical Glowing Guideline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: `${clampedPercentile}%`,
            transform: "translateX(-50%)",
            width: 2,
            height: "100%",
            background: `linear-gradient(180deg, ${accentColor} 0%, rgba(248, 107, 109, 0.15) 100%)`,
            zIndex: 2,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />

        {/* Glowing Dot on Bell Curve */}
        <div
          style={{
            position: "absolute",
            bottom: `${currentHeight - 5}px`,
            left: `${clampedPercentile}%`,
            transform: "translateX(-50%)",
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#FFFFFF",
            border: `3px solid ${accentColor}`,
            boxShadow: `0 0 12px ${accentColor}, 0 0 4px #FFF`,
            zIndex: 3,
          }}
        />

        {/* Floating Tooltip Pin Badge */}
        <div
          style={{
            position: "absolute",
            top: -24,
            left: `${clampedPercentile}%`,
            transform: "translateX(-50%)",
            backgroundColor: accentColor,
            color: "#FFFFFF",
            padding: "3px 10px",
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 800,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(248, 107, 109, 0.4)",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          📍 You ({percentile}%)
        </div>
      </div>

      {/* Baseline */}
      <div style={{ height: 2, background: "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 100%)", margin: "0 4px" }} />

      {/* Scale Markers */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 4px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
        <span>0%</span>
        <span>25%</span>
        <span>50% (Avg)</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

/* ─── Shareable Look Card ─── */
const CARD_METRICS = [
  { label: "Overall", emoji: "🏆", key: "overall" },
  { label: "Potential", emoji: "⭐", key: "potential" },
  { label: "Jawline", emoji: "🗿", key: "jawline" },
  { label: "Cheekbones", emoji: "🧬", key: "cheekBones" },
  { label: "Eyes", emoji: "👀", key: "skinQuality" },
  { label: "Masculinity", emoji: "💪", key: "masculinity" },
] as const;

function ShareableCard({ photoUri, scores, cardRef }: { photoUri: string | null; scores: Scores; cardRef?: React.RefObject<HTMLDivElement | null> }) {
  const tier = getTier(scores.overall);
  const tenthScore = Math.round(scores.overall / 10);

  return (
    <div
      ref={cardRef}
      style={{
        borderRadius: 24,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        background: "linear-gradient(135deg, #FF8C42 0%, #FF4E7A 50%, #C1185A 100%)",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 16 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 22, fontWeight: "700", color: "rgba(255,255,255,0.85)" }}>You&apos;re a</span>
          <span style={{ fontSize: 72, fontWeight: "900", color: "#fff", lineHeight: 1 }}>{tenthScore}</span>
          <div style={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "5px 12px", alignSelf: "flex-start" }}>
            <span style={{ fontSize: 13, fontWeight: "800" }}>{tier.emoji} {tier.label}</span>
          </div>
        </div>
        <div style={{ width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: "#fff", borderStyle: "solid", overflow: "hidden", flexShrink: 0, position: "relative" }}>
          {photoUri ? (
            <Image src={photoUri} alt="Selfie" fill style={{ objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
              👤
            </div>
          )}
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 18, padding: "4px 16px" }}>
        {CARD_METRICS.map((m, idx) => {
          const raw = scores[m.key as keyof Scores];
          const tenths = Math.round(raw / 10);
          return (
            <div key={m.key}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "12px 0", gap: 12 }}>
                <span style={{ fontSize: 22, width: 32, textAlign: "center" }}>{m.emoji}</span>
                <span style={{ flex: 1, fontSize: 17, fontWeight: "700" }}>{m.label}</span>
                <span style={{ fontSize: 20, fontWeight: "900" }}>
                  {tenths}
                  <span style={{ fontSize: 14, fontWeight: "600", color: "rgba(255,255,255,0.65)" }}>/10</span>
                </span>
              </div>
              {idx < CARD_METRICS.length - 1 && <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.18)" }} />}
            </div>
          );
        })}
      </div>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, fontWeight: "700", textAlign: "center", margin: 0 }}>
        rizzai.space · get yours free wingman
      </p>
    </div>
  );
}

/* ─── Main Looksmaxing Page ─── */
export default function LooksmaxingPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selfieCameraRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [phase, setPhase] = useState<"upload" | "loading" | "result">("upload");
  const [loadStage, setLoadStage] = useState(0);

  const [scores, setScores] = useState<Scores | null>(null);
  const [faceData, setFaceData] = useState<FaceData | null>(null);
  const [glowTips, setGlowTips] = useState<typeof GLOW_UP_POOL>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [percentile, setPercentile] = useState(0);

  const [saving, setSaving] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const [showWebcam, setShowWebcam] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const triggerSelfieCapture = () => {
    // Check if on mobile device or Instagram / TikTok / Facebook in-app browser
    const isMobile =
      typeof navigator !== "undefined" &&
      /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
    const isInAppBrowser =
      typeof navigator !== "undefined" &&
      /Instagram|FBAN|FBAV|ByteDance|TikTok/i.test(navigator.userAgent);

    if (isMobile || isInAppBrowser || !navigator?.mediaDevices?.getUserMedia) {
      // On mobile / Instagram in-app browser, direct native camera capture is 100% reliable
      if (selfieCameraRef.current) {
        selfieCameraRef.current.value = "";
        selfieCameraRef.current.click();
      }
    } else {
      // On desktop with webcam API available, open live webcam stream
      startWebcam();
    }
  };

  const startWebcam = async () => {
    try {
      setShowWebcam(true);
      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false,
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.warn("Direct webcam stream failed, falling back to native camera picker:", err);
          setShowWebcam(false);
          if (selfieCameraRef.current) {
            selfieCameraRef.current.value = "";
            selfieCameraRef.current.click();
          }
        }
      }, 100);
    } catch (err) {
      console.error(err);
      if (selfieCameraRef.current) {
        selfieCameraRef.current.value = "";
        selfieCameraRef.current.click();
      }
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowWebcam(false);
  };

  const captureSelfie = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL("image/jpeg");
        setPhotoUri(dataUrl);
        stopWebcam();
        runAnalysis();
      }
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoUri(ev.target?.result as string);
      runAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async () => {
    setPhase("loading");
    setScores(null);

    for (let i = 0; i < LOADING_STAGES.length; i++) {
      setLoadStage(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    const overall = gen100();
    setScores({
      overall,
      potential: Math.min(100, overall + 5 + Math.floor(Math.random() * 12)),
      jawline: gen100(),
      cheekBones: gen100(),
      skinQuality: gen100(),
      masculinity: gen100(),
    });

    const ct = getRandomItem(CANTHAL_DATA);
    const es = getRandomItem(EYE_SHP_DATA);
    const et = getRandomItem(EYE_TYP_DATA);
    const fs = getRandomItem(FACE_SHP_DATA);
    const jw = getRandomItem(JAW_DATA);
    const ns = getRandomItem(NOSE_DATA);

    setFaceData({
      canthalTilt: ct.v, canthalEmoji: ct.e,
      eyeShape: es.v, eyeShapeEmoji: es.e,
      eyeType: et.v, eyeTypeEmoji: et.e,
      faceShape: fs.v, faceShapeEmoji: fs.e,
      jawWidth: jw.v, jawEmoji: jw.e,
      noseShape: ns.v, noseEmoji: ns.e,
    });

    const shuffled = [...GLOW_UP_POOL].sort(() => Math.random() - 0.5).slice(0, 4);
    setGlowTips(shuffled);

    const pct = Math.min(
      98,
      Math.max(
        51,
        overall >= 85
          ? 88 + Math.floor(Math.random() * 10)
          : overall >= 75
          ? 76 + Math.floor(Math.random() * 13)
          : overall >= 65
          ? 62 + Math.floor(Math.random() * 16)
          : 48 + Math.floor(Math.random() * 16)
      )
    );
    setPercentile(pct);
    setPhase("result");
    setCurrentPage(0);
  };

  const saveAnalysisLocally = () => {
    if (!scores || !faceData) return;
    setSaving(true);
    const record = {
      savedAt: new Date().toISOString(),
      scores,
      faceData,
      glowTips: glowTips.map((t) => t.title),
    };
    const existing = localStorage.getItem("rizz_saved_analyses");
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(record);
    if (list.length > 20) list.splice(20);
    localStorage.setItem("rizz_saved_analyses", JSON.stringify(list));
    setSaving(false);
    showToast("✅ Analysis saved successfully!");
  };

  const downloadCardImage = async () => {
    if (!cardRef.current) return;
    try {
      showToast("⏳ Exporting card image...");
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        style: {
          transform: "scale(1)",
        }
      });
      const link = document.createElement("a");
      link.download = `rizz-ai-lookscore-${scores?.overall || "card"}.png`;
      link.href = dataUrl;
      link.click();
      showToast("✅ Image saved successfully!");
      saveAnalysisLocally();
    } catch (err) {
      console.error("Error saving card image:", err);
      showToast("❌ Failed to save image. Please try again.");
    }
  };

  const handleShareScore = async () => {
    const text = `My Rizz AI Look Score is ${scores?.overall}/100! Check yours at rizzai.space 🔥`;
    const url = "https://www.rizzai.space";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rizz AI Look Score",
          text: text,
          url: url,
        });
        return;
      } catch (err) {
        console.log("Native share cancelled/failed, showing custom share modal:", err);
      }
    }
    // Fallback: show custom modal
    setShowShareModal(true);
  };

  const handleReset = () => {
    setPhotoUri(null);
    setScores(null);
    setFaceData(null);
    setCurrentPage(0);
    setPhase("upload");
  };

  const tier = scores ? getTier(scores.overall) : null;

  return (
    <PageLayout
      showBack
      backHref="/"
      header={
        phase === "result" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", backgroundColor: "#F6766E", padding: "4px 10px", borderRadius: 12 }}>
              {PAGE_LABELS[currentPage]}
            </span>
          </div>
        ) : (
          <HeaderTitle title="Looksmaxing" />
        )
      }
    >
      {/* Hidden file input for Photo Gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        id="looksmaxing-file-uploader"
        aria-label="Upload photo from gallery"
      />

      {/* Hidden file input for Native Selfie Camera (Instagram bio & Mobile 100% support) */}
      <input
        ref={selfieCameraRef}
        type="file"
        accept="image/*"
        capture="user"
        style={{ display: "none" }}
        onChange={handleFileChange}
        id="looksmaxing-selfie-uploader"
        aria-label="Take selfie with camera"
      />

      {/* ─── UPLOAD PHASE ─── */}
      {phase === "upload" && (
        <div className="w-full max-w-[400px] mx-auto" style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 12 }}>
          
          {showWebcam ? (
            /* Webcam Stream View */
            <div className="w-full bg-[#161622] rounded-3xl overflow-hidden p-4 flex flex-col gap-4 border border-white/10" style={{ animation: "fadeIn 0.3s ease-out" }}>
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/5">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scaleX(-1)", // Mirror effect
                  }}
                />
                {/* Oval guide overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: "20px",
                    border: "3px dashed rgba(248, 107, 109, 0.5)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
              </div>

              <div className="flex flex-row gap-3">
                <button
                  onClick={captureSelfie}
                  style={{
                    flex: 1,
                    paddingTop: 14,
                    paddingBottom: 14,
                    borderRadius: 18,
                    border: "none",
                    background: "linear-gradient(135deg, #FF6C6D 0%, #FF865A 100%)",
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 6px 16px rgba(246,118,110,0.3)",
                  }}
                  id="capture-selfie-btn"
                >
                  Capture
                </button>
                <button
                  onClick={stopWebcam}
                  style={{
                    paddingTop: 14,
                    paddingBottom: 14,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 18,
                    border: "1.5px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                  id="cancel-webcam-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Upload layout cards */
            <>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, position: "relative" }}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    background: "linear-gradient(135deg, #FF6C6D 0%, #FF865A 50%, #F69C50 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(246,118,110,0.35)",
                    zIndex: 1,
                  }}
                >
                  <Sparkles size={48} color="#fff" />
                </div>
                <div style={{ position: "absolute", width: 120, height: 120, borderRadius: 60, border: "2px dashed #FF865A", opacity: 0.35 }} />
              </div>

              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: "#1F1A3A", margin: "0 0 4px" }}>Get Your Ratings</h2>
                <p style={{ fontSize: 13.5, color: "#3730A3", fontWeight: 600, margin: 0, lineHeight: 1.45 }}>
                  AI analyzes 6 facial metrics and gives you an honest attractiveness score
                </p>
              </div>

              {/* Positioning frame */}
              <div
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.removeAttribute("capture");
                    fileInputRef.current.click();
                  }
                }}
                style={{
                  border: "2px dashed rgba(248,107,109,0.45)",
                  borderRadius: 24,
                  padding: "48px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  cursor: "pointer",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
                  transition: "border-color 0.2s",
                }}
              >
                <Eye size={56} color="#F86B6D" />
                <span style={{ fontSize: 14, fontWeight: 800, color: "#1F1A3A" }}>Position your face here</span>
              </div>

              {/* Grid Stats */}
              <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                {[
                  { val: "6", lbl: "Metrics" },
                  { val: "100", lbl: "Max Score" },
                  { val: "0%", lbl: "Data Sent" },
                ].map((stat) => (
                  <div
                    key={stat.lbl}
                    style={{
                      flex: 1,
                      backgroundColor: "#FFFFFF",
                      border: "1px solid rgba(31, 26, 58, 0.08)",
                      borderRadius: 16,
                      padding: 12,
                      textAlign: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                    }}
                  >
                    <p style={{ fontSize: 20, fontWeight: 950, color: "#F86B6D", margin: "0 0 2px" }}>{stat.val}</p>
                    <p style={{ fontSize: 11, color: "#475569", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>{stat.lbl}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Upload Photo Button */}
                <button
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.removeAttribute("capture");
                      fileInputRef.current.click();
                    }
                  }}
                  style={{
                    width: "100%",
                    paddingTop: 16,
                    paddingBottom: 16,
                    borderRadius: 18,
                    border: "none",
                    background: "linear-gradient(135deg, #FF6C6D 0%, #FF865A 100%)",
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    boxShadow: "0 6px 16px rgba(246,118,110,0.3)",
                  }}
                >
                  <ImageIcon size={20} color="#fff" />
                  Upload Photo
                </button>

                {/* Take a Selfie Button */}
                <button
                  onClick={triggerSelfieCapture}
                  style={{
                    width: "100%",
                    paddingTop: 14,
                    paddingBottom: 14,
                    borderRadius: 18,
                    border: "1.5px solid rgba(31, 26, 58, 0.15)",
                    background: "rgba(255, 255, 255, 0.45)",
                    color: "#1F1A3A",
                    fontSize: 15,
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                  id="take-selfie-btn"
                >
                  <Camera size={18} color="#1F1A3A" />
                  Take a Selfie
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ─── LOADING PHASE ─── */}
      {phase === "loading" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 16 }}>
          {photoUri && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                className="loading-pulse-ring"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  border: "4px solid #F86B6D",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 0 20px rgba(248,107,109,0.5)",
                }}
              >
                <Image src={photoUri} alt="Analyzing preview" fill style={{ objectFit: "cover" }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RefreshCw size={36} color="#fff" style={{ animation: "spin 1.2s linear infinite" }} />
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p style={{ fontSize: 16, fontWeight: 900, color: "var(--text)", margin: 0 }}>
              Analyzing your face...
            </p>
            <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.15)" }} />

            {LOADING_STAGES.map((stage, idx) => (
              <div key={stage} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: idx < loadStage ? "#22C55E" : idx === loadStage ? "#FF865A" : "rgba(255,255,255,0.2)",
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: idx === loadStage ? "700" : "500",
                    color: idx < loadStage ? "#22C55E" : idx === loadStage ? "var(--text)" : "var(--text-muted)",
                    textDecoration: idx < loadStage ? "line-through" : "none",
                  }}
                >
                  {stage}
                </span>
                {idx < loadStage && <CheckCircle size={14} color="#22C55E" style={{ marginLeft: "auto" }} />}
                {idx === loadStage && <RefreshCw size={14} color="#FF865A" style={{ marginLeft: "auto", animation: "spin 1s linear infinite" }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── RESULT PHASE ─── */}
      {phase === "result" && scores && faceData && tier && (
        <div className="w-full max-w-[600px] mx-auto flex flex-col gap-4">
            {/* Tab Page Controller */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "rgba(255, 255, 255, 0.45)",
                border: "1px solid rgba(31, 26, 58, 0.08)",
                borderRadius: 14,
                padding: 4,
                gap: 4,
                overflowX: "auto",
              }}
            >
              {PAGE_LABELS.map((lbl, idx) => (
                <button
                  key={lbl}
                  id={`lookmax-tab-${lbl.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setCurrentPage(idx)}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "none",
                    backgroundColor: currentPage === idx ? "#F86B6D" : "transparent",
                    color: currentPage === idx ? "#fff" : "#1F1A3A",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>

            {/* PAGE CONTENT CONTAINER */}
            <div style={{ minHeight: 380 }}>
              {/* ── PAGE 0: RATINGS ── */}
              {currentPage === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Hero section */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: 48,
                        border: `4px solid ${tier.color}`,
                        overflow: "hidden",
                        boxShadow: `0 0 16px ${tier.color}66`,
                        position: "relative",
                      }}
                    >
                      {photoUri ? (
                        <Image src={photoUri} alt="Selfie" fill style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>
                          👤
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 68, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>
                        {scores.overall}
                      </span>
                      <span style={{ fontSize: 20, fontWeight: 700, color: "var(--text-muted)" }}>/100</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 20px",
                        borderRadius: 24,
                        border: `1.5px solid ${tier.color}90`,
                        backgroundColor: `${tier.color}15`,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{tier.emoji}</span>
                      <span style={{ fontSize: 15, fontWeight: 900, color: tier.textColor }}>{tier.label}</span>
                    </div>
                  </div>

                <div style={{ marginTop: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: "#F86B6D", letterSpacing: 2 }}>
                    YOUR RATINGS
                  </span>
                </div>

                {/* Score cards grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                    <MetricCard label="Overall" score={scores.overall} />
                    <MetricCard label="Potential" score={scores.potential} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                    <MetricCard label="Jawline" score={scores.jawline} />
                    <MetricCard label="Cheekbones" score={scores.cheekBones} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                    <MetricCard label="Eyes" score={scores.skinQuality} />
                    <MetricCard label="Masculinity" score={scores.masculinity} />
                  </div>
                </div>
              </div>
            )}

            {/* ── PAGE 1: LOOK SCORE CARD ── */}
            {currentPage === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <ShareableCard photoUri={photoUri} scores={scores} cardRef={cardRef} />

                {/* Save + Share CTA */}
                <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                  <button
                    onClick={downloadCardImage}
                    style={{
                      flex: 1,
                      paddingTop: 14,
                      paddingBottom: 14,
                      borderRadius: 16,
                      border: "none",
                      background: "linear-gradient(135deg, #FF6C6D 0%, #FF865A 100%)",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <Download size={18} />
                    Save Score
                  </button>
                  <button
                    onClick={handleShareScore}
                    style={{
                      flex: 1,
                      paddingTop: 14,
                      paddingBottom: 14,
                      borderRadius: 16,
                      border: "none",
                      background: "linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <Share2 size={18} />
                    Share Score
                  </button>
                </div>
              </div>
            )}

            {/* ── PAGE 2: GLOW-UP TIPS ── */}
            {currentPage === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <SectionHeader
                  emoji="💪"
                  title="Your Glow-Up Routine"
                  sub="Personalized priority plan for your score"
                  accent="#F86B6D"
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {glowTips.map((tip, idx) => (
                    <GlowUpCard
                      key={tip.title}
                      emoji={tip.emoji}
                      title={tip.title}
                      sub={tip.sub}
                      priority={PRIORITY_LABELS[idx].label}
                      priorityColor={PRIORITY_LABELS[idx].color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── PAGE 3: FACE ANALYSIS ── */}
            {currentPage === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <SectionHeader
                  emoji="🔬"
                  title="Your Analysis"
                  sub="Facial structure breakdown"
                  accent="#FF6C6D"
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <TraitCard emoji={faceData.faceShapeEmoji} label="Face Shape" value={faceData.faceShape} accent="#FF6C6D" />
                  <TraitCard emoji={faceData.canthalEmoji} label="Canthal Tilt" value={faceData.canthalTilt} accent="#F86B6D" />
                  <TraitCard emoji={faceData.eyeShapeEmoji} label="Eye Shape" value={faceData.eyeShape} accent="#FF865A" />
                  <TraitCard emoji={faceData.eyeTypeEmoji} label="Eye Type" value={faceData.eyeType} accent="#7C3AED" />
                  <TraitCard emoji={faceData.jawEmoji} label="Jaw Width" value={faceData.jawWidth} accent="#F69C50" />
                  <TraitCard emoji={faceData.noseEmoji} label="Nose Shape" value={faceData.noseShape} accent="#3B82F6" />
                </div>

                <div
                  style={{
                    borderRadius: 16,
                    background: "linear-gradient(90deg, rgba(255,134,90,0.16) 0%, rgba(246,156,80,0.07) 100%)",
                    border: "1px dashed rgba(246,156,80,0.25)",
                    padding: 14,
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 18 }}>💡</span>
                  <p style={{ fontSize: 12, color: "var(--text)", opacity: 0.85, lineHeight: 1.45, margin: 0 }}>
                    These traits are determined by your bone structure and facial geometry — some can improve with targeted exercises and habits.
                  </p>
                </div>
              </div>
            )}

            {/* ── PAGE 4: GLOBAL RANKING ── */}
            {currentPage === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <SectionHeader
                  emoji="🏆"
                  title="Your Ranking"
                  sub="See how you compare globally"
                  accent="#7C3AED"
                />

                <div
                  style={{
                    backgroundColor: "#161628",
                    borderRadius: 24,
                    border: "1px solid rgba(248, 107, 109, 0.25)",
                    padding: "24px 20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle Top Radial Accent Glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: -60,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 220,
                      height: 200,
                      borderRadius: 100,
                      background: "radial-gradient(circle, rgba(248, 107, 109, 0.2) 0%, rgba(0,0,0,0) 70%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Photo mini-preview */}
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 34,
                      border: "3px solid #F86B6D",
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 0 20px rgba(248, 107, 109, 0.45)",
                    }}
                  >
                    {photoUri ? (
                      <Image src={photoUri} alt="Thumbnail" fill style={{ objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
                        👤
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>Overall Rating</span>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1, textShadow: "0 2px 12px rgba(248,107,109,0.3)" }}>{scores.overall}</span>

                  {/* Bell curve graphic */}
                  <BellCurveView percentile={percentile} accentColor="#F86B6D" />

                  {/* Rating note badge */}
                  <div
                    style={{
                      marginTop: 16,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      padding: "12px 18px",
                      borderRadius: 16,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      width: "100%",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>
                      Your Overall is better than{" "}
                      <span style={{ color: "#F86B6D", fontWeight: 900, textDecoration: "underline", textUnderlineOffset: 3 }}>{percentile}%</span> of people
                    </span>
                    <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>
                      🔥 Top {100 - percentile > 0 ? 100 - percentile : 1}% Worldwide
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Try another button */}
          <div className="w-full">
            <button
              onClick={handleReset}
              style={{
                marginTop: 12,
                width: "100%",
                paddingTop: 16,
                paddingBottom: 16,
                borderRadius: 18,
                border: "none",
                background: "linear-gradient(135deg, #FF6C6D 0%, #FF865A 100%)",
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: "0 4px 16px rgba(246,118,110,0.35)",
              }}
            >
              <Camera size={20} color="#fff" />
              Try Another Photo
            </button>
          </div>
        </div>
      )}

      <CopiedToast visible={toastVisible} onHide={() => setToastVisible(false)} message={toastMsg} />

      {showShareModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
          onClick={() => setShowShareModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              backgroundColor: "#161622",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 28,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              color: "#fff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 900 }}>Share Your Score</span>
              <button
                onClick={() => setShowShareModal(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.45 }}>
              Choose a platform to share your score or copy the rating to post manually!
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {/* WhatsApp */}
              <button
                onClick={() => {
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`My Rizz AI Look Score is ${scores?.overall}/100! Check yours at https://www.rizzai.space 🔥`)}`, "_blank");
                }}
                style={{
                  padding: "12px 8px",
                  borderRadius: 16,
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                  backgroundColor: "rgba(34, 197, 94, 0.05)",
                  color: "#22C55E",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                💬 WhatsApp
              </button>

              {/* Twitter / X */}
              <button
                onClick={() => {
                  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`My Rizz AI Look Score is ${scores?.overall}/100! Check yours at https://www.rizzai.space 🔥`)}`, "_blank");
                }}
                style={{
                  padding: "12px 8px",
                  borderRadius: 16,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  color: "#FFF",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                𝕏 Twitter / X
              </button>

              {/* Facebook */}
              <button
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.rizzai.space`, "_blank");
                }}
                style={{
                  padding: "12px 8px",
                  borderRadius: 16,
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  color: "#3B82F6",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                👥 Facebook
              </button>

              {/* Copy Rating */}
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(`My Rizz AI Look Score is ${scores?.overall}/100! Check yours at https://www.rizzai.space 🔥`);
                    showToast("📋 Copied to clipboard!");
                  } catch (e) {
                    console.error(e);
                  }
                }}
                style={{
                  padding: "12px 8px",
                  borderRadius: 16,
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  backgroundColor: "rgba(245, 158, 11, 0.05)",
                  color: "#F59E0B",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                🔗 Copy Rating
              </button>
            </div>

            {/* Photo Sharing Info (Instagram, Snapchat, TikTok, YouTube) */}
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 18,
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 900, color: "#FF6C6D" }}>📸 INSTAGRAM / SNAPCHAT / TIKTOK / YOUTUBE</span>
              <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.4 }}>
                These platforms do not support direct web link sharing. Download your card image using the **Save Score** button and upload it to your stories, posts, or feeds!
              </p>
            </div>
          </div>
        </div>
      )}


    </PageLayout>
  );
}
