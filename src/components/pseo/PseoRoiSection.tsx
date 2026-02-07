import Reveal from "@/components/Reveal";
import RoiCalculator from "@/components/RoiCalculator";
import type { IndustryMetrics } from "@/types/pseo";

type Props = {
  metrics: IndustryMetrics;
  prepositionPhrase: string;
};

export default function PseoRoiSection({ metrics, prepositionPhrase }: Props) {
  const statCards = [
    { label: "Ahorro de tiempo", value: metrics.time_saved },
    { label: "Reducción de costos", value: metrics.cost_reduction },
    { label: "Impacto en ingresos", value: metrics.revenue_impact },
    { label: "Tasa de satisfacción", value: metrics.satisfaction_rate },
  ];

  return (
    <section className="bg-[#030712] py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2
            className="text-3xl font-[800] tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Calcula el retorno de inversión {prepositionPhrase}
          </h2>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {/* Stat cards */}
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-4">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-white/55">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-[800] text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Interactive calculator */}
          <Reveal delay={200}>
            <div className="rounded-2xl border border-white/10 bg-white p-1">
              <RoiCalculator defaultSetup={1900} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
