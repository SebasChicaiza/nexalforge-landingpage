import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import FooterEn from "@/components/FooterEn";
import SpasSalonsHero from "./SpasSalonsHero";
import SpasSalonsHowItWorks from "./SpasSalonsHowItWorks";
import SpasSalonsWhyTrust from "./SpasSalonsWhyTrust";
import SpasSalonsOutcomes from "./SpasSalonsOutcomes";
import SpasSalonsCta from "./SpasSalonsCta";

const serifDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
});

const CANONICAL_PATH = "/en/nexi/spas-salons";
const TITLE =
  "Nexi for Spas & Salons — Convert more inquiries into booked appointments";
const DESCRIPTION =
  "Nexi helps premium salons and day spas reply faster, route inquiries to the right service or provider, support booking, and keep high-intent demand moving after hours.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL_PATH,
    languages: { en: CANONICAL_PATH },
  },
  openGraph: {
    type: "website",
    url: `https://nexalforge.com${CANONICAL_PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Nexi for Spas and Salons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function SpasSalonsPage() {
  return (
    <main
      lang="en"
      className={`${serifDisplay.variable} bg-[#0D0D0D] text-white`}
    >
      <SpasSalonsHero />
      <SpasSalonsHowItWorks />
      <SpasSalonsWhyTrust />
      <SpasSalonsOutcomes />
      <SpasSalonsCta />
      <FooterEn />
    </main>
  );
}
