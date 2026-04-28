import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PricingCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0D0D0D] pb-32 pt-4"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#16161B] via-[#101013] to-[#0C0C0F] p-10 text-center shadow-[0_30px_70px_rgba(0,0,0,0.5)] sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 animate-glow-a will-change-transform"
            style={{
              background:
                "radial-gradient(closest-side, rgba(239,14,26,0.22), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full animate-glow-centered will-change-transform"
            style={{
              background:
                "radial-gradient(closest-side, rgba(120,80,255,0.16), transparent 70%)",
            }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl md:text-[2.75rem]">
              Stop letting client inquiries{" "}
              <span
                className="font-normal italic text-white/90"
                style={{ fontFamily: "var(--font-serif-display)" }}
              >
                go cold
              </span>
              .
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-base">
              Pick the plan that fits your operation today. Move up as you
              grow. We&apos;ll help you get Nexi live in days, not weeks.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#plans"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_rgba(239,14,26,0.45),inset_0_1px_0_rgba(255,255,255,0.22)] transition hover:brightness-110"
                style={{
                  background:
                    "linear-gradient(135deg, #FF6A75 0%, #FF1F2E 28%, #E50914 100%)",
                }}
              >
                Start with Growth
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/en/nexi/spas-salons"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/[0.10]"
              >
                See Nexi for spas & salons
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
