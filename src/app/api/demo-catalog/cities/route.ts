import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie, isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CityCreateSchema = z.object({
  paisId: z.coerce.number().int().positive(),
  nombre: z.string().trim().min(2).max(160),
});

export async function POST(req: Request) {
  try {
    const user = await getUserFromCookie();
    if (!isAdmin(user)) return new NextResponse("No autorizado", { status: 401 });

    const raw = await req.json().catch(() => null);
    if (!raw) {
      return NextResponse.json(
        { ok: false, error: "Datos invalidos" },
        { status: 400 }
      );
    }

    const parsed = CityCreateSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Revisa pais y nombre de ciudad" },
        { status: 400 }
      );
    }

    const country = await prisma.paisDemo.findUnique({
      where: { id: parsed.data.paisId },
      select: { id: true },
    });
    if (!country) {
      return NextResponse.json(
        { ok: false, error: "Pais no encontrado" },
        { status: 404 }
      );
    }

    const city = await prisma.ciudadDemo.create({
      data: {
        paisId: parsed.data.paisId,
        nombre: parsed.data.nombre,
      },
      select: {
        id: true,
        nombre: true,
        paisId: true,
      },
    });

    return NextResponse.json({ ok: true, city });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("Unique constraint")) {
      return NextResponse.json(
        { ok: false, error: "Esa ciudad ya existe en el pais seleccionado" },
        { status: 409 }
      );
    }
    console.error("[POST /api/demo-catalog/cities]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo crear la ciudad" },
      { status: 500 }
    );
  }
}
