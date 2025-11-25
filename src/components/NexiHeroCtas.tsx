"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackLead } from "@/lib/track";

type Props = {
  demoHref: string;
  whatsappHref: string;
  whatsappLabel?: string;
};

export default function NexiHeroCtas({
  demoHref,
  whatsappHref,
  whatsappLabel = "Hablar con Nexi por WhatsApp",
}: Props) {
  const handleClick = (action: string) => () =>
    trackLead({ form_location: "nexi_product_page", action });

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href={demoHref}
        prefetch={false}
        onClick={handleClick("cta_demo_click")}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B84550] via-[#8B1E2D] to-[#7A1A28] px-5 py-3 text-white shadow-[0_12px_35px_rgba(139,30,45,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(139,30,45,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84550]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0B0D]"
      >
        <span>Agendar demo de Nexi</span>
        <ArrowRight className="h-4 w-4" />
      </Link>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick("cta_whatsapp_click")}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur transition hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0B0D]"
      >
        <MessageCircle className="h-4 w-4" />
        <span>{whatsappLabel}</span>
      </a>
    </div>
  );
}
