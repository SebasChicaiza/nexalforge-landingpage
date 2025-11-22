import { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  LineChart,
  BadgeDollarSign,
  Sparkles,
  Zap,
  Wrench,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import ServiciosSection from "@/components/ServiciosSection";
import NexiVideo from "@/components/NexiVideo";

import RoiSection from "@/components/RoiSection";
import ContactForm from "@/components/ContactForm";
import { HeroText } from "./HeroText";

export default function NexalForgeLandingWireframe() {
  return (
    <div className="min-h-screen w-full bg-white text-[#2A2A2A]">
      {/* HERO v2 – imagen lateral alineada al texto */}
      <section
        id="hero"
        className="relative isolate overflow-hidden bg-black min-h-[calc(100svh-var(--nf-header-h,0px))] flex items-center"
      >
        {/* Gradientes de profundidad y legibilidad */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-[#1a0c0d]" />

        {/* CONTENIDO */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
          {/* Grid responsive: columna única en mobile, dos en md+ */}
          <div className="grid items-center gap-8 md:gap-10 md:grid-cols-[minmax(0,560px)_minmax(0,520px)] lg:grid-cols-[minmax(0,680px)_minmax(0,520px)]">
            {/* Imagen primero en mobile; a la derecha en md+ */}
            <div className="order-first md:order-none">
              <div
                className="relative mx-auto w-full max-w-[520px] sm:max-w-[640px] lg:max-w-none lg:w-[660px]
                     aspect-[4/3] sm:aspect-[3/2] overflow-hidden rounded-2xl sm:rounded-3xl
                      bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]
                     md:mx-auto lg:mx-auto" 
              >
                <Image
                  src="/hero_nexal_cabeza.png"
                  alt="Soluciones de inteligencia artificial y automatización para empresas en Latinoamérica"
                  fill
                  priority
                  sizes="(min-width:1280px) 720px, (min-width:1024px) 640px, (min-width:640px) 85vw, 100vw"
                  className="object-cover md:object-contain md:object-center" 
                />
                {/* Máscara solo en md+ para evitar recorte raro en móviles */}
                <div className="pointer-events-none absolute inset-0 hidden md:block md:[mask-image:linear-gradient(to_left,black,transparent_65%)]" />
              </div>
            </div>

            {/* Columna de texto */}
            <div className="text-white max-w-[58ch] text-center md:text-left">
              <HeroText />
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="#contacto"
                  className="rounded-full bg-[#8B1E2D] px-5 py-3 text-white hover:bg-[#B84550]"
                >
                  Diagnóstico gratis
                </a>
                <a
                  href="#casos"
                  className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white hover:bg-white/20"
                >
                  Ver caso en 60s
                </a>
                <Link
                  href="/asistente-virtual-nexi"
                  className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white hover:bg-white/20"
                >
                  Conoce al asistente Nexi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">
                ¿Qué hace Nexal Forge por tu empresa?
              </h2>
              <p className="text-neutral-700">
                Ayudamos a empresas de Latinoamérica a
                implementar soluciones de inteligencia artificial prácticas (somos un equipo con base en Ecuador):
                agentes de IA para ventas y soporte, automatización operativa
                con n8n/Make, modelos de predicción y forecasting, capa de datos
                unificada y sprints de implementación listos para producción.
              </p>
              <ul className="grid gap-2 text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#8B1E2D]" />
                  <div>
                    <strong>Agente IA para Ventas:</strong> automatiza
                    prospección, seguimiento y lead scoring con inteligencia
                    artificial.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#8B1E2D]" />
                  <div>
                    <strong>Agente IA para Soporte (Nexi):</strong> asistente
                    virtual de IA en WhatsApp, Instagram y Messenger con handoff
                    humano.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#8B1E2D]" />
                  <div>
                    <strong>Automatización Operativa:</strong> flujos con IA que
                    conectan CRM, ERP y facturación para eliminar tareas
                    repetitivas.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#8B1E2D]" />
                  <div>
                    <strong>Predicción & Forecasting:</strong> modelos de
                    demanda, ventas y churn para decisiones de inventario y
                    crecimiento.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#8B1E2D]" />
                  <div>
                    <strong>Capa de Datos y Dashboards:</strong> métricas
                    gobernadas y tableros ejecutivos en tiempo real.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#8B1E2D]" />
                  <div>
                    <strong>Sprint de Implementación de IA:</strong> MVP de IA
                    en dos semanas con capacitación incluida.
                  </div>
                </li>
              </ul>
            </div>
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#8B1E2D]">
                Soluciones de IA en español y multilenguaje
              </div>
              <h3 className="mt-3 text-xl font-semibold text-[#2A2A2A]">
                Trabajamos con empresas de toda Latam
              </h3>
              <p className="mt-2 text-neutral-700">
                Servicio con foco en español y opción multilenguaje, implementación remota o híbrida, enfoque en KPIs de negocio. Conecta con nuestros agentes de IA o dirígete a Nexi, el asistente virtual para WhatsApp e Instagram.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/asistente-virtual-nexi"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8B1E2D] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B84550]"
                >
                  Ver el asistente virtual Nexi
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-[#2A2A2A] transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
                >
                  Hablar con un especialista
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios"></section>
      <ServiciosSection />

      <NexiVideo
        id="casos"
        srcMp4="/nexi.mp4"
        poster="/Nexi.png"
        eyebrow="NexalForge"
        title="Resultados Orgánicos Impulsados por IA"
        description="La IA permite que tu empresa trabaje sin descanso, aprenda de cada interacción y se adapte automáticamente para mejorar resultados con mínima intervención manual."
        ctaHref="#servicios"
        ctaLabel="Nuestros servicios"
      />

      <section className="bg-[#0B0B0B] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">
            ¿Por qué trabajar con Nexal Forge para tus proyectos de IA?
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Enfoque en KPIs",
                desc: "Diseñamos proyectos de IA para mover ingresos, reducir tiempos y costos medibles.",
              },
              {
                title: "Experiencia en agentes de IA",
                desc: "Implementamos asistentes virtuales, automatización operativa y analítica avanzada.",
              },
              {
                title: "Acompañamiento Latam",
                desc: "Soporte para empresas de toda Latinoamérica, con base en Ecuador y foco en español.",
              },
              {
                title: "Sprints rápidos",
                desc: "MVP de IA en semanas; iteramos con datos reales y feedback de tu equipo.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link
              href="/asistente-virtual-nexi"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/15"
            >
              Conocer el asistente virtual Nexi
            </Link>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white hover:bg-white/10"
            >
              Agenda una llamada
            </a>
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section id="resultados" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">
            Resultados que entregamos
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Pequeñas palancas, grandes efectos. Algunos rangos típicos medidos
            en los últimos sprints.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card
              icon={<LineChart className="h-6 w-6" />}
              title="Mejorar ventas"
              kpi="+8–18% tasa de cierre"
            >
              Personalización, lead scoring y recomendaciones next-best-action a
              lo largo del embudo.
            </Card>
            <Card
              icon={<Clock className="h-6 w-6" />}
              title="Reducir tiempos"
              kpi="–45% tiempo de respuesta"
            >
              Orquestamos tareas repetitivas y agentes de IA para acortar
              ciclos.
            </Card>
            <Card
              icon={<BadgeDollarSign className="h-6 w-6" />}
              title="Reducir costos"
              kpi="–12–28% gasto en herramientas"
            >
              Consolidación de stack, automatización de data y alertas
              operativas.
            </Card>
          </div>
        </div>
      </section>

      {/* PROCESO – timeline 1–2–3 */}
      <section
        id="proceso"
        className="relative isolate overflow-hidden bg-[#0B0B0B] py-20 text-white"
      >
        {/* blobs decorativos */}
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#8B1E2D]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#8B1E2D]/15 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                Proceso 1–2–3
              </span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Cómo trabajamos
              </h2>
              <p className="mt-2 max-w-2xl text-white/70">
                De diagnóstico a <b>KPI medible</b> en <b>2 semanas</b>. Sin
                proyectos infinitos.
              </p>
            </div>
            <a
              href="#contacto"
              className="rounded-full bg-[#8B1E2D] px-4 py-2 text-sm text-white hover:bg-[#B84550]"
            >
              Agendar diagnóstico
            </a>
          </div>

          {/* timeline */}
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {/* STEP 01 */}
            <li className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
              {/* conector a la derecha (solo desktop) */}
              <div className="absolute right-[-12px] top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-gradient-to-r from-[#8B1E2D] to-transparent md:block" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B1E2D] text-sm font-semibold text-white">
                  01
                </div>
                <div className="text-xs uppercase tracking-wide text-white/60">
                  Día 0–2
                </div>
              </div>
              <h3 className="mt-3 flex items-center gap-2 text-xl font-semibold">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8B1E2D]/15 text-[#8B1E2D]">
                  <Zap className="h-4 w-4" />
                </span>
                Mapa de Automatización
              </h3>
              <p className="mt-2 text-white/70">
                Discovery, entendimiento de datos y priorización de los{" "}
                <b>3 flujos</b> de mayor impacto.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                <Tag>Workshop 60’</Tag>
                <Tag>Backlog priorizado</Tag>
                <Tag>Definición de KPIs</Tag>
              </ul>
            </li>

            {/* STEP 02 */}
            <li className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <div className="absolute right-[-12px] top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-gradient-to-r from-[#8B1E2D] to-transparent md:block" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B1E2D] text-sm font-semibold text-white">
                  02
                </div>
                <div className="text-xs uppercase tracking-wide text-white/60">
                  Día 3–10
                </div>
              </div>
              <h3 className="mt-3 flex items-center gap-2 text-xl font-semibold">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8B1E2D]/15 text-[#8B1E2D]">
                  <Wrench className="h-4 w-4" />
                </span>
                Sprint de Implementación
              </h3>
              <p className="mt-2 text-white/70">
                <b>MVP funcional</b> de 3 flujos + orquestación
                (n8n/Make/Zapier) y tableros básicos.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                <Tag>Agentes/automatismos</Tag>
                <Tag>Integración CRM/Apps</Tag>
                <Tag>QA y logs</Tag>
              </ul>
            </li>

            {/* STEP 03 */}
            <li className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B1E2D] text-sm font-semibold text-white">
                  03
                </div>
                <div className="text-xs uppercase tracking-wide text-white/60">
                  Día 11–14
                </div>
              </div>
              <h3 className="mt-3 flex items-center gap-2 text-xl font-semibold">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8B1E2D]/15 text-[#8B1E2D]">
                  <BarChart3 className="h-4 w-4" />
                </span>
                Métricas & Handover
              </h3>
              <p className="mt-2 text-white/70">
                Seguimiento de KPIs, <b>ajustes finos</b>, capacitación y plan
                de escalado.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                <Tag>Reporte de impacto</Tag>
                <Tag>Playbooks</Tag>
                <Tag>Roadmap 30–60–90</Tag>
              </ul>
            </li>
          </ol>

          {/* nota + CTA secundaria */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-white/70">
            <span>
              Entrega de MVP en <b>10 días hábiles</b> · Primer KPI medible en{" "}
              <b>2–3 semanas</b>.
            </span>
            <a
              href="#casos"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
            >
              Ver cronograma ejemplo
            </a>
          </div>
        </div>
      </section>

      {/* CASOS 
      <section id="casos" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold md:text-4xl">Casos de éxito</h2>
            <a href="#" className="text-sm text-[#8B1E2D] hover:underline">
              Ver todos
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <CaseCard
              title="Retail B2C"
              before="Tickets sin seguimiento"
              after="+22% conversión a venta"
            />
            <CaseCard
              title="SaaS"
              before="Onboarding manual"
              after="–60% tiempo de activación"
            />
            <CaseCard
              title="Logística"
              before="Rutas ineficientes"
              after="–15% costo por envío"
            />
          </div>
        </div>
      </section>
      */}

      {/* OFERTA / PRECIOS *
      <section id="precios" className="bg-[#FFFFFF] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">Oferta de arranque</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <PlanCard
              highlighted
              title="Sprint de Automatización"
              price="desde $1,9k"
              features={[
                "Diseño del mapa",
                "Implementación de 3 flujos",
                "Dashboards básicos",
                "Capacitación 1h",
              ]}
            />
            <PlanCard
              title="Agente IA Soporte/Ventas"
              price="desde $1,2k"
              features={[
                "Entrenamiento base",
                "Integración CRM",
                "Guías de tono",
                "KPIs de atención",
              ]}
            />
            <PlanCard
              title="Data & Consolidación"
              price="a medida"
              features={[
                "ETL no-code",
                "Unificación de herramientas",
                "Alertas operativas",
                "Governance",
              ]}
            />
          </div>
        </div>
      </section>
      /}

      {/* ROI CALCULATOR (placeholder visual) */}
      <section id="roi"></section>
      <RoiSection />

      {/* STACK & SEGURIDAD }
      <section className="bg-[#111] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Stack & Seguridad
              </h2>
              <ul className="mt-4 space-y-2 text-neutral-300">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#B84550]" /> Accesos
                  mínimos y controlados
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#B84550]" /> NDA y
                  manejo de datos
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#B84550]" /> Logs y
                  auditoría de acciones
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm text-white/70"
                >
                  Logo
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS *
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">Testimonios</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 p-6 shadow-sm"
              >
                <p className="text-neutral-700">
                  “Coloca aquí una cita corta con el resultado principal y la
                  experiencia de trabajo.”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-neutral-200" />
                  <div>
                    <div className="font-medium">Nombre Apellido</div>
                    <div className="text-sm text-neutral-500">
                      Cargo · Empresa
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      /}
      

      {/* FAQ */}
      <section id="faq" className="bg-[#F5F5F5] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">
            Preguntas frecuentes sobre nuestras soluciones de IA
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <FAQ
              q="¿Qué tipo de proyectos de inteligencia artificial implementa Nexal Forge?"
              a="Implementamos agentes de IA para ventas y soporte, automatización operativa, modelos de predicción y dashboards ejecutivos para empresas en toda Latinoamérica (somos un equipo con base en Ecuador)."
            />
            <FAQ
              q="¿Puedo empezar solo con un agente de IA para ventas o soporte?"
              a="Sí. Puedes iniciar con un agente IA específico y luego escalar a automatización operativa, forecasting o capa de datos según tus necesidades."
            />
            <FAQ
              q="¿Trabajan solo en Ecuador o en toda la región?"
              a="Trabajamos con empresas de toda Latinoamérica. La implementación puede ser remota o híbrida, con foco en español y opción multilenguaje."
            />
            <FAQ
              q="¿Cuánto tiempo tarda un proyecto típico de automatización operativa?"
              a="Un MVP inicial puede estar listo en 2–4 semanas, dependiendo de la cantidad de procesos, integraciones y validaciones que debamos cubrir."
            />
            <FAQ
              q="¿Necesito un equipo técnico interno para implementar soluciones de IA?"
              a="No es obligatorio. Nos encargamos de la parte técnica; tu equipo define procesos, tono y contenidos. Entregamos capacitación básica y documentación."
            />
            <FAQ
              q="¿Dónde puedo ver más detalles del asistente virtual para WhatsApp?"
              a={
                <>
                  Visita la página de nuestro chatbot Nexi. Es un{" "}
                  <Link className="text-[#8B1E2D] underline" href="/asistente-virtual-nexi">
                    asistente virtual de IA para WhatsApp e Instagram
                  </Link>{" "}
                  con handoff humano y panel web.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL + FORM LIGERO */}
      <section id="contacto" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 rounded-3xl border border-neutral-200 p-8 shadow-sm md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                ¿Listos para automatizar lo repetitivo?
              </h2>
              <p className="mt-2 text-neutral-600">
                Agenda un diagnóstico de 15 minutos. Te respondemos en &lt;24h,
                sin compromiso, para empresas en toda Latinoamérica.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#8B1E2D]" /> Mapa de
                  automatización
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#8B1E2D]" /> Estimación de
                  ROI
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#8B1E2D]" /> Roadmap de 3
                  semanas
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ======= Subcomponentes tipados ======= */
type CardProps = {
  icon: ReactNode;
  title: string;
  kpi: string;
  children: ReactNode;
};
function Card({ icon, title, kpi, children }: CardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#F5F5F5] p-3 text-[#8B1E2D]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-1 text-sm text-[#8B1E2D]">{kpi}</div>
      <p className="mt-3 text-neutral-600">{children}</p>
      <a
        href="#contacto"
        className="mt-4 inline-flex items-center text-sm text-[#8B1E2D] hover:underline"
      >
        Ver cómo lo logramos <ArrowRight className="ml-1 h-4 w-4" />
      </a>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80">
      {children}
    </span>
  );
}

type FAQProps = { q: string; a: ReactNode };
function FAQ({ q, a }: FAQProps) {
  return (
    <details className="rounded-xl border border-neutral-200 bg-white p-4">
      <summary className="cursor-pointer select-none font-medium text-[#2A2A2A]">
        {q}
      </summary>
      <p className="mt-2 text-neutral-600">{a}</p>
    </details>
  );
}
