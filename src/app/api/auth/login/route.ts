// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional(),
});

async function verifyPasswordHash(plain: string, hashed: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plain, hashed);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const parsed = LoginSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { email, password, remember } = parsed.data;

    // Fetch user + roles (only active & not deleted)
    const user = await prisma.usuario.findUnique({
      where: { correo: email },
      include: { roles: { include: { rol: true } } },
    });

    if (!user || !user.activo || user.estado_borrado) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await verifyPasswordHash(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || typeof jwtSecret !== "string") {
      return NextResponse.json({ error: "JWT_SECRET is not defined" }, { status: 500 });
    }

    const roleNames = user.roles.map((ur) => ur.rol.nombre);

    // Token expiration: 1 day (or 30 days if remember)
    const expiresInSeconds = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
        email: user.correo,
        userName: user.nombre ?? "",
        roles: roleNames,
      },
      jwtSecret
    );

    const serializedToken = serialize("nf_jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: remember ? 60 * 60 * 24 * 30 : undefined, // 30 days if remember, otherwise session cookie
    });

    const res = NextResponse.json(
      {
        ok: true,
        user: {
          email: user.correo,
          userName: user.nombre ?? "",
          roles: roleNames,
        },
      },
      { status: 200 }
    );
    res.headers.set("Set-Cookie", serializedToken);
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
