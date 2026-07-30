"use client";

import React from "react";
import Link from "next/link";
import { Heart, Home, Sparkles, ArrowLeft, Gamepad2, Flame, Search } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07060b] text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
      {/* Dynamic background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 max-w-md w-full text-center space-y-6 bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-2xl shadow-2xl shadow-rose-500/10">
        
        {/* Animated 404 badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-extrabold uppercase tracking-widest animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404 · Page Lost</span>
        </div>

        {/* Big visual number & illustration */}
        <div className="relative my-4">
          <h1 className="text-7xl sm:text-8xl font-black tracking-tighter bg-gradient-to-r from-rose-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce pointer-events-none opacity-80">
            💔
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            This page ran out of Rizz!
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The spark faded or the page you are looking for has been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.02] active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/couple-games"
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Couple Games</span>
            </Link>

            <Link
              href="/firefun"
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>FireFun AI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer with Footer Ruler */}
      <footer className="mt-10 mb-28 max-w-md w-full text-center flex flex-col items-center gap-4">
        <div className="w-full h-[2px] rounded-full bg-gradient-to-r from-transparent via-rose-500/50 to-transparent shadow-sm" />
        <div className="flex items-center gap-3 text-xs font-bold text-rose-400 flex-wrap justify-center">
          <Link href="/about" className="hover:text-rose-300 transition-colors">About</Link>
          <span className="text-slate-600">•</span>
          <Link href="/contact" className="hover:text-rose-300 transition-colors">Contact</Link>
          <span className="text-slate-600">•</span>
          <Link href="/privacy" className="hover:text-rose-300 transition-colors">Privacy Policy</Link>
          <span className="text-slate-600">•</span>
          <Link href="/terms" className="hover:text-rose-300 transition-colors">Terms of Service</Link>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-400">
          Rizz AI © 2025 · Made with ❤️
        </p>
      </footer>

      <BottomNav variant="dark" />
    </div>
  );
}
