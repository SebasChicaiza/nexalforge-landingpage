"use client";
import { ReactNode } from "react";
import {
  Bot,
  Headphones,
  Zap,
  LineChart,
  Database,
  Rocket,
  ArrowRight,
} from "lucide-react";

export default function ServiciosSection() {
  return (
    <section id="servicios" className="bg-[#F5F5F5] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Servicios & productos
            </h2>
            <p className="mt-2 max-w-2xl text-neutral-600">
              Soluciones listas para impactar KPIs en semanas. Integraciones con
              tu stack actual, métricas claras y ejecución segura.
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
            icon={<Bot className="h-5 w-5" />}
            title="Agente IA para Ventas"
            bullets={[
              "Prospección y follow-ups automáticos",
              "Lead scoring + recomendaciones",
              "Integración CRM (HubSpot, Pipedrive)",
            ]}
            priceLabel="Desde USD $100 setup + $50/mes"
          />

          <ServicioCard
            icon={<Headphones className="h-5 w-5" />}
            title="Agente IA para Soporte"
            bullets={[
              "FAQ y tickets 24/7 (email/chat)",
              "RAG con tu base de conocimiento",
              "KPIs de CSAT/tiempos de resolución",
            ]}
            priceLabel="Desde USD $100 setup + $50/mes"
          />

          <ServicioCard
            icon={<Zap className="h-5 w-5" />}
            title="Automatización Operativa"
            bullets={[
              "Órdenes, facturas y aprobaciones",
              "n8n / Make / Zapier + webhooks",
              "Alertas y auditoría de flujos",
            ]}
            priceLabel="Desde USD $299 por flujo (MVP)"
          />

          <ServicioCard
            icon={<LineChart className="h-5 w-5" />}
            title="Predicción & Forecasting"
            bullets={[
              "Demanda, churn y propensión a compra",
              "ABM: next-best-action",
              "Tableros ejecutivos en tiempo real",
            ]}
            priceLabel="Desde USD $799 por proyecto (MVP)"
          />

          <ServicioCard
            icon={<Database className="h-5 w-5" />}
            title="Capa de Datos & Dashboards"
            bullets={[
              "ETL/ELT y unificación de fuentes",
              "Modelos y métricas gobernadas",
              "Looker/Metabase/Grafana",
            ]}
            priceLabel="Desde USD $499 por dashboard"
          />

          <ServicioCard
            icon={<Rocket className="h-5 w-5" />}
            title="Sprint de Implementación"
            bullets={[
              "2 semanas · MVP funcional",
              "Mapa de automatización",
              "Capacitación + handover",
            ]}
            priceLabel="Paquete USD $899 (2 semanas)"
            highlight
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
  bullets,
  priceLabel,
  highlight,
}: {
  icon: ReactNode;
  title: string;
  bullets: string[];
  priceLabel?: string;
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
          <span className="text-xs font-medium">Producto</span>
        </div>

        {priceLabel && (
          <div className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-[#2A2A2A]">
            {priceLabel}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-[#2A2A2A]">{title}</h3>

      <ul className="mt-3 space-y-2 text-sm text-neutral-600">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#8B1E2D]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        className="mt-5 inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-[#2A2A2A] transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
      >
        Ver demo
        <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
      </a>

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
