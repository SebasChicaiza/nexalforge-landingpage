"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandCtaLink from "./buttons/BrandCtaLink";
import { ArrowRight } from "lucide-react";
import { hasJwtCookie, watchJwtCookie } from "@/lib/auth-events";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string };

const TOP_LINKS: NavLink[] = [
  { label: "Procesos", href: "#proceso" },
  { label: "ROI Calculator", href: "#roi" },
  { label: "Blog", href: "/blog" },
];

const SOLUTIONS: NavLink[] = [
  { label: "Soluciones por industria", href: "/soluciones" },
  { label: "Asistente virtual Nexi", href: "/asistente-virtual-nexi" },
  { label: "Agente IA para Ventas", href: "/" },
  { label: "Agente IA para Soporte", href: "/soluciones/agente-soporte-ia" },
  { label: "Recepcionista IA para llamadas", href: "/" },
  { label: "Desarrollo Web Empresarial", href: "/" },
  { label: "Automatización Operativa", href: "/" },
  { label: "Predicción & Forecasting", href: "/" },
  { label: "Capa de Datos & Dashboards", href: "/" },
  { label: "Sprint de Implementación", href: "/" },
];

const NEXI_LINKS: NavLink[] = [
  { label: "Asistente virtual Nexi", href: "/asistente-virtual-nexi" },
  {
    label: "Nexi para Clínicas Odontológicas",
    href: "/soluciones/clinicas-odontologicas",
  },
];

// --- realtime auth flag
function useAuthFlag() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let alive = true;

    // 1) instant optimistic state from cookie
    setIsLogged(hasJwtCookie());

    // 2) cookie watcher (updates within ~200ms)
    const stopWatch = watchJwtCookie((v) => alive && setIsLogged(v));

    // 3) confirm with server (handles expiry, etc.)
    const confirm = async () => {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const json = (await res.json()) as { loggedIn?: boolean };
        if (alive) setIsLogged(Boolean(json?.loggedIn));
      } catch {
        if (alive) setIsLogged(false);
      }
    };
    confirm();

    // 4) re-confirm when route changes (e.g., after redirect post-login)
    // this also covers cases where the cookie is set during navigation
    confirm();

    return () => {
      alive = false;
      stopWatch();
    };
  }, [pathname]);

  // Also listen to cross-tab broadcasts (optional but nice)
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("nf-auth");
      bc.onmessage = (e) => {
        if (e?.data?.type === "login") setIsLogged(true);
        if (e?.data?.type === "logout") setIsLogged(false);
      };
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === "nf_auth_event") {
        if (e.newValue?.includes("login")) setIsLogged(true);
        if (e.newValue?.includes("logout")) setIsLogged(false);
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      bc?.close();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return isLogged;
}

async function logoutAndNotify() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } finally {
    window.location.href = "/login"; // redirect to home
  }
}





