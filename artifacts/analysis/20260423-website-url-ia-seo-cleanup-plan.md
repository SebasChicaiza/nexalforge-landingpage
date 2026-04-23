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

Wave 2 is now defined in this artifact as a bounded migration plan only. The dynamic `soluciones/*` pSEO tree still exists in the repo and still serves as-is until Wave 2 is explicitly approved and implemented.

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
- Middleware still redirects `www` to apex in [src/middleware.ts](/home/sebas-chicaiza/landing-nexal/src/middleware.ts:44).
- Sitemap now uses apex in [src/app/sitemap.ts](/home/sebas-chicaiza/landing-nexal/src/app/sitemap.ts:8).
- Robots already uses apex in [src/app/robots.ts](/home/sebas-chicaiza/landing-nexal/src/app/robots.ts:4).
- Stored Search Console export data under [seo-data/nexalforge.com-Performance-on-Search-2026-02-04/Pages.csv](/home/sebas-chicaiza/landing-nexal/seo-data/nexalforge.com-Performance-on-Search-2026-02-04/Pages.csv:1) shows apex URLs, which supports the apex policy.

### Product route facts

- Legacy Nexi product page still exists at [src/app/asistente-virtual-nexi/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/asistente-virtual-nexi/page.tsx:1), but Wave 1 now redirects it.
- Canonical Nexi product page now exists at [src/app/nexi/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/page.tsx:1).
- Canonical Nexi pricing route now exists at [src/app/nexi/precios/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/precios/page.tsx:1) with route-level metadata in [src/app/nexi/precios/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/precios/layout.tsx:1).
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

## Current State After Wave 1

### Already migrated or replaced

| Route | Current behavior | Wave status |
| --- | --- | --- |
| `/nexi` | live canonical | Wave 1 complete |
| `/nexi/precios` | live canonical | Wave 1 complete |
| `/nexi/clinicas-odontologicas` | live canonical | Wave 1 complete |
| `/asistente-virtual-nexi` | redirects to `/nexi` | Wave 1 complete |
| `/pricing` | redirects to `/nexi/precios` | Wave 1 complete |
| `/soluciones/agente-soporte-ia` | redirects to `/nexi` | Wave 1 complete |
| `/soluciones/clinicas-odontologicas` | redirects to `/nexi/clinicas-odontologicas` | Wave 1 complete |

### Still legacy and therefore Wave 2

| Route family | Current behavior |
| --- | --- |
| `/soluciones` | live legacy hub, still linked and still in sitemap |
| `/soluciones/{industry}` | live legacy industry parent pages |
| `/soluciones/{industry}/{use-case}` | live legacy use-case pages |

## Metadata, Canonical, Sitemap, and Noindex State

### Canonical host policy

The canonical host policy remains:

- `https://nexalforge.com`

Current supporting files:

- [src/app/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/layout.tsx:25)
- [src/app/sitemap.ts](/home/sebas-chicaiza/landing-nexal/src/app/sitemap.ts:8)
- [src/app/robots.ts](/home/sebas-chicaiza/landing-nexal/src/app/robots.ts:1)
- [src/lib/pseo-schemas.ts](/home/sebas-chicaiza/landing-nexal/src/lib/pseo-schemas.ts:1)
- [src/app/blog/[slug]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/blog/[slug]/page.tsx:1)

### Current route-level metadata ownership

- `/nexi/precios` metadata is owned by [src/app/nexi/precios/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/nexi/precios/layout.tsx:1)
- `/blog` metadata is owned by [src/app/blog/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/blog/page.tsx:1)
- `/blog/etiqueta/[slug]` metadata is owned by [src/app/blog/etiqueta/[slug]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/blog/etiqueta/[slug]/page.tsx:1)
- `/login` metadata is owned by [src/app/login/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/login/layout.tsx:1)
- `/forgot-password` metadata is owned by [src/app/forgot-password/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/forgot-password/page.tsx:1)
- `/demo-1` metadata is owned by [src/app/demo-1/layout.tsx](/home/sebas-chicaiza/landing-nexal/src/app/demo-1/layout.tsx:1)

### Remaining Wave 2 contradictions

