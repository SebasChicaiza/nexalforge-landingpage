import { NextResponse } from "next/server";
import { z } from "zod";
import { createTransport, mailFrom, mailTo } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // evita caching accidental del handler

// rate-limit simple en memoria (básico para landing en 1 instancia)
const bucket = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 min
const MAX_REQ = 5;

const FormSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email().max(200),
  empresa: z.string().max(200).optional(),
  objetivo: z.enum(["Mejorar ventas", "Reducir tiempos", "Reducir costos"]),
  equipo: z.enum(["1–10", "11–50", "50+"]),
  // honeypot
  sitio: z.string().optional(),
});

async function readBody(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return await req.json().catch(() => ({}));
  }
  // FormData (lo que envías hoy desde el <form/>)
  const fd = await req.formData();
  return Object.fromEntries(fd.entries());
}

export async function POST(req: Request) {
  try {
    // Rate-limit
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      "0.0.0.0";
    const now = Date.now();
    const item = bucket.get(ip);
    if (!item || now - item.ts > WINDOW_MS)
      bucket.set(ip, { count: 1, ts: now });
    else if (item.count >= MAX_REQ)
      return NextResponse.json(
        { ok: false, error: "Rate limit" },
        { status: 429 }
      );
    else item.count += 1;

    const data = await readBody(req);
    const parsed = FormSchema.safeParse(data);
    if (!parsed.success) {
      console.warn("[contact] invalid payload", parsed.error.flatten());
      return NextResponse.json(
        { ok: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }

    // Honeypot
    if (parsed.data.sitio?.trim()) return NextResponse.json({ ok: true });

    const { nombre, email, empresa, objetivo, equipo } = parsed.data;

    // Envío mail (Node runtime)
    const transporter = createTransport();
    const subject = `Nuevo lead — ${nombre} (${objetivo})`;
    const text = [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Empresa: ${empresa ?? "-"}`,
      `Objetivo: ${objetivo}`,
      `Equipo: ${equipo}`,
      `Fecha: ${new Date().toISOString()}`,
    ].join("\n");

    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject,
      text,
      html: text.replace(/\n/g, "<br/>"),
    });

    console.log("[contact] sent", { messageId: info?.messageId });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] ERROR", msg);
    // TIP: mientras debuggeas puedes exponer el detail:
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar", detail: msg },
      { status: 500 }
    );
  }
}
