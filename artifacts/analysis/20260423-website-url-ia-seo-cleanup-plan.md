# Website URL / IA SEO Cleanup Plan

## Executive Summary

This artifact is now frozen to the flat product-led model:

- `/nexi`
- `/nexi/precios`
- `/nexi/{industry}`
- `/nexi/{industry}/{use-case}`

It also reflects the bounded implementation scope that was actually approved and shipped as Wave 1 only.

Wave 1 does not migrate the full `soluciones` tree. It only does four things:

- normalizes canonical host handling to apex `https://nexalforge.com`
- cleans up metadata, canonicals, sitemap, robots, and noindex for the highest-risk URLs
- migrates the core Nexi routes into the new namespace
- updates the main internal links that pointed at the old product routes

The core architectural decision is now fixed in this artifact:

- Nexal Forge remains the company-level brand at `/`
- Nexi is the product namespace at `/nexi`
- vertical pages should eventually live at `/nexi/{industry}`, not `/nexi/industrias/{industry}`
- dental is the flagship wedge and should remain a rich bespoke page at `/nexi/clinicas-odontologicas`

Wave 2 remains intentionally out of scope here. The dynamic `soluciones/*` pSEO tree still exists in the repo and still serves as-is unless separately approved for migration.

## Repo Facts

### Framework and routing

- The site uses the Next.js App Router under [src/app](/home/sebas-chicaiza/landing-nexal/src/app).
- Root metadata is defined in [src/app/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/layout.tsx:25).
- Redirects are defined in [next.config.ts](/home/sebas-chicaiza/landing-nexal/next.config.ts:12).
- Middleware controls public route access in [src/middleware.ts](/home/sebas-chicaiza/landing-nexal/src/middleware.ts:5).
- Sitemap generation is in [src/app/sitemap.ts](/home/sebas-chicaiza/landing-nexal/src/app/sitemap.ts:1).
- Robots generation is in [src/app/robots.ts](/home/sebas-chicaiza/landing-nexal/src/app/robots.ts:1).
- There is no verified locale-routing system such as `/en/*` or `/es/*` in the repo.

### Canonical host facts

- Root `metadataBase` now points to apex `https://nexalforge.com` in [src/app/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/layout.tsx:25).
- Middleware still redirects `www` to apex in [src/middleware.ts](/home/sebas-chicaiza/landing-nexal/src/middleware.ts:48).
- Sitemap now uses apex in [src/app/sitemap.ts](/home/sebas-chicaiza/landing-nexal/src/app/sitemap.ts:8).
- Robots already used apex in [src/app/robots.ts](/home/sebas-chicaiza/landing-nexal/src/app/robots.ts:7).
- Stored Search Console export data under [seo-data/nexalforge.com-Performance-on-Search-2026-02-04/Pages.csv](/home/sebas-chicaiza/landing-nexal/seo-data/nexalforge.com-Performance-on-Search-2026-02-04/Pages.csv:1) shows apex URLs, which supports the apex policy.

### Product route facts

- Legacy Nexi product page still exists at [src/app/asistente-virtual-nexi/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/asistente-virtual-nexi/page.tsx:1), but Wave 1 now redirects it.
- Canonical Nexi product page now exists at [src/app/nexi/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/page.tsx:1).
- Canonical Nexi pricing route now exists at [src/app/nexi/precios/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/precios/page.tsx:1) with route-level head metadata in [src/app/nexi/precios/head.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/precios/head.tsx:1).
- Canonical flagship dental page now exists at [src/app/nexi/clinicas-odontologicas/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/clinicas-odontologicas/page.tsx:1).

### Existing long-tail pSEO facts

- The `soluciones` long-tail tree is still generated from [src/data/pSEO.json](/home/sebas-chicaiza/landing-nexal/src/data/pSEO.json).
- Dynamic routes still exist at:
  - [src/app/soluciones/[industry]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/[industry]/page.tsx:1)
  - [src/app/soluciones/[industry]/[use-case]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/[industry]/[use-case]/page.tsx:1)
- Those routes were not migrated in Wave 1.

## Flat Namespace Decision

The canonical model is now fixed as:

- `/nexi/{industry}`
- `/nexi/{industry}/{use-case}`

This was chosen over `/nexi/industrias/{industry}` because:

