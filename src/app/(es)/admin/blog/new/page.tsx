'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm, { CategoriaOption, EstadoOption, BlogFormValues } from '@/components/blog/BlogForm';

export default function NewBlogPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categorias, setCategorias] = useState<CategoriaOption[]>([]);
  const [estados, setEstados] = useState<EstadoOption[]>([]);

  // Valores iniciales para creación
  const [initial, setInitial] = useState<BlogFormValues>({
    titulo: '',
    extracto: '',
    contenidoMd: '',
    portadaUrl: '',
    publicadoEn: '',
    minutosLectura: null,
    slug: '',
    categoriaId: '',
    estadoId: 0,
    etiquetas: [],
  });

  useEffect(() => {
    let cancelled = false;

    async function loadMeta() {
      setLoading(true);
      setError(null);
      try {
        // Debe devolver { categorias: {id,nombre}[], estados: {id,nombre}[] }
        const res = await fetch('/api/blog/meta', { cache: 'no-store' });
        if (!res.ok) throw new Error(`No se pudo cargar metadata (HTTP ${res.status})`);
        const meta = (await res.json()) as {
          categorias: CategoriaOption[];
          estados: EstadoOption[];
        };
        if (cancelled) return;

        setCategorias(meta.categorias || []);
        setEstados(meta.estados || []);

        // Preseleccionar primer estado si existe
        setInitial((cur) => ({
          ...cur,
          estadoId: meta.estados?.[0]?.id ?? 0,
        }));
      } catch (e: unknown) {
        if (!cancelled) {
          const message = e instanceof Error ? e.message : 'Error inesperado';
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMeta();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="h-9 w-64 animate-pulse rounded bg-neutral-200" />
        <div className="mt-6 h-[520px] w-full animate-pulse rounded-2xl bg-neutral-100" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">Nueva publicación</h1>
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <BlogForm
        mode="create"
        initial={initial}
        categorias={categorias}
        estados={estados}
        onSaved={(id) => {
          // Redirige al editor tras crear
          router.push(`/admin/blog/${id}/edit`);
        }}
        // BlogForm hará POST a /api/blog/posts por defecto
      />
    </div>
  );
}
