import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CalendarRange,
  CheckCircle2,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";

const WHATSAPP_DEMO =
  "https://wa.me/593963305344?text=Hola%2C%20quiero%20ver%20la%20demo%20de%20Nexi%20para%20mi%20cl%C3%ADnica%20odontol%C3%B3gica";

export const metadata: Metadata = {
  title: "Nexi para clínicas odontológicas | Más citas, menos saturación",
  description:
    "Nexi atiende tu WhatsApp 24/7, responde precios y horarios, filtra pacientes y agenda citas para tu clínica dental. Reduce no-shows y transfiere al humano cuando se necesita.",
  alternates: { canonical: "/soluciones/clinicas-odontologicas" },
  openGraph: {
    type: "website",
    url: "https://www.nexalforge.com/soluciones/clinicas-odontologicas",
    title: "Nexi para clínicas odontológicas | Más citas, menos saturación",
    description:
      "Asistente de WhatsApp para clínicas dentales: respuesta inmediata, pre-calificación, agendamiento y recordatorios para reducir ausencias.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Nexi para clínicas odontológicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexi para clínicas odontológicas | Más citas, menos saturación",
    description:
      "Nexi atiende tu WhatsApp 24/7, filtra pacientes y agenda para que la silla no quede vacía.",
    images: ["/og.jpg"],
  },
};

const painPoints = [
  "Te escriben “precio de limpieza / brackets / blanqueamiento” y si respondes tarde, se van.",
  "La recepción atiende pacientes en persona + llamadas + WhatsApp… y se pierde seguimiento.",
  "No-shows y cancelaciones de última hora te rompen la agenda.",
  "Tu equipo repite lo mismo todo el día en chat, en lugar de enfocarse en pacientes.",
];

const valueProps = [
  {
    title: "Respuesta inmediata 24/7",
    description:
      "Atiende fuera de horario y cuando la recepción está ocupada. Clave para ads: muchas consultas llegan de noche.",
    badge: "WEO Media +1",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Pre-califica al paciente",
    description:
      "Motivo de consulta, urgencia, preferencia de horario, primera vez vs control. Llega a tu equipo ya filtrado.",
    badge: null,
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Agenda y confirma",
    description:
      "Envía confirmaciones y recordatorios por mensaje para reducir ausencias. Los recordatorios por texto/email se asocian a menor no-show vs llamadas.",
    badge: "PMC +2 · ScienceDirect +2",
    icon: <CalendarRange className="h-5 w-5" />,
  },
  {
    title: "Maneja reprogramaciones",
    description:
      "Si el paciente dice “no puedo”, lo mueve a otro horario y avisa al equipo sin perder el hilo.",
    badge: null,
    icon: <CalendarClock className="h-5 w-5" />,
  },
  {
    title: "Pasa al humano cuando corresponde",
    description:
      "Casos complejos, urgencias, negociación fina o cuando el paciente lo pide. Siempre con contexto.",
    badge: null,
    icon: <UserCheck className="h-5 w-5" />,
  },
];

const steps = [
  {
    title: "Paso 1 — Pregunta",
    text: "Paciente: “Hola, cuánto cuesta una limpieza y tienen cupo esta semana?”",
    image: "/clinicas-odonto/timeline1.webp",
  },
  {
    title: "Paso 2 — Respuesta + filtro",
    text: "Nexi responde lo esencial, hace 2–3 preguntas (sedación/urgencia/horarios) y propone opciones.",
    image: "/clinicas-odonto/timeline2.webp",
  },
  {
    title: "Paso 3 — Cita",
    text: "Confirma fecha/hora, manda ubicación e instrucciones previas para la visita.",
    image: "/clinicas-odonto/timeline3.webp",
  },
  {
    title: "Paso 4 — Recordatorio + confirmación",
    text: "Recuerda y pide confirmación para bajar ausencias. Creative Dental Partners (+1).",
    image: "/clinicas-odonto/timeline4.webp",
  },
  {
    title: "Paso 5 — Si hay dudas",
    text: "Transfiere a recepción con el contexto resumido para que el equipo continúe.",
    image: "/clinicas-odonto/timeline5.webp",
  },
];

