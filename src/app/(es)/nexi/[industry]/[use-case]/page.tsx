import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import pseoDataRaw from "@/data/pSEO.json";
import type { PSEOPageData } from "@/types/pseo";
import {
  buildBreadcrumbSchema,
  buildFAQPageSchema,
  buildServiceSchema,
  buildSoftwareApplicationSchema,
} from "@/lib/pseo-schemas";
import {
  buildUseCaseStaticParams,
  getCanonicalIndustryPath,
  getCanonicalUseCasePath,
  isActiveNexiUseCase,
} from "@/lib/pseo-routing";

import PseoBreadcrumb from "@/components/pseo/PseoBreadcrumb";
import PseoHeroSection from "@/components/pseo/PseoHeroSection";
import PseoPainPointsSection from "@/components/pseo/PseoPainPointsSection";
import PseoBeforeAfterSection from "@/components/pseo/PseoBeforeAfterSection";
import PseoRoiSection from "@/components/pseo/PseoRoiSection";
import PseoHowItWorksSection from "@/components/pseo/PseoHowItWorksSection";
import PseoFaqSection from "@/components/pseo/PseoFaqSection";
import PseoRelatedSection from "@/components/pseo/PseoRelatedSection";
import PseoMobileStickyCta from "@/components/pseo/PseoMobileStickyCta";

type SolutionPageParams = {
  industry: string;
  "use-case": string;
};

type ChatMessage = {
  role: "Cliente" | "Nexi";
  text: string;
};

const pseoData: PSEOPageData[] = pseoDataRaw as PSEOPageData[];
const DEMO_CTA_URL = "/#contacto";
const WHATSAPP_CTA_URL =
  "https://wa.me/593963305344?text=Hola,%20quisiera%20información%20sobre%20Nexi";
const LOCAL_TRUST_SIGNALS = [
  "Soporte nativo en español",
  "Integración oficial con WhatsApp",
  "Facturación local (Ecuador)",
] as const;

function findPageData(params: SolutionPageParams): PSEOPageData | undefined {
  if (!isActiveNexiUseCase(params.industry, params["use-case"])) {
    return undefined;
  }

  return pseoData.find(
    (item) =>
      item.industry_slug === params.industry &&
      item.use_case_slug === params["use-case"]
  );
}

function shortenCopy(text: string, maxLength = 92): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export async function generateStaticParams(): Promise<SolutionPageParams[]> {
  return buildUseCaseStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SolutionPageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const pageData = findPageData(resolvedParams);

  if (!pageData) {
    return {
      title: "Nexi | Nexal Forge",
      description: "Explora soluciones de automatización y agentes IA para empresas.",
    };
  }

  const canonicalPath = getCanonicalUseCasePath(
    pageData.industry_slug,
    pageData.use_case_slug
  );
  const industryName = pageData.industry_grammar.display_name;
  const useCaseName = pageData.use_case_grammar.display_name;

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `https://nexalforge.com${canonicalPath}`,
      type: "website",
      locale: "es_419",
    },
    twitter: {
      card: "summary_large_image",
      title: `${useCaseName} para ${industryName} | Nexi`,
      description: pageData.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PseoSolutionPage({
  params,
}: {
  params: Promise<SolutionPageParams>;
}) {
  const resolvedParams = await params;
  const pageData = findPageData(resolvedParams);

  if (!pageData) {
    notFound();
  }

  const industryName = pageData.industry_grammar.display_name;
  const useCaseName = pageData.use_case_grammar.display_name;
  const prepositionPhrase = pageData.industry_grammar.preposition_phrase;

  const chatMessages: ChatMessage[] = [
    {
      role: "Cliente",
      text: shortenCopy(
        pageData.pain_points[0] ??
          `Necesito ayuda urgente con ${useCaseName.toLowerCase()}.`
      ),
    },
    {
      role: "Nexi",
      text: shortenCopy(
        pageData.benefits[0] ??
          `Perfecto, te ayudo con ${useCaseName.toLowerCase()} ahora mismo.`
      ),
    },
    {
      role: "Cliente",
      text: shortenCopy(
        pageData.pain_points[1] ?? "No quiero esperar a que abra recepción."
      ),
    },
    {
      role: "Nexi",
      text: shortenCopy(
        pageData.benefits[1] ??
          "Listo. Te confirmo en segundos y dejamos tu reserva asegurada."
      ),
    },
  ];

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Nexi", href: "/nexi" },
    {
      label: industryName,
      href: getCanonicalIndustryPath(pageData.industry_slug),
    },
    {
      label: useCaseName,
      href: getCanonicalUseCasePath(
        pageData.industry_slug,
        pageData.use_case_slug
      ),
    },
  ];

  return (
    <>
      <JsonLd
        id={`software-${pageData.industry_slug}-${pageData.use_case_slug}`}
        schema={buildSoftwareApplicationSchema(pageData)}
      />
      <JsonLd
        id={`faq-${pageData.industry_slug}-${pageData.use_case_slug}`}
        schema={buildFAQPageSchema(pageData.faqs)}
      />
      <JsonLd
        id={`service-${pageData.industry_slug}-${pageData.use_case_slug}`}
        schema={buildServiceSchema(pageData)}
      />
      <JsonLd
        id={`breadcrumb-${pageData.industry_slug}-${pageData.use_case_slug}`}
        schema={buildBreadcrumbSchema(
          pageData.industry_slug,
          industryName,
          useCaseName,
          pageData.use_case_slug
        )}
      />

      <main className="relative z-10 overflow-hidden bg-slate-950 pb-36 text-white md:pb-0">
        <PseoBreadcrumb items={breadcrumbItems} />

        <PseoHeroSection
          industryName={industryName}
          useCaseName={useCaseName}
          heroTitle={pageData.hero_title}
          heroSubtitle={pageData.hero_subtitle}
          chatMessages={chatMessages}
          benefit={pageData.benefits[0] ?? "Más reservas confirmadas cada semana"}
          demoCtaUrl={DEMO_CTA_URL}
          whatsappCtaUrl={WHATSAPP_CTA_URL}
          ctaPrimaryText={pageData.cta_primary_text}
          ctaWhatsappText={pageData.cta_whatsapp_text}
          localTrustSignals={LOCAL_TRUST_SIGNALS}
        />

        <PseoPainPointsSection
          painPoints={pageData.pain_points}
          prepositionPhrase={prepositionPhrase}
        />

        <PseoBeforeAfterSection rows={pageData.before_after} />

        <PseoRoiSection
          metrics={pageData.metrics}
          prepositionPhrase={prepositionPhrase}
        />

        <PseoHowItWorksSection
          steps={pageData.how_it_works}
          prepositionPhrase={prepositionPhrase}
        />

        <PseoFaqSection
          faqs={pageData.faqs}
          useCaseName={useCaseName.toLowerCase()}
        />

        <PseoRelatedSection
          relatedPages={pageData.related_pages}
          demoCtaUrl={DEMO_CTA_URL}
          whatsappCtaUrl={WHATSAPP_CTA_URL}
          ctaPrimaryText={pageData.cta_primary_text}
          ctaWhatsappText={pageData.cta_whatsapp_text}
          prepositionPhrase={prepositionPhrase}
        />
      </main>

      <PseoMobileStickyCta
        demoCtaUrl={DEMO_CTA_URL}
        whatsappCtaUrl={WHATSAPP_CTA_URL}
        ctaPrimaryText={pageData.cta_primary_text}
        ctaWhatsappText={pageData.cta_whatsapp_text}
      />
    </>
  );
}
