"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type CityOption = { id: number; nombre: string };
type CountryOption = {
  id: number;
  nombre: string;
  iso2: string;
  codigoTelefonico: string | null;
  ciudades: CityOption[];
};
type StatusOption = { id: number; nombre: string };

type LeadDetail = {
  id: string;
  nombreRepresentante: string;
  nombreClinica: string;
  numeroWhatsApp: string;
  usuarioInstagram: string | null;
  emailContacto: string;
  problemaPrincipal: string;
  profesionalesYServicios: string;
  comentariosAdicionales: string | null;
  estadoId: number;
  ciudadId: number;
  ciudad: {
    id: number;
    nombre: string;
    pais: { id: number; nombre: string; iso2: string; codigoTelefonico: string | null };
  };
};

type FormState = {
  representativeName: string;
  clinicName: string;
  countryId: string;
  cityId: string;
  cityName: string;
  whatsappNumber: string;
  instagramHandle: string;
  contactEmail: string;
  perceivedProblem: string;
  professionalsAndServices: string;
  additionalComments: string;
  statusId: string;
};

const emptyForm: FormState = {
  representativeName: "",
  clinicName: "",
  countryId: "",
  cityId: "",
  cityName: "",
  whatsappNumber: "",
  instagramHandle: "",
  contactEmail: "",
  perceivedProblem: "",
  professionalsAndServices: "",
  additionalComments: "",
  statusId: "",
};

export default function EditDemoLeadPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const leadId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [statuses, setStatuses] = useState<StatusOption[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);

  const selectedCountry = useMemo(
    () => countries.find((country) => String(country.id) === form.countryId),
    [countries, form.countryId]
  );
  const isEcuador = selectedCountry?.iso2 === "EC";
  const selectedCities = selectedCountry?.ciudades ?? [];

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [leadRes, locationsRes] = await Promise.all([
          fetch(`/api/demo-leads/${leadId}`, { cache: "no-store" }),
          fetch("/api/demo-leads/locations", { cache: "no-store" }),
        ]);

        const leadJson = (await leadRes.json()) as { lead?: LeadDetail; error?: string };
        const locationsJson = (await locationsRes.json()) as {
          ok?: boolean;
          countries?: CountryOption[];
          statuses?: StatusOption[];
          error?: string;
        };

        if (!leadRes.ok || !leadJson.lead) {
          throw new Error(leadJson.error ?? "No se pudo cargar la solicitud");
        }
        if (!locationsRes.ok || !locationsJson.ok) {
          throw new Error(locationsJson.error ?? "No se pudo cargar catalogos");
        }

        const lead = leadJson.lead;
        const countriesData = locationsJson.countries ?? [];
        const statusesData = locationsJson.statuses ?? [];

        if (!cancelled) {
          setCountries(countriesData);
          setStatuses(statusesData);
          setForm({
            representativeName: lead.nombreRepresentante,
            clinicName: lead.nombreClinica,
            countryId: String(lead.ciudad.pais.id),
            cityId: String(lead.ciudad.id),
            cityName: lead.ciudad.nombre,
            whatsappNumber: lead.numeroWhatsApp,
            instagramHandle: lead.usuarioInstagram ?? "",
            contactEmail: lead.emailContacto,
            perceivedProblem: lead.problemaPrincipal,
            professionalsAndServices: lead.profesionalesYServicios,
            additionalComments: lead.comentariosAdicionales ?? "",
            statusId: String(lead.estadoId),
          });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "No se pudo cargar";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [leadId]);

  const onCountryChange = (countryId: string) => {
    setForm((prev) => ({
      ...prev,
      countryId,
      cityId: "",
      cityName: "",
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;

    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const payload = {
        representativeName: form.representativeName,
        clinicName: form.clinicName,
        countryId: Number(form.countryId),
        cityId: isEcuador ? Number(form.cityId) : undefined,
        cityName: isEcuador ? undefined : form.cityName,
        whatsappNumber: form.whatsappNumber,
        instagramHandle: form.instagramHandle,
        contactEmail: form.contactEmail,
        perceivedProblem: form.perceivedProblem,
        professionalsAndServices: form.professionalsAndServices,
        additionalComments: form.additionalComments,
        statusId: Number(form.statusId),
      };

      const res = await fetch(`/api/demo-leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "No se pudo guardar");
      }

      setSuccess("Cambios guardados correctamente.");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo guardar";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Editar solicitud de demo
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Ajusta datos de la solicitud y su estado comercial.
            </p>
          </div>
          <Link
            href="/admin/demo-leads"
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            Volver
          </Link>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow">
          <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-200" />
          <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
          <div className="mt-4 h-40 animate-pulse rounded bg-neutral-100" />
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow"
        >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nombre del dueno o representante">
                <input
                  value={form.representativeName}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, representativeName: event.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Nombre de la clinica">
                <input
                  value={form.clinicName}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, clinicName: event.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Pais">
                <select
                  value={form.countryId}
                  onChange={(event) => onCountryChange(event.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Selecciona tu pais</option>
                  {countries.map((country) => (
                    <option key={country.id} value={String(country.id)}>
                      {country.nombre}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Ciudad">
                {isEcuador ? (
                  <select
                    value={form.cityId}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, cityId: event.target.value }))
                    }
                    className={inputClass}
                    required
                  >
                    <option value="">Selecciona una ciudad</option>
                    {selectedCities.map((city) => (
                      <option key={city.id} value={String(city.id)}>
                        {city.nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={form.cityName}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, cityName: event.target.value }))
                    }
                    className={inputClass}
                    required
                  />
                )}
              </Field>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Numero de WhatsApp">
                <input
                  value={form.whatsappNumber}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, whatsappNumber: event.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Usuario de Instagram (opcional)">
                <input
                  value={form.instagramHandle}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, instagramHandle: event.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Email de contacto">
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, contactEmail: event.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Estado">
                <select
                  value={form.statusId}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, statusId: event.target.value }))
                  }
                  className={inputClass}
                  required
                >
                  <option value="">Selecciona un estado</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={String(status.id)}>
                      {status.nombre}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-4 space-y-4">
              <Field label="Que problema principal quieres resolver con Nexi">
                <textarea
                  rows={4}
                  value={form.perceivedProblem}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, perceivedProblem: event.target.value }))
                  }
                  className={inputClass}
                  required
                />
              </Field>

              <Field label="Cuantos profesionales tienen y que servicios ofrecen">
                <textarea
                  rows={4}
                  value={form.professionalsAndServices}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      professionalsAndServices: event.target.value,
                    }))
                  }
                  className={inputClass}
                  required
                />
              </Field>

              <Field label="Comentarios o necesidades adicionales">
                <textarea
                  rows={3}
                  value={form.additionalComments}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, additionalComments: event.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-2">
              <Link
                href="/admin/demo-leads"
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-1">
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-500";
