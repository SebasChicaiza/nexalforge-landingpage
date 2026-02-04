"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_URL =
  "https://wa.me/593963305344?text=Hola,%20quisiera%20información%20sobre%20Nexi";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isPseoSolutionDetail =
    pathSegments[0] === "soluciones" && pathSegments.length >= 3;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp con Nexi"
      className={`fixed bottom-6 right-6 z-[9999] h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070A] ${isPseoSolutionDetail ? "hidden md:inline-flex" : "inline-flex"}`}
      style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="relative h-7 w-7"
        aria-hidden="true"
      >
        <path d="M12 2a10 10 0 0 0-8.77 14.81L2 22l5.35-1.2A10 10 0 1 0 12 2Zm0 18.2c-1.44 0-2.84-.4-4.06-1.16l-.29-.18-3.17.71.72-3.1-.19-.3A8.22 8.22 0 1 1 12 20.2Zm4.5-6.16c-.24-.12-1.43-.7-1.66-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.38-1.31-1.62-.14-.24-.01-.37.1-.49.1-.1.24-.26.36-.39.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 1.99 0 1.18.86 2.32.98 2.48.12.16 1.69 2.57 4.1 3.6.57.25 1.01.4 1.36.52.57.18 1.09.15 1.5.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}
