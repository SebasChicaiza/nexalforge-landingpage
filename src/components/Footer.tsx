// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-neutral-200 bg-white py-10 text-sm text-neutral-600"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-5">
        {/* Brand / Intro */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Link href="/" className="inline-flex items-center" aria-label="Inicio">
              <Image
                src="/logo-nexal.png"
                alt="NexalForge"
                width={160}
                height={40}
                priority
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>
          <p>IA aplicada para mover tus KPIs en semanas, no meses.</p>
        </div>

        {/* Empresa */}
        <nav aria-label="Empresa">
          <div className="mb-2 font-semibold text-[#2A2A2A]">Empresa</div>
          <ul className="space-y-1">
            <li>
              <a className="hover:underline" href="#casos">
                Casos
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#servicios">
                Servicios
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#proceso">
                Proceso
              </a>
            </li>
          </ul>
        </nav>

        {/* Recursos */}
        <nav aria-label="Recursos">
          <div className="mb-2 font-semibold text-[#2A2A2A]">Recursos</div>
          <ul className="space-y-1">
            <li>
            <Link className="hover:underline" href="/blog">
              Blog y guías
            </Link>
            </li>
            <li>
              <a
                className="hover:underline"
                href="https://developers.facebook.com/docs/whatsapp/cloud-api/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentación WhatsApp Business
              </a>
            </li>
            <li>
              <a
                className="hover:underline"
                href="https://www.twilio.com/docs/conversations"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twilio Conversations / Flex
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Empresa">
          <div className="mb-2 font-semibold text-[#2A2A2A]">Policas</div>
          <ul className="space-y-1">
            <li>
              <a className="hover:underline" href="/politicas-privacidad">
                Politicas de Privacidad
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/cookies">
                Politicas de Cookies
              </a>
            </li>
          </ul>
        </nav>


        {/* Contacto */}
        <div>
          <div className="mb-2 font-semibold text-[#2A2A2A]">Contacto</div>
          <p>
            <a className="hover:underline" href="mailto:contact@nexalforge.com">
              contact@nexalforge.com
            </a>
          </p>
          <p>Quito, Ecuador</p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 text-xs text-neutral-500">
        © {year} NexalForge. Todos los derechos reservados.
      </div>
    </footer>
  );
}
