// lib/validatorsBlog.ts
import { z } from 'zod';

/* Helpers */
const trim = z.string().transform((s) => s.trim());
const optionalTrim = z
  .string()
  .transform((s) => s.trim())
  .refine(() => true); // keep as string after trim
const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === '' ? undefined : v), schema);

const emptyToUndef = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v);
const OptionalSlugSchema = z.preprocess(
  emptyToUndef,
  z.string().trim().min(1, 'Slug inválido').optional()
);


const dateString = z
  .string()
  .refine((s) => !Number.isNaN(new Date(s).getTime()), {
    message: 'Fecha inválida',
  });

/**
 * POST/PUT body for crear/editar Publicacion
 * - usa FKs escalares: `categoriaId` (string cuid), `estadoId` (number)
 * - `publicadoEn` acepta ISO string; si viene '', se omite
 */
export const PostUpsertSchema = z.object({
  slug: OptionalSlugSchema, // <— ✅ ahora es opcional

  titulo: z.string().trim().min(2).max(160),
  extracto: z.string().trim().min(10).max(2000),

  contenidoMd: z.preprocess(emptyToUndef, z.string().trim().optional()),
  portadaUrl: z.preprocess(
    emptyToUndef,
    z.string().url('URL inválida').max(2048).optional()
  ),

  publicadoEn: z.preprocess(
    emptyToUndef,
    z.string().refine((s) => !Number.isNaN(new Date(s).getTime()), 'Fecha inválida').optional()
  ),

  minutosLectura: z.number().int().positive().optional(),
  autorId: z.preprocess(emptyToUndef, z.string().trim().optional()),

  // FKs escalares (requeridos)
  categoriaId: z.string().trim().min(1),
  estadoId: z.number().int(),

  etiquetas: z.array(z.string().trim()).transform((arr) =>
    Array.from(new Set(arr.map((s) => s.trim()).filter(Boolean)))
  ).optional(),
});

/* Tipos útiles para tu UI / endpoints */
export type PostUpsertInput = z.infer<typeof PostUpsertSchema>;

/* Opcional: esquemas ligeros para /api/blog/meta (por si te sirven en el cliente) */
export const CategoriaOptionSchema = z.object({
  id: z.string(),
  nombre: z.string(),
});
export const EstadoOptionSchema = z.object({
  id: z.number().int(),
  nombre: z.string(),
});
export const AdminPostsMetaSchema = z.object({
  categorias: z.array(CategoriaOptionSchema),
  estados: z.array(EstadoOptionSchema),
});
export type CategoriaOption = z.infer<typeof CategoriaOptionSchema>;
export type EstadoOption = z.infer<typeof EstadoOptionSchema>;

/* Opcional: query schema para listado /api/blog/posts */
export const AdminPostsQuerySchema = z.object({
  q: emptyToUndefined(trim).optional(),
  estado: emptyToUndefined(trim).optional(),     // id numérico o nombre
  categoria: emptyToUndefined(trim).optional(),  // id (cuid) o nombre
  page: z
    .string()
    .optional()
    .transform((v) => Number(v ?? 1))
    .pipe(z.number().int().min(1)),
  take: z
    .string()
    .optional()
    .transform((v) => Number(v ?? 20))
    .pipe(z.number().int().min(1).max(100)),
});
export type AdminPostsQuery = z.infer<typeof AdminPostsQuerySchema>;
