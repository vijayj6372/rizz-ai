"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { BottomNav } from "@/components/BottomNav";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
  };

  return (
    <PageLayout
      showBack={true}
      backHref="/"
      variant="dark"
      header={<HeaderTitle title="Contact Us ✉️" />}
    >
      <div className="w-full max-w-xl mx-auto space-y-6 pb-24 text-slate-200 font-sans">
        <section className="text-center space-y-2 pt-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            Have questions, feedback, or feature requests for Rizz AI? We&apos;d love to hear from you!
          </p>
        </section>

        <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-bold text-white">Message Sent!</h2>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Thank you for reaching out to Rizz AI. We will review your message shortly!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="text-xs font-bold text-rose-400 underline hover:text-rose-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Mail size={14} className="text-rose-400" /> Your Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-rose-400" /> Message or Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you love or what we should add next..."
                  className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.01]"
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer with Footer Ruler */}
        <footer className="pt-6 pb-32 flex flex-col items-center gap-4 text-center">
          <div className="w-full max-w-md h-[2px] rounded-full bg-gradient-to-r from-transparent via-rose-500/50 to-transparent shadow-sm" />
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
      </div>
      <BottomNav variant="dark" />
    </PageLayout>
  );
}
