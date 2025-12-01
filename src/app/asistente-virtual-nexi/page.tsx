import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Laptop,
  Mail,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import NexiHeroCtas from "@/components/NexiHeroCtas";
import NexiDemoForm from "@/components/NexiDemoForm";
import NexiFaqAccordion from "@/components/NexiFaqAccordion";
import NexiStepsCarousel from "@/components/NexiStepsCarousel";
import NexiIndustriesGrid, {
  type IndustryUseCase,
} from "@/components/NexiIndustriesGrid";


const WHATSAPP_LINK =
  "https://wa.me/593963305344?text=Hola%2C%20Nexi.%20Quiero%20informaci%C3%B3n...";

export const metadata: Metadata = {
  title: "Asistente virtual de IA para WhatsApp, Instagram y Messenger | Nexi",
  description:
    "Nexi es un asistente virtual de IA que atiende a tus clientes por WhatsApp, Instagram y Messenger. Responde preguntas frecuentes, agenda citas, conecta con tus sistemas y escala a tu equipo humano cuando es necesario.",
  alternates: { canonical: "/asistente-virtual-nexi" },
  openGraph: {
    type: "website",
    url: "https://www.nexalforge.com/asistente-virtual-nexi",
    title:
      "Asistente virtual de IA para WhatsApp, Instagram y Messenger | Nexi",
    description:
      "Nexi es un asistente virtual de IA que atiende a tus clientes por WhatsApp, Instagram y Messenger. Responde preguntas frecuentes, agenda citas, conecta con tus sistemas y escala a tu equipo humano cuando es necesario.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Nexi, asistente virtual con inteligencia artificial de Nexal Forge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Asistente virtual de IA para WhatsApp, Instagram y Messenger | Nexi",
    description:
      "Nexi es un asistente virtual de IA para WhatsApp, Instagram y Messenger. Responde preguntas frecuentes, agenda citas y escala a tu equipo humano cuando es necesario.",
    images: ["/og.jpg"],
  },
};

const steps = [
  {
    title: "1. El cliente escribe en WhatsApp, Instagram o Messenger",
    copy: "Nexi recibe el mensaje en el canal que tu empresa ya usa con tus clientes.",
  },
  {
    title: "2. Detecta la intención con IA",
    copy: "Identifica de qué trata la consulta con modelos de lenguaje entrenados en español.",
  },
  {
    title: "3. Consulta tu base de conocimiento",
    copy: "Busca en productos, políticas, procesos o documentos para responder con información real.",
  },
  {
    title: "4. Responde en segundos en español",
    copy: "Genera respuestas claras y amigables, alineadas con el tono de tu marca y tu país.",
  },
  {
    title: "5. Agenda o registra citas cuando aplica",
    copy: "Puede proponer horarios, registrar citas y enviar formularios según tu flujo.",
  },
  {
    title: "6. Deriva a tu equipo cuando es sensible",
    copy: "Si detecta un tema complejo, transfiere la conversación a un agente humano desde la plataforma.",
  },
];

const stepsWithMedia = [
  { ...steps[0], image: "/pasos-nexi/message.png" },
  { ...steps[1], image: "/pasos-nexi/ia.png" },
  { ...steps[2], image: "/pasos-nexi/cerebro.png" },
  { ...steps[3], image: "/pasos-nexi/respuesta.png" },
  { ...steps[4], image: "/pasos-nexi/calendar.png" },
  { ...steps[5], image: "/pasos-nexi/user.png" },
];

