import type { PSEOPageData, FaqItem } from "@/types/pseo";

const BASE_URL = "https://www.nexalforge.com";

export function buildSoftwareApplicationSchema(data: PSEOPageData) {
  const industryName = data.industry_grammar.display_name;
  const useCaseName = data.use_case_grammar.display_name;
  const canonicalPath = `/soluciones/${data.industry_slug}/${data.use_case_slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Nexi — ${useCaseName} ${data.industry_grammar.preposition_phrase}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: data.description,
    url: `${BASE_URL}${canonicalPath}`,
    featureList: data.benefits,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: `Diagnóstico gratuito de ${useCaseName} ${data.industry_grammar.preposition_phrase}`,
    },
    provider: {
      "@type": "Organization",
      name: "Nexal Forge",
      url: BASE_URL,
    },
    applicationSubCategory: `${useCaseName} para ${industryName}`,
    inLanguage: "es",
  };
}

export function buildFAQPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema(data: PSEOPageData) {
  const useCaseName = data.use_case_grammar.display_name;
  const canonicalPath = `/soluciones/${data.industry_slug}/${data.use_case_slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${useCaseName} con IA — Nexi`,
    description: data.description,
    url: `${BASE_URL}${canonicalPath}`,
    provider: {
      "@type": "Organization",
      name: "Nexal Forge",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Latinoamérica",
    },
    serviceType: `Automatización de ${useCaseName}`,
    inLanguage: "es",
  };
}

export function buildBreadcrumbSchema(
  industrySlug: string,
  industryName: string,
  useCaseName: string,
  useCaseSlug: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Soluciones",
        item: `${BASE_URL}/soluciones`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: industryName,
        item: `${BASE_URL}/soluciones/${industrySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: useCaseName,
        item: `${BASE_URL}/soluciones/${industrySlug}/${useCaseSlug}`,
      },
    ],
  };
}
