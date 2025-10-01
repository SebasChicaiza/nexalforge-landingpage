// app/admin/blog/[id]/edit/page.tsx

import { prisma } from '@/lib/prisma';
import BlogForm, { BlogFormValues, CategoriaOption, EstadoOption } from '@/components/blog/BlogForm';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ unwrap the promise

  const post = await prisma.publicacion.findUnique({
    where: { id },
    include: {
      etiquetas: { select: { etiqueta: { select: { nombre: true } } } },
    },
  });
  if (!post) return notFound();

  const categorias: CategoriaOption[] = await prisma.categoria.findMany({ select: { id: true, nombre: true } });
  const estados: EstadoOption[] = await prisma.estado.findMany({ select: { id: true, nombre: true } });

  const initial: BlogFormValues = {
    id: post.id,
    slug: post.slug,
    titulo: post.titulo,
    extracto: post.extracto,
    contenidoMd: post.contenidoMd ?? '',
    portadaUrl: post.portadaUrl ?? '',
    publicadoEn: post.publicadoEn?.toISOString().slice(0, 10) ?? '',
    minutosLectura: post.minutosLectura ?? null,
    categoriaId: post.categoriaId,
    estadoId: post.estadoId,
    etiquetas: post.etiquetas.map((e) => e.etiqueta.nombre),
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <BlogForm mode="edit" initial={initial} categorias={categorias} estados={estados} />
      </div>
    </div>
  );
}
