import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export type JwtPayloadNF = {
  exp: number;
  email: string;
  userName: string;
  roles: string[];
  iat: number;
};

export async function getUserFromCookie(): Promise<JwtPayloadNF | null> {
  const jar = await cookies();
  const token = jar.get("nf_jwt")?.value;
  if (!token || !JWT_SECRET) return null;

  try {
    const payload = verify(token, JWT_SECRET) as JwtPayloadNF;
    if (!payload || !Array.isArray(payload.roles) || typeof payload.email !== "string") {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function isAdmin(user: JwtPayloadNF | null): boolean {
  return !!user && user.roles.some((role) => String(role).toLowerCase() === "admin");
}
