import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

const MICROPROOFS = [
  "No broad rollout required.",
  "Built around your real inquiry flow.",
  "Custom walkthrough for your business.",
];

export default function SpasSalonsCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0D0D0D] py-28 text-white sm:py-32"
    >
      {/* Bottom red glow arc */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[60%] h-[140%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(239,14,26,0.35) 0%, rgba(239,14,26,0.08) 30%, transparent 60%)",
        }}
      />

      {/* Decorative futuristic orbital network */}
      <svg
        aria-hidden
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -right-32 top-1/2 hidden h-[820px] w-[820px] -translate-y-1/2 select-none opacity-[0.55] sm:block"
      >
        <defs>
          <radialGradient id="ctaCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF3344" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#E50914" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ctaArcStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E50914" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF4757" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ctaNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#FF4757" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
          </radialGradient>
          <filter id="ctaSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Core glow */}
        <circle cx="400" cy="400" r="220" fill="url(#ctaCoreGlow)" />

        {/* Concentric arcs */}
        <g
          fill="none"
          stroke="url(#ctaArcStroke)"
          strokeLinecap="round"
        >
          <circle cx="400" cy="400" r="140" strokeOpacity="0.55" />
          <circle cx="400" cy="400" r="220" strokeOpacity="0.35" />
          <circle
            cx="400"
            cy="400"
            r="300"
            strokeOpacity="0.3"
            strokeDasharray="2 8"
          />
          <circle cx="400" cy="400" r="370" strokeOpacity="0.22" />
        </g>

        {/* Tilted orbit ring */}
        <g
          fill="none"
          stroke="#E50914"
          strokeOpacity="0.45"
          transform="rotate(-22 400 400)"
        >
          <ellipse cx="400" cy="400" rx="340" ry="170" />
          <ellipse
            cx="400"
            cy="400"
            rx="280"
            ry="120"
            strokeOpacity="0.3"
            strokeDasharray="3 6"
          />
        </g>

        {/* Connector lines from center */}
        <g
          stroke="#FF4757"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="2 5"
        >
          <line x1="400" y1="400" x2="640" y2="220" />
          <line x1="400" y1="400" x2="700" y2="430" />
          <line x1="400" y1="400" x2="560" y2="640" />
          <line x1="400" y1="400" x2="160" y2="520" />
          <line x1="400" y1="400" x2="220" y2="240" />
        </g>

        {/* Orbit nodes */}
        <g>
          {[
            { cx: 640, cy: 220, r: 8 },
            { cx: 700, cy: 430, r: 6 },
            { cx: 560, cy: 640, r: 10 },
            { cx: 160, cy: 520, r: 7 },
            { cx: 220, cy: 240, r: 6 },
            { cx: 540, cy: 280, r: 4 },
            { cx: 320, cy: 600, r: 4 },
          ].map((n, i) => (
            <g key={i}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 2.2}
                fill="url(#ctaNodeGlow)"
                opacity="0.7"
              />
              <circle cx={n.cx} cy={n.cy} r={n.r} fill="#FF4757" />
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 0.45}
                fill="#FFFFFF"
              />
            </g>
          ))}
        </g>

        {/* Central N glyph */}
        <g filter="url(#ctaSoftGlow)">
          <circle
            cx="400"
            cy="400"
            r="56"
            fill="#0D0D0D"
            stroke="#E50914"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
        </g>
        <text
          x="400"
          y="420"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="52"
          fontWeight="800"
          fill="#FF4757"
          opacity="0.9"
        >
          N
        </text>

        {/* Crosshair ticks on outer ring */}
        <g stroke="#FF4757" strokeOpacity="0.55" strokeWidth="1.5">
          <line x1="400" y1="22" x2="400" y2="46" />
          <line x1="400" y1="754" x2="400" y2="778" />
          <line x1="22" y1="400" x2="46" y2="400" />
          <line x1="754" y1="400" x2="778" y2="400" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Top short red line */}
        <div className="mx-auto h-[2px] w-10 rounded-full bg-[#E50914]" />

        <p className="mt-5 text-[14px] font-semibold text-[#E50914]">
          See how Nexi would work in your salon or spa
        </p>

        <h2 className="mt-5 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.025em] sm:text-6xl md:text-[4.2rem]">
          Every missed inquiry is still a missed booking
          <span className="text-[#E50914]">.</span>
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-[16px]">
          Book a custom demo and see how Nexi could help your business respond
          faster, protect front-desk capacity, and move more high-intent
          clients toward booked appointments.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5">
          <Link
            href="#book-demo"
            className="group relative inline-flex w-full max-w-md items-center justify-center gap-3 rounded-2xl px-10 py-5 text-[18px] font-semibold text-white transition-all duration-200 hover:brightness-110"
            style={{
              background:
                "linear-gradient(180deg, #FF3344 0%, #E50914 50%, #B30710 100%)",
              boxShadow:
                "0 0 60px rgba(239,14,26,0.55), 0 10px 30px rgba(239,14,26,0.4), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.25)",
            }}
          >
            Book a demo
            <ArrowRight
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2.4}
            />
          </Link>

          <Link
            href="#nexi-in-action"
            className="group inline-flex items-center gap-2 text-[15px] font-medium text-white underline decoration-[#E50914]/70 decoration-2 underline-offset-[6px] transition hover:decoration-[#E50914]"
          >
            See Nexi in action
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2.4}
            />
          </Link>
        </div>

        {/* Risk reversal divider */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E50914]/60" />
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E50914]/50 text-[#FF4757]">
            <ShieldCheck className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E50914]/60" />
        </div>

        <p className="mt-5 text-[15px] text-white/85 sm:text-[16px]">
          Start with one location. Expand only if it works.
        </p>

        {/* Microproof row */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-[13px] text-white/65 sm:flex-row sm:gap-0">
          {MICROPROOFS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 sm:px-5 sm:[&:not(:last-child)]:border-r sm:[&:not(:last-child)]:border-white/10"
            >
              <CheckCircle2
                className="h-3.5 w-3.5 text-[#E50914]"
                strokeWidth={2.4}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
