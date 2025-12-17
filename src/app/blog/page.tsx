// app/blog/page.tsx
"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import AdminBlogsButton from "@/components/blog/AdminBlogsButton";
import { AnimatePresence, motion } from "framer-motion";

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

  if (isAbsoluteUrl(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className={className}
        unoptimized
      />
    );
  }

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

/** ───────────────── Types ───────────────── */
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
type BlogPageProps = { initialTag?: string | null };

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

const EASE = [0.2, 0, 0, 1] as const;
const DURATION = 0.22;

/** ───────────────── Page ───────────────── */
export default function BlogPage({ initialTag = null }: BlogPageProps = {}) {
  const searchParams = useSearchParams();
  const [meta, setMeta] = useState<MetaResp | null>(null);
  const [items, setItems] = useState<PostRow[]>([]);
  const [page, setPage] = useState(1);
  const [take] = useState(12);
  const [total, setTotal] = useState(0);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [tagSlug, setTagSlug] = useState<string | null>(() => {
    const tagFromUrl = searchParams.get("tag");
    return tagFromUrl ?? initialTag ?? null;
  });
  const [sort, setSort] = useState<"new" | "old">("new");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const tagFromUrl = searchParams.get("tag");
    if (tagFromUrl && tagFromUrl !== tagSlug) {
      setTagSlug(tagFromUrl);
    }
  }, [searchParams, tagSlug]);

  // control de expansión de categorías
  const [showAllCats, setShowAllCats] = useState(false);
  const MAX_CATS = 8;

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

  // Popularidad de categorías con los items cargados
  const categoryStats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of items) {
      const name = p.categoria?.nombre ?? "General";
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    const known = meta?.categorias?.map((c) => c.nombre).filter(Boolean) ?? [];
    const uniqueNames = Array.from(new Set([...known, ...counts.keys()]));
    const stats = uniqueNames.map((nombre) => ({
      nombre,
      count: counts.get(nombre) ?? 0,
    }));
    stats.sort(
      (a, b) => b.count - a.count || a.nombre.localeCompare(b.nombre, "es")
    );
    return stats;
  }, [items, meta]);

  // Lista visible (limitada o completa). "All" siempre primero
  const categories = useMemo(() => {
    const ordered = categoryStats.map((s) => s.nombre);
    const trimmed = showAllCats ? ordered : ordered.slice(0, MAX_CATS);
    return ["All", ...trimmed];
  }, [categoryStats, showAllCats]);

  // derived UI data
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
    <main className="bg-white text-[color:var(--text,#2A2A2A)] pt-12">
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
              <div className="mt-6">
                <AdminBlogsButton />
              </div>
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
          <div className="mt-6">
            {/* Contenedor con animación de layout para altura suave */}
            <motion.div
              layout
              className="flex flex-wrap items-center gap-2"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {categories.map((c) => {
                  const active = c === category;
                  return (
                    <motion.button
                      key={c}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: DURATION }}
                      onClick={() => setCategory(c)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors cursor-pointer",
                        active
                          ? "border-transparent text-white"
                          : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                      )}
                      style={active ? { background: BRAND.primary } : undefined}
                      aria-pressed={active}
                      whileTap={{ scale: 0.98 }}
                    >
                      {c}
                    </motion.button>
                  );
                })}
              </AnimatePresence>

              {/* Toggle ver todas/menos */}
              {categoryStats.length > MAX_CATS && (
                <motion.button
                  layout
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAllCats((v) => !v)}
                  className="rounded-full border px-3 py-1.5 text-sm text-white cursor-pointer"
                  style={{ background: BRAND.primary }}
                  aria-expanded={showAllCats}
                >
                  {showAllCats ? "Ver menos" : "Ver todas las categorías"}
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content grid + sidebar */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-[1fr_320px]">
        {/* Posts */}
        <div>
          {/* Tag filter summary */}
          <AnimatePresence initial={false}>
            {tagSlug && (
              <motion.div
                className="mb-4 flex items-center gap-2 text-sm"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: DURATION, ease: EASE }}
              >
                <span className="rounded-full bg-neutral-100 px-3 py-1">
                  Tag: <b>{tagSlug}</b>
                </span>
                <button
                  onClick={() => setTagSlug(null)}
                  className="text-neutral-500 hover:underline cursor-pointer"
                >
                  Limpiar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cards Grid with animations on sort/tag/category changes */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            transition={{ duration: 0.28, ease: EASE }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {loading && items.length === 0
                ? Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: DURATION, ease: EASE }}
                    >
                      <SkeletonCard />
                    </motion.div>
                  ))
                : filtered.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: DURATION, ease: EASE }}
                    >
                      <PostCard
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
                    </motion.div>
                  ))}
            </AnimatePresence>
          </motion.div>

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
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setSort("new")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm cursor-pointer",
                  sort === "new"
                    ? "text-white"
                    : "border border-neutral-300 text-neutral-700"
                )}
                style={
                  sort === "new" ? { background: BRAND.primary } : undefined
                }
              >
                Más recientes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setSort("old")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm cursor-pointer",
                  sort === "old"
                    ? "text-white"
                    : "border border-neutral-300 text-neutral-700"
                )}
                style={
                  sort === "old" ? { background: BRAND.primary } : undefined
                }
              >
                Más antiguas
              </motion.button>
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
                    <motion.button
                      key={t.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTagSlug(active ? null : t.slug)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs cursor-pointer",
                        active
                          ? "text-white"
                          : "border border-neutral-300 text-neutral-700"
                      )}
                      style={active ? { background: BRAND.primary } : undefined}
                      aria-pressed={active}
                    >
                      #{t.nombre} {!!t.count && (
                        <span className="opacity-50">({t.count})</span>
                      )}
                    </motion.button>
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
              <NewsletterForm origen="blog_sidebar" />
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
  excerpt,
  tags,
  onTagClick,
}: {
  title: string;
  href: string;
  cover?: string;
  category: string;
  date: string;
  readingMins: number;
  excerpt?: string;
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