- sitemap still emits the legacy `/soluciones` hub and legacy dynamic `/soluciones` tree in [src/app/sitemap.ts](/home/sebas-chicaiza/landing-nexal/src/app/sitemap.ts:57)
- pSEO canonicals and Open Graph URLs still point to `/soluciones/...` in [src/app/soluciones/[industry]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/[industry]/page.tsx:31) and [src/app/soluciones/[industry]/[use-case]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/[industry]/[use-case]/page.tsx:79)
- pSEO schema URLs still point to `/soluciones/...` in [src/lib/pseo-schemas.ts](/home/sebas-chicaiza/landing-nexal/src/lib/pseo-schemas.ts:6)
- header and related-link sources still point to `/soluciones` in [src/components/StickyHeader.tsx](/home/sebas-chicaiza/landing-nexal/src/components/StickyHeader.tsx:20), [src/components/pseo/PseoRelatedSection.tsx](/home/sebas-chicaiza/landing-nexal/src/components/pseo/PseoRelatedSection.tsx:44), and [src/app/blog/[slug]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/blog/[slug]/page.tsx:1)

## Evidence Boundary

### What the repo proves

- the current `/soluciones` route tree and all remaining legacy slug combinations
- the exact canonical, sitemap, schema, breadcrumb, and internal-link behavior still tied to `/soluciones`
- that dental was already handled as a bespoke Wave 1 flagship

### What the checked-in SEO exports prove

- apex URLs are the surfaced host format
- the stored Search Console page export is sparse for `/soluciones`; I could verify only one legacy `/soluciones` page in [Pages.csv](/home/sebas-chicaiza/landing-nexal/seo-data/nexalforge.com-Performance-on-Search-2026-02-04/Pages.csv:6)
- this is enough to show some historical visibility existed, but not enough to rank all remaining `pSEO` pages by traffic value

### What remains unknown without live data

- current impressions and clicks for most remaining `/soluciones/{industry}` and `/soluciones/{industry}/{use-case}` URLs
- backlink concentration on specific long-tail pages
- whether any overlap-risk or geo-mixed pages materially outperform their cleaner replacements

Implication:

- taxonomy-quality judgments can be made now
- traffic-value judgments remain low-confidence for most Wave 2 pages

## Wave 2 Final Implementation Plan

### Current Wave 2 Route Inventory

#### Legacy hub

- `/soluciones`

#### Remaining legacy industry parents

- `/soluciones/barberias`
- `/soluciones/bufetes-abogados`
- `/soluciones/clinicas-medicas`
- `/soluciones/doctores-quito`
- `/soluciones/ecommerce`
- `/soluciones/inmobiliarias`
- `/soluciones/peluquerias-spas`
- `/soluciones/pymes-ecuador`
- `/soluciones/recursos-humanos`
- `/soluciones/restaurantes`

Note:

- `/soluciones/clinicas-odontologicas` is not part of Wave 2. It already redirects to `/nexi/clinicas-odontologicas`.

#### Remaining legacy use-case children

- `/soluciones/barberias/agenda-whatsapp`
- `/soluciones/barberias/reactivacion-clientes`
- `/soluciones/barberias/recordatorios-citas`
- `/soluciones/bufetes-abogados/actualizacion-estado-casos`
- `/soluciones/bufetes-abogados/ingesta-clientes`
- `/soluciones/clinicas-medicas/agendamiento-citas`
- `/soluciones/clinicas-medicas/recordatorios-medicacion`
- `/soluciones/clinicas-odontologicas/agendamiento-citas`
- `/soluciones/clinicas-odontologicas/seguimiento-postoperatorio`
- `/soluciones/doctores-quito/agenda-medica`
- `/soluciones/doctores-quito/recordatorios-controles`
- `/soluciones/doctores-quito/seguimiento-pacientes`
- `/soluciones/ecommerce/recuperacion-carritos-abandonados`
- `/soluciones/ecommerce/soporte-postventa-pedidos`
- `/soluciones/inmobiliarias/agendamiento-visitas-propiedades`
- `/soluciones/inmobiliarias/calificacion-leads`
- `/soluciones/peluquerias-spas/agenda-whatsapp`
- `/soluciones/peluquerias-spas/recordatorios-citas`
- `/soluciones/peluquerias-spas/seguimiento-post-servicio`
- `/soluciones/pymes-ecuador/atencion-cliente`
- `/soluciones/pymes-ecuador/cobranzas-recordatorios`
- `/soluciones/pymes-ecuador/ventas-whatsapp`
- `/soluciones/recursos-humanos/coordinacion-entrevistas`
- `/soluciones/recursos-humanos/filtrado-candidatos`
- `/soluciones/restaurantes/lista-espera-mesas`
- `/soluciones/restaurantes/pedidos-whatsapp`
- `/soluciones/restaurantes/reservas-whatsapp`

