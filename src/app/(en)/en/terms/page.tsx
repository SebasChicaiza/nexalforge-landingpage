import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import FooterEn from "@/components/FooterEn";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import CompanyIdentificationBlock from "@/components/CompanyIdentificationBlock";
import {
  LEGAL_COMPANY_NAME,
  PADDLE_REFUND_POLICY_URL,
  PRODUCT_NAME,
  TRADE_NAME,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Nexal Forge",
  description:
    "Terms of Service governing access to and use of Nexi, the SaaS platform by Nexal Forge.",
  alternates: { canonical: "/en/terms" },
};

const introText = (
  <>
    These Terms of Service govern access to and use of {PRODUCT_NAME}, a SaaS
    product offered by {LEGAL_COMPANY_NAME}, operating commercially as{" "}
    {TRADE_NAME}. By purchasing, accessing, or using {PRODUCT_NAME}, you accept
    these Terms.
  </>
);

const sections: LegalSection[] = [
  {
    id: "identification",
    title: "Identification",
    content: (
      <CompanyIdentificationBlock />
    ),
  },
  {
    id: "what-is-nexi",
    title: "1. What is Nexi",
    content: (
      <>
        <p>
          {PRODUCT_NAME} is a software-as-a-service (SaaS) platform designed to
          help service businesses manage customer conversations, answer
          inquiries, qualify leads, support booking flows, guide users about
          available services, and facilitate context handoffs to the
          business&apos;s human team.
        </p>
        <p className="mt-3">
          {PRODUCT_NAME} is not a generic chatbot, a human agency, a human call
          center service, or a substitute for the customer&apos;s professional
          or legal decisions. The primary offering is access to the software.
        </p>
        <p className="mt-3">
          In some cases, {TRADE_NAME} may offer onboarding, initial
          configuration, business information setup, or implementation support.
          These activities are ancillary to the use of the software and are not
          sold as independent consulting, agency, human call center, managed
          professional services, or a substitute for the customer&apos;s own
          human personnel.
        </p>
      </>
    ),
  },
  {
    id: "customers-permitted-use",
    title: "2. Customers and Permitted Use",
    content: (
      <>
        <p>
          {PRODUCT_NAME} is intended for businesses and teams using the product
          for legitimate commercial purposes. The customer is responsible for
          ensuring that their use of {PRODUCT_NAME} complies with applicable
          laws, regulations, platform policies, and obligations in their country
          or region.
        </p>
        <p className="mt-3">
          {PRODUCT_NAME} may be available to customers in different countries,
          subject to technical, commercial, legal, and third-party provider
          availability required to operate the service.
        </p>
      </>
    ),
  },
  {
    id: "customer-responsibilities",
    title: "3. Customer Responsibilities",
    content: (
      <>
        <p>
          The customer is responsible for providing complete, up-to-date, and
          accurate information about their business, including services, prices,
          promotions, locations, hours, availability, booking policies,
          cancellation policies, contact details, service instructions, and any
          other information needed to configure {PRODUCT_NAME}.
        </p>
        <p className="mt-3">
          The customer is responsible for reviewing and keeping up to date the
          information used by {PRODUCT_NAME}. {TRADE_NAME} is not responsible for
          errors resulting from incorrect, incomplete, outdated, or ambiguous
          information provided by the customer.
        </p>
        <p className="mt-3">
          The customer is also responsible for their own commercial policies,
          legal compliance, relationship with their consumers, contact
          authorizations, consent for communications, compliance with privacy
          regulations, messaging platform rules, and any obligations applicable
          to their industry.
        </p>
      </>
    ),
  },
  {
    id: "ai-limitations",
    title: "4. AI Limitations",
    content: (
      <>
        <p>
          {PRODUCT_NAME} uses automation and artificial intelligence systems.
          While we aim for responses to be helpful, accurate, and consistent
          with the available information, AI-generated outputs may contain
          errors, omissions, incomplete interpretations, or responses that are
          not appropriate for all situations.
        </p>
        <p className="mt-3">
          {PRODUCT_NAME} does not guarantee bookings, sales, revenue, lead
          conversion, customer retention, perfect availability, perfect
          responses, or the complete absence of errors.
        </p>
        <p className="mt-3">
          The customer should review {PRODUCT_NAME}&apos;s responses,
          configurations, and flows when necessary, especially in sensitive,
          unusual, ambiguous, or high-impact situations for their business.
        </p>
      </>
    ),
  },
  {
    id: "prohibited-uses",
    title: "5. Prohibited Uses",
    content: (
      <>
        <p>You may not use {PRODUCT_NAME} for:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>
            illegal, fraudulent, deceptive, abusive, or predatory activities;
          </li>
          <li>
            spam, identity impersonation, manipulation, or unauthorized
            communications;
          </li>
          <li>
            infringing the rights of third parties, privacy, intellectual
            property, or terms of external platforms;
          </li>
          <li>
            sending discriminatory, abusive, threatening, sexually explicit,
            violent, or harmful content;
          </li>
          <li>
            offering services or products prohibited by law or by our payment,
            messaging, infrastructure, or AI providers;
          </li>
          <li>
            making medical, legal, financial, emergency, critical safety, or
            high-risk decisions;
          </li>
          <li>
            selling, reselling, copying, modifying, decompiling, or otherwise
            improperly exploiting the software;
          </li>
          <li>
            attempting to access systems, data, or accounts without
            authorization.
          </li>
        </ul>
        <p className="mt-3">
          {PRODUCT_NAME} must not be used as a medical product, clinical system,
          diagnostic tool, legal advice, financial advice, emergency system, or
          substitute for qualified professionals.
        </p>
        <p className="mt-3">
          Medical, clinical med-spa, healthcare, or regulated flows are not part
          of {PRODUCT_NAME}&apos;s standard scope, unless covered by a separate
          agreement, legal review, and specific configuration approved by{" "}
          {TRADE_NAME}.
        </p>
      </>
    ),
  },
  {
    id: "integrations-third-parties",
    title: "6. Integrations and Third Parties",
    content: (
      <>
        <p>
          {PRODUCT_NAME} may integrate with or depend on external services, such
          as messaging platforms, social networks, booking systems, calendars,
          CRMs, infrastructure providers, analytics tools, AI providers, and
          Paddle for payments.
        </p>
        <p className="mt-3">
          Use of those services may be subject to the terms, policies, technical
          limits, availability, and decisions of third parties. {TRADE_NAME} does
          not fully control those external services and will not be liable for
          failures, changes, outages, suspensions, or restrictions imposed by
          them.
        </p>
      </>
    ),
  },
  {
    id: "plans-payments-paddle",
    title: "7. Plans, Payments, and Paddle",
    content: (
      <>
        <p>
          Plans, prices, implementation fees, usage limits, and included
          features will be those stated on the pricing page, quote, checkout,
          contract, or applicable order.
        </p>
        <p className="mt-3">
          When a purchase is processed by Paddle, Paddle acts as an authorized
          reseller and Merchant of Record. Paddle manages the order process,
          payment, applicable taxes, invoicing, receipts, and transaction-related
          support in accordance with its own terms and policies.
        </p>
        <p className="mt-3">
          Paddle may appear on your bank statement or card as the merchant
          associated with the purchase.
        </p>
        <p className="mt-3">
          Subscriptions renew automatically at the end of each billing period
          unless cancelled before the next renewal. By subscribing, you authorize
          recurring charges in accordance with the selected plan. Applicable
          taxes may be calculated, collected, and managed by Paddle as
          appropriate.
        </p>
      </>
    ),
  },
  {
    id: "cancellations-refunds",
    title: "8. Cancellations and Refunds",
    content: (
      <>
        <p>
          You may cancel your subscription to prevent future charges.
          Cancellation will normally take effect at the end of the current
          billing period.
        </p>
        <p className="mt-3">
          Refunds are governed by our{" "}
          <a
            href="/en/refunds"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Refund and Cancellation Policy
          </a>
          , the{" "}
          <a
            href={PADDLE_REFUND_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Paddle Refund Policy
          </a>
          , and applicable law.
        </p>
        <p className="mt-3">
          We offer a full refund within the first 14 calendar days from the date
          of the initial {PRODUCT_NAME} purchase processed by Paddle, with no
          need to explain the reason. This voluntary refund window applies to
          the initial purchase only and does not automatically extend to
          subscription renewals or later charges. See our{" "}
          <a
            href="/en/refunds"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Refund and Cancellation Policy
          </a>{" "}
          for full details.
        </p>
      </>
    ),
  },
  {
    id: "availability-support",
    title: "9. Availability and Support",
    content: (
      <>
        <p>
          We will make reasonable efforts to keep {PRODUCT_NAME} available and
          functioning correctly. However, we do not guarantee uninterrupted
          availability, complete absence of errors, permanent compatibility with
          all external services, or immediate recovery from incidents.
        </p>
        <p className="mt-3">
          We may perform maintenance, updates, technical changes, or security
          adjustments that temporarily affect access to or operation of the
          service.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "10. Intellectual Property",
    content: (
      <>
        <p>
          {TRADE_NAME} and its licensors retain all rights over {PRODUCT_NAME},
          including software, designs, models, trademarks, text, interfaces,
          processes, documentation, and related technology.
        </p>
        <p className="mt-3">
          The customer receives a limited, revocable, non-exclusive,
          non-transferable, and non-sublicensable license to use {PRODUCT_NAME}{" "}
          in accordance with the contracted plan and these Terms.
        </p>
        <p className="mt-3">
          The customer retains rights over their business information and data
          they provide or upload to {PRODUCT_NAME}, subject to the authorizations
          necessary for {TRADE_NAME} to deliver, operate, improve, and support
          the service.
        </p>
      </>
    ),
  },
  {
    id: "data-privacy",
    title: "11. Data and Privacy",
    content: (
      <>
        <p>
          The processing of personal data is described in our{" "}
          <a
            href="/en/privacy"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Privacy Policy
          </a>
          .
        </p>
        <p className="mt-3">
          The customer declares that they have the rights, permissions, and legal
          bases necessary to provide {PRODUCT_NAME} with data about their
          business, team, customers, prospects, conversations, channels, and
          integrations.
        </p>
      </>
    ),
  },
  {
    id: "suspension-termination",
    title: "12. Suspension or Termination",
    content: (
      <>
        <p>
          We may suspend or terminate access to {PRODUCT_NAME} if we detect a
          breach of these Terms, prohibited use, legal risk, security risk,
          fraud, abuse, non-payment, a request from an external provider, an
          order from a competent authority, or use that may affect {TRADE_NAME},
          Paddle, our providers, other customers, or third parties.
        </p>
        <p className="mt-3">
          The customer may stop using {PRODUCT_NAME} and cancel their
          subscription in accordance with the applicable terms.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "13. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, {TRADE_NAME} will not be liable
          for indirect, incidental, special, consequential damages, loss of
          revenue, loss of profits, loss of business opportunities, loss of data,
          business interruption, reputational damage, or claims arising from the
          use of or inability to use {PRODUCT_NAME}.
        </p>
        <p className="mt-3">
          {TRADE_NAME}&apos;s total liability for any claim related to{" "}
          {PRODUCT_NAME} will not exceed the amount paid by the customer for the
          affected service during the three months prior to the event giving rise
          to the claim, unless applicable law requires a different limit.
        </p>
        <p className="mt-3">
          Nothing in these Terms limits rights that cannot be limited under
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "14. Changes to the Service or These Terms",
    content: (
      <>
        <p>
          We may update {PRODUCT_NAME}, its features, integrations, plans, prices,
          or these Terms to reflect technical, commercial, legal, or security
          changes.
        </p>
        <p className="mt-3">
          When a change is material, we will make reasonable efforts to
          communicate it through the website, email, product dashboard, or
          another appropriate channel.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "15. Governing Law",
    content: (
      <p>
        These Terms will be governed by the laws of Ecuador, unless mandatory
        consumer protection, privacy, or other applicable laws establish rights
        that cannot be limited by contract.
      </p>
    ),
  },
  {
    id: "contact",
    title: "16. Contact",
    content: (
      <p>
        For support, questions about these Terms, or information about{" "}
        {PRODUCT_NAME}, you can reach us at{" "}
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

export default function TermsEnPage() {
  return (
    <>
      <LegalPageLayout
        title={`${TRADE_NAME} Terms of Service`}
        lastUpdated="April 2026"
        lastUpdatedLabel="Last updated:"
        tocLabel="Table of contents"
        introText={introText}
        sections={sections}
      />
      <FooterEn />
    </>
  );
}
