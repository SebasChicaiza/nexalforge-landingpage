import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import FooterEn from "@/components/FooterEn";
import { Metadata } from "next";
import {
  CONTACT_EMAIL,
  LEGAL_COMPANY_NAME,
  PADDLE_REFUND_POLICY_URL,
  PRODUCT_NAME,
  TRADE_NAME,
} from "@/lib/legal";
import CompanyIdentificationBlock from "@/components/CompanyIdentificationBlock";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | Nexal Forge",
  description:
    "Refund and cancellation policy for Nexi purchases processed by Paddle. Full refund available within the first 14 calendar days.",
  alternates: { canonical: "/en/refunds" },
};

const introText = (
  <>
    This Refund and Cancellation Policy applies to {PRODUCT_NAME} purchases
    processed by Paddle. {PRODUCT_NAME} is a SaaS product of {LEGAL_COMPANY_NAME},
    operating commercially as {TRADE_NAME}. Paddle acts as an authorized reseller
    and Merchant of Record for purchases processed through Paddle.
  </>
);

const sections: LegalSection[] = [
  {
    id: "14-day-refund",
    title: "1. 14-Day Refund",
    content: (
      <>
        <p>
          We offer a full refund within the first 14 calendar days from the date
          of each {PRODUCT_NAME} transaction processed by Paddle.
        </p>
        <p className="mt-3">
          You do not need to explain the reason for your request. If you submit
          a refund request within that 14-calendar-day window, it will be
          processed in accordance with Paddle&apos;s channels and controls.
        </p>
        <p className="mt-3">
          This window applies to subscriptions, renewals, one-time charges,
          setup fees, implementation fees, or other {PRODUCT_NAME} charges
          processed by Paddle.
        </p>
      </>
    ),
  },
  {
    id: "after-14-days",
    title: "2. After 14 Days",
    content: (
      <>
        <p>
          After the 14 calendar days from the transaction date, refunds will be
          handled in accordance with the{" "}
          <a
            href={PADDLE_REFUND_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Paddle's official refund policy (opens in a new tab)"
            title="View Paddle's official refund policy"
            className="underline text-rose-700 hover:text-rose-800"
          >
            Paddle Refund Policy
          </a>{" "}
          and applicable law.
        </p>
        <p className="mt-3">
          Nothing in this policy limits any mandatory rights you may have under
          the applicable law of your country or region.
        </p>
      </>
    ),
  },
  {
    id: "how-to-request",
    title: "3. How to Request a Refund",
    content: (
      <>
        <p>To request a refund, use one of the following channels:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>
            the &ldquo;View receipt&rdquo; or &ldquo;Manage subscription&rdquo;
            link included in the confirmation email sent by Paddle;
          </li>
          <li>the support portal or link indicated by Paddle;</li>
          <li>Paddle&apos;s buyer support;</li>
          <li>
            or contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline text-rose-700 hover:text-rose-800"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            if you need help identifying your purchase.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "4. Subscription Cancellation",
    content: (
      <>
        <p>
          You may cancel your subscription to prevent future charges.
          Cancellation stops future renewals but does not automatically generate
          a refund for payments already made, unless the refund request is
          submitted within the 14-calendar-day window or applicable law requires
          otherwise.
        </p>
        <p className="mt-3">
          If you cancel a subscription, you will normally retain access to{" "}
          {PRODUCT_NAME} until the end of the current billing period, unless the
          refund is approved and access must end in accordance with Paddle&apos;s
          policy.
        </p>
      </>
    ),
  },
  {
    id: "processing",
    title: "5. Refund Processing",
    content: (
      <p>
        Refunds for purchases processed by Paddle are handled by Paddle. When a
        refund is approved, Paddle will typically process it to the original
        payment method where possible. Paddle may perform checks to prevent
        fraud, refund abuse, manipulative disputes, or unauthorized activity.
      </p>
    ),
  },
  {
    id: "support",
    title: "6. Support",
    content: (
      <>
        <p>
          If you have questions about a {PRODUCT_NAME} purchase, cancellation, or
          refund, you can reach us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline text-rose-700 hover:text-rose-800"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <div className="mt-4">
          <CompanyIdentificationBlock />
        </div>
      </>
    ),
  },
];

export default function RefundsEnPage() {
  return (
    <>
      <LegalPageLayout
        title="Refund and Cancellation Policy"
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