#### Geo-mixed pages

- `/soluciones/doctores-quito`
- `/soluciones/doctores-quito/agenda-medica`
- `/soluciones/doctores-quito/recordatorios-controles`
- `/soluciones/doctores-quito/seguimiento-pacientes`
- `/soluciones/pymes-ecuador`
- `/soluciones/pymes-ecuador/atencion-cliente`
- `/soluciones/pymes-ecuador/cobranzas-recordatorios`
- `/soluciones/pymes-ecuador/ventas-whatsapp`

#### Overlap-risk categories

- `barberias`
- `peluquerias-spas`

#### Sensitive-category pages

- `bufetes-abogados`
- `recursos-humanos`

### Recommendation Matrix

Confidence scale:

- `high`: strong repo-backed taxonomy recommendation
- `medium`: reasonable migration recommendation, but live traffic could still change the redirect choice
- `low`: requires human/product approval or live traffic evidence

| Current URL | Recommended action | Proposed canonical target | Reason | Confidence |
| --- | --- | --- | --- | --- |
| `/soluciones` | retire | `/nexi` | closest canonical product parent after flat migration; avoid preserving a second top-level solution namespace | high |
| `/soluciones/clinicas-medicas` | keep and migrate | `/nexi/clinicas-medicas` | clean non-geo vertical | high |
| `/soluciones/clinicas-medicas/agendamiento-citas` | keep and migrate | `/nexi/clinicas-medicas/agendamiento-citas` | clean non-geo use case | high |
| `/soluciones/clinicas-medicas/recordatorios-medicacion` | keep and migrate | `/nexi/clinicas-medicas/recordatorios-medicacion` | clean non-geo use case | high |
| `/soluciones/clinicas-odontologicas/agendamiento-citas` | keep and migrate | `/nexi/clinicas-odontologicas/agendamiento-citas` | valid child under the approved flagship namespace | medium |
| `/soluciones/clinicas-odontologicas/seguimiento-postoperatorio` | keep and migrate | `/nexi/clinicas-odontologicas/seguimiento-postoperatorio` | valid child under the approved flagship namespace | medium |
| `/soluciones/inmobiliarias` | keep and migrate | `/nexi/inmobiliarias` | clean non-geo vertical | high |
| `/soluciones/inmobiliarias/agendamiento-visitas-propiedades` | keep and migrate | `/nexi/inmobiliarias/agendamiento-visitas-propiedades` | clean non-geo use case | high |
| `/soluciones/inmobiliarias/calificacion-leads` | keep and migrate | `/nexi/inmobiliarias/calificacion-leads` | clean non-geo use case | high |
| `/soluciones/ecommerce` | keep and migrate | `/nexi/ecommerce` | clean non-geo vertical | high |
| `/soluciones/ecommerce/recuperacion-carritos-abandonados` | keep and migrate | `/nexi/ecommerce/recuperacion-carritos-abandonados` | clean non-geo use case | high |
| `/soluciones/ecommerce/soporte-postventa-pedidos` | keep and migrate | `/nexi/ecommerce/soporte-postventa-pedidos` | clean non-geo use case | high |
| `/soluciones/restaurantes` | keep and migrate | `/nexi/restaurantes` | clean non-geo vertical | high |
| `/soluciones/restaurantes/lista-espera-mesas` | keep and migrate | `/nexi/restaurantes/lista-espera-mesas` | clean non-geo use case | high |
| `/soluciones/restaurantes/pedidos-whatsapp` | keep and migrate | `/nexi/restaurantes/pedidos-whatsapp` | clean non-geo use case | high |
| `/soluciones/restaurantes/reservas-whatsapp` | keep and migrate | `/nexi/restaurantes/reservas-whatsapp` | clean non-geo use case | high |
| `/soluciones/peluquerias-spas` | keep and migrate | `/nexi/peluquerias-spas` | stronger umbrella vertical than barberias | high |
| `/soluciones/peluquerias-spas/agenda-whatsapp` | keep and migrate | `/nexi/peluquerias-spas/agenda-whatsapp` | clean non-geo use case | high |
| `/soluciones/peluquerias-spas/recordatorios-citas` | keep and migrate | `/nexi/peluquerias-spas/recordatorios-citas` | clean non-geo use case | high |
| `/soluciones/peluquerias-spas/seguimiento-post-servicio` | keep and migrate | `/nexi/peluquerias-spas/seguimiento-post-servicio` | clean non-geo use case | high |
| `/soluciones/barberias` | needs human decision | default `/nexi/barberias`; alternate merge to `/nexi/peluquerias-spas` | overlap exists, but repo cannot prove traffic value for a forced merge | low |
| `/soluciones/barberias/agenda-whatsapp` | needs human decision | default `/nexi/barberias/agenda-whatsapp`; alternate merge to `/nexi/peluquerias-spas/agenda-whatsapp` | overlap exists, but exact migration depends on approval | low |
| `/soluciones/barberias/recordatorios-citas` | needs human decision | default `/nexi/barberias/recordatorios-citas`; alternate merge to `/nexi/peluquerias-spas/recordatorios-citas` | overlap exists, but exact migration depends on approval | low |
| `/soluciones/barberias/reactivacion-clientes` | needs human decision | default `/nexi/barberias/reactivacion-clientes`; alternate retire to `/nexi/peluquerias-spas` | no exact peluquerias-spas equivalent exists | low |
| `/soluciones/doctores-quito` | retire | `/nexi/clinicas-medicas` | geo-mixed pseudo-segment; closest non-geo medical parent is safer than a narrower redirect | medium |
| `/soluciones/doctores-quito/agenda-medica` | retire | `/nexi/clinicas-medicas` | mapping to a narrower use case would overstate equivalence | medium |
| `/soluciones/doctores-quito/recordatorios-controles` | retire | `/nexi/clinicas-medicas` | same reason; parent-level redirect is safer | medium |
| `/soluciones/doctores-quito/seguimiento-pacientes` | retire | `/nexi/clinicas-medicas` | same reason; parent-level redirect is safer | medium |
| `/soluciones/pymes-ecuador` | retire | `/nexi` | mixed geo/business-size segment with no clean canonical vertical equivalent | medium |
| `/soluciones/pymes-ecuador/atencion-cliente` | retire | `/nexi` | cross-industry geo intent; direct use-case equivalence is not proven | medium |
| `/soluciones/pymes-ecuador/cobranzas-recordatorios` | retire | `/nexi` | same reason; parent-level redirect is safer | medium |
| `/soluciones/pymes-ecuador/ventas-whatsapp` | retire | `/nexi` | same reason; parent-level redirect is safer | medium |
| `/soluciones/bufetes-abogados` | needs human decision | default retire to `/nexi`; alternate keep at `/nexi/bufetes-abogados` | sensitive legal-service positioning needs product-truth approval | low |
| `/soluciones/bufetes-abogados/actualizacion-estado-casos` | needs human decision | default retire to `/nexi`; alternate keep at `/nexi/bufetes-abogados/actualizacion-estado-casos` | legal workflow claims may be commercially sensitive | low |
| `/soluciones/bufetes-abogados/ingesta-clientes` | needs human decision | default retire to `/nexi`; alternate keep at `/nexi/bufetes-abogados/ingesta-clientes` | legal workflow claims may be commercially sensitive | low |
| `/soluciones/recursos-humanos` | needs human decision | default retire to `/nexi`; alternate keep at `/nexi/recursos-humanos` | HR workflow claims need commercial and compliance approval | low |
| `/soluciones/recursos-humanos/coordinacion-entrevistas` | needs human decision | default retire to `/nexi`; alternate keep at `/nexi/recursos-humanos/coordinacion-entrevistas` | HR workflow claims need approval | low |
| `/soluciones/recursos-humanos/filtrado-candidatos` | needs human decision | default retire to `/nexi`; alternate keep at `/nexi/recursos-humanos/filtrado-candidatos` | HR workflow claims need approval | low |

