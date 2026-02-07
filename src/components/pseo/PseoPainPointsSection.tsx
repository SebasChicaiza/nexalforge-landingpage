import Reveal from "@/components/Reveal";
import { AlertTriangle } from "lucide-react";

type Props = {
  painPoints: string[];
  prepositionPhrase: string;
};

export default function PseoPainPointsSection({
  painPoints,
  prepositionPhrase,
}: Props) {
  return (
    <section className="bg-[#070A10] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2
            className="text-3xl font-[800] tracking-tight text-white md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Problemas que Nexi resuelve {prepositionPhrase}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {painPoints.map((point, index) => (
            <Reveal key={point} delay={index * 100}>
              <article className="group relative rounded-2xl border border-red-500/20 bg-red-950/20 p-6 transition-all duration-300 hover:border-red-400/40 hover:bg-red-950/30">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/25 bg-red-950/50 text-red-300">
                    <AlertTriangle className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-red-300/70">
                    Problema {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{point}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
