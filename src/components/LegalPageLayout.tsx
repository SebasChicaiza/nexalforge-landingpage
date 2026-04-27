import React from 'react';

const BRAND = {
  red: '#8B1E2D',
  coral: '#B84550',
  charcoal: '#2A2A2A',
};

export type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  lastUpdatedLabel?: string;
  introText?: React.ReactNode;
  sections: LegalSection[];
  tocLabel?: string;
}

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="mt-12 flex items-center gap-2 text-xl font-extrabold text-gray-900">
      <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: BRAND.coral }} />
      {title}
    </h2>
    <div className="mt-3 text-sm leading-6 text-gray-700">{children}</div>
  </section>
);

export default function LegalPageLayout({ title, lastUpdated, lastUpdatedLabel = "Última actualización:", introText, sections, tocLabel = "Tabla de contenidos" }: LegalPageLayoutProps) {
  return (
    <main className="bg-gray-50 py-10 pt-25 pb-20 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 mt-16">
        {/* Header */}
        <header className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-tight" style={{ color: BRAND.charcoal }}>
              {title}
            </h1>
            {lastUpdated && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {lastUpdatedLabel} {lastUpdated}
              </span>
            )}
          </div>
          {introText && <p className="mt-3 text-sm text-gray-700">{introText}</p>}
        </header>

        {/* TOC */}
        {sections.length > 0 && (
          <nav aria-label="Tabla de contenidos" className="mt-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-[13px] font-semibold text-gray-900">{tocLabel}</p>
              <ul className="grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a className="hover:underline" href={`#${sec.id}`}>
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Content */}
        <article className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {sections.map((sec) => (
            <Section key={sec.id} id={sec.id} title={sec.title}>
              {sec.content}
            </Section>
          ))}
        </article>
      </div>
    </main>
  );
}
