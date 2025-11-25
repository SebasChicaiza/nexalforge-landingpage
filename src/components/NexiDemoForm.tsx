"use client";

import { useState } from "react";
import InputWire from "@/components/InputWire";
import { trackLead } from "@/lib/track";

type Status = "idle" | "sending" | "success" | "error";

export default function NexiDemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage(null);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const payload = {
      nombre: (fd.get("nombre") ?? "").toString(),
      email: (fd.get("email") ?? "").toString(),
      empresa: (fd.get("empresa") ?? "").toString(),
      sector: (fd.get("sector") ?? "").toString(),
      telefono: (fd.get("telefono") ?? "").toString(),
      canales: fd.getAll("canales").map((v) => v.toString()),
      prioridad: (fd.get("prioridad") ?? "").toString(),
      sitio: (fd.get("sitio") ?? "").toString(),
    };

    try {
      const res = await fetch("/api/nexi-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        formEl.reset();
        setStatus("success");
        setMessage(
          "Listo, guardamos tus datos. Te contactaremos para agendar la demo."
        );
        trackLead({
          form_location: "nexi_product_page",
          action: "submit_demo_form",
        });
      } else {
        setStatus("error");
        setMessage(json.error ?? "No se pudo enviar. Intenta nuevamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Problemas de red. Intenta nuevamente.");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const checkboxClasses =
    "flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 shadow-sm transition hover:border-neutral-400 focus-within:ring-2 focus-within:ring-[#8B1E2D]";

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-xl backdrop-blur">
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Honeypot */}
        <input type="text" name="sitio" className="hidden" tabIndex={-1} />

        <div className="grid gap-4 md:grid-cols-2">
          <InputWire name="nombre" label="Nombre completo" required />
          <InputWire name="empresa" label="Empresa" required />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InputWire name="sector" label="Sector o tipo de negocio" required />
          <InputWire name="email" label="Email" type="email" required />
        </div>

        <InputWire
          name="telefono"
          label="Teléfono o WhatsApp"
          type="tel"
          required
        />

        <div className="grid gap-2">
          <span className="text-sm text-neutral-700">
            Canales que usas hoy
          </span>
          <div className="grid gap-2 sm:grid-cols-3">
            {["WhatsApp", "Instagram", "Otros"].map((option) => (
              <label key={option} className={checkboxClasses}>
                <input
                  type="checkbox"
                  name="canales"
                  value={option}
                  className="h-4 w-4 accent-[#8B1E2D]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-1">
          <label htmlFor="prioridad" className="text-sm text-neutral-700">
            ¿Qué te gustaría que Nexi automatice primero?
          </label>
          <textarea
            id="prioridad"
            name="prioridad"
            required
            rows={4}
            className="rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
            placeholder="Ejemplo: confirmaciones de citas, derivar consultas complejas, recordatorios automáticos…"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#8B1E2D] px-5 py-3 text-white shadow-lg transition hover:bg-[#B84550] disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar y agendar demo"}
        </button>

        <a
          href="https://wa.me/593963305344?text=Hola%2C%20Nexi.%20Quiero%20informaci%C3%B3n..."
          className="text-sm font-medium text-[#8B1E2D] underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackLead({
              form_location: "nexi_product_page",
              action: "cta_whatsapp_secondary",
            })
          }
        >
          Prefiero escribir por WhatsApp
        </a>

        {message && (
          <div
            aria-live="polite"
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
              status === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                status === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
