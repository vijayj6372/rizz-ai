"use client";

import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  RotateCcw,
  Share2,
  Clock,
  Trash2,
  X,
  Heart,
  ShieldCheck,
  MessageCircle,
  Flame,
  Award,
  Users,
  AlertTriangle,
  Zap,
  CheckCircle2,
  User,
  Camera,
  Upload,
  ArrowRight,
  HelpCircle,
  Trophy,
  Copy,
  Calendar,
  Baby,
  Smile,
  Frown,
  Compass,
  Star,
  Check,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CopiedToast } from "@/components/CopiedToast";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  calculateLoveLife,
  LoveLifeResult,
  FEATURE_MODES,
  FeatureMode,
  RadarPoint,
} from "@/data/loveLifeData";

const PRESET_COUPLES = [
  { n1: "Alex Jean", n2: "Emma Dubois" },
  { n1: "Romeo", n2: "Juliet" },
  { n1: "Taylor", n2: "Travis" },
  { n1: "Barbie", n2: "Ken" },
];

const QUIZ_QUESTIONS = [
  {
    id: "loveLanguage",
    question: "What is your primary Love Language?",
    options: [
      { label: "Words of Affirmation 💬", value: "words" },
      { label: "Quality Time ⏱️", value: "time" },
      { label: "Physical Touch 🫂", value: "touch" },
      { label: "Acts of Service 🛠️", value: "service" },
      { label: "Receiving Gifts 🎁", value: "gifts" },
    ],
  },
  {
    id: "communicationStyle",
    question: "How do you usually handle disagreement?",
    options: [
      { label: "Talk it out calmly immediately 🗣️", value: "calm" },
      { label: "Need a moment to cool down first 🧘", value: "pause" },
      { label: "Use humor & warm hugs to defuse 🎭", value: "humor" },
      { label: "Write a long detailed message 📱", value: "text" },
    ],
  },
  {
    id: "weekendVibe",
    question: "What's your dream ideal date?",
    options: [
      { label: "Cozy movie night & takeaway 🍿", value: "cozy" },
      { label: "Romantic candlelit dinner 🍷", value: "dinner" },
      { label: "Outdoor hiking adventure 🏔️", value: "adventure" },
      { label: "Concert or night out on the town 🎵", value: "party" },
    ],
  },
  {
    id: "futureVision",
    question: "What is your top relationship goal?",
    options: [
      { label: "Build a lifetime marriage & family 💍", value: "marriage" },
      { label: "Travel the world together 🌍", value: "travel" },
      { label: "Best friends & lifelong partners 🤝", value: "bFF" },
      { label: "Spur each other's career & personal growth 🚀", value: "growth" },
    ],
  },
];

