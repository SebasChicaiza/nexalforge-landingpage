import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Reembolsos | Nexal Forge",
  description: "Política de reembolsos de Nexal Forge.",
};

const introText = "En Nexal Forge buscamos transparencia en nuestras ventas y suscripciones.";

const sections: LegalSection[] = [
  {
    id: "suscripciones",
    title: "1. Suscripciones",
    content: (
      <p>
        Los pagos de suscripción son, por regla general, no reembolsables una vez iniciado el período de facturación, salvo que la ley aplicable disponga lo contrario o que Nexal Forge determine lo contrario a su discreción en casos justificados.
      </p>
    ),
  },
  {
    id: "implementacion",
    title: "2. Implementación",
    content: (
      <p>
        Los pagos únicos por implementación, configuración o setup no son reembolsables una vez iniciado el trabajo, salvo acuerdo expreso en contrario.
      </p>
    ),
  },
  {
    id: "cobros-duplicados",
    title: "3. Cobros duplicados o errores",
    content: (
      <p>
        Si un cliente considera que existió un cobro duplicado, erróneo o no autorizado, deberá contactarnos dentro de un plazo razonable para revisar el caso.
      </p>
    ),
  },
  {
    id: "cancelacion",
    title: "4. Cancelación",
    content: (
      <p>
        La cancelación de una suscripción evita renovaciones futuras, pero no genera automáticamente devolución del período ya facturado, salvo indicación expresa.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "5. Contacto",
    content: (
      <p>
        Para consultas sobre reembolsos, escríbenos a:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline text-rose-700 hover:text-rose-800">
          {CONTACT_EMAIL}
        </a>
      </p>
    ),
  },
];

export default function RefundsPage() {
  return (
    <LegalPageLayout
      title="Política de Reembolsos de Nexal Forge"
      introText={introText}
      sections={sections}
    />
  );
}
