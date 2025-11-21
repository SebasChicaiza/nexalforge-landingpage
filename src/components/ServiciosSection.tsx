"use client";
import { ReactNode } from "react";
import Link from "next/link";
import {
  Bot,
  Headphones,
  Zap,
  LineChart,
  Database,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export default function ServiciosSection() {
  return (
    <section id="servicios" className="bg-[#F5F5F5] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Soluciones de IA y automatización que ofrecemos
            </h2>
            <p className="mt-2 max-w-2xl text-neutral-600">
              Agentes de IA, automatización operativa, forecasting y datos para
              empresas de Latinoamérica, con foco en KPIs y puesta en marcha
              rápida (equipo basado en Ecuador).
            </p>
          </div>
          <a
            href="#contacto"
            className="hidden rounded-full bg-[#8B1E2D] px-4 py-2 text-sm text-white hover:bg-[#B84550] md:inline-block"
          >
            Hablar con un experto
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServicioCard
            icon={<MessageCircle className="h-5 w-5" />}
            title="Agente IA para Soporte (Nexi)"
            description="Asistente virtual de IA en español para atención al cliente por WhatsApp, Instagram y Messenger. Responde FAQs, agenda citas y deriva a tu equipo cuando el tema es complejo."
            bullets={[
              "Atiende 24/7 en WhatsApp, Instagram y Messenger.",
              "Conocimiento basado en tus productos, políticas y procesos.",
              "Handoff humano y panel para asignar conversaciones.",
            ]}
            tags={["asistente virtual de IA", "chatbot de IA", "WhatsApp/Instagram/Messenger"]}
            badgeLabel="Producto destacado"
            ctaHref="/asistente-virtual-nexi"
            ctaLabel="Ver detalles de Nexi"
            highlight
          />

          <ServicioCard
            icon={<Bot className="h-5 w-5" />}
            title="Agente IA para Ventas"
            description="Asistente de IA para ventas que automatiza prospección, seguimiento y lead scoring. Conecta tu CRM y prioriza oportunidades con mensajes personalizados."
            bullets={[
              "Automatiza prospección y primer contacto con leads.",
              "Lead scoring basado en modelos de IA.",
              "Sugiere la próxima mejor acción para tu equipo comercial.",
            ]}
            tags={["agente IA ventas", "asistente IA ventas", "automatizar prospección"]}
            ctaLabel="Quiero un agente de IA para ventas"
            ctaHref="#contacto"
          />

          <ServicioCard
            icon={<Headphones className="h-5 w-5" />}
            title="Automatización Operativa con IA"
            description="Flujos de automatización operativa con IA que conectan tus sistemas y eliminan tareas manuales. Trabajamos con n8n, Make o APIs propias para pedidos, facturas y aprobaciones."
            bullets={[
              "Integra CRM, ERP, facturación y otros sistemas.",
              "Elimina tareas repetitivas y reduce errores operativos.",
              "Alertas y reportes automáticos para tu equipo.",
            ]}
            tags={["automatización operativa", "n8n/Make/Zapier", "automatización de procesos"]}
            ctaLabel="Automatizar mis procesos"
            ctaHref="#contacto"
          />

          <ServicioCard
            icon={<Zap className="h-5 w-5" />}
            title="Predicción & Forecasting con IA"
            description="Modelos de predicción de demanda, ventas y churn con IA. Obtén escenarios confiables para compras, inventario, personal y campañas."
            bullets={[
              "Predicción de demanda y ventas por producto y canal.",
              "Identifica clientes en riesgo de abandono (churn).",
              "Simulación de escenarios para decisiones estratégicas.",
            ]}
            tags={["forecasting", "predicción de demanda", "modelos de IA"]}
            ctaLabel="Quiero predicción con IA"
            ctaHref="#contacto"
          />

          <ServicioCard
            icon={<LineChart className="h-5 w-5" />}
            title="Capa de Datos y Dashboards Ejecutivos"
            description="Unificamos datos de ventas, marketing, operaciones y finanzas en una capa gobernada. Construimos dashboards ejecutivos en Looker, Metabase o Grafana."
            bullets={[
              "Unificación de datos de múltiples fuentes.",
              "Métricas gobernadas y definidas una sola vez.",
              "Dashboards en tiempo real para dirección y gerencias.",
            ]}
            tags={["capa de datos", "dashboards ejecutivos", "integración de datos"]}
            ctaLabel="Mejorar mis dashboards de datos"
            ctaHref="#contacto"
          />

          <ServicioCard
            icon={<Database className="h-5 w-5" />}
            title="Sprint de Implementación de IA (2 semanas)"
            description="Sprint intensivo para lanzar un MVP de IA en tu empresa. Definimos el caso, mapeamos procesos, implementamos el piloto y capacitamos a tu equipo."
            bullets={[
              "Descubrimiento y priorización de casos de uso.",
              "MVP funcional entregado en 2 semanas.",
              "Capacitación básica para tu equipo interno.",
            ]}
            tags={["MVP de IA", "implementación rápida", "consultoría IA"]}
            ctaLabel="Diseñar mi MVP de IA"
            ctaHref="#contacto"
          />
        </div>

        {/* Barra de confianza opcional */}
        <div className="mt-10 grid grid-cols-2 gap-4 text-sm text-neutral-600 md:grid-cols-4">
          <Trust stat="+18%" label="tasa de cierre" />
          <Trust stat="–45%" label="tiempo de respuesta" />
          <Trust stat="–28%" label="gasto en herramientas" />
          <Trust stat="2–3 sem." label="primer KPI medible" />
        </div>
      </div>
    </section>
  );
}

function ServicioCard({
  icon,
  title,
  description,
  bullets,
  tags,
  ctaHref,
  ctaLabel,
  badgeLabel,
  highlight,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  bullets: string[];
  tags?: string[];
  ctaHref?: string;
  ctaLabel?: string;
  badgeLabel?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition",
        highlight ? "border-[#8B1E2D]" : "border-neutral-200",
        "bg-white hover:shadow-md",
      ].join(" ")}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-xl bg-[#F5F5F5] px-3 py-2 text-[#8B1E2D]">
          {icon}
          <span className="text-xs font-medium">
            {badgeLabel ?? "Producto"}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#2A2A2A]">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
          {description}
        </p>
      )}

      <ul className="mt-3 space-y-2 text-sm text-neutral-600">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#8B1E2D]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {tags && (
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-neutral-500">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {ctaHref?.startsWith("/") ? (
        <Link
          href={ctaHref}
          className="mt-5 inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-[#2A2A2A] transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
        >
          {ctaLabel ?? "Ver demo"}
          <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <a
          href={ctaHref ?? "#contacto"}
          className="mt-5 inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-[#2A2A2A] transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
        >
          {ctaLabel ?? "Ver demo"}
          <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
        </a>
      )}

      {/* Glow sutil al hacer hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#8B1E2D]/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}

function Trust({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center">
      <div className="text-xl font-extrabold text-[#8B1E2D]">{stat}</div>
      <div className="text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </div>
    </div>
  );
}
