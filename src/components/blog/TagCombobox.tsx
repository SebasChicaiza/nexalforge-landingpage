'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  allTags: { id: string; nombre: string; slug: string }[];
  value: string[];              // array de slugs o nombres
  onChange: (v: string[]) => void;
  placeholder?: string;
};

export default function TagCombobox({ allTags, value, onChange, placeholder }: Props) {
  const [q, setQ] = useState('');
  const options = useMemo(() => {
    const lc = q.toLowerCase();
    return allTags.filter(t => t.nombre.toLowerCase().includes(lc) || t.slug.includes(lc));
  }, [q, allTags]);

  const toggle = (slugOrName: string) => {
    if (value.includes(slugOrName)) onChange(value.filter(v => v !== slugOrName));
    else onChange([...value, slugOrName]);
  };

  useEffect(() => { /* noop: controlado */ }, [value]);

  return (
    <div className="space-y-2">
      <input
        className="w-full rounded border px-3 py-2"
        placeholder={placeholder ?? 'Busca o crea etiquetas…'}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {value.map(v => (
          <span key={v} className="rounded-full bg-neutral-200 px-3 py-1 text-sm">
            {v}
            <button className="ml-2 text-neutral-500" onClick={() => toggle(v)}>×</button>
          </span>
        ))}
      </div>
      <div className="max-h-40 overflow-auto rounded border">
        {options.length ? options.map(t => (
          <button
            type="button"
            key={t.slug}
            onClick={() => toggle(t.slug)}
            className={`flex w-full items-center justify-between px-3 py-2 text-left hover:bg-neutral-50
              ${value.includes(t.slug) ? 'bg-neutral-100' : ''}`}
          >
            <span>{t.nombre}</span>
            <span className="text-xs text-neutral-500">/{t.slug}</span>
          </button>
        )) : (
          <div className="px-3 py-2 text-sm text-neutral-500">No hay coincidencias. Escribe y crea libremente (se guardan al publicar/guardar).</div>
        )}
      </div>
    </div>
  );
}
