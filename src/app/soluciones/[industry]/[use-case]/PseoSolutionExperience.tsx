"use client";

import { motion, type Variants } from "framer-motion";
import {
  BrainCircuit,
  CalendarCheck2,
  CheckCheck,
  MapPinned,
  MessageCircleMore,
  PhoneMissed,
  PlugZap,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type ChatMessage = {
  role: "Cliente" | "Nexi";
  text: string;
};

type PseoSolutionExperienceProps = {
  industryName: string;
  useCaseName: string;
  heroTitle: string;
  heroSubtitle: string;
  chatMessages: ChatMessage[];
  benefits: string[];
  demoCtaUrl: string;
  whatsappCtaUrl: string;
  localTrustSignals: readonly string[];
};

type HowItWorksStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    title: "Conectamos Nexi a tu WhatsApp",
    description:
      "Integramos tu número, catálogo y horarios para que cada chat entre directo al flujo correcto.",
    icon: PlugZap,
  },
  {
    title: "Entrenamos al agente con tus reglas",
    description:
      "Definimos respuestas y rutas de escalamiento para que Nexi responda como tu mejor recepcionista.",
    icon: BrainCircuit,
  },
  {
    title: "Reservas confirmadas de forma automática",
    description:
      "Nexi agenda, confirma y registra cada lead para convertir conversaciones en ingresos reales.",
    icon: CalendarCheck2,
  },
];

const FILM_GRAIN_TEXTURE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";

const sectionReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true, amount: 0.24 },
};

const stepContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const stepItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export function PseoSolutionExperience({
  industryName,
  useCaseName,
  heroTitle,
  heroSubtitle,
  chatMessages,
  benefits,
  demoCtaUrl,
  whatsappCtaUrl,
  localTrustSignals,
}: PseoSolutionExperienceProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("${FILM_GRAIN_TEXTURE}")`,
          backgroundSize: "160px 160px",
        }}
      />

      <main className="relative z-10 overflow-hidden bg-slate-950 pb-36 text-white md:pb-0">
        <section className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,30,45,0.72),rgba(15,23,42,0.96)_42%,#020617_74%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.24),rgba(2,6,23,0.9)_72%)]"
          />

          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            transition={sectionReveal.transition}
            viewport={sectionReveal.viewport}
            className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-28 md:pb-24 md:pt-36"
          >
            <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200/85">
                  Neuro-driven WhatsApp Automation
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
                    Book Demo
                  </a>
                  <a
                    href={whatsappCtaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-[#25D366]/55 bg-[#25D366]/15 px-5 py-3 text-sm font-semibold text-[#C6FFD9] transition hover:scale-[1.02] hover:border-[#25D366]/75 hover:bg-[#25D366]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
                  >
                    WhatsApp Instantáneo
                  </a>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-100">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/80" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  Nexi is Online
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

              <ThreeDCard
                industryName={industryName}
                useCaseName={useCaseName}
                chatMessages={chatMessages}
                benefit={benefits[0] ?? "Más reservas confirmadas cada semana"}
              />
            </div>
          </motion.div>
        </section>

        <section className="bg-[#030712] py-20">
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            transition={sectionReveal.transition}
            viewport={sectionReveal.viewport}
            className="mx-auto max-w-6xl px-4"
          >
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-300">
                Cognitive Ease Grid
              </p>
              <h2
                className="mt-3 text-3xl font-[800] tracking-tight text-white md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Entiende el cambio en 3 segundos
              </h2>
            </div>
            <BentoGrid industryName={industryName} />
          </motion.div>
        </section>

        <section className="bg-[#070A10] py-24">
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            transition={sectionReveal.transition}
            viewport={sectionReveal.viewport}
            className="mx-auto max-w-6xl px-4"
          >
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-200/85">
                Motion-driven onboarding
              </p>
              <h2
                className="mt-3 text-3xl font-[800] tracking-tight text-white md:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Cómo funciona en tu negocio
              </h2>
            </div>

            <motion.div
              variants={stepContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.28 }}
              className="grid gap-4 md:grid-cols-3"
            >
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={stepItemVariants}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-300/45 hover:shadow-[0_24px_55px_rgba(139,30,45,0.22)]"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-slate-900/80 text-red-200">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Paso {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/75">{step.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section className="bg-slate-100 py-16 text-slate-900">
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            transition={sectionReveal.transition}
            viewport={sectionReveal.viewport}
            className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8B1E2D]/75">
                Thumb-zone ready
              </p>
              <h2
                className="mt-2 text-3xl font-[800] tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Activa Nexi para {industryName} y convierte más chats en reservas
              </h2>
              <p className="mt-3 text-sm text-slate-600 md:text-base">
                Tu equipo atiende mejor, tus clientes esperan menos y tu agenda se
                llena con menos fricción.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={demoCtaUrl}
                className="inline-flex items-center rounded-full bg-[#8B1E2D] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#761927]"
              >
                Book Demo
              </a>
              <a
                href={whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold text-[#118A41] transition hover:scale-[1.02] hover:bg-[#25D366]/18"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <MobileStickyCta demoCtaUrl={demoCtaUrl} whatsappCtaUrl={whatsappCtaUrl} />
    </>
  );
}

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

function ThreeDCard({
  industryName,
  useCaseName,
  chatMessages,
  benefit,
}: {
  industryName: string;
  useCaseName: string;
  chatMessages: ChatMessage[];
  benefit: string;
}) {
  return (
    <div className="[perspective:1000px]">
      <motion.div
        whileHover={{ y: -6, rotateX: 4, rotateY: -7 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-red-500/20 backdrop-blur-xl [transform-style:preserve-3d] md:[transform:rotateX(6deg)_rotateY(-12deg)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.2),transparent_30%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-[2rem] border border-white/10"
        />

        <div className="relative rounded-2xl border border-white/15 bg-[#0B141A]/92 p-4">
          <div className="mb-4 rounded-xl border border-white/10 bg-[#202C33] px-3 py-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/20 text-[#93f9b5]">
                <MessageCircleMore className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-none text-white">Nexi (IA)</p>
                <p className="mt-1 text-[11px] text-[#7CFC9B]">Online</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#48545B] bg-[#E5DDD5] p-3 text-black">
            <p className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#5f5f5f]">
              <Sparkles className="h-3.5 w-3.5 text-[#8B1E2D]" />
              <span className="text-[#2a2a2a]">
                Nexi en {industryName}: {useCaseName}
              </span>
            </p>

            <div className="space-y-3">
              {chatMessages.map((message, index) => {
                const isAgent = message.role === "Nexi";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[92%] px-3 py-2 text-sm leading-relaxed shadow-[0_1px_0_rgba(0,0,0,0.15)] ${isAgent ? "rounded-2xl rounded-tr-none bg-[#dcf8c6] pb-5 text-black" : "rounded-2xl rounded-tl-none bg-white text-black"}`}
                    >
                      <p>{message.text}</p>
                      {isAgent ? (
                        <CheckCheck className="absolute bottom-1.5 right-2 h-3.5 w-3.5 text-sky-500" />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/55">
                Respuesta
              </p>
              <p className="mt-1 text-sm font-semibold text-white">&lt; 30 segundos</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/55">
                Resultado esperado
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{benefit}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BentoGrid({ industryName }: { industryName: string }) {
  const recentSignups = [
    { name: "Andrea", tone: "from-rose-400 to-orange-300" },
    { name: "Marco", tone: "from-sky-400 to-cyan-300" },
    { name: "Lucia", tone: "from-emerald-400 to-lime-300" },
  ] as const;

  return (
    <div className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3">
      <motion.article
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.6)] transition-all hover:border-red-300/60 hover:shadow-[0_22px_55px_rgba(139,30,45,0.35)] md:col-span-2 md:row-span-2"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(139,30,45,0.25),transparent_40%)]"
        />
        <p className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-red-200">
          <PhoneMissed className="h-4 w-4" />
          The Nightmare
        </p>
        <h3 className="relative mt-3 text-2xl font-semibold text-white">
          Llamadas perdidas acumulándose
        </h3>

        <div className="relative mt-5 space-y-2">
          {[
            "Llamada perdida · Cliente VIP",
            "Nuevo mensaje sin responder · 11 min",
            "Reserva cancelada por demora",
            "Oportunidad perdida en WhatsApp",
          ].map((alert, index) => (
            <div
              key={alert}
              style={{ marginLeft: `${index * 10}px` }}
              className="rounded-xl border border-red-500/25 bg-red-950/45 px-4 py-3 text-sm text-red-100"
            >
              {alert}
            </div>
          ))}
        </div>
      </motion.article>

      <motion.article
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="group rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.6)] transition-all hover:border-emerald-300/65 hover:shadow-[0_22px_55px_rgba(16,185,129,0.25)]"
      >
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
          <TrendingUp className="h-4 w-4" />
          The Solution
        </p>

        <div className="mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-100/80">
            Revenue this week
          </p>
          <p className="mt-1 text-4xl font-semibold text-emerald-100">+$2,400</p>
          <svg
            viewBox="0 0 200 70"
            className="mt-4 h-16 w-full"
            role="img"
            aria-label="Tendencia de crecimiento"
          >
            <polyline
              points="6,58 44,46 78,50 112,34 144,26 194,10"
              fill="none"
              stroke="rgb(52 211 153)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="194" cy="10" r="4" fill="rgb(167 243 208)" />
          </svg>
          <p className="mt-2 text-sm text-emerald-100/80">+38% vs semana anterior</p>
        </div>
      </motion.article>

      <motion.article
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="group rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.6)] transition-all hover:border-red-300/60 hover:shadow-[0_22px_55px_rgba(248,113,113,0.25)]"
      >
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">
          <MapPinned className="h-4 w-4" />
          The Trust
        </p>
        <h3 className="mt-3 text-xl font-semibold text-white">Active in your area</h3>

        <div className="relative mt-4 aspect-[4/3] rounded-2xl border border-white/10 bg-[#020617]">
          <svg
            viewBox="0 0 280 220"
            className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-slate-700"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M130 16l26 22 22 6 18 30 4 36-12 26 2 30-24 24-8 18-22-2-22-18-18 2-10-16-24-14-8-34 16-30-6-24 16-26 24-10 14-20z"
            />
          </svg>

          {[
            { top: "25%", left: "58%", label: "Quito" },
            { top: "56%", left: "42%", label: "Guayaquil" },
            { top: "70%", left: "52%", label: "Cuenca" },
          ].map((dot) => (
            <div
              key={dot.label}
              className="absolute"
              style={{ top: dot.top, left: dot.left }}
            >
              <span className="absolute -left-3 -top-3 h-6 w-6 animate-ping rounded-full bg-red-400/35" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-red-300 shadow-[0_0_14px_rgba(248,113,113,0.9)]" />
              <p className="mt-1 text-[10px] font-medium text-slate-300">{dot.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-300">
            Recent Signups
          </p>
          <div className="mt-2 flex items-center">
            <div className="flex">
              {recentSignups.map((signup, index) => (
                <div
                  key={signup.name}
                  className={`-ml-2 first:ml-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-900 bg-gradient-to-br ${signup.tone} text-[11px] font-semibold text-slate-900`}
                  style={{ zIndex: recentSignups.length - index }}
                >
                  {signup.name.slice(0, 1)}
                </div>
              ))}
            </div>
            <p className="ml-3 text-xs text-slate-300">
              Used by 12+ businesses in {industryName}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function MobileStickyCta({
  demoCtaUrl,
  whatsappCtaUrl,
}: {
  demoCtaUrl: string;
  whatsappCtaUrl: string;
}) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <div className="rounded-2xl border border-white/10 bg-black/80 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2 px-2 text-xs font-medium text-emerald-200">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
          Nexi is Online
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsappCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-3 py-3 text-sm font-semibold text-[#05210F]"
          >
            WhatsApp
          </a>
          <a
            href={demoCtaUrl}
            className="inline-flex items-center justify-center rounded-xl bg-[#8B1E2D] px-3 py-3 text-sm font-semibold text-white"
          >
            Book Demo
          </a>
        </div>
      </div>
    </div>
  );
}
