import { CalendarCheck, HeartHandshake, MessageSquare, Sparkles } from "lucide-react";

const CARDS = [
  {
    icon: CalendarCheck,
    title: "A fuller schedule",
    body: "More high-intent inquiries move toward bookings instead of going cold.",
  },
  {
    icon: HeartHandshake,
    title: "A lighter front desk",
    body: "Your team spends less time chasing missed messages and more time helping the clients who need human attention.",
  },
  {
    icon: MessageSquare,
    title: "A smoother client experience",
    body: "Clients get faster responses, clearer next steps, and less friction from first contact to appointment.",
  },
];

export default function SpasSalonsOutcomes() {
  return (
    <section
      id="outcomes"
      className="relative overflow-hidden bg-[#FBF8F2] py-20 text-[#111111] sm:py-28"
    >
      {/* Warm gradient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(168,137,106,0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(229,9,20,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Intro — centered */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#A8896A]">
            What it feels like when Nexi is working
          </p>
          <h2 className="mt-5 text-[2rem] font-bold leading-[1.06] tracking-[-0.025em] text-[#0D0D0D] sm:text-5xl md:text-[3.5rem]">
            More booked appointments. Less front-desk overload.{" "}
            <span
              className="font-normal italic text-[#8B1E2D]"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              A smoother
            </span>{" "}
            path to the appointment.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#4a4a4a]">
            Nexi helps salons and spas keep high-intent clients moving — so
            your schedule fills, your team gets breathing room, and clients get
            a better experience from the first message.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-22px_rgba(139,30,45,0.18)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_28px_56px_-24px_rgba(139,30,45,0.28)]"
            >
              {/* Bronze top accent line */}
              <div
                aria-hidden
                className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#A8896A]/60 to-transparent"
              />
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFF1F0] to-[#F7E6DC] text-[#8B1E2D]"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(168,137,106,0.15), 0 4px 12px -6px rgba(139,30,45,0.20)",
                  }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[1.15rem] font-bold leading-[1.2] tracking-[-0.01em] text-[#0D0D0D]">
                    {title}
                  </h3>
                  <div className="mt-3 h-px w-10 bg-[#A8896A]/50" />
                  <p className="mt-3 text-[14px] leading-relaxed text-[#555555]">
                    {body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-14 flex flex-col items-center justify-center gap-2 text-center text-[15px] sm:flex-row sm:gap-3 sm:text-left">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#A8896A]/40 text-[#8B1E2D]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          <span className="text-[#4a4a4a]">
            The result is not more software.{" "}
            <span
              className="font-normal italic text-[#8B1E2D]"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              It&apos;s more momentum.
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
