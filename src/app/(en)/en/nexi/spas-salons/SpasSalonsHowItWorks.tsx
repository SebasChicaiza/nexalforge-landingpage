import {
  Bell,
  Calendar,
  Check,
  Globe,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Tag,
  Target,
  User,
} from "lucide-react";

export default function SpasSalonsHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#FBF8F2] py-20 text-[#111111] sm:py-28"
    >
      {/* Soft warm gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(168,137,106,0.10), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Intro */}
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#A8896A]">
            How Nexi keeps salon and spa inquiries moving
          </p>
          <h2 className="mt-5 text-[2rem] font-bold leading-[1.06] tracking-[-0.025em] text-[#0D0D0D] sm:text-5xl md:text-[3.5rem]">
            From first inquiry to booked appointment —{" "}
            <span
              className="font-normal italic text-[#8B1E2D]"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              without dropping
            </span>{" "}
            the conversation.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#4a4a4a]">
            Nexi helps salons and spas respond fast, guide clients to the right
            next step, and either book or hand off with full context.
          </p>
          <div className="mt-6 flex items-center gap-2 text-[14px]">
            <Sparkles className="h-4 w-4 text-[#E50914]" strokeWidth={2.4} />
            <span className="text-[#E50914]">
              Respond faster. Route better. Convert more high-intent inquiries.
            </span>
          </div>
        </div>

        {/* Row 1 */}
        <RowLayout textSide="left" className="mt-16 sm:mt-24">
          <RowText
            index="01"
            title="Capture demand instantly"
            body="Respond to after-hours calls, web leads, and Instagram or message inquiries before they go cold."
          />
          <CaptureVisual />
        </RowLayout>

        <Divider />

        {/* Row 2 */}
        <RowLayout textSide="right" className="mt-16 sm:mt-20">
          <RouteVisual />
          <RowText
            index="02"
            title="Guide clients to the right next step"
            body="Match each client to the right service, stylist, therapist, or location based on what they actually need."
          />
        </RowLayout>

        <Divider />

        {/* Row 3 */}
        <RowLayout textSide="left" className="mt-16 sm:mt-20">
          <RowText
            index="03"
            title="Book or hand off with context"
            body="Support booking automatically or pass the conversation to staff with the full history when human attention is needed."
          />
          <HandoffVisual />
        </RowLayout>
      </div>
    </section>
  );
}

/* ---------------- Layout primitives ---------------- */

function RowLayout({
  children,
  className = "",
}: {
  children: React.ReactNode;
  textSide?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={`grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16 ${className}`}
    >
      {children}
    </div>
  );
}

function RowText({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="text-[28px] font-normal leading-none text-[#A8896A]"
          style={{ fontFamily: "var(--font-serif-display)" }}
        >
          {index}
        </span>
        <span className="h-px w-10 bg-[#A8896A]/40" />
      </div>
      <h3 className="mt-4 max-w-xs text-[1.65rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#0D0D0D] sm:text-[2rem]">
        {title}
      </h3>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#4a4a4a]">
        {body}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="mt-16 flex items-center gap-3 sm:mt-20">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0D0D0D]/12 to-transparent" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#A8896A]/50" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0D0D0D]/12 to-transparent" />
    </div>
  );
}

/* ---------------- Visuals ---------------- */

