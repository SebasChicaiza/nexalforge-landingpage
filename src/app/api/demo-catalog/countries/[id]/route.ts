import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie, isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const CountryUpdateSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  iso2: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/),
  codigoTelefonico: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/)
    .optional()
    .or(z.literal("")),
});

function normalizePhoneCode(value?: string): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

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
        { ok: false, error: "Pais invalido" },
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

    const parsed = CountryUpdateSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Revisa nombre, ISO y codigo" },
        { status: 400 }
      );
    }

    const country = await prisma.paisDemo.update({
      where: { id: parsedParams.data.id },
      data: {
        nombre: parsed.data.nombre,
        iso2: parsed.data.iso2,
        codigoTelefonico: normalizePhoneCode(parsed.data.codigoTelefonico),
      },
      select: { id: true, nombre: true, iso2: true, codigoTelefonico: true },
    });

    return NextResponse.json({ ok: true, country });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("Unique constraint")) {
      return NextResponse.json(
        { ok: false, error: "Ya existe un pais con ese nombre o ISO" },
        { status: 409 }
      );
    }
    if (message.includes("Record to update not found")) {
      return NextResponse.json(
        { ok: false, error: "Pais no encontrado" },
        { status: 404 }
      );
    }
    console.error("[PATCH /api/demo-catalog/countries/[id]]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo actualizar el pais" },
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
        { ok: false, error: "Pais invalido" },
        { status: 400 }
      );
    }

    const countryId = parsedParams.data.id;
    const citiesCount = await prisma.ciudadDemo.count({ where: { paisId: countryId } });
    if (citiesCount > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Primero elimina o mueve las ciudades asociadas a este pais",
        },
        { status: 400 }
      );
    }

    await prisma.paisDemo.delete({ where: { id: countryId } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("Record to delete does not exist")) {
      return NextResponse.json(
        { ok: false, error: "Pais no encontrado" },
        { status: 404 }
      );
    }
    console.error("[DELETE /api/demo-catalog/countries/[id]]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo eliminar el pais" },
      { status: 500 }
    );
  }
}
