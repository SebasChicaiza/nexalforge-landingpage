// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import "./blog-content.css";
import type { ComponentProps } from "react";

type BlogPostPageParams = { slug: string };
type BlogTag = { id: string; nombre: string; slug: string | null };

type RelatedSolution = {
  href: string;
  title: string;
  description: string;
};

function normalizeMarkdown(input: string): string {
  let s = (input ?? "").replace(/\r\n/g, "\n");

  // 1) Repara bloques tipo:
  //    javascript\n<codigo>   →   ```javascript\n<codigo>\n```
  s = s.replace(
    /(^|\n)(javascript|js)\n([\s\S]+?)(?=\n{2,}|$)/g,
    (_m, p1, lang, code) => `${p1}\`\`\`${lang}\n${code.trimEnd()}\n\`\`\`\n`
  );

  // 2) Asegura reglas horizontales: ----- → (con saltos adecuados)
  s = s.replace(/\n-{3,}\n?/g, "\n\n---\n\n");

  // 3) Escapa "< 2" y similares para que no parezca HTML
  s = s.replace(/<\s(\d)/g, "&lt; $1");

  // 4) Cierra cercas si quedó un número impar de ```
  const fenceCount = (s.match(/```/g) ?? []).length;
  if (fenceCount % 2 === 1) s += "\n```";

  return s;
}

// --- renderer ---
async function renderMarkdown(md?: string | null) {
  if (!md) return null;
  const source = normalizeMarkdown(md);

  try {
    const ReactMarkdown = (await import("react-markdown")).default;
    const remarkGfm = (await import("remark-gfm")).default;
    const rehypeSlug = (await import("rehype-slug")).default;
    const rehypeAutolinkHeadings = (await import("rehype-autolink-headings"))
      .default;
    const rehypeSanitize = (await import("rehype-sanitize")).default;

    // Tipamos <table> para evitar any
    type TableProps = ComponentProps<"table"> & { node?: unknown };

    const components: import("react-markdown").Components = {
      table: ({ node: _node, className, ...props }: TableProps) => (
        <div
          className="nf-table-wrapper"
          role="region"
          aria-label="Tabla desplazable"
          tabIndex={0}
        >
          <table
            {...props}
            className={["nf-table", className].filter(Boolean).join(" ")}
          />
        </div>
      ),
    };

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: "no-underline" } },
          ],
          rehypeSanitize,
        ]}
        components={components}
      >
        {source}
      </ReactMarkdown>
    );
  } catch {
    return (
      <pre className="whitespace-pre-wrap break-words text-[0.95rem] leading-7 text-neutral-800">
        {source}
      </pre>
    );
  }
}

