"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  faqs: FaqItem[];
};

export default function NexiFaqAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid gap-4">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.q}
            className="rounded-2xl border border-neutral-200 bg-neutral-50/60 transition-colors duration-300"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#8B1E2D]" />
                <h3 className="text-lg font-semibold text-[#0F0F10]">
                  {item.q}
                </h3>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-neutral-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`px-4 pb-4 transition-all duration-300 ease-out ${
                isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <p className="text-neutral-700">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
