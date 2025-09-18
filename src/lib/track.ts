export function trackLead(params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // gtag seguro
  // @ts-expect-error gtag puede no existir si no hay GA_ID
  window.gtag?.("event", "generate_lead", params ?? {});
}
