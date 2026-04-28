import { Wrench, Gauge, Check } from "lucide-react";

const SETUP_INCLUDED: string[] = [
  "Nexi's own calendar and booking system",
  "Service catalog and pricing setup",
  "Brand voice and FAQ configuration",
  "Standard channels (web chat, Instagram DM, WhatsApp, SMS)",
];

const SETUP_EXTRA: string[] = [
  "Connecting to an external calendar (Fresha, Vagaro, GlossGenius, Square, Mindbody, Boulevard, etc.)",
  "Custom CRM or POS integrations",
  "Custom routing or escalation logic",
  "Multi-location data migration",
];

const USAGE_ROWS: { plan: string; included: string }[] = [
  { plan: "Starter", included: "500 / mo" },
  { plan: "Growth", included: "1,500 / mo" },
  { plan: "Pro", included: "3,000 / mo" },
  { plan: "Custom", included: "Custom" },
];

export default function SetupAndUsage() {
  return (
    <section className="relative bg-[#0D0D0D] pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Setup fees */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/85">
                <Wrench className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Setup
              </h3>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
              Setup depends on your business needs. Nexi ships with its own
              calendar and booking system, so most teams can launch with{" "}
              <span className="text-white/85 font-medium">no setup fee</span>.
              A setup fee may apply when we connect Nexi to external systems
              you already use.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200/90">
                  Included · No setup fee
                </p>
                <ul className="mt-3 space-y-2">
                  {SETUP_INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12.5px] leading-snug text-white/80"
                    >
                      <span className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/10 text-emerald-200">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-200/90">
                  Setup fee may apply
                </p>
                <ul className="mt-3 space-y-2">
                  {SETUP_EXTRA.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12.5px] leading-snug text-white/80"
                    >
                      <span className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/10 text-amber-200">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-4 text-xs text-white/45">
              We&apos;ll quote any integration setup up front before you
              commit. Founding partners: external integration setup fee waived
              for a limited time.
            </p>
          </div>

          {/* Usage */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/85">
                <Gauge className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Conversation usage
              </h3>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
              An AI-handled conversation is a client inquiry thread handled by
              Nexi during the billing month. No tokens. No per-message pricing.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06]">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.025] text-[11px] uppercase tracking-[0.14em] text-white/50">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-semibold">
                      Plan
                    </th>
                    <th className="px-4 py-2.5 text-right font-semibold">
                      Included
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {USAGE_ROWS.map((r) => (
                    <tr key={r.plan} className="bg-transparent">
                      <td className="px-4 py-3 text-white/85">{r.plan}</td>
                      <td className="px-4 py-3 text-right font-semibold text-white">
                        {r.included}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  Extra 500
                </p>
                <p className="mt-1 text-lg font-semibold text-white">$49</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  Extra 1,000
                </p>
                <p className="mt-1 text-lg font-semibold text-white">$89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
