import Reveal from "@/components/Reveal";
import NexiFaqAccordion from "@/components/NexiFaqAccordion";
import type { FaqItem } from "@/types/pseo";

type Props = {
  faqs: FaqItem[];
  useCaseName: string;
};

export default function PseoFaqSection({ faqs, useCaseName }: Props) {
  const accordionFaqs = faqs.map((faq) => ({
    q: faq.question,
    a: faq.answer,
  }));

  return (
    <section className="bg-white py-20 text-slate-900">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <h2
            className="text-3xl font-[800] tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Preguntas frecuentes sobre {useCaseName}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10">
            <NexiFaqAccordion faqs={accordionFaqs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
