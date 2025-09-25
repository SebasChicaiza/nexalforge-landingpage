"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavLink = { label: string; href: string };

const SERVICES: NavLink[] = [
  { label: "Agente IA para Ventas", href: "#svc-ventas" },
  { label: "Agente IA para Soporte", href: "#svc-soporte" },
  { label: "Desarrollo Web Empresarial", href: "#svc-web" },
  { label: "Automatización Operativa", href: "#svc-automatizacion" },
  { label: "Predicción & Forecasting", href: "#svc-forecasting" },
  { label: "Capa de Datos & Dashboards", href: "#svc-datos" },
  { label: "Sprint de Implementación", href: "#svc-sprint" },
];

export default function StickyHeader() {
  const [solid, setSolid] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerH, setHeaderH] = useState<number>(0);

  // Mobile off-canvas
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Desktop mega menu open (Servicios)
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const desktopWrapRef = useRef<HTMLDivElement | null>(null);

  // control de hover (cierre diferido)
  const hoverCloseTimer = useRef<number | null>(null);

  const openDesktop = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
    setDesktopServicesOpen(true);
  };

  const scheduleCloseIfOutside = (e: React.PointerEvent) => {
    const wrap = desktopWrapRef.current;
    const to = e.relatedTarget as Node | null;
    // si el destino sigue dentro del wrapper, no cerrar
    if (wrap && to && wrap.contains(to)) 
      return;
    // cierre suave para permitir micro-gaps
    hoverCloseTimer.current = window.setTimeout(() => {
      setDesktopServicesOpen(false);
      hoverCloseTimer.current = null;
    }, 120);
  };

  const cancelScheduledClose = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };

  // Transparent header only while hero is ≥30% visible
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setSolid(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) =>
        setSolid(!(entry.isIntersecting && entry.intersectionRatio >= 0.3)),
      { threshold: [0, 0.3, 0.6, 1] }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Measure header height & spacer
  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const measure = () => {
      const rect = headerRef.current!.getBoundingClientRect();
      setHeaderH(rect.height);
      document.documentElement.style.setProperty(
        "--nf-header-h",
        `${Math.ceil(rect.height)}px`
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(headerRef.current);
    measure();
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Lock scroll when mobile menu opens
  useEffect(() => {
    const root = document.documentElement;
    if (mobileOpen) {
      const prev = root.style.overflow;
      root.style.overflow = "hidden";
      const t = setTimeout(() => closeBtnRef.current?.focus(), 10);
      const onKey = (e: KeyboardEvent) =>
        e.key === "Escape" && setMobileOpen(false);
      window.addEventListener("keydown", onKey);
      return () => {
        root.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
        clearTimeout(t);
      };
    }
  }, [mobileOpen]);

  // Close desktop mega with ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setDesktopServicesOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {/* Servicios with simplified mega dropdown */}
            <div
              className="relative"
              ref={desktopWrapRef}
              onPointerEnter={openDesktop}
              onPointerLeave={scheduleCloseIfOutside}
            >
              <button
                className="inline-flex items-center gap-1 hover:opacity-80"
                aria-haspopup="true"
                aria-expanded={desktopServicesOpen}
                onClick={() => setDesktopServicesOpen((v) => !v)}
              >
                Servicios
                <svg
                  className={`h-4 w-4 transition-transform ${
                    desktopServicesOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.856a.75.75 0 111.08 1.04l-4.24 4.41a.75.75 0 01-1.08 0l-4.24-4.41a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Mega panel: simple list of services */}
              <div
                className={`absolute left-1/2 top-[calc(100%+12px)] z-[60] w-[560px] -translate-x-1/2 rounded-2xl border border-white/10 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
                  desktopServicesOpen
                    ? "pointer-events-auto opacity-100 translate-y-0"
                    : "pointer-events-none opacity-0 -translate-y-1"
                }`}
                onPointerEnter={cancelScheduledClose}
                onPointerLeave={scheduleCloseIfOutside}
              >
                {/* subtle glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(139,30,45,.30), transparent)",
                  }}
                />
                <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {SERVICES.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-[0.98rem] text-white/90 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                        onClick={() => setDesktopServicesOpen(false)}
                      >
                        {s.label}
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 opacity-70"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* CTA row */}
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <span className="text-sm text-white/80">
                    ¿Listo para automatizar tu atención?
                  </span>
                  <a
                    href="#contacto"
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 shadow-[0_10px_30px_-10px_rgba(139,30,45,0.45)]"
                    onClick={() => setDesktopServicesOpen(false)}
                  >
                    Agendar demo
                  </a>
                </div>
              </div>
            </div>

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

          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className="hidden rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white hover:bg-white/20 md:inline-block"
            >
              Agendar demo
            </a>

            {/* Hamburger (mobile) */}
            <button
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur transition hover:bg-white/20 md:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${
                    mobileOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-white transition-opacity duration-300 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${
                    mobileOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div aria-hidden style={{ height: headerH }} />

      {/* Mobile overlay */}
      <button
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile off-canvas */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[70] h-screen w-[86%] max-w-[22rem] transform bg-neutral-950/95 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center"
          >
            <Image
              src="/logo-blanco-nf.png"
              alt="NexalForge"
              width={140}
              height={36}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            ref={closeBtnRef}
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 hover:bg-white/20"
            aria-label="Cerrar menú"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                d="M6 6l12 12M18 6l-12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile content */}
        <div className="overflow-y-auto px-4 py-3">
          {/* Servicios simple list (toggleable group) */}
          <div className="mb-2">
            <button
              onClick={() =>
                document
                  .getElementById("mobile-servicios")!
                  .classList.toggle("hidden")
              }
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium hover:bg-white/5"
              aria-controls="mobile-servicios"
              aria-expanded={false}
            >
              <span>Servicios</span>
              <svg
                className="h-5 w-5 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.856a.75.75 0 111.08 1.04l-4.24 4.41a.75.75 0 01-1.08 0l-4.24-4.41a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <ul
              id="mobile-servicios"
              className="mt-1 hidden space-y-1 rounded-lg border border-white/10 bg-white/[0.03] p-2"
            >
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded px-3 py-1.5 text-sm text-white/90 hover:bg-white/5 hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other links */}
          <ul className="mt-2 space-y-1">
            <li>
              <a
                href="#proceso"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-3 hover:bg-white/5"
              >
                Proceso
              </a>
            </li>
            <li>
              <a
                href="#roi"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-3 hover:bg-white/5"
              >
                Calcula tu ROI
              </a>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-3 hover:bg-white/5"
              >
                Blog
              </Link>
            </li>
          </ul>

          <div className="mt-4 border-t border-white/10 pt-4">
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-[0.98rem] font-medium shadow-[0_10px_30px_-10px_rgba(139,30,45,0.5)] hover:bg-white/20"
            >
              Agendar demo
            </a>
          </div>

          {/* glow accent */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,30,45,.35), transparent)",
            }}
          />
        </div>
      </aside>
    </>
  );
}
