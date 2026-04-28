import type { Metadata } from "next";
import FooterEn from "@/components/FooterEn";

const CANONICAL_PATH = "/en/nexi/dental-clinics";

export const metadata: Metadata = {
  title: "Nexi for Dental Clinics | Temporary Page Scaffold",
  description:
    "Temporary English landing page scaffold for Nexi dental clinics. Final content pending.",
  alternates: {
    canonical: CANONICAL_PATH,
    languages: {
      en: CANONICAL_PATH,
    },
  },
  openGraph: {
    type: "website",
    url: `https://nexalforge.com${CANONICAL_PATH}`,
    title: "Nexi for Dental Clinics | Temporary Page Scaffold",
    description:
      "Temporary English landing page scaffold for Nexi dental clinics. Final content pending.",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Nexi for Dental Clinics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexi for Dental Clinics | Temporary Page Scaffold",
    description:
      "Temporary English landing page scaffold for Nexi dental clinics. Final content pending.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnglishDentalClinicsPage() {
  return (
    <main lang="en" className="mx-auto max-w-4xl px-6 py-24">
      <section className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Temporary English Route
        </p>
        <h1 className="text-3xl font-semibold text-neutral-950">
          Placeholder: Nexi for dental clinics
        </h1>
        <p className="max-w-2xl text-base text-neutral-700">
          This page is a technical scaffold only. Final English copy, layout,
          and design will be added in a separate session.
        </p>
      </section>

      <section className="mt-12 space-y-3 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-950">
          Temporary content markers
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>Placeholder hero/content block</li>
          <li>Placeholder proof/benefits block</li>
          <li>Placeholder CTA block</li>
        </ul>
      </section>
      <FooterEn />
    </main>
  );
}
