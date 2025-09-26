// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Optional markdown renderer (graceful fallback if the dep is missing)
async function renderMarkdown(md?: string | null) {
  if (!md) return null;
  try {
    const ReactMarkdown = (await import('react-markdown')).default;
    return (
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown>{md}</ReactMarkdown>
      </div>
    );
  } catch {
    // Fallback: show raw markdown (better than breaking)
    return (
      <pre className="whitespace-pre-wrap break-words text-[0.95rem] leading-7 text-neutral-800">
        {md}
      </pre>
    );
  }
}

function fmtDate(d?: Date | null) {
  if (!d) return null;
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

async function getPost(slug: string) {
  return prisma.publicacion.findUnique({
    where: { slug },
    include: {
      estado: { select: { id: true, nombre: true } },
      categoria: { select: { id: true, nombre: true } },
      autor: { select: { id: true, nombre: true, avatarUrl: true } },
      etiquetas: {
        select: { etiqueta: { select: { id: true, nombre: true, slug: true } } },
        orderBy: { etiqueta: { nombre: 'asc' } },
      },
    },
  });
}

async function recordView(publicacionId: string) {
  try {
    const h = await headers();
    const ipRaw =
      h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      h.get('x-real-ip') ||
      '';
    const ipHash = ipRaw
      ? crypto.createHash('sha256').update(ipRaw).digest('hex').slice(0, 16)
      : null;
    const agenteUsuario = h.get('user-agent') ?? null;

    // Non-blocking enough; still awaited to ensure DB connection lifecycle in serverless
    await prisma.vistaPublicacion.create({
      data: {
        publicacionId,
        ipHash,
        agenteUsuario,
      },
    });
  } catch {
    // swallow (never break the page render due to analytics)
  }
}

/* ------------------------------------
   SEO Metadata
------------------------------------ */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.publicacion.findUnique({
    where: { slug: params.slug },
    select: {
      titulo: true,
      extracto: true,
      portadaUrl: true,
      estado: { select: { nombre: true } },
    },
  });

  // If not found or not published, give a generic title so Next can still prebuild gracefully
  if (!post || post.estado?.nombre !== 'PUBLICADO') {
    return {
      title: 'Blog',
      description: 'Publicaciones',
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
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

/* ------------------------------------
   Page
------------------------------------ */
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  // 404 if not found or not published
  if (!post || post.estado?.nombre !== 'PUBLICADO') {
    notFound();
  }

  // Record view (don’t block rendering too much)
  await recordView(post.id);

  const publishedAt = post.publicadoEn ? fmtDate(post.publicadoEn) : null;
  const minutes = post.minutosLectura ?? Math.max(1, Math.round((post.contenidoMd ?? '').split(/\s+/).length / 220));
  const tags = post.etiquetas.map((e) => e.etiqueta);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-800">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-neutral-800">Blog</Link>
          {post.categoria && (
            <>
              <span className="mx-2">/</span>
              <span>{post.categoria.nombre}</span>
            </>
          )}
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-semibold leading-tight text-neutral-900 md:text-4xl">
          {post.titulo}
        </h1>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
          {post.autor && (
            <div className="flex items-center gap-2">
              {post.autor.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.autor.avatarUrl}
                  alt={post.autor.nombre ?? 'Autor'}
                  className="h-6 w-6 rounded-full border border-neutral-200 object-cover"
                />
              ) : (
                <div className="h-6 w-6 rounded-full border border-neutral-200 bg-neutral-100" />
              )}
              <span>{post.autor.nombre ?? 'Autor'}</span>
            </div>
          )}
          {publishedAt && (
            <>
              <span className="h-1 w-1 rounded-full bg-neutral-300" />
              <time dateTime={post.publicadoEn!.toISOString()}>{publishedAt}</time>
            </>
          )}
          <span className="h-1 w-1 rounded-full bg-neutral-300" />
          <span>{minutes} min de lectura</span>
          {post.estado?.nombre && (
            <>
              <span className="h-1 w-1 rounded-full bg-neutral-300" />
              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs">
                {post.estado.nombre}
              </span>
            </>
          )}
        </div>

        {/* Cover */}
        {post.portadaUrl && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200">
            {/* Using plain img to avoid domain config hassle in dev; swap to next/image if you prefer */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.portadaUrl}
              alt={post.titulo}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl prose-img:border prose-img:border-neutral-200 prose-pre:rounded-xl prose-pre:border prose-pre:border-neutral-200 prose-pre:bg-neutral-50 prose-a:text-neutral-900 hover:prose-a:opacity-80 dark:prose-invert mt-8">
          {await renderMarkdown(post.contenidoMd)}
        </article>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
              >
                #{t.nombre}
              </span>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            ← Volver al blog
          </Link>
        </div>
      </div>
    </div>
  );
}
