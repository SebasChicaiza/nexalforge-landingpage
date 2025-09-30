"use client";

import { useState } from "react";

type Props = {
  origen?: string; // e.g. "blog_sidebar"
};

const BRAND = {
  primary: "#8B1E2D",
  primaryHover: "#B84550",
  text: "#2A2A2A",
};

export default function NewsletterForm({ origen = "blog_sidebar" }: Props) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<null | {
    type: "ok" | "warn" | "err";
    text: string;
  }>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setPending(true);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, origen }),
      });

      const data = (await res.json()) as
        | { status: "subscribed"; id: string }
        | { status: "already_subscribed" }
        | { status: "error"; message: string };

      if (!res.ok) {
        const msg =
          "status" in data && data.status === "error"
            ? data.message
            : "Error al suscribirte";
        setMessage({ type: "err", text: msg });
        return;
      }

      if (data.status === "already_subscribed") {
        setMessage({ type: "warn", text: "Ya estabas suscrito ✅" });
      } else {
        setMessage({
          type: "ok",
          text: "¡Suscripción exitosa! 🎉 Revisa tu correo.",
        });
      }
      setEmail("");
    } catch (err) {
      setMessage({ type: "err", text: "Error de red. Intenta de nuevo." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="mt-3 flex gap-2" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>

      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full flex-1 rounded-xl border border-nf-secondary-400 bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-nf-primary-400/40"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl px-4 text-sm text-white"
        style={{ background: BRAND.primary }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = BRAND.primaryHover)
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = BRAND.primary)}
      >
        {pending ? "Suscribiendo..." : "Suscribirme"}
      </button>

      {/* inline status (accessible) */}
      <span className="sr-only" aria-live="polite">
        {message?.text ?? ""}
      </span>
    </form>
  );
}
