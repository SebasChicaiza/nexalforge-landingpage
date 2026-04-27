import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import CompanyIdentificationBlock from "@/components/CompanyIdentificationBlock";
import {
  LEGAL_COMPANY_NAME,
  PRODUCT_NAME,
  TRADE_NAME,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Nexal Forge",
  description:
    "How Nexal Forge collects, uses, shares, and protects personal data related to Nexi and nexalforge.com.",
  alternates: { canonical: "/en/privacy" },
};

const introText = (
  <>
    This Privacy Policy explains how {LEGAL_COMPANY_NAME}, operating
    commercially as {TRADE_NAME}, collects, uses, shares, and protects personal
    data related to {PRODUCT_NAME} and the nexalforge.com website.
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
    id: "scope",
    title: "1. Scope",
    content: (
      <>
        <p>
          This policy applies to website visitors, {PRODUCT_NAME} business
          customers, authorized {PRODUCT_NAME} dashboard users, business
          contacts, prospects, and individuals who interact with businesses that
          use {PRODUCT_NAME}.
        </p>
        <p className="mt-3">
          {PRODUCT_NAME} is a SaaS product used by businesses to manage
          communications, leads, bookings, inquiries, and business operations.
          In many cases, {TRADE_NAME} processes data on behalf of its business
          customers.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "2. Data We May Collect",
    content: (
      <>
        <p>
          We may collect or process the following categories of data, depending
          on how the site, product, or connected channels are used:
        </p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>
            contact data, such as name, email address, phone number, and
            company;
          </li>
          <li>
            account data, such as username, role, permissions, and
            configuration;
          </li>
          <li>
            customer business data, such as services, prices, locations, hours,
            team, providers, internal policies, and service instructions;
          </li>
          <li>
            conversation data, such as messages sent or received through
            connected channels, interaction history, service context, user
            intent, service preferences, and booking requests;
          </li>
          <li>
            lead or end-customer data, such as name, phone number, contact
            channel, business interest, requested service, preferred location,
            preferred time, or other information shared during the conversation;
          </li>
          <li>
            technical data, such as IP address, browser, device, operating
            system, activity logs, security events, errors, and usage metrics;
          </li>
          <li>support, onboarding, or implementation data;</li>
          <li>
            limited billing data, such as subscription status, transaction
            identifiers, contracted plan, receipts, and data needed for business
            support.
          </li>
        </ul>
        <p className="mt-3">
          When payment is made through Paddle, payment data is managed by
          Paddle. {TRADE_NAME} does not need to receive the full card number to
          operate {PRODUCT_NAME}.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-data",
    title: "3. How We Use Data",
    content: (
      <>
        <p>We use data to:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>operate, deliver, and maintain {PRODUCT_NAME};</li>
          <li>create and manage accounts;</li>
          <li>configure the product for each customer;</li>
          <li>
            process conversations, leads, bookings, responses, and handoffs;
          </li>
          <li>provide support, onboarding, and implementation;</li>
          <li>
            manage billing, subscriptions, payments, cancellations, and
            refunds;
          </li>
          <li>
            monitor security, prevent fraud, resolve errors, and protect the
            service;
          </li>
          <li>improve the quality, reliability, and usefulness of the product;</li>
          <li>analyze site usage and business performance;</li>
          <li>
            send permitted operational, administrative, or commercial
            communications;
          </li>
          <li>fulfill legal, contractual, or regulatory obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ai-processing",
    title: "4. AI Processing",
    content: (
      <>
        <p>
          {PRODUCT_NAME} uses automation and artificial intelligence to help
          respond to messages, classify requests, summarize context, recommend
          next steps, and assist operational flows.
        </p>
        <p className="mt-3">
          AI-generated responses may be imperfect. {PRODUCT_NAME} customers are
          responsible for providing accurate information and for reviewing
          relevant flows, responses, and data when necessary.
        </p>
        <p className="mt-3">
          We do not use {PRODUCT_NAME} to provide medical, legal, financial,
          emergency, or high-risk advice. Customers must not configure{" "}
          {PRODUCT_NAME} to make regulated or sensitive decisions without
          adequate human and legal review.
        </p>
      </>
    ),
  },
  {
    id: "end-customer-data",
    title: "5. End-Customer Data",
    content: (
      <>
        <p>
          When a person interacts with a business that uses {PRODUCT_NAME}, we
          may process their data on behalf of that business to respond to
          inquiries, capture leads, support bookings, follow up, or hand off
          context to the business&apos;s human team.
        </p>
        <p className="mt-3">
          The business customer is responsible for informing its own end
          customers about the use of tools like {PRODUCT_NAME} when required by
          applicable law, and for obtaining the necessary consents or legal bases
          for communications, integrations, and data processing.
        </p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "6. Legal Bases for Processing",
    content: (
      <p>
        Depending on the applicable country, region, and relationship, we
        process data to perform contracts, deliver the service, comply with legal
        obligations, respond to requests, protect legitimate interests, improve
        the product, prevent abuse, or with consent where applicable.
      </p>
    ),
  },
  {
    id: "third-parties-providers",
    title: "7. Third Parties and Providers",
    content: (
      <>
        <p>
          We may share data with providers necessary to operate {PRODUCT_NAME},
          including cloud infrastructure, AI providers, messaging services,
          analytics, security, support, email, integration platforms, booking
          systems, CRMs, and Paddle for purchases processed by Paddle.
        </p>
        <p className="mt-3">
          These providers may only process data for the purposes necessary to
          deliver their services, subject to reasonable contractual, technical,
          and organizational conditions.
        </p>
        <p className="mt-3">
          We may also share information when necessary to comply with the law,
          protect rights, investigate fraud, respond to competent authorities,
          enforce our terms, or protect users, customers, providers, or third
          parties.
        </p>
      </>
    ),
  },
  {
    id: "paddle-payments",
    title: "8. Paddle and Payments",
    content: (
      <>
        <p>
          When a purchase is processed through Paddle, Paddle acts as an
          authorized reseller and Merchant of Record. Paddle may process
          personal data to handle payments, issue receipts, manage applicable
          taxes, handle transaction-related support, manage cancellations,
          refunds, and comply with legal obligations.
        </p>
        <p className="mt-3">
          Paddle&apos;s privacy information is governed by its own Privacy
          Policy. We recommend reviewing Paddle&apos;s policies before completing
          a purchase.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "9. International Transfers",
    content: (
      <>
        <p>
          {TRADE_NAME} operates from Ecuador and may use providers located in
          other countries. As a result, data may be processed or stored outside
          the country where the user, customer, or business is located.
        </p>
        <p className="mt-3">
          Where applicable, we will use reasonable contractual, technical, or
          organizational measures to protect data in international transfers.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "10. Retention",
    content: (
      <>
        <p>
          We retain data for as long as necessary to deliver {PRODUCT_NAME},
          maintain accounts, comply with legal obligations, resolve disputes,
          prevent fraud, maintain security, conduct internal audits, and enforce
          agreements.
        </p>
        <p className="mt-3">
          Customers may request deletion or export of data in accordance with
          their plan, configuration, legal obligations, and available technical
          capabilities.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "11. Security",
    content: (
      <>
        <p>
          We apply reasonable technical and organizational measures to protect
          information against unauthorized access, loss, alteration, disclosure,
          or misuse.
        </p>
        <p className="mt-3">
          No system is 100% secure. Customers must also protect their
          credentials, control internal access, maintain correct configurations,
          and report incidents or unauthorized access.
        </p>
      </>
    ),
  },
  {
    id: "privacy-rights",
    title: "12. Privacy Rights",
    content: (
      <>
        <p>
          Depending on applicable law, you may have the right to request access,
          correction, update, deletion, restriction, objection, portability, or
          withdrawal of consent regarding your personal data.
        </p>
        <p className="mt-3">
          To exercise rights related to data processed directly by {TRADE_NAME},
          contact us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline text-rose-700 hover:text-rose-800"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="mt-3">
          If you are an end customer of a business using {PRODUCT_NAME}, you may
          need to direct certain requests to that business directly, as it may
          act as the controller of your data.
        </p>
      </>
    ),
  },
  {
    id: "minors",
    title: "13. Minors",
    content: (
      <p>
        {PRODUCT_NAME} is intended for businesses and is not designed to be
        contracted directly by minors. If we identify that we have collected data
        from a minor without valid authorization where required, we will take
        reasonable steps to delete or limit that processing.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "14. Cookies",
    content: (
      <p>
        We use cookies and similar technologies as described in our{" "}
        <a
          href="/en/cookies"
          className="underline text-rose-700 hover:text-rose-800"
        >
          Cookie Policy
        </a>
        .
      </p>
    ),
  },
  {
    id: "changes",
    title: "15. Changes",
    content: (
      <p>
        We may update this policy to reflect legal, technical, commercial, or
        product changes. We will publish the updated version on this site.
      </p>
    ),
  },
  {
    id: "contact",
    title: "16. Contact",
    content: (
      <p>
        For privacy questions or support, contact us at{" "}
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

export default function PrivacyEnPage() {
  return (
    <LegalPageLayout
      title={`${TRADE_NAME} Privacy Policy`}
      lastUpdated="April 2026"
      lastUpdatedLabel="Last updated:"
      tocLabel="Table of contents"
      introText={introText}
      sections={sections}
    />
  );
}
