import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StickyHeader from "@/components/StickyHeader";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Gtm from "@/components/Gtm";
import ConsentBanner from "@/components/consent/ConsentBanner";
import WhatsAppOptInCard from "@/components/consent/WhatsAppOptInCard";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/Footer";

export const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
});


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const FB_PIXEL_ID = "1921792838718264";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexalforge.com"),
  title: {
    default: "Nexal Forge — Potencia tus operaciones con IA",
    template: "%s · Nexal Forge",
  },
  description:
    "Implementamos agentes de IA, automatización y analítica para empresas en Latinoamérica. Reduce tiempos, mejora soporte y toma decisiones con dashboards ejecutivos.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.nexalforge.com/",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Carga del SDK */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          `}
        </Script>

        {/* init + PageView inicial */}
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
              window.fbq('init', '${FB_PIXEL_ID}');
              window.fbq('track', 'PageView');
            }
          `}
        </Script>
      </head>
      {/* GTM + Consent Mode (usa next/script dentro) */}
      <Gtm />

      <body className={`${headingFont.variable}`}>
        <StickyHeader />
        {children}
        <Footer />

        <ConsentBanner />
        {/* 
        <WhatsAppOptInCard
          businessName="Nexal Forge"
          purposes={["atencion_cliente", "transaccional"]}
          privacyUrl="/politicas-privacidad"
          origin="web"
        />
        */}
        
          
        <GoogleAnalytics />

        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nexal Forge",
              alternateName: ["NexalForge", "Nexi"],
              url: "https://www.nexalforge.com",
              logo: "https://www.nexalforge.com/logo-nexal.png",
              sameAs: ["https://www.nexalforge.com/asistente-virtual-nexi"],
            }),
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
