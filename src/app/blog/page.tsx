"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function isAbsoluteUrl(src?: string | null) {
  return !!src && /^https?:\/\//i.test(src);
}

function SafeImage({
  src,
  alt,
  className,
  fill,
  sizes,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}) {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center text-neutral-400">
        Sin portada
      </div>
    );
  }

  // If it’s an absolute external URL, render unoptimized to skip the whitelist
  if (isAbsoluteUrl(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className={className}
        unoptimized
        // NOTE: unoptimized bypasses the domain check
      />
    );
  }

  // Relative (local) paths are fine with regular Image
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
    />
  );
}

/** ───────────────── Brand ───────────────── */
const BRAND = {
  primary: "#8B1E2D",
  primaryHover: "#B84550",
  text: "#2A2A2A",
};

/** ───────────────── Types (from your APIs) ───────────────── */
type MetaResp = {
  categorias: { id: string; nombre: string }[];
  estados: { id: number; nombre: string }[];
  etiquetas: { id: string; nombre: string; slug: string; count: number }[];
};

type PostRow = {
  id: string;
  slug: string;
  titulo: string;
  extracto: string;
  publicadoEn: string | null;
  minutosLectura: number | null;
  creadoEn: string;
  actualizadoEn: string;
  portadaUrl: string | null;
  estado_borrado?: boolean;
  estado: { id: number; nombre: string };
  categoria: { id: string; nombre: string };
  etiquetas: { id: string; nombre: string; slug: string }[];
};
type PostsResp = { rows: PostRow[]; total: number; page: number; take: number };

/** ───────────────── Helpers ───────────────── */
function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
const cn = (...xs: (string | false | null | undefined)[]) =>
  xs.filter(Boolean).join(" ");

