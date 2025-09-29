// app/api/blog/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { PostUpsertSchema } from '@/lib/validatorsBlog';
import { slugify } from '@/lib/slugify';

function isKnown(e: unknown): e is Prisma.PrismaClientKnownRequestError {
  return !!e && typeof e === 'object' && 'code' in e;
}

async function ensureTags(keys: string[]) {
  const ids: string[] = [];
  for (const k of keys ?? []) {
    const s = slugify(k);
    let tag = await prisma.etiqueta.findUnique({ where: { slug: s } });
    if (!tag) tag = await prisma.etiqueta.create({ data: { nombre: k, slug: s } });
    ids.push(tag.id);
  }
  return ids;
}

async function uniqueSlugExcept(base: string, excludeId: string) {
  const baseSlug = slugify(base);
  let slug = baseSlug;
  for (let i = 1; ; i++) {
    const exists = await prisma.publicacion.findFirst({
      where: { slug, NOT: { id: excludeId } },
      select: { id: true },
    });
    if (!exists) break;
    slug = `${baseSlug}-${i}`;
  }
  return slug;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  // parse + validate against your upsert schema
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse('Invalid JSON body', { status: 400 });
  }
  const parsed = PostUpsertSchema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const data = parsed.data;

  // must exist
  const existing = await prisma.publicacion.findUnique({ where: { id }, select: { id: true, slug: true } });
  if (!existing) return new NextResponse('Post not found', { status: 404 });

  // compute slug if changed
  const nextSlug =
    data.slug && data.slug !== existing.slug
      ? await uniqueSlugExcept(data.slug, id)
      : existing.slug;

  // FK precheck
  const [cat, est] = await Promise.all([
    prisma.categoria.findUnique({ where: { id: data.categoriaId }, select: { id: true } }),
    prisma.estado.findUnique({ where: { id: data.estadoId }, select: { id: true } }),
  ]);
  if (!cat) return new NextResponse('categoriaId inválido', { status: 400 });
  if (!est) return new NextResponse('estadoId inválido', { status: 400 });

  // normalize date + minutes
  let publicadoEn: Date | null = null;
  if (data.publicadoEn) {
    const dt = new Date(data.publicadoEn);
    if (!Number.isNaN(dt.getTime())) publicadoEn = dt;
  }
  const minutosLectura =
    data.minutosLectura ??
    Math.max(1, Math.round((data.contenidoMd ?? '').split(/\s+/).filter(Boolean).length / 220));

  // tags
  const tagIds = await ensureTags(data.etiquetas ?? []);

  try {
    await prisma.$transaction(async (tx) => {
      // replace tag junctions
      await tx.publicacionEtiqueta.deleteMany({ where: { publicacionId: id } });
      if (tagIds.length) {
        await tx.publicacionEtiqueta.createMany({
          data: tagIds.map((etiquetaId) => ({ publicacionId: id, etiquetaId })),
          skipDuplicates: true,
        });
      }
      // update main record
      await tx.publicacion.update({
        where: { id },
        data: {
          slug: nextSlug,
          titulo: data.titulo,
          extracto: data.extracto,
          contenidoMd: data.contenidoMd ?? null,
          portadaUrl: data.portadaUrl ?? null,
          categoriaId: data.categoriaId,
          estadoId: data.estadoId,
          publicadoEn,
          minutosLectura,
          autorId: data.autorId ?? null,
        },
      });
    });

    return NextResponse.json({ ok: true, id, slug: nextSlug });
  } catch (e) {
    if (isKnown(e) && e.code === 'P2002') return new NextResponse('Slug ya existe', { status: 409 });
    console.error('[PUT /api/blog/posts/[id]]', e);
    return new NextResponse('Error updating post', { status: 500 });
  }
}

// (optional) handle DELETE and GET /api/blog/posts/:id here too
