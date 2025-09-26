// lib/slugify.ts

/**
 * Convert a string to a URL-friendly slug.
 * - Lowercase
 * - Remove accents/diacritics
 * - Replace non-alphanumerics with single hyphens
 * - Trim leading/trailing hyphens
 * - Collapse multiple hyphens
 */
export function slugify(input: string): string {
  return (input ?? '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')     // non-alnum -> hyphen
    .replace(/^-+|-+$/g, '')         // trim hyphens
    .replace(/-{2,}/g, '-');         // collapse duplicates
}

// export default too, so you can import either way
export default slugify;
