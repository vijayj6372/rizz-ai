"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, EyeOff, Server } from "lucide-react";

export default function PrivacyPage() {
  return (
    <PageLayout
      showBack={true}
      backHref="/"
      variant="dark"
      header={<HeaderTitle title="Privacy Policy 🔒" />}
    >
      <div className="w-full max-w-2xl mx-auto space-y-6 pb-12 text-slate-300 font-sans text-sm leading-relaxed">
        <section className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">Last updated: July 2025</p>
        </section>

        <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock size={16} className="text-rose-400" /> 1. Commitment to Privacy
            </h2>
            <p className="text-xs text-slate-300">
              Rizz AI is committed to protecting your privacy. We believe love and relationship calculations should be private, fun, and secure.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <EyeOff size={16} className="text-purple-400" /> 2. Data Processing & Storage
            </h2>
            <p className="text-xs text-slate-300">
              Your name inputs, quiz selections, and photo uploads are processed locally on your device for calculation purposes. We do not sell or monetize your personal information.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server size={16} className="text-amber-400" /> 3. Local Storage History
            </h2>
            <p className="text-xs text-slate-300">
              Your calculation history (such as FireFun AI scores or Love Tests) is saved locally in your browser&apos;s localStorage so you can access previous results. You can clear this history anytime using the in-app history controls.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Updates & Contact</h2>
            <p className="text-xs text-slate-300">
              We may periodically update this policy to reflect new features. If you have questions regarding privacy, please reach out through our Contact page.
            </p>
          </div>
        </div>

        {/* Footer with Bottom Navigation Bar before ruler */}
        <Footer variant="dark" currentPath="/privacy" />
      </div>
    </PageLayout>
  );
}
