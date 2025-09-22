"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function StickyHeader() {
  const [solid, setSolid] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerH, setHeaderH] = useState<number>(0);

  // Make header transparent only while hero is ≥30% visible
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setSolid(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setSolid(!(entry.isIntersecting && entry.intersectionRatio >= 0.3));
      },
      { threshold: [0, 0.3, 0.6, 1] }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Measure header height and keep a spacer in sync
  useLayoutEffect(() => {
    if (!headerRef.current) return;

    const measure = () => {
      const rect = headerRef.current!.getBoundingClientRect();
      setHeaderH(rect.height);
      document.documentElement.style.setProperty("--nf-header-h", `${Math.ceil(rect.height)}px`);
    };

    // Observe size changes (responsive, font loads, etc.)
    const ro = new ResizeObserver(measure);
    ro.observe(headerRef.current);
    measure();

    // Fallback on window resize too
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const base =
    "fixed inset-x-0 top-0 z-50 transition-colors duration-300 will-change-[background-color]";
  const bg = solid
    ? "bg-black/85 backdrop-blur border-b border-white/10"
    : "bg-transparent";

  return (
    <>
      <header
        ref={headerRef}
        className={`${base} ${bg}`}
        // Respect iOS safe area
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
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
            <a className="hover:opacity-80" href="/blog">
              Blog
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

      {/* Spacer that reserves the exact header height so content below "respects" the nav */}
      <div aria-hidden style={{ height: headerH }} />
    </>
  );
}