export default function StickyHeader() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Desktop: Soluciones (mega)
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const hoverCloseTimer = useRef<number | null>(null);
  const [nexiOpen, setNexiOpen] = useState(false);
  const nexiHoverCloseTimer = useRef<number | null>(null);

  const openDesktop = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
    setSolutionsOpen(true);
    setNexiOpen(false);
  };
  const scheduleCloseIfOutside = (e: React.PointerEvent) => {
    const to = e.relatedTarget as Node | null;
    const wrap = e.currentTarget as HTMLElement;
    if (wrap && to && wrap.contains(to)) return;
    hoverCloseTimer.current = window.setTimeout(() => {
      setSolutionsOpen(false);
      hoverCloseTimer.current = null;
    }, 120);
  };
  const cancelScheduledClose = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };
  const openNexiDesktop = () => {
    if (nexiHoverCloseTimer.current) {
      clearTimeout(nexiHoverCloseTimer.current);
      nexiHoverCloseTimer.current = null;
    }
    setNexiOpen(true);
    setSolutionsOpen(false);
  };
  const scheduleCloseNexiIfOutside = (e: React.PointerEvent) => {
    const to = e.relatedTarget as Node | null;
    const wrap = e.currentTarget as HTMLElement;
    if (wrap && to && wrap.contains(to)) return;
    nexiHoverCloseTimer.current = window.setTimeout(() => {
      setNexiOpen(false);
      nexiHoverCloseTimer.current = null;
    }, 120);
  };
  const cancelScheduledNexiClose = () => {
    if (nexiHoverCloseTimer.current) {
      clearTimeout(nexiHoverCloseTimer.current);
      nexiHoverCloseTimer.current = null;
    }
  };

  // Transparente sobre #hero; un poco más denso al salir
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return; // si no hay hero, mantiene el estado por defecto (ligero)
    const io = new IntersectionObserver(
      ([entry]) =>
        setSolid(!(entry.isIntersecting && entry.intersectionRatio >= 0.3)),
      { threshold: [0, 0.3, 0.6, 1] }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Bloquear scroll cuando el drawer abre
  useEffect(() => {
    const root = document.documentElement;
    if (!mobileOpen) return;
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
  }, [mobileOpen]);

  const isLogged = useAuthFlag();

  // ======= overlay styles (modal-like, no layout space) =======
  // El wrapper no tiene fondo ni height; solo el "pill" lo tiene.
  const shell =
    "fixed inset-x-0 top-2 z-50 pointer-events-none px-2 sm:px-4 md:px-6 pt-2 sm:pt-3"; // overlay desde el inicio
  const pillBase =
    "pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 " +
    "backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 " +
    "border-white/10 text-white shadow-lg transition-all duration-300 " +
    // brillo sutil (sheen) encima del glass:
    "relative after:content-[''] after:absolute after:inset-0 after:rounded-2xl " +
    "after:bg-[linear-gradient(135deg,rgba(255,255,255,0.36),rgba(255,255,255,0)_22%)] after:pointer-events-none after:opacity-80";
  // Cristal negro claro: más “clear” cuando está sobre el hero; un poco más denso al scrollear.
  // Usamos fallbacks por si tu Tailwind no genera variantes con alfa para colores custom.
  const pillLoose =
    "bg-[rgb(8_8_9_/_0.72)] bg-nf-background/75 bg-gradient-to-br from-nf-primary-600/10 to-nf-primary-500/5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]";
  const pillSolid =
    "bg-[rgb(8_8_9_/_0.86)] bg-nf-background/88 bg-gradient-to-br from-nf-primary-600/10 to-nf-primary-500/5 shadow-[0_10px_40px_rgba(0,0,0,0.45)]";

  return (
    <>
      <header
        className={shell}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className={`${pillBase} ${solid ? pillSolid : pillLoose}`}>
          {/* Logo */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
          >
            <Image
              src="/logo-blanco-nf.png"
              alt="NexalForge"
              width={144}
              height={36}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* Soluciones (dropdown) */}
            <div
              className="relative"
              onPointerEnter={openDesktop}
              onPointerLeave={scheduleCloseIfOutside}
            >
              <button
                className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-white/95 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
                aria-haspopup="true"
                aria-expanded={solutionsOpen}
                onClick={() =>
                  setSolutionsOpen((v) => {
                    const next = !v;
                    if (next) setNexiOpen(false);
                    return next;
                  })
                }
              >
                Soluciones
                <svg
                  className={`h-4 w-4 transition-transform ${
                    solutionsOpen ? "rotate-180" : ""
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

              {/* Mega panel */}
              <div
                className={`absolute left-1/2 top-[calc(100%+12px)] z-[60] w-[600px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[rgb(8_8_9_/_0.95)] p-4 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
                  solutionsOpen
                    ? "pointer-events-auto opacity-100 translate-y-0"
                    : "pointer-events-none opacity-0 -translate-y-1"
                }`}
                onPointerEnter={cancelScheduledClose}
                onPointerLeave={scheduleCloseIfOutside}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(139,30,45,.30), transparent)",
                  }}
                />
                <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {SOLUTIONS.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-[0.98rem] text-white/95 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                        onClick={() => setSolutionsOpen(false)}
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

                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <span className="text-sm text-white/80">
                    ¿Listo para automatizar tu atención?
                  </span>
                  <a
                    href="#contacto"
                    className="rounded-full bg-nf-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-nf-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40 shadow-[0_8px_30px_rgb(139,30,45,0.25)]"
                    onClick={() => setSolutionsOpen(false)}
                  >
                    Agendar demo
                  </a>
                </div>
              </div>
            </div>

            {/* Nexi (dropdown) */}
            <div
              className="relative"
              onPointerEnter={openNexiDesktop}
              onPointerLeave={scheduleCloseNexiIfOutside}
            >
              <button
                className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-white/95 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
                aria-haspopup="true"
                aria-expanded={nexiOpen}
                onClick={() =>
                  setNexiOpen((v) => {
                    const next = !v;
                    if (next) setSolutionsOpen(false);
                    return next;
                  })
                }
              >
                Nexi
                <svg
                  className={`h-4 w-4 transition-transform ${
                    nexiOpen ? "rotate-180" : ""
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

              <div
                className={`absolute left-1/2 top-[calc(100%+12px)] z-[60] w-[480px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[rgb(8_8_9_/_0.95)] p-4 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
                  nexiOpen
                    ? "pointer-events-auto opacity-100 translate-y-0"
                    : "pointer-events-none opacity-0 -translate-y-1"
                }`}
                onPointerEnter={cancelScheduledNexiClose}
                onPointerLeave={scheduleCloseNexiIfOutside}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(139,30,45,.30), transparent)",
                  }}
                />
                <ul className="grid grid-cols-1 gap-1">
                  {NEXI_LINKS.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-[0.98rem] text-white/95 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                        onClick={() => setNexiOpen(false)}
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
              </div>
            </div>

            {TOP_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-xl px-3 py-2 text-white/95 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLogged ? (
              <button
                onClick={logoutAndNotify}
                className="hidden rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40 md:inline-block"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40 md:inline-block"
              >
                Inicio de sesión
              </Link>
            )}

            <BrandCtaLink href="#contacto" ringOffset="dark" className="gap-2">
              Pruébelo gratis{" "}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </BrandCtaLink>

            {/* Hamburger (mobile) */}
            <button
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur transition hover:bg-white/20 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
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

      {/* IMPORTANTE: sin “spacer”; el header es puro overlay y no ocupa lugar */}

      {/* Overlay mobile: solo existe cuando está abierto (no hay barras negras fantasma) */}
      {mobileOpen && (
        <button
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Drawer mobile */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[70] h-screen w-[86%] max-w-[22rem] transform bg-[rgb(8_8_9_/_0.95)] text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl transition-transform duration-300 md:hidden ${
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
              width={136}
              height={34}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            ref={closeBtnRef}
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
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

        <div className="overflow-y-auto px-4 py-3">
          {/* Soluciones */}
          <div className="mb-2">
            <button
              onClick={() =>
                document
                  .getElementById("mobile-soluciones")!
                  .classList.toggle("hidden")
              }
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
              aria-controls="mobile-soluciones"
              aria-expanded={false}
            >
              <span>Soluciones</span>
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
              id="mobile-soluciones"
              className="mt-1 hidden space-y-1 rounded-lg border border-white/10 bg-white/[0.03] p-2"
            >
              {SOLUTIONS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded px-3 py-1.5 text-sm text-white/95 hover:bg-white/5 hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nexi */}
          <div className="mb-2">
            <button
              onClick={() =>
                document
                  .getElementById("mobile-nexi")!
                  .classList.toggle("hidden")
              }
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
              aria-controls="mobile-nexi"
              aria-expanded={false}
            >
              <span>Nexi</span>
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
              id="mobile-nexi"
              className="mt-1 hidden space-y-1 rounded-lg border border-white/10 bg-white/[0.03] p-2"
            >
              {NEXI_LINKS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded px-3 py-1.5 text-sm text-white/95 hover:bg-white/5 hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links principales */}
          <ul className="mt-2 space-y-1">
            {TOP_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-white/95 hover:text-white hover:bg-white/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              {isLogged ? (
                <button
                  onClick={logoutAndNotify}
                  className="flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-[0.98rem] font-medium shadow-[0_10px_30px_-10px_rgba(139,30,45,0.5)] hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
                >
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-[0.98rem] font-medium shadow-[0_10px_30px_-10px_rgba(139,30,45,0.5)] hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40"
                >
                  Inicio de sesión
                </Link>
              )}
            </li>
          </ul>

          {/* glow */}
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
