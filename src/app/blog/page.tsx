"use client";

// at the top of app/blog/page.tsx
import PostCard, {
  SkeletonCard,
  type Post as PostType,
} from "@/components/PostCard";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

// --- Brand tokens ---
const BRAND = {
  primary: "#8B1E2D", // Nexal red
  primaryHover: "#B84550",
  text: "#2A2A2A",
};

// --- Mock data (replace with your CMS/fetch later) ---
type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  cover?: string;
  category: "AI" | "LLMs" | "Automation" | "Infra" | "Product";
  tags: string[];
  readingMins: number;
};

const POSTS: Post[] = [
  {
    slug: "agents-venta-whatsapp-2025",
    title: "Agentes de venta en WhatsApp: qué funciona en 2025",
    excerpt:
      "Del intent al booking en un solo hilo. Qué prompts, flows y handoffs convierten mejor.",
    date: "2025-09-18",
    cover: "/blog/whatsapp-agents.jpg",
    category: "Automation",
    tags: ["WhatsApp", "N8N", "Handoff"],
    readingMins: 6,
  },
  {
    slug: "rag-estrategias-low-latency",
    title: "RAG low-latency para e-commerce: 3 patrones prácticos",
    excerpt:
      "Cachés, chunking semántico y colas. Cómo bajar p95 y mantener calidad.",
    date: "2025-09-12",
    cover: "/blog/rag-latency.jpg",
    category: "LLMs",
    tags: ["RAG", "Caching", "Embeddings"],
    readingMins: 8,
  },
  {
    slug: "observabilidad-llm-en-produccion",
    title: "Observabilidad LLM en producción: señales que importan",
    excerpt:
      "Deja de mirar solo tokens. Confianza, cobertura, rutas y costos por intento.",
    date: "2025-09-05",
    cover: "/blog/observability.jpg",
    category: "Product",
    tags: ["Analytics", "Routing", "Costs"],
    readingMins: 7,
  },
  {
    slug: "infra-costos-multitenant",
    title: "Infra multi-tenant sin dolor: costos y límites reales",
    excerpt:
      "Postgres schemas + RLS, colas y workers. Dónde se rompen las cosas.",
    date: "2025-08-30",
    cover: "/blog/multitenant.jpg",
    category: "Infra",
    tags: ["Postgres", "RLS", "Queues"],
    readingMins: 9,
  },
  {
    slug: "ux-prompts-agentes",
    title: "UX de prompts para agentes conversacionales",
    excerpt:
      "Estructuras, fallback y memoria. Diseño de experiencias que no frustran.",
    date: "2025-08-22",
    cover: "/blog/ux-prompts.jpg",
    category: "AI",
    tags: ["Prompting", "Memory", "UX"],
    readingMins: 5,
  },
];

const CATEGORIES = [
  "All",
  "AI",
  "LLMs",
  "Automation",
  "Infra",
  "Product",
] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const TAGS = Array.from(new Set(POSTS.flatMap((p) => p.tags))).sort();

// --- Helpers ---
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// --- UI ---
export default function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"new" | "old">("new");
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 7000); // 1s demo
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [query, category, tag, sort]);

  // how many skeletons to show (grid-friendly)
  const skeletonCount = 6;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = POSTS.filter((p) => {
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCat = category === "All" || p.category === category;
      const matchesTag = !tag || p.tags.includes(tag);
      return matchesQ && matchesCat && matchesTag;
    });

    list = list.sort((a, b) =>
      sort === "new"
        ? +new Date(b.date) - +new Date(a.date)
        : +new Date(a.date) - +new Date(b.date)
    );

    return list;
  }, [query, category, tag, sort]);

  const visible = filtered.slice(0, limit);
  const canLoadMore = filtered.length > visible.length;

  return (
    <main className="bg-white text-[color:var(--text,#2A2A2A)]">
      {/* Hero header */}
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
            {CATEGORIES.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "border-transparent text-white"
                      : "border-neutral-300 text-neutral-700 hover:bg-neutral-100",
                  ].join(" ")}
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
          {tag && (
            <div className="mb-4 flex items-center gap-2 text-sm">
              <span className="rounded-full bg-neutral-100 px-3 py-1">
                Tag: <b>{tag}</b>
              </span>
              <button
                onClick={() => setTag(null)}
                className="text-neutral-500 hover:underline"
              >
                Limpiar
              </button>
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: skeletonCount }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : visible.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    onTagClick={(t) => setTag(t)}
                    // variant="compact"
                  />
                ))}
          </div>

          {/* Empty state */}
          {visible.length === 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center text-neutral-600">
              No encontramos artículos con esos filtros.
            </div>
          )}

          {/* Load more */}
          {canLoadMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setLimit((n) => n + 6)}
                className="rounded-full px-5 py-2.5 text-sm text-white"
                style={{ background: BRAND.primary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = BRAND.primaryHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = BRAND.primary)
                }
              >
                Cargar más
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
                className={`rounded-full px-3 py-1.5 text-sm ${sort === "new" ? "text-white" : "border border-neutral-300 text-neutral-700"}`}
                style={
                  sort === "new" ? { background: BRAND.primary } : undefined
                }
              >
                Más recientes
              </button>
              <button
                onClick={() => setSort("old")}
                className={`rounded-full px-3 py-1.5 text-sm ${sort === "old" ? "text-white" : "border border-neutral-300 text-neutral-700"}`}
                style={
                  sort === "old" ? { background: BRAND.primary } : undefined
                }
              >
                Más antiguas
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="mb-2 text-sm font-semibold text-[#2A2A2A]">
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => {
                const active = tag === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTag(active ? null : t)}
                    className={`rounded-full px-3 py-1.5 text-xs ${active ? "text-white" : "border border-neutral-300 text-neutral-700"}`}
                    style={active ? { background: BRAND.primary } : undefined}
                    aria-pressed={active}
                  >
                    #{t}
                  </button>
                );
              })}
            </div>
          </div>

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
