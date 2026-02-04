// app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export const runtime = 'nodejs';

type JwtPayloadNF = {
  exp: number;
  email: string;
  userName: string;
  roles: string[];
  iat: number;
};

export async function GET() {
  const jar = await cookies();
  const token = jar.get('nf_jwt')?.value;
  const secret = process.env.JWT_SECRET ?? '';

  if (!token || !secret) {
    return NextResponse.json(
      { loggedIn: false },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const payload = verify(token, secret) as JwtPayloadNF;
    const ok = typeof payload?.email === 'string' && Array.isArray(payload.roles);
    if (!ok) return NextResponse.json({ loggedIn: false }, { headers: { 'Cache-Control': 'no-store' } });

    return NextResponse.json(
      { loggedIn: true, user: { email: payload.email, userName: payload.userName, roles: payload.roles } },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json({ loggedIn: false }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