const tasks = [
  {
    title: "Atención al cliente y soporte",
    summary:
      "Responde FAQs sobre horarios, precios y políticas; detecta problemas y abre tickets en tus herramientas para que el equipo actúe sin demoras.",
    titleClass: "text-[#8B1E2D]",
    image: "/conversaciones/nexiAyuda.png",
  },
  {
    title: "Ventas y pre-venta en tiempo real",
    summary:
      "Resuelve dudas de productos en tiempo real, califica interesados, envía info a tu CRM y pasa a ventas solo a quienes están listos para comprar.",
    titleClass: "text-[#8B1E2D]",
    image: "/conversaciones/nexiVentas.png",
  },
  {
    title: "Agendamiento de citas y reservas",
    summary:
      "Propone horarios según tu disponibilidad, confirma o reprograma citas y envía recordatorios automáticos para reducir ausencias.",
    titleClass: "text-[#8B1E2D]",
    image: "/conversaciones/nexiCitas.png",
  },
  {
    title: "Notificaciones y seguimiento",
    summary:
      "Envía confirmaciones y actualizaciones de pedidos o citas y activa recordatorios si el cliente no responde o dejó procesos a medias.",
    titleClass: "text-[#8B1E2D]",
    image: "/conversaciones/nexiNotificaciones.png",
  },
];

const industries: IndustryUseCase[] = [
  {
    name: "Agencias de viajes y turismo",
    headline: "Cotiza itinerarios mientras capturas datos del viajero",
    description:
      "Responde en segundos sobre rutas, visados y formas de pago mientras guardas leads listos para ventas.",
    bullets: [
      "Responde sobre paquetes, visas, requisitos y formas de pago.",
      "Gestiona consultas de disponibilidad y datos de contacto.",
    ],
    image: "/casos-de-uso/viajes.png",
    gradient: "from-[#031a30]/10 via-[#04152a]/55 to-[#050b18]/95",
    badge: "Turismo",
  },
  {
    name: "Spas, centros de estética y bienestar",
    headline: "Agenda citas sin llamadas perdidas",
    description:
      "Muestra servicios, confirma horarios y envía recordatorios en WhatsApp e Instagram de forma automática.",
    bullets: [
      "Muestra servicios, precios y promociones.",
      "Agenda citas y envía recordatorios o reprogramaciones.",
    ],
    image: "/casos-de-uso/spa.png",
    gradient: "from-[#031a30]/10 via-[#04152a]/55 to-[#050b18]/95",
    badge: "Reservas",
  },
  {
    name: "Pastelerías y negocios de comida",
    headline: "Toma pedidos y coordina entregas desde el chat",
    description:
      "Centraliza sabores, pagos y tiempos de entrega para responder sin esperar a un humano.",
    bullets: [
      "Informa sabores, tamaños, precios y tiempos de entrega.",
      "Toma pedidos simples y los envía a tu sistema para confirmación.",
    ],
    image: "/casos-de-uso/pasteleria.png",
    gradient: "from-[#031a30]/10 via-[#04152a]/55 to-[#050b18]/95",
    badge: "Pedidos",
  },
  {
    name: "Clínicas, consultorios y salud",
    headline: "Clasifica consultas y agenda sin congestionar la línea",
    description:
      "Entrega info básica y recolecta los datos del paciente para tu sistema.",
    bullets: [
      "Responde preguntas de servicios y especialidades.",
      "Gestiona agendamientos y recordatorios (sin tocar temas sensibles).",
    ],
    image: "/casos-de-uso/salud.png",
    gradient: "from-[#031a30]/10 via-[#04152a]/55 to-[#050b18]/95",
    badge: "Salud",
  },
  {
    name: "E-commerce y retail",
    headline: "Automatiza status de pedidos y consultas de stock",
    description:
      "Nexi responde en segundos y actualiza tus sistemas para que el equipo intervenga solo en casos críticos.",
    bullets: [
      "Ayuda a seguir pedidos y políticas de devolución.",
      "Entrega info de stock o variantes conectada a tus sistemas.",
    ],
    image: "/casos-de-uso/ecommerce.png",
    gradient: "from-[#031a30]/10 via-[#04152a]/55 to-[#050b18]/95",
    badge: "Retail",
  },
  {
    name: "Educación y cursos online",
    headline: "Inscripciones, soporte académico al instante",
    description:
      "Responde sobre mallas, precios y financiamiento mientras capturas leads listos para admisiones en tu CRM.",
    bullets: [
      "Aclara horarios, requisitos y modalidades",
      "Califica interesados y agenda llamadas con admisiones o asesores.",
    ],
    image: "/casos-de-uso/educacion.png",
    gradient: "from-[#031a30]/10 via-[#04152a]/55 to-[#050b18]/95",
    badge: "Educación",
  },
  {
    name: "Servicios financieros y seguros",
    headline: "Cotiza productos y verifica datos con trazabilidad",
    description:
      "Entrega coberturas, tasas y requisitos en segundos y deriva a un ejecutivo para contratar.",
    bullets: [
      "Cotiza pólizas o créditos con preguntas guiadas.",
      "Valida datos básicos y agenda con un asesor según perfil de riesgo.",
    ],
    image: "/casos-de-uso/seguros.png",
    gradient: "from-[#031a30]/10 via-[#04152a]/55 to-[#050b18]/95",
    badge: "Finanzas",
  },
  {
    name: "Bienes raíces y proyectos inmobiliarios",
    headline: "Califica leads y agenda visitas",
    description:
      "Nexi responde disponibilidad, precios y amenidades y programa recorridos con datos completos del cliente.",
    bullets: [
      "Envía fichas, planos y modelos de pago por torre o etapa.",
      "Confirma presupuesto y agenda citas en agenda compartida.",
    ],
    image: "/casos-de-uso/inmobiliaria.png",
    gradient: "from-[#031a30]/10 via-[#04152a]/55 to-[#050b18]/95",
    badge: "Real Estate",
  },
];

