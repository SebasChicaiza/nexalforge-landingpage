import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos de Servicio | Nexal Forge",
  description: "Términos de Servicio de Nexal Forge y el uso de nuestra plataforma Nexi.",
};

const sections: LegalSection[] = [
  {
    id: "identificacion",
    title: "1. Identificación",
    content: (
      <p>
        Estos Términos de Servicio regulan el acceso y uso de los productos y servicios ofrecidos por Nexal Forge a través de su plataforma Nexi y su sitio web.
      </p>
    ),
  },
  {
    id: "que-ofrecemos",
    title: "2. Qué ofrecemos",
    content: (
      <p>
        Nexal Forge ofrece acceso a una plataforma de software como servicio (SaaS) orientada a la automatización de comunicación con clientes, gestión de conversaciones, calificación de leads y apoyo en procesos operativos de negocios.
      </p>
    ),
  },
  {
    id: "naturaleza-servicio",
    title: "3. Naturaleza del servicio",
    content: (
      <p>
        El cliente adquiere una licencia limitada, no exclusiva, no transferible y revocable para usar la plataforma conforme al plan contratado.
      </p>
    ),
  },
  {
    id: "planes-pagos-renovacion",
    title: "4. Planes, pagos y renovación",
    content: (
      <p>
        Los planes se cobran de forma mensual o conforme a la modalidad contratada. Salvo que se indique lo contrario, las suscripciones se renuevan automáticamente al final de cada período de facturación.
      </p>
    ),
  },
  {
    id: "implementacion",
    title: "5. Implementación",
    content: (
      <p>
        En caso de aplicar un cargo de implementación, este corresponderá a la configuración inicial, personalización o puesta en marcha del software.
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
        Nexal Forge hará esfuerzos razonables para mantener el servicio disponible, pero no garantiza disponibilidad ininterrumpida ni ausencia total de errores.
      </p>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "9. Propiedad intelectual",
    content: (
      <p>
        Todo el software, marcas, diseños, contenidos y elementos tecnológicos de la plataforma son propiedad de Nexal Forge o de sus licenciantes.
      </p>
    ),
  },
  {
    id: "terminacion",
    title: "10. Terminación",
    content: (
      <p>
        Nexal Forge podrá suspender o terminar el acceso en caso de incumplimiento. El cliente podrá cancelar conforme a la política de cancelación vigente.
      </p>
    ),
  },
  {
    id: "limitacion-responsabilidad",
    title: "11. Limitación de responsabilidad",
    content: (
      <p>
        En la máxima medida permitida por la ley, Nexal Forge no será responsable por daños indirectos, pérdida de ingresos, pérdida de datos o interrupciones derivadas del uso del servicio.
      </p>
    ),
  },
  {
    id: "modificaciones",
    title: "12. Modificaciones",
    content: (
      <p>
        Nexal Forge podrá actualizar estos términos publicando una nueva versión en el sitio web.
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
      title="Términos de Servicio de Nexal Forge"
      sections={sections}
    />
  );
}
