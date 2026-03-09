"use client";

import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  FileText,
  Globe2,
  PlusSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  match?: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    label: "Solicitudes demo",
    href: "/admin/demo-leads",
    icon: ClipboardList,
    description: "Leads y seguimiento comercial",
    match: (pathname) =>
      pathname === "/admin/demo-leads" ||
      (pathname.startsWith("/admin/demo-leads/") &&
        !pathname.startsWith("/admin/demo-leads/catalog")),
  },
  {
    label: "Catalogo pais/ciudad",
    href: "/admin/demo-leads/catalog",
    icon: Globe2,
    description: "Paises y ciudades del formulario",
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: FileText,
    description: "Publicaciones y edicion",
    match: (pathname) =>
      pathname === "/admin/blog" ||
      (pathname.startsWith("/admin/blog/") && pathname !== "/admin/blog/new"),
  },
  {
    label: "Nueva publicacion",
    href: "/admin/blog/new",
    icon: PlusSquare,
    description: "Crear contenido nuevo",
  },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.match) return item.match(pathname);
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
          {navItems.map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <aside className="hidden md:block md:w-72 md:shrink-0">
        <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="rounded-xl border border-blue-100 bg-blue-50/80 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
              <Sparkles className="h-4 w-4" />
              Panel de administracion
            </div>
            <p className="mt-1 text-xs text-blue-800/80">
              Gestiona leads, catalogos y contenido desde un solo lugar.
            </p>
          </div>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                    active
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-transparent text-neutral-700 hover:border-neutral-200 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span
                      className={[
                        "block text-xs",
                        active ? "text-neutral-300" : "text-neutral-500",
                      ].join(" ")}
                    >
                      {item.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