- it is clearer for users
- it is shorter and cleaner for SEO
- it avoids locking a taxonomy label into every canonical URL
- it still scales for future vertical and use-case pages
- an industry browse page can still exist later without owning the canonical path pattern

This is a deliberate IA choice, not a migration convenience.

## Dental as the Flagship Wedge

Dental is not treated as a generic industry template migration.

The canonical dental page is:

- `/nexi/clinicas-odontologicas`

Wave 1 preserves dental as a rich bespoke page by moving the existing tailored page into the new Nexi namespace rather than flattening it into a standard directory template.

Repo evidence for that decision:

- the bespoke dental page at [src/app/soluciones/clinicas-odontologicas/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/clinicas-odontologicas/page.tsx:1) contains materially richer commercial content than the generic dynamic industry template
- the new canonical version at [src/app/nexi/clinicas-odontologicas/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/clinicas-odontologicas/page.tsx:1) preserves that richer wedge positioning

Implication:

- dental should remain the strongest vertical landing page
- other industries can remain template-driven until a later migration is approved

## Wave 1 Scope

Wave 1 is frozen to the following implementation only.

### Included

- canonical host normalization to apex
- metadata and canonical cleanup for root, Nexi, dental, pricing, blog posts, and tag archives
- sitemap cleanup for Wave 1 canonical routes
- noindex cleanup for auth and utility routes
- route migration for:
  - `/asistente-virtual-nexi`
  - `/pricing`
  - `/soluciones/agente-soporte-ia`
  - `/soluciones/clinicas-odontologicas`
- internal linking cleanup in header, footer, homepage product CTAs, and not-found page

### Explicitly excluded

- migrating `/soluciones` itself
- migrating the rest of `/soluciones/{industry}`
- migrating `/soluciones/{industry}/{use-case}`
- retiring geo-mixed pSEO pages
- pruning `barberias`, `bufetes-abogados`, `recursos-humanos`, or other long-tail categories
- broader template consolidation

## Current Route Inventory After Wave 1

This inventory is intentionally limited to the routes that matter for Wave 1 execution and validation.

### Root / company

| Route | Status | Action | Notes |
| --- | --- | --- | --- |
| `/` | live canonical | `keep` | Company-level Nexal Forge root |

### Nexi product

| Route | Status | Action | Notes |
| --- | --- | --- | --- |
| `/nexi` | live canonical | `keep` | Canonical Nexi product page |
| `/asistente-virtual-nexi` | legacy | `redirect` | 301 to `/nexi` |
| `/soluciones/agente-soporte-ia` | legacy overlap | `redirect` | 301 to `/nexi` |

### Pricing

| Route | Status | Action | Notes |
| --- | --- | --- | --- |
| `/nexi/precios` | live canonical | `keep` | Canonical pricing page |
| `/pricing` | legacy | `redirect` | 301 to `/nexi/precios` |

### Flagship dental

| Route | Status | Action | Notes |
| --- | --- | --- | --- |
| `/nexi/clinicas-odontologicas` | live canonical | `keep` | Canonical flagship dental page |
| `/soluciones/clinicas-odontologicas` | legacy | `redirect` | 301 to `/nexi/clinicas-odontologicas` |

### Blog

| Route | Status | Action | Notes |
| --- | --- | --- | --- |
| `/blog` | live canonical | `keep` | Still lacks page-level metadata export |
| `/blog/[slug]` | live canonical | `keep` | Explicit canonical added in Wave 1 |
| `/blog/etiqueta/[slug]` | utility archive | `noindex` | Kept as utility route |

### Legal

| Route | Status | Action | Notes |
| --- | --- | --- | --- |
| `/privacy` | live canonical | `keep` | unchanged |
| `/terms` | live canonical | `keep` | unchanged |
| `/refunds` | live canonical | `keep` | unchanged |
| `/cookies` | live canonical | `keep` | unchanged |

### Auth / utility

| Route | Status | Action | Notes |
| --- | --- | --- | --- |
| `/login` | live utility route | `noindex` | now has head-level noindex |
| `/forgot-password` | live utility route | `noindex` | page metadata now sets noindex/nofollow |
| `/demo-1` | live utility route | `noindex` | now has head-level noindex |

### Deferred long-tail routes

