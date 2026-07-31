"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { Heart, Sparkles, ShieldCheck, Flame, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout
      showBack={true}
      backHref="/"
      variant="dark"
      header={<HeaderTitle title="About Rizz AI ❤️" />}
    >
      <div className="w-full max-w-2xl mx-auto space-y-8 pb-12 text-slate-200 font-sans">
        {/* Hero Section */}
        <section className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>AI Love & Relationship Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Rizz AI
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
            Rizz AI is your ultimate companion for dating, relationship compatibility, fun couple games, and AI-powered love analysis.
          </p>
        </section>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 backdrop-blur-xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Couple Synergy & Games</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore 100+ prompt categories, Would You Rather, Truth or Dare, and attachment style quizzes built to spark genuine connection.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 backdrop-blur-xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">FireFun AI Chemistry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant marriage compatibility scores, who falls first, who loves more, and unfiltered savage AI ex roasts.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 backdrop-blur-xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Pickup Lines & Rate My Crush</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-generated rizz lines, photo rate analysis, and mutual spark calculations designed for modern dating.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-5 backdrop-blur-xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Privacy First</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your calculations and photo analyses stay private and local on your device. Zero judgment, 100% fun.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-slate-900/80 border border-rose-500/20 rounded-3xl p-6 sm:p-8 space-y-3 text-center">
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            To bring playfulness, deep conversation, and joyful AI entertainment into every date night and relationship experience.
          </p>
        </section>

        {/* Footer with Bottom Navigation Bar before ruler */}
        <Footer variant="dark" currentPath="/about" />
      </div>
    </PageLayout>
  );
}
