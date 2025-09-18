"use client";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function RoiExampleModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="roi-modal-title"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* panel */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b px-5 py-4">
          <h3 id="roi-modal-title" className="text-lg font-semibold">
            Ejemplo: cómo usar la calculadora de ROI
          </h3>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="max-h-[70vh] space-y-4 overflow-auto px-5 py-4 text-sm text-neutral-700">
          <p>
            Imagina un equipo de <b>soporte</b> que procesa tareas repetitivas.
            Con estos valores puedes estimar el impacto:
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <KeyValue k="Tareas/mes" v="1.200" />
            <KeyValue k="Minutos por tarea" v="6" />
            <KeyValue k="Costo/hora" v="US$ 12" />
            <KeyValue k="Equipos involucrados" v="2" />
            <KeyValue k="Reducción esperada" v="45%" />
            <KeyValue k="Costo de implementación" v="US$ 1.900" />
          </div>

          <hr className="my-2" />

          <ol className="list-inside list-decimal space-y-3">
            <li>
              <b>Horas/mes actuales</b> = 1.200 × 6 ÷ 60 = <b>120 h</b>.
            </li>
            <li>
              <b>Costo mensual actual</b> = 120 h × 12 = <b>US$ 1.440</b>.
            </li>
            <li>
              <b>Ahorro mensual estimado</b> = 1.440 × 45% × 1,03 ≈{" "}
              <b>US$ 667</b>.
              <br />
              (Ese 1,03 es un factor leve por 2 equipos.)
            </li>
            <li>
              <b>Punto de equilibrio</b> ≈ (1.900 ÷ 667) × 4,345 ={" "}
              <b>≈ 12,4 semanas</b>.
            </li>
            <li>
              <b>ROI 12 meses</b> ≈ ((667 × 12 – 1.900) ÷ 1.900) × 100 ={" "}
              <b>≈ 322%</b>.
            </li>
          </ol>

          <div className="rounded-xl bg-[#F5F5F5] p-4">
            <div className="grid gap-2 md:grid-cols-2">
              <KeyValue k="Ahorro mensual" v="≈ US$ 667" strong />
              <KeyValue k="Ahorro anual" v="≈ US$ 8.009" strong />
              <KeyValue k="Break-even" v="≈ 12,4 semanas" />
              <KeyValue k="ROI 12 meses" v="≈ 322%" />
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              *Estimaciones. Ajusta los campos a tu realidad (tiempos, costos,
              equipos y % de reducción).
            </p>
          </div>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
          >
            Cerrar
          </button>
          <a
            href="#contacto"
            className="rounded-full bg-[#8B1E2D] px-4 py-2 text-sm text-white hover:bg-[#B84550]"
          >
            Hablar con un experto
          </a>
        </footer>
      </div>
    </div>
  );
}

function KeyValue({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-neutral-500">{k}</div>
      <div className={`text-sm ${strong ? "font-semibold text-[#8B1E2D]" : ""}`}>{v}</div>
    </div>
  );
}
