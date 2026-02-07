import type { IndustryGrammar, UseCaseGrammar } from "@/types/pseo";

const INDUSTRY_GRAMMAR: Record<string, IndustryGrammar> = {
  "clinicas-medicas": {
    display_name: "Clínicas Médicas",
    gender: "f",
    number: "p",
    article_def: "las",
    preposition_phrase: "para clínicas médicas",
  },
  "clinicas-odontologicas": {
    display_name: "Clínicas Odontológicas",
    gender: "f",
    number: "p",
    article_def: "las",
    preposition_phrase: "para clínicas odontológicas",
  },
  inmobiliarias: {
    display_name: "Inmobiliarias",
    gender: "f",
    number: "p",
    article_def: "las",
    preposition_phrase: "para inmobiliarias",
  },
  "bufetes-abogados": {
    display_name: "Bufetes de Abogados",
    gender: "m",
    number: "p",
    article_def: "los",
    preposition_phrase: "para bufetes de abogados",
  },
  ecommerce: {
    display_name: "E-commerce",
    gender: "m",
    number: "s",
    article_def: "el",
    preposition_phrase: "para e-commerce",
  },
  "recursos-humanos": {
    display_name: "Recursos Humanos",
    gender: "m",
    number: "p",
    article_def: "los",
    preposition_phrase: "para recursos humanos",
  },
  "peluquerias-spas": {
    display_name: "Peluquerías y Spas",
    gender: "f",
    number: "p",
    article_def: "las",
    preposition_phrase: "para peluquerías y spas",
  },
  barberias: {
    display_name: "Barberías",
    gender: "f",
    number: "p",
    article_def: "las",
    preposition_phrase: "para barberías",
  },
  restaurantes: {
    display_name: "Restaurantes",
    gender: "m",
    number: "p",
    article_def: "los",
    preposition_phrase: "para restaurantes",
  },
  "doctores-quito": {
    display_name: "Doctores en Quito",
    gender: "m",
    number: "p",
    article_def: "los",
    preposition_phrase: "para doctores en Quito",
  },
  "pymes-ecuador": {
    display_name: "PYMEs en Ecuador",
    gender: "f",
    number: "p",
    article_def: "las",
    preposition_phrase: "para PYMEs en Ecuador",
  },
};

const USE_CASE_GRAMMAR: Record<string, UseCaseGrammar> = {
  "agendamiento-citas": {
    display_name: "Agendamiento de Citas",
    gender: "m",
    number: "s",
    article_def: "el",
  },
  "calificacion-leads": {
    display_name: "Calificación de Leads",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "ingesta-clientes": {
    display_name: "Ingesta de Clientes",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "actualizacion-estado-casos": {
    display_name: "Actualización de Estado de Casos",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "recuperacion-carritos-abandonados": {
    display_name: "Recuperación de Carritos Abandonados",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "soporte-postventa-pedidos": {
    display_name: "Soporte Postventa de Pedidos",
    gender: "m",
    number: "s",
    article_def: "el",
  },
  "filtrado-candidatos": {
    display_name: "Filtrado de Candidatos",
    gender: "m",
    number: "s",
    article_def: "el",
  },
  "coordinacion-entrevistas": {
    display_name: "Coordinación de Entrevistas",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "seguimiento-postoperatorio": {
    display_name: "Seguimiento Postoperatorio",
    gender: "m",
    number: "s",
    article_def: "el",
  },
  "recordatorios-medicacion": {
    display_name: "Recordatorios de Medicación",
    gender: "m",
    number: "p",
    article_def: "los",
  },
  "agendamiento-visitas-propiedades": {
    display_name: "Agendamiento de Visitas a Propiedades",
    gender: "m",
    number: "s",
    article_def: "el",
  },
  "agenda-whatsapp": {
    display_name: "Agenda por WhatsApp",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "recordatorios-citas": {
    display_name: "Recordatorios de Citas",
    gender: "m",
    number: "p",
    article_def: "los",
  },
  "seguimiento-post-servicio": {
    display_name: "Seguimiento Post Servicio",
    gender: "m",
    number: "s",
    article_def: "el",
  },
  "reactivacion-clientes": {
    display_name: "Reactivación de Clientes",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "reservas-whatsapp": {
    display_name: "Reservas por WhatsApp",
    gender: "f",
    number: "p",
    article_def: "las",
  },
  "pedidos-whatsapp": {
    display_name: "Pedidos por WhatsApp",
    gender: "m",
    number: "p",
    article_def: "los",
  },
  "lista-espera-mesas": {
    display_name: "Lista de Espera de Mesas",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "agenda-medica": {
    display_name: "Agenda Médica",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "recordatorios-controles": {
    display_name: "Recordatorios de Controles",
    gender: "m",
    number: "p",
    article_def: "los",
  },
  "seguimiento-pacientes": {
    display_name: "Seguimiento de Pacientes",
    gender: "m",
    number: "s",
    article_def: "el",
  },
  "atencion-cliente": {
    display_name: "Atención al Cliente",
    gender: "f",
    number: "s",
    article_def: "la",
  },
  "ventas-whatsapp": {
    display_name: "Ventas por WhatsApp",
    gender: "f",
    number: "p",
    article_def: "las",
  },
  "cobranzas-recordatorios": {
    display_name: "Cobranzas y Recordatorios",
    gender: "f",
    number: "p",
    article_def: "las",
  },
};

const POSSESSIVE_MAP: Record<string, string> = {
  "clinicas-medicas": "de tu clínica",
  "clinicas-odontologicas": "de tu clínica dental",
  inmobiliarias: "de tu inmobiliaria",
  "bufetes-abogados": "de tu bufete",
  ecommerce: "de tu tienda online",
  "recursos-humanos": "de tu equipo de RRHH",
  "peluquerias-spas": "de tu peluquería",
  barberias: "de tu barbería",
  restaurantes: "de tu restaurante",
  "doctores-quito": "de tu consultorio",
  "pymes-ecuador": "de tu empresa",
};

export function getIndustryName(slug: string): string {
  return INDUSTRY_GRAMMAR[slug]?.display_name ?? slug;
}

export function getUseCaseName(slug: string): string {
  return USE_CASE_GRAMMAR[slug]?.display_name ?? slug;
}

export function getIndustryGrammar(slug: string): IndustryGrammar {
  return (
    INDUSTRY_GRAMMAR[slug] ?? {
      display_name: slug,
      gender: "m" as const,
      number: "s" as const,
      article_def: "el",
      preposition_phrase: `para ${slug}`,
    }
  );
}

export function getUseCaseGrammar(slug: string): UseCaseGrammar {
  return (
    USE_CASE_GRAMMAR[slug] ?? {
      display_name: slug,
      gender: "m" as const,
      number: "s" as const,
      article_def: "el",
    }
  );
}

export function buildPageHeading(
  industrySlug: string,
  useCaseSlug: string
): string {
  const useCase = getUseCaseName(useCaseSlug);
  const industry = getIndustryGrammar(industrySlug);
  return `${useCase} ${industry.preposition_phrase}`;
}

export function buildPossessive(industrySlug: string): string {
  return POSSESSIVE_MAP[industrySlug] ?? `de tu negocio`;
}

export function getCtaTexts(industrySlug: string): {
  demoPrimary: string;
  whatsapp: string;
} {
  const possessive = buildPossessive(industrySlug);
  return {
    demoPrimary: `Solicitar diagnóstico ${possessive}`,
    whatsapp: "Escríbenos por WhatsApp",
  };
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(INDUSTRY_GRAMMAR);
}
