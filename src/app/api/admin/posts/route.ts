import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PostUpsertSchema } from '@/lib/validatorsBlog';
import { slugify } from '@/lib/slugify';
import { Prisma } from '@prisma/client';

/* ——— helpers ——— */

function logPreviewBody(json: unknown) {
  try {
    const obj = typeof json === 'object' && json ? json as Record<string, unknown> : {};
    const short = {
      ...obj,
      extracto: typeof obj.extracto === 'string'
        ? obj.extracto.slice(0, 160) + (obj.extracto.length > 160 ? '…' : '')
        : obj.extracto,
      contenidoMd: typeof obj.contenidoMd === 'string'
        ? obj.contenidoMd.slice(0, 160) + (obj.contenidoMd.length > 160 ? '…' : '')
        : obj.contenidoMd,
    };
    console.log('[POST /admin/posts] body preview:', short);
  } catch {
    console.log('[POST /admin/posts] body preview: <unserializable>');
  }
}

function isPrismaKnownError(e: unknown): e is Prisma.PrismaClientKnownRequestError {
  return !!e && typeof e === 'object' && 'code' in e && typeof (e as Prisma.PrismaClientKnownRequestError).code === 'string';
}

async function ensureTags(namesOrSlugs: string[]): Promise<{ id: string }[]> {
  const ids: { id: string }[] = [];
  for (const key of namesOrSlugs) {
    const s = slugify(key);
    let tag = await prisma.etiqueta.findUnique({ where: { slug: s } });
    if (!tag) tag = await prisma.etiqueta.create({ data: { nombre: key, slug: s } });
    ids.push({ id: tag.id });
  }
  return ids;
}

async function makeUniqueSlug(base: string) {
  const baseSlug = slugify(base);
  let slug = baseSlug;
  for (let i = 1; ; i++) {
    const exists = await prisma.publicacion.findUnique({ where: { slug } });
    if (!exists) break;
    slug = `${baseSlug}-${i}`;
  }
  return slug;
}

/* ——— POST ——— */

export async function POST(req: Request) {
  const t0 = Date.now();

  // 1) Parse JSON safely
  let json: unknown;
  try {
    json = await req.json();
  } catch (e) {
    console.error('[POST /admin/posts] JSON parse error:', e);
    return new NextResponse('Invalid JSON body', { status: 400 });
  }
  logPreviewBody(json);

  // 2) Validate with Zod
  const parsed = PostUpsertSchema.safeParse(json);
  if (!parsed.success) {
    console.warn('[POST /admin/posts] Validation error:', parsed.error.flatten());
    return new NextResponse(parsed.error.message, { status: 400 });
  }
  const data = parsed.data;
  console.log('[POST /admin/posts] Parsed keys:', Object.keys(data));

  // 3) Compute slug
  const slugBase = data.slug || data.titulo;
  let slug = await makeUniqueSlug(slugBase);
  console.log('[POST /admin/posts] Initial slug:', slug);

  // 4) Upsert tags
  const tagIds = await ensureTags(data.etiquetas ?? []);
  console.log('[POST /admin/posts] tags count:', tagIds.length);

  // 5) Normalize date & minutes
  let publicadoEn: Date | null = null;
  if (data.publicadoEn) {
    const dt = new Date(data.publicadoEn);
    if (!Number.isNaN(dt.getTime())) publicadoEn = dt;
    else console.warn('[POST /admin/posts] Invalid publicadoEn -> null:', data.publicadoEn);
  }
  const minutosLectura =
    data.minutosLectura ??
    Math.max(1, Math.round((data.contenidoMd ?? '').split(/\s+/).filter(Boolean).length / 220));

  // 6) FK pre-checks (avoid integrity 500s)
  const [cat, est] = await Promise.all([
    prisma.categoria.findUnique({ where: { id: data.categoriaId }, select: { id: true, nombre: true } }),
    prisma.estado.findUnique({ where: { id: data.estadoId }, select: { id: true, nombre: true } }),
  ]);
  if (!cat) {
    console.error('[POST /admin/posts] categoriaId not found:', data.categoriaId);
    return new NextResponse('categoriaId inválido', { status: 400 });
  }
  if (!est) {
    console.error('[POST /admin/posts] estadoId not found:', data.estadoId);
    return new NextResponse('estadoId inválido', { status: 400 });
  }
  console.log('[POST /admin/posts] FKs OK ->', { categoria: cat.nombre, estado: est.nombre });

  // 7) Create with retry on unique slug conflict (P2002)
  const MAX_RETRIES = 3;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const created = await prisma.publicacion.create({
        data: {
          slug,
          titulo: data.titulo,
          extracto: data.extracto,
          contenidoMd: data.contenidoMd ?? null,
          portadaUrl: data.portadaUrl ?? null,

          categoriaId: data.categoriaId,
          estadoId: data.estadoId,

          publicadoEn,
          minutosLectura,
          autorId: data.autorId ?? null,

          ...(tagIds.length > 0
            ? {
                etiquetas: {
                  createMany: {
                    data: tagIds.map((t) => ({ etiquetaId: t.id })),
                    skipDuplicates: true,
                  },
                },
              }
            : {}),
        },
        select: { id: true },
      });

      console.log('[POST /admin/posts] Created id:', created.id, 'in', Date.now() - t0, 'ms');
      return NextResponse.json({ id: created.id });
    } catch (e: unknown) {
      if (isPrismaKnownError(e)) {
        // Unique constraint on slug
        if (e.code === 'P2002') {
          console.warn('[POST /admin/posts] P2002 slug conflict, retrying… attempt', attempt + 1);
          // tweak slug and retry
          const suffix = attempt === MAX_RETRIES ? `-${Date.now()}` : `-${attempt + 1}`;
          slug = slug.endsWith(suffix) ? `${slug}-${Math.floor(Math.random() * 1000)}` : `${slug}${suffix}`;
          continue;
        }
        // FK/constraint errors are unlikely here due to pre-checks, but log if any
        console.error('[POST /admin/posts] Prisma known error:', {
          code: e.code,
          meta: e.meta,
          message: e.message,
        });
      } else {
        console.error('[POST /admin/posts] Unexpected error:', e);
      }
      return new NextResponse('Error creating post', { status: 500 });
    }
  }

  // Should not reach here
  console.error('[POST /admin/posts] Exhausted retries for slug');
  return new NextResponse('Error creating post', { status: 500 });
}
