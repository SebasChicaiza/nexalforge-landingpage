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
  title: "Política de Privacidad | Nexal Forge",
  description: "Política de privacidad de Nexal Forge y el uso de datos en nuestra plataforma Nexi.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "quienes-somos",
    title: "1. Quiénes somos",
    content: (
      <>
        <p>
          <strong>{LEGAL_COMPANY_NAME}</strong>, que opera comercialmente como{" "}
          <strong>{TRADE_NAME}</strong>, es responsable del tratamiento de datos
          asociado a {PRODUCT_NAME} y a este sitio web.
        </p>
        <div className="mt-4">
          <CompanyIdentificationBlock />
        </div>
      </>
    ),
  },
  {
    id: "datos-recopilamos",
    title: "2. Qué datos recopilamos",
    content: (
      <>
        <p>Podemos recopilar datos como:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>nombre</li>
          <li>correo electrónico</li>
          <li>teléfono</li>
          <li>datos de empresa</li>
          <li>datos de uso de la plataforma</li>
          <li>dirección IP</li>
          <li>navegador</li>
          <li>dispositivo</li>
          <li>información necesaria para soporte, onboarding o configuración inicial</li>
        </ul>
      </>
    ),
  },
  {
    id: "uso-datos",
    title: "3. Para qué usamos los datos",
    content: (
      <>
        <p>Usamos los datos para:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>crear y administrar cuentas</li>
          <li>prestar el servicio SaaS</li>
          <li>facturar y gestionar pagos</li>
          <li>brindar soporte y onboarding de implementación</li>
          <li>mejorar el producto</li>
          <li>enviar comunicaciones operativas o comerciales, cuando corresponda</li>
        </ul>
      </>
    ),
  },
  {
    id: "base-tratamiento",
    title: "4. Base de tratamiento",
    content: (
      <p>
        Tratamos los datos para ejecutar la relación contractual, cumplir obligaciones legales, mejorar nuestros servicios y, cuando corresponda, con consentimiento del usuario.
      </p>
    ),
  },
  {
    id: "comparticion-terceros",
    title: "5. Compartición con terceros",
    content: (
      <p>
        Compartimos datos solo con proveedores necesarios para operar el servicio, como plataformas de pago, infraestructura, analítica, mensajería o soporte, bajo condiciones de confidencialidad y seguridad.
      </p>
    ),
  },
  {
    id: "conservacion",
    title: "6. Conservación",
    content: (
      <p>
        Conservamos los datos durante el tiempo necesario para prestar el servicio, cumplir obligaciones legales y resolver disputas.
      </p>
    ),
  },
  {
    id: "seguridad",
    title: "7. Seguridad",
    content: (
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger la información.
      </p>
    ),
  },
  {
    id: "derechos-usuario",
    title: "8. Derechos del usuario",
    content: (
      <p>
        El usuario puede solicitar acceso, corrección, actualización o eliminación de su información, sujeto a la legislación aplicable.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "9. Cambios",
    content: (
      <p>
        Podemos actualizar esta política publicando una nueva versión en el sitio.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "10. Contacto",
    content: (
      <p>
        Correo de privacidad o soporte:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline text-rose-700 hover:text-rose-800">
          {CONTACT_EMAIL}
        </a>
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title={`Política de Privacidad de ${TRADE_NAME}`}
      sections={sections}
    />
  );
}