const integrations = {
  channels: ["WhatsApp", "Instagram", "Messenger"],
  systems: [
    "HubSpot",
    "Pipedrive",
    "Calendarios",
    "Plataformas de tickets",
    "n8n / Make",
  ],
};

const plans = [
  {
    name: "Plan Básico",
    audience:
      "Para empresas que quieren activar un asistente virtual de IA en un canal y validar resultados rápido.",
    items: [
      "1 canal (ej. WhatsApp) con base de conocimiento inicial.",
      "FAQs y respuestas rápidas entrenadas en tu contenido en español.",
      "Reporte de uso mensual con aprendizajes y mejoras.",
      "Implementación del asistente virtual de IA adaptado a tu negocio.",
    ],
  },
  {
    name: "Plan Profesional",
    audience:
      "Para equipos que necesitan multicanal y flujos de agendamiento o formularios.",
    note: "Incluye todo lo del plan Básico, más:",
    items: [
      "Multicanal: WhatsApp + Instagram + Messenger.",
      "Flujos de agendamiento y formularios integrados.",
      "Ajustes mensuales del modelo y la base de conocimiento.",
      "Seguimientos y nudges si la persona no responde.",
    ],
  },
  {
    name: "Plan Enterprise",
    audience: "Para empresas medianas y grandes en Latam (equipo en Ecuador).",
    note: "Incluye todo lo del plan Profesional, más:",
    items: [
      "Integraciones a medida con CRM, ERP o sistemas internos.",
      "SLA y soporte prioritario en español.",
      "Roadmap de automatización y mejora continua del asistente virtual.",
      "Ruteo avanzado y panel de agentes para equipos grandes.",
    ],
  },
];

const faqs = [
  {
    q: "¿Nexi es un chatbot o un asistente virtual de IA?",
    a: "Nexi es un asistente virtual de IA en español. Usa modelos de lenguaje y una base de conocimiento para responder de forma flexible, no solo flujos rígidos.",
  },
  {
    q: "¿Cómo se entrena Nexi con la información de mi empresa?",
    a: "Cargamos FAQs, procesos, políticas y documentos clave. Nexi consulta esa base de conocimiento y la combinamos con flujos guiados cuando hace falta.",
  },
  {
    q: "¿Nexi puede atender solo en español o también en otros idiomas?",
    a: "Su foco es español para Latam, pero puede responder en otros idiomas (inglés/portugués) si lo configuramos. Priorizamos la calidad en español y adaptamos el resto a tu caso.",
  },
  {
    q: "¿Qué necesito para usar Nexi en WhatsApp?",
    a: "Necesitas un número de WhatsApp Business API o Twilio. Te ayudamos a configurarlo y a conectar Instagram y Messenger si los usas.",
  },
  {
    q: "¿Cuánto tiempo tarda la implementación de Nexi en mi empresa?",
    a: "Un piloto inicial puede estar activo en pocas semanas, dependiendo de integraciones y cantidad de información a entrenar.",
  },
  {
    q: "¿Qué pasa si Nexi no entiende una pregunta?",
    a: "Si no tiene certeza, busca alternativas en tu conocimiento y puede escalar al equipo humano. Registramos las dudas para mejorar su base de conocimiento.",
  },
];

