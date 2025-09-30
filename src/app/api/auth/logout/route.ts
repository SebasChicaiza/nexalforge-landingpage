// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export const runtime = 'nodejs';

function clearTokenCookie() {
  // Matches the cookie set on login, but clears it (Max-Age=0)
  return serialize('nf_jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}

export async function POST(req: Request) {
  const accept = req.headers.get('accept') ?? '';
  const cleared = clearTokenCookie();

  // If a browser form posts (text/html expected), redirect after clearing cookie
  if (accept.includes('text/html')) {
    const res = NextResponse.redirect(new URL('/login', req.url), { status: 303 });
    res.headers.set('Set-Cookie', cleared);
    return res;
  }

  // Default: JSON response (good for fetch/XHR)
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', cleared);
  return res;
}