const dentalUseCases = [
  {
    text: "Primera consulta (captura + agendamiento)",
    icon: "/clinicas-odonto/icono-dientecheck-nobg.webp",
  },
  {
    text: "Urgencias (dolor / inflamación / “me duele hoy”) → triage básico + derivación rápida",
    icon: "/clinicas-odonto/icono-cruzmed-rayo-nobg.webp",
  },
  {
    text: "Ortodoncia (controles, dudas típicas, reprogramaciones)",
    icon: "/clinicas-odonto/icono-brackets-nobg.webp",
  },
  {
    text: "Estética dental (blanqueamiento / carillas) → guía + agendamiento",
    icon: "/clinicas-odonto/icono-diente-brillante-nobg.webp",
  },
  {
    text: "Post-tratamiento (cuidados básicos + cuándo volver a consultar)",
    icon: "/clinicas-odonto/icono-calendario-con-diente-nobg.webp",
  },
];

const integrationBullets = [
  "Funciona en WhatsApp, donde ya están tus pacientes. (Swiftsell AI)",
  "Configura horarios, precios/desde, servicios y reglas (“si pregunta por X, responde Y”).",
  "Registra datos básicos del paciente (nombre, motivo, preferencia de horario) para tu seguimiento.",
  "Si ya usas agenda (Google Calendar / sistema interno), se alinea al flujo que definan.",
];

const faqs = [
  {
    q: "¿Me va a quitar control o va a decir cualquier cosa?",
    a: "No. Nexi responde con guías definidas por tu clínica y deriva a humano cuando el caso lo amerita.",
  },
  {
    q: "¿Qué pasa si el paciente pregunta precios?",
    a: "Se responde según tu política: rangos, “desde”, o “depende del diagnóstico”. Tú decides el guion.",
  },
  {
    q: "¿Sirve para bajar no-shows?",
    a: "Los recordatorios por mensajes se usan ampliamente para mejorar asistencia y reducir ausencias en citas. Nexi lo automatiza dentro del flujo de conversación. (ScienceDirect +2, Creative Dental Partners +2).",
  },
  {
    q: "¿Mi equipo pierde el trato humano?",
    a: "Al revés: Nexi maneja lo repetitivo y tu equipo se enfoca en pacientes y en cierres importantes.",
  },
  {
    q: "¿Cuánto tarda en implementarse?",
    a: "Depende de qué tan claros estén tus horarios, servicios y reglas de atención. No prometemos tiempos exactos si no están listos.",
  },
];

