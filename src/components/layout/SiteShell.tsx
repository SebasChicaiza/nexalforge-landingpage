import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import StickyHeader from "@/components/StickyHeader";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Gtm from "@/components/Gtm";
import ConsentBanner from "@/components/consent/ConsentBanner";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import {
  COMPANY_DOMICILE,
  COMPANY_RUC,
  LEGAL_COMPANY_NAME,
  TRADE_NAME,
} from "@/lib/legal";
import type { SiteLocale } from "@/lib/language-routing";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
});

export const siteBodyClassName = headingFont.variable;

export default function SiteShell({
  children,
  locale,
}: {
  children: ReactNode;
  locale: SiteLocale;
}) {
  return (
    <>
      <Gtm />
      <StickyHeader locale={locale} />
      {children}
      <Footer />
      <FloatingWhatsApp />
      <ConsentBanner />
      <GoogleAnalytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: TRADE_NAME,
            legalName: LEGAL_COMPANY_NAME,
            taxID: COMPANY_RUC,
            alternateName: ["NexalForge", "Nexi"],
            url: "https://nexalforge.com",
            logo: "https://nexalforge.com/logo-nexal.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Quito",
              addressRegion: "Pichincha",
              addressCountry: "EC",
              streetAddress: COMPANY_DOMICILE,
            },
            sameAs: ["https://nexalforge.com/nexi"],
          }),
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1921792838718264&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
}
