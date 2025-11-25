"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type StepCard = {
  title: string;
  copy: string;
  image: string;
};

type Props = {
  steps: StepCard[];
};

export default function NexiStepsCarousel({ steps }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "next" | "prev") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.clientWidth ?? 320;
    const gap = 24;
    const delta = direction === "next" ? cardWidth + gap : -(cardWidth + gap);
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const { scrollLeft, clientWidth, scrollWidth } = container;
      const cardWidth = container.firstElementChild?.clientWidth ?? 320;
      const gap = 24;
      const delta = cardWidth + gap;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (atEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: delta, behavior: "smooth" });
      }
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-10">
      <div className="absolute left-0 top-0 bottom-0 hidden w-12 bg-gradient-to-r from-[#0A0A0B] to-transparent sm:block pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 hidden w-12 bg-gradient-to-l from-[#0A0A0B] to-transparent sm:block pointer-events-none" />

      <div className="flex justify-end gap-3 pb-3 pr-1 sm:pr-2">
        <button
          type="button"
          onClick={() => handleScroll("prev")}
          aria-label="Ver pasos anteriores"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-[#B84550] hover:bg-[#B84550]/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => handleScroll("next")}
          aria-label="Ver pasos siguientes"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-[#B84550] hover:bg-[#B84550]/20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 pr-1 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20"
      >
        {steps.map((step, idx) => (
          <article
            key={step.title}
            className="group relative min-w-[270px] max-w-[340px] snap-center overflow-hidden rounded-[22px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#B84550]/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-[#8B1E2D]/10 opacity-0 transition duration-300 group-hover:opacity-100" />

            <div className="relative mb-4 h-36 overflow-hidden rounded-xl bg-[#1A1015]">
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 768px) 260px, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                Paso {idx + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/75">
                {step.copy}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
