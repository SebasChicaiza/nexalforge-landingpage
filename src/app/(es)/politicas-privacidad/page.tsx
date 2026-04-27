import { permanentRedirect } from "next/navigation";

export default function LegacyPrivacyRoutePage() {
  permanentRedirect("/privacy");
}