export default function NexiDentalLanding() {
  return (
    <main className="bg-[#0A0A0B] text-white">
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-[#0C0B0D] via-[#0E0D10] to-[#111018] pb-16 pt-20 md:pb-24 md:pt-24"
      >
        <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-[#B84550]/20 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-[#7A1A28]/25 blur-3xl" />

        <div className="mx-auto flex max-w-[90dvw] flex-col gap-10 px-4 sm:px-6 h-[75dvh]">
          <Reveal className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl min-h-[640px] sm:min-h-[620px] md:min-h-[720px] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
            <Image
              src="/clinicas-odonto/clinica-atencion-pacientes.webp"
              alt="Atención real en clínica dental moderna"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0B0D]/75 via-[#0C0B0D]/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0D]/70 via-transparent to-transparent" />

            <div className="absolute left-0 top-20 flex h-full items-end">
              <div className="max-w-xl space-y-4 p-6 pb-6 sm:p-10 sm:pb-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/85">
                  <Sparkles className="h-4 w-4 text-[#B84550]" />
                  Nexi para clínicas odontológicas
                </div>
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                  Más citas. Menos recepción saturada.
                </h1>
                <h2 className="text-lg font-semibold text-white md:text-xl">
                  Atención ininterrumpida: responde a tus pacientes en WhatsApp
                  e Instagram las 24/7 sin perder consultas.
                </h2>
                <p className="text-base text-white/80 md:text-lg">
                  Nexi atiende tu WhatsApp 24/7, responde precios y horarios,
                  filtra y agenda. Cuando hace falta, transfiere a tu equipo.
                </p>
                <div className="flex flex-wrap items-center gap-3 pb-1">
                  <PrimaryCta href={WHATSAPP_DEMO}>
                    Quiero ver una demo en WhatsApp
                  </PrimaryCta>
                  <SecondaryCta href="#como-funciona">
                    Ver cómo funciona (60s)
                  </SecondaryCta>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-white/75">
                  <LabelPill icon={<Clock3 className="h-4 w-4" />}>
                    24/7
                  </LabelPill>
                  <LabelPill icon={<ShieldCheck className="h-4 w-4" />}>
                    Transferencia a humano
                  </LabelPill>
                  <LabelPill>Agenda llena · menos horas muertas</LabelPill>
                </div>
                <p className="text-sm text-white/70">
                  Sin cambiar tu forma de trabajar. Se adapta a tu clínica y a
                  tus protocolos.
                </p>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 hidden h-40 w-40 sm:block overflow-hidden rounded-full bg-white p-2 shadow-lg">
              <Image
                src="/clinicas-odonto/logo-atencion247.webp"
                alt="Sello atención 24/7"
                width={360}
                height={360}
                className="h-full w-full object-contain"
              />
            </div>
          </Reveal>

          <div className="sm:hidden flex justify-center">
            <div className="mt-4 h-32 w-32 overflow-hidden rounded-full bg-white p-2 shadow-lg">
              <Image
                src="/clinicas-odonto/logo-atencion247.webp"
                alt="Sello atención 24/7"
                width={360}
                height={360}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-[#0B0B0B]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:py-16">
          <div className="space-y-6">
            <Reveal className="overflow-hidden rounded-[28px] border border-black/10 bg-black/5 shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="space-y-3 p-6 sm:p-8 lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8B1E2D]">
                    Dolor
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight text-[#0B0B0B] md:text-4xl">
                    Si tu clínica crece, tu WhatsApp se vuelve un cuello de
                    botella.
                  </h2>
                  <p className="text-lg text-black/70">
                    Nexi se encarga del primer contacto y del seguimiento para
                    que la silla no se quede vacía.
                  </p>
                  <div className="rounded-2xl border border-black/10 bg-white/85 p-4 backdrop-blur">
                    <ul className="grid gap-2 text-base text-black/80 md:text-lg">
                      {painPoints.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#8B1E2D]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative h-full">
                  <Image
                    src="/clinicas-odonto/recepcion-clinica.webp"
                    alt="Recepción odontológica con agenda digital visible"
                    width={1600}
                    height={900}
                    className="h-full w-full rounded-[24px] object-cover object-[82%_center]"
                  />
                  <div className="absolute right-3 bottom-3 hidden w-40 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md sm:block">
                    <Image
                      src="/clinicas-odonto/recepcion-clinica-alternativo.webp"
                      alt="Recepción dental organizada atendiendo pacientes"
                      width={560}
                      height={380}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="valor" className="bg-[#0B0B0B] px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <Reveal className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl">
              <Image
                src="/clinicas-odonto/calendario-lleno.webp"
                alt="Agenda digital semanal con múltiples citas odontológicas"
                width={1600}
                height={1000}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 space-y-2 p-6">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white">
                  Valor en negocio
                </span>
                <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Nexi convierte conversaciones en citas — sin que tu equipo se
                  desgaste.
                </h2>
                <p className="max-w-2xl text-white/80">
                  Responde, filtra, agenda, confirma y transfiere cuando es
                  necesario. Pensado para clínicas odontológicas que ya
                  invierten en ads y no quieren perder pacientes por demora en
                  WhatsApp.
                </p>
              </div>
            </Reveal>

            <Reveal
              delay={120}
              className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl"
            >
              <div className="relative h-60 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <Image
                  src="/clinicas-odonto/confirmacion-reprogramacion.webp"
                  alt="Chat con confirmación de cita y opción de reprogramar"
                  width={1000}
                  height={720}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                  <CalendarClock className="h-4 w-4" />
                  Confirmaciones y reprogramación
                </div>
              </div>
              <p className="text-sm text-white/75">
                Refuerza el claim de reducción de no-shows con recordatorios y
                reprogramaciones sin fricción.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((item) => (
              <Reveal
                key={item.title}
                delay={80}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-center gap-3 text-[#B84550]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B84550]/15">
                    {item.icon}
                  </span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-white/80">{item.description}</p>
                {item.badge ? (
                  <span className="self-start rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {item.badge}
                  </span>
                ) : null}
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl">
              <Image
                src="/clinicas-odonto/calendario-lleno.webp"
                alt="Agenda digital semanal con múltiples citas odontológicas"
                width={1400}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                Agenda llena / menos horas muertas
              </div>
            </Reveal>
            <Reveal
              delay={120}
              className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl"
            >
              <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <Image
                  src="/clinicas-odonto/confirmacion-reprogramacion.webp"
                  alt="Chat con confirmación de cita y opción de reprogramar"
                  width={1000}
                  height={720}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                  <CalendarClock className="h-4 w-4" />
                  Confirmaciones y reprogramación
                </div>
              </div>
              <p className="text-sm text-white/75">
                Refuerza el claim de reducción de no-shows con recordatorios y
                reprogramaciones sin fricción.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="bg-gradient-to-b from-white via-white to-[#F6F7FB] text-[#0B0B0B]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 space-y-8">
          <Reveal className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8B1E2D]">
              Cómo funciona
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Así se ve en la práctica
            </h2>
            <p className="max-w-3xl text-black/70">
              Timeline vertical: cada paso ocupa el viewport para que el flujo
              quede clarísimo.
            </p>
          </Reveal>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 100}
                className="group relative grid min-h-[85vh] gap-6 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl md:grid-cols-[0.45fr_0.55fr]"
              >
                <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-[#8B1E2D]/10 px-3 py-1 text-xs font-semibold text-[#8B1E2D]">
                  Paso {index + 1} · {step.title.replace("Paso ", "")}
                </div>
                <div className="absolute left-4 bottom-4 z-10 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                  {index + 1}/5
                </div>
                <div className="relative order-2 md:order-1 flex flex-col justify-center p-6 md:p-10">
                  <h3 className="text-2xl font-semibold text-[#0B0B0B]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-lg text-black/75">{step.text}</p>
                </div>
                <div className="relative order-1 md:order-2">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={1400}
                    height={900}
                    className="h-full w-full max-h-[85vh] object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8B1E2D]">
              Casos de uso odontológicos
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Hecho para lo que más se repite en una clínica dental
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dentalUseCases.map((item) => (
              <Reveal
                key={item.text}
                className="flex items-start gap-5 rounded-3xl border border-black/10 bg-white p-6 text-black/85 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-black/5">
                  <Image
                    src={item.icon}
                    alt={item.text}
                    width={96}
                    height={96}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <span className="text-lg">{item.text}</span>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-sm text-black/60">
            Nota de seguridad: Nexi no reemplaza el criterio clínico. Ante
            señales de urgencia, deriva a tu protocolo.
          </p>
        </div>
      </section>

      <section className="bg-white text-[#0B0B0B]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8B1E2D]">
              Integración y operación
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              No te pedimos que cambies tu clínica. Nexi se adapta.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {integrationBullets.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-black/10 bg-black/5 p-5 shadow-sm"
              >
                <ShieldCheck className="mt-1 h-5 w-5 text-[#8B1E2D]" />
                <p className="text-black/75">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-black/60">
            Nos alineamos a tu agenda y sistemas actuales; validamos cada
            integración antes de implementarla.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="rounded-3xl border border-black/10 bg-white shadow-md">
              <Image
                src="/clinicas-odonto/recepcionistas-atendiendo-paciente.webp"
                alt="Recepcionistas atendiendo a un paciente mientras usan agenda digital"
                width={1400}
                height={900}
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
            <div className="space-y-2 rounded-3xl border border-black/10 bg-black/5 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#8B1E2D]">
                Nexi apoya, no reemplaza al equipo humano
              </h3>
              <p className="text-black/75">
                Refuerza confianza: la recepción sigue a cargo; Nexi solo
                filtra, agenda y transfiere con contexto completo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#0B0B0B] px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#B84550]">
              Objeciones típicas
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="mt-8 space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"
              >
                <p className="flex items-center gap-2 text-lg font-semibold text-white">
                  <MessageCircle className="h-5 w-5 text-[#B84550]" />
                  {item.q}
                </p>
                <p className="mt-2 text-white/75">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#111018] via-[#0C0B0D] to-[#0F0F13] px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#B84550]">
              Agenda tu demo
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-4xl">
              Si hoy pierdes pacientes por demora en WhatsApp, esto te interesa.
            </h2>
            <p className="mt-3 text-white/80">
              Te mostramos Nexi funcionando con un flujo típico odontológico
              (primera consulta, urgencia y confirmación de cita).
            </p>
            <p className="mt-2 text-sm text-white/70">
              Sin compromiso. Si no encaja con tu operación, te lo diremos
              directo.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <PrimaryCta href={WHATSAPP_DEMO}>
              Agenda una demo (15 min)
            </PrimaryCta>
            <SecondaryCta href="#hero">Volver arriba</SecondaryCta>
          </div>
        </div>
      </section>

      <JsonLd
        id="faq-dental-jsonld"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </main>
  );
}

function PrimaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B84550] via-[#8B1E2D] to-[#7A1A28] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(139,30,45,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(139,30,45,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B84550]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0B0D]"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0B0D]"
    >
      {children}
    </Link>
  );
}

function LabelPill({
  icon,
  children,
}: {
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-white/70">
      {icon}
      {children}
    </span>
  );
}
