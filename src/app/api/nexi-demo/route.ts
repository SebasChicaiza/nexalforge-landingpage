import { NextResponse } from "next/server";
import { z } from "zod";
import { createTransport, mailFrom, mailTo } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Rate-limit simple por IP (igual que /api/contact)
const bucket = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQ = 5;

const FormSchema = z.object({
  nombre: z.string().min(2).max(160),
  email: z.string().email().max(200),
  empresa: z.string().min(1).max(180),
  sector: z.string().min(1).max(160),
  telefono: z.string().min(6).max(40),
  canales: z.preprocess(
    (val) => {
      if (Array.isArray(val)) return val.map(String);
      if (typeof val === "string") return [val];
      return [];
    },
    z.array(z.string().min(2)).min(1)
  ),
  prioridad: z.string().min(3).max(600),
  sitio: z.string().optional(),
});

async function readBody(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return await req.json().catch(() => ({}));
  }

  const fd = await req.formData();
  const data: Record<string, unknown> = {};
  for (const [key, value] of fd.entries()) {
    const val = typeof value === "string" ? value : value.toString();
    if (key in data) {
      const prev = data[key];
      data[key] = Array.isArray(prev) ? [...prev, val] : [prev, val];
    } else {
      data[key] = val;
    }
  }
  return data;
}

export async function POST(req: Request) {
  try {
    // Rate limit
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

    const raw = await readBody(req);
    const parsed = FormSchema.safeParse(raw);
    if (!parsed.success) {
      console.warn("[nexi-demo] invalid payload", parsed.error.flatten());
      return NextResponse.json(
        { ok: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }

    if (parsed.data.sitio?.trim()) return NextResponse.json({ ok: true });

    const { nombre, email, empresa, sector, telefono, canales, prioridad } =
      parsed.data;

    const transporter = createTransport();
    const subject = `Demo Nexi — ${nombre}`;
    const text = [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Empresa: ${empresa}`,
      `Sector: ${sector}`,
      `Teléfono/WhatsApp: ${telefono}`,
      `Canales actuales: ${canales.join(", ")}`,
      `¿Qué automatizar primero?: ${prioridad}`,
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

    console.log("[nexi-demo] sent", { messageId: info?.messageId });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[nexi-demo] ERROR", detail);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar la solicitud" },
      { status: 500 }
    );
  }
}
