import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { RelatedPage } from "@/types/pseo";
import { getIndustryName, getUseCaseName } from "@/lib/spanish-grammar";

type Props = {
  relatedPages: RelatedPage[];
  demoCtaUrl: string;
  whatsappCtaUrl: string;
  ctaPrimaryText: string;
  ctaWhatsappText: string;
  prepositionPhrase: string;
};

export default function PseoRelatedSection({
  relatedPages,
  demoCtaUrl,
  whatsappCtaUrl,
  ctaPrimaryText,
  ctaWhatsappText,
  prepositionPhrase,
}: Props) {
  return (
    <section className="bg-[#030712] py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Related solutions */}
        <Reveal>
          <h2
            className="text-3xl font-[800] tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Soluciones relacionadas
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPages.map((page, index) => {
            const industryName = getIndustryName(page.industry_slug);
            const useCaseName = getUseCaseName(page.use_case_slug);

            return (
              <Reveal key={`${page.industry_slug}-${page.use_case_slug}`} delay={index * 80}>
                <Link
                  href={`/soluciones/${page.industry_slug}/${page.use_case_slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#B84550]/60 hover:bg-[#8B1E2D]/10"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-[#E9B7BD]">
                    {industryName}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {useCaseName}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    {page.link_text}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-[#F4C5CB] group-hover:text-white">
                    Ver solución →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal delay={200}>
          <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-[#8B1E2D]/20 to-[#8B1E2D]/5 p-8 text-center md:p-12">
            <h2
              className="text-3xl font-[800] tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Activa Nexi {prepositionPhrase}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
              Tu equipo atiende mejor, tus clientes esperan menos y tu
              operación se optimiza con menos fricción.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={demoCtaUrl}
                className="inline-flex items-center rounded-full bg-[#8B1E2D] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#761927]"
              >
                {ctaPrimaryText}
              </a>
              <a
                href={whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#25D366]/55 bg-[#25D366]/15 px-5 py-3 text-sm font-semibold text-[#C6FFD9] transition hover:scale-[1.02] hover:border-[#25D366]/75 hover:bg-[#25D366]/25"
              >
                {ctaWhatsappText}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
