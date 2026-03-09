"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type CityRow = {
  id: number;
  nombre: string;
  _count: { solicitudes: number };
};

type CountryRow = {
  id: number;
  nombre: string;
  iso2: string;
  codigoTelefonico: string | null;
  _count: { ciudades: number };
  ciudades: CityRow[];
};

type CountryDraft = {
  nombre: string;
  iso2: string;
  codigoTelefonico: string;
};

type CityDraft = {
  nombre: string;
  paisId: string;
};

type CountriesApiResp = {
  ok: boolean;
  countries: CountryRow[];
};

export default function DemoCatalogAdminPage() {
  const [countries, setCountries] = useState<CountryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const [countryDrafts, setCountryDrafts] = useState<Record<number, CountryDraft>>({});
  const [cityDrafts, setCityDrafts] = useState<Record<number, CityDraft>>({});
  const [newCountry, setNewCountry] = useState<CountryDraft>({
    nombre: "",
    iso2: "",
    codigoTelefonico: "",
  });
  const [newCityByCountry, setNewCityByCountry] = useState<Record<number, string>>({});

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/demo-catalog/countries", { cache: "no-store" });
      const json = (await res.json()) as Partial<CountriesApiResp> & { error?: string };
      if (!res.ok || !json.ok || !Array.isArray(json.countries)) {
        throw new Error(json.error ?? "No se pudo cargar el catalogo");
      }

      const rows = json.countries;
      setCountries(rows);

      const countryDraftSeed: Record<number, CountryDraft> = {};
      const cityDraftSeed: Record<number, CityDraft> = {};
      for (const country of rows) {
        countryDraftSeed[country.id] = {
          nombre: country.nombre,
          iso2: country.iso2,
          codigoTelefonico: country.codigoTelefonico ?? "",
        };
        for (const city of country.ciudades) {
          cityDraftSeed[city.id] = {
            nombre: city.nombre,
            paisId: String(country.id),
          };
        }
      }
      setCountryDrafts(countryDraftSeed);
      setCityDrafts(cityDraftSeed);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo cargar";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const countryOptions = useMemo(
    () => countries.map((country) => ({ value: String(country.id), label: country.nombre })),
    [countries]
  );

  async function createCountry() {
    if (!newCountry.nombre.trim() || !newCountry.iso2.trim()) return;
    setSaving("create-country");
    setError(null);
    try {
      const res = await fetch("/api/demo-catalog/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: newCountry.nombre,
          iso2: newCountry.iso2.toUpperCase(),
          codigoTelefonico: newCountry.codigoTelefonico,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "No se pudo crear");

      setNewCountry({ nombre: "", iso2: "", codigoTelefonico: "" });
      await load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo crear";
      setError(message);
    } finally {
      setSaving(null);
    }
  }

  async function saveCountry(countryId: number) {
    const draft = countryDrafts[countryId];
    if (!draft) return;
    setSaving(`country-${countryId}`);
    setError(null);
    try {
      const res = await fetch(`/api/demo-catalog/countries/${countryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: draft.nombre,
          iso2: draft.iso2.toUpperCase(),
          codigoTelefonico: draft.codigoTelefonico,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "No se pudo actualizar");
      await load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo actualizar";
      setError(message);
    } finally {
      setSaving(null);
    }
  }

  async function deleteCountry(countryId: number) {
    if (!confirm("Quieres eliminar este pais?")) return;
    setSaving(`delete-country-${countryId}`);
    setError(null);
    try {
      const res = await fetch(`/api/demo-catalog/countries/${countryId}`, {
        method: "DELETE",
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "No se pudo eliminar");
      await load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo eliminar";
      setError(message);
    } finally {
      setSaving(null);
    }
  }

  async function createCity(countryId: number) {
    const cityName = (newCityByCountry[countryId] ?? "").trim();
    if (!cityName) return;
    setSaving(`create-city-${countryId}`);
    setError(null);
    try {
      const res = await fetch("/api/demo-catalog/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paisId: countryId, nombre: cityName }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "No se pudo crear");

      setNewCityByCountry((prev) => ({ ...prev, [countryId]: "" }));
      await load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo crear";
      setError(message);
    } finally {
      setSaving(null);
    }
  }

  async function saveCity(cityId: number) {
    const draft = cityDrafts[cityId];
    if (!draft) return;
    setSaving(`city-${cityId}`);
    setError(null);
    try {
      const res = await fetch(`/api/demo-catalog/cities/${cityId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: draft.nombre,
          paisId: Number(draft.paisId),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "No se pudo actualizar");
      await load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo actualizar";
      setError(message);
    } finally {
      setSaving(null);
    }
  }

  async function deleteCity(cityId: number) {
    if (!confirm("Quieres eliminar esta ciudad?")) return;
    setSaving(`delete-city-${cityId}`);
    setError(null);
    try {
      const res = await fetch(`/api/demo-catalog/cities/${cityId}`, {
        method: "DELETE",
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "No se pudo eliminar");
      await load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo eliminar";
      setError(message);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Catalogo de paises y ciudades
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Estos datos se usan directamente en el formulario de /demo-1.
            </p>
          </div>
          <Link
            href="/admin/demo-leads"
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            Volver a solicitudes
          </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-neutral-900">Agregar pais</h2>
        <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
          <input
            value={newCountry.nombre}
            onChange={(event) =>
              setNewCountry((prev) => ({ ...prev, nombre: event.target.value }))
            }
            className={inputClass}
            placeholder="Nombre del pais"
          />
          <input
            value={newCountry.iso2}
            onChange={(event) =>
              setNewCountry((prev) => ({ ...prev, iso2: event.target.value.toUpperCase() }))
            }
            className={inputClass}
            placeholder="ISO2 (EC)"
            maxLength={2}
          />
          <input
            value={newCountry.codigoTelefonico}
            onChange={(event) =>
              setNewCountry((prev) => ({ ...prev, codigoTelefonico: event.target.value }))
            }
            className={inputClass}
            placeholder="+593"
          />
          <button
            type="button"
            onClick={createCountry}
            disabled={saving === "create-country"}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            Agregar
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-200" />
          <div className="mt-3 h-20 animate-pulse rounded bg-neutral-100" />
        </div>
      ) : (
        <div className="space-y-5">
          {countries.map((country) => {
            const draft = countryDrafts[country.id];
            return (
              <div key={country.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto_auto]">
                    <input
                      value={draft?.nombre ?? ""}
                      onChange={(event) =>
                        setCountryDrafts((prev) => ({
                          ...prev,
                          [country.id]: {
                            ...(prev[country.id] ?? {
                              nombre: country.nombre,
                              iso2: country.iso2,
                              codigoTelefonico: country.codigoTelefonico ?? "",
                            }),
                            nombre: event.target.value,
                          },
                        }))
                      }
                      className={inputClass}
                    />
                    <input
                      value={draft?.iso2 ?? ""}
                      onChange={(event) =>
                        setCountryDrafts((prev) => ({
                          ...prev,
                          [country.id]: {
                            ...(prev[country.id] ?? {
                              nombre: country.nombre,
                              iso2: country.iso2,
                              codigoTelefonico: country.codigoTelefonico ?? "",
                            }),
                            iso2: event.target.value.toUpperCase(),
                          },
                        }))
                      }
                      maxLength={2}
                      className={inputClass}
                    />
                    <input
                      value={draft?.codigoTelefonico ?? ""}
                      onChange={(event) =>
                        setCountryDrafts((prev) => ({
                          ...prev,
                          [country.id]: {
                            ...(prev[country.id] ?? {
                              nombre: country.nombre,
                              iso2: country.iso2,
                              codigoTelefonico: country.codigoTelefonico ?? "",
                            }),
                            codigoTelefonico: event.target.value,
                          },
                        }))
                      }
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => saveCountry(country.id)}
                      disabled={saving === `country-${country.id}`}
                      className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                    >
                      Guardar pais
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCountry(country.id)}
                      disabled={saving === `delete-country-${country.id}`}
                      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-700 disabled:opacity-60"
                    >
                      Eliminar pais
                    </button>
                  </div>

                  <div className="mt-4 rounded-xl border border-neutral-200 p-3">
                    <div className="mb-3 text-sm font-medium text-neutral-700">
                      Ciudades ({country._count.ciudades})
                    </div>

                    <div className="space-y-2">
                      {country.ciudades.map((city) => {
                        const draftCity = cityDrafts[city.id] ?? {
                          nombre: city.nombre,
                          paisId: String(country.id),
                        };
                        return (
                          <div
                            key={city.id}
                            className="grid gap-2 md:grid-cols-[2fr_1fr_auto_auto_auto]"
                          >
                            <input
                              value={draftCity.nombre}
                              onChange={(event) =>
                                setCityDrafts((prev) => ({
                                  ...prev,
                                  [city.id]: {
                                    ...draftCity,
                                    nombre: event.target.value,
                                  },
                                }))
                              }
                              className={inputClass}
                            />
                            <select
                              value={draftCity.paisId}
                              onChange={(event) =>
                                setCityDrafts((prev) => ({
                                  ...prev,
                                  [city.id]: {
                                    ...draftCity,
                                    paisId: event.target.value,
                                  },
                                }))
                              }
                              className={inputClass}
                            >
                              {countryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className="rounded-xl border border-neutral-200 px-3 py-2 text-xs text-neutral-600">
                              Leads: {city._count.solicitudes}
                            </div>
                            <button
                              type="button"
                              onClick={() => saveCity(city.id)}
                              disabled={saving === `city-${city.id}`}
                              className="rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-700 disabled:opacity-60"
                            >
                              Guardar
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCity(city.id)}
                              disabled={saving === `delete-city-${city.id}`}
                              className="rounded-xl border border-red-200 px-3 py-2 text-sm text-red-700 disabled:opacity-60"
                            >
                              Eliminar
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 grid gap-2 md:grid-cols-[2fr_auto]">
                      <input
                        value={newCityByCountry[country.id] ?? ""}
                        onChange={(event) =>
                          setNewCityByCountry((prev) => ({
                            ...prev,
                            [country.id]: event.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder="Nueva ciudad"
                      />
                      <button
                        type="button"
                        onClick={() => createCity(country.id)}
                        disabled={saving === `create-city-${country.id}`}
                        className="rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-700 disabled:opacity-60"
                      >
                        Agregar ciudad
                      </button>
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-500";
