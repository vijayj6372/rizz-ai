import { Cookie, HardDrive, Settings } from "lucide-react";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { HeaderTitle } from "@/components/HeaderTitle";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
  return (
    <PageLayout
      showBack
      backHref="/"
      variant="dark"
      header={<HeaderTitle title="Cookie Policy" />}
    >
      <main className="mx-auto w-full max-w-2xl pb-12 font-sans text-sm leading-relaxed text-slate-300">
        <section className="space-y-2 pt-2 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300">
            <Cookie size={28} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-400">Last updated: October 20, 2026</p>
        </section>

        <div className="mt-6 space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl sm:p-8">
          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <Cookie size={16} className="text-amber-300" aria-hidden="true" />
              Cookies used by Rizz AI
            </h2>
            <p>
              The Rizz AI application does not currently set cookies for
              advertising, analytics, or cross-site tracking. If that changes,
              this policy will be updated to explain the cookies and choices
              available to you.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <HardDrive size={16} className="text-sky-300" aria-hidden="true" />
              Browser local storage
            </h2>
            <p>
              Some preferences and feature progress are saved in your
              browser&apos;s local storage, which is different from a cookie and
              is not automatically sent to our servers with each request. This
              may include your language preference, onboarding status, and
              locally saved feature history or results.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <Settings size={16} className="text-violet-300" aria-hidden="true" />
              Your choices
            </h2>
            <p>
              You can remove locally stored data through your browser&apos;s
              site-data settings. Clearing it may reset saved preferences or
              remove locally saved progress. External websites linked from Rizz
              AI may use their own cookies and are governed by their respective
              policies.
            </p>
          </section>

          <p>
            For more information about personal information handled by the app,
            see our{" "}
            <Link className="font-semibold text-rose-300 underline" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <Footer variant="dark" currentPath="/cookies" />
      </main>
    </PageLayout>
  );
}
