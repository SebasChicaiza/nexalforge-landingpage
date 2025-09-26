import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PostUpsertSchema } from '@/lib/validatorsBlog';
import { slugify } from '@/lib/slugify';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await prisma.publicacion.findUnique({
    where: { id: params.id },
    include: { etiquetas: { include: { etiqueta: true } } },
  });
  if (!post) return new NextResponse('No encontrado', { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const json = await req.json();
  const parsed = PostUpsertSchema.safeParse(json);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const data = parsed.data;

  const existing = await prisma.publicacion.findUnique({ where: { id: params.id } });
  if (!existing) return new NextResponse('No encontrado', { status: 404 });

  // slug: actualizar si viene explícito o si cambia el título (opcional)
  let slug = existing.slug;
  if (data.slug && data.slug !== existing.slug) {
    const baseSlug = slugify(data.slug);
    let s = baseSlug;
    for (let i = 1; ; i++) {
      const found = await prisma.publicacion.findUnique({ where: { slug: s } });
      if (!found || found.id === params.id) break;
      s = `${baseSlug}-${i}`;
    }
    slug = s;
  }

  // etiquetas
  const ensureTags = async (namesOrSlugs: string[]) => {
    const ids: string[] = [];
    for (const key of namesOrSlugs) {
      const s = slugify(key);
      let tag = await prisma.etiqueta.findUnique({ where: { slug: s } });
      if (!tag) tag = await prisma.etiqueta.create({ data: { nombre: key, slug: s } });
      ids.push(tag.id);
    }
    return ids;
  };
  const tagIds = await ensureTags(data.etiquetas ?? []);

  const updated = await prisma.publicacion.update({
    where: { id: params.id },
    data: {
      slug,
      titulo: data.titulo,
      extracto: data.extracto,
      contenidoMd: data.contenidoMd ?? null,
      portadaUrl: data.portadaUrl ?? null,
      categoria: data.categoria,
      estado: data.estado,
      publicadoEn: data.publicadoEn ? new Date(data.publicadoEn) : null,
      minutosLectura: data.minutosLectura ?? Math.max(1, Math.round((data.contenidoMd ?? '').split(/\s+/).length / 220)),
      autorId: data.autorId ?? null,
      etiquetas: {
        deleteMany: { publicacionId: params.id }, // limpiar
        createMany: { data: tagIds.map(id => ({ etiquetaId: id })), skipDuplicates: true },
      },
    },
    select: { id: true },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.publicacion.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
