// components/blog/BlogForm.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export type CategoriaOption = { id: string; nombre: string };
export type EstadoOption = { id: number; nombre: string };

export type BlogFormValues = {
  id?: string;
  titulo: string;
  extracto: string;
  contenidoMd?: string | null;
  portadaUrl?: string | null;
  publicadoEn?: string | null; // ISO (yyyy-mm-dd) desde <input type="date">
  minutosLectura?: number | null;
  slug?: string;

  categoriaId: string;   // FK requerido
  estadoId: number;      // FK requerido

  etiquetas?: string[];  // nombres/slugs
};

type Props = {
  mode: 'create' | 'edit';
  initial?: Partial<BlogFormValues>;
  categorias: CategoriaOption[];
  estados: EstadoOption[];
  onSaved?: (id: string) => void;
  submitTo?: string;
};

// Brand palette used for subtle accents
const BRAND = {
  primary: '#8B1E2D',
  primaryRing: 'rgba(184,69,80,0.35)', // nf-primary-400/35-ish
};

// --- START: MODIFIED STYLE HELPERS ---

// Base classes for all text/select inputs and textareas
const baseInputCls = `
  w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 
  placeholder-neutral-500 shadow-sm outline-none transition-[box-shadow,border-color] duration-150
`;

/**
 * Generates class names for standard inputs (text, number, date, select) with error state handling.
 * @param hasError - Whether to apply error styling.
 */
function getStyledInputCls(hasError: boolean) {
  return `${baseInputCls} ${
    hasError
      ? 'border-red-500 focus:!border-red-500' // Stronger red for error state
      : 'focus:border-neutral-500' // Subtle focus style for normal state
  }`;
}

/**
 * Generates class names for textarea inputs with error state handling.
 * @param hasError - Whether to apply error styling.
 */
function getStyledTextareaCls(hasError: boolean) {
  return `${baseInputCls.replace('text-sm', 'text-sm')} ${ // Textarea usually needs its own class, keep text-sm
    hasError
      ? 'border-red-500 focus:!border-red-500'
      : 'focus:border-neutral-500'
  }`;
}

// --- END: MODIFIED STYLE HELPERS ---