function CaptureVisual() {
  return (
    <div className="flex w-full flex-col items-stretch gap-3 lg:flex-row">
      {/* Source rail */}
      <div className="flex flex-row gap-3 lg:flex-col">
        <SourceCard icon={<Globe className="h-5 w-5" />} label="Instagram DM" />
        <SourceCard
          icon={<MessageCircle className="h-5 w-5 text-[#25D366]" />}
          label="WhatsApp"
        />
        <SourceCard
          icon={<Phone className="h-5 w-5 text-[#E50914]" />}
          label="Phone call"
        />
      </div>

      {/* Message card */}
      <Panel className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#0D0D0D]">
            New inquiry
          </span>
          <span className="text-[11px] text-[#888]">Just now</span>
        </div>
        <p className="mt-3 text-[14px] font-semibold text-[#0D0D0D]">
          Maria G.
        </p>
        <p className="text-[12px] text-[#666]">+1 (305) 555-0123</p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#333]">
          Hi, I&apos;m interested in a balayage appointment. Do you have
          availability this week?
        </p>
        <span className="mt-4 inline-block rounded-md bg-[#0D0D0D]/[0.04] px-2 py-1 text-[11px] text-[#666]">
          Source: Instagram DM
        </span>
      </Panel>

      {/* Arrow + N */}
      <div className="flex flex-row items-center justify-center gap-2 px-1 lg:flex-col lg:gap-0">
        <span className="hidden lg:block">
          <ArrowDots />
        </span>
        <div className="my-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FF3344] to-[#E50914] text-[14px] font-bold text-white shadow-[0_8px_22px_rgba(229,9,20,0.4)]">
          N
        </div>
        <span className="hidden lg:block">
          <ArrowDots />
        </span>
      </div>

      {/* Nexi reply */}
      <Panel className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0D0D0D]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#E50914] text-[9px] font-bold text-white">
              N
            </span>
            NEXI
          </span>
          <span className="text-[11px] text-[#888]">Just now</span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-[#333]">
          Hi Maria! <span aria-hidden>👋</span> Thanks for reaching out to Bloom
          Salon. I can help you book a balayage appointment and check
          availability with our stylists.
        </p>
      </Panel>
    </div>
  );
}

