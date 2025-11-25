import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

type AppJWTPayload = JWTPayload & {
  email?: string;
  userName?: string;
  roles?: string[];
  sub?: string;
};

const JWT_SECRET = process.env.JWT_SECRET ?? "";

// Public pages that don’t require auth
const PUBLIC_PREFIXES = ["/", "/login", "/blog", "/politicas-privacidad", "/nexi.mp4", "/soluciones"];
const isPublicPath = (p: string) =>
  PUBLIC_PREFIXES.some((x) => p === x || p.startsWith(`${x}/`));

// Admin-only section
const isAdminPath = (p: string) => p === "/admin" || p.startsWith("/admin/");

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lightweight marker to confirm middleware hit (DevTools > Network)
  const res = NextResponse.next();
  res.headers.set("x-nf-middleware", "hit");

  // Skip auth for public routes
  if (isPublicPath(pathname)) {
    return res;
  }

  // Require a token for protected page routes
  const token = request.cookies.get("nf_jwt")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
      // optionally: { algorithms: ["HS256"] }
    );

    const claims = payload as AppJWTPayload;
    const roles = Array.isArray(claims.roles) ? claims.roles.map(String) : [];

    // Extra gate: /admin requires Admin role
    if (isAdminPath(pathname)) {
      const isAdmin = roles.some((r) => r.toLowerCase() === "admin");
      if (!isAdmin) {
        // For non-API pages, redirect to login with a hint
        return NextResponse.redirect(
          new URL("/login?error=forbidden", request.url)
        );
      }
      res.headers.set("x-nf-admin", "true");
    }

    if (claims.sub) res.headers.set("x-nf-user", String(claims.sub));
    return res;
  } catch (err) {
    const redirect = NextResponse.redirect(new URL("/login", request.url));
    redirect.cookies.delete("nf_jwt");
    return redirect;
  }
}

// IMPORTANT: Exclude /api so middleware never runs on API routes.
// Backend will handle auth/roles for /api.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
