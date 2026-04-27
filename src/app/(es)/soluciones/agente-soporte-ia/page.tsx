// app/soluciones/agente-ia-whatsapp/page.tsx
"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Brain,
  Clock,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Wrench,
  BarChart3,
  Users,
  PhoneCall,
  CalendarCheck,
} from "lucide-react";
// Si ya tienes un formulario de contacto global, descomenta:
// import ContactForm from "@/components/ContactForm";

/**
 * Página: Agente IA para Soporte por WhatsApp
 * - Alterna secciones fondo negro/blanco.
 * - Botones con Nexal Red y foco accesible.
 * - Totalmente responsive (sm:/md:/lg:).
 * - Tipado estricto.
 */

export default function AgenteIAWhatsAppPage(): React.ReactElement {
  return (
    <main className="min-h-screen w-full bg-white text-[#2A2A2A]">
      {/* HERO — FONDO NEGRO */}
      <section
        id="hero"
        className="relative isolate overflow-hidden bg-nf-background text-black"
      >
        {/* Profundidad con gradientes sutiles */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/90 via-white/70 to-white/90" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/60 to-white/90" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-20 md:py-28">
          <div className="grid items-center gap-8 md:gap-12 md:grid-cols-[minmax(0,620px)_minmax(0,520px)]">
            {/* Texto */}
            <div className="max-w-[65ch]">
              <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">
                Agente IA para Soporte por WhatsApp
              </h1>
              <p className="mt-4 text-black/80 md:text-lg">
                Automatiza la atención al cliente en tiempo real con respuestas
                precisas basadas en el conocimiento de tu empresa—productos,
                políticas, procesos internos y FAQs—manteniendo una conversación
                natural y cercana.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <CTA href="#contacto">Diagnóstico gratis</CTA>
                <a
                  href="#que-hace"
                  className="rounded-full border border-black/25 bg-black/10 px-5 py-3 text-black transition-colors duration-200 hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-nf-primary-400/40"
                  aria-label="Ver qué hace el agente IA de soporte"
                >
                  Ver cómo funciona
                </a>
              </div>

              <ul className="mt-6 grid gap-3 text-sm text-black/75 md:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckIcon /> Responde en WhatsApp 24/7
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Entrenado con tu propio conocimiento
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Tono profesional adaptado a tu marca
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Escala y reduce costos operativos
                </li>
              </ul>
            </div>

            {/* Lateral visual — con imagen real */}
            <div className="order-first md:order-none">
              <div
                className="relative mx-auto aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl
 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              >
                <Image
                  src="/hero_soporte_wpp.png"
                  alt="Vista del Agente IA atendiendo clientes por WhatsApp"
                  fill
                  priority
                  sizes="(min-width:1280px) 720px, (min-width:1024px) 560px, (min-width:640px) 85vw, 100vw"
                  className="object-cover" // <-- AQUÍ ESTÁ EL CAMBIO
                />

                {/* Velo/gradiente sutil para legibilidad en fondos oscuros */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />

                {/* Máscara solo en md+ para evitar recorte raro en móviles */}
                <div className="pointer-events-none absolute inset-0 hidden md:block md:[mask-image:linear-gradient(to_left,black,transparent_65%)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO — FONDO BLANCO */}
      <section id="intro" className="bg-[#0B0B0B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 rounded-2xl p-8 shadow-sm">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg text-white">
              Nuestro Agente IA para Soporte por WhatsApp automatiza la atención
              al cliente de empresas medianas y grandes, respondiendo en tiempo
              real con información precisa basada en el conocimiento de tu
              empresa (productos, políticas, procesos internos, FAQs, etc.). A
              diferencia de un chatbot tradicional con respuestas rígidas, este
              agente de inteligencia artificial conversacional entiende el
              contexto, formula respuestas naturales y mantiene una conversación
              fluida y cercana con tus clientes.
            </p>
            <p className="mt-4 text-white">
              Ideal para una <b>agencia de viajes</b> que necesita resolver
              dudas sobre visas, paquetes turísticos, itinerarios y requisitos
              de viaje, o para una <b>pastelería</b> que quiere informar sobre
              productos en producción, sabores disponibles, tiempos de entrega y
              estados de pedido. El agente IA atiende consultas frecuentes,
              reduce la carga de tu equipo humano y mantiene a tus clientes
              siempre informados y actualizados sobre tu empresa.
            </p>
            <p className="mt-4 text-white">
              Con este agente IA para soporte por WhatsApp tu empresa{" "}
              <b>mejora la experiencia del cliente</b>, <b>reduce costos</b> y{" "}
              <b>escala la atención</b> sin perder calidad.
            </p>
          </div>
        </div>
      </section>

      {/* QUÉ HACE — FONDO NEGRO */}
      <section
        id="que-hace"
        className="relative isolate overflow-hidden bg-nf-background py-16 text-white md:py-20"
      >
        <GlowDots />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Header
            eyebrow="Capacidades"
            title="¿Qué hace nuestro Agente IA de Soporte?"
            subtitle="Diseñado para velocidad, precisión y una experiencia humana en todo momento."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Clock className="h-5 w-5" />}
              title="Responde en tiempo real 24/7"
              desc="Sin tiempos de espera: disponibilidad continua directamente en WhatsApp."
            />
            <Feature
              icon={<Brain className="h-5 w-5" />}
              title="Piensa con tu conocimiento"
              desc="Se alimenta de tu web, documentos y base de datos para respuestas coherentes con tu marca."
            />
            <Feature
              icon={<MessageCircle className="h-5 w-5" />}
              title="Conversación natural"
              desc="Mantiene un tono profesional adaptado a tu negocio y sostiene diálogos fluidos."
            />
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Información al día"
              desc="Productos, servicios, precios, estados de pedido y políticas expresados con claridad."
            />
            <Feature
              icon={<CalendarCheck className="h-5 w-5" />}
              title="Agenda y reservas"
              desc="Crea reuniones, consultas, pedidos o entregas directamente desde WhatsApp."
            />
            <Feature
              icon={<Users className="h-5 w-5" />}
              title="Escalamiento humano"
              desc="Deriva a tu equipo cuando el tema es complejo y transfiere el historial completo."
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-white/70">
            <span>
              Implementación en <b>2 semanas</b> · Primer KPI medible en{" "}
              <b>2–3 semanas</b>.
            </span>
            <a
              href="#proceso"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white transition-colors duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-nf-primary-400/40"
            >
              Ver proceso de trabajo
            </a>
          </div>
        </div>
      </section>

      {/* CASOS DE USO — FONDO BLANCO */}
      <section id="casos" className="bg-[#0B0B0B] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 ">
          <Header
            eyebrow="Casos de uso"
            title="Aplicado hoy a negocios reales"
            subtitle="Dos ejemplos típicos en clientes B2C."
            light={false}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <UseCaseCard
              icon={<PhoneCall className="h-5 w-5" />}
              title="Agencia de viajes"
              bullets={[
                "Visas, requisitos y documentación al día.",
                "Paquetes turísticos y comparativas rápidas.",
                "Itinerarios, cambios y políticas de cancelación.",
              ]}
            />
            <UseCaseCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="Pastelería y pedidos"
              bullets={[
                "Sabores disponibles y tiempos de producción.",
                "Estados de pedido y entregas.",
                "Precios, políticas y novedades en menú.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* PROCESO 1–2–3 — FONDO NEGRO */}
      <section
        id="proceso"
        className="relative isolate overflow-hidden bg-white py-20 text-black"
      >
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#8B1E2D]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#8B1E2D]/15 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs uppercase tracking-wide text-black/70">
                Adaptación a tu negocio
              </span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Cómo trabajamos
              </h2>
              <p className="mt-2 max-w-2xl text-black/70">
                De diagnóstico a <b>KPI medible</b> en <b>2 semanas</b>.
              </p>
            </div>
            <CTA href="#contacto" size="sm">
              Agendar diagnóstico
            </CTA>
          </div>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            <TimelineCard
              step="01"
              time="Día 0–2"
              icon={<Zap className="h-4 w-4" />}
              title="Mapa de Automatización"
              desc="Discovery, entendimiento de datos y priorización de los 3 flujos de mayor impacto."
              tags={[
                "Workshop 60’",
                "Backlog priorizado",
                "Definición de KPIs",
              ]}
            />
            <TimelineCard
              step="02"
              time="Día 3–10"
              icon={<Wrench className="h-4 w-4" />}
              title="Sprint de Implementación"
              desc="MVP funcional + orquestación (n8n/Make/Zapier) y tableros básicos."
              tags={[
                "Agentes/automatismos",
                "Integración CRM/Apps",
                "QA y logs",
              ]}
            />
            <TimelineCard
              step="03"
              time="Día 11–14"
              icon={<BarChart3 className="h-4 w-4" />}
              title="Métricas & Handover"
              desc="Seguimiento de KPIs, ajustes finos, capacitación y plan de escalado."
              tags={["Reporte de impacto", "Playbooks", "Roadmap 30–60–90"]}
            />
          </ol>
        </div>
      </section>
    </main>
  );
}

/* ================= Subcomponentes ================= */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
      {children}
    </span>
  );
}

function Header({
  eyebrow,
  title,
  subtitle,
  light = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className={light ? "" : "text-[#2A2A2A]"}>
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-wide ${
          light
            ? "border border-black/10 bg-black/5 text-black/60"
            : "border border-neutral-200 bg-neutral-100 text-neutral-600"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 text-3xl font-bold md:text-4xl ${
          light ? "text-black" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 max-w-2xl ${
            light ? "text-black/70" : "text-white/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(139,30,45,0.25)]">
      <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-[#8B1E2D]/15 p-3 text-[#8B1E2D]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="mt-2 text-black/70">{desc}</p>
    </div>
  );
}

function UseCaseCard({
  icon,
  title,
  bullets,
}: {
  icon: ReactNode;
  title: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-[#F5F5F5] p-3 text-[#8B1E2D]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-neutral-700">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#8B1E2D]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineCard({
  step,
  time,
  icon,
  title,
  desc,
  tags,
}: {
  step: string;
  time: string;
  icon: ReactNode;
  title: string;
  desc: string;
  tags: string[];
}) {
  return (
    <li className="group relative rounded-2xl border border-black/10 bg-black/5 p-6 shadow-sm">
      <div className="absolute right-[-12px] top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-gradient-to-r from-[#8B1E2D] to-transparent md:block" />
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B1E2D] text-sm font-semibold text-white">
          {step}
        </div>
        <div className="text-xs uppercase tracking-wide text-black/60">
          {time}
        </div>
      </div>
      <h3 className="mt-3 flex items-center gap-2 text-xl font-semibold text-black">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8B1E2D]/15 text-[#8B1E2D]">
          {icon}
        </span>
        {title}
      </h3>
      <p className="mt-2 text-black/70">{desc}</p>
      <ul className="mt-4 flex flex-wrap gap-2 text-xs">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </ul>
    </li>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-black/15 bg-black/5 px-3 py-1 text-black/80">
      {children}
    </span>
  );
}

function CTA({
  href,
  children,
  size = "md",
  ...rest
}: {
  href: string;
  children: ReactNode;
  size?: "sm" | "md";
} & React.ComponentProps<"a">) {
  const sizes = size === "sm" ? "px-4 py-2 text-sm" : "px-5 py-3 text-base";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-black/25 bg-black/10 text-black transition-colors duration-200 hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-nf-primary-400/40 ${sizes}`}
      {...rest}
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
}

function CheckIcon() {
  return <CheckCircle2 className="h-4 w-4 text-[#B84550]" aria-hidden="true" />;
}

function GlowDots() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#8B1E2D]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#8B1E2D]/15 blur-3xl" />
    </>
  );
}

function MiniForm(): ReactNode {
  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        // Aquí podrías disparar una server action / API route.
        alert("¡Gracias! Te contactaremos en menos de 24h.");
      }}
      aria-label="Formulario de contacto rápido"
    >
      <div>
        <label htmlFor="nombre" className="block text-sm text-neutral-700">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          required
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-nf-primary-400/40"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-neutral-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-nf-primary-400/40"
          placeholder="tucorreo@empresa.com"
        />
      </div>
      <div>
        <label htmlFor="whatsapp" className="block text-sm text-neutral-700">
          WhatsApp (opcional)
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-nf-primary-400/40"
          placeholder="+593 99 999 9999"
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="block text-sm text-neutral-700">
          ¿Qué te gustaría automatizar?
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-nf-primary-400/40"
          placeholder="Cuéntanos brevemente…"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-nf-primary-500 px-5 py-3 text-white transition-colors duration-200 hover:bg-nf-primary-600 focus:outline-none focus:ring-2 focus:ring-nf-primary-400/40"
      >
        Enviar
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </form>
  );
}
