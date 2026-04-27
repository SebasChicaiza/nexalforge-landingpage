"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type LeadRow = {
  id: string;
  nombreRepresentante: string;
  nombreClinica: string;
  numeroWhatsApp: string;
  usuarioInstagram: string | null;
  emailContacto: string;
  creadoEn: string;
  actualizadoEn: string;
  estado: { id: number; nombre: string };
  ciudad: {
    id: number;
    nombre: string;
    pais: { id: number; nombre: string; iso2: string };
  };
};

type ApiResponse = {
  rows: LeadRow[];
  total: number;
  page: number;
  take: number;
};

function fmtDate(value?: string | null): string {
  if (!value) return "—";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString("es-EC", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function statusClass(statusName: string): string {
  const key = statusName.toUpperCase();
  if (key === "NUEVO") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }
  if (key === "EN_CONTACTO") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  if (key === "CERRADO") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  return "border-neutral-200 bg-neutral-50 text-neutral-700";
}

export default function AdminDemoLeadsPage() {
  const [q, setQ] = useState("");
  const [dq, setDQ] = useState("");
  const [page, setPage] = useState(1);
  const take = 20;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    setPage(1);
  }, [dq]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = new URL("/api/demo-leads", window.location.origin);
        url.searchParams.set("page", String(page));
        url.searchParams.set("take", String(take));
        if (dq) url.searchParams.set("q", dq);

        const response = await fetch(url.toString(), { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = (await response.json()) as ApiResponse;
        if (!cancelled) setData(json);
      } catch (err) {
        const message = err instanceof Error ? err.message : "No se pudo cargar";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [dq, page]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.take));
  }, [data]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Solicitudes de demo
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Revisa y gestiona los datos enviados desde /demo-1.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/demo-leads/catalog"
              className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              Catalogo pais/ciudad
            </Link>
            <Link
              href="/admin/blog"
              className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              Ir a Blog
            </Link>
          </div>
        </div>

      <div className="mb-4">
        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Buscar por clínica, responsable, ciudad, país o email..."
          className="w-full max-w-md rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 shadow-sm outline-none focus:border-neutral-400"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <Th>Clinica</Th>
                  <Th>Responsable</Th>
                  <Th>Ubicacion</Th>
                  <Th>Contacto</Th>
                  <Th>Estado</Th>
                  <Th>Creado</Th>
                  <Th>Acciones</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {loading &&
                  Array.from({ length: 6 }).map((_, index) => (
                    <tr key={index}>
                      <Td><div className="h-3 w-40 animate-pulse rounded bg-neutral-200" /></Td>
                      <Td><div className="h-3 w-28 animate-pulse rounded bg-neutral-200" /></Td>
                      <Td><div className="h-3 w-24 animate-pulse rounded bg-neutral-200" /></Td>
                      <Td><div className="h-3 w-44 animate-pulse rounded bg-neutral-200" /></Td>
                      <Td><div className="h-3 w-20 animate-pulse rounded bg-neutral-200" /></Td>
                      <Td><div className="h-3 w-24 animate-pulse rounded bg-neutral-200" /></Td>
                      <Td><div className="h-3 w-16 animate-pulse rounded bg-neutral-200" /></Td>
                    </tr>
                  ))}

                {!loading && error && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-sm text-red-600">
                      Error al cargar: {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && data?.rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-sm text-neutral-500">
                      No hay solicitudes por mostrar.
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  data?.rows.map((row) => (
                    <tr key={row.id} className="hover:bg-neutral-50/60">
                      <Td>
                        <div className="font-medium text-neutral-900">{row.nombreClinica}</div>
                      </Td>
                      <Td>{row.nombreRepresentante}</Td>
                      <Td>{row.ciudad.nombre}, {row.ciudad.pais.nombre}</Td>
                      <Td>
                        <div className="text-sm text-neutral-800">{row.emailContacto}</div>
                        <div className="text-xs text-neutral-500">{row.numeroWhatsApp}</div>
                      </Td>
                      <Td>
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusClass(row.estado.nombre)}`}>
                          {row.estado.nombre}
                        </span>
                      </Td>
                      <Td>{fmtDate(row.creadoEn)}</Td>
                      <Td>
                        <Link
                          href={`/admin/demo-leads/${row.id}/edit`}
                          className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:shadow"
                        >
                          Editar
                        </Link>
                      </Td>
                    </tr>
                  ))}
              </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          Total: <span className="font-medium text-neutral-700">{data?.total ?? 0}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-neutral-600">
            Pagina {page} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600 ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 text-sm text-neutral-700 ${className}`}>{children}</td>;
}
