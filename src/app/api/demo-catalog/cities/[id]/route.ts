import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie, isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const CityUpdateSchema = z.object({
  nombre: z.string().trim().min(2).max(160),
  paisId: z.coerce.number().int().positive(),
});

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!isAdmin(user)) return new NextResponse("No autorizado", { status: 401 });

    const params = await ctx.params;
    const parsedParams = ParamsSchema.safeParse(params);
    if (!parsedParams.success) {
      return NextResponse.json(
        { ok: false, error: "Ciudad invalida" },
        { status: 400 }
      );
    }

    const raw = await req.json().catch(() => null);
    if (!raw) {
      return NextResponse.json(
        { ok: false, error: "Datos invalidos" },
        { status: 400 }
      );
    }
    const parsed = CityUpdateSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Revisa nombre y pais" },
        { status: 400 }
      );
    }

    const city = await prisma.ciudadDemo.update({
      where: { id: parsedParams.data.id },
      data: {
        nombre: parsed.data.nombre,
        paisId: parsed.data.paisId,
      },
      select: { id: true, nombre: true, paisId: true },
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
    if (message.includes("Record to update not found")) {
      return NextResponse.json(
        { ok: false, error: "Ciudad no encontrada" },
        { status: 404 }
      );
    }
    console.error("[PATCH /api/demo-catalog/cities/[id]]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo actualizar la ciudad" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!isAdmin(user)) return new NextResponse("No autorizado", { status: 401 });

    const params = await ctx.params;
    const parsedParams = ParamsSchema.safeParse(params);
    if (!parsedParams.success) {
      return NextResponse.json(
        { ok: false, error: "Ciudad invalida" },
        { status: 400 }
      );
    }

    const cityId = parsedParams.data.id;
    const leadCount = await prisma.solicitudDemo.count({ where: { ciudadId: cityId } });
    if (leadCount > 0) {
      return NextResponse.json(
        { ok: false, error: "No puedes eliminar una ciudad que ya tiene solicitudes" },
        { status: 400 }
      );
    }

    await prisma.ciudadDemo.delete({ where: { id: cityId } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("Record to delete does not exist")) {
      return NextResponse.json(
        { ok: false, error: "Ciudad no encontrada" },
        { status: 404 }
      );
    }
    console.error("[DELETE /api/demo-catalog/cities/[id]]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo eliminar la ciudad" },
      { status: 500 }
    );
  }
}
