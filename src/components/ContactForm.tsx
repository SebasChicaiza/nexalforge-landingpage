"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputWire from "@/components/InputWire";
import SelectWire from "@/components/SelectWire";
import { trackLead } from "@/lib/track";

type Toast = { type: "success" | "error"; message: string } | null;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setToast(null);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const json: unknown = await res.json().catch(() => ({}) as const);
      const ok = (json as { ok?: boolean })?.ok === true;

      if (res.ok && ok) {
        formEl.reset();

        setToast({
          type: "success",
          message: "¡Listo! Guardamos tus datos. Te escribimos en <24h.",
        });

        // Track GA4
        trackLead({
          form_location: "landing_contact",
          objetivo: fd.get("objetivo") ?? "",
          equipo: fd.get("equipo") ?? "",
        });

        const anchor = document.getElementById("hero");
        if (anchor)
          anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const msg =
          (json as { error?: string })?.error ??
          "No se pudo enviar. Intenta nuevamente.";
        setToast({ type: "error", message: msg });
      }
    } catch {
      setToast({
        type: "error",
        message: "Problema de red. Intenta de nuevo.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        action="/api/contact" // fallback sin JS
        method="post"
        className="grid gap-3"
      >
        {/* Honeypot anti-spam */}
        <input
          type="text"
          name="sitio"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <InputWire label="Nombre" name="nombre" required />
        <InputWire label="Email" name="email" type="email" required />
        <InputWire label="Empresa" name="empresa" />

        <div className="grid grid-cols-2 gap-3">
          <SelectWire
            label="Objetivo"
            name="objetivo"
            options={["Mejorar ventas", "Reducir tiempos", "Reducir costos"]}
            required
          />
          <SelectWire
            label="Tamaño de equipo"
            name="equipo"
            options={["1–10", "11–50", "50+"]}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-[#8B1E2D] px-5 py-3 text-white hover:bg-[#B84550] disabled:opacity-60"
        >
          {loading ? "Enviando…" : "Agendar demo"}
        </button>

        <p className="text-xs text-neutral-500">
          Al enviar aceptas nuestra política de privacidad.
        </p>
      </form>

      {/* Toast flotante */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-0 z-[100] flex items-start justify-end p-4"
      >
        {toast && (
          <div
            role="status"
            className={`pointer-events-auto mt-12 w-full max-w-sm rounded-2xl border px-4 py-3 shadow-lg bg-white ${
              toast.type === "success"
                ? "border-green-300 text-green-700"
                : "border-red-300 text-red-700"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 h-2 w-2 rounded-full ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
              />
              <div className="flex-1">
                <p className="font-medium">
                  {toast.type === "success"
                    ? "¡Mensaje enviado!"
                    : "Hubo un problema"}
                </p>
                <p className="text-sm opacity-90">{toast.message}</p>
              </div>
              <button
                onClick={() => setToast(null)}
                className="text-sm opacity-60 hover:opacity-100"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
