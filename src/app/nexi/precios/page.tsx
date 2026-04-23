"use client";

import {
  Check,
  ArrowRight,
  Bot,
  Zap,
  Calendar,
  Users,
  Briefcase,
} from "lucide-react";
import BrandCtaLink from "@/components/buttons/BrandCtaLink";
import NexiFaqAccordion from "@/components/NexiFaqAccordion";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const FAQ_ITEMS = [
  {
    q: "¿El cobro es mensual?",
    a: "Sí. Los planes se cobran mensualmente.",
  },
  {
    q: "¿Existe un pago único?",
    a: "Sí. La implementación inicial se cobra por una sola vez, según el nivel de configuración requerido.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, el cliente puede cancelar antes de la siguiente renovación mensual.",
  },
  {
    q: "¿Qué pasa si supero el límite de conversaciones de mi plan?",
    a: "Podemos recomendarte un plan superior o una solución ajustada a tu operación.",
  },
  {
    q: "¿Nexi reemplaza totalmente a mi equipo?",
    a: "No. Nexi ayuda a automatizar una parte importante de la atención, pero puede escalar la conversación a una persona cuando es necesario.",
  },
  {
    q: "¿Nexal Forge ofrece un servicio humano gestionado continuo?",
    a: "No. El servicio principal es el acceso a Nexi como SaaS. Podemos incluir onboarding, setup y configuración inicial para implementar la plataforma.",
  },
  {
    q: "¿Funciona para cualquier negocio?",
    a: "Nexi está pensado para negocios que reciben volumen de consultas y quieren ordenar mejor su atención, seguimiento y agendamiento.",
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 pb-24 pt-32">
      {/* BACKGROUND GLOW */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 opacity-45 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,30,45,0.18) 0%, rgba(255,255,255,0) 72%)",
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-[30%] -z-10 h-96 w-96 rounded-full bg-blue-200/40 blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 bottom-[15%] -z-10 h-96 w-96 rounded-full bg-rose-200/30 blur-[110px]" />

      {/* HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <h1
          className={`${headingFont.className} mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.12]`}
        >
          Planes simples para negocios que quieren{" "}
          <span className="bg-gradient-to-r from-nf-primary-700 to-nf-primary-500 bg-clip-text text-transparent">
            responder mejor
          </span>
          , vender más y agendar más rápido
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
          Nexi es un operador conversacional con IA para negocios que atienden
          clientes por canales como WhatsApp y otros medios compatibles. Ayuda a
          responder preguntas frecuentes, captar leads, apoyar el agendamiento y
          escalar conversaciones a una persona cuando hace falta.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          Nuestro servicio principal es la suscripción al software (SaaS). El
          onboarding, setup y ajustes iniciales se ofrecen solo como apoyo de
          implementación del producto.
        </p>
        <p className="mt-4 inline-block rounded-full border border-slate-300/80 bg-white/80 px-4 py-1.5 text-sm font-semibold text-slate-700 backdrop-blur-sm shadow-sm">
          Sin contratos complejos. Con implementación clara. Precios pensados
          para crecer.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BrandCtaLink
            href="#precios"
            ringOffset="white"
            className="w-full !text-black sm:w-auto shadow-lg shadow-nf-primary-500/25 hover:shadow-xl hover:shadow-nf-primary-500/30 transition-all duration-300"
          >
            Ver planes <ArrowRight className="h-4 w-4 ml-1" />
          </BrandCtaLink>
          <Link
            href="#contacto"
            className="inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-50 hover:ring-slate-400 sm:w-auto"
          >
            Hablar con ventas
          </Link>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section
        id="precios"
        className="relative z-10 mx-auto mt-24 max-w-7xl scroll-mt-24 px-4"
      >
        <div className="text-center">
          <h2 className="inline-block rounded-full border border-nf-primary-200 bg-nf-primary-50 px-3 py-1 text-sm font-bold uppercase tracking-wider text-nf-primary-700">
            Precios Mensuales
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-2xl font-semibold text-slate-950">
            Elige un plan según el volumen de conversaciones y el nivel de
            acompañamiento que tu negocio necesita.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            La venta principal corresponde a suscripciones SaaS de Nexi; el
            setup es un cargo de implementación inicial cuando aplica. Para
            condiciones legales y reembolsos, consulta{" "}
            <Link href="/terms" className="font-semibold text-nf-primary-700 hover:underline">
              Términos
            </Link>{" "}
            y{" "}
            <Link href="/refunds" className="font-semibold text-nf-primary-700 hover:underline">
              Reembolsos
            </Link>
            .
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3 lg:gap-8 items-start">
          {/* STARTER */}
          <div className="flex flex-col rounded-3xl border border-slate-300/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
            <h3 className="text-xl font-bold text-slate-900">Starter</h3>
            <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
              $100
              <span className="ml-1 text-base font-semibold text-slate-700">
                /mes
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Ideal para negocios que quieren empezar a automatizar su atención
              y no perder oportunidades por responder tarde.
            </p>
            <div className="my-8 h-px w-full bg-slate-200" />
            <ul className="flex-1 space-y-4">
              {[
                "Hasta 400 conversaciones al mes",
                "Configuración base de Nexi para tu negocio",
                "Respuestas automáticas a preguntas frecuentes",
                "Captura básica de leads",
                "Derivación a humano cuando sea necesario",
                "Soporte sobre un flujo principal de atención",
                "Soporte base",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-nf-primary-50">
                    <Check
                      className="h-3 w-3 text-nf-primary-600"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-sm text-slate-800">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#contacto"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-200 hover:ring-slate-400"
            >
              Empezar con Starter
            </Link>
          </div>

          {/* GROWTH (Recomendado) */}
          <div className="relative flex flex-col rounded-3xl border-2 border-nf-primary-500 bg-white p-8 shadow-xl shadow-nf-primary-500/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-nf-primary-500/20 md:-mt-4 md:mb-4">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-nf-primary-400 to-transparent opacity-50" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-nf-primary-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
              Recomendado
            </div>
            <h3 className="mt-2 text-xl font-extrabold text-slate-950">
              Growth
            </h3>
            <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
              $200
              <span className="ml-1 text-base font-semibold text-slate-700">
                /mes
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Ideal para negocios con mayor volumen de mensajes o que quieren un
              sistema más sólido para atención y conversión.
            </p>
            <div className="my-8 h-px w-full bg-slate-200" />
            <ul className="flex-1 space-y-4">
              <li className="flex items-start gap-3 font-semibold text-slate-900">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-nf-primary-100">
                  <Check
                    className="h-3 w-3 text-nf-primary-600"
                    strokeWidth={3}
                  />
                </div>
                <span className="text-sm">Todo lo de Starter, más:</span>
              </li>
              {[
                "Hasta 1.500 conversaciones al mes",
                "Flujos más completos de atención y calificación",
                "Apoyo en procesos de agendamiento",
                "Mejor seguimiento de prospectos",
                "Ajustes iniciales más completos",
                "Mayor capacidad operativa para tu negocio",
                "Soporte prioritario",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-nf-primary-50">
                    <Check
                      className="h-3 w-3 text-nf-primary-600"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-sm text-slate-800">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 w-full">
              <BrandCtaLink
                href="#contacto"
                ringOffset="white"
                className="w-full py-3 !text-black shadow-lg shadow-nf-primary-500/30"
              >
                Empezar con Growth
              </BrandCtaLink>
            </div>
          </div>

          {/* SCALE */}
          <div className="flex flex-col rounded-3xl border border-slate-300/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
            <h3 className="text-xl font-bold text-slate-900">Scale</h3>
            <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
              <span className="mr-2 text-2xl font-semibold text-slate-700">
                Desde
              </span>
              $600
              <span className="ml-1 text-base font-semibold text-slate-700">
                /mes
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Pensado para negocios con operación más grande, múltiples sedes,
              más volumen o necesidades más avanzadas.
            </p>
            <div className="my-8 h-px w-full bg-slate-200" />
            <ul className="flex-1 space-y-4">
              <li className="flex items-start gap-3 font-semibold text-slate-900">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <Check className="h-3 w-3 text-slate-700" strokeWidth={3} />
                </div>
                <span className="text-sm">Todo lo de Growth, más:</span>
              </li>
              {[
                "Mayor volumen de conversaciones",
                "Configuración avanzada según el negocio",
                "Acompañamiento más cercano",
                "Flujos e integraciones más robustas",
                "Prioridad en soporte y ajustes",
                "Plan orientado a operación más compleja",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-nf-primary-50">
                    <Check
                      className="h-3 w-3 text-nf-primary-600"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-sm text-slate-800">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#contacto"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-200 hover:ring-slate-400"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION / SETUP */}
      <section className="relative z-10 mx-auto mt-20 max-w-4xl px-4">
        <div className="group relative overflow-hidden rounded-3xl border border-slate-300 bg-gradient-to-br from-white to-slate-100/70 p-8 shadow-sm transition-all hover:shadow-md sm:p-10">
          {/* Subtle accent border on the left */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-nf-primary-400 opacity-80" />

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between relative z-10">
            <div className="flex-1 pl-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
                <Zap className="h-3 w-3 text-amber-500" /> Setup Inicial
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Onboarding y configuración inicial
              </h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                La implementación cubre la puesta en marcha inicial de Nexi para
                tu negocio. Es un apoyo de arranque para adaptar el software a
                tu operación desde el inicio.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Levantamiento de información del negocio",
                  "Configuración inicial del sistema",
                  "Carga de servicios y respuestas base",
                  "Ajustes iniciales del flujo de atención",
                  "Pruebas antes de salir a producción",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-800"
                  >
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-nf-primary-50">
                      <Check
                        className="h-2.5 w-2.5 text-nf-primary-600"
                        strokeWidth={3}
                      />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 border-t border-slate-300 pt-6 md:border-l md:border-slate-300 md:pl-8 md:pt-0 md:text-right">
              <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-700">
                Pago único
              </div>
              <div className="text-4xl font-extrabold text-slate-900">
                $100{" "}
                <span className="mx-1 text-xl font-medium text-slate-500">
                  a
                </span>{" "}
                $200
              </div>
              <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-slate-600 md:ml-auto">
                * El valor exacto varía según la complejidad y configuración
                requerida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT NEXI CAN DO */}
      <section className="relative z-10 mx-auto mt-32 max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            ¿Qué puede hacer Nexi?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
            Mucho más que un simple bot. Una herramienta operativa para tu
            negocio.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Responder preguntas",
              desc: "Resolver dudas frecuentes de clientes al instante, 24/7.",
              icon: <Bot className="h-6 w-6" />,
            },
            {
              title: "Guiar conversaciones",
              desc: "Hacerlo de forma más rápida, ordenada y eficiente.",
              icon: <Zap className="h-6 w-6" />,
            },
            {
              title: "Captar prospectos",
              desc: "Recolectar datos clave de leads potenciales de forma natural.",
              icon: <Users className="h-6 w-6" />,
            },
            {
              title: "Agendamiento",
              desc: "Ayudar en procesos de reservas y citas sin fricción.",
              icon: <Calendar className="h-6 w-6" />,
            },
            {
              title: "Escalar a un humano",
              desc: "Derivar la charla a una persona de tu equipo cuando hace falta.",
              icon: <Briefcase className="h-6 w-6" />,
            },
            {
              title: "Mejor seguimiento",
              desc: "Reducir tiempos de respuesta y potenciar oportunidades comerciales.",
              icon: <ArrowRight className="h-6 w-6" />,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-300/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-slate-400/70"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-nf-primary-50 text-nf-primary-700 transition-colors duration-300 group-hover:bg-nf-primary-100 group-hover:text-nf-primary-800">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">
                  {feature.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POSITIONING / TRUST SECTION */}
      <section className="relative z-10 mx-auto mt-32 max-w-5xl px-4 text-center">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-16 sm:px-16 sm:py-20 shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-nf-primary-500/10 blur-[60px]" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[60px]" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl tracking-tight">
              Diseñado para negocios que venden y atienden por chat
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
              Nexi no busca ser solo un chatbot. Busca convertirse en una{" "}
              <strong className="text-white font-semibold">
                capa operativa de atención y seguimiento
              </strong>{" "}
              para ayudar a tu negocio a responder mejor, convertir más y perder
              menos oportunidades.
            </p>
            <div className="mt-10">
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center rounded-xl bg-white/20 px-6 py-3 font-semibold text-white shadow-sm ring-1 ring-inset ring-white/35 transition-all hover:bg-white/30 hover:ring-white/50 backdrop-blur-sm"
              >
                Inicia tu transformación
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative z-10 mx-auto mt-32 max-w-3xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Resolvemos tus dudas principales sobre nuestros planes.
          </p>
        </div>
        <div className="mt-12 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-300">
          <NexiFaqAccordion faqs={FAQ_ITEMS} />
        </div>
        <p className="mt-10 rounded-2xl border border-slate-300 bg-slate-100 px-6 py-4 text-center text-sm text-slate-700">
          Todos los planes se adaptan al nivel de operación del cliente.{" "}
          <br className="hidden sm:block" />
          Para negocios con necesidades especiales, ofrecemos{" "}
          <Link
            href="#contacto"
            className="font-semibold text-nf-primary-700 hover:underline"
          >
            cotización personalizada
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
