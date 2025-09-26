import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/posts/meta
// -> { categorias: {id,nombre}[], estados: {id,nombre}[] }
export async function GET() {
  try {
    const [categorias, estados] = await Promise.all([
      prisma.categoria.findMany({
        select: { id: true, nombre: true },
        orderBy: { nombre: 'asc' },
      }),
      prisma.estado.findMany({
        select: { id: true, nombre: true },
        orderBy: { nombre: 'asc' },
      }),
    ]);

    return NextResponse.json({ categorias, estados }, {
      // optional: make sure the UI always sees fresh options
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    console.error('GET /api/admin/posts/meta error:', e);
    return new NextResponse('Error fetching metadata', { status: 500 });
  }
}
