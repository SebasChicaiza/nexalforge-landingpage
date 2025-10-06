'use client';

import React, { useMemo, useState } from 'react';

/**
 * WhatsAppOptInCard — Nexal Forge
 *
 * Card de consentimiento específico para WhatsApp (independiente del banner de cookies).
 * - Sin casilla premarcada
 * - Botón deshabilitado hasta marcar
 * - Guarda un payload de prueba en localStorage y emite onSave(record)
 * - Estilos con Tailwind y colores de marca
 *
 * Requisitos: Tailwind CSS. Colócalo en cualquier página o modal.
 */

export type WhatsAppOptInRecord = {
  version: number;
  timestamp: string; // ISO
  channel: 'whatsapp';
  business: string;
  purposes: string[]; // p.ej. ['atencion_cliente', 'transaccional', 'marketing']
  textSeen: string; // Texto exacto presentado al usuario
  origin?: string; // 'web' | 'app' | 'qr' | etc.
};

export type WhatsAppOptInCardProps = {
  /** Nombre del negocio que verá el usuario */
  businessName?: string;
  /** Finalidades a registrar. Por defecto: atención y transaccional. Agrega 'marketing' sólo si tu copy lo indica */
  purposes?: string[];
  /** URL de la Política de Privacidad */
  privacyUrl?: string;
  /** Identificador de almacenamiento local (override para multi‑tenant) */
  storageKey?: string;
  /** Origen para auditar (web/app/qr/etc.) */
  origin?: string;
  /** Callback al guardar el consentimiento */
  onSave?: (record: WhatsAppOptInRecord) => void | Promise<void>;
  /** Estado inicial del checkbox (false por cumplimiento) */
  defaultChecked?: boolean;
  /** Desactiva el guardado en localStorage */
  disableLocalStorage?: boolean;
  /** Clase extra para el contenedor */
  className?: string;
};

const DEFAULT_STORAGE_KEY = 'nf_whatsapp_optin_v1';

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}

export default function WhatsAppOptInCard({
  businessName = 'Nexal Forge',
  purposes = ['atencion_cliente', 'transaccional'],
  privacyUrl = '/politica-privacidad',
  storageKey = DEFAULT_STORAGE_KEY,
  origin = 'web',
  onSave,
  defaultChecked = false,
  disableLocalStorage = false,
  className,
}: WhatsAppOptInCardProps) {
  const [checked, setChecked] = useState<boolean>(defaultChecked);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const legalCopy = useMemo(() => {
    const marketingIncluded = purposes.includes('marketing');
    const base = `Acepto recibir mensajes de ${businessName} por WhatsApp para atención al cliente y notificaciones transaccionales`;
    const withMkt = marketingIncluded ? `${base}, y comunicaciones comerciales.` : `${base}.`;
    return withMkt + ' Puedo darme de baja respondiendo BAJA/STOP o bloqueando el número.';
  }, [businessName, purposes]);

  const handleSave = async () => {
    if (!checked || saving || saved) return;
    setSaving(true);

    const record: WhatsAppOptInRecord = {
      version: 1,
      timestamp: new Date().toISOString(),
      channel: 'whatsapp',
      business: businessName,
      purposes,
      textSeen: legalCopy,
      origin,
    };

    try {
      if (!disableLocalStorage) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(record));
        } catch (_) {
          // Ignorar errores de storage (p. ej., modo incógnito estricto)
        }
      }
      await onSave?.(record);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={classNames(
        'mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm',
        className
      )}
      role="region"
      aria-labelledby="wa-optin-title"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-[#B84550]" aria-hidden />
        <h2 id="wa-optin-title" className="text-lg font-bold text-gray-900">
          Opt‑in para WhatsApp
        </h2>
      </div>

      <p className="mb-4 text-sm text-gray-700">
        Este consentimiento es <strong>independiente</strong> del de cookies. Al marcar la casilla, aceptas
        recibir mensajes por <strong>WhatsApp</strong> de {businessName}. Puedes darte de baja en cualquier momento
        respondiendo <em>BAJA</em>/<em>STOP</em> o bloqueando el número.
      </p>

      <label className="mb-4 flex items-start gap-3 text-sm text-gray-900">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-gray-300"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          aria-describedby="wa-optin-legal"
        />
        <span>
          {legalCopy} He leído la{' '}
          <a href={privacyUrl} className="underline" target="_blank" rel="noreferrer">
            Política de Privacidad
          </a>
          .
        </span>
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div id="wa-optin-legal" className="text-xs text-gray-600">
          Se registrará fecha/hora, versión del texto, origen y finalidades como prueba del consentimiento.
        </div>
        <button
          type="button"
          disabled={!checked || saving || saved}
          onClick={handleSave}
          className={classNames(
            'rounded-xl px-4 py-2 text-sm font-semibold',
            saved
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-[#2A2A2A] text-white hover:brightness-110 disabled:opacity-50'
          )}
          aria-live="polite"
        >
          {saved ? 'Guardado' : saving ? 'Guardando…' : 'Guardar consentimiento'}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-gray-600">
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5">Derecho a baja</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5">Revisión humana</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5">Finalidad limitada</span>
      </div>

      {/* Ejemplo de uso:
        <WhatsAppOptInCard
          businessName="Nexal Forge"
          purposes={['atencion_cliente', 'transaccional']} // Añade 'marketing' sólo si tu copy lo explicita
          onSave={(rec) => fetch('/api/consent', { method: 'POST', body: JSON.stringify(rec) })}
        />
      */}
    </div>
  );
}
