import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Check,
  MessageSquare,
  Play,
  Phone,
  Tag,
  MoreHorizontal,
  Users,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

const BULLETS = [
  "Capture after-hours calls, web leads, Instagram DMs, and message inquiries before they go cold",
  "Guide clients to the right stylist, therapist, service, or location",
  "Support booking or staff handoff with full conversation context",
  "Keep the front desk focused on in-store clients, not constant phone tag",
];

export default function SpasSalonsHero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0D0D0D] pb-24 pt-36 sm:pt-40"
    >
      {/* Ambient red glow — bottom-left arc, like the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-40 left-1/2 h-[900px] w-[1400px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(239,14,26,0.28), rgba(239,14,26,0.08) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-72 left-1/2 h-[820px] w-[820px] -translate-x-1/2 rounded-full"
        style={{
          boxShadow:
            "inset 0 0 80px 4px rgba(239,14,26,0.5), 0 0 140px rgba(239,14,26,0.22)",
          opacity: 0.65,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Brand mark */}
        <div className="flex justify-center">
          <Image
            src="/nuevo-nexi/nexi-logo-white-nobg.png"
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
            For premium salons and day spas with a busy front desk
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto mt-7 max-w-5xl text-center text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-6xl md:text-[4.25rem]">
          <span className="text-white">
            Convert more salon and spa inquiries into booked appointments —{" "}
          </span>
          <span className="bg-gradient-to-b from-[#FF3344] to-[#E50914] bg-clip-text text-transparent">
            without adding front-desk headcount.
          </span>
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-7 max-w-3xl text-center text-base leading-relaxed text-white/70 sm:text-lg">
          Nexi helps salons and spas reply faster, guide clients to the right
          service or provider, support booking, and keep high-intent demand
          moving after hours.
        </p>

        {/* Bullets */}
        <ul className="mx-auto mt-10 grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
          {BULLETS.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 text-[0.98rem] leading-snug text-white/85"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[#EF0E1A]/40 bg-[#EF0E1A]/10 text-[#FF4757]">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#contact"
            className="group relative inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_rgba(239,14,26,0.45),inset_0_1px_0_rgba(255,255,255,0.22)] transition-all duration-200 hover:brightness-110"
            style={{
              background:
                "linear-gradient(135deg, #FF6A75 0%, #FF1F2E 28%, #E50914 100%)",
            }}
          >
            Book a demo
          </Link>
          <Link
            href="#nexi-in-action"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/[0.08]"
          >
            See Nexi in action
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              <Play className="h-3 w-3 fill-white text-white" />
            </span>
          </Link>
        </div>

        {/* Microcopy */}
        <p className="mt-5 text-center text-sm text-white/50">
          Built for premium salons and day spas — not generic bot flows.
        </p>

        {/* Visual mockup */}
        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto mt-16 max-w-6xl">
      {/* Chat console */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141415] shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]">
        <div className="grid grid-cols-[56px_minmax(220px,260px)_1fr_minmax(240px,280px)]">
          {/* Rail */}
          <div className="flex flex-col items-center gap-1 border-r border-white/[0.04] bg-[#0F0F10] py-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">
              <Sparkles className="h-4 w-4 text-white/70" />
            </div>
            <RailIcon active>
              <MessageSquare className="h-4 w-4" />
            </RailIcon>
            <RailIcon>
              <Users className="h-4 w-4" />
            </RailIcon>
            <RailIcon>
              <Calendar className="h-4 w-4" />
            </RailIcon>
            <RailIcon>
              <BarChart3 className="h-4 w-4" />
            </RailIcon>
            <RailIcon>
              <Settings className="h-4 w-4" />
            </RailIcon>
          </div>

          {/* Conversations list */}
          <div className="border-r border-white/[0.04] bg-[#121213] py-3">
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="text-sm font-semibold text-white">
                Conversations
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/60">
                All
                <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
                  <path d="M5 7l5 6 5-6z" />
                </svg>
              </span>
            </div>
            <ul className="space-y-1 px-2">
              <ConvRow
                name="Mariana López"
                preview="Hi, I'd like to book a hydrating facial…"
                time="2m"
                unread
                active
              />
              <ConvRow
                name="Carlos Ramírez"
                preview="Do you have availability for a deep-tissue?"
                time="5m"
                unread
              />
              <ConvRow
                name="Ana Torres"
                preview="I'd like to book a balayage with Sofía"
                time="12m"
              />
              <ConvRow
                name="Camila Soto"
                preview="¿Tienen disponibilidad mañana?"
                time="18m"
              />
            </ul>
          </div>

          {/* Chat thread */}
          <div className="flex flex-col bg-[#141415]">
            <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-3">
              <span className="text-sm font-semibold text-white">
                Mariana López
              </span>
              <div className="flex items-center gap-3 text-white/60">
                <Phone className="h-4 w-4" />
                <Tag className="h-4 w-4" />
                <MoreHorizontal className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 px-5 py-5">
              <Bubble side="in">
                <p>Hi, I&apos;m interested in a hydrating facial.</p>
                <Time>10:32 AM</Time>
              </Bubble>
              <Bubble side="out">
                <p>
                  Lovely choice <span aria-hidden>✨</span> I can help with that.
                  Would you prefer our 60-minute Glow Facial or the 90-minute
                  Deep Hydration treatment?
                </p>
                <Time>10:33 AM</Time>
              </Bubble>
              <Bubble side="in">
                <p>The 90-minute one, please.</p>
                <Time>10:33 AM</Time>
              </Bubble>
            </div>
          </div>

          {/* Client summary panel */}
          <div className="border-l border-white/[0.04] bg-[#121213] p-5">
            <p className="text-sm font-semibold text-white">Client summary</p>
            <dl className="mt-4 space-y-3 text-[13px]">
              <SummaryRow label="Intent" value="Hydrating Facial" pill />
              <SummaryRow label="Location" value="Polanco Spa" pill subtle />
              <SummaryRow
                label="Preferred time"
                value="Tomorrow morning"
                pill
                subtle
              />
              <SummaryRow label="Language" value="Spanish" pill subtle />
            </dl>

            <div className="mt-6">
              <p className="text-sm font-semibold text-white">Next step</p>
              <div className="mt-3 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] p-3">
                <div className="flex items-center gap-2 text-[13px] font-medium text-emerald-300">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  Appointment booked
                </div>
                <p className="mt-1 text-xs text-white/70">
                  May 27, 10:00 AM
                  <br />
                  Polanco Spa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating outcome cards */}
      <FloatingCard
        className="hidden md:flex md:-right-8 md:top-12 lg:-right-16"
        icon={
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#EF0E1A]/15 text-[#FF4757]">
            <Calendar className="h-4 w-4" />
          </span>
        }
        title="Appointment confirmed"
        body="May 27, 10:00 AM"
      />
      <FloatingCard
        className="hidden md:flex md:-right-12 md:bottom-10 lg:-right-20"
        icon={
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#EF0E1A]/15 text-[#FF4757]">
            <BarChart3 className="h-4 w-4" />
          </span>
        }
        title="Hydration package upsell"
        body="$420 USD"
      />

      {/* Provider preference floating chip — left side */}
      <div className="absolute -left-6 top-24 hidden rounded-xl border border-white/[0.06] bg-[#141415]/95 px-3 py-2 text-[12px] text-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur md:block lg:-left-12">
        <div className="flex items-center gap-2">
          <Image
            src="/Nexi.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 rounded-full object-cover"
          />
          <span className="text-white/90">Routed to</span>
          <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-white">
            Sofía · Senior Stylist
          </span>
        </div>
      </div>
    </div>
  );
}

