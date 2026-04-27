import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios de Nexi",
  description:
    "Planes y precios de Nexi, el asistente conversacional con IA de Nexal Forge.",
  alternates: {
    canonical: "/nexi/precios",
  },
  openGraph: {
    url: "https://nexalforge.com/nexi/precios",
    title: "Precios de Nexi | Nexal Forge",
    description:
      "Planes y precios de Nexi, el asistente conversacional con IA de Nexal Forge.",
  },
};

export default function NexiPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
