// components/NexiVideo.tsx
import type { ReactElement } from "react";
import Link from "next/link";

type NexiVideoProps = {
  id?: string;
  srcWebm?: string;
  srcMp4: string;
  poster?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export default function NexiVideo({
  id = "casos",
  srcWebm,
  srcMp4,
  poster,
  eyebrow = "Caso en 60s",
  title = "Automatiza. Predice. Crece.",
  description = "Un vistazo rápido a cómo desplegamos un agente que aumenta la conversión de leads.",
  ctaHref = "#contacto",
  ctaLabel = "Nuestro enfoque",
  className = "",
}: NexiVideoProps): ReactElement {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden bg-black py-16 md:py-0 md:pt-10 ${className}`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-[#1a0c0d]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left: text */}
          <div className="order-2 md:order-2">
            <p className="mb-3 text-sm tracking-wide text-white/70">{eyebrow}</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-prose text-white/70">{description}</p>

            {ctaHref && ctaLabel ? (
              <div className="mt-6">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200"
                >
                  {ctaLabel}
                </Link>
              </div>
            ) : null}
          </div>

          {/* Right: video (cropped wide, minimal card) */}
          <div className="order-1 md:order-1">
            <div className="relative w-full overflow-hidden">
              <div className="aspect-[4/3]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={poster}
                  className="h-full w-full object-cover"
                >
                  {srcWebm ? <source src={srcWebm} type="video/webm" /> : null}
                  <source src={srcMp4} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