export default function BlogForm({
  mode,
  initial,
  categorias,
  estados,
  onSaved,
  submitTo,
}: Props) {
  const [values, setValues] = useState<BlogFormValues>(() => ({
    titulo: initial?.titulo ?? '',
    extracto: initial?.extracto ?? '',
    contenidoMd: initial?.contenidoMd ?? '',
    portadaUrl: initial?.portadaUrl ?? '',
    publicadoEn: initial?.publicadoEn ? toDateInput(initial.publicadoEn) : '',
    minutosLectura: initial?.minutosLectura ?? null,
    slug: initial?.slug ?? '',
    categoriaId: initial?.categoriaId ?? '',
    estadoId: initial?.estadoId ?? (estados[0]?.id ?? 1),
    etiquetas: initial?.etiquetas ?? [],
    id: initial?.id,
  }));

  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // lightweight client errors + "touched" for UX
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!values.titulo.trim()) e.titulo = 'Requerido';
    if (!values.extracto.trim()) e.extracto = 'Requerido';
    if (!values.categoriaId) e.categoriaId = 'Selecciona una categoría';
    if (!values.estadoId && values.estadoId !== 0) e.estadoId = 'Selecciona un estado';
    return e;
  }, [values]);

  // Autocálculo de minutos lectura si está vacío
  const autoMinutes = useMemo(() => {
    const words = (values.contenidoMd ?? '').trim().split(/\s+/).filter(Boolean).length;
    const m = Math.max(1, Math.round(words / 220));
    return m;
  }, [values.contenidoMd]);

  useEffect(() => {
    setMsg(null);
    setErr(null);
  }, [values]);

  function set<K extends keyof BlogFormValues>(key: K, v: BlogFormValues[K]) {
    setValues((s) => ({ ...s, [key]: v }));
  }

  function markTouched(name: string) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ titulo: true, extracto: true, categoriaId: true, estadoId: true });
    if (Object.keys(errors).length) {
      // show first error
      setErr('Por favor corrige los campos requeridos.');
      return;
    }

    setSending(true);
    setMsg(null);
    setErr(null);

    try {
      const payload = {
        ...values,
        minutosLectura: values.minutosLectura ?? autoMinutes,
        publicadoEn: values.publicadoEn ? new Date(values.publicadoEn).toISOString() : null,
      };

      const endpoint =
        submitTo ??
        (mode === 'edit' && values.id
          ? `/api/blog/posts/${values.id}`
          : `/api/blog/posts`);

      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await safeText(res);
        throw new Error(text || `HTTP ${res.status}`);
      }

      const json = (await res.json()) as { id: string };
      setMsg('Guardado con éxito.');
      onSaved?.(json.id);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to load';
      setErr(message);
    } finally {
      setSending(false);
    }
  }

  const categoriaNombre = categorias.find((c) => c.id === values.categoriaId)?.nombre;

  // small helpers
  const extractoCount = values.extracto.trim().length;
  const coverOk = !!values.portadaUrl && /^https?:\/\//i.test(values.portadaUrl);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {mode === 'edit' ? 'Editar publicación' : 'Nueva publicación'}
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Completa la información y guarda para actualizar el blog.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {values.slug && (
            <Link
              href={`/blog/${values.slug}`}
              target="_blank"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50"
            >
              Ver pública
            </Link>
          )}
          <Link
            href="/admin/blog"
            className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50"
          >
            Volver
          </Link>
          <button
            type="submit"
            disabled={sending}
            className="rounded-xl px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md disabled:opacity-60"
            style={{ background: BRAND.primary }}
          >
            {sending ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          {/* Columna izquierda */}
          <div className="space-y-5">
            <Field
              label="Título"
              required
              error={touched.titulo ? errors.titulo : undefined}
            >
              <input
                className={getStyledInputCls(!!(touched.titulo && errors.titulo))}
                value={values.titulo}
                onChange={(e) => set('titulo', e.target.value)}
                onBlur={() => markTouched('titulo')}
                placeholder="Título de la publicación"
                required
                aria-invalid={!!(touched.titulo && errors.titulo)}
                aria-describedby="error-titulo"
              />
            </Field>

            <Field
              label="Extracto"
              hint="Resumen breve que aparece en las tarjetas."
              required
              extraRight={<span className="text-xs text-neutral-500">{extractoCount} caracteres</span>}
              error={touched.extracto ? errors.extracto : undefined}
            >
              <textarea
                className={getStyledTextareaCls(!!(touched.extracto && errors.extracto))}
                value={values.extracto}
                onChange={(e) => set('extracto', e.target.value)}
                onBlur={() => markTouched('extracto')}
                rows={4}
                required
                aria-invalid={!!(touched.extracto && errors.extracto)}
                aria-describedby="error-extracto"
              />
            </Field>

            <Field label="Contenido (Markdown)" hint="Se usa para calcular los minutos de lectura automáticamente.">
              <textarea
                className={getStyledTextareaCls(false)}
                value={values.contenidoMd ?? ''}
                onChange={(e) => set('contenidoMd', e.target.value)}
                rows={12}
                placeholder="Escribe en Markdown…"
              />
              <div className="mt-1 text-xs text-neutral-500">
                Estimación: <b>{values.minutosLectura ?? autoMinutes} min</b>
              </div>
            </Field>
          </div>

          {/* Columna derecha */}
          <div className="space-y-5">
            <Field label="Imagen de portada (URL)" hint="Pega una URL completa (http/https).">
              <input
                className={getStyledInputCls(false)}
                value={values.portadaUrl ?? ''}
                onChange={(e) => set('portadaUrl', e.target.value)}
                placeholder="https://…"
                inputMode="url"
              />
              {coverOk && (
                <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={values.portadaUrl ?? undefined}
                    alt="Previsualización de portada"
                    className="h-40 w-full object-cover"
                  />
                </div>
              )}
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Categoría"
                required
                error={touched.categoriaId ? errors.categoriaId : undefined}
              >
                <select
                  className={getStyledInputCls(!!(touched.categoriaId && errors.categoriaId)) + ' custom-select-arrow'}
                  value={values.categoriaId}
                  onChange={(e) => set('categoriaId', e.target.value)}
                  onBlur={() => markTouched('categoriaId')}
                  required
                  aria-invalid={!!(touched.categoriaId && errors.categoriaId)}
                  aria-describedby="error-categoriaId"
                >
                  <option value="" disabled>Selecciona categoría…</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </Field>

              <Field
                label="Estado"
                required
                error={touched.estadoId ? errors.estadoId : undefined}
              >
                <select
                  className={getStyledInputCls(!!(touched.estadoId && errors.estadoId)) + ' custom-select-arrow'}
                  value={values.estadoId}
                  onChange={(e) => set('estadoId', Number(e.target.value))}
                  onBlur={() => markTouched('estadoId')}
                  required
                  aria-invalid={!!(touched.estadoId && errors.estadoId)}
                  aria-describedby="error-estadoId"
                >
                  {estados.map((s) => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Publicado el">
                <input
                  type="date"
                  className={getStyledInputCls(false)}
                  value={values.publicadoEn ?? ''}
                  onChange={(e) => set('publicadoEn', e.target.value)}
                />
              </Field>

              <Field label="Minutos de lectura" hint="Se calcula automáticamente si lo dejas vacío.">
                <input
                  className={getStyledInputCls(false)}
                  type="number"
                  min={1}
                  value={values.minutosLectura ?? ''}
                  onChange={(e) =>
                    set('minutosLectura', e.target.value ? Number(e.target.value) : null)
                  }
                  placeholder={String(autoMinutes)}
                />
              </Field>
            </div>

            <Field label="Etiquetas" hint="Separa por comas (ej: ia, automatización, ventas)">
              <input
                className={getStyledInputCls(false)}
                value={(values.etiquetas ?? []).join(', ')}
                onChange={(e) =>
                  set(
                    'etiquetas',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  )
                }
                placeholder="ej: ia, automatización, ventas"
              />
            </Field>

            {/* Meta */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-700">
              {values.slug ? (
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="font-medium text-neutral-900">Slug:</span> /blog/{values.slug}
                  </div>
                  {categoriaNombre && (
                    <div>
                      <span className="font-medium text-neutral-900">Categoría:</span> {categoriaNombre}
                    </div>
                  )}
                </div>
              ) : (
                <div>El slug se generará a partir del título si no se establece manualmente.</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-6 py-4">
          <div className="text-xs">
            {err && <span className="text-red-600">{err}</span>}
            {msg && <span className="text-green-700">{msg}</span>}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/blog"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={sending}
              className="rounded-xl px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md disabled:opacity-60"
              style={{ background: BRAND.primary }}
            >
              {sending ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>

      {/* Small styles: higher contrast inputs, better focus ring, consistent sizing */}
      <style jsx global>{`
        /* Reset and apply common input styles for high contrast */
        .nf-input,
        .nf-textarea {
            /* Inherit baseInputCls properties for consistency, though we use the specific helpers above now */
            @apply w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 
            placeholder-neutral-500 shadow-sm outline-none transition-[box-shadow,border-color] duration-150;
        }

        /* Consistent Focus Ring using Brand color */
        .nf-input:focus,
        .nf-textarea:focus,
        .custom-select-arrow:focus {
          border-color: ${BRAND.primary} !important; /* Force border color on focus */
          box-shadow: 0 0 0 3px ${BRAND.primaryRing} !important;
        }
        
        /* Ensure selects look like inputs across browsers with a simple arrow */
        .custom-select-arrow {
            /* Keep original padding/text/border styles from baseInputCls */
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            
            /* Using a simple SVG arrow for cross-browser consistency */
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236b7280'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.75rem center;
            background-size: 1.2em 1.2em;
            padding-right: 2.75rem !important; /* Make space for the arrow */
        }
      `}</style>
    </form>
  );
}

/* ——— support components & utils ——— */

function Field({
  label,
  hint,
  required,
  error,
  children,
  extraRight,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  extraRight?: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-900">
          {label} {required && <span className="text-red-600">*</span>}
        </div>
        {extraRight}
      </div>
      {children}
      {error ? (
        <div className="mt-1 text-xs text-red-600 font-medium" id={`error-${label}`.toLowerCase()}>
          {error}
        </div>
      ) : hint ? (
        <div className="mt-1 text-xs text-neutral-600">{hint}</div>
      ) : null}
    </label>
  );
}

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}

function toDateInput(isoOrDate: string) {
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}