| Route family | Status | Action |
| --- | --- | --- |
| `/soluciones` | deferred | `unchanged in Wave 1` |
| `/soluciones/{industry}` | deferred | `unchanged in Wave 1` |
| `/soluciones/{industry}/{use-case}` | deferred | `unchanged in Wave 1` |

## Exact Wave 1 Redirect Map

Only the following new redirects were implemented for this wave.

| Old URL | New URL | Classification | Reason |
| --- | --- | --- | --- |
| `/asistente-virtual-nexi` | `/nexi` | safe exact-ish redirect | move core product page into product namespace |
| `/pricing` | `/nexi/precios` | safe exact-ish redirect | move product pricing under Nexi |
| `/soluciones/agente-soporte-ia` | `/nexi` | merge redirect | remove overlap with main Nexi product page |
| `/soluciones/clinicas-odontologicas` | `/nexi/clinicas-odontologicas` | safe exact-ish redirect | move flagship dental page into canonical product namespace |

Existing legal redirects remain in place and were not materially changed by this wave.

## Metadata, Canonical, Sitemap, and Noindex Cleanup

### Canonical host policy

Wave 1 standardizes on:

- `https://nexalforge.com`

Files updated to support that policy:

- [src/app/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/layout.tsx:25)
- [src/app/sitemap.ts](/home/sebas-chicaiza/landing-nexal/src/app/sitemap.ts:8)
- [src/app/blog/[slug]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/blog/[slug]/page.tsx:189)
- [src/app/soluciones/[industry]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/[industry]/page.tsx:1)
- [src/app/soluciones/[industry]/[use-case]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/[industry]/[use-case]/page.tsx:1)
- [src/lib/pseo-schemas.ts](/home/sebas-chicaiza/landing-nexal/src/lib/pseo-schemas.ts:1)
- [src/app/nexi/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/page.tsx:1)
- [src/app/nexi/clinicas-odontologicas/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/clinicas-odontologicas/page.tsx:1)
- [src/app/nexi/precios/head.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/precios/head.tsx:1)

### Canonical generation

Wave 1 canonical targets now behave as follows:

- `/` canonical remains root via shared metadata in [src/app/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/layout.tsx:34)
- `/nexi` self-canonicalizes in [src/app/nexi/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/page.tsx:25)
- `/nexi/clinicas-odontologicas` self-canonicalizes in [src/app/nexi/clinicas-odontologicas/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/clinicas-odontologicas/page.tsx:19)
- `/nexi/precios` now has explicit canonical markup in [src/app/nexi/precios/head.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/precios/head.tsx:1)
- `/blog/[slug]` now self-canonicalizes in [src/app/blog/[slug]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/blog/[slug]/page.tsx:189)
- `/blog/etiqueta/[slug]` is now treated as a noindex utility archive instead of canonicalizing to a query URL in [src/app/blog/etiqueta/[slug]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/blog/etiqueta/[slug]/page.tsx:6)

### Sitemap cleanup

Wave 1 sitemap changes in [src/app/sitemap.ts](/home/sebas-chicaiza/landing-nexal/src/app/sitemap.ts:1):

- added `/nexi`
- added `/nexi/precios`
- added `/nexi/clinicas-odontologicas`
- removed `/pricing`
- removed `/forgot-password`
- changed host to apex

Deferred by design:

- `/soluciones`
- dynamic `/soluciones/{industry}`
- dynamic `/soluciones/{industry}/{use-case}`

Those URLs remain in the sitemap because Wave 2 is not yet approved.

### Robots and noindex cleanup

- Robots sitemap reference remains apex in [src/app/robots.ts](/home/sebas-chicaiza/landing-nexal/src/app/robots.ts:1).
- `/forgot-password` now has `index: false, follow: false` in [src/app/forgot-password/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/forgot-password/page.tsx:4).
- `/login` now has noindex markup in [src/app/login/head.tsx](/home/sebas-chicaiza/landing-nexal/src/app/login/head.tsx:1).
- `/demo-1` now has noindex markup in [src/app/demo-1/head.tsx](/home/sebas-chicaiza/landing-nexal/src/app/demo-1/head.tsx:1).

## Internal Linking Cleanup

Wave 1 updated the main internal links that still pointed to legacy Nexi URLs.

Updated files:

