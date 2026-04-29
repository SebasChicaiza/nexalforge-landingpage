import Link from "next/link";
import { CalendarCheck, Smartphone } from "lucide-react";

export default function PricingNotes() {
  return (
    <section className="relative bg-[#0D0D0D] pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-200">
                <CalendarCheck className="h-4 w-4" />
              </span>
              <h3 className="text-base font-semibold text-white">
                Calendar and booking included
              </h3>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
              Nexi ships with its own calendar and booking system, so you can
              launch without any third-party tool. Already on Fresha, Vagaro,
              GlossGenius, Square, Mindbody, or Boulevard? We can connect to
              it — a setup fee may apply for that integration.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/85">
                <Smartphone className="h-4 w-4" />
              </span>
              <h3 className="text-base font-semibold text-white">
                Channel fees
              </h3>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
              SMS, WhatsApp, carrier, or third-party platform fees may be
              billed separately depending on setup and usage.
            </p>
          </div>
        </div>

        {/* Paddle disclosure */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 py-5 text-[13px] leading-relaxed text-white/55 backdrop-blur space-y-3">
          <p>
            Payments for Nexi are processed by{" "}
            <span className="text-white/80 font-medium">Paddle</span>. Paddle
            acts as the authorized reseller and Merchant of Record for
            purchases processed through Paddle, and may appear on your bank or
            card statement.
          </p>
          <p>
            Subscriptions renew automatically unless cancelled before the next
            billing date. Applicable taxes may be calculated and collected by
            Paddle as required.
          </p>
          <p>
            We offer a full refund within the first 14 calendar days from the
            date of your initial Nexi purchase processed by Paddle, no
            questions asked. This applies to the initial purchase only and
            does not extend to renewals or later charges. See our{" "}
            <Link
              href="/en/terms"
              className="font-semibold text-white/80 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/en/refunds"
              className="font-semibold text-white/80 hover:underline"
            >
              Refund and Cancellation Policy
            </Link>
            .
          </p>
          <p className="border-t border-white/[0.06] pt-3 text-xs text-white/40">
            Nexi is primarily a SaaS product. Initial configuration, onboarding
            and implementation support, when applicable, are auxiliary to the
            use of the software and are not sold as standalone consulting,
            agency services, a human call center, managed professional
            services, or a substitute for the customer&apos;s human staff.
          </p>
        </div>
      </div>
    </section>
  );
}
