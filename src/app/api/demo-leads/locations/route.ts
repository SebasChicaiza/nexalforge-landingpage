import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bootstrapDemoCatalogIfEmpty, ensureLeadStatuses } from "@/lib/demo-catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureLeadStatuses(prisma);
    await bootstrapDemoCatalogIfEmpty(prisma);

    const [countries, statuses] = await Promise.all([
      prisma.paisDemo.findMany({
        orderBy: { nombre: "asc" },
        select: {
          id: true,
          nombre: true,
          iso2: true,
          codigoTelefonico: true,
          ciudades: {
            orderBy: { nombre: "asc" },
            select: { id: true, nombre: true },
          },
        },
      }),
      prisma.estadoSolicitudDemo.findMany({
        orderBy: { id: "asc" },
        select: { id: true, nombre: true },
      }),
    ]);

    return NextResponse.json({ ok: true, countries, statuses });
  } catch (error) {
    console.error("[GET /api/demo-leads/locations]", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo cargar catalogos" },
      { status: 500 }
    );
  }
}