function RailIcon({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`mb-1 inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${
        active
          ? "bg-[#EF0E1A] text-white shadow-[0_4px_14px_rgba(211,47,47,0.45)]"
          : "text-white/55 hover:bg-white/[0.04] hover:text-white/80"
      }`}
      type="button"
      tabIndex={-1}
    >
      {children}
    </button>
  );
}

function ConvRow({
  name,
  preview,
  time,
  unread,
  active,
}: {
  name: string;
  preview: string;
  time: string;
  unread?: boolean;
  active?: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-3 rounded-lg px-2 py-2 ${
        active ? "bg-white/[0.04]" : ""
      }`}
    >
      <div className="h-8 w-8 flex-none rounded-full bg-gradient-to-br from-white/10 to-white/[0.03]" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-[13px] font-medium text-white">
            {name}
          </span>
          <span className="text-[11px] text-white/45">{time}</span>
        </div>
        <p className="truncate text-[12px] text-white/55">{preview}</p>
      </div>
      {unread && (
        <span className="ml-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-[#EF0E1A]" />
      )}
    </li>
  );
}

function Bubble({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "in" | "out";
}) {
  const inbound = side === "in";
  return (
    <div className={`flex ${inbound ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
          inbound
            ? "rounded-tl-sm bg-white/[0.05] text-white/90"
            : "rounded-tr-sm bg-[#1d1d1f] text-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Time({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-1 block text-right text-[10px] text-white/40">
      {children}
    </span>
  );
}

function SummaryRow({
  label,
  value,
  pill,
  subtle,
}: {
  label: string;
  value: string;
  pill?: boolean;
  subtle?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/55">{label}</dt>
      <dd>
        {pill ? (
          <span
            className={`rounded-md px-2 py-0.5 text-[12px] ${
              subtle
                ? "bg-white/[0.05] text-white/85"
                : "bg-[#EF0E1A]/15 text-[#FF6677]"
            }`}
          >
            {value}
          </span>
        ) : (
          <span className="text-white/85">{value}</span>
        )}
      </dd>
    </div>
  );
}

function FloatingCard({
  className = "",
  icon,
  title,
  body,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#141415]/95 px-3.5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur ${className}`}
    >
      {icon}
      <div>
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-[12px] text-white/60">{body}</p>
      </div>
    </div>
  );
}
