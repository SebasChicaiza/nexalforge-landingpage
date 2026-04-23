import type { PSEOPageData, RelatedPage } from "@/types/pseo";

export const ACTIVE_NEXI_INDUSTRY_SLUGS = [
  "barberias",
  "clinicas-medicas",
  "clinicas-odontologicas",
  "ecommerce",
  "inmobiliarias",
  "peluquerias-spas",
  "restaurantes",
] as const;

export const TEMPLATE_NEXI_INDUSTRY_SLUGS = ACTIVE_NEXI_INDUSTRY_SLUGS.filter(
  (slug) => slug !== "clinicas-odontologicas"
);

export const ACTIVE_NEXI_USE_CASES = [
  ["barberias", "agenda-whatsapp"],
  ["barberias", "reactivacion-clientes"],
  ["barberias", "recordatorios-citas"],
  ["clinicas-medicas", "agendamiento-citas"],
  ["clinicas-medicas", "recordatorios-medicacion"],
  ["clinicas-odontologicas", "agendamiento-citas"],
  ["clinicas-odontologicas", "seguimiento-postoperatorio"],
  ["ecommerce", "recuperacion-carritos-abandonados"],
  ["ecommerce", "soporte-postventa-pedidos"],
  ["inmobiliarias", "agendamiento-visitas-propiedades"],
  ["inmobiliarias", "calificacion-leads"],
  ["peluquerias-spas", "agenda-whatsapp"],
  ["peluquerias-spas", "recordatorios-citas"],
  ["peluquerias-spas", "seguimiento-post-servicio"],
  ["restaurantes", "lista-espera-mesas"],
  ["restaurantes", "pedidos-whatsapp"],
  ["restaurantes", "reservas-whatsapp"],
] as const;

type UseCasePair = readonly [string, string];

type RedirectDef = {
  source: string;
  destination: string;
};

const ACTIVE_INDUSTRY_SET = new Set<string>(ACTIVE_NEXI_INDUSTRY_SLUGS);
const ACTIVE_USE_CASE_SET = new Set<string>(
  ACTIVE_NEXI_USE_CASES.map(([industry, useCase]) => `${industry}/${useCase}`)
);

const RETIRED_PARENT_REDIRECTS: Record<string, string> = {
  "bufetes-abogados": "/nexi",
  "doctores-quito": "/nexi/clinicas-medicas",
  "pymes-ecuador": "/nexi",
  "recursos-humanos": "/nexi",
};

const RETIRED_USE_CASE_REDIRECTS: Record<string, string> = {
  "bufetes-abogados/actualizacion-estado-casos": "/nexi",
  "bufetes-abogados/ingesta-clientes": "/nexi",
  "doctores-quito/agenda-medica": "/nexi/clinicas-medicas",
  "doctores-quito/recordatorios-controles": "/nexi/clinicas-medicas",
  "doctores-quito/seguimiento-pacientes": "/nexi/clinicas-medicas",
  "pymes-ecuador/atencion-cliente": "/nexi",
  "pymes-ecuador/cobranzas-recordatorios": "/nexi",
  "pymes-ecuador/ventas-whatsapp": "/nexi",
  "recursos-humanos/coordinacion-entrevistas": "/nexi",
  "recursos-humanos/filtrado-candidatos": "/nexi",
};

export const LEGACY_WAVE_TWO_REDIRECTS: RedirectDef[] = [
  {
    source: "/soluciones",
    destination: "/nexi",
  },
  {
    source: "/soluciones/barberias",
    destination: "/nexi/barberias",
  },
  {
    source: "/soluciones/clinicas-medicas",
    destination: "/nexi/clinicas-medicas",
  },
  {
    source: "/soluciones/doctores-quito",
    destination: "/nexi/clinicas-medicas",
  },
  {
    source: "/soluciones/ecommerce",
    destination: "/nexi/ecommerce",
  },
  {
    source: "/soluciones/inmobiliarias",
    destination: "/nexi/inmobiliarias",
  },
  {
    source: "/soluciones/peluquerias-spas",
    destination: "/nexi/peluquerias-spas",
  },
  {
    source: "/soluciones/pymes-ecuador",
    destination: "/nexi",
  },
  {
    source: "/soluciones/bufetes-abogados",
    destination: "/nexi",
  },
  {
    source: "/soluciones/recursos-humanos",
    destination: "/nexi",
  },
  ...ACTIVE_NEXI_USE_CASES.map(([industry, useCase]) => ({
    source: `/soluciones/${industry}/${useCase}`,
    destination: `/nexi/${industry}/${useCase}`,
  })),
  ...Object.entries(RETIRED_USE_CASE_REDIRECTS).map(([path, destination]) => ({
    source: `/soluciones/${path}`,
    destination,
  })),
];

export function getActiveNexiIndustrySlugs(): string[] {
  return [...ACTIVE_NEXI_INDUSTRY_SLUGS];
}

export function getTemplateNexiIndustrySlugs(): string[] {
  return [...TEMPLATE_NEXI_INDUSTRY_SLUGS];
}

export function isActiveNexiIndustry(industrySlug: string): boolean {
  return ACTIVE_INDUSTRY_SET.has(industrySlug);
}

export function isActiveNexiUseCase(
  industrySlug: string,
  useCaseSlug: string
): boolean {
  return ACTIVE_USE_CASE_SET.has(`${industrySlug}/${useCaseSlug}`);
}

export function getCanonicalIndustryPath(industrySlug: string): string {
  return `/nexi/${industrySlug}`;
}

export function getCanonicalUseCasePath(
  industrySlug: string,
  useCaseSlug: string
): string {
  return `/nexi/${industrySlug}/${useCaseSlug}`;
}

export function resolveIndustryPath(industrySlug: string): string | null {
  if (isActiveNexiIndustry(industrySlug)) {
    return getCanonicalIndustryPath(industrySlug);
  }

  return RETIRED_PARENT_REDIRECTS[industrySlug] ?? null;
}

export function resolveUseCasePath(
  industrySlug: string,
  useCaseSlug: string
): string | null {
  if (isActiveNexiUseCase(industrySlug, useCaseSlug)) {
    return getCanonicalUseCasePath(industrySlug, useCaseSlug);
  }

  return RETIRED_USE_CASE_REDIRECTS[`${industrySlug}/${useCaseSlug}`] ?? null;
}

export function filterWaveTwoPages(data: PSEOPageData[]): PSEOPageData[] {
  return data.filter((entry) =>
    isActiveNexiUseCase(entry.industry_slug, entry.use_case_slug)
  );
}

export function filterWaveTwoIndustryPages(
  data: PSEOPageData[],
  industrySlug: string
): PSEOPageData[] {
  return data.filter(
    (entry) =>
      entry.industry_slug === industrySlug &&
      isActiveNexiUseCase(entry.industry_slug, entry.use_case_slug)
  );
}

export function mapRelatedPageToCanonical(
  page: RelatedPage
): (RelatedPage & { href: string }) | null {
  if (!isActiveNexiUseCase(page.industry_slug, page.use_case_slug)) {
    return null;
  }

  return {
    ...page,
    href: getCanonicalUseCasePath(page.industry_slug, page.use_case_slug),
  };
}

export function buildUseCaseStaticParams(): Array<{
  industry: string;
  "use-case": string;
}> {
  return ACTIVE_NEXI_USE_CASES.map(([industry, useCase]: UseCasePair) => ({
    industry,
    "use-case": useCase,
  }));
}
