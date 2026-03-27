import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import CompanyIdentificationBlock from "@/components/CompanyIdentificationBlock";
import {
  LEGAL_COMPANY_NAME,
  PRODUCT_NAME,
  TRADE_NAME,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos de Servicio | Nexal Forge",
  description: "Términos de Servicio de Nexal Forge y el uso de nuestra plataforma Nexi.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "identificacion",
    title: "1. Identificación",
    content: (
      <>
        <p>
          Estos Términos de Servicio regulan el acceso y uso de los servicios
          ofrecidos por <strong>{LEGAL_COMPANY_NAME}</strong>, que opera
          comercialmente como <strong>{TRADE_NAME}</strong>.
        </p>
        <div className="mt-4">
          <CompanyIdentificationBlock />
        </div>
      </>
    ),
  },
  {
    id: "que-ofrecemos",
    title: "2. Qué ofrecemos",
    content: (
      <p>
        {TRADE_NAME} ofrece acceso por suscripción a {PRODUCT_NAME}, una
        plataforma de software como servicio (SaaS) para automatización de
        comunicación con clientes, gestión de conversaciones, calificación de
        leads y apoyo en procesos operativos de negocio.
      </p>
    ),
  },
  {
    id: "alcance-modalidad",
    title: "3. Alcance y modalidad",
    content: (
      <>
        <p>
          El cliente adquiere una licencia limitada, no exclusiva, no
          transferible y revocable para usar la plataforma conforme al plan
          contratado.
        </p>
        <p className="mt-2">
          La oferta principal es el acceso al software. En algunos casos,
          podemos prestar onboarding, setup o configuración inicial para
          implementar {PRODUCT_NAME}; estas actividades son auxiliares al SaaS y
          no constituyen un servicio independiente de agencia.
        </p>
      </>
    ),
  },
  {
    id: "planes-pagos-renovacion",
    title: "4. Planes, pagos y renovación",
    content: (
      <p>
        Los planes se cobran de forma mensual o conforme a la modalidad
        contratada. Salvo que se indique lo contrario, las suscripciones se
        renuevan automáticamente al final de cada período de facturación.
      </p>
    ),
  },
  {
    id: "onboarding-setup",
    title: "5. Implementación",
    content: (
      <p>
        En caso de aplicar un cargo de implementación, este corresponderá a la
        configuración inicial, personalización o puesta en marcha del software.
      </p>
    ),
  },
  {
    id: "obligaciones-cliente",
    title: "6. Obligaciones del cliente",
    content: (
      <p>
        El cliente se compromete a proporcionar información veraz, no usar la plataforma para fines ilícitos, y no intentar copiar, revender o explotar indebidamente el software.
      </p>
    ),
  },
  {
    id: "uso-aceptable",
    title: "7. Uso aceptable",
    content: (
      <p>
        No se permite usar la plataforma para fraude, spam, actividades ilegales, vulneración de derechos de terceros o cualquier uso prohibido por la ley o por las políticas aplicables.
      </p>
    ),
  },
  {
    id: "disponibilidad-soporte",
    title: "8. Disponibilidad y soporte",
    content: (
      <p>
        {LEGAL_COMPANY_NAME} hará esfuerzos razonables para mantener el
        servicio disponible, pero no garantiza disponibilidad ininterrumpida ni
        ausencia total de errores.
      </p>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "9. Propiedad intelectual",
    content: (
      <p>
        Todo el software, marcas, diseños, contenidos y elementos tecnológicos
        de la plataforma son propiedad de {LEGAL_COMPANY_NAME} o de sus
        licenciantes.
      </p>
    ),
  },
  {
    id: "terminacion",
    title: "10. Terminación",
    content: (
      <p>
        {LEGAL_COMPANY_NAME} podrá suspender o terminar el acceso en caso de
        incumplimiento. El cliente podrá cancelar conforme a la política de
        cancelación vigente.
      </p>
    ),
  },
  {
    id: "limitacion-responsabilidad",
    title: "11. Limitación de responsabilidad",
    content: (
      <p>
        En la máxima medida permitida por la ley, {LEGAL_COMPANY_NAME} no será
        responsable por daños indirectos, pérdida de ingresos, pérdida de datos
        o interrupciones derivadas del uso del servicio.
      </p>
    ),
  },
  {
    id: "modificaciones",
    title: "12. Modificaciones",
    content: (
      <p>
        {LEGAL_COMPANY_NAME} podrá actualizar estos términos publicando una
        nueva versión en el sitio web.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "13. Contacto",
    content: (
      <p>
        Correo de contacto:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline text-rose-700 hover:text-rose-800">
          {CONTACT_EMAIL}
        </a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title={`Términos de Servicio de ${TRADE_NAME}`}
      sections={sections}
    />
  );
}
