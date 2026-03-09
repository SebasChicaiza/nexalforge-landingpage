import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { bootstrapDemoCatalogIfEmpty, ensureLeadStatuses } from "@/lib/demo-catalog";
import { getUserFromCookie, isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bucket = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_REQ = 8;

const trimOrUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const CreateLeadSchema = z
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
    source: z.preprocess(trimOrUndefined, z.string().trim().max(120).optional()),
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

export async function POST(req: Request) {
  try {
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      "0.0.0.0";
    const now = Date.now();
    const entry = bucket.get(ip);
    if (!entry || now - entry.ts > WINDOW_MS) bucket.set(ip, { count: 1, ts: now });
    else if (entry.count >= MAX_REQ)
      return NextResponse.json(
        { ok: false, error: "Demasiadas solicitudes. Intenta en 1 minuto." },
        { status: 429 }
      );
    else entry.count += 1;

    await ensureLeadStatuses(prisma);
    await bootstrapDemoCatalogIfEmpty(prisma);

    const raw = await req.json().catch(() => null);
    if (!raw) {
      return NextResponse.json(
        { ok: false, error: "Datos invalidos" },
        { status: 400 }
      );
    }

    const parsed = CreateLeadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Revisa los campos del formulario" },
        { status: 400 }
      );
    }

    const cityId = await resolveCityId({
      countryId: parsed.data.countryId,
      cityId: parsed.data.cityId,
      cityName: parsed.data.cityName,
    });

    const newStatus = await prisma.estadoSolicitudDemo.findUnique({
      where: { nombre: "NUEVO" },
      select: { id: true },
    });
    if (!newStatus) {
      return NextResponse.json(
        { ok: false, error: "Catalogo de estados no disponible" },
        { status: 500 }
      );
    }

    const created = await prisma.solicitudDemo.create({
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
        estadoId: newStatus.id,
        origen: parsed.data.source ?? "demo-1",
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[POST /api/demo-leads]", detail);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar la solicitud" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const user = await getUserFromCookie();
    if (!isAdmin(user)) return new NextResponse("No autorizado", { status: 401 });

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") ?? "").trim();
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const take = Math.min(Math.max(1, Number(searchParams.get("take") ?? "20")), 100);
    const skip = (page - 1) * take;

    const where =
      q.length > 0
        ? {
            OR: [
              { nombreRepresentante: { contains: q, mode: "insensitive" as const } },
              { nombreClinica: { contains: q, mode: "insensitive" as const } },
              { emailContacto: { contains: q, mode: "insensitive" as const } },
              { numeroWhatsApp: { contains: q, mode: "insensitive" as const } },
              { ciudad: { nombre: { contains: q, mode: "insensitive" as const } } },
              { ciudad: { pais: { nombre: { contains: q, mode: "insensitive" as const } } } },
            ],
          }
        : {};

    const [rows, total] = await Promise.all([
      prisma.solicitudDemo.findMany({
        where,
        orderBy: { creadoEn: "desc" },
        skip,
        take,
        select: {
          id: true,
          nombreRepresentante: true,
          nombreClinica: true,
          numeroWhatsApp: true,
          usuarioInstagram: true,
          emailContacto: true,
          creadoEn: true,
          actualizadoEn: true,
          estado: { select: { id: true, nombre: true } },
          ciudad: {
            select: {
              id: true,
              nombre: true,
              pais: { select: { id: true, nombre: true, iso2: true } },
            },
          },
        },
      }),
      prisma.solicitudDemo.count({ where }),
    ]);

    return NextResponse.json({ rows, total, page, take });
  } catch (error) {
    console.error("[GET /api/demo-leads]", error);
    return NextResponse.json(
      { error: "No se pudo cargar las solicitudes" },
      { status: 500 }
    );
  }
}
