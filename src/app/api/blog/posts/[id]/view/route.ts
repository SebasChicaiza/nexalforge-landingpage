/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/blog/posts/[id]/view/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request, ctx: any) {
  const { params } = ctx as { params: { id: string } };
  const id = params?.id;
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });

  const ipHeader = req.headers.get('x-forwarded-for') ?? '';
  const ip = ipHeader.split(',')[0]?.trim() || '0.0.0.0';
  const ua = req.headers.get('user-agent') ?? '';
  const ipHash = crypto.createHash('sha1').update(ip).digest('hex').slice(0, 12);

  // dedupe 12h por ipHash
  const since = new Date(Date.now() - 12 * 60 * 60 * 1000);
  const exists = await prisma.vistaPublicacion.findFirst({
    where: { publicacionId: id, ipHash, creadoEn: { gte: since } },
    select: { id: true },
  });

  if (!exists) {
    await prisma.vistaPublicacion.create({
      data: { publicacionId: id, ipHash, agenteUsuario: ua },
    });
  }

  return NextResponse.json({ ok: true });
}
