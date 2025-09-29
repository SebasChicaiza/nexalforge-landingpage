"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Row = {
  id: string;
  slug: string;
  titulo: string;
  publicadoEn: string | null;
  minutosLectura: number | null;
  creadoEn: string;
  actualizadoEn: string;
  estado_borrado?: boolean;
  estado?: { id: number; nombre: string } | null;
  categoria?: { id: string; nombre: string } | null;
};

type ApiResp = {
  rows: Row[];
  total: number;
  page: number;
  take: number;
};

function fmtDate(d?: string | null) {
  if (!d) return "—";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function AdminBlogPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const take = 20;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResp | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function softDelete(id: string) {
    const res = await fetch(`/api/blog/posts/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("No se pudo eliminar");
    // refresh local state
    setData((prev) =>
      prev
        ? {
            ...prev,
            rows: prev.rows.map((x) =>
              x.id === id ? { ...x, estado_borrado: true } : x
            ),
          }
        : prev
    );
  }
  async function restore(id: string) {
    const res = await fetch(`/api/blog/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado_borrado: false }),
    });
    if (!res.ok) throw new Error("No se pudo reactivar");
    setData((prev) =>
      prev
        ? {
            ...prev,
            rows: prev.rows.map((x) =>
              x.id === id ? { ...x, estado_borrado: false } : x
            ),
          }
        : prev
    );
  }

  // debounce query
  const [dq, setDQ] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setDQ(q), 350);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    let canceled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = new URL("/api/blog/posts", window.location.origin);
        url.searchParams.set("page", String(page));
        url.searchParams.set("take", String(take));
        if (dq.trim()) url.searchParams.set("q", dq.trim());

        const res = await fetch(url.toString(), { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResp = await res.json();
        if (!canceled) setData(json);
      } catch (e: unknown) {
        if (!canceled) {
          const message = e instanceof Error ? e.message : "No se pudo cargar";
          setError(message);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => {
      canceled = true;
    };
  }, [page, dq]);

  // reset to page 1 when searching
  useEffect(() => {
    setPage(1);
  }, [dq]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.take));
  }, [data]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Publicaciones del blog
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Administra y revisa tus publicaciones.
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md transition-shadow"
          >
            + Nueva publicación
          </Link>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por título o extracto…"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 shadow-sm outline-none focus:border-neutral-400 focus:ring-0"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <Th>Título</Th>
                  <Th className="min-w-[120px]">Categoría</Th>
                  <Th className="min-w-[120px]">Estado</Th>
                  <Th className="min-w-[120px]">Publicado</Th>
                  <Th className="min-w-[120px]">Actualizado</Th>
                  <Th className="text-right min-w-[100px]">Min. lectura</Th>
                  <Th className="min-w-[120px]">Estado borrado</Th>
                  <Th className="min-w-[140px]">Acciones</Th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200 bg-white">
                {loading && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))}
                  </>
                )}

                {!loading && error && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-red-600"
                    >
                      Error al cargar: {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && data?.rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-neutral-500"
                    >
                      No se encontraron publicaciones.
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  data?.rows.map((r) => (
                    <tr key={r.id} className="hover:bg-neutral-50/60">
                      <Td>
                        <div className="flex flex-col">
                          <span className="font-medium text-neutral-900">
                            {r.titulo}
                          </span>
                          <span className="text-xs text-neutral-500">
                            /{r.slug}
                          </span>
                        </div>
                      </Td>
                      <Td>{r.categoria?.nombre ?? "—"}</Td>
                      <Td>
                        <span
                          className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium
                        border-neutral-200 text-neutral-700 bg-neutral-50"
                        >
                          {r.estado?.nombre ?? "—"}
                        </span>
                      </Td>
                      <Td>{fmtDate(r.publicadoEn)}</Td>
                      <Td>{fmtDate(r.actualizadoEn)}</Td>
                      <Td className="text-right">{r.minutosLectura ?? "—"}</Td>
                      <Td>
                        {(() => {
                          const isInactive = r.estado_borrado === true; // true => "Inactivo", false/undefined => "Activo"
                          return (
                            <span
                              className={[
                                "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                                isInactive
                                  ? "border-red-200 text-red-700 bg-red-50"
                                  : "border-green-200 text-green-700 bg-green-50",
                              ].join(" ")}
                            >
                              {isInactive ? "Inactivo" : "Activo"}
                            </span>
                          );
                        })()}
                      </Td>

                      <Td>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/blog/${r.slug}`}
                            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50"
                          >
                            Ver
                          </Link>
                          <Link
                            href={`/admin/blog/${r.id}/edit`}
                            className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:shadow"
                          >
                            Editar
                          </Link>

                          {r.estado_borrado ? (
                            <button
                              onClick={() => restore(r.id)}
                              className="rounded-lg border border-green-200 bg-green-600/10 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-600/20 transition-colors"
                              title="Reactivar publicación"
                            >
                              Reactivar
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    "¿Seguro que deseas enviar esta publicación a la papelera?"
                                  )
                                ) {
                                  softDelete(r.id).catch((e) =>
                                    alert((e as Error).message)
                                  );
                                }
                              }}
                              className="rounded-lg border border-red-200 bg-red-600/10 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-600/20 transition-colors"
                              title="Enviar a la papelera"
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </Td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-3">
            <div className="text-xs text-neutral-500">
              {data ? (
                <>
                  Página{" "}
                  <span className="font-medium text-neutral-800">
                    {data.page}
                  </span>{" "}
                  de{" "}
                  <span className="font-medium text-neutral-800">
                    {totalPages}
                  </span>
                  {` • `}
                  {data.total} en total
                </>
              ) : (
                "—"
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || loading}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={loading || (data ? page >= totalPages : false)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Th(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <th
      className={
        "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 " +
        (props.className ?? "")
      }
    >
      {props.children}
    </th>
  );
}

function Td(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <td
      className={
        "whitespace-nowrap px-6 py-4 text-sm text-neutral-800 " +
        (props.className ?? "")
      }
    >
      {props.children}
    </td>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 w-full max-w-[180px] animate-pulse rounded bg-neutral-200" />
        </td>
      ))}
    </tr>
  );
}
