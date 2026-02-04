import type { Metadata } from "next";
import Link from "next/link";
import pseoDataRaw from "@/data/pSEO.json";
import type { PSEOPageData } from "@/types/pseo";

export const metadata: Metadata = {
  title: "Soluciones de IA por Industria - Nexi",
};

const pseoData: PSEOPageData[] = pseoDataRaw as PSEOPageData[];

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join(" ");
}

type IndustrySection = {
  industrySlug: string;
  industryName: string;
  pages: PSEOPageData[];
};

function buildIndustrySections(data: PSEOPageData[]): IndustrySection[] {
  const grouped = data.reduce((acc, entry) => {
    const industryMap = acc.get(entry.industry_slug) ?? new Map<string, PSEOPageData>();
    industryMap.set(entry.use_case_slug, entry);
    acc.set(entry.industry_slug, industryMap);
    return acc;
  }, new Map<string, Map<string, PSEOPageData>>());

  return Array.from(grouped.entries())
    .map(([industrySlug, useCaseMap]) => ({
      industrySlug,
      industryName: slugToTitle(industrySlug),
      pages: Array.from(useCaseMap.values()).sort((a, b) =>
        slugToTitle(a.use_case_slug).localeCompare(slugToTitle(b.use_case_slug), "es")
      ),
    }))
    .sort((a, b) => a.industryName.localeCompare(b.industryName, "es"));
}

const industrySections = buildIndustrySections(pseoData);

export default function SolucionesPage() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-24 md:pt-28">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#DFA4AB]">
          Directorio de soluciones
        </p>
        <h1
          className="max-w-4xl text-4xl font-[800] leading-[1.05] tracking-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Soluciones de IA por industria
        </h1>
        <p className="mt-5 max-w-3xl text-white/80 md:text-lg">
          Encuentra la solucion por industria y caso de uso para desplegar Nexi con
          objetivos operativos concretos.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="space-y-10">
          {industrySections.map((section) => (
            <div key={section.industrySlug}>
              <h2 className="mb-4 text-2xl font-semibold text-white">{section.industryName}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.pages.map((page) => {
                  const useCaseName = slugToTitle(page.use_case_slug);

                  return (
                    <Link
                      key={`${page.industry_slug}-${page.use_case_slug}`}
                      href={`/soluciones/${page.industry_slug}/${page.use_case_slug}`}
                      className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#B84550]/60 hover:bg-[#8B1E2D]/10"
                    >
                      <p className="text-xs uppercase tracking-[0.14em] text-[#E9B7BD]">
                        {section.industryName}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{useCaseName}</h3>
                      <p className="mt-2 text-sm text-white/75">{page.description}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-[#F4C5CB] group-hover:text-white">
                        Ver solucion {"->"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
