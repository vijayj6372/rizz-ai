"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  RotateCcw,
  Share2,
  Clock,
  Trash2,
  X,
  Heart,
  ArrowUpDown,
  Calendar,
  Baby,
  Copy,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BarChart2,
  User,
  Check,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CopiedToast } from "@/components/CopiedToast";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calculateLoveLife, LoveLifeResult } from "@/data/loveLifeData";

const PRESET_COUPLES = [
  { n1: "Alex Jean", n2: "Emma Dubois" },
  { n1: "Romeo", n2: "Juliet" },
  { n1: "Taylor", n2: "Travis" },
  { n1: "Barbie", n2: "Ken" },
];

export default function LoveLifePage() {
  // Input States - Empty by default with clear hint placeholders
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  // Calculation state & results
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<LoveLifeResult | null>(null);
  const [displayScore, setDisplayScore] = useState<number>(0);
  const [activeStepTab, setActiveStepTab] = useState<"score" | "marriage" | "children" | "metrics">("score");
  const [showMetrics, setShowMetrics] = useState<boolean>(true);

  // History & Toast
  const [history, setHistory] = useLocalStorage<LoveLifeResult[]>(
    "love_life_calculator_history",
    []
  );
  const [historyOpen, setHistoryOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("Copied to clipboard!");

  // Score Count Up Animation
  const animateScore = (target: number) => {
    setDisplayScore(0);
    const duration = 900;
    const steps = 35;
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

  // Swap Names Handler
  const handleSwapNames = () => {
    setName1(name2);
    setName2(name1);
  };

  // Calculate Action
  const handleCalculate = useCallback(() => {
    const calcName1 = name1.trim() || "Partner 1";
    const calcName2 = name2.trim() || "Partner 2";

    setIsCalculating(true);
    setTimeout(() => {
      const res = calculateLoveLife(calcName1, calcName2, "rate-couple");
      setResult(res);
      setIsCalculating(false);
      setActiveStepTab("score");
      animateScore(res.score);

      // Save to History
      setHistory((prev) => {
        const filtered = prev.filter(
          (h) =>
            !(
              h.name1.toLowerCase() === res.name1.toLowerCase() &&
              h.name2.toLowerCase() === res.name2.toLowerCase()
            )
        );
        return [res, ...filtered].slice(0, 30);
      });
    }, 600);
  }, [name1, name2, setHistory]);

  // Copy Summary
  const handleCopySummary = () => {
    if (!result) return;
    const summaryText = `💋 LoveLife Marriage & Children Prediction 💋\n${result.name1} & ${result.name2}\nOverall Match: ${result.score}%\n\n💒 Wedding: ${result.marriageText}\n🍼 Children: ${result.childrenText}\n\nCalculated on LoveLife Calculator!`;
    navigator.clipboard.writeText(summaryText);
    setToastMsg("Prediction copied to clipboard! 📋");
    setToastVisible(true);
  };

  return (
    <PageLayout
      showBack={true}
      backHref="/"
      variant="dark"
      header={<HeaderTitle title="LoveLife Calculator 💋" />}
      rightAction={
        <button
          onClick={() => setHistoryOpen(true)}
          className="relative p-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
          title="Prediction History"
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
      <div className="w-full max-w-xl mx-auto space-y-6 pb-20 text-white font-sans">
        {/* Header Tagline */}
        <div className="text-center pt-1 pb-1">
          <p className="text-xs md:text-sm text-slate-300 max-w-sm mx-auto">
            Test your compatibility, forecast your wedding date, and predict your future children!
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-slate-900/70 border border-white/15 rounded-3xl p-5 md:p-6 backdrop-blur-xl shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💖</span>
              <div>
                <h2 className="text-sm md:text-base font-bold text-white">Couple Compatibility</h2>
                <p className="text-xs text-rose-300">Enter names to calculate marriage & family</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3">
            {/* Person 1 Name */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <User size={14} className="text-rose-400" /> Person 1
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-400 transition-colors"
              />
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwapNames}
              className="w-10 h-10 mx-auto rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-rose-300 transition-transform hover:scale-110 active:scale-95"
              title="Swap names"
            >
              <ArrowUpDown size={18} />
            </button>

            {/* Person 2 Name */}
            <div className="space-y-1.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Heart size={14} className="text-pink-400" /> Person 2
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter your partner's name"
                className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-400 transition-colors"
              />
            </div>
          </div>

          {/* Quick Preset Couples */}
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-slate-400">Try Popular Couples:</span>
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
                  {c.n1} &amp; {c.n2}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 disabled:opacity-50 transition-all hover:scale-[1.01]"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Calculating Marriage & Children...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Calculate Love & Marriage Prediction
              </>
            )}
          </button>
        </div>

        {/* PREDICTION RESULTS */}
        {result && (
          <div className="space-y-6 pt-2 animate-fadeIn">
            {/* HERO SCORE & MATCH DISPLAY */}
            <div className="relative bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-purple-950/90 border border-rose-500/30 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl text-center space-y-4 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 bg-rose-500/10 rounded-full blur-3xl w-48 h-48 pointer-events-none" />

              {/* Couple Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-semibold text-rose-200">
                <span>{result.name1}</span>
                <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
                <span>{result.name2}</span>
              </div>

              {/* Score Gauge */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
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
                    stroke="url(#loveLifeScoreGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * displayScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-75 ease-out"
                  />
                  <defs>
                    <linearGradient id="loveLifeScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F43F5E" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-rose-200">
                    {displayScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-rose-300/80 tracking-widest mt-0.5">
                    Compatibility
                  </span>
                </div>
              </div>

              <p className="text-sm font-semibold text-rose-200 max-w-md mx-auto">
                {result.compatibilityDesc}
              </p>

              <button
                onClick={handleCopySummary}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors"
              >
                <Copy size={14} /> Copy Marriage Report
              </button>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex gap-2 p-1 bg-slate-900/80 border border-white/10 rounded-2xl">
              <button
                onClick={() => setActiveStepTab("marriage")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeStepTab === "marriage"
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                💒 Wedding Forecast
              </button>
              <button
                onClick={() => setActiveStepTab("children")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeStepTab === "children"
                    ? "bg-pink-500 text-white shadow-md shadow-pink-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🍼 Children Forecast
              </button>
              <button
                onClick={() => setActiveStepTab("metrics")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeStepTab === "metrics"
                    ? "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                📊 Chemistry Stats
              </button>
            </div>

            {/* TAB CONTENT CARDS */}
            <div className="bg-slate-900/70 border border-white/15 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-4">
              {/* 1) MARRIAGE DATE PREDICTION */}
              {(activeStepTab === "marriage" || activeStepTab === "score") && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                    <span className="text-2xl">💒</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">Wedding Date Prediction</h3>
                      <p className="text-xs text-rose-300">Destiny Marriage Timeline</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-rose-950/60 to-purple-950/60 border border-rose-500/30 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <Calendar size={15} /> Expected Ceremony Date
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/30">
                        {result.marriageMonthYear}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-relaxed pt-1">
                      {result.marriageText}
                    </p>
                  </div>
                </div>
              )}

              {/* 2) CHILDREN PREDICTION */}
              {(activeStepTab === "children" || activeStepTab === "score") && (
                <div className="space-y-3 animate-fadeIn pt-1">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                    <span className="text-2xl">🍼</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">Future Children Forecast</h3>
                      <p className="text-xs text-pink-300">Family Growth & Baby Timeline</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-950/60 to-indigo-950/60 border border-pink-500/30 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                        <Baby size={15} /> Total Expected Children
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-500/30">
                        {result.childrenCount} {result.childrenCount === 1 ? "Child" : "Children"}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-relaxed pt-1">
                      {result.childrenText}
                    </p>
                  </div>
                </div>
              )}

              {/* 3) CHEMISTRY STATS */}
              {(activeStepTab === "metrics" || activeStepTab === "score") && (
                <div className="space-y-3 animate-fadeIn pt-1">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <BarChart2 size={18} className="text-purple-400" />
                      <h3 className="text-sm font-bold text-white">Chemistry Breakdown</h3>
                    </div>
                    <button
                      onClick={() => setShowMetrics(!showMetrics)}
                      className="text-xs text-purple-300 hover:text-purple-200 font-medium flex items-center gap-1"
                    >
                      {showMetrics ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {showMetrics ? "Hide Details" : "Show Details"}
                    </button>
                  </div>

                  {showMetrics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>🌹 Romance Level</span>
                          <span className="font-bold text-white">{result.metrics.romance}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${result.metrics.romance}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>💬 Communication Match</span>
                          <span className="font-bold text-white">{result.metrics.communication}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500 rounded-full" style={{ width: `${result.metrics.communication}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>🔥 Passion Spark</span>
                          <span className="font-bold text-white">{result.metrics.passion}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${result.metrics.passion}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>🧘 Harmony Score</span>
                          <span className="font-bold text-white">{result.metrics.harmony}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${result.metrics.harmony}%` }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RE-CALCULATE BUTTON */}
            <div className="text-center pt-2">
              <button
                onClick={() => setResult(null)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-2xl text-xs inline-flex items-center gap-2 border border-white/15 transition-all"
              >
                <RotateCcw size={16} /> Recalculate LoveLife Prediction
              </button>
            </div>
          </div>
        )}
      </div>

      {/* HISTORY MODAL */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col p-6 text-white shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock size={16} className="text-rose-400" /> Saved LoveLife Calculations ({history.length})
              </h3>
              <button onClick={() => setHistoryOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 scrollbar-thin">
              {history.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">
                  No previous calculations saved yet. Try entering two names!
                </p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setResult(item);
                      setName1(item.name1);
                      setName2(item.name2);
                      setHistoryOpen(false);
                      animateScore(item.score);
                    }}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">
                        {item.name1} & {item.name2}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()} • {item.marriageMonthYear}
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
    </PageLayout>
  );
}
