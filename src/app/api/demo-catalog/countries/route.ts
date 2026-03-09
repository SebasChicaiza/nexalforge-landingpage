import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { bootstrapDemoCatalogIfEmpty, ensureLeadStatuses } from "@/lib/demo-catalog";
import { getUserFromCookie, isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CountrySchema = z.object({
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

export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!isAdmin(user)) return new NextResponse("No autorizado", { status: 401 });

    await ensureLeadStatuses(prisma);
    await bootstrapDemoCatalogIfEmpty(prisma);

    const countries = await prisma.paisDemo.findMany({
      orderBy: { nombre: "asc" },
      select: {
        id: true,
        nombre: true,
        iso2: true,
        codigoTelefonico: true,
        _count: { select: { ciudades: true } },
        ciudades: {
          orderBy: { nombre: "asc" },
          select: {
            id: true,
            nombre: true,
            _count: { select: { solicitudes: true } },
          },
        },
      },
    });

    return NextResponse.json({ ok: true, countries });
  } catch (error) {
    console.error("[GET /api/demo-catalog/countries]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo cargar paises" },
      { status: 500 }
    );
  }
}

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

    const parsed = CountrySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Revisa nombre, ISO y codigo" },
        { status: 400 }
      );
    }

    const country = await prisma.paisDemo.create({
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
    console.error("[POST /api/demo-catalog/countries]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo crear el pais" },
      { status: 500 }
    );
  }
}
