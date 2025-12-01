"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type IndustryUseCase = {
  name: string;
  headline: string;
  description: string;
  bullets: string[];
  image: string;
  gradient: string;
  badge?: string;
};

type Props = {
  items: IndustryUseCase[];
};

export default function NexiIndustriesGrid({ items }: Props) {
  return (
    <div className="mt-8 grid justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, idx) => (
        <IndustryCard key={item.name} item={item} index={idx} />
      ))}
    </div>
  );
}

function IndustryCard({ item, index }: { item: IndustryUseCase; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={[
        "group relative aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-3xl",
        "border border-white/10 bg-[#061021] text-white shadow-[0_24px_60px_rgba(0,0,0,0.22)]",
        "transition duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.97]",
      ].join(" ")}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div
        className="absolute inset-0 opacity-0 blur-2xl transition duration-700 group-hover:opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 35%)",
        }}
      />

      <Image
        src={item.image}
        alt={`Ilustración para ${item.name}`}
        fill
        sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.02]"
        style={{ objectPosition: "center 10%" }}
        priority={index === 0}
      />

      <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient}`} aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent"
        aria-hidden
      />

      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] backdrop-blur">
        {item.badge ?? "Nexi en acción"}
      </div>

      <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
          {item.name}
        </p>
        <h3 className="text-lg font-semibold leading-tight drop-shadow-sm">
          {item.headline}
        </h3>
        <p className="text-sm text-white/80">{item.description}</p>
        <ul className="mt-2 space-y-2 text-sm text-white/90">
          {item.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
