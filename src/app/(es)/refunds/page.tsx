import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import {
  CONTACT_EMAIL,
  LEGAL_COMPANY_NAME,
  PADDLE_REFUND_POLICY_URL,
  PRODUCT_NAME,
  TRADE_NAME,
} from "@/lib/legal";
import CompanyIdentificationBlock from "@/components/CompanyIdentificationBlock";

export const metadata: Metadata = {
  title: "Política de Reembolsos y Cancelación | Nexal Forge",
  description:
    "Política de reembolsos y cancelación para compras de Nexi procesadas por Paddle. Reembolso completo dentro de los primeros 14 días calendario.",
  alternates: { canonical: "/refunds" },
};

const introText = (
  <>
    Esta Política de Reembolsos y Cancelación aplica a las compras de{" "}
    {PRODUCT_NAME} procesadas por Paddle. {PRODUCT_NAME} es un producto SaaS de{" "}
    {LEGAL_COMPANY_NAME}, que opera comercialmente como {TRADE_NAME}. Paddle
    actúa como reseller autorizado y Merchant of Record para las compras
    procesadas a través de Paddle.
  </>
);

const sections: LegalSection[] = [
  {
    id: "reembolso-14-dias",
    title: "1. Reembolso de 14 días por compra inicial",
    content: (
      <>
        <p>
          Ofrecemos un reembolso completo durante los primeros 14 días
          calendario desde la fecha de tu compra inicial de {PRODUCT_NAME}{" "}
          procesada por Paddle.
        </p>
        <p className="mt-3">
          No necesitas explicar el motivo de tu solicitud. Si solicitas el
          reembolso dentro de ese plazo de 14 días calendario, la solicitud
          será procesada conforme a los canales y controles de Paddle.
        </p>
        <p className="mt-3">
          Esta ventana voluntaria de 14 días aplica a la primera transacción
          pagada de {PRODUCT_NAME} para una cuenta o workspace. Si tu compra
          inicial de {PRODUCT_NAME} incluye un pago de suscripción, cargo de
          setup, cargo de implementación u otro cargo inicial de {PRODUCT_NAME}{" "}
          procesado por Paddle, esos cargos iniciales están incluidos en esta
          ventana de 14 días.
        </p>
      </>
    ),
  },
  {
    id: "renovaciones-cargos-posteriores",
    title: "2. Renovaciones y cargos posteriores",
    content: (
      <>
        <p>
          La ventana voluntaria de 14 días no aplica automáticamente a
          renovaciones de suscripción, cargos recurrentes posteriores,
          renovaciones de plan, cargos adicionales por uso, complementos o
          cargos separados realizados después de la compra inicial de{" "}
          {PRODUCT_NAME}.
        </p>
        <p className="mt-3">
          Después de la ventana inicial de 14 días calendario, las solicitudes
          de reembolso se gestionarán conforme a la{" "}
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
        </p>
        <p className="mt-3">
          Nada en esta política limita derechos obligatorios que puedas tener
          bajo la ley aplicable de tu país o región.
        </p>
      </>
    ),
  },
  {
    id: "solicitud",
    title: "3. Cómo solicitar un reembolso",
    content: (
      <>
        <p>Para solicitar un reembolso, utiliza uno de estos canales:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>
            el enlace &ldquo;View receipt&rdquo; o &ldquo;Manage
            subscription&rdquo; incluido en el correo de confirmación enviado
            por Paddle;
          </li>
          <li>
            el portal o enlace de soporte indicado por Paddle;
          </li>
          <li>el soporte de Paddle para compradores;</li>
          <li>
            o escríbenos a{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline text-rose-700 hover:text-rose-800"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            si necesitas ayuda para identificar tu compra.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cancelacion",
    title: "4. Cancelación de suscripciones",
    content: (
      <>
        <p>
          Puedes cancelar tu suscripción para evitar futuros cobros. La
          cancelación impide futuras renovaciones, pero no genera
          automáticamente un reembolso de pagos ya realizados, salvo que la
          solicitud de reembolso se realice dentro de la ventana inicial de
          reembolso de 14 días calendario, que Paddle lo requiera conforme a su
          Política de Reembolsos, o que la ley aplicable lo exija.
        </p>
        <p className="mt-3">
          Si cancelas una suscripción, normalmente mantendrás acceso a{" "}
          {PRODUCT_NAME} hasta el final del período de facturación vigente,
          salvo que un reembolso sea aprobado y el acceso deba terminar
          conforme a la política de Paddle.
        </p>
      </>
    ),
  },
  {
    id: "procesamiento",
    title: "5. Procesamiento del reembolso",
    content: (
      <p>
        Los reembolsos de compras procesadas por Paddle son procesados por
        Paddle. Cuando el reembolso sea aprobado, Paddle normalmente lo procesa
        al método de pago original cuando sea posible. Paddle puede realizar
        controles para prevenir fraude, abuso de reembolsos, disputas
        manipulativas, actividad no autorizada u otros usos indebidos.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "6. Soporte",
    content: (
      <>
        <p>
          Si tienes preguntas sobre una compra, cancelación o reembolso de{" "}
          {PRODUCT_NAME}, puedes contactarnos en{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline text-rose-700 hover:text-rose-800"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <div className="mt-4">
          <CompanyIdentificationBlock />
        </div>
      </>
    ),
  },
];

export default function RefundsPage() {
  return (
    <LegalPageLayout
      title="Política de Reembolsos y Cancelación"
      lastUpdated="abril de 2026"
      introText={introText}
      sections={sections}
    />
  );
}