- [src/components/StickyHeader.tsx](/home/sebas-chicaiza/landing-nexal/src/components/StickyHeader.tsx:1)
- [src/components/Footer.tsx](/home/sebas-chicaiza/landing-nexal/src/components/Footer.tsx:1)
- [src/components/NexalForgeLandingWireframe.tsx](/home/sebas-chicaiza/landing-nexal/src/components/NexalForgeLandingWireframe.tsx:1)
- [src/components/ServiciosSection.tsx](/home/sebas-chicaiza/landing-nexal/src/components/ServiciosSection.tsx:1)
- [src/app/not-found.tsx](/home/sebas-chicaiza/landing-nexal/src/app/not-found.tsx:1)

Effective changes:

- primary product links now point to `/nexi`
- pricing link now points to `/nexi/precios`
- the header support-agent link now points to `/nexi`
- the main Nexi page now links to the flagship dental page at `/nexi/clinicas-odontologicas`

## Evidence Boundary

### What the repo proves

- the site structure and route ownership model
- the previous host inconsistency between `www` and apex
- that `/asistente-virtual-nexi`, `/pricing`, and `/soluciones/agente-soporte-ia` were overlapping product surfaces
- that dental had a richer bespoke page than the generic industry templates
- that auth and utility routes needed indexation control

### What in-repo Search Console exports prove

- apex URLs are the surfaced host format
- `/login` had impressions and therefore warranted explicit noindex handling
- historical visibility existed for at least `/`, `/asistente-virtual-nexi`, `/blog`, and `/soluciones/agente-soporte-ia`

### What remains unknown

- the traffic and backlink value of the long-tail `soluciones/{industry}` and `soluciones/{industry}/{use-case}` routes
- whether geo-mixed pages should be retired, merged, or preserved
- whether overlapping categories like `barberias` materially outperform adjacent categories

That uncertainty is exactly why those pages were left out of Wave 1.

## Validation Checklist for Wave 1

### Route checks

- verify `301` for:
  - `/asistente-virtual-nexi`
  - `/pricing`
  - `/soluciones/agente-soporte-ia`
  - `/soluciones/clinicas-odontologicas`
- verify `200` for:
  - `/nexi`
  - `/nexi/precios`
  - `/nexi/clinicas-odontologicas`

### Canonical checks

- confirm root outputs apex host
- confirm `/nexi` canonical is `/nexi`
- confirm `/nexi/precios` canonical is `https://nexalforge.com/nexi/precios`
- confirm `/nexi/clinicas-odontologicas` canonical is `/nexi/clinicas-odontologicas`
- confirm `/blog/[slug]` self-canonicalizes
- confirm `/blog/etiqueta/[slug]` is noindex

### Sitemap checks

- confirm sitemap host is apex
- confirm sitemap includes:
  - `/nexi`
  - `/nexi/precios`
  - `/nexi/clinicas-odontologicas`
- confirm sitemap excludes:
  - `/pricing`
  - `/forgot-password`

### Noindex checks

- confirm `/login` returns `noindex,nofollow`
- confirm `/forgot-password` returns noindex metadata
- confirm `/demo-1` returns `noindex,nofollow`

### Internal link checks

- confirm header points to `/nexi`
- confirm footer pricing points to `/nexi/precios`
- confirm homepage product CTAs point to `/nexi`
- confirm not-found page CTA points to `/nexi`

### Monitoring checks

- inspect the four redirected legacy URLs in Search Console after deploy
- compare indexed-page behavior for `/nexi`, `/nexi/precios`, and `/nexi/clinicas-odontologicas`
- monitor 7-day, 14-day, and 28-day deltas for clicks and impressions on:
  - `/nexi`
  - `/nexi/precios`
  - `/nexi/clinicas-odontologicas`
  - legacy `/asistente-virtual-nexi`
  - legacy `/soluciones/agente-soporte-ia`

## Final Decisions Required Before Wave 2

Wave 1 does not require new IA decisions beyond what is now implemented. The remaining decisions are for any later migration:

1. approve whether `/soluciones` itself should later redirect to `/nexi` or to a future browse hub
2. decide whether `barberias` stays separate or merges into `peluquerias-spas`
3. decide whether sensitive categories like `bufetes-abogados` and `recursos-humanos` remain live
4. approve the geo-page retirement and redirect policy for `doctores-quito/*` and `pymes-ecuador/*`
5. approve migration of the remaining `/soluciones/{industry}` and `/soluciones/{industry}/{use-case}` tree into the flat `/nexi/{industry}` model
