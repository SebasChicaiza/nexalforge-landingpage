import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recuperar acceso",
  description:
    "Opciones para restablecer o recuperar tu acceso a Nexal Forge. Si necesitas ayuda, contáctanos por correo o WhatsApp.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-rose-700">Accesos</p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="mt-3 text-neutral-600">
            Aún no tenemos un flujo de reseteo automático. Escríbenos y
            validaremos tu identidad para habilitar un nuevo acceso.
          </p>

          <div className="mt-6 space-y-3 text-neutral-700">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="font-semibold text-neutral-900">
                Opciones rápidas
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>
                  Entra a tu cuenta con{" "}
                  <Link
                    href="/login"
                    className="text-rose-700 hover:underline"
                  >
                    email y contraseña
                  </Link>{" "}
                  si los recuerdas.
                </li>
                <li>
                  Escríbenos a{" "}
                  <a
                    href="mailto:soporte@nexalforge.com"
                    className="text-rose-700 hover:underline"
                  >
                    soporte@nexalforge.com
                  </a>{" "}
                  o por WhatsApp para validar tu identidad y reiniciar tu
                  acceso.
                </li>
                <li>
                  Si tu equipo usa SSO (Google/Microsoft), solicita a tu
                  administrador que reactive tu inicio de sesión.
                </li>
              </ul>
            </div>

            <p className="text-sm text-neutral-600">
              Añade el dominio <strong>nexalforge.com</strong> a tu lista segura
              para recibir nuestros correos. Responderemos en menos de un día
              hábil.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
