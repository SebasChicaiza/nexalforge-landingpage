import Link from "next/link";
import { Check, Crown, ArrowRight } from "lucide-react";

const PERKS = [
  "1 location",
  "1 connected channel",
  "Setup included",
  "Direct founder support",
  "Early access to new features",
  "Priority feedback loop",
];

export default function FoundingPartner() {
  return (
    <section className="relative overflow-hidden bg-[#0D0D0D] py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#15151A] via-[#121214] to-[#0F0F12] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.5)] sm:p-12">
          {/* Decorative glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,180,90,0.18), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 h-[320px] w-[320px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(120,80,255,0.18), transparent 70%)",
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                <Crown className="h-3.5 w-3.5" />
                Founding Partner
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl md:text-[2.5rem]">
                $99
                <span className="text-xl font-medium text-white/55">
                  /mo for 3 months
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                For the first selected salons and spas. Setup fees waived. After
                3 months, you move to Starter, Growth, or Pro — whichever fits
                your operation best.
              </p>
              <Link
                href="#contact"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/[0.12]"
              >
                Apply as a founding partner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {PERKS.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-amber-200">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[13.5px] leading-snug text-white/85">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
