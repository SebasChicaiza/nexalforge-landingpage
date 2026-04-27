import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import {
  LEGAL_COMPANY_NAME,
  PADDLE_REFUND_POLICY_URL,
  PADDLE_REFUND_WINDOWS,
  PRODUCT_NAME,
  TRADE_NAME,
} from "@/lib/legal";
import CompanyIdentificationBlock from "@/components/CompanyIdentificationBlock";

export const metadata: Metadata = {
  title: "Política de Reembolsos | Nexal Forge",
  description:
    "Política de reembolsos para compras de Nexi procesadas por Paddle.",
  alternates: { canonical: "/refunds" },
};

const introText = (
  <>
    Las compras de {PRODUCT_NAME} procesadas por Paddle se rigen por la{" "}
    <a
      href={PADDLE_REFUND_POLICY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ver política oficial de Paddle (abre en una nueva pestaña)"
      title="Ver política oficial de Paddle"
      className="underline text-rose-700 hover:text-rose-800"
    >
      Política de Reembolsos de Paddle
    </a>{" "}
    y la legislación aplicable.
  </>
);

const sections: LegalSection[] = [
  {
    id: "alcance",
    title: "1. Alcance",
    content: (
      <>
        <p>
          Esta política aplica a las compras de suscripciones y cargos de
          implementación de {PRODUCT_NAME} cuando el pago es procesado por
          Paddle. {LEGAL_COMPANY_NAME}, que opera comercialmente como{" "}
          {TRADE_NAME}, no reemplaza ni modifica la política de Paddle.
        </p>
        <div className="mt-4">
          <CompanyIdentificationBlock />
        </div>
      </>
    ),
  },
  {
    id: "plazos",
    title: "2. Plazos para solicitar reembolso",
    content: (
      <>
        <p>
          Según la ubicación del comprador y la legislación aplicable, el plazo
          para solicitar un reembolso puede ser:
        </p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          {PADDLE_REFUND_WINDOWS.map((item) => (
            <li key={item.regions}>
              {item.days} días desde la fecha de la transacción para
              compradores en {item.regions}.
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "solicitud",
    title: "3. Cómo solicitar un reembolso",
    content: (
      <p>
        Las solicitudes deben iniciarse a través del recibo de Paddle, del
        enlace de gestión de suscripción o por los canales de soporte indicados
        por Paddle.
      </p>
    ),
  },
  {
    id: "evaluacion-proceso",
    title: "4. Elegibilidad y procesamiento",
    content: (
      <p>
        La elegibilidad y el procesamiento de cualquier reembolso se regirán
        por la{" "}
        <a
          href={PADDLE_REFUND_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver política oficial de Paddle (abre en una nueva pestaña)"
          title="Ver política oficial de Paddle"
          className="underline text-rose-700 hover:text-rose-800"
        >
          política de Paddle
        </a>{" "}
        y la legislación aplicable al comprador.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "5. Contacto",
    content: (
      <p>
        Si necesitas ayuda para ubicar tu recibo o identificar la compra,
        escríbenos a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline text-rose-700 hover:text-rose-800">
          {CONTACT_EMAIL}
        </a>.
      </p>
    ),
  },
];

export default function RefundsPage() {
  return (
    <LegalPageLayout
      title="Política de Reembolsos"
      introText={introText}
      sections={sections}
    />
  );
}
