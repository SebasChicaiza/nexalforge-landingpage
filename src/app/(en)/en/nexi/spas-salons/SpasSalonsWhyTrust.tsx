import Image from "next/image";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  MapPin,
  Scissors,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export default function SpasSalonsWhyTrust() {
  return (
    <section
      id="why-trust"
      className="relative overflow-hidden bg-[#0D0D0D] py-20 text-white sm:py-28"
    >
      {/* Ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-15%] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(239,14,26,0.18), transparent 70%)",
        }}
      />
      {/* Warm amber accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,170,110,0.07), transparent 70%)",
        }}
      />
      {/* Top hairline highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Intro */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#E50914]">
              Built for real salon and spa operations
            </p>
            <h2 className="mt-5 text-[2rem] font-bold leading-[1.06] tracking-[-0.025em] sm:text-5xl md:text-[3.5rem]">
              Why salons and spas{" "}
              <span
                className="font-normal italic text-white/95"
                style={{ fontFamily: "var(--font-serif-display)" }}
              >
                trust
              </span>{" "}
              Nexi when missed inquiries actually cost them
              <span className="text-[#E50914]">.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65">
              Nexi is designed to help beauty businesses respond faster, protect
              front-desk capacity, and move more high-intent inquiries toward
              booked appointments — without breaking the workflow your team
              already depends on.
            </p>
          </div>

          {/* Nexi logo mark */}
          <div className="relative mx-auto flex h-[260px] w-full max-w-[360px] items-center justify-center sm:h-[300px]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[32px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(239,14,26,0.35), transparent 70%)",
              }}
            />
            <div className="relative flex h-full w-full items-center justify-center rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1a0a0c] via-[#0D0D0D] to-[#0a0a0a] shadow-[inset_0_0_60px_rgba(239,14,26,0.18)]">
              <Image
                src="/nuevo-nexi/nexi-logo-white-nobg.png"
                alt="Nexi"
                width={200}
                height={200}
                className="h-auto w-[160px] opacity-90 sm:w-[180px]"
              />
            </div>
          </div>
        </div>

        {/* Block 1 */}
        <Block className="mt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
            <BlockText
              icon={<TrendingUp className="h-5 w-5" strokeWidth={2.2} />}
              title="More high-intent inquiries move toward bookings"
              body="Nexi helps you respond faster, reduce missed after-hours demand, and move more valuable inquiries toward confirmed appointments."
            />
            <div className="space-y-4">
              {/* High-intent inquiry */}
              <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  High-intent inquiry
                </p>
                <div className="mt-4 flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/70">
                    <Scissors className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-semibold">
                      Balayage appointment
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[12px] text-white/55">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                      Downtown Salon
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 border-t border-white/8 pt-4 sm:grid-cols-2">
                  <FieldRow
                    icon={<Clock className="h-4 w-4" strokeWidth={1.8} />}
                    label="Preferred time"
                    value="Saturday morning"
                  />
                  <FieldRow
                    icon={
                      <FileText className="h-4 w-4" strokeWidth={1.8} />
                    }
                    label="Language"
                    value="English"
                  />
                </div>
              </div>

              {/* Booked confirmation */}
              <div
                className="relative rounded-2xl border border-[#E50914]/40 p-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(239,14,26,0.18) 0%, rgba(239,14,26,0.04) 100%)",
                  boxShadow: "0 0 40px rgba(239,14,26,0.18)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E50914]/60 bg-[#E50914]/10 text-[#FF4757]">
                    <Check className="h-6 w-6" strokeWidth={2.4} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-semibold">
                      Appointment booked
                    </p>
                    <p className="mt-0.5 text-[13px] text-white/65">
                      with Sofía M.
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-[12px] text-white/60">
                      <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                      Sat, May 17 · 10:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Block>

        {/* Block 2 */}
        <Block className="mt-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
            {/* Visual: N badge connecting to four cards */}
            <div className="relative">
              <div className="flex items-stretch gap-4">
                {/* N badge column */}
                <div className="flex shrink-0 items-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E50914]/50 bg-[#1a0a0c] text-[#FF4757]"
                    style={{ boxShadow: "0 0 24px rgba(239,14,26,0.35)" }}
                  >
                    <span className="text-[22px] font-bold">N</span>
                  </div>
                </div>
                {/* Connector + cards */}
                <div className="relative flex-1 space-y-3">
                  <div
                    aria-hidden
                    className="absolute -left-4 top-1/2 hidden h-px w-4 bg-[#E50914]/40 sm:block"
                  />
                  <RouteCard
                    icon={<Users className="h-4 w-4" strokeWidth={1.8} />}
                    label="Stylist match"
                    value="Color expertise"
                    accent="Sofía Méndez"
                  />
                  <RouteCard
                    icon={<MapPin className="h-4 w-4" strokeWidth={1.8} />}
                    label="Location routing"
                    value="Downtown Salon"
                    accent="Best availability"
                  />
                  <RouteCard
                    icon={
                      <Calendar className="h-4 w-4" strokeWidth={1.8} />
                    }
                    label="Scheduling support"
                    value="Saturdays available"
                    accent="Next: Sat 10:00 AM"
                  />
                  <RouteCard
                    icon={
                      <FileText className="h-4 w-4" strokeWidth={1.8} />
                    }
                    label="Full-context handoff"
                    value="Complete conversation"
                    accent="& client details"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <BlockText
                icon={<Users className="h-5 w-5" strokeWidth={2.2} />}
                title="Built for the way beauty businesses actually operate"
                body="From service and provider routing to scheduling support and full-context handoff, Nexi fits real salon and spa workflows — not generic chatbot scripts."
              />
              {/* Handoff panel */}
              <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
                <p className="text-[13px] font-semibold text-white/85">
                  Handoff to your team
                </p>
                <ul className="mt-3 space-y-2 text-[13px] text-white/70">
                  {[
                    "Client intent & history",
                    "Preferred time & location",
                    "Service interest",
                    "Pricing question",
                    "Conversation summary",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2
                        className="h-4 w-4 text-[#E50914]"
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Block>

        {/* Block 3 */}
        <Block className="mt-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
            <div className="space-y-6">
              <BlockText
                icon={<Target className="h-5 w-5" strokeWidth={2.2} />}
                title="Start with one location"
                body="Pilot Nexi in a single salon or spa first. Measure response speed, handoff quality, and booking conversion before expanding wider."
                supporting="Expand only if it works."
              />
              {/* Pilot baseline panel */}
              <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-white/85">
                    Pilot baseline
                  </p>
                  <span className="text-[11px] text-white/45">
                    Downtown Salon
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <BaselineStat
                    icon={<Clock className="h-4 w-4" strokeWidth={1.8} />}
                    label="Avg. first response"
                    value="1m 12s"
                  />
                  <BaselineStat
                    icon={<Check className="h-4 w-4" strokeWidth={1.8} />}
                    label="Handoff quality"
                    value="High"
                  />
                  <BaselineStat
                    icon={
                      <TrendingUp className="h-4 w-4" strokeWidth={1.8} />
                    }
                    label="Inquiry to booking"
                    value="Improving"
                  />
                </div>
              </div>
            </div>

            {/* Pilot mode visual */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-semibold text-white/85">
                    <span className="h-2 w-2 rounded-full bg-[#E50914]" />
                    Pilot mode
                  </span>
                  <span className="text-[11px] text-white/45">
                    1 location active
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#E50914]/40 bg-[#1a0a0c]/40 p-3">
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#2a1518] via-[#1a0a0c] to-[#0a0a0a]">
                    <div className="flex h-full w-full items-center justify-center">
                      <Scissors
                        className="h-6 w-6 text-[#FF4757]/70"
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold">Downtown Salon</p>
                    <p className="mt-0.5 text-[12px] text-white/55">
                      123 Main St.
                    </p>
                    <span className="mt-2 inline-flex items-center rounded-full border border-[#E50914]/60 bg-[#E50914]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#FF4757]">
                      Active pilot
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-center text-[12px] text-white/50">
                  Expand when ready
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {["Northside Salon", "Westview Spa", "Eastgate Salon"].map(
                    (name) => (
                      <div
                        key={name}
                        className="rounded-xl border border-white/8 bg-[#141414]/60 p-3 text-center"
                      >
                        <p className="text-[12px] font-medium text-white/75">
                          {name}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-white/45">
                          <Lock className="h-3 w-3" strokeWidth={1.8} />
                          Upcoming
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </Block>
      </div>
    </section>
  );
}

function Block({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-[#121212] via-[#0F0F0F] to-[#0C0C0C] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-10 ${className}`}
    >
      {children}
    </div>
  );
}

function BlockText({
  icon,
  title,
  body,
  supporting,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  supporting?: string;
}) {
  return (
    <div>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E50914]/40 bg-[#E50914]/10 text-[#FF4757]"
        style={{ boxShadow: "0 0 24px rgba(239,14,26,0.25)" }}
      >
        {icon}
      </div>
      <h3 className="mt-5 text-[1.4rem] font-bold leading-[1.15] tracking-[-0.02em] sm:mt-6 sm:text-[1.85rem]">
        {title}
      </h3>
      <div className="mt-4 h-[2px] w-12 rounded-full bg-[#E50914]" />
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
        {body}
      </p>
      {supporting && (
        <p className="mt-4 text-[14px] font-semibold text-[#E50914]">
          {supporting}
        </p>
      )}
    </div>
  );
}

function FieldRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 text-white/45">{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-white/45">
          {label}
        </p>
        <p className="mt-0.5 text-[13px] font-medium text-white/85">{value}</p>
      </div>
    </div>
  );
}

function RouteCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#141414] p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-wide text-white/50">
          {label}
        </p>
        <p className="mt-0.5 text-[13px] font-semibold text-white/90">
          {value}
        </p>
        <p className="mt-0.5 text-[12px] text-[#FF4757]">{accent}</p>
      </div>
    </div>
  );
}

function BaselineStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0D0D0D] p-3 text-center">
      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white/65">
        {icon}
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-wide text-white/45">
        {label}
      </p>
      <p className="mt-1 text-[14px] font-semibold text-white/90">{value}</p>
    </div>
  );
}