/** ───────────────── Page ───────────────── */
export default function BlogPage() {
  const [meta, setMeta] = useState<MetaResp | null>(null);
  const [items, setItems] = useState<PostRow[]>([]);
  const [page, setPage] = useState(1);
  const [take] = useState(12);
  const [total, setTotal] = useState(0);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [tagSlug, setTagSlug] = useState<string | null>(null);
  const [sort, setSort] = useState<"new" | "old">("new");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // initial load (meta + first page)
  useEffect(() => {
    let ok = true;
    (async () => {
      setLoading(true);
      try {
        const [m, p] = await Promise.all([
          fetch("/api/blog/meta", { cache: "no-store" }).then((r) => r.json()),
          fetch(`/api/blog/posts?page=1&take=${take}`, {
            cache: "no-store",
          }).then((r) => r.json()),
        ]);
        if (!ok) return;
        setMeta(m);
        setItems((p as PostsResp).rows);
        setTotal((p as PostsResp).total);
        setPage(1);
      } finally {
        if (ok) setLoading(false);
      }
    })();
    return () => {
      ok = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // search (refetch page 1 when query changes)
  useEffect(() => {
    let ok = true;
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const qs = new URLSearchParams({ page: "1", take: String(take) });
        if (query.trim()) qs.set("q", query.trim());
        const p: PostsResp = await fetch(`/api/blog/posts?${qs}`, {
          cache: "no-store",
        }).then((r) => r.json());
        if (!ok) return;
        setItems(p.rows);
        setTotal(p.total);
        setPage(1);
      } finally {
        if (ok) setLoading(false);
      }
    }, 250);
    return () => {
      ok = false;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // derived UI data
  const categories = useMemo(
    () => ["All", ...(meta?.categorias?.map((c) => c.nombre) ?? [])],
    [meta]
  );

  const filtered = useMemo(() => {
    let list = items
      .filter((p) => p.estado_borrado !== true)
      .filter((p) => p.estado.nombre === "PUBLICADO")
      .filter((p) => {
        const byCat = category === "All" || p.categoria?.nombre === category;
        const byTag =
          !tagSlug ||
          p.etiquetas.some((t) => t.slug === tagSlug || t.nombre === tagSlug);
        return byCat && byTag;
      });

    list = list.sort((a, b) => {
      const da = +new Date(a.publicadoEn ?? a.creadoEn);
      const db = +new Date(b.publicadoEn ?? b.creadoEn);
      return sort === "new" ? db - da : da - db;
    });
    return list;
  }, [items, category, tagSlug, sort]);

  const canLoadMore = filtered.length < total;

  async function loadMore() {
    if (!canLoadMore) return;
    setLoadingMore(true);
    try {
      const qs = new URLSearchParams({
        page: String(page + 1),
        take: String(take),
      });
      if (query.trim()) qs.set("q", query.trim());
      const p: PostsResp = await fetch(`/api/blog/posts?${qs}`, {
        cache: "no-store",
      }).then((r) => r.json());
      setItems((prev) => [...prev, ...p.rows]);
      setPage(p.page);
      setTotal(p.total);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <main className="bg-white text-[color:var(--text,#2A2A2A)]">
      {/* Header */}
      <section className="border-b border-neutral-200 bg-neutral-50/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#2A2A2A] sm:text-4xl">
                Blog & Noticias
              </h1>
              <p className="mt-1 text-neutral-600">
                Tendencias en IA, automatización y tecnología aplicada. Curado
                por NexalForge.
              </p>
            </div>
            {/* Search */}
            <div className="w-full md:w-[420px]">
              <label className="sr-only" htmlFor="blog-search">
                Buscar
              </label>
              <div className="relative">
                <input
                  id="blog-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar artículos, tags, temas…"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 pr-10 text-sm outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-400"
                />
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 opacity-60"
                >
                  <path
                    fill="currentColor"
                    d="M21 21l-4.3-4.3m1.6-5.3A7.5 7.5 0 1 1 3 11.4a7.5 7.5 0 0 1 15 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "border-transparent text-white"
                      : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                  )}
                  style={active ? { background: BRAND.primary } : undefined}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content grid + sidebar */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-[1fr_320px]">
        {/* Posts */}
        <div>
          {/* Tag filter summary */}
          {tagSlug && (
            <div className="mb-4 flex items-center gap-2 text-sm">
              <span className="rounded-full bg-neutral-100 px-3 py-1">
                Tag: <b>{tagSlug}</b>
              </span>
              <button
                onClick={() => setTagSlug(null)}
                className="text-neutral-500 hover:underline"
              >
                Limpiar
              </button>
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading && items.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : filtered.map((p) => (
                  <PostCard
                    key={p.id}
                    title={p.titulo}
                    href={`/blog/${p.slug}`}
                    cover={p.portadaUrl ?? undefined}
                    category={p.categoria?.nombre ?? "General"}
                    date={p.publicadoEn ?? p.creadoEn}
                    readingMins={p.minutosLectura ?? 1}
                    excerpt={p.extracto}
                    tags={p.etiquetas}
                    onTagClick={(slug) => setTagSlug(slug)}
                  />
                ))}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center text-neutral-600">
              No encontramos artículos con esos filtros.
            </div>
          )}

          {/* Load more */}
          {canLoadMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="rounded-full px-5 py-2.5 text-sm text-white disabled:opacity-60"
                style={{ background: BRAND.primary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = BRAND.primaryHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = BRAND.primary)
                }
              >
                {loadingMore ? "Cargando…" : "Cargar más"}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="sticky top-24 h-fit space-y-6">
          {/* Sort */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="mb-2 text-sm font-semibold text-[#2A2A2A]">
              Ordenar
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSort("new")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm",
                  sort === "new"
                    ? "text-white"
                    : "border border-neutral-300 text-neutral-700"
                )}
                style={
                  sort === "new" ? { background: BRAND.primary } : undefined
                }
              >
                Más recientes
              </button>
              <button
                onClick={() => setSort("old")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm",
                  sort === "old"
                    ? "text-white"
                    : "border border-neutral-300 text-neutral-700"
                )}
                style={
                  sort === "old" ? { background: BRAND.primary } : undefined
                }
              >
                Más antiguas
              </button>
            </div>
          </div>

          {/* Tags cloud (from meta) */}
          {meta?.etiquetas?.length ? (
            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="mb-2 text-sm font-semibold text-[#2A2A2A]">
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {meta.etiquetas.map((t) => {
                  const active = tagSlug === t.slug || tagSlug === t.nombre;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTagSlug(active ? null : t.slug)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs",
                        active
                          ? "text-white"
                          : "border border-neutral-300 text-neutral-700"
                      )}
                      style={active ? { background: BRAND.primary } : undefined}
                      aria-pressed={active}
                    >
                      #{t.nombre}{" "}
                      {!!t.count && (
                        <span className="opacity-50">({t.count})</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Newsletter */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50">
            <div className="p-5">
              <div className="text-sm font-semibold text-[#2A2A2A]">
                Newsletter
              </div>
              <p className="mt-1 text-sm text-neutral-600">
                Enviamos ideas accionables de IA y automatización. 1–2
                correos/mes.
              </p>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Suscrito (demo). Conecta tu endpoint más tarde.");
                }}
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full flex-1 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-400"
                />
                <button
                  type="submit"
                  className="rounded-xl px-4 text-sm text-white"
                  style={{ background: BRAND.primary }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = BRAND.primaryHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = BRAND.primary)
                  }
                >
                  Suscribirme
                </button>
              </form>
            </div>
            <div className="relative h-20 w-full">
              <Image
                src="/logo-nexal.png"
                alt="NexalForge"
                fill
                sizes="300px"
                className="object-contain p-4 opacity-10"
                priority
              />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

/** ───────────────── Local Cards ───────────────── */
function PostCard({
  title,
  href,
  cover,
  category,
  date,
  readingMins,
  excerpt, // 👈 new
  tags,
  onTagClick,
}: {
  title: string;
  href: string;
  cover?: string;
  category: string;
  date: string;
  readingMins: number;
  excerpt?: string; // 👈 new
  tags: { slug: string; nombre: string }[];
  onTagClick?: (slug: string) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:shadow-xl">
      <a
        href={href}
        className="block focus:outline-none focus:ring-2 focus:ring-offset-2"
        aria-label={title}
      >
        <div className="relative h-40 w-full overflow-hidden bg-neutral-100">
          <SafeImage
            src={cover}
            alt={title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </a>
      <div className="p-4">
        <div className="mb-1.5 flex items-center gap-2 text-xs text-neutral-600">
          <span className="rounded-full border px-2 py-0.5">{category}</span>
          <span aria-hidden>•</span>
          <time dateTime={date}>{formatDate(date)}</time>
          <span aria-hidden>•</span>
          <span>{readingMins} min</span>
        </div>

        <a href={href}>
          <h3 className="line-clamp-2 text-[15px] font-semibold text-[#2A2A2A]">
            {title}
          </h3>
        </a>

        {!!excerpt && (
          <p className="mt-1 line-clamp-3 text-sm text-neutral-600">
            {excerpt}
          </p>
        )}

        {!!tags?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t.slug}
                onClick={() => onTagClick?.(t.slug)}
                className="rounded-full border border-neutral-300 px-2.5 py-1 text-[11px] text-neutral-700 hover:bg-neutral-50"
              >
                #{t.nombre}
              </button>
            ))}
          </div>
        )}
      </div>
      <div
        className="pointer-events-none h-1 w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: BRAND.primary }}
      />
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="h-40 w-full bg-neutral-100" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-24 rounded bg-neutral-200" />
        <div className="h-4 w-3/4 rounded bg-neutral-200" />
        <div className="h-3 w-full rounded bg-neutral-100" />
        <div className="h-3 w-5/6 rounded bg-neutral-100" />
      </div>
    </div>
  );
}
