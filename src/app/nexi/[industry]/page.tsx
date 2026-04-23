import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import pseoDataRaw from "@/data/pSEO.json";
import type { PSEOPageData } from "@/types/pseo";
import { getIndustryName, getUseCaseName } from "@/lib/spanish-grammar";
import {
  filterWaveTwoIndustryPages,
  getCanonicalIndustryPath,
  getCanonicalUseCasePath,
  getTemplateNexiIndustrySlugs,
} from "@/lib/pseo-routing";

const pseoData: PSEOPageData[] = pseoDataRaw as PSEOPageData[];

type IndustryPageParams = {
  industry: string;
};

function getIndustryPages(industrySlug: string): PSEOPageData[] {
  return filterWaveTwoIndustryPages(pseoData, industrySlug);
}

export async function generateStaticParams(): Promise<IndustryPageParams[]> {
  return getTemplateNexiIndustrySlugs().map((industry) => ({ industry }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<IndustryPageParams>;
}): Promise<Metadata> {
  const { industry } = await params;
  const pages = getIndustryPages(industry);

  if (pages.length === 0) {
    return { title: "Nexi | Nexal Forge" };
  }

  const industryName = getIndustryName(industry);
  const canonicalPath = getCanonicalIndustryPath(industry);

  return {
    title: `Nexi para ${industryName} | Nexal Forge`,
    description: `Descubre cómo Nexi automatiza operaciones clave para ${industryName.toLowerCase()}: ${pages
      .map((page) => getUseCaseName(page.use_case_slug).toLowerCase())
      .join(", ")}.`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `Nexi para ${industryName} | Nexal Forge`,
      description: `Automatización inteligente para ${industryName.toLowerCase()} con Nexi.`,
      url: `https://nexalforge.com${canonicalPath}`,
      type: "website",
    },
  };
}

export default async function IndustryIndexPage({
  params,
}: {
  params: Promise<IndustryPageParams>;
}) {
  const { industry } = await params;
  const pages = getIndustryPages(industry);

  if (pages.length === 0) {
    notFound();
  }

  const industryName = getIndustryName(industry);

  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-24 md:pt-28">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1 text-xs text-white/60">
            <li>
              <Link href="/" className="hover:text-white/90 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <span className="mx-1 text-white/30">/</span>
              <Link
                href="/nexi"
                className="hover:text-white/90 transition-colors"
              >
                Nexi
              </Link>
            </li>
            <li>
              <span className="mx-1 text-white/30">/</span>
              <span className="font-medium text-white/90">{industryName}</span>
            </li>
          </ol>
        </nav>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#DFA4AB]">
          {industryName}
        </p>
        <h1
          className="max-w-4xl text-4xl font-[800] leading-[1.05] tracking-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Nexi para {industryName}
        </h1>
        <p className="mt-5 max-w-3xl text-white/80 md:text-lg">
          Explora los casos de uso que Nexi resuelve para{" "}
          {industryName.toLowerCase()}. Cada solución se adapta a tu operación
          real.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => {
            const useCaseName = getUseCaseName(page.use_case_slug);

            return (
              <Link
                key={page.use_case_slug}
                href={getCanonicalUseCasePath(
                  page.industry_slug,
                  page.use_case_slug
                )}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#B84550]/60 hover:bg-[#8B1E2D]/10"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-[#E9B7BD]">
                  {industryName}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  {useCaseName}
                </h2>
                <p className="mt-2 text-sm text-white/75">
                  {page.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[#F4C5CB] group-hover:text-white">
                  Ver solución →
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
