import Reveal from "@/components/Reveal";
import type { BeforeAfterRow } from "@/types/pseo";

type Props = {
  rows: BeforeAfterRow[];
};

export default function PseoBeforeAfterSection({ rows }: Props) {
  return (
    <section className="bg-slate-100 py-20 text-slate-900">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2
            className="text-3xl font-[800] tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Antes y después de implementar Nexi
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
              <div className="p-4">Dimensión</div>
              <div className="p-4 text-red-700">Antes</div>
              <div className="p-4 text-emerald-700">Con Nexi</div>
            </div>

            {/* Rows */}
            {rows.map((row, index) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 ${index < rows.length - 1 ? "border-b border-neutral-100" : ""}`}
              >
                <div className="p-4 font-medium text-neutral-900">
                  {row.dimension}
                </div>
                <div className="p-4 text-sm text-red-800/80 bg-red-50/50">
                  {row.before}
                </div>
                <div className="p-4 text-sm text-emerald-800/90 bg-emerald-50/50 font-medium">
                  {row.after}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
