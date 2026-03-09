import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureLeadStatuses } from "@/lib/demo-catalog";
import { getUserFromCookie, isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const trimOrUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const UpdateLeadSchema = z
  .object({
    representativeName: z.string().trim().min(2).max(160),
    clinicName: z.string().trim().min(2).max(180),
    countryId: z.coerce.number().int().positive(),
    cityId: z.coerce.number().int().positive().optional(),
    cityName: z.preprocess(trimOrUndefined, z.string().trim().min(2).max(160).optional()),
    whatsappNumber: z.string().trim().min(6).max(40),
    instagramHandle: z.preprocess(trimOrUndefined, z.string().trim().max(120).optional()),
    contactEmail: z.string().trim().email().max(200),
    perceivedProblem: z.string().trim().min(12).max(2000),
    professionalsAndServices: z.string().trim().min(8).max(2000),
    additionalComments: z.preprocess(
      trimOrUndefined,
      z.string().trim().max(2000).optional()
    ),
    statusId: z.coerce.number().int().positive(),
  })
  .superRefine((value, ctx) => {
    if (!value.cityId && !value.cityName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cityName"],
        message: "Debes seleccionar o escribir una ciudad",
      });
    }
  });

async function resolveCityId(input: {
  countryId: number;
  cityId?: number;
  cityName?: string;
}): Promise<number> {
  const country = await prisma.paisDemo.findUnique({
    where: { id: input.countryId },
    select: { id: true },
  });
  if (!country) throw new Error("Pais invalido");

  if (input.cityId) {
    const existingCity = await prisma.ciudadDemo.findFirst({
      where: { id: input.cityId, paisId: input.countryId },
      select: { id: true },
    });
    if (!existingCity) throw new Error("Ciudad invalida para el pais seleccionado");
    return existingCity.id;
  }

  const cityName = input.cityName?.trim();
  if (!cityName) throw new Error("Ciudad requerida");

  const byName = await prisma.ciudadDemo.findFirst({
    where: {
      paisId: input.countryId,
      nombre: { equals: cityName, mode: "insensitive" },
    },
    select: { id: true },
  });
  if (byName) return byName.id;

  const created = await prisma.ciudadDemo.create({
    data: { paisId: input.countryId, nombre: cityName },
    select: { id: true },
  });
  return created.id;
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!isAdmin(user)) return new NextResponse("No autorizado", { status: 401 });

    const { id } = await ctx.params;

    const lead = await prisma.solicitudDemo.findUnique({
      where: { id },
      select: {
        id: true,
        nombreRepresentante: true,
        nombreClinica: true,
        numeroWhatsApp: true,
        usuarioInstagram: true,
        emailContacto: true,
        problemaPrincipal: true,
        profesionalesYServicios: true,
        comentariosAdicionales: true,
        estadoId: true,
        ciudadId: true,
        ciudad: {
          select: {
            id: true,
            nombre: true,
            pais: {
              select: {
                id: true,
                nombre: true,
                iso2: true,
                codigoTelefonico: true,
              },
            },
          },
        },
        creadoEn: true,
        actualizadoEn: true,
      },
    });

    if (!lead) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    return NextResponse.json({ lead });
  } catch (error) {
    console.error("[GET /api/demo-leads/[id]]", error);
    return NextResponse.json(
      { error: "No se pudo cargar la solicitud" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromCookie();
    if (!isAdmin(user)) return new NextResponse("No autorizado", { status: 401 });
    await ensureLeadStatuses(prisma);

    const { id } = await ctx.params;
    const raw = await req.json().catch(() => null);
    if (!raw) {
      return NextResponse.json(
        { ok: false, error: "Datos invalidos" },
        { status: 400 }
      );
    }

    const parsed = UpdateLeadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Revisa los campos del formulario" },
        { status: 400 }
      );
    }

    const [existingLead, status] = await Promise.all([
      prisma.solicitudDemo.findUnique({ where: { id }, select: { id: true } }),
      prisma.estadoSolicitudDemo.findUnique({
        where: { id: parsed.data.statusId },
        select: { id: true },
      }),
    ]);

    if (!existingLead) {
      return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });
    }
    if (!status) {
      return NextResponse.json(
        { ok: false, error: "Estado invalido" },
        { status: 400 }
      );
    }

    const cityId = await resolveCityId({
      countryId: parsed.data.countryId,
      cityId: parsed.data.cityId,
      cityName: parsed.data.cityName,
    });

    const updated = await prisma.solicitudDemo.update({
      where: { id },
      data: {
        nombreRepresentante: parsed.data.representativeName,
        nombreClinica: parsed.data.clinicName,
        ciudadId: cityId,
        numeroWhatsApp: parsed.data.whatsappNumber,
        usuarioInstagram: parsed.data.instagramHandle,
        emailContacto: parsed.data.contactEmail,
        problemaPrincipal: parsed.data.perceivedProblem,
        profesionalesYServicios: parsed.data.professionalsAndServices,
        comentariosAdicionales: parsed.data.additionalComments,
        estadoId: parsed.data.statusId,
      },
      select: { id: true, actualizadoEn: true },
    });

    return NextResponse.json({ ok: true, lead: updated });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[PATCH /api/demo-leads/[id]]", detail);
    return NextResponse.json(
      { ok: false, error: "No se pudo actualizar la solicitud" },
      { status: 500 }
    );
  }
}
