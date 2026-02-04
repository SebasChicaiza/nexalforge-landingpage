import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import pseoDataRaw from "@/data/pSEO.json";
import type { PSEOPageData } from "@/types/pseo";
import { PseoSolutionExperience } from "./PseoSolutionExperience";

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
  "✅ Soporte nativo en español",
  "✅ Integración oficial con WhatsApp",
  "✅ Facturación local (Ecuador)",
] as const;

function findPageData(params: SolutionPageParams): PSEOPageData | undefined {
  return pseoData.find(
    (item) =>
      item.industry_slug === params.industry &&
      item.use_case_slug === params["use-case"]
  );
}

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join(" ");
}

function shortenCopy(text: string, maxLength = 92): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export async function generateStaticParams(): Promise<SolutionPageParams[]> {
  return pseoData.map((item) => ({
    industry: item.industry_slug,
    "use-case": item.use_case_slug,
  }));
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
      title: "Soluciones con IA | Nexal Forge",
      description:
        "Explora soluciones de automatización y agentes IA para empresas.",
    };
  }

  const canonicalPath = `/soluciones/${pageData.industry_slug}/${pageData.use_case_slug}`;

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `https://www.nexalforge.com${canonicalPath}`,
      type: "website",
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

  const industryName = slugToTitle(pageData.industry_slug);
  const useCaseName = slugToTitle(pageData.use_case_slug);
  const canonicalPath = `/soluciones/${pageData.industry_slug}/${pageData.use_case_slug}`;

  const mockChatMessages: ChatMessage[] = [
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

  return (
    <>
      <JsonLd
        id={`nexi-software-${pageData.industry_slug}-${pageData.use_case_slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: `Nexi para ${industryName}`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: pageData.description,
          url: `https://www.nexalforge.com${canonicalPath}`,
          featureList: pageData.benefits,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            description: `Diagnóstico para ${useCaseName} en ${industryName}`,
          },
          provider: {
            "@type": "Organization",
            name: "Nexal Forge",
            url: "https://www.nexalforge.com",
          },
        }}
      />

      <PseoSolutionExperience
        industryName={industryName}
        useCaseName={useCaseName}
        heroTitle={pageData.hero_title}
        heroSubtitle={pageData.hero_subtitle}
        chatMessages={mockChatMessages}
        benefits={pageData.benefits}
        demoCtaUrl={DEMO_CTA_URL}
        whatsappCtaUrl={WHATSAPP_CTA_URL}
        localTrustSignals={LOCAL_TRUST_SIGNALS}
      />
    </>
  );
}
