// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const runtime = "nodejs";


export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      password?: string;
      remember?: boolean;
    };

    console.log("Login attempt:", body);

    if (body.email === "jn@gmail.com" && body.password === "Password123!") {
      const jwtSecret = process.env.JWT_SECRET;
      console.log("JWT_SECRET set?", Boolean(process.env.JWT_SECRET));

      if (!jwtSecret || typeof jwtSecret !== "string") {
        return NextResponse.json(
          { error: "JWT_SECRET is not defined" },
          { status: 500 }
        );
      }

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
          email: "jn@gmail.com",
          userName: "Juanjo",
          roles: ["admin", "user"],
        },
        jwtSecret
      );

      const serializedToken = serialize("nf_jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // use "none" with cross-site frontends
        maxAge: body.remember ? 60 * 60 * 24 * 30 : undefined, // 30 días when remember
        path: "/",
      });

      const res = NextResponse.json({ ok: true }, { status: 200 });
      res.headers.set("Set-Cookie", serializedToken);
      return res;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }
}
