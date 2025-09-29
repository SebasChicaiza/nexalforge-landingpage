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

  etiquetas?: string[];  // nombres/slugs (se enviarán como array de strings)
};

type Props = {
  mode: 'create' | 'edit';
  initial?: Partial<BlogFormValues>;
  categorias: CategoriaOption[];
  estados: EstadoOption[];
  onSaved?: (id: string) => void;
  // Cuando mode === 'edit' se requiere initial.id
  submitTo?: string; // override de endpoint (por defecto: POST /api/blog/posts o PUT /api/blog/posts/:id)
};

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
    publicadoEn: initial?.publicadoEn
      ? toDateInput(initial.publicadoEn)
      : '',
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setMsg(null);
    setErr(null);

    try {
      // normalizar payload para API
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

  const categoriaNombre = categorias.find(c => c.id === values.categoriaId)?.nombre;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {mode === 'edit' ? 'Editar publicación' : 'Nueva publicación'}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Completa la información y guarda para actualizar el blog.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {values.slug && (
            <Link
              href={`/blog/${values.slug}`}
              target="_blank"
              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              Ver pública
            </Link>
          )}
          <Link
            href="/admin/blog"
            className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            Volver
          </Link>
          <button
            type="submit"
            disabled={sending}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md disabled:opacity-60"
          >
            {sending ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <Field label="Título" required>
              <input
                className="nf-input"
                value={values.titulo}
                onChange={(e) => set('titulo', e.target.value)}
                placeholder="Título de la publicación"
                required
              />
            </Field>

            <Field label="Extracto" hint="Resumen breve que aparece en las tarjetas." required>
              <textarea
                className="nf-textarea"
                value={values.extracto}
                onChange={(e) => set('extracto', e.target.value)}
                rows={4}
                required
              />
            </Field>

            <Field label="Contenido (Markdown)">
              <textarea
                className="nf-textarea"
                value={values.contenidoMd ?? ''}
                onChange={(e) => set('contenidoMd', e.target.value)}
                rows={12}
                placeholder="Escribe en Markdown…"
              />
            </Field>
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            <Field label="Imagen de portada (URL)">
              <input
                className="nf-input"
                value={values.portadaUrl ?? ''}
                onChange={(e) => set('portadaUrl', e.target.value)}
                placeholder="https://…"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Categoría" required>
                <select
                  className="nf-input"
                  value={values.categoriaId}
                  onChange={(e) => set('categoriaId', e.target.value)}
                  required
                >
                  <option value="" disabled>Selecciona categoría…</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </Field>

              <Field label="Estado" required>
                <select
                  className="nf-input"
                  value={values.estadoId}
                  onChange={(e) => set('estadoId', Number(e.target.value))}
                  required
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
                  className="nf-input"
                  value={values.publicadoEn ?? ''}
                  onChange={(e) => set('publicadoEn', e.target.value)}
                />
              </Field>

              <Field label="Minutos de lectura" hint="Se calcula automáticamente si lo dejas vacío.">
                <input
                  className="nf-input"
                  type="number"
                  min={1}
                  value={values.minutosLectura ?? ''}
                  onChange={(e) => set('minutosLectura', e.target.value ? Number(e.target.value) : null)}
                  placeholder={String(autoMinutes)}
                />
              </Field>
            </div>

            <Field label="Etiquetas" hint="Separa por comas (ej: ia, automatización, ventas)">
              <input
                className="nf-input"
                value={(values.etiquetas ?? []).join(', ')}
                onChange={(e) =>
                  set('etiquetas', e.target.value.split(',').map(s => s.trim()).filter(Boolean))
                }
                placeholder="ej: ia, automatización, ventas"
              />
            </Field>

            {/* Meta */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
              {values.slug ? (
                <div className="flex flex-col gap-1">
                  <div><span className="font-medium text-neutral-800">Slug:</span> /blog/{values.slug}</div>
                  {categoriaNombre && (
                    <div><span className="font-medium text-neutral-800">Categoría:</span> {categoriaNombre}</div>
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
          <div className="text-xs text-neutral-500">
            {err && <span className="text-red-600">{err}</span>}
            {msg && <span className="text-green-700">{msg}</span>}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/blog"
              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={sending}
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md disabled:opacity-60"
            >
              {sending ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>

      {/* Small styles */}
      <style jsx global>{`
        .nf-input {
          @apply w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 shadow-sm outline-none focus:border-neutral-400 focus:ring-0;
        }
        .nf-textarea {
          @apply w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 shadow-sm outline-none focus:border-neutral-400 focus:ring-0;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-sm font-medium text-neutral-800">
        {label} {required && <span className="text-red-500">*</span>}
      </div>
      {children}
      {hint && <div className="mt-1 text-xs text-neutral-500">{hint}</div>}
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
