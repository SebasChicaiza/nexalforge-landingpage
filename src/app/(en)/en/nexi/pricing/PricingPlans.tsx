import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: string;
  priceSuffix?: string;
  pricePrefix?: string;
  tagline: string;
  bestFor: string;
  promise: string;
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  inheritsFrom?: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$129",
    priceSuffix: "/mo",
    tagline: "For small teams that want every inquiry answered.",
    bestFor:
      "Small salons, single-location spas, teams testing Nexi, or businesses starting with one main channel.",
    promise: "Nexi helps you stop missing client inquiries.",
    cta: "Start with Starter",
    ctaHref: "#contact",
    features: [
      "1 location",
      "1 supported channel, configured during onboarding",
      "Up to 500 client conversations / month",
      "After-hours inquiry capture",
      "Common FAQ responses",
      "Basic service guidance",
      "Lead capture",
      "Booking link routing",
      "Staff handoff summaries",
      "Basic dashboard",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$249",
    priceSuffix: "/mo",
    tagline:
      "For salons and spas that want more inquiries to become bookings.",
    bestFor:
      "Premium salons, day spas, multi-provider businesses, Instagram-active teams, and businesses where staff follow-up is inconsistent.",
    promise: "Nexi helps turn more interested clients into booked appointments.",
    cta: "Start with Growth",
    ctaHref: "#contact",
    highlight: true,
    inheritsFrom: "Starter",
    features: [
      "Up to 3 supported channels, where available",
      "Up to 1,500 client conversations / month",
      "Guided service recommendations",
      "Provider / staff preference capture",
      "Location guidance, when configured",
      "Booking-intent detection",
      "Follow-up for unanswered inquiries, when enabled",
      "After-hours recovery workflows, when enabled",
      "Lead summaries and status tracking",
      "Structured staff handoff",
      "Basic performance reporting",
      "Priority onboarding",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$499",
    priceSuffix: "/mo",
    tagline:
      "For busy teams that need more configured front-desk workflows.",
    bestFor:
      "Busy premium salons, high-volume spas, multi-provider businesses with complex service/provider matching, and 1 high-volume location or 2 locations.",
    promise: "Nexi becomes a smarter front-desk layer for a busy operation.",
    cta: "Upgrade your front desk",
    ctaHref: "#contact",
    inheritsFrom: "Growth",
    features: [
      "1 high-volume location or up to 2 locations",
      "Up to 5 supported channels, where available",
      "Up to 3,000 client conversations / month",
      "Advanced guidance by service, provider, location, language, urgency",
      "Custom handoff rules configured during onboarding",
      "Custom follow-up rules, when enabled",
      "Staff escalation rules configured during onboarding",
      "Booking recovery workflows for incomplete inquiries",
      "Cancellation / reschedule request handling, when enabled",
      "Monthly performance review",
      "Priority support",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    pricePrefix: "From",
    price: "$999",
    priceSuffix: "/mo",
    tagline: "For multi-location salons, spas, and beauty groups.",
    bestFor:
      "3+ locations, salon/spa groups, premium beauty/wellness brands, and businesses needing custom workflows or supported integrations.",
    promise: "Nexi helps standardize client conversion across locations.",
    cta: "Talk to us",
    ctaHref: "#contact",
    features: [
      "3+ locations",
      "Custom conversation volume",
      "Multi-location guidance and escalation",
      "Custom onboarding",
      "Custom workflows",
      "Advanced reporting",
      "Team training",
      "Dedicated rollout support",
      "Supported integrations, where technically available",
      "Custom support arrangement",
    ],
  },
];

export default function PricingPlans() {
  return (
    <section
      id="plans"
      className="relative scroll-mt-24 overflow-hidden bg-[#0D0D0D] pb-24 pt-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[1100px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(239,14,26,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Plans
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl md:text-[2.75rem]">
            A plan for every{" "}
            <span
              className="font-normal italic text-white/95"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              stage
            </span>{" "}
            of your business
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
            Start by capturing every inquiry. Move up as more of those
            inquiries need to become bookings, and as your front desk gets
            busier. Nexi works with your existing booking flow — you don&apos;t
            need to replace your current calendar to get started.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 items-stretch">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-white/45">
          Channel availability depends on setup. SMS, WhatsApp, carrier, or
          third-party platform fees may be billed separately depending on
          setup and usage.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  if (plan.highlight) {
    return (
      <div className="relative h-full">
        {/* Outer glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[28px] opacity-90"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,53,67,0.55), rgba(229,9,20,0.18) 45%, rgba(120,80,255,0.20))",
            filter: "blur(0.5px)",
          }}
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#141415] p-7 shadow-[0_30px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)]">
          {/* Inner radial */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(239,14,26,0.35), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(120,80,255,0.20), transparent 70%)",
            }}
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold tracking-tight text-white">
                {plan.name}
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                <Sparkles className="h-3 w-3 text-[#FF4757]" />
                Recommended
              </span>
            </div>
            <PriceBlock plan={plan} />
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">
              {plan.tagline}
            </p>
            <Link
              href={plan.ctaHref}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(239,14,26,0.45),inset_0_1px_0_rgba(255,255,255,0.22)] transition hover:brightness-110"
              style={{
                background:
                  "linear-gradient(135deg, #FF6A75 0%, #FF1F2E 28%, #E50914 100%)",
              }}
            >
              {plan.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <FeatureList plan={plan} variant="highlight" />
            <BestFor plan={plan} />
            <Promise plan={plan} variant="highlight" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur transition hover:border-white/15 hover:bg-white/[0.04]">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight text-white">
          {plan.name}
        </h3>
      </div>
      <PriceBlock plan={plan} />
      <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
        {plan.tagline}
      </p>
      <Link
        href={plan.ctaHref}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/[0.10]"
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
      <FeatureList plan={plan} />
      <BestFor plan={plan} />
      <Promise plan={plan} />
    </div>
  );
}

function PriceBlock({ plan }: { plan: Plan }) {
  return (
    <div className="mt-5 flex items-baseline gap-1">
      {plan.pricePrefix && (
        <span className="text-sm font-medium text-white/55">
          {plan.pricePrefix}
        </span>
      )}
      <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-[2.6rem] font-bold leading-none tracking-[-0.03em] text-transparent">
        {plan.price}
      </span>
      {plan.priceSuffix && (
        <span className="text-sm font-medium text-white/55">
          {plan.priceSuffix}
        </span>
      )}
    </div>
  );
}

function FeatureList({
  plan,
  variant,
}: {
  plan: Plan;
  variant?: "highlight";
}) {
  return (
    <div className="mt-7">
      <div className="h-px w-full bg-white/[0.06]" />
      {plan.inheritsFrom && (
        <p className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Everything in {plan.inheritsFrom}, plus
        </p>
      )}
      {!plan.inheritsFrom && (
        <p className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Includes
        </p>
      )}
      <ul className="mt-3 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full ${
                variant === "highlight"
                  ? "border border-[#EF0E1A]/40 bg-[#EF0E1A]/15 text-[#FF4757]"
                  : "border border-white/15 bg-white/[0.04] text-white/75"
              }`}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span className="text-[13px] leading-relaxed text-white/80">
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BestFor({ plan }: { plan: Plan }) {
  return (
    <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
        Best for
      </p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-white/70">
        {plan.bestFor}
      </p>
    </div>
  );
}

function Promise({
  plan,
  variant,
}: {
  plan: Plan;
  variant?: "highlight";
}) {
  return (
    <p
      className={`mt-4 text-[12.5px] font-medium leading-relaxed ${
        variant === "highlight" ? "text-[#FF6677]" : "text-white/60"
      }`}
    >
      {plan.promise}
    </p>
  );
}
