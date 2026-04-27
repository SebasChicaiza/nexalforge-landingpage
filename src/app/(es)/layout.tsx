import type { Metadata } from "next";
import "../globals.css";
import SiteHeadScripts from "@/components/layout/SiteHeadScripts";
import SiteShell, { siteBodyClassName } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexalforge.com"),
  title: {
    default: "Nexal Forge — Potencia tus operaciones con IA",
    template: "%s · Nexal Forge",
  },
  description:
    "Implementamos agentes de IA, automatización y analítica para empresas en Latinoamérica. Reduce tiempos, mejora soporte y toma decisiones con dashboards ejecutivos.",
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      "es-MX": "/",
      "es-CO": "/",
      "es-EC": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://nexalforge.com/",
    title: "Nexal Forge — Potencia tus operaciones con IA",
    description:
      "Agentes de IA, automatización y analítica para empresas en Latinoamérica. Reduce tiempos, mejora soporte y acelera decisiones con dashboards ejecutivos.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Nexal Forge" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexal Forge — Potencia tus operaciones con IA",
    description:
      "Implementamos agentes de IA, automatización y analítica para empresas en Latinoamérica. Reduce tiempos, mejora soporte y toma decisiones con dashboards ejecutivos.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function SpanishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <SiteHeadScripts />
      </head>
      <body className={siteBodyClassName}>
        <SiteShell locale="es">{children}</SiteShell>
      </body>
    </html>
  );
}
