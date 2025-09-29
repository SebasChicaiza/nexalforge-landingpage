// app/api/blog/meta/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/blog/meta
// -> { categorias: {id,nombre}[], estados: {id,nombre}[], etiquetas: {id,nombre,slug,count}[] }
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') ?? '').trim(); // optional filter for tags

    const [categorias, estados, etiquetas] = await Promise.all([
      prisma.categoria.findMany({
        select: { id: true, nombre: true },
        orderBy: { nombre: 'asc' },
      }),
      prisma.estado.findMany({
        select: { id: true, nombre: true },
        orderBy: { nombre: 'asc' },
      }),
      prisma.etiqueta.findMany({
        where: q
          ? {
              OR: [
                { nombre: { contains: q, mode: 'insensitive' } },
                { slug: { contains: q, mode: 'insensitive' } },
              ],
            }
          : undefined,
        select: {
          id: true,
          nombre: true,
          slug: true,
          _count: { select: { posts: true } }, // usage count via junction
        },
        orderBy: [{ nombre: 'asc' }],
      }),
    ]);

    // flatten count shape: posts -> count
    const etiquetasOut = etiquetas.map((t) => ({
      id: t.id,
      nombre: t.nombre,
      slug: t.slug,
      count: t._count.posts,
    }));

    return NextResponse.json(
      { categorias, estados, etiquetas: etiquetasOut },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (e) {
    console.error('GET /api/blog/meta error:', e);
    return new NextResponse('Error fetching metadata', { status: 500 });
  }
}
