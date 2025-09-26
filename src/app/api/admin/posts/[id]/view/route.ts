import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  const ua = req.headers.get('user-agent') ?? '';
  const ipHash = crypto.createHash('sha1').update(ip).digest('hex').slice(0, 12);

  // dedupe soft por ipHash en 12h:
  const since = new Date(Date.now() - 12 * 60 * 60 * 1000);
  const exists = await prisma.vistaPublicacion.findFirst({
    where: { publicacionId: params.id, ipHash, creadoEn: { gte: since } },
    select: { id: true },
  });
  if (!exists) {
    await prisma.vistaPublicacion.create({
      data: { publicacionId: params.id, ipHash, agenteUsuario: ua },
    });
  }
  return NextResponse.json({ ok: true });
}
