import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import { PRODUCT_NAME, TRADE_NAME } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Cookies | Nexal Forge",
  description:
    "Cómo Nexal Forge usa cookies y tecnologías similares en nexalforge.com y en servicios relacionados con Nexi.",
  alternates: { canonical: "/cookies" },
};

const introText = (
  <>
    Esta Política de Cookies explica cómo {TRADE_NAME} usa cookies y tecnologías
    similares en nexalforge.com y en servicios relacionados con {PRODUCT_NAME}.
  </>
);

const sections: LegalSection[] = [
  {
    id: "que-son",
    title: "1. Qué son las cookies",
    content: (
      <p>
        Las cookies son pequeños archivos o identificadores que un sitio web
        puede guardar en tu navegador o dispositivo. Sirven para recordar
        preferencias, mantener sesiones, medir uso, mejorar seguridad o
        habilitar funcionalidades.
      </p>
    ),
  },
  {
    id: "tipos",
    title: "2. Tipos de cookies que usamos",
    content: (
      <div className="space-y-5">
        <div>
          <p className="font-semibold text-gray-900">Cookies esenciales</p>
          <p className="mt-1">
            Son necesarias para mostrar el sitio, mantener sesiones, recordar
            elecciones básicas, proteger formularios, gestionar seguridad y
            permitir funciones principales del sitio o del panel.
          </p>
          <p className="mt-2">
            Si bloqueas cookies esenciales, algunas partes del sitio o del
            producto pueden no funcionar correctamente.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Cookies de preferencias</p>
          <p className="mt-1">
            Nos ayudan a recordar elecciones como idioma, región, consentimiento
            de cookies o preferencias de navegación.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Cookies de analítica</p>
          <p className="mt-1">
            Podemos usar herramientas de analítica, como Google Analytics o
            Google Tag Manager, para entender uso agregado del sitio, rendimiento
            de páginas, fuentes de tráfico y eventos de conversión.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Cookies de marketing</p>
          <p className="mt-1">
            Podemos usar cookies o píxeles de marketing para medir campañas,
            atribución, anuncios o conversiones. Cuando la ley lo requiera,
            estas cookies se usarán con consentimiento.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            Cookies de pagos y checkout
          </p>
          <p className="mt-1">
            Cuando interactúas con un checkout, pago, recibo o gestión de
            suscripción procesada por Paddle, Paddle puede usar cookies o
            tecnologías similares necesarias para procesar pagos, prevenir
            fraude, gestionar seguridad, recordar sesión de checkout, cumplir
            obligaciones legales o mejorar la experiencia de compra. El uso de
            cookies por Paddle se rige por las políticas de Paddle.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "gestion",
    title: "3. Gestión de cookies",
    content: (
      <>
        <p>
          Puedes aceptar, rechazar o gestionar cookies no esenciales desde el
          banner o panel de consentimiento cuando esté disponible.
        </p>
        <p className="mt-3">
          También puedes bloquear o eliminar cookies desde la configuración de tu
          navegador. Si bloqueas cookies esenciales, algunas funciones pueden
          dejar de operar correctamente.
        </p>
      </>
    ),
  },
  {
    id: "datos-personales",
    title: "4. Datos personales",
    content: (
      <p>
        Algunas cookies pueden estar asociadas con datos personales como IP,
        identificadores de dispositivo, eventos de navegación o información
        técnica. Para más información, consulta nuestra{" "}
        <a
          href="/privacy"
          className="underline text-rose-700 hover:text-rose-800"
        >
          Política de Privacidad
        </a>
        .
      </p>
    ),
  },
  {
    id: "cambios",
    title: "5. Cambios",
    content: (
      <p>
        Podemos actualizar esta Política de Cookies para reflejar cambios
        técnicos, legales o de proveedores.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "6. Contacto",
    content: (
      <p>
        Para preguntas sobre cookies o privacidad, escríbenos a{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="underline text-rose-700 hover:text-rose-800"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Política de Cookies"
      lastUpdated="abril de 2026"
      introText={introText}
      sections={sections}
    />
  );
}
