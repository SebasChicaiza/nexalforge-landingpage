import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StickyHeader from "@/components/StickyHeader";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Gtm from "@/components/Gtm";
import ConsentBanner from "@/components/ConsentBanner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexalforge.com"),
  title: {
    default: "NexalForge — Potencia tus operaciones con IA",
    template: "%s · NexalForge",
  },
  description:
    "Implementamos agentes y automatizaciones que mejoran ventas, reducen tiempos y recortan costos. KPI medible en 2–3 semanas.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.nexalforge.com/",
    title: "NexalForge — Potencia tus operaciones con IA",
    description:
      "Agentes de IA y automatización para ventas y operaciones. KPI en 2–3 semanas.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "NexalForge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexalForge — Potencia tus operaciones con IA",
    description:
      "Agentes de IA y automatización para ventas y operaciones. KPI en 2–3 semanas.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head></head>
      {/* GTM + Consent Mode (usa next/script dentro) */}
      <Gtm />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Noscript de GTM — si tu <Gtm /> ya lo incluye, puedes quitar este bloque */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <StickyHeader />
        {children}

        <ConsentBanner />
        <GoogleAnalytics />

        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NexalForge",
              url: "https://www.nexalforge.com",
              logo: "https://www.nexalforge.com/logo-nexal.png",
              sameAs: [] as string[],
            }),
          }}
        />
      </body>
    </html>
  );
}