### Exact Wave 2 Redirect Map

#### Core hub redirect

| Old URL | New URL | Redirect class | Notes |
| --- | --- | --- | --- |
| `/soluciones` | `/nexi` | safer parent-level redirect | recommended flat-model hub retirement |

#### Safe exact-ish non-geo parent redirects

| Old URL | New URL | Redirect class |
| --- | --- | --- |
| `/soluciones/clinicas-medicas` | `/nexi/clinicas-medicas` | exact-ish safe redirect |
| `/soluciones/inmobiliarias` | `/nexi/inmobiliarias` | exact-ish safe redirect |
| `/soluciones/ecommerce` | `/nexi/ecommerce` | exact-ish safe redirect |
| `/soluciones/restaurantes` | `/nexi/restaurantes` | exact-ish safe redirect |
| `/soluciones/peluquerias-spas` | `/nexi/peluquerias-spas` | exact-ish safe redirect |

#### Safe exact-ish non-geo child redirects

| Old URL | New URL | Redirect class |
| --- | --- | --- |
| `/soluciones/clinicas-medicas/agendamiento-citas` | `/nexi/clinicas-medicas/agendamiento-citas` | exact-ish safe redirect |
| `/soluciones/clinicas-medicas/recordatorios-medicacion` | `/nexi/clinicas-medicas/recordatorios-medicacion` | exact-ish safe redirect |
| `/soluciones/clinicas-odontologicas/agendamiento-citas` | `/nexi/clinicas-odontologicas/agendamiento-citas` | exact-ish safe redirect |
| `/soluciones/clinicas-odontologicas/seguimiento-postoperatorio` | `/nexi/clinicas-odontologicas/seguimiento-postoperatorio` | exact-ish safe redirect |
| `/soluciones/inmobiliarias/agendamiento-visitas-propiedades` | `/nexi/inmobiliarias/agendamiento-visitas-propiedades` | exact-ish safe redirect |
| `/soluciones/inmobiliarias/calificacion-leads` | `/nexi/inmobiliarias/calificacion-leads` | exact-ish safe redirect |
| `/soluciones/ecommerce/recuperacion-carritos-abandonados` | `/nexi/ecommerce/recuperacion-carritos-abandonados` | exact-ish safe redirect |
| `/soluciones/ecommerce/soporte-postventa-pedidos` | `/nexi/ecommerce/soporte-postventa-pedidos` | exact-ish safe redirect |
| `/soluciones/peluquerias-spas/agenda-whatsapp` | `/nexi/peluquerias-spas/agenda-whatsapp` | exact-ish safe redirect |
| `/soluciones/peluquerias-spas/recordatorios-citas` | `/nexi/peluquerias-spas/recordatorios-citas` | exact-ish safe redirect |
| `/soluciones/peluquerias-spas/seguimiento-post-servicio` | `/nexi/peluquerias-spas/seguimiento-post-servicio` | exact-ish safe redirect |
| `/soluciones/restaurantes/lista-espera-mesas` | `/nexi/restaurantes/lista-espera-mesas` | exact-ish safe redirect |
| `/soluciones/restaurantes/pedidos-whatsapp` | `/nexi/restaurantes/pedidos-whatsapp` | exact-ish safe redirect |
| `/soluciones/restaurantes/reservas-whatsapp` | `/nexi/restaurantes/reservas-whatsapp` | exact-ish safe redirect |

