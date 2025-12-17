import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Conoce cómo Nexal Forge usa cookies y tecnologías similares para analítica, seguridad y preferencias.",
  alternates: { canonical: "/cookies" },
};

const items = [
  {
    title: "Esenciales",
    body: "Nos permiten mostrar el sitio, recordar tu sesión en el panel admin y mantener la seguridad.",
  },
  {
    title: "Analítica",
    body: "Usamos Google Analytics/Tag Manager para medir tráfico de forma agregada. No guardamos contenido de tus mensajes.",
  },
  {
    title: "Preferencias",
    body: "Guardan tu consentimiento de cookies y elecciones de idioma o región.",
  },
];

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-rose-700">Cumplimiento</p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900">
            Política de Cookies
          </h1>
          <p className="mt-3 text-neutral-600">
            Explicamos qué cookies usamos, para qué las necesitamos y cómo
            puedes gestionarlas desde tu navegador.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <p className="text-sm font-semibold text-neutral-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm text-neutral-700">
            <p>
              Puedes desactivar o borrar cookies en la configuración de tu
              navegador. Si bloqueas las esenciales, ciertas secciones (como el
              panel administrativo) podrían no funcionar.
            </p>
            <p>
              Para más detalles sobre datos personales, consulta nuestra{" "}
              <Link
                href="/politicas-privacidad"
                className="text-rose-700 hover:underline"
              >
                Política de Privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
