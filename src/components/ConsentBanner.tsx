// src/components/ConsentBanner.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Paleta NexalForge
// Primario: #8B1E2D  | Acento: #B84550
// Neutros: #2A2A2A, #FFFFFF, #6E6E6E, #E6E6E6, #F5F5F5

type ConsentState = "accepted" | "rejected" | null;

function updateConsent(accepted: boolean) {
  // @ts-expect-error gtag puede no existir si bloquean scripts
  window.gtag?.("consent", "update", {
    ad_storage: accepted ? "granted" : "denied",
    ad_user_data: accepted ? "granted" : "denied",
    ad_personalization: accepted ? "granted" : "denied",
    analytics_storage: accepted ? "granted" : "denied",
  });
}

interface ConsentBannerProps {
  /** URL a la política de privacidad */
  policyUrl?: string;
  /** Texto opcional para el encabezado */
  title?: string;
  /** Texto opcional para el cuerpo */
  message?: string;
  /** Permite personalizar la clave de storage si tienes varios sitios */
  storageKey?: string;
}

export default function ConsentBanner({
  policyUrl = "/privacy",
  title = "Tu privacidad, sin rodeos",
  message = "Usamos cookies para análisis y marketing. Puedes aceptar o rechazar cuando quieras.",
  storageKey = "consent:nexalforge",
}: ConsentBannerProps) {
  const [state, setState] = useState<ConsentState>(null);
  const [showDetails, setShowDetails] = useState(false);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "accepted" || saved === "rejected") {
      setState(saved);
      updateConsent(saved === "accepted");
    }
  }, [storageKey]);

  const handleChoice = (choice: Exclude<ConsentState, null>) => {
    setState(choice);
    localStorage.setItem(storageKey, choice);
    updateConsent(choice === "accepted");
  };

  if (state) return null;

  return (
    <AnimatePresence initial={!prefersReducedMotion}>
      <motion.div
        role="region"
        aria-label="Aviso de cookies y privacidad"
        aria-live="polite"
        initial={prefersReducedMotion ? false : { y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.28,
          ease: "easeOut",
        }}
        className="fixed bottom-5 left-1/2 z-[200] w-[min(720px,94vw)] -translate-x-1/2"
      >
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90">
          {/* Borde superior con gradiente de marca */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#8B1E2D] via-[#B84550] to-[#8B1E2D]" />

          <div className="grid grid-cols-[auto,1fr] gap-4 p-5 sm:p-6">
            {/* Ícono redondeado con halo */}
            <div className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B1E2D] to-[#B84550] text-white shadow-md">
              <Cookie className="h-6 w-6" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <h2
                className="mb-1 truncate font-[800] leading-tight text-neutral-900 dark:text-white"
                style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
              >
                {title}
              </h2>
              <p
                className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
                style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
              >
                {message}{" "}
                <a
                  href={policyUrl}
                  className="font-medium text-[#8B1E2D] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B84550]/60"
                >
                  Más info en la política de privacidad
                </a>
                .
              </p>

              {/* Detalles colapsables */}
              <button
                type="button"
                onClick={() => setShowDetails((s) => !s)}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B84550]/60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                aria-expanded={showDetails}
                aria-controls="consent-details"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Ver detalles de consentimiento
              </button>

              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    id="consent-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                    className="mt-3 overflow-hidden"
                  >
                    <ul className="grid list-disc gap-1 pl-5 text-xs text-neutral-600 dark:text-neutral-400">
                      <li>Analytics (medición de uso anónimo).</li>
                      <li>Marketing (mensajes relevantes).</li>
                      <li>Personalización (mejorar tu experiencia).</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botonera */}
            <div className="col-span-2 mt-4 flex flex-wrap items-center justify-end gap-2 sm:mt-2">
              <button
                onClick={() => handleChoice("rejected")}
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B84550]/60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Rechazar
              </button>
              <button
                onClick={() => handleChoice("accepted")}
                className="rounded-full bg-gradient-to-r from-[#8B1E2D] to-[#B84550] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B84550]/60"
              >
                Aceptar y continuar
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
