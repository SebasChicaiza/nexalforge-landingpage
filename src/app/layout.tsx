import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StickyHeader from "@/components/StickyHeader";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexalforge.com"), // <-- ajusta dominio prod
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StickyHeader />
        {children}
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
