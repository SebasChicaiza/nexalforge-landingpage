import Reveal from "@/components/Reveal";
import PseoWhatsAppCard from "./PseoWhatsAppCard";

type ChatMessage = {
  role: "Cliente" | "Nexi";
  text: string;
};

type Props = {
  industryName: string;
  useCaseName: string;
  heroTitle: string;
  heroSubtitle: string;
  chatMessages: ChatMessage[];
  benefit: string;
  demoCtaUrl: string;
  whatsappCtaUrl: string;
  ctaPrimaryText: string;
  ctaWhatsappText: string;
  localTrustSignals: readonly string[];
};

function renderHighlightedTitle(title: string, highlight: string) {
  const safeTitle = title.trim();
  const lowerTitle = safeTitle.toLowerCase();
  const lowerHighlight = highlight.toLowerCase();
  const start = lowerTitle.indexOf(lowerHighlight);

  if (start === -1) {
    return (
      <>
        {safeTitle}{" "}
        <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
          {highlight}
        </span>
      </>
    );
  }

  const end = start + highlight.length;

  return (
    <>
      {safeTitle.slice(0, start)}
      <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
        {safeTitle.slice(start, end)}
      </span>
      {safeTitle.slice(end)}
    </>
  );
}

export default function PseoHeroSection({
  industryName,
  useCaseName,
  heroTitle,
  heroSubtitle,
  chatMessages,
  benefit,
  demoCtaUrl,
  whatsappCtaUrl,
  ctaPrimaryText,
  ctaWhatsappText,
  localTrustSignals,
}: Props) {
  return (
    <section className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,30,45,0.72),rgba(15,23,42,0.96)_42%,#020617_74%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.24),rgba(2,6,23,0.9)_72%)]"
      />

      <Reveal className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 md:pb-24 md:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200/85">
              Agentic OS — Automatización por WhatsApp
            </p>
            <h1
              className="mt-4 text-5xl font-[800] leading-[0.98] tracking-tight md:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {renderHighlightedTitle(heroTitle, industryName)}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-200 md:text-xl">
              {heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={demoCtaUrl}
                className="inline-flex items-center rounded-full border border-red-300/40 bg-[#8B1E2D] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#761927] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200/70"
              >
                {ctaPrimaryText}
              </a>
              <a
                href={whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#25D366]/55 bg-[#25D366]/15 px-5 py-3 text-sm font-semibold text-[#C6FFD9] transition hover:scale-[1.02] hover:border-[#25D366]/75 hover:bg-[#25D366]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
              >
                {ctaWhatsappText}
              </a>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-100">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              Nexi está en línea
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {localTrustSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/95"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <PseoWhatsAppCard
            industryName={industryName}
            useCaseName={useCaseName}
            chatMessages={chatMessages}
            benefit={benefit}
          />
        </div>
      </Reveal>
    </section>
  );
}