#### Conservative geo-mixed redirects

| Old URL | New URL | Redirect class | Why not narrower |
| --- | --- | --- | --- |
| `/soluciones/doctores-quito` | `/nexi/clinicas-medicas` | safer parent-level redirect | geo + persona mixed; parent is more defensible than a use-case match |
| `/soluciones/doctores-quito/agenda-medica` | `/nexi/clinicas-medicas` | safer parent-level redirect | mapping to `agendamiento-citas` would overstate equivalence |
| `/soluciones/doctores-quito/recordatorios-controles` | `/nexi/clinicas-medicas` | safer parent-level redirect | no exact non-geo equivalent exists |
| `/soluciones/doctores-quito/seguimiento-pacientes` | `/nexi/clinicas-medicas` | safer parent-level redirect | no exact non-geo equivalent exists |
| `/soluciones/pymes-ecuador` | `/nexi` | safer parent-level redirect | mixed geo/business-size segment has no clean canonical vertical |
| `/soluciones/pymes-ecuador/atencion-cliente` | `/nexi` | safer parent-level redirect | no direct canonical equivalent exists in the approved flat tree |
| `/soluciones/pymes-ecuador/cobranzas-recordatorios` | `/nexi` | safer parent-level redirect | same reason |
| `/soluciones/pymes-ecuador/ventas-whatsapp` | `/nexi` | safer parent-level redirect | same reason |

#### Redirects that remain judgment calls

