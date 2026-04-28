import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-[#0D0D0D] pb-16 pt-28 sm:pb-20 sm:pt-36">
      {/* Ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 left-1/2 h-[820px] w-[1300px] -translate-x-1/2 animate-glow-a will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(239,14,26,0.22), rgba(239,14,26,0.06) 45%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full animate-glow-b will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(120,80,255,0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-32 h-[480px] w-[480px] rounded-full animate-glow-c will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,170,110,0.08), transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Brand mark */}
        <div className="flex justify-center">
          <Image
            src="/nuevo-nexi/nexi-logo-white-v2.png"
            alt="Nexi"
            width={140}
            height={56}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </div>

        {/* Eyebrow */}
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#EF0E1A]/60" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-[#EF0E1A]" />
            </span>
            Pricing
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto mt-7 max-w-4xl text-center text-[2.25rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[4rem]">
          <span className="text-white">Turn more inquiries into </span>
          <span
            className="font-normal italic text-white/95"
            style={{ fontFamily: "var(--font-serif-display)" }}
          >
            booked
          </span>
          <span className="bg-gradient-to-b from-[#FF3344] to-[#E50914] bg-clip-text text-transparent">
            {" "}
            appointments.
          </span>
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-[15px] leading-relaxed text-white/70 sm:text-lg">
          Nexi helps salons and spas capture missed demand, respond faster,
          guide clients to the right service, and support booking — without
          adding front-desk headcount.
        </p>

        {/* Reassurance row */}
        <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:flex-wrap">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/[0.08] px-4 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            14-day full refund · no questions asked
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur">
            Nexi includes its own calendar and booking system
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#plans"
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_rgba(239,14,26,0.45),inset_0_1px_0_rgba(255,255,255,0.22)] transition-all duration-200 hover:brightness-110"
            style={{
              background:
                "linear-gradient(135deg, #FF6A75 0%, #FF1F2E 28%, #E50914 100%)",
            }}
          >
            View plans
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/[0.08]"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
