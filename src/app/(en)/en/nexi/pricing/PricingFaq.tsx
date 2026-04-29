"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is billing monthly?",
    a: "Yes. Plans are billed monthly. You can move up or down a tier as your business grows.",
  },
  {
    q: "Is there a setup fee?",
    a: "It depends on your business needs. Nexi includes its own calendar and booking system, so most teams launch with no setup fee. A one-time setup fee may apply if we need to connect Nexi to an external system you already use (Fresha, Vagaro, Square, Mindbody, a custom CRM, etc.). We always quote integration setup up front.",
  },
  {
    q: "Can I cancel anytime? What about refunds?",
    a: "Yes. You can cancel before the next monthly renewal and you won't be charged again. We also back your initial Nexi purchase with a 14-day full refund — no questions asked. This applies to the first purchase for your account and does not extend to renewals or later charges.",
  },
  {
    q: "What counts as a conversation?",
    a: "An AI-handled conversation is a client inquiry thread handled by Nexi during the billing month. We don't price by tokens or per message.",
  },
  {
    q: "What happens if I go over my plan's conversation limit?",
    a: "You can purchase extra conversation packs (500 for $49, 1,000 for $89) or move up to a higher plan. We'll flag it before it becomes a problem.",
  },
  {
    q: "Do I need a separate booking calendar?",
    a: "No. Nexi includes its own calendar and booking system out of the box, so you can launch without any third-party tool. If you already use Fresha, Vagaro, GlossGenius, Square, Mindbody, Boulevard, or a custom CRM, we can connect to it — that's when a setup fee may apply.",
  },
  {
    q: "Does Nexi fully replace my front desk?",
    a: "No. Nexi handles a meaningful share of inquiries, after-hours capture, routing, and follow-up — and escalates to a human teammate with full context when needed. It's a layer that lets your team focus on in-store clients.",
  },
  {
    q: "Are SMS or WhatsApp message fees included?",
    a: "Carrier, SMS, WhatsApp, and third-party platform fees may be billed separately depending on your setup and usage.",
  },
];

export default function PricingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-[#0D0D0D] pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
            Pricing questions,{" "}
            <span
              className="font-normal italic text-white/95"
              style={{ fontFamily: "var(--font-serif-display)" }}
            >
              answered
            </span>
            .
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur transition hover:border-white/15"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-semibold text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 flex-none text-white/55 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14px] leading-relaxed text-white/65">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