| Old URL | Recommended target | Redirect class | Why still a judgment call |
| --- | --- | --- | --- |
| `/soluciones/barberias` | `/nexi/barberias` by default | uncertain / requires approval | overlap exists with `peluquerias-spas`, but repo cannot prove which asset has more equity |
| `/soluciones/barberias/agenda-whatsapp` | `/nexi/barberias/agenda-whatsapp` by default | uncertain / requires approval | could merge to peluquerias-spas if that category wins |
| `/soluciones/barberias/recordatorios-citas` | `/nexi/barberias/recordatorios-citas` by default | uncertain / requires approval | same issue |
| `/soluciones/barberias/reactivacion-clientes` | `/nexi/barberias/reactivacion-clientes` by default | uncertain / requires approval | no exact peluquerias-spas equivalent exists |
| `/soluciones/bufetes-abogados` | `/nexi` by default | uncertain / requires approval | depends on whether legal vertical claims are approved to stay live |
| `/soluciones/bufetes-abogados/actualizacion-estado-casos` | `/nexi` by default | uncertain / requires approval | same issue |
| `/soluciones/bufetes-abogados/ingesta-clientes` | `/nexi` by default | uncertain / requires approval | same issue |
| `/soluciones/recursos-humanos` | `/nexi` by default | uncertain / requires approval | depends on whether HR vertical claims are approved to stay live |
| `/soluciones/recursos-humanos/coordinacion-entrevistas` | `/nexi` by default | uncertain / requires approval | same issue |
| `/soluciones/recursos-humanos/filtrado-candidatos` | `/nexi` by default | uncertain / requires approval | same issue |

### Overlap and Sensitive-Category Decisions

#### `barberias` vs `peluquerias-spas`

Taxonomy-quality judgment:

- `peluquerias-spas` is the stronger umbrella category
- `barberias` clearly overlaps with it

Traffic-value judgment:

- repo evidence is insufficient to prove whether a forced merge is safe

Recommendation:

- safest bounded Wave 2 default: keep `barberias` separate if you want migration safety first
- cleaner long-term taxonomy option: merge into `peluquerias-spas` later if live Search Console and conversion data support consolidation

#### `bufetes-abogados`

Taxonomy-quality judgment:

- the category is understandable, but it is higher sensitivity than generic SMB verticals

Traffic-value judgment:

- repo evidence does not prove meaningful traffic value for keeping it

Product-truth / claim-sensitivity judgment:

- legal workflows imply stronger fit, accuracy, and trust claims that should be explicitly approved

Recommendation:

- safest default: retire to `/nexi`
- alternate only if approved: keep as `/nexi/bufetes-abogados` with migrated child pages

#### `recursos-humanos`

Taxonomy-quality judgment:

- the category is understandable, but it is another higher-sensitivity operational domain

Traffic-value judgment:

- repo evidence does not prove meaningful traffic value for keeping it

Product-truth / claim-sensitivity judgment:

- HR workflow claims should be explicitly approved before keeping them live

Recommendation:

- safest default: retire to `/nexi`
- alternate only if approved: keep as `/nexi/recursos-humanos` with migrated child pages

### Sitemap, Canonical, Schema, and Internal-Link Implications

Likely files or route groups that will change:

- [next.config.ts](/home/sebas-chicaiza/landing-nexal/next.config.ts:1)
- [src/app/sitemap.ts](/home/sebas-chicaiza/landing-nexal/src/app/sitemap.ts:1)
- [src/app/soluciones/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/page.tsx:1)
- [src/app/soluciones/[industry]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/[industry]/page.tsx:1)
- [src/app/soluciones/[industry]/[use-case]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/soluciones/[industry]/[use-case]/page.tsx:1)
- [src/lib/pseo-schemas.ts](/home/sebas-chicaiza/landing-nexal/src/lib/pseo-schemas.ts:1)
- [src/components/pseo/PseoRelatedSection.tsx](/home/sebas-chicaiza/landing-nexal/src/components/pseo/PseoRelatedSection.tsx:1)
- [src/components/StickyHeader.tsx](/home/sebas-chicaiza/landing-nexal/src/components/StickyHeader.tsx:1)
- [src/app/blog/[slug]/page.tsx](/home/sebas-chicaiza/landing-nexal/src/app/blog/[slug]/page.tsx:1)
- [src/data/pSEO.json](/home/sebas-chicaiza/landing-nexal/src/data/pSEO.json:1)
- [src/lib/spanish-grammar.ts](/home/sebas-chicaiza/landing-nexal/src/lib/spanish-grammar.ts:1)