const contactOptions = [
  {
    label: "Llamada WhatsApp",
    value: "+593 963 305 344",
    icon: PhoneCall,
  },
  {
    label: "Mensaje Instagram / WhatsApp / Messenger",
    value: "Conversaciones en el mismo hilo",
    icon: MessageSquare,
  },
  {
    label: "Email + CRM",
    value: "Respuestas y conexión a tu sistema",
    icon: Mail,
  },
];

export default function NexiProductPage() {
  return (
    <main className="bg-white text-[#0C0C10]">
      <article className="isolate overflow-hidden">
        <section
          id="hero"
          className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0A0B] via-[#120A0D] to-[#1B0F13] pt-24 sm:pt-28 text-white"
        >
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute left-[-120px] top-[-80px] h-64 w-64 rounded-full bg-[#8B1E2D]/30 blur-3xl" />
            <div className="absolute right-[-180px] bottom-[-120px] h-80 w-80 rounded-full bg-[#B84550]/25 blur-[110px]" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:py-24">
            <div className="space-y-6">
              
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/80">
                <Sparkles className="h-3.5 w-3.5 text-[#FFD3DC]" />
                Asistente virtual con IA para empresas
              </span>

              <div className="space-y-4">
                <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  Asistente virtual de IA para WhatsApp, Instagram y Messenger
                </h1>
                
              </div>

              <div className="grid gap-2 text-sm text-white/80">
                {[
                  "Asistente virtual de IA entrenado con tu conocimiento real.",
                  "Atiende 24/7 en WhatsApp, Instagram y Messenger.",
                  "Multilenguaje (español, inglés/portugués si lo configuras).",
                  "Deriva a agentes humanos desde la plataforma web cuando toca.",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#FFD3DC]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <NexiHeroCtas
                demoHref="#demo"
                whatsappHref={WHATSAPP_LINK}
                whatsappLabel="Hablar con Nexi por WhatsApp"
              />
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/nexi-agente/NexiChat.png"
                    alt="Nexi, asistente virtual de IA atendiendo conversaciones de WhatsApp, Instagram y Messenger"
                    fill
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className="object-cover"
                    priority
                  />
                </div>
            </div>
          </div>
        </section>

        <section
          id="que-es-nexi"
          className="bg-white py-16 md:py-20"
          aria-labelledby="h2-que-es-nexi"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative h-full min-h-[360px] bg-neutral-900">
                  <Image
                    src="/nexi-agente/nexi-aprendiendo.png"
                    alt="Nexi aprendiendo de los servicios, políticas y procesos de una empresa"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto">
                    <div className="w-full max-w-[300px] rounded-2xl bg-white/95 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur">
                      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-neutral-600">
                        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-700">
                          Nexi multicanal
                        </span>
                        <span className="text-neutral-500">En vivo</span>
                      </div>
                      <ul className="space-y-1.5">
                        {contactOptions.map(({ label, value, icon: Icon }) => (
                          <li
                            key={label}
                            className="flex items-start gap-3 rounded-xl px-3 py-2 transition hover:bg-neutral-50"
                          >
                            <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] text-white">
                              <Icon className="h-4 w-4" />
                            </span>
                            <div className="leading-tight">
                              <div className="text-[13px] font-semibold text-neutral-900">
                                {label}
                              </div>
                              <div className="text-[11px] text-neutral-600">
                                {value}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="relative flex h-full flex-col justify-center gap-4 bg-gradient-to-br from-[#360e0e] via-[#360e0e] to-[#451010] px-6 py-12 text-white sm:px-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]" />
                  <div className="relative space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                      <MessageSquare className="h-4 w-4" />
                      Asistente virtual Nexi
                    </div>
                    <h2
                      id="h2-que-es-nexi"
                      className="text-3xl font-semibold sm:text-4xl"
                    >
                      ¿Qué es Nexi y en qué se diferencia de un chatbot
                      tradicional?
                    </h2>
                    <div className="space-y-3 text-base text-white/80">
                      <p>
                        Nexi es un asistente virtual de IA en español que
                        atiende las conversaciones de tu empresa en WhatsApp,
                        Instagram y Messenger. Usa modelos de lenguaje y una
                        base de conocimiento propia para responder con
                        información real, no solo flujos rígidos.
                      </p>
                      <p>
                        Un chatbot tradicional sigue reglas fijas y se rompe
                        fácilmente cuando la pregunta varía. Nexi entiende
                        lenguaje natural, mantiene el contexto y aprende de
                        nueva información. Cuando detecta un tema sensible,
                        transfiere la conversación a tu equipo humano.
                      </p>
                    </div>
                    <div className="grid gap-3 text-sm text-white/80">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 text-[#7CD4FF]" />
                        <span>Base de conocimiento real + flujos guiados.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 text-[#FFD3DC]" />
                        <span>Modelo en español que mantiene contexto.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Laptop className="mt-0.5 h-4 w-4 text-[#9AE6B4]" />
                        <span>Deriva casos sensibles a tu equipo en el panel.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona-nexi"
          className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0B] via-[#120C12] to-[#1A1015] py-16 md:py-20"
          aria-labelledby="h2-como-funciona"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <h2
                id="h2-como-funciona"
                className="text-3xl font-semibold sm:text-4xl text-white"
              >
                ¿Cómo funciona el asistente virtual Nexi?
              </h2>
              <p className="mt-3 text-base text-white/75">
                Un recorrido claro de cómo Nexi entiende, responde y escala tus
                conversaciones en segundos.
              </p>
            </div>

            <NexiStepsCarousel steps={stepsWithMedia} />

            <div className="mt-12 space-y-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                <Workflow className="h-4 w-4 text-[#FFD3DC]" />
                Nexi en el centro, con humanos cuando toca
              </div>
              <p className="text-white/80">
                Así se ve el ruteo típico: Nexi recibe mensajes de tus canales,
                responde lo repetitivo y entrega a tu equipo los casos
                sensibles.
              </p>
            </div>
          </div>
        </section>

        <section
          id="tareas"
          className="bg-white py-16 md:py-20"
          aria-labelledby="h2-tareas"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="h2-tareas"
                className="text-3xl font-semibold sm:text-4xl text-[#0F0F10]"
              >
                ¿Qué tareas puede automatizar Nexi?
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Nexi despliega agentes especializados que conversan como tu
                equipo: reciben a tus clientes, venden con contexto y resuelven
                soporte sin tiempos de espera. Esta sección resume cómo cada
                agente trabaja en español para convertir, retener y dar una
                experiencia impecable.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tasks.map((task) => (
                <article
                  key={task.title}
                  className="relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
                >
                  <div className="pointer-events-none absolute inset-x-6 bottom-0 h-20 rounded-[18px]" />
                  <div className="relative space-y-3">
                    <h3
                      className={`text-xl font-semibold ${
                        task.titleClass ?? "text-[#0F0F10]"
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.summary ? (
                      <p className="text-sm leading-relaxed text-neutral-700">
                        {task.summary}
                      </p>
                    ) : null}
                    {task.image && (
                      <div className="mt-5 overflow-hidden rounded-2xl">
                        <Image
                          src={task.image}
                          alt={`Ilustración de ${task.title}`}
                          width={640}
                          height={360}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="industrias"
          className="bg-neutral-50 py-16 md:py-20"
          aria-labelledby="h2-industrias"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2
              id="h2-industrias"
              className="text-3xl font-semibold sm:text-4xl text-[#0F0F10]"
            >
              Casos de uso de Nexi por tipo de negocio
            </h2>
            <NexiIndustriesGrid items={industries} />
          </div>
        </section>

        <section
          id="integraciones"
          className="bg-white py-16 md:py-20"
          aria-labelledby="h2-integraciones"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <h2
                  id="h2-integraciones"
                  className="text-3xl font-semibold sm:text-4xl text-[#0F0F10]"
                >
                  Integraciones y canales compatibles
                </h2>
                <p className="text-lg text-neutral-700">
                  Nexi se integra con tus sistemas actuales para registrar
                  conversaciones, crear tickets, actualizar datos y disparar
                  automatizaciones en segundo plano.
                </p>
                <div className="grid gap-3 text-sm text-neutral-700">
                  <div className="flex items-start gap-2">
                    <Laptop className="mt-1 h-4 w-4 text-[#8B1E2D]" />
                    <span>Canales: {integrations.channels.join(", ")}.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Laptop className="mt-1 h-4 w-4 text-[#8B1E2D]" />
                    <span>
                      Sistemas: {integrations.systems.join(", ")} y APIs a
                      medida.
                    </span>
                  </div>
                </div>

                <div className="mt-4 inline-flex flex-wrap gap-3 text-sm text-neutral-600">
                  <a
                    href="https://developers.facebook.com/docs/whatsapp/cloud-api/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Documentación oficial de WhatsApp Business
                  </a>
                  <a
                    href="https://www.twilio.com/docs/conversations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Twilio Conversations / Flex
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                  <Image
                    src="/nexi-agente/plataforma-web-panel.png"
                    alt="Panel web de Nexal Forge mostrando las conversaciones atendidas por Nexi y el equipo humano"
                    width={1600}
                    height={1000}
                    className="h-auto w-full rounded-3xl object-cover"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </section>

        <section className="bg-neutral-50 py-12" aria-label="Nexi voz">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/Persona_Telefono.png"
                  alt="Versión futura de Nexi atendiendo llamadas de voz como asistente virtual"
                  width={800}
                  height={550}
                  className="h-auto w-150 rounded-3xl object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#0F0F10]">
                  Próximamente: Nexi también atenderá llamadas de voz
                </h3>
                <p className="text-neutral-700">
                  Estamos habilitando voz entrante con transcripción automática
                  para que Nexi pueda contestar, derivar y registrar llamadas
                  como un asistente virtual completo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="planes"
          className="bg-neutral-50 py-16 md:py-20"
          aria-labelledby="h2-planes"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2
                  id="h2-planes"
                  className="text-3xl font-semibold sm:text-4xl text-[#0F0F10]"
                >
                  Planes de implementación de Nexi
                </h2>
                <p className="mt-2 text-neutral-700">
                  Para conocer el valor de cada plan y condiciones de
                  lanzamiento, agenda una demo o contáctanos.
                </p>
              </div>
              <a
                href="#demo"
                className="hidden items-center gap-2 rounded-full bg-[#8B1E2D] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#B84550] md:inline-flex"
              >
                Solicitar demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Imagen izquierda + planes derecha */}
            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
              {/* Columna izquierda: imagen */}
              <div className="flex justify-start">
                <Image
                  src="/nexi-agente/NexiTexto.png"
                  alt="Nexi representando la implementación del asistente virtual en diferentes planes de servicio"
                  width={1200}
                  height={400}
                  className="w-full max-w-xl rounded-3xl object-contain"
                />
              </div>

              {/* Columna derecha: planes en una sola columna */}
              <div className="flex flex-col gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.12)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-[#0F0F10]">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {plan.audience}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#8B1E2D]/10 px-3 py-1 text-xs font-semibold text-[#8B1E2D]">
                        Consulta el precio
                      </span>
                    </div>

                    {plan.note && (
                      <p className="mt-3 text-sm font-semibold text-neutral-700">
                        {plan.note}
                      </p>
                    )}

                    <ul className="mt-4 space-y-3 text-sm text-neutral-800">
                      {plan.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#8B1E2D]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="resultados-nexi"
          className="bg-white py-16 md:py-20"
          aria-labelledby="h2-resultados-nexi"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2
                  id="h2-resultados-nexi"
                  className="text-3xl font-semibold sm:text-4xl text-[#0F0F10]"
                >
                  Resultados obtenidos con Nexi
                </h2>
                <p className="mt-2 text-neutral-700">
                  Casos medidos en empresas de servicios y retail en Latam; el
                  equipo está basado en Ecuador.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-[#0F0F10] transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
              >
                Volver a soluciones de IA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  kpi: "–50 % tiempo de respuesta",
                  desc: "Reducción de 2 horas a menos de 5 minutos en atención básica.",
                },
                {
                  kpi: "60 % consultas resueltas sin humanos",
                  desc: "FAQs y flujos simples gestionados por Nexi con handoff controlado.",
                },
                {
                  kpi: "+30 % citas confirmadas",
                  desc: "Recordatorios y reprogramaciones automáticas en WhatsApp.",
                },
              ].map((item) => (
                <div
                  key={item.kpi}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm"
                >
                  <div className="text-2xl font-bold text-[#8B1E2D]">
                    {item.kpi}
                  </div>
                  <p className="mt-2 text-neutral-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="bg-white py-16 md:py-20"
          aria-labelledby="h2-faq"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-3">
                <h2
                  id="h2-faq"
                  className="text-3xl font-semibold sm:text-4xl text-[#0F0F10]"
                >
                  Preguntas frecuentes sobre el asistente virtual Nexi
                </h2>
                <p className="text-neutral-700">
                  Nexi automatiza la atención al cliente en los canales donde
                  tus clientes ya te escriben. Responde en segundos con base en
                  el conocimiento de tu empresa, agenda citas y transfiere la
                  conversación a tu equipo cuando el caso lo requiere. Servicio
                  con foco en español para Latam y opción multilenguaje.
                </p>
                <p className="text-neutral-700">
                  Resolvemos dudas típicas para que tu equipo sepa cómo operará
                  Nexi desde el día uno, con foco en empresas de Latinoamérica
                  (equipo basado en Ecuador).
                </p>
                <div className="flex justify-center">
                  <div className="overflow-hidden rounded-3xl bg-neutral-50 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
                    <Image
                      src="/nexi-agente/nexi-icon.png"
                      alt="Mascota Nexi junto a las preguntas frecuentes del asistente virtual"
                      width={900}
                      height={900}
                      className="h-auto w-[420px] md:w-[460px] object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Acordeón de FAQs */}
              <NexiFaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>

        <section
          id="demo"
          className="bg-neutral-50 py-16 md:py-20"
          aria-labelledby="h2-demo"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
              <div className="space-y-4">
                <h2
                  id="h2-demo"
                  className="text-3xl font-semibold sm:text-4xl text-[#0F0F10]"
                >
                  Agenda una demo de Nexi
                </h2>
                <p className="text-lg text-neutral-700">
                  Déjanos tus datos y te mostraremos, en una llamada o
                  videollamada, cómo Nexi puede ayudar a tu empresa a
                  automatizar la atención al cliente.
                </p>
                <div className="grid gap-3 text-sm text-neutral-700">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#8B1E2D]" />
                    <span>Formularios cortos: solo pedimos lo necesario.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#8B1E2D]" />
                    <span>Deriva inmediata a un humano si prefieres.</span>
                  </div>
                </div>
                <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-2 shadow-sm">
                  <Image
                    src="/nexi-agente/cta-agenda-demo.png"
                    alt="Nexi invitando a agendar una demo del asistente virtual"
                    width={900}
                    height={650}
                    className="h-auto w-full rounded-2xl object-cover"
                  />
                </div>
              </div>

              <NexiDemoForm />
            </div>
          </div>
        </section>

        <JsonLd
          id="nexi-product-jsonld"
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Nexi – Asistente virtual de IA para WhatsApp, Instagram y Messenger",
            description:
              "Asistente virtual con IA de Nexal Forge que responde mensajes en WhatsApp, Instagram y Messenger, agenda citas y deriva conversaciones complejas a tu equipo humano.",
            brand: { "@type": "Organization", name: "Nexal Forge" },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "USD",
            },
            url: "https://www.nexalforge.com/asistente-virtual-nexi",
          }}
        />

        <JsonLd
          id="nexi-faq-jsonld"
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
      </article>
    </main>
  );
}
