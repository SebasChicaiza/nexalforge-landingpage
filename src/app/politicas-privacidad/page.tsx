'use client';

import React from 'react';

/**
 * PrivacyPolicy – Página de Política de Privacidad (WhatsApp incluido)
 *
 * ✔ React + Tailwind CSS
 * ✔ Secciones claras con anclas y tabla de contenido
 * ✔ Colores de marca Nexal Forge (#8B1E2D, #B84550, #2A2A2A)
 * ✔ Accesible (landmarks, aria labels)
 *
 * Uso (Next.js App Router):
 *   // app/politica-privacidad/page.tsx
 *   export default function Page() { return <PrivacyPolicy /> }
 */

const BRAND = {
  red: '#8B1E2D',
  coral: '#B84550',
  charcoal: '#2A2A2A',
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="mt-12 flex items-center gap-2 text-xl font-extrabold text-gray-900">
      <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: BRAND.coral }} />
      {title}
    </h2>
    <div className="mt-3 text-sm leading-6 text-gray-700">{children}</div>
  </section>
);

export default function PrivacyPolicy() {
  const lastUpdated = '06 / 10 / 2025';

  return (
    <main className="bg-gray-50 py-10 pt-25">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <header className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tight" style={{ color: BRAND.charcoal }}>
              Política de Privacidad
            </h1>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Última actualización: {lastUpdated}
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-700">
            Esta política describe cómo tratamos tus datos cuando nos contactas por <strong>WhatsApp</strong> y a través de
            nuestro sitio web. El consentimiento de <strong>WhatsApp</strong> es <em>independiente</em> del de cookies.
          </p>
        </header>

        {/* TOC */}
        <nav aria-label="Tabla de contenidos" className="mt-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-[13px] font-semibold text-gray-900">Tabla de contenidos</p>
            <ul className="grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <li><a className="hover:underline" href="#responsable">Responsable</a></li>
              <li><a className="hover:underline" href="#datos">Datos tratados</a></li>
              <li><a className="hover:underline" href="#finalidades">Finalidades</a></li>
              <li><a className="hover:underline" href="#base-legal">Base legal</a></li>
              <li><a className="hover:underline" href="#encargados">Proveedores/encargados</a></li>
              <li><a className="hover:underline" href="#transferencias">Transferencias internacionales</a></li>
              <li><a className="hover:underline" href="#retencion">Conservación de datos</a></li>
              <li><a className="hover:underline" href="#derechos">Derechos del titular</a></li>
              <li><a className="hover:underline" href="#optout">Opt‑out</a></li>
              <li><a className="hover:underline" href="#menores">Menores y datos sensibles</a></li>
              <li><a className="hover:underline" href="#incidentes">Incidentes de seguridad</a></li>
              <li><a className="hover:underline" href="#vigencia">Vigencia</a></li>
            </ul>
          </div>
        </nav>

        {/* Content */}
        <article className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Section id="responsable" title="Responsable del tratamiento">
            <p>
              <strong>Nexal Forge</strong>, Contacto:
              {' '}<a className="underline" href="mailto:contact@nexalforge.com">contact@nexalforge.com</a>.
            </p>
          </Section>

          <Section id="datos" title="Datos tratados (WhatsApp)">
            <ul className="list-inside list-disc">
              <li>Número de WhatsApp y nombre de perfil.</li>
              <li>Contenido de mensajes: texto, imágenes, audio y documentos.</li>
              <li>Metadatos de entrega/lectura, registros de consentimiento y logs técnicos.</li>
            </ul>
          </Section>

          <Section id="finalidades" title="Finalidades">
            <ul className="list-inside list-disc">
              <li>Atención y soporte.</li>
              <li>Notificaciones transaccionales (confirmaciones, recordatorios).</li>
              <li>Analítica de calidad y seguridad.</li>
              <li><strong>Marketing</strong> solo si otorgas opt‑in específico.</li>
            </ul>
          </Section>

          <Section id="base-legal" title="Base legal">
            <ul className="list-inside list-disc">
              <li>Consentimiento (opt‑in).</li>
              <li>Ejecución de contrato.</li>
              <li>Interés legítimo (seguridad/mejora del servicio).</li>
              <li>Cumplimiento legal.</li>
            </ul>
          </Section>

          <Section id="encargados" title="Proveedores / encargados">
            <p>
              Utilizamos <strong>WhatsApp Business Platform (Meta)</strong> y subencargados de hosting/analítica/soporte,
              bajo acuerdos de tratamiento de datos.
            </p>
          </Section>

          <Section id="transferencias" title="Transferencias internacionales">
            <p>
              Las transferencias pueden ocurrir fuera de Ecuador con garantías contractuales (SCC/DPA).
            </p>
          </Section>

          <Section id="retencion" title="Plazos de conservación (referenciales)">
            <ul className="list-inside list-disc">
              <li>Mensajes y adjuntos operativos: <strong>12 meses</strong> (adjuntos pesados: <strong>90 días</strong>).</li>
              <li>Logs de entrega/errores: <strong>12–24 meses</strong>.</li>
              <li>Registros de consentimiento: <strong>mientras dure la relación</strong> + plazos de prescripción.</li>
            </ul>
          </Section>

          <Section id="derechos" title="Derechos del titular">
            <p>
              Acceso, rectificación, actualización, eliminación, oposición, portabilidad, limitación y
              <strong> revisión humana</strong> de decisiones automatizadas. Escríbenos a{' '}
              <a className="underline" href="mailto:privacidad@nexalforge.com">privacidad@nexalforge.com</a>
              {' '}para ejercerlos (respuesta en <strong>15 días</strong>).
            </p>
          </Section>

          <Section id="optout" title="Opt‑out / Desuscripción">
            <p>
              Puedes darte de baja respondiendo <strong>“BAJA/STOP”</strong> en WhatsApp o bloqueando el número.
            </p>
          </Section>

          <Section id="menores" title="Menores y datos sensibles">
            <p>
              No solicitamos datos sensibles por WhatsApp; si los compartes, los eliminaremos salvo obligación legal.
            </p>
          </Section>

          <Section id="incidentes" title="Incidentes de seguridad">
            <p>
              Notificaremos a titulares y a la autoridad conforme a la ley ante eventuales brechas.
            </p>
          </Section>

          <Section id="vigencia" title="Vigencia">
            <p>
              Última actualización: <strong>{lastUpdated}</strong>.
            </p>
          </Section>

          <div className="mt-10 flex items-center justify-end">
            <a href="#top" className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              Volver arriba
            </a>
          </div>
        </article>

        {/* Footer helper */}
        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 text-xs text-gray-600 shadow-sm">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold" style={{ color: BRAND.red }}>Nota:</span>
            El consentimiento de WhatsApp se captura con un <em>opt‑in</em> específico (por ejemplo, el componente
            nuestro componente <em>Opt‑in para WhatsApp</em>). El banner de cookies no lo reemplaza.
          </div>
        </div>
      </div>
    </main>
  );
}