function fmtDate(d?: Date | null) {
  if (!d) return null;
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

function normalizeForMatching(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getRelatedSolution(title: string, tags: BlogTag[]): RelatedSolution {
  const textToMatch = [
    title,
    ...tags.map((tag) => tag.nombre),
    ...tags.map((tag) => tag.slug ?? ""),
  ]
    .map(normalizeForMatching)
    .join(" ");

  if (textToMatch.includes("dentist") || textToMatch.includes("citas")) {
    return {
      href: "/soluciones/clinicas-medicas/agendamiento-citas",
      title: "Agendamiento de citas para clínicas médicas",
      description:
        "Automatiza confirmaciones y reprogramaciones para reducir no-shows y liberar al equipo de recepción.",
    };
  }

  return {
    href: "/soluciones",
    title: "Descubre nuestras soluciones con IA",
    description:
      "Explora casos de uso por industria y conecta la estrategia de contenido con páginas transaccionales.",
  };
}

async function getPost(slug: string) {
  return prisma.publicacion.findUnique({
    where: { slug },
    include: {
      estado: { select: { id: true, nombre: true } },
      categoria: { select: { id: true, nombre: true } },
      autor: { select: { id: true, nombre: true, avatarUrl: true } },
      etiquetas: {
        select: {
          etiqueta: { select: { id: true, nombre: true, slug: true } },
        },
        orderBy: { etiqueta: { nombre: "asc" } },
      },
    },
  });
}

async function recordView(publicacionId: string) {
  try {
    // ✅ headers() es async en Next 15
    const h = await headers();

    const forwarded = h.get("x-forwarded-for");
    const ipRaw = forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "";

    const ipHash = ipRaw
      ? crypto.createHash("sha256").update(ipRaw).digest("hex").slice(0, 16)
      : null;

    const agenteUsuario = h.get("user-agent") ?? null;

    await prisma.vistaPublicacion.create({
      data: { publicacionId, ipHash, agenteUsuario },
    });
  } catch {
    // swallow (never break the page render due to analytics)
  }
}

/* ------------------------------------
   SEO Metadata
------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}) {
  const { slug } = await params;

  const post = await prisma.publicacion.findUnique({
    where: { slug },
    select: {
      titulo: true,
      extracto: true,
      portadaUrl: true,
      estado: { select: { nombre: true } },
    },
  });

  if (!post || post.estado?.nombre !== "PUBLICADO") {
    return {
      title: "Blog",
      description: "Publicaciones",
    };
  }

  const title = post.titulo;
  const description = post.extracto?.slice(0, 180) ?? undefined;
  const images = post.portadaUrl ? [post.portadaUrl] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

/* ------------------------------------
   Page
------------------------------------ */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  // 404 if not found or not published
  if (!post || post.estado?.nombre !== "PUBLICADO") {
    notFound();
  }

  // Record view (don’t block rendering too much)
  await recordView(post.id);

  const publishedAt = post.publicadoEn ? fmtDate(post.publicadoEn) : null;
  const minutes =
    post.minutosLectura ??
    Math.max(1, Math.round((post.contenidoMd ?? "").split(/\s+/).length / 220));
  const tags: BlogTag[] = post.etiquetas.map((e) => e.etiqueta);
  const relatedSolution = getRelatedSolution(post.titulo, tags);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titulo,
    description: post.extracto ?? null,
    image: post.portadaUrl ? [post.portadaUrl] : [],
    datePublished: post.publicadoEn?.toISOString() ?? null,
    dateModified:
      post.actualizadoEn?.toISOString() ??
      post.publicadoEn?.toISOString() ??
      null,
    author: {
      "@type": "Person",
      name: post.autor?.nombre ?? "Nexal Forge",
    },
    publisher: {
      "@type": "Organization",
      name: "Nexal Forge",
      logo: {
        "@type": "ImageObject",
        url: "https://www.nexalforge.com/logo.png",
      },
    },
    mainEntityOfPage: `https://www.nexalforge.com/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd id="blog-article-jsonld" schema={articleSchema} />
      <div className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-800">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-neutral-800">
            Blog
          </Link>
          {post.categoria && (
            <>
              <span className="mx-2">/</span>
              <span>{post.categoria.nombre}</span>
            </>
          )}
        </nav>

        {/* Title */}
        <div className="mb-3 flex items-center gap-2">
          {post.categoria?.nombre && (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
              {post.categoria.nombre}
            </span>
          )}
          {post.estado?.nombre && (
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700">
              {post.estado.nombre}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-semibold leading-tight text-neutral-900 md:text-4xl">
          {post.titulo}
        </h1>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
          {post.autor && (
            <div className="flex items-center gap-2">
              {post.autor.avatarUrl ? (
                <Image
                  src={post.autor.avatarUrl}
                  alt={post.autor.nombre ?? "Autor"}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full border border-neutral-200 object-cover"
                />
              ) : (
                <div className="h-6 w-6 rounded-full border border-neutral-200 bg-neutral-100" />
              )}
              <span>{post.autor.nombre ?? "Autor"}</span>
            </div>
          )}
          {publishedAt && (
            <>
              <span className="h-1 w-1 rounded-full bg-neutral-300" />
              <time dateTime={post.publicadoEn!.toISOString()}>
                {publishedAt}
              </time>
            </>
          )}
          <span className="h-1 w-1 rounded-full bg-neutral-300" />
          <span>{minutes} min de lectura</span>
        </div>

        {/* Cover */}
        {post.portadaUrl && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={post.portadaUrl}
                alt={post.titulo}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <article className="blog-content mt-8">
          {await renderMarkdown(post.contenidoMd)}
        </article>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t.id}
                href={`/blog/etiqueta/${t.slug ?? t.nombre}`}
                className="group inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 transition hover:border-amber-400/60 hover:text-amber-600 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-500/80 group-hover:bg-amber-500" />
                #{t.nombre}
              </Link>
            ))}
          </div>
        )}

        {/* Related solution */}
        <aside className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Solución relacionada
          </p>
          <h2 className="mt-2 text-xl font-semibold text-neutral-900">
            {relatedSolution.title}
          </h2>
          <p className="mt-2 text-sm text-neutral-700">{relatedSolution.description}</p>
          <Link
            href={relatedSolution.href}
            className="mt-4 inline-flex items-center rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-amber-400/50 hover:bg-amber-50 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
          >
            Ver solución
          </Link>
        </aside>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:bg-amber-50 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
          >
            ← Volver al blog
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}
