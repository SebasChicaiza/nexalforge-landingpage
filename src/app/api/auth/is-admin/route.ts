import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, type JWTPayload } from "jose";

type AppPayload = JWTPayload & { roles?: unknown };

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("nf_jwt")?.value;
    if (!token) return NextResponse.json({ isAdmin: false });

    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ isAdmin: false });

    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const rolesValue = (payload as AppPayload).roles;
    const roles = Array.isArray(rolesValue)
      ? rolesValue.map((r) => String(r))
      : [];

    const isAdmin = roles.some((r) => r.toLowerCase() === "admin");
    return NextResponse.json({ isAdmin });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
