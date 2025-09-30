import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // ← assumption: prisma client singleton here
import { Resend } from "resend";

const bodySchema = z.object({
  email: z.string().email().transform((v) => v.trim().toLowerCase()),
  origen: z.string().trim().min(1).max(64).optional(), // e.g. "blog_sidebar"
});

type ApiResponse =
  | { status: "subscribed"; id: string }
  | { status: "already_subscribed" }
  | { status: "error"; message: string };

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { status: "error", message: "Invalid payload" },
        { status: 400 }
      );
    }

    const { email, origen } = parsed.data;

    // 1) check if already subscribed (keeps a clear response)
    const existing = await prisma.suscriptorNewsletter.findUnique({
      where: { correo: email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json<ApiResponse>({ status: "already_subscribed" }, { status: 200 });
    }

    // 2) create new subscriber
    const created = await prisma.suscriptorNewsletter.create({
      data: { correo: email, origen: origen ?? null },
      select: { id: true, correo: true },
    });

    // 3) optional: send a confirmation email via Resend (non-blocking)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      // fire & forget (don’t fail the API if email throws)
      resend.emails
        .send({
          from: "NexalForge <contact@nexalforge.com>",
          to: created.correo,
          subject: "¡Te suscribiste al newsletter de NexalForge!",
          text:
            "Gracias por suscribirte. Te enviaremos actualizaciones técnicas y noticias.\n\n" +
            "Si no fuiste tú, ignora este correo.",
        })
        .catch((err) => {
          console.warn("[newsletter] Resend email failed:", err);
        });
    }

    return NextResponse.json<ApiResponse>({ status: "subscribed", id: created.id }, { status: 201 });
  } catch (err) {
    console.error("[newsletter] subscribe error:", err);
    return NextResponse.json<ApiResponse>(
      { status: "error", message: "Internal error" },
      { status: 500 }
    );
  }
}
