"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { FileText, Sparkles, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <PageLayout
      showBack={true}
      backHref="/"
      variant="dark"
      header={<HeaderTitle title="Terms of Service 📜" />}
    >
      <div className="w-full max-w-2xl mx-auto space-y-6 pb-12 text-slate-300 font-sans text-sm leading-relaxed">
        <section className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2">
            <FileText size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">Last updated: July 2025</p>
        </section>

        <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" /> 1. Entertainment Purpose
            </h2>
            <p className="text-xs text-slate-300">
              Rizz AI, FireFun AI scores, marriage compatibility calculators, and crush ratings are designed strictly for entertainment and novelty purposes. They are meant to spark fun conversations and date night laughs.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-400" /> 2. Fair Usage & Respect
            </h2>
            <p className="text-xs text-slate-300">
              Users are expected to use Rizz AI respectfully. The platform must not be used to harass, bully, or demean individuals.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Intellectual Property</h2>
            <p className="text-xs text-slate-300">
              All branding, visual designs, quiz prompts, and code assets are protected property of Rizz AI.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Agreement</h2>
            <p className="text-xs text-slate-300">
              By accessing Rizz AI, you agree to these Terms of Service. Enjoy the features and have fun connecting!
            </p>
          </div>
        </div>

        {/* Footer with Bottom Navigation Bar before ruler */}
        <Footer variant="dark" currentPath="/terms" />
      </div>
    </PageLayout>
  );
}