// Helper pure SVG Radar Chart Component
function SvgRadarChart({ data }: { data: RadarPoint[] }) {
  const size = 260;
  const center = size / 2;
  const radius = 85;
  const count = data.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const points = data
    .map((d, i) => {
      const { x, y } = getCoordinates(i, d.A);
      return `${x},${y}`;
    })
    .join(" ");

  const bgGridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center justify-center w-full py-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Grid Concentric Polygons */}
        {bgGridLevels.map((lvl) => {
          const gridPoints = data
            .map((_, i) => {
              const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
              const r = radius * lvl;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ");
          return (
            <polygon
              key={lvl}
              points={gridPoints}
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
              strokeDasharray={lvl === 1 ? "none" : "3 3"}
            />
          );
        })}

        {/* Axis Lines */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Area Polygon */}
        <polygon
          points={points}
          fill="rgba(244, 63, 94, 0.35)"
          stroke="#F43F5E"
          strokeWidth="2.5"
        />

        {/* Data Points */}
        {data.map((d, i) => {
          const { x, y } = getCoordinates(i, d.A);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#FFF"
              stroke="#F43F5E"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
          const labelRadius = radius + 22;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#E2E8F0"
              fontSize="10"
              fontWeight="600"
            >
              {d.subject}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function FireFunPage() {
  // Current Selected Feature Mode
  const [selectedMode, setSelectedMode] = useState<FeatureMode>("rate-couple");
  const currentModeConfig =
    FEATURE_MODES.find((m) => m.id === selectedMode) || FEATURE_MODES[3];

  // Inputs
  const [name1, setName1] = useState("Alex Jean");
  const [name2, setName2] = useState("Emma Dubois");
  const [photo1, setPhoto1] = useState<string | undefined>();
  const [photo2, setPhoto2] = useState<string | undefined>();

  // Photo Input Refs
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // Quiz Modal State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  // Calculation State
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<LoveLifeResult | null>(null);
  const [displayScore, setDisplayScore] = useState(0);

  // Results Dashboard Active Tab
  const [activeSuperTab, setActiveSuperTab] = useState<
    "marriage" | "fallsFirst" | "lovesMore" | "soulmates" | "roastEx" | "bonus"
  >("marriage");

  // History & Toast
  const [history, setHistory] = useLocalStorage<LoveLifeResult[]>(
    "fire_fun_history",
    []
  );
  const [historyOpen, setHistoryOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("Copied to clipboard!");
  const [shareOpen, setShareOpen] = useState(false);

  // Score Count Up Animation
  const animateScore = (target: number) => {
    setDisplayScore(0);
    const duration = 1000;
    const steps = 40;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const currentScore = Math.round(target * progress);
      setDisplayScore(currentScore);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayScore(target);
      }
    }, stepTime);
  };

  // Image Upload Handlers
  const handlePhotoUpload = (personIndex: 1 | 2, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (personIndex === 1) setPhoto1(dataUrl);
      else setPhoto2(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Calculate Action
  const handleCalculate = useCallback(
    (customAnswers?: Record<string, string>) => {
      if (!name1.trim()) return;

      setIsCalculating(true);
      setTimeout(() => {
        const answers = customAnswers || quizAnswers;
        const res = calculateLoveLife(
          name1,
          currentModeConfig.showPerson2 ? name2 : "",
          selectedMode,
          photo1,
          photo2,
          Object.keys(answers).length > 0 ? answers : undefined
        );

        setResult(res);
        setIsCalculating(false);
        animateScore(res.score);

        // Auto tab selection based on mode
        if (selectedMode === "roast-ex" || selectedMode === "rate-ex") {
          setActiveSuperTab("roastEx");
        } else {
          setActiveSuperTab("marriage");
        }

        // Save to LocalStorage History
        setHistory((prev) => {
          const filtered = prev.filter(
            (h) =>
              !(
                h.name1.toLowerCase() === res.name1.toLowerCase() &&
                h.name2.toLowerCase() === res.name2.toLowerCase() &&
                h.featureMode === res.featureMode
              )
          );
          return [res, ...filtered].slice(0, 30);
        });
      }, 700);
    },
    [name1, name2, selectedMode, photo1, photo2, quizAnswers, currentModeConfig, setHistory]
  );

  // Copy Action
  const handleCopySummary = () => {
    if (!result) return;
    const summaryText = `❤️ FireFun AI Result ❤️\nMode: ${currentModeConfig.title}\n${result.name1} & ${result.name2 || "Partner"}\nMatch Score: ${result.score}%\n\n💍 Marriage Compatibility: ${result.marriage.compatibility}%\n🥰 Who Falls First: ${result.whoFallsFirst.verdict}\n💘 Who Loves More: ${result.whoLovesMore.verdict}\n🌌 Soulmate Probability: ${result.soulmates.soulmateProbability}%\n\nCalculated on FireFun AI!`;
    navigator.clipboard.writeText(summaryText);
    setToastMsg("Result copied to clipboard! 📋");
    setToastVisible(true);
  };

  return (
    <PageLayout
      showBack={true}
      backHref="/"
      variant="dark"
      header={<HeaderTitle title="RateMyLove ❤️" />}
      rightAction={
        <button
          onClick={() => setHistoryOpen(true)}
          className="relative p-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
          title="Analysis History"
        >
          <Clock size={20} />
          {history.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {history.length}
            </span>
          )}
        </button>
      }
    >
      <CopiedToast
        visible={toastVisible}
        message={toastMsg}
        onHide={() => setToastVisible(false)}
      />

      {/* Main Container */}
      <div className="w-full max-w-2xl mx-auto space-y-6 pb-20 text-white font-sans">
        {/* Hero Tagline */}
        <div className="text-center pt-1 pb-1">
          <p className="text-xs md:text-sm text-slate-300 max-w-md mx-auto">
            Discover marriage odds, who falls first, who loves more, soulmate probability & savage ex audits!
          </p>
        </div>

        {/* FEATURE MODES SELECTOR GRID */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-rose-300/80 flex items-center gap-1.5">
            <Compass size={14} /> Select Feature Mode
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {FEATURE_MODES.map((mode) => {
              const isSelected = selectedMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setSelectedMode(mode.id);
                    setResult(null);
                  }}
                  className={`relative text-left p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-br from-white/20 via-white/10 to-rose-500/20 border-rose-400/80 shadow-lg shadow-rose-500/20 ring-1 ring-rose-400/50 scale-[1.02]"
                      : "bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{mode.icon}</span>
                    {isSelected && (
                      <span className="bg-rose-500 text-white p-0.5 rounded-full">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <h3 className="text-xs md:text-sm font-bold text-white leading-tight">
                      {mode.title}
                    </h3>
                    <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                      {mode.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* INPUT CARD */}
        <div className="bg-slate-900/70 border border-white/15 rounded-3xl p-5 md:p-6 backdrop-blur-xl shadow-2xl space-y-5">
          {/* Active Mode Banner */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentModeConfig.icon}</span>
              <div>
                <h2 className="text-sm md:text-base font-bold text-white">
                  {currentModeConfig.title}
                </h2>
                <p className="text-xs text-rose-300">{currentModeConfig.subtitle}</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300">
              {currentModeConfig.badge}
            </span>
          </div>

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputRef1}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handlePhotoUpload(1, e.target.files[0]);
            }}
          />
          <input
            type="file"
            ref={fileInputRef2}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handlePhotoUpload(2, e.target.files[0]);
            }}
          />

          {/* Name & Photo Slots Grid */}
          <div className={`grid gap-4 ${currentModeConfig.showPerson2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            {/* Person A Slot */}
            <div className="space-y-2 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  {currentModeConfig.person1Label}
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef1.current?.click()}
                  className="text-[11px] text-rose-300 hover:text-rose-200 flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded-md"
                >
                  <Camera size={12} /> Photo
                </button>
              </div>
              <div className="flex items-center gap-2">
                {photo1 ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-rose-400 flex-shrink-0">
                    <img src={photo1} alt="Person A" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPhoto1(undefined)}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <User size={18} />
                  </div>
                )}
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>
            </div>

            {/* Person B Slot (if applicable) */}
            {currentModeConfig.showPerson2 && (
              <div className="space-y-2 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    {currentModeConfig.person2Label}
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef2.current?.click()}
                    className="text-[11px] text-rose-300 hover:text-rose-200 flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded-md"
                  >
                    <Camera size={12} /> Photo
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {photo2 ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-rose-400 flex-shrink-0">
                      <img src={photo2} alt="Person B" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setPhoto2(undefined)}
                        className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <Heart size={18} />
                    </div>
                  )}
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter partner name..."
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Couples */}
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-slate-400">Quick Try Presets:</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {PRESET_COUPLES.map((c, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setName1(c.n1);
                    setName2(c.n2);
                  }}
                  className="text-xs bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 border border-white/10 px-2.5 py-1 rounded-full transition-colors"
                >
                  {c.n1} & {c.n2}
                </button>
              ))}
            </div>
          </div>

          {/* Quiz Option & Calculate Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2">
            <button
              onClick={() => {
                setQuizStep(0);
                setIsQuizOpen(true);
              }}
              className="md:col-span-1 bg-white/10 hover:bg-white/15 border border-white/20 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <HelpCircle size={16} className="text-amber-300" />
              {Object.keys(quizAnswers).length > 0 ? "Quiz Answered (4/4)" : "Take Love Quiz"}
            </button>

            <button
              onClick={() => handleCalculate()}
              disabled={isCalculating || !name1.trim()}
              className="md:col-span-2 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 disabled:opacity-50 transition-all hover:scale-[1.01]"
            >
              {isCalculating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing FireFun AI Chemistry...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Calculate FireFun AI Score
                </>
              )}
            </button>
          </div>
        </div>

        {/* RESULTS DASHBOARD */}
        {result && (
          <div className="space-y-6 pt-2 animate-fadeIn">
            {/* HERO SCORE CARD */}
            <div className="relative bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-purple-950/90 border border-rose-500/30 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl text-center space-y-4 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 bg-rose-500/10 rounded-full blur-3xl w-48 h-48 pointer-events-none" />

              {/* Names Header */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-semibold text-rose-200">
                <span>{result.name1}</span>
                <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
                <span>{result.name2 || "Partner"}</span>
              </div>

              {/* Circular Animated Score Ring */}
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center my-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="url(#scoreGradientFireFun)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * displayScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-75 ease-out"
                  />
                  <defs>
                    <linearGradient id="scoreGradientFireFun" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F43F5E" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-rose-200">
                    {displayScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-rose-300/80 tracking-widest mt-0.5">
                    Match Index
                  </span>
                </div>
              </div>

              <p className="text-sm font-semibold text-rose-200 max-w-md mx-auto">
                {result.compatibilityDesc}
              </p>

              {/* Quick Actions */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleCopySummary}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Copy size={14} /> Copy Report
                </button>
                <button
                  onClick={() => setShareOpen(true)}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-rose-500/30 transition-colors"
                >
                  <Share2 size={14} /> Share Card
                </button>
              </div>
            </div>

            {/* SUPER FEATURES MODULE NAVIGATION TABS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300/80 flex items-center gap-1.5">
                  <Trophy size={14} /> Super Features & Metrics
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setActiveSuperTab("marriage")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    activeSuperTab === "marriage"
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                      : "bg-slate-900/60 text-slate-300 border border-white/10 hover:bg-slate-800"
                  }`}
                >
                  💍 Marriage
                </button>
                <button
                  onClick={() => setActiveSuperTab("fallsFirst")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    activeSuperTab === "fallsFirst"
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                      : "bg-slate-900/60 text-slate-300 border border-white/10 hover:bg-slate-800"
                  }`}
                >
                  🥰 Who Falls First?
                </button>
                <button
                  onClick={() => setActiveSuperTab("lovesMore")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    activeSuperTab === "lovesMore"
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                      : "bg-slate-900/60 text-slate-300 border border-white/10 hover:bg-slate-800"
                  }`}
                >
                  💘 Who Loves More?
                </button>
                <button
                  onClick={() => setActiveSuperTab("soulmates")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    activeSuperTab === "soulmates"
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-slate-900/60 text-slate-300 border border-white/10 hover:bg-slate-800"
                  }`}
                >
                  🌌 Soulmates
                </button>
                {(selectedMode === "roast-ex" || selectedMode === "rate-ex") && (
                  <button
                    onClick={() => setActiveSuperTab("roastEx")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                      activeSuperTab === "roastEx"
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                        : "bg-slate-900/60 text-slate-300 border border-white/10 hover:bg-slate-800"
                    }`}
                  >
                    🔥 Ex Audit
                  </button>
                )}
                <button
                  onClick={() => setActiveSuperTab("bonus")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    activeSuperTab === "bonus"
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-slate-900/60 text-slate-300 border border-white/10 hover:bg-slate-800"
                  }`}
                >
                  🍀 Bonus Cards
                </button>
              </div>

              {/* SUPER FEATURE CONTENT PANELS */}
              <div className="bg-slate-900/70 border border-white/15 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-4">
                {/* 1) MARRIAGE TAB */}
                {activeSuperTab === "marriage" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">💍</span>
                        <div>
                          <h3 className="text-sm font-bold text-white">Marriage Compatibility</h3>
                          <p className="text-xs text-rose-300">Long-term Vows & Family Alignment</p>
                        </div>
                      </div>
                      <span className="text-lg font-extrabold text-emerald-400">
                        {result.marriage.compatibility}%
                      </span>
                    </div>

                    {/* Timeline Box */}
                    <div className="bg-gradient-to-r from-rose-900/40 to-purple-900/40 border border-rose-500/30 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-200">
                        <Calendar size={14} className="text-rose-400" />
                        Wedding & Family Forecast:
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {result.marriageText}
                      </p>
                      <p className="text-xs text-slate-300 flex items-center gap-1.5">
                        <Baby size={14} className="text-pink-400" />
                        {result.childrenText}
                      </p>
                    </div>

                    {/* Progress Bars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>💍 Marriage Success Score</span>
                          <span className="font-bold text-white">{result.marriage.successScore}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${result.marriage.successScore}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>👨‍fam‍👧 Family Compatibility</span>
                          <span className="font-bold text-white">{result.marriage.familyCompatibility}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500 rounded-full" style={{ width: `${result.marriage.familyCompatibility}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>🎯 Life Goals Alignment</span>
                          <span className="font-bold text-white">{result.marriage.lifeGoalsAlignment}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${result.marriage.lifeGoalsAlignment}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>🤝 Trust Level</span>
                          <span className="font-bold text-white">{result.marriage.trustLevel}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${result.marriage.trustLevel}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2) WHO FALLS FIRST TAB */}
                {activeSuperTab === "fallsFirst" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🥰</span>
                        <div>
                          <h3 className="text-sm font-bold text-white">Who Falls First?</h3>
                          <p className="text-xs text-rose-300">Emotional Attachment & Crush Intensity</p>
                        </div>
                      </div>
                      <span className="text-lg font-extrabold text-pink-400">
                        {result.whoFallsFirst.fallsFirstProbability}%
                      </span>
                    </div>

                    {/* Winner Banner */}
                    <div className="bg-pink-500/15 border border-pink-500/30 rounded-2xl p-3.5 flex items-center gap-3">
                      <Flame size={24} className="text-pink-400 flex-shrink-0 animate-bounce" />
                      <p className="text-xs font-semibold text-pink-200 leading-snug">
                        {result.whoFallsFirst.verdict}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Crush Intensity</span>
                        <div className="text-base font-bold text-pink-300 mt-0.5">{result.whoFallsFirst.crushIntensity}%</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Thinking About You</span>
                        <div className="text-base font-bold text-rose-300 mt-0.5">{result.whoFallsFirst.thinkingAboutYou}%</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Initiates Contact</span>
                        <div className="text-base font-bold text-indigo-300 mt-0.5">{result.whoFallsFirst.initiatesContactScore}%</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Obsession Meter</span>
                        <div className="text-base font-bold text-purple-300 mt-0.5">{result.whoFallsFirst.obsessionMeter}%</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Attachment Speed</span>
                        <div className="text-base font-bold text-emerald-300 mt-0.5">{result.whoFallsFirst.attachmentSpeed}%</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Interest Level</span>
                        <div className="text-base font-bold text-amber-300 mt-0.5">{result.whoFallsFirst.interestLevel}%</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3) WHO LOVES MORE TAB */}
                {activeSuperTab === "lovesMore" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">💘</span>
                        <div>
                          <h3 className="text-sm font-bold text-white">Who Loves More?</h3>
                          <p className="text-xs text-rose-300">Effort, Care & Emotional Investment</p>
                        </div>
                      </div>
                      <span className="text-lg font-extrabold text-purple-400">
                        {result.whoLovesMore.loveIntensity}%
                      </span>
                    </div>

                    <div className="bg-purple-500/15 border border-purple-500/30 rounded-2xl p-3.5 flex items-center gap-3">
                      <Award size={24} className="text-purple-400 flex-shrink-0" />
                      <p className="text-xs font-semibold text-purple-200 leading-snug">
                        {result.whoLovesMore.verdict}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>🎁 Effort Score</span>
                          <span className="font-bold text-white">{result.whoLovesMore.effortScore}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${result.whoLovesMore.effortScore}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>🤗 Care Level</span>
                          <span className="font-bold text-white">{result.whoLovesMore.careLevel}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${result.whoLovesMore.careLevel}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>💬 Affection Score</span>
                          <span className="font-bold text-white">{result.whoLovesMore.affectionScore}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500 rounded-full" style={{ width: `${result.whoLovesMore.affectionScore}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>💞 Emotional Investment</span>
                          <span className="font-bold text-white">{result.whoLovesMore.emotionalInvestment}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${result.whoLovesMore.emotionalInvestment}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4) ARE WE SOULMATES TAB */}
                {activeSuperTab === "soulmates" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🌌</span>
                        <div>
                          <h3 className="text-sm font-bold text-white">Are We Soulmates?</h3>
                          <p className="text-xs text-rose-300">Destiny & Cosmic Personality Harmony</p>
                        </div>
                      </div>
                      <span className="text-lg font-extrabold text-indigo-400">
                        {result.soulmates.soulmateProbability}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Soul Connection</span>
                        <div className="text-base font-bold text-indigo-300 mt-0.5">{result.soulmates.soulConnection}%</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Personality Harmony</span>
                        <div className="text-base font-bold text-purple-300 mt-0.5">{result.soulmates.personalityHarmony}%</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Heart Sync Score</span>
                        <div className="text-base font-bold text-pink-300 mt-0.5">{result.soulmates.heartSyncScore}%</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Destiny Match</span>
                        <div className="text-base font-bold text-rose-300 mt-0.5">{result.soulmates.destinyMatch}%</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5) EX AUDIT TAB */}
                {activeSuperTab === "roastEx" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">😂</span>
                        <div>
                          <h3 className="text-sm font-bold text-white">Savage Ex Audit</h3>
                          <p className="text-xs text-rose-300">Toxicity, Clown Meter & Text Verdict</p>
                        </div>
                      </div>
                      {result.rateEx && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {result.rateEx.shouldYouTextThem}
                        </span>
                      )}
                    </div>

                    {result.roastEx && (
                      <div className="bg-orange-500/15 border border-orange-500/30 rounded-2xl p-3.5 space-y-1">
                        <span className="text-[10px] font-bold uppercase text-orange-300 tracking-wider">
                          🔥 AI Savage Roast Verdict:
                        </span>
                        <p className="text-xs font-medium text-orange-100 italic leading-relaxed">
                          "{result.roastEx.aiRoastText}"
                        </p>
                      </div>
                    )}

                    {result.roastEx && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Savage Level</span>
                          <div className="text-base font-bold text-orange-400 mt-0.5">{result.roastEx.savageLevel}%</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Toxicity Meter</span>
                          <div className="text-base font-bold text-red-400 mt-0.5">{result.roastEx.toxicity}%</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Clown Meter 🤡</span>
                          <div className="text-base font-bold text-amber-300 mt-0.5">{result.roastEx.clownMeter}%</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Walking Red Flag</span>
                          <div className="text-base font-bold text-rose-400 mt-0.5">{result.roastEx.walkingRedFlag}%</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 6) BONUS CARDS TAB */}
                {activeSuperTab === "bonus" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🍀</span>
                        <div>
                          <h3 className="text-sm font-bold text-white">Bonus Fun Metrics</h3>
                          <p className="text-xs text-rose-300">Rizz AI Colorful Trait Cards</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      <div className="bg-gradient-to-br from-emerald-500/20 to-teal-900/30 p-3 rounded-2xl border border-emerald-500/30">
                        <div className="text-xs font-semibold text-emerald-200">🍀 Lucky Couple</div>
                        <div className="text-lg font-bold text-emerald-400 mt-1">{result.bonusMetrics.luckyCoupleScore}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500/20 to-red-900/30 p-3 rounded-2xl border border-orange-500/30">
                        <div className="text-xs font-semibold text-orange-200">🔥 Chemistry Level</div>
                        <div className="text-lg font-bold text-orange-400 mt-1">{result.bonusMetrics.chemistryLevel}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-pink-500/20 to-rose-900/30 p-3 rounded-2xl border border-pink-500/30">
                        <div className="text-xs font-semibold text-pink-200">🌈 Happiness</div>
                        <div className="text-lg font-bold text-pink-400 mt-1">{result.bonusMetrics.happinessPotential}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/20 to-indigo-900/30 p-3 rounded-2xl border border-purple-500/30">
                        <div className="text-xs font-semibold text-purple-200">🧲 Attraction</div>
                        <div className="text-lg font-bold text-purple-400 mt-1">{result.bonusMetrics.attractionStrength}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-900/30 p-3 rounded-2xl border border-cyan-500/30">
                        <div className="text-xs font-semibold text-cyan-200">💬 Conversation Vibe</div>
                        <div className="text-lg font-bold text-cyan-400 mt-1">{result.bonusMetrics.conversationVibe}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-500/20 to-violet-900/30 p-3 rounded-2xl border border-indigo-500/30">
                        <div className="text-xs font-semibold text-indigo-200">🚀 Future Together</div>
                        <div className="text-lg font-bold text-indigo-400 mt-1">{result.bonusMetrics.futureTogetherScore}%</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RADAR CHART VISUALIZATION */}
            <div className="bg-slate-900/70 border border-white/15 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <Zap size={14} /> Relationship Synergy Radar
                </span>
                <span className="text-[11px] text-slate-400">6 Core Dimensions</span>
              </div>
              <SvgRadarChart data={result.radarData} />
            </div>

            {/* AI SUMMARY ACCORDION */}
            <div className="bg-slate-900/70 border border-white/15 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Sparkles size={18} className="text-rose-400" />
                <h3 className="text-sm font-bold text-white">AI Deep Insights & Advice</h3>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-300 leading-relaxed bg-white/5 p-3 rounded-2xl border border-white/10">
                  {result.aiSummary.overview}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Green Flags */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3.5 space-y-2">
                    <span className="font-bold text-emerald-300 flex items-center gap-1 text-xs">
                      <CheckCircle2 size={14} /> Key Green Flags
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      {result.aiSummary.greenFlags.map((gf, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span> {gf}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Red Flags / Watchouts */}
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3.5 space-y-2">
                    <span className="font-bold text-rose-300 flex items-center gap-1 text-xs">
                      <AlertTriangle size={14} /> Areas to Watch
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      {result.aiSummary.redFlags.map((rf, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span> {rf}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Relationship Advice & Future */}
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-3.5 space-y-1">
                  <span className="font-bold text-indigo-300 text-xs">💡 Relationship Advice:</span>
                  <p className="text-indigo-100">{result.aiSummary.advice}</p>
                </div>
              </div>
            </div>

            {/* RE-CALCULATE CTA */}
            <div className="text-center pt-2">
              <button
                onClick={() => setResult(null)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-2xl text-xs inline-flex items-center gap-2 border border-white/15 transition-all"
              >
                <RotateCcw size={16} /> Recalculate or Try Another Mode
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QUIZ MODAL */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-md w-full p-6 space-y-5 text-white shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setIsQuizOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <h3 className="text-base font-bold text-white">
                {QUIZ_QUESTIONS[quizStep].question}
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2">
              {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const updated = {
                      ...quizAnswers,
                      [QUIZ_QUESTIONS[quizStep].id]: opt.value,
                    };
                    setQuizAnswers(updated);
                    if (quizStep < QUIZ_QUESTIONS.length - 1) {
                      setQuizStep(quizStep + 1);
                    } else {
                      setIsQuizOpen(false);
                      handleCalculate(updated);
                    }
                  }}
                  className="w-full text-left p-3.5 rounded-2xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 text-xs font-semibold transition-all flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HISTORY DRAWER / MODAL */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col p-6 text-white shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock size={16} className="text-rose-400" /> Previous FireFun Analyses ({history.length})
              </h3>
              <button onClick={() => setHistoryOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 scrollbar-thin">
              {history.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">
                  No previous analyses saved yet. Try calculating one!
                </p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setResult(item);
                      setSelectedMode(item.featureMode);
                      setName1(item.name1);
                      setName2(item.name2);
                      setHistoryOpen(false);
                      animateScore(item.score);
                    }}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">
                        {item.name1} & {item.name2 || "Partner"}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()} • {item.featureMode}
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-rose-400">{item.score}%</span>
                  </div>
                ))
              )}
            </div>

            {history.length > 0 && (
              <div className="pt-3 border-t border-white/10 text-right">
                <button
                  onClick={() => setHistory([])}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 ml-auto"
                >
                  <Trash2 size={12} /> Clear History
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-sm w-full p-6 text-white text-center space-y-4 shadow-2xl relative">
            <button onClick={() => setShareOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={18} />
            </button>
            <Share2 size={32} className="mx-auto text-rose-400" />
            <h3 className="text-base font-bold">Share Your FireFun Score</h3>
            <p className="text-xs text-slate-300">
              Copy your report text or share directly with your partner!
            </p>
            <button
              onClick={() => {
                handleCopySummary();
                setShareOpen(false);
              }}
              className="w-full bg-rose-500 hover:bg-rose-600 font-bold py-3 rounded-2xl text-xs transition-colors"
            >
              Copy Report Text
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
