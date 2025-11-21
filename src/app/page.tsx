// src/app/page.tsx
import type { Metadata } from "next";
import NexalForgeLandingWireframe from "@/components/NexalForgeLandingWireframe";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "Soluciones de IA y automatización para empresas en Latinoamérica | Nexal Forge",
  description:
    "Nexal Forge implementa agentes de IA para ventas y soporte, automatización operativa, predicción de demanda y dashboards ejecutivos. Soluciones de inteligencia artificial para empresas de Latinoamérica con equipo basado en Ecuador.",
};

export default function Home() {
  return (
    <>
      <NexalForgeLandingWireframe />

      {/* Schema.org: Service */}
      <JsonLd
        id="service-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Agentes de IA y Automatización",
          provider: { "@type": "Organization", name: "NexalForge" },
          areaServed: "Latin America",
          serviceType:
            "Implementación de agentes de IA para ventas/soporte y automatización operativa",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
          },
        }}
      />

      {/* Schema.org: FAQPage (asegúrate de que coincidan con tu UI) */}
      <JsonLd
        id="faq-jsonld"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "¿Cuánto tarda ver resultados?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Medimos un KPI en 2–3 semanas tras el primer sprint.",
              },
            },
            {
              "@type": "Question",
              name: "¿Qué acceso necesitan?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Accesos mínimos con cuentas de servicio y registro de acciones.",
              },
            },
            {
              "@type": "Question",
              name: "¿Qué pasa si no vemos impacto?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ajustamos sin costo el primer mes o pausamos el proyecto.",
              },
            },
          ],
        }}
      />
    </>
  );
}
