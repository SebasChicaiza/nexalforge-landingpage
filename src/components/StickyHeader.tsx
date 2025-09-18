"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function StickyHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setSolid(true);

      return;
    } // si no hay hero, deja sólido

    const io = new IntersectionObserver(
      ([entry]) => {
        // transparente solo mientras el HERO está visible ≥30%
        setSolid(!(entry.isIntersecting && entry.intersectionRatio >= 0.3));
      },
      { threshold: [0, 0.3, 0.6, 1] }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const base = "fixed inset-x-0 top-0 z-50 transition-colors duration-300";
  const bg = solid
    ? "bg-black/85 backdrop-blur border-b border-white/10 z-50"
    : "bg-transparent";

  return (
    <header className={`${base} ${bg}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-white">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/logo-blanco-nf.png"
            alt="NexalForge"
            width={160}
            height={40}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>
        <nav className="hidden gap-6 md:flex">
          <a className="hover:opacity-80" href="#servicios">
            Servicios
          </a>
          <a className="hover:opacity-80" href="#proceso">
            Proceso
          </a>
          <a className="hover:opacity-80" href="#roi">
            Calcula tu ROI
          </a>
        </nav>
        <a
          href="#contacto"
          className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white hover:bg-white/20"
        >
          Agendar demo
        </a>
      </div>
    </header>
  );
}
