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
      className="bg-[#F5F2EC] py-24 text-[#111111] sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Intro — centered */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[14px] font-semibold text-[#E50914]">
            What it feels like when Nexi is working
          </p>
          <h2 className="mt-5 text-[2.4rem] font-bold leading-[1.05] tracking-[-0.025em] text-[#0D0D0D] sm:text-5xl md:text-[3.5rem]">
            More booked appointments. Less front-desk overload. A smoother path
            to the appointment.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#4a4a4a]">
            Nexi helps salons and spas keep high-intent clients moving — so
            your schedule fills, your team gets breathing room, and clients get
            a better experience from the first message.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/60 p-7 shadow-[0_1px_0_rgba(0,0,0,0.03)] ring-1 ring-black/5"
            >
              <div className="flex items-start gap-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E50914]/8 text-[#E50914]"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(229,9,20,0.08)",
                  }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[1.15rem] font-bold leading-[1.2] tracking-[-0.01em] text-[#0D0D0D]">
                    {title}
                  </h3>
                  <div className="mt-3 h-[2px] w-8 rounded-full bg-[#E50914]" />
                  <p className="mt-3 text-[14px] leading-relaxed text-[#555555]">
                    {body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-14 flex items-center justify-center gap-3 text-[15px]">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E50914]/40 text-[#E50914]"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          <span className="text-[#4a4a4a]">
            The result is not more software.{" "}
            <span className="font-semibold text-[#E50914]">
              It&apos;s more momentum.
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