function RouteVisual() {
  return (
    <Panel className="p-5 sm:p-6">
      <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
        {/* Left column */}
        <div className="space-y-3">
          <Label>Client intent</Label>
          <Card>
            <IconChip>
              <Target className="h-4 w-4 text-[#E50914]" />
            </IconChip>
            <div>
              <p className="text-[13px] font-semibold text-[#0D0D0D]">
                Color consultation
              </p>
              <p className="text-[11px] text-[#888]">High intent</p>
            </div>
          </Card>

          <Label>Best match</Label>
          <Card>
            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#FF6A75] to-[#E50914] text-[12px] font-semibold text-white">
              SM
            </span>
            <div>
              <p className="text-[13px] font-semibold text-[#0D0D0D]">
                Sofía Méndez
              </p>
              <p className="text-[11px] text-[#666]">Senior Stylist</p>
              <p className="text-[11px] text-[#888]">10+ years experience</p>
            </div>
          </Card>

          <Label>Location</Label>
          <Card>
            <IconChip>
              <MapPin className="h-4 w-4 text-[#E50914]" />
            </IconChip>
            <div>
              <p className="text-[13px] font-semibold text-[#0D0D0D]">
                Downtown Salon
              </p>
              <p className="text-[11px] text-[#888]">Downtown · 2.1 miles</p>
            </div>
          </Card>
        </div>

        {/* Connector */}
        <div className="hidden items-center sm:flex">
          <span className="block h-px w-12 border-t border-dashed border-[#0D0D0D]/20" />
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <Label>Recommended next step</Label>
          <Card>
            <IconChip>
              <Calendar className="h-4 w-4 text-[#E50914]" />
            </IconChip>
            <div>
              <p className="text-[13px] font-semibold text-[#0D0D0D]">
                Saturday, May 17
              </p>
              <p className="text-[11px] text-[#666]">10:00 AM</p>
              <p className="text-[11px] text-[#888]">Color consultation</p>
            </div>
          </Card>
          <ul className="space-y-2 pl-1 pt-1 text-[13px] text-[#333]">
            <Bullet>Hair condition assessment</Bullet>
            <Bullet>Tone matching</Bullet>
            <Bullet>Maintenance options</Bullet>
            <Bullet>Service pricing</Bullet>
          </ul>
          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-[#E50914] py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(229,9,20,0.35)] transition hover:brightness-110"
          >
            Confirm this appointment
          </button>
        </div>
      </div>
    </Panel>
  );
}

function HandoffVisual() {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-4 sm:grid-cols-[1fr_auto_1fr]">
      {/* Booked card */}
      <Panel className="p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
              Appointment booked
            </p>
            <p className="text-[12px] text-[#666]">Confirmed with Sofía M.</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2.5 text-[12.5px] text-[#333]">
          <RowItem icon={<Calendar className="h-3.5 w-3.5" />}>
            Sat, May 17 — 10:00 AM
          </RowItem>
          <RowItem icon={<User className="h-3.5 w-3.5" />}>
            Sofía Méndez
          </RowItem>
          <RowItem icon={<MapPin className="h-3.5 w-3.5" />}>
            Downtown Salon
          </RowItem>
          <RowItem icon={<Tag className="h-3.5 w-3.5" />}>
            Color consultation
          </RowItem>
          <RowItem icon={<Languages className="h-3.5 w-3.5" />}>
            English
          </RowItem>
        </ul>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
          <Check className="h-3 w-3" strokeWidth={3} />
          Confirmation sent to client
        </div>
      </Panel>

      {/* OR badge */}
      <div className="flex items-center justify-center sm:h-full sm:pt-12">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#0D0D0D]/15 bg-white text-[11px] font-semibold text-[#666] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          OR
        </span>
      </div>

      {/* Escalated card */}
      <Panel className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#E50914]">
          Escalated to front desk
        </p>
        <div className="mt-3 flex items-start gap-2 rounded-md bg-[#0D0D0D]/[0.03] p-2.5">
          <IconChip small>
            <User className="h-3.5 w-3.5 text-[#E50914]" />
          </IconChip>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#888]">
              Reason for handoff
            </p>
            <p className="text-[12.5px] font-medium text-[#0D0D0D]">
              Pricing question
            </p>
          </div>
        </div>
        <ul className="mt-3 space-y-2 rounded-md bg-[#0D0D0D]/[0.03] p-2.5 text-[12.5px] text-[#333]">
          <RowItem icon={<User className="h-3.5 w-3.5" />}>Maria G.</RowItem>
          <RowItem icon={<MapPin className="h-3.5 w-3.5" />}>
            Downtown Salon
          </RowItem>
          <RowItem icon={<Tag className="h-3.5 w-3.5" />}>
            Wants pricing for color + balayage package.
          </RowItem>
        </ul>
        <button
          type="button"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#0D0D0D]/10 bg-white py-2.5 text-[13px] font-semibold text-[#0D0D0D] transition hover:bg-[#0D0D0D]/[0.03]"
        >
          <Bell className="h-3.5 w-3.5" />
          Notify front desk
        </button>
      </Panel>
    </div>
  );
}

/* ---------------- Atoms ---------------- */

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[#0D0D0D]/10 bg-white shadow-[0_2px_0_rgba(0,0,0,0.02),0_18px_40px_-20px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

function SourceCard({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="relative flex w-[88px] flex-1 flex-col items-center justify-center rounded-xl border border-[#0D0D0D]/10 bg-white px-3 py-4 shadow-[0_8px_22px_-14px_rgba(0,0,0,0.25)]">
      <span className="absolute right-2 top-2 inline-block h-1.5 w-1.5 rounded-full bg-[#E50914]" />
      <div className="text-[#0D0D0D]/70">{icon}</div>
      <p className="mt-2 text-center text-[11px] font-medium text-[#333]">
        {label}
      </p>
    </div>
  );
}

function ArrowDots() {
  return (
    <div className="flex flex-col items-center gap-1 py-1 text-[#E50914]/55">
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888]">
      {children}
    </p>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#0D0D0D]/10 bg-white px-3 py-2.5">
      {children}
    </div>
  );
}

function IconChip({
  children,
  small,
}: {
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-flex flex-none items-center justify-center rounded-full bg-[#E50914]/10 ${
        small ? "h-7 w-7" : "h-9 w-9"
      }`}
    >
      {children}
    </span>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Check
        className="mt-0.5 h-3.5 w-3.5 flex-none text-[#E50914]"
        strokeWidth={3}
      />
      <span>{children}</span>
    </li>
  );
}

function RowItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2">
      <span className="text-[#888]">{icon}</span>
      <span>{children}</span>
    </li>
  );
}
