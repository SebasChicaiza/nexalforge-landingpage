import { Instrument_Serif } from "next/font/google";
import FooterEn from "@/components/FooterEn";
import PricingHero from "./PricingHero";
import PricingPlans from "./PricingPlans";
import FoundingPartner from "./FoundingPartner";
import SetupAndUsage from "./SetupAndUsage";
import PricingNotes from "./PricingNotes";
import PricingFaq from "./PricingFaq";
import PricingCta from "./PricingCta";

const serifDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
});

export default function NexiPricingPage() {
  return (
    <main
      lang="en"
      className={`${serifDisplay.variable} bg-[#0D0D0D] text-white`}
    >
      <PricingHero />
      <PricingPlans />
      <FoundingPartner />
      <SetupAndUsage />
      <PricingNotes />
      <PricingFaq />
      <PricingCta />
      <FooterEn />
    </main>
  );
}
