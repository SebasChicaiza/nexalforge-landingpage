import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import CompanyIdentificationBlock from "@/components/CompanyIdentificationBlock";
import {
  LEGAL_COMPANY_NAME,
  PADDLE_REFUND_POLICY_URL,
  PRODUCT_NAME,
  TRADE_NAME,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos de Servicio | Nexal Forge",
  description:
    "Términos de Servicio que regulan el acceso y uso de Nexi, la plataforma SaaS de Nexal Forge.",
  alternates: { canonical: "/terms" },
};

const introText = (
  <>
    Estos Términos de Servicio regulan el acceso y uso de {PRODUCT_NAME}, un
    producto SaaS ofrecido por {LEGAL_COMPANY_NAME}, que opera comercialmente
    como {TRADE_NAME}. Al contratar, acceder o usar {PRODUCT_NAME}, aceptas
    estos Términos.
  </>
);

const sections: LegalSection[] = [
  {
    id: "identificacion",
    title: "Identificación",
    content: (
      <CompanyIdentificationBlock />
    ),
  },
  {
    id: "que-es-nexi",
    title: "1. Qué es Nexi",
    content: (
      <>
        <p>
          {PRODUCT_NAME} es una plataforma de software como servicio (SaaS)
          diseñada para ayudar a negocios de servicios a gestionar
          conversaciones con clientes, responder consultas, calificar leads,
          apoyar flujos de reserva, orientar a usuarios sobre servicios
          disponibles y facilitar entregas de contexto al equipo humano del
          negocio.
        </p>
        <p className="mt-3">
          {PRODUCT_NAME} no es un chatbot genérico, una agencia humana, un
          servicio de call center humano ni un sustituto de decisiones
          profesionales o legales del cliente. La oferta principal es el acceso
          al software.
        </p>
        <p className="mt-3">
          En algunos casos, {TRADE_NAME} puede ofrecer onboarding, configuración
          inicial, carga de información del negocio o soporte de
          implementación. Estas actividades son auxiliares al uso del software
          y no se venden como consultoría independiente, agencia, call center
          humano, servicio profesional gestionado ni sustituto de personal
          humano del cliente.
        </p>
      </>
    ),
  },
  {
    id: "clientes-uso-permitido",
    title: "2. Clientes y uso permitido",
    content: (
      <>
        <p>
          {PRODUCT_NAME} está dirigido a negocios y equipos que usan el producto
          para fines comerciales legítimos. El cliente es responsable de que su
          uso de {PRODUCT_NAME} cumpla con las leyes, regulaciones, políticas de
          plataforma y obligaciones aplicables en su país o región.
        </p>
        <p className="mt-3">
          {PRODUCT_NAME} puede estar disponible para clientes en diferentes
          países, sujeto a disponibilidad técnica, comercial, legal y de los
          proveedores externos utilizados para operar el servicio.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidades-cliente",
    title: "3. Responsabilidades del cliente",
    content: (
      <>
        <p>
          El cliente es responsable de proporcionar información completa,
          actualizada y veraz sobre su negocio, incluyendo servicios, precios,
          promociones, ubicaciones, horarios, disponibilidad, políticas de
          reserva, políticas de cancelación, datos de contacto, instrucciones
          de atención y cualquier otra información necesaria para configurar{" "}
          {PRODUCT_NAME}.
        </p>
        <p className="mt-3">
          El cliente es responsable de revisar y mantener actualizada la
          información usada por {PRODUCT_NAME}. {TRADE_NAME} no es responsable
          por errores derivados de información incorrecta, incompleta,
          desactualizada o ambigua proporcionada por el cliente.
        </p>
        <p className="mt-3">
          El cliente también es responsable de sus propias políticas
          comerciales, cumplimiento legal, relación con sus consumidores,
          autorizaciones de contacto, consentimiento para comunicaciones,
          cumplimiento de normas de privacidad, reglas de plataformas de
          mensajería y cualquier obligación aplicable a su industria.
        </p>
      </>
    ),
  },
  {
    id: "limitaciones-ia",
    title: "4. Limitaciones de la IA",
    content: (
      <>
        <p>
          {PRODUCT_NAME} utiliza sistemas de automatización e inteligencia
          artificial. Aunque buscamos que las respuestas sean útiles, precisas
          y consistentes con la información disponible, los resultados generados
          por IA pueden contener errores, omisiones, interpretaciones
          incompletas o respuestas no adecuadas para todos los casos.
        </p>
        <p className="mt-3">
          {PRODUCT_NAME} no garantiza reservas, ventas, ingresos, conversión de
          leads, retención de clientes, disponibilidad perfecta, respuestas
          perfectas ni ausencia total de errores.
        </p>
        <p className="mt-3">
          El cliente debe revisar las respuestas, configuraciones y flujos de{" "}
          {PRODUCT_NAME} cuando sea necesario, especialmente en situaciones
          sensibles, inusuales, ambiguas o de alto impacto para su negocio.
        </p>
      </>
    ),
  },
  {
    id: "usos-prohibidos",
    title: "5. Usos prohibidos",
    content: (
      <>
        <p>No puedes usar {PRODUCT_NAME} para:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>
            actividades ilegales, fraudulentas, engañosas, abusivas o
            predatorias;
          </li>
          <li>
            spam, suplantación de identidad, manipulación o comunicaciones no
            autorizadas;
          </li>
          <li>
            vulnerar derechos de terceros, privacidad, propiedad intelectual o
            términos de plataformas externas;
          </li>
          <li>
            enviar contenido discriminatorio, abusivo, amenazante, sexualmente
            explícito, violento o dañino;
          </li>
          <li>
            ofrecer servicios o productos prohibidos por la ley o por nuestros
            proveedores de pagos, mensajería, infraestructura o IA;
          </li>
          <li>
            tomar decisiones médicas, legales, financieras, de emergencia, de
            seguridad crítica o de alto riesgo;
          </li>
          <li>
            vender, revender, copiar, modificar, descompilar o explotar
            indebidamente el software;
          </li>
          <li>
            intentar acceder a sistemas, datos o cuentas sin autorización.
          </li>
        </ul>
        <p className="mt-3">
          {PRODUCT_NAME} no debe utilizarse como producto médico, sistema
          clínico, herramienta de diagnóstico, asesoría legal, asesoría
          financiera, sistema de emergencia ni sustituto de profesionales
          calificados.
        </p>
        <p className="mt-3">
          Los flujos médicos, med-spa clínicos, sanitarios o regulados no
          forman parte del alcance estándar de {PRODUCT_NAME}, salvo acuerdo
          separado, revisión legal y configuración específica aprobada por{" "}
          {TRADE_NAME}.
        </p>
      </>
    ),
  },
  {
    id: "integraciones-terceros",
    title: "6. Integraciones y terceros",
    content: (
      <>
        <p>
          {PRODUCT_NAME} puede integrarse o depender de servicios externos, como
          plataformas de mensajería, redes sociales, sistemas de reservas,
          calendarios, CRMs, proveedores de infraestructura, herramientas de
          analítica, proveedores de IA y Paddle para pagos.
        </p>
        <p className="mt-3">
          El uso de esos servicios puede estar sujeto a términos, políticas,
          límites técnicos, disponibilidad y decisiones de terceros.{" "}
          {TRADE_NAME} no controla completamente esos servicios externos y no
          será responsable por fallas, cambios, interrupciones, suspensiones o
          restricciones impuestas por ellos.
        </p>
      </>
    ),
  },
  {
    id: "planes-pagos-paddle",
    title: "7. Planes, pagos y Paddle",
    content: (
      <>
        <p>
          Los planes, precios, cargos de implementación, límites de uso y
          características incluidas serán los indicados en la página de precios,
          cotización, checkout, contrato u orden aplicable.
        </p>
        <p className="mt-3">
          Cuando una compra sea procesada por Paddle, Paddle actúa como
          reseller autorizado y Merchant of Record. Paddle gestiona el proceso
          de orden, pago, impuestos aplicables, facturación, recibos y soporte
          relacionado con la transacción, conforme a sus propios términos y
          políticas.
        </p>
        <p className="mt-3">
          Paddle puede aparecer en tu estado de cuenta, extracto bancario o
          tarjeta como el comerciante relacionado con la compra.
        </p>
        <p className="mt-3">
          Las suscripciones se renuevan automáticamente al final de cada
          período de facturación, salvo que se cancelen antes de la siguiente
          renovación. Al contratar una suscripción, autorizas el cobro
          recurrente conforme al plan seleccionado. Los impuestos aplicables
          pueden ser calculados, cobrados y gestionados por Paddle según
          corresponda.
        </p>
      </>
    ),
  },
  {
    id: "cancelaciones-reembolsos",
    title: "8. Cancelaciones y reembolsos",
    content: (
      <>
        <p>
          Puedes cancelar tu suscripción para evitar futuros cobros. La
          cancelación normalmente tendrá efecto al final del período de
          facturación vigente.
        </p>
        <p className="mt-3">
          Los reembolsos se rigen por nuestra{" "}
          <a
            href="/refunds"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Política de Reembolsos y Cancelación
          </a>
          , la{" "}
          <a
            href={PADDLE_REFUND_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Política de Reembolsos de Paddle
          </a>{" "}
          y la legislación aplicable.
        </p>
        <p className="mt-3">
          Ofrecemos un reembolso completo durante los primeros 14 días
          calendario desde la fecha de la compra inicial de {PRODUCT_NAME}{" "}
          procesada por Paddle, sin necesidad de explicar el motivo. Esta
          ventana voluntaria aplica únicamente a la compra inicial y no se
          extiende automáticamente a renovaciones ni cargos posteriores.
          Consulta nuestra{" "}
          <a
            href="/refunds"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Política de Reembolsos y Cancelación
          </a>{" "}
          para más detalles.
        </p>
      </>
    ),
  },
  {
    id: "disponibilidad-soporte",
    title: "9. Disponibilidad y soporte",
    content: (
      <>
        <p>
          Haremos esfuerzos razonables para mantener {PRODUCT_NAME} disponible y
          funcionando correctamente. Sin embargo, no garantizamos
          disponibilidad ininterrumpida, ausencia total de errores,
          compatibilidad permanente con todos los servicios externos ni
          recuperación inmediata ante incidentes.
        </p>
        <p className="mt-3">
          Podemos realizar mantenimiento, actualizaciones, cambios técnicos o
          ajustes de seguridad que afecten temporalmente el acceso o
          funcionamiento del servicio.
        </p>
      </>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "10. Propiedad intelectual",
    content: (
      <>
        <p>
          {TRADE_NAME} y sus licenciantes conservan todos los derechos sobre{" "}
          {PRODUCT_NAME}, incluyendo software, diseños, modelos, marcas, textos,
          interfaces, procesos, documentación y tecnología relacionada.
        </p>
        <p className="mt-3">
          El cliente recibe una licencia limitada, revocable, no exclusiva, no
          transferible y no sublicenciable para usar {PRODUCT_NAME} conforme al
          plan contratado y estos Términos.
        </p>
        <p className="mt-3">
          El cliente conserva los derechos sobre la información de su negocio y
          los datos que proporcione o cargue en {PRODUCT_NAME}, sujeto a las
          autorizaciones necesarias para que {TRADE_NAME} pueda prestar, operar,
          mejorar y dar soporte al servicio.
        </p>
      </>
    ),
  },
  {
    id: "datos-privacidad",
    title: "11. Datos y privacidad",
    content: (
      <>
        <p>
          El tratamiento de datos personales se describe en nuestra{" "}
          <a
            href="/privacy"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Política de Privacidad
          </a>
          .
        </p>
        <p className="mt-3">
          El cliente declara que tiene los derechos, permisos y bases legales
          necesarias para proporcionar a {PRODUCT_NAME} datos de su negocio,
          equipo, clientes, prospectos, conversaciones, canales e integraciones.
        </p>
      </>
    ),
  },
  {
    id: "suspension-terminacion",
    title: "12. Suspensión o terminación",
    content: (
      <>
        <p>
          Podemos suspender o terminar el acceso a {PRODUCT_NAME} si detectamos
          incumplimiento de estos Términos, uso prohibido, riesgo legal, riesgo
          de seguridad, fraude, abuso, falta de pago, solicitud de un proveedor
          externo, orden de autoridad competente o uso que pueda afectar a{" "}
          {TRADE_NAME}, Paddle, nuestros proveedores, otros clientes o terceros.
        </p>
        <p className="mt-3">
          El cliente puede dejar de usar {PRODUCT_NAME} y cancelar su
          suscripción conforme a la modalidad aplicable.
        </p>
      </>
    ),
  },
  {
    id: "limitacion-responsabilidad",
    title: "13. Limitación de responsabilidad",
    content: (
      <>
        <p>
          En la máxima medida permitida por la ley, {TRADE_NAME} no será
          responsable por daños indirectos, incidentales, especiales,
          consecuenciales, pérdida de ingresos, pérdida de beneficios, pérdida
          de oportunidades comerciales, pérdida de datos, interrupción del
          negocio, daño reputacional o reclamaciones derivadas del uso o
          imposibilidad de uso de {PRODUCT_NAME}.
        </p>
        <p className="mt-3">
          La responsabilidad total de {TRADE_NAME} por cualquier reclamación
          relacionada con {PRODUCT_NAME} no excederá el monto pagado por el
          cliente por el servicio afectado durante los tres meses anteriores al
          evento que originó la reclamación, salvo que la ley aplicable exija
          otro límite.
        </p>
        <p className="mt-3">
          Nada en estos Términos limita derechos que no puedan limitarse bajo
          la ley aplicable.
        </p>
      </>
    ),
  },
  {
    id: "cambios",
    title: "14. Cambios en el servicio o en estos Términos",
    content: (
      <>
        <p>
          Podemos actualizar {PRODUCT_NAME}, sus funcionalidades, integraciones,
          planes, precios o estos Términos para reflejar cambios técnicos,
          comerciales, legales o de seguridad.
        </p>
        <p className="mt-3">
          Cuando un cambio sea material, haremos esfuerzos razonables para
          comunicarlo por el sitio web, correo electrónico, panel del producto u
          otro canal apropiado.
        </p>
      </>
    ),
  },
  {
    id: "ley-aplicable",
    title: "15. Ley aplicable",
    content: (
      <p>
        Estos Términos se regirán por las leyes de Ecuador, salvo que leyes
        obligatorias de protección al consumidor, privacidad u otras normas
        aplicables establezcan derechos que no puedan ser limitados por
        contrato.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "16. Contacto",
    content: (
      <p>
        Para soporte, preguntas sobre estos Términos o información sobre{" "}
        {PRODUCT_NAME}, puedes escribirnos a{" "}
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

export default function TermsPage() {
  return (
    <LegalPageLayout
      title={`Términos de Servicio de ${TRADE_NAME}`}
      lastUpdated="abril de 2026"
      introText={introText}
      sections={sections}
    />
  );
}
