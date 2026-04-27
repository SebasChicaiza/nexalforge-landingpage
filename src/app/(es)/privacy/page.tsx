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
  description:
    "Cómo Nexal Forge recopila, usa, comparte y protege datos personales relacionados con Nexi y nexalforge.com.",
  alternates: { canonical: "/privacy" },
};

const introText = (
  <>
    Esta Política de Privacidad explica cómo {LEGAL_COMPANY_NAME}, que opera
    comercialmente como {TRADE_NAME}, recopila, usa, comparte y protege datos
    personales relacionados con {PRODUCT_NAME} y con el sitio nexalforge.com.
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
    id: "alcance",
    title: "1. Alcance",
    content: (
      <>
        <p>
          Esta política aplica a visitantes del sitio web, clientes comerciales
          de {PRODUCT_NAME}, usuarios autorizados del panel de {PRODUCT_NAME},
          contactos comerciales, prospectos y personas que interactúan con
          negocios que usan {PRODUCT_NAME}.
        </p>
        <p className="mt-3">
          {PRODUCT_NAME} es un producto SaaS usado por negocios para gestionar
          comunicaciones, leads, reservas, consultas y operaciones comerciales.
          En muchos casos, {TRADE_NAME} procesa datos por cuenta de sus clientes
          comerciales.
        </p>
      </>
    ),
  },
  {
    id: "datos-recopilamos",
    title: "2. Datos que podemos recopilar",
    content: (
      <>
        <p>
          Podemos recopilar o procesar las siguientes categorías de datos, según
          el uso del sitio, producto o canales conectados:
        </p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>
            datos de contacto, como nombre, correo electrónico, teléfono y
            empresa;
          </li>
          <li>
            datos de cuenta, como usuario, rol, permisos y configuración;
          </li>
          <li>
            datos comerciales del cliente, como servicios, precios, ubicaciones,
            horarios, equipo, proveedores, políticas internas y reglas de
            atención;
          </li>
          <li>
            datos de conversaciones, como mensajes enviados o recibidos por
            canales conectados, historial de interacción, contexto de atención,
            intención del usuario, preferencias de servicio y solicitudes de
            reserva;
          </li>
          <li>
            datos de leads o clientes finales, como nombre, teléfono, canal de
            contacto, interés comercial, servicio solicitado, ubicación
            preferida, horario preferido u otra información enviada durante la
            conversación;
          </li>
          <li>
            datos técnicos, como dirección IP, navegador, dispositivo, sistema
            operativo, registros de actividad, eventos de seguridad, errores y
            métricas de uso;
          </li>
          <li>datos de soporte, onboarding o implementación;</li>
          <li>
            datos de facturación limitados, como estado de suscripción,
            identificadores de transacción, plan contratado, recibos y datos
            necesarios para soporte comercial.
          </li>
        </ul>
        <p className="mt-3">
          Cuando el pago se realiza mediante Paddle, los datos de pago son
          gestionados por Paddle. {TRADE_NAME} no necesita recibir el número
          completo de tarjeta para operar {PRODUCT_NAME}.
        </p>
      </>
    ),
  },
  {
    id: "uso-datos",
    title: "3. Cómo usamos los datos",
    content: (
      <>
        <p>Usamos los datos para:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>operar, entregar y mantener {PRODUCT_NAME};</li>
          <li>crear y administrar cuentas;</li>
          <li>configurar el producto para cada cliente;</li>
          <li>
            procesar conversaciones, leads, reservas, respuestas y handoffs;
          </li>
          <li>brindar soporte, onboarding e implementación;</li>
          <li>
            gestionar facturación, suscripciones, pagos, cancelaciones y
            reembolsos;
          </li>
          <li>
            monitorear seguridad, prevenir fraude, resolver errores y proteger
            el servicio;
          </li>
          <li>
            mejorar la calidad, confiabilidad y utilidad del producto;
          </li>
          <li>analizar uso del sitio y rendimiento comercial;</li>
          <li>
            enviar comunicaciones operativas, administrativas o comerciales
            permitidas;
          </li>
          <li>
            cumplir obligaciones legales, contractuales o regulatorias.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "procesamiento-ia",
    title: "4. Procesamiento con IA",
    content: (
      <>
        <p>
          {PRODUCT_NAME} utiliza automatización e inteligencia artificial para
          ayudar a responder mensajes, clasificar solicitudes, resumir contexto,
          recomendar próximos pasos y asistir flujos operativos.
        </p>
        <p className="mt-3">
          Las respuestas generadas por IA pueden ser imperfectas. Los clientes
          de {PRODUCT_NAME} son responsables de proporcionar información correcta
          y de revisar los flujos, respuestas y datos relevantes cuando sea
          necesario.
        </p>
        <p className="mt-3">
          No usamos {PRODUCT_NAME} para prestar asesoría médica, legal,
          financiera, de emergencia o de alto riesgo. Los clientes no deben
          configurar {PRODUCT_NAME} para tomar decisiones reguladas o sensibles
          sin revisión humana y legal adecuada.
        </p>
      </>
    ),
  },
  {
    id: "datos-clientes-finales",
    title: "5. Datos de clientes finales",
    content: (
      <>
        <p>
          Cuando una persona interactúa con un negocio que usa {PRODUCT_NAME},
          podemos procesar sus datos en nombre de ese negocio para responder
          consultas, capturar leads, apoyar reservas, hacer seguimiento o
          entregar contexto al equipo humano del negocio.
        </p>
        <p className="mt-3">
          El negocio cliente es responsable de informar a sus propios clientes
          finales sobre el uso de herramientas como {PRODUCT_NAME} cuando la ley
          aplicable lo requiera, y de obtener consentimientos o bases legales
          necesarias para comunicaciones, integraciones y tratamiento de datos.
        </p>
      </>
    ),
  },
  {
    id: "bases-legales",
    title: "6. Bases legales o fundamentos de tratamiento",
    content: (
      <p>
        Dependiendo del país, región y relación aplicable, tratamos datos para
        ejecutar contratos, prestar el servicio, cumplir obligaciones legales,
        responder solicitudes, proteger intereses legítimos, mejorar el
        producto, prevenir abuso o con consentimiento cuando corresponda.
      </p>
    ),
  },
  {
    id: "terceros-proveedores",
    title: "7. Terceros y proveedores",
    content: (
      <>
        <p>
          Podemos compartir datos con proveedores necesarios para operar{" "}
          {PRODUCT_NAME}, incluyendo infraestructura cloud, proveedores de IA,
          servicios de mensajería, analítica, seguridad, soporte, correo
          electrónico, plataformas de integración, sistemas de reserva, CRMs y
          Paddle para pagos procesados por Paddle.
        </p>
        <p className="mt-3">
          Estos proveedores solo deben tratar datos según las finalidades
          necesarias para prestar sus servicios, sujeto a condiciones
          contractuales, técnicas y organizativas razonables.
        </p>
        <p className="mt-3">
          También podemos compartir información si es necesario para cumplir la
          ley, proteger derechos, investigar fraude, responder a autoridades
          competentes, hacer cumplir nuestros términos o proteger a usuarios,
          clientes, proveedores o terceros.
        </p>
      </>
    ),
  },
  {
    id: "paddle-pagos",
    title: "8. Paddle y pagos",
    content: (
      <>
        <p>
          Cuando una compra se procesa por Paddle, Paddle actúa como reseller
          autorizado y Merchant of Record. Paddle puede tratar datos personales
          para procesar pagos, emitir recibos, gestionar impuestos aplicables,
          manejar soporte relacionado con la transacción, gestionar
          cancelaciones, reembolsos y cumplir obligaciones legales.
        </p>
        <p className="mt-3">
          La información de privacidad de Paddle se rige por su propia Política
          de Privacidad. Recomendamos revisar las políticas de Paddle antes de
          completar una compra.
        </p>
      </>
    ),
  },
  {
    id: "transferencias-internacionales",
    title: "9. Transferencias internacionales",
    content: (
      <>
        <p>
          {TRADE_NAME} opera desde Ecuador y puede usar proveedores ubicados en
          otros países. Por eso, los datos pueden ser procesados o almacenados
          fuera del país donde se encuentra el usuario, el cliente o el negocio.
        </p>
        <p className="mt-3">
          Cuando corresponda, usaremos medidas contractuales, técnicas u
          organizativas razonables para proteger los datos en transferencias
          internacionales.
        </p>
      </>
    ),
  },
  {
    id: "conservacion",
    title: "10. Conservación",
    content: (
      <>
        <p>
          Conservamos datos durante el tiempo necesario para prestar{" "}
          {PRODUCT_NAME}, mantener cuentas, cumplir obligaciones legales,
          resolver disputas, prevenir fraude, mantener seguridad, realizar
          auditorías internas y hacer cumplir acuerdos.
        </p>
        <p className="mt-3">
          Los clientes pueden solicitar eliminación o exportación de datos
          conforme a su plan, configuración, obligaciones legales y capacidades
          técnicas disponibles.
        </p>
      </>
    ),
  },
  {
    id: "seguridad",
    title: "11. Seguridad",
    content: (
      <>
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger la
          información contra acceso no autorizado, pérdida, alteración,
          divulgación o uso indebido.
        </p>
        <p className="mt-3">
          Ningún sistema es 100% seguro. El cliente también debe proteger sus
          credenciales, controlar accesos internos, mantener configuraciones
          correctas y notificar incidentes o accesos no autorizados.
        </p>
      </>
    ),
  },
  {
    id: "derechos-privacidad",
    title: "12. Derechos de privacidad",
    content: (
      <>
        <p>
          Según la legislación aplicable, puedes tener derecho a solicitar
          acceso, corrección, actualización, eliminación, restricción,
          oposición, portabilidad o retiro de consentimiento respecto de tus
          datos personales.
        </p>
        <p className="mt-3">
          Para ejercer derechos relacionados con datos tratados directamente por{" "}
          {TRADE_NAME}, escríbenos a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline text-rose-700 hover:text-rose-800"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="mt-3">
          Si eres cliente final de un negocio que usa {PRODUCT_NAME}, es posible
          que debas dirigir ciertas solicitudes directamente a ese negocio,
          porque puede actuar como responsable de tus datos.
        </p>
      </>
    ),
  },
  {
    id: "menores",
    title: "13. Menores de edad",
    content: (
      <p>
        {PRODUCT_NAME} está dirigido a negocios y no está diseñado para ser
        contratado directamente por menores de edad. Si identificamos que hemos
        recopilado datos de un menor sin autorización válida cuando esta sea
        requerida, tomaremos medidas razonables para eliminar o limitar ese
        tratamiento.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "14. Cookies",
    content: (
      <p>
        Usamos cookies y tecnologías similares conforme a nuestra{" "}
        <a
          href="/cookies"
          className="underline text-rose-700 hover:text-rose-800"
        >
          Política de Cookies
        </a>
        .
      </p>
    ),
  },
  {
    id: "cambios",
    title: "15. Cambios",
    content: (
      <p>
        Podemos actualizar esta política para reflejar cambios legales, técnicos,
        comerciales o de producto. Publicaremos la versión actualizada en este
        sitio.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "16. Contacto",
    content: (
      <p>
        Para preguntas de privacidad o soporte, escríbenos a{" "}
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

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title={`Política de Privacidad de ${TRADE_NAME}`}
      lastUpdated="abril de 2026"
      introText={introText}
      sections={sections}
    />
  );
}
