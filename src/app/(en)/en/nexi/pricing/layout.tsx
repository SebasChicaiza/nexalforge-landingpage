import type { Metadata } from "next";

const CANONICAL_PATH = "/en/nexi/pricing";
const TITLE = "Nexi Pricing — Plans for salons and spas";
const DESCRIPTION =
  "Simple plans for salons and spas that want to capture missed demand, respond faster, and turn more inquiries into booked appointments. Starter, Growth, Pro, and Custom plans.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL_PATH,
    languages: { en: CANONICAL_PATH, es: "/nexi/precios" },
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
        alt: "Nexi Pricing",
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

export default function NexiPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
