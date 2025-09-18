import { NextResponse } from "next/server";
import { z } from "zod";
import { createTransport, mailFrom, mailTo } from "@/lib/mail";

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

export async function POST(req: Request) {
  try {
    // Rate-limit por IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
    const now = Date.now();
    const item = bucket.get(ip);
    if (!item || now - item.ts > WINDOW_MS) {
      bucket.set(ip, { count: 1, ts: now });
    } else {
      if (item.count >= MAX_REQ) {
        return NextResponse.json(
          { ok: false, error: "Rate limit" },
          { status: 429 }
        );
      }
      item.count += 1;
    }

    const form = await req.formData();
    const data = Object.fromEntries(form.entries());
    const parsed = FormSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }

    // Honeypot
    if (parsed.data.sitio && parsed.data.sitio.trim() !== "") {
      return NextResponse.json({ ok: true }); // lo ignoramos en silencio
    }

    const { nombre, email, empresa, objetivo, equipo } = parsed.data;

    // Envía correo
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

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email, // para responder directo al lead
      subject,
      text,
      html: text.replace(/\n/g, "<br/>"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar" },
      { status: 500 }
    );
  }
}