Wave 2 sitemap updates:

- remove `/soluciones`
- remove all legacy `/soluciones/{industry}` entries
- remove all legacy `/soluciones/{industry}/{use-case}` entries
- add only the approved surviving `/nexi/{industry}` entries
- add only the approved surviving `/nexi/{industry}/{use-case}` entries
- exclude retired geo pages and any sensitive-category pages that are not explicitly approved to stay live

Wave 2 canonical and schema updates:

- switch pSEO canonical generation from `/soluciones/...` to `/nexi/...`
- switch Open Graph URLs from `/soluciones/...` to `/nexi/...`
- switch JSON-LD `url` values from `/soluciones/...` to `/nexi/...`
- switch breadcrumb parents from `Soluciones` to `Nexi`

Wave 2 internal-link updates:

- header links should stop pointing to `/soluciones` and `/soluciones/{slug}`
- pSEO related links should stop pointing to `/soluciones/{industry}/{use-case}`
- blog related links should stop pointing to `/soluciones`
- breadcrumb hrefs should stop pointing to `/soluciones`

What should remain untouched:

- homepage redesign or polish
- Next.js 16 upgrade work
- legal page structure
- Wave 1 core Nexi routes unless a direct contradiction is found

### Wave 2 Validation Plan

#### Build checks

- run full production build
- confirm no route-generation errors for the approved surviving `/nexi/{industry}` and `/nexi/{industry}/{use-case}` pages
- confirm retired or removed categories no longer generate sitemap entries

#### Redirect checks

- verify every legacy `/soluciones` URL in the approved map returns a single-hop permanent redirect
- confirm no redirect chains from `/soluciones/*`
- spot-check at minimum:
  - `/soluciones`
  - `/soluciones/clinicas-medicas`
  - `/soluciones/clinicas-medicas/agendamiento-citas`
  - `/soluciones/clinicas-odontologicas/agendamiento-citas`
  - `/soluciones/doctores-quito`
  - `/soluciones/doctores-quito/agenda-medica`
  - `/soluciones/pymes-ecuador`
  - `/soluciones/pymes-ecuador/ventas-whatsapp`
  - `/soluciones/barberias`
  - `/soluciones/bufetes-abogados`
  - `/soluciones/recursos-humanos`

#### Canonical checks

- verify each surviving `/nexi/{industry}` self-canonicalizes
- verify each surviving `/nexi/{industry}/{use-case}` self-canonicalizes
- verify no surviving page still emits `/soluciones/...` canonical or Open Graph URLs

#### Sitemap checks

- confirm sitemap contains no legacy `/soluciones` URLs after rollout
- confirm sitemap contains only the approved surviving `/nexi/...` URLs
- confirm retired geo and unapproved sensitive categories are absent

#### Internal-link checks

- confirm header no longer links to `/soluciones`
- confirm pSEO related links no longer link to `/soluciones`
- confirm blog related links no longer link to `/soluciones`
- confirm breadcrumbs use Nexi parent paths

#### Search Console monitoring

7-day check:

- inspect redirect recognition for a sample of migrated URLs
- compare impressions and clicks for migrated route groups
- watch for `Page with redirect`, `Alternate page with proper canonical tag`, and `Crawled - currently not indexed`

14-day check:

- compare old `/soluciones` impressions against new `/nexi/...` impressions by template family
- review excluded pages for unexpected indexation of retired geo or sensitive pages
- review any soft-404 signals

28-day check:

- compare landing-page groups by family:
  - medical
  - dental
  - inmobiliarias
  - ecommerce
  - restaurantes
  - beauty
  - geo-retired
  - sensitive retired or sensitive kept
- decide whether any low-confidence keep/retire choices need follow-up from live data

## Final Human Decisions Still Required Before Wave 2 Implementation

1. Confirm `/soluciones` should retire to `/nexi`, not remain as a separate hub.
2. Decide whether `barberias` stays separate or merges into `peluquerias-spas`.
3. Approve the conservative geo redirect policy:
   - `doctores-quito/*` -> `/nexi/clinicas-medicas`
   - `pymes-ecuador/*` -> `/nexi`
4. Decide whether `bufetes-abogados` stays live under `/nexi` or retires to `/nexi`.
5. Decide whether `recursos-humanos` stays live under `/nexi` or retires to `/nexi`.
6. Confirm dental child pages should migrate under the flagship dental namespace rather than be retired.
