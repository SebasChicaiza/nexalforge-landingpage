export type SiteLocale = "es" | "en";

export const ENGLISH_FALLBACK_LANDING = "/en/nexi/spas-salons";
export const SPANISH_FALLBACK_LANDING = "/";

const ES_TO_EN_COUNTERPARTS: Record<string, string> = {
  "/nexi/peluquerias-spas": "/en/nexi/spas-salons",
};

const EN_TO_ES_COUNTERPARTS: Record<string, string> = Object.fromEntries(
  Object.entries(ES_TO_EN_COUNTERPARTS).map(([esPath, enPath]) => [
    enPath,
    esPath,
  ])
);

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function isEnglishPath(pathname: string): boolean {
  const normalized = normalizePath(pathname);
  return normalized === "/en" || normalized.startsWith("/en/");
}

export function getLanguageSwitchPath(
  pathname: string,
  targetLocale: SiteLocale
): string {
  const normalizedPath = normalizePath(pathname);
  const currentIsEnglish = isEnglishPath(normalizedPath);

  if (targetLocale === "en") {
    if (currentIsEnglish) return normalizedPath;
    return ES_TO_EN_COUNTERPARTS[normalizedPath] ?? ENGLISH_FALLBACK_LANDING;
  }

  if (!currentIsEnglish) return normalizedPath;
  return EN_TO_ES_COUNTERPARTS[normalizedPath] ?? SPANISH_FALLBACK_LANDING;
}
