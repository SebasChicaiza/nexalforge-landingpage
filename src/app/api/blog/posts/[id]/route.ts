/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/blog/posts/[id]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PostUpsertSchema } from "@/lib/validatorsBlog";
import { slugify } from "@/lib/slugify";
import { verify } from "jsonwebtoken";
import * as z from "zod";

/* ——— auth helpers ——— */

const JWT_SECRET = process.env.JWT_SECRET || "";

type JwtPayloadNF = {
  exp: number;
  email: string;
  userName: string;
  roles: string[];
  iat: number;
};

async function getUserFromCookie(): Promise<JwtPayloadNF | null> {
  const jar = await cookies();
  const token = jar.get("nf_jwt")?.value;
  if (!token || !JWT_SECRET) return null;
  try {
    const payload = verify(token, JWT_SECRET) as JwtPayloadNF;
    if (!payload || !Array.isArray(payload.roles) || typeof payload.email !== "string") {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function hasRole(user: JwtPayloadNF | null, role: string): boolean {
  return !!user && Array.isArray(user.roles) && user.roles.includes(role);
}

const paramsSchema = z.object({ id: z.string().min(1) });

function badRequest(message = "Solicitud inválida") {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isKnown(e: unknown): e is Prisma.PrismaClientKnownRequestError {
  return !!e && typeof e === "object" && "code" in e;
}

async function ensureTags(keys: string[]) {
  const ids: string[] = [];
  for (const k of keys ?? []) {
    const s = slugify(k);
    let tag = await prisma.etiqueta.findUnique({ where: { slug: s } });
    if (!tag) tag = await prisma.etiqueta.create({ data: { nombre: k, slug: s } });
    ids.push(tag.id);
  }
  return ids;
}

async function uniqueSlugExcept(base: string, excludeId: string) {
  const baseSlug = slugify(base);
  let slug = baseSlug;
  for (let i = 1; ; i++) {
    const exists = await prisma.publicacion.findFirst({
      where: { slug, NOT: { id: excludeId } },
      select: { id: true },
    });
    if (!exists) break;
    slug = `${baseSlug}-${i}`;
  }
  return slug;
}

export async function PUT(req: Request, ctx: any) {
  const { params } = ctx as { params: { id: string } };
  const user = await getUserFromCookie();
  if (!hasRole(user, "Admin")) return new NextResponse("No autorizado", { status: 401 });

  const id = params.id;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid JSON body", { status: 400 });
  }
  const parsed = PostUpsertSchema.safeParse(body);
  if (!parsed.success) return new NextResponse(parsed.error.message, { status: 400 });
  const data = parsed.data;

  const existing = await prisma.publicacion.findUnique({
    where: { id },
    select: { id: true, slug: true },
  });
  if (!existing) return new NextResponse("Post not found", { status: 404 });

  const nextSlug =
    data.slug && data.slug !== existing.slug
      ? await uniqueSlugExcept(data.slug, id)
      : existing.slug;

  const [cat, est] = await Promise.all([
    prisma.categoria.findUnique({ where: { id: data.categoriaId }, select: { id: true } }),
    prisma.estado.findUnique({ where: { id: data.estadoId }, select: { id: true } }),
  ]);
  if (!cat) return new NextResponse("categoriaId inválido", { status: 400 });
  if (!est) return new NextResponse("estadoId inválido", { status: 400 });

  let publicadoEn: Date | null = null;
  if (data.publicadoEn) {
    const dt = new Date(data.publicadoEn);
    if (!Number.isNaN(dt.getTime())) publicadoEn = dt;
  }

  const minutosLectura =
    data.minutosLectura ??
    Math.max(1, Math.round((data.contenidoMd ?? "").split(/\s+/).filter(Boolean).length / 220));

  const tagIds = await ensureTags(data.etiquetas ?? []);

  try {
    await prisma.$transaction(async (tx) => {
      await tx.publicacionEtiqueta.deleteMany({ where: { publicacionId: id } });
      if (tagIds.length) {
        await tx.publicacionEtiqueta.createMany({
          data: tagIds.map((etiquetaId) => ({ publicacionId: id, etiquetaId })),
          skipDuplicates: true,
        });
      }
      await tx.publicacion.update({
        where: { id },
        data: {
          slug: nextSlug,
          titulo: data.titulo,
          extracto: data.extracto,
          contenidoMd: data.contenidoMd ?? null,
          portadaUrl: data.portadaUrl ?? null,
          categoriaId: data.categoriaId,
          estadoId: data.estadoId,
          publicadoEn,
          minutosLectura,
          autorId: data.autorId ?? null,
        },
      });
    });

    return NextResponse.json({ ok: true, id, slug: nextSlug });
  } catch (e) {
    if (isKnown(e) && e.code === "P2002") return new NextResponse("Slug ya existe", { status: 409 });
    console.error("[PUT /api/blog/posts/[id]]", e);
    return new NextResponse("Error updating post", { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: any) {
  try {
    const { params } = ctx as { params: { id: string } };
    const user = await getUserFromCookie();
    if (!hasRole(user, "Admin")) return new NextResponse("No autorizado", { status: 401 });

    const { id } = paramsSchema.parse(params);

    const updated = await prisma.publicacion.update({
      where: { id },
      data: { estado_borrado: true, actualizadoEn: new Date() },
      select: { id: true, estado_borrado: true, actualizadoEn: true },
    });

    return NextResponse.json({ ok: true, post: updated });
  } catch (err) {
    if (err instanceof z.ZodError) return badRequest("Parámetros inválidos");
    if (isKnown(err) && err.code === "P2025")
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    console.error("DELETE /api/posts/[id] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PATCH(req: Request, ctx: any) {
  try {
    const { params } = ctx as { params: { id: string } };
    const user = await getUserFromCookie();
    if (!hasRole(user, "Admin")) return new NextResponse("No autorizado", { status: 401 });

    const { id } = paramsSchema.parse(params);

    const bodySchema = z.object({ estado_borrado: z.boolean().optional() }).optional();
    const body = await req.json().catch(() => ({}));
    const parsed = bodySchema.parse(body) ?? {};
    const nextValue = typeof parsed.estado_borrado === "boolean" ? parsed.estado_borrado : false;

    const updated = await prisma.publicacion.update({
      where: { id },
      data: { estado_borrado: nextValue, actualizadoEn: new Date() },
      select: { id: true, estado_borrado: true, actualizadoEn: true },
    });

    return NextResponse.json({ ok: true, post: updated });
  } catch (err) {
    if (err instanceof z.ZodError) return badRequest("Cuerpo inválido");
    if (isKnown(err) && err.code === "P2025")
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });

    console.error("PATCH /api/posts/[id] error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
