import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import { PRODUCT_NAME, TRADE_NAME } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy | Nexal Forge",
  description:
    "How Nexal Forge uses cookies and similar technologies on nexalforge.com and services related to Nexi.",
  alternates: { canonical: "/en/cookies" },
};

const introText = (
  <>
    This Cookie Policy explains how {TRADE_NAME} uses cookies and similar
    technologies on nexalforge.com and services related to {PRODUCT_NAME}.
  </>
);

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "1. What Are Cookies",
    content: (
      <p>
        Cookies are small files or identifiers that a website can store in your
        browser or device. They are used to remember preferences, maintain
        sessions, measure usage, improve security, or enable functionality.
      </p>
    ),
  },
  {
    id: "types",
    title: "2. Types of Cookies We Use",
    content: (
      <div className="space-y-5">
        <div>
          <p className="font-semibold text-gray-900">Essential cookies</p>
          <p className="mt-1">
            Required to display the site, maintain sessions, remember basic
            choices, protect forms, manage security, and enable core features of
            the site or dashboard.
          </p>
          <p className="mt-2">
            If you block essential cookies, some parts of the site or product
            may not work correctly.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Preference cookies</p>
          <p className="mt-1">
            Help us remember choices such as language, region, cookie consent,
            or browsing preferences.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Analytics cookies</p>
          <p className="mt-1">
            We may use analytics tools, such as Google Analytics or Google Tag
            Manager, to understand aggregate site usage, page performance,
            traffic sources, and conversion events.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Marketing cookies</p>
          <p className="mt-1">
            We may use marketing cookies or pixels to measure campaigns,
            attribution, ads, or conversions. Where required by law, these
            cookies will only be used with consent.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            Payment and checkout cookies
          </p>
          <p className="mt-1">
            When you interact with a checkout, payment, receipt, or subscription
            management processed by Paddle, Paddle may use cookies or similar
            technologies to process payments, prevent fraud, manage security,
            remember your checkout session, comply with legal obligations, or
            improve the purchase experience. Paddle&apos;s use of cookies is
            governed by Paddle&apos;s own policies.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "managing-cookies",
    title: "3. Managing Cookies",
    content: (
      <>
        <p>
          You can accept, reject, or manage non-essential cookies from the
          consent banner or panel when available.
        </p>
        <p className="mt-3">
          You can also block or delete cookies from your browser settings. If
          you block essential cookies, some features may stop working correctly.
        </p>
      </>
    ),
  },
  {
    id: "personal-data",
    title: "4. Personal Data",
    content: (
      <p>
        Some cookies may be associated with personal data such as IP address,
        device identifiers, browsing events, or technical information. For more
        details, see our{" "}
        <a
          href="/en/privacy"
          className="underline text-rose-700 hover:text-rose-800"
        >
          Privacy Policy
        </a>
        .
      </p>
    ),
  },
  {
    id: "changes",
    title: "5. Changes",
    content: (
      <p>
        We may update this Cookie Policy to reflect technical, legal, or
        provider changes.
      </p>
    ),
  },
  {
    id: "contact",
    title: "6. Contact",
    content: (
      <p>
        For questions about cookies or privacy, contact us at{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="underline text-rose-700 hover:text-rose-800"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function CookiesEnPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="April 2026"
      lastUpdatedLabel="Last updated:"
      tocLabel="Table of contents"
      introText={introText}
      sections={sections}
    />
  );
}
