"use client";
import { useState } from "react";
import RoiCalculator from "@/components/RoiCalculator";
import RoiExampleModal from "@/components/RoiExampleModal";

export default function RoiSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Calcula tu ROI en 30 segundos
            </h2>
            <p className="mt-2 max-w-xl text-neutral-600">
              Ingresa tareas repetitivas, tiempos y costo/hora. Estimamos el
              ahorro mensual y el punto de equilibrio.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#contacto"
                className="rounded-full bg-[#8B1E2D] px-5 py-3 text-white hover:bg-[#B84550]"
              >
                Quiero implementarlo
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full border border-neutral-300 px-5 py-3 hover:bg-neutral-50"
              >
                Ver ejemplo
              </button>
            </div>
          </div>

          <RoiCalculator />
        </div>
      </div>

      {/* Modal */}
      <RoiExampleModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
