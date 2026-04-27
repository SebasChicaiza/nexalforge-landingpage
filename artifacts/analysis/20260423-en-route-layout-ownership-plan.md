# English Route Layout Ownership Plan

## Executive Summary

The current English-route solution works functionally, but it assigns document-language ownership to `src/proxy.ts` and makes the global root layout depend on `headers()`. In this repo, that is the wrong long-term boundary.

The strongest long-term model is to move language ownership into App Router structure by introducing separate root-layout ownership with route groups:

- one Spanish root layout for the existing non-`/en` site
- one English root layout for the `/en/*` subtree

This keeps `proxy.ts` focused on request-boundary concerns, lets each language branch own its own `<html lang>`, and scales cleanly from one English route to `/en/nexi` and `/en/nexi/pricing` later.

The main tradeoff is that moving between Spanish and English root layouts will cause a full page reload, which is expected behavior for multiple root layouts in Next.js. For cross-language navigation, that is an acceptable trade.

## Current Repo Facts

### App Router shape

Current relevant structure:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/nexi/page.tsx`
- `src/app/nexi/precios/page.tsx`
- `src/app/nexi/clinicas-odontologicas/page.tsx`
- `src/app/en/layout.tsx`
- `src/app/en/nexi/dental-clinics/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/login/layout.tsx`
- `src/app/demo-1/layout.tsx`
- `src/app/sitemap.ts`

There are no route groups today. The app uses one top-level root layout at `src/app/layout.tsx`, and all routes inherit it.

### Root layout ownership

`src/app/layout.tsx` currently owns:

- `<html>` and `<body>`
- root metadata defaults
- global analytics/bootstrap scripts
- `StickyHeader`
- `Footer`
- `FloatingWhatsApp`
- consent UI
- organization JSON-LD

This means the root layout is both the document owner and the shared marketing chrome owner.

### `/en` subtree structure

Current English subtree:

- `src/app/en/layout.tsx`
- `src/app/en/nexi/dental-clinics/page.tsx`

`src/app/en/layout.tsx` is currently a pass-through nested layout. It does not own `<html>` or `<body>`, so by itself it cannot own document language semantics.

### Current `proxy.ts` behavior

`src/proxy.ts` currently handles:

- public-route normalization for future locale prefixes via `normalizePublicPath`
- auth gating for non-public routes
- admin-role gating
- `www` to apex redirect
- request marking via `x-nf-middleware`

It now also sets `x-nf-lang: en` for `/en` and `/en/*`, which is then consumed by the root layout.

### Where `headers()` is used

Current `headers()` usage appears in:

- `src/app/layout.tsx`
- `src/app/blog/[slug]/page.tsx`

The blog post page uses `headers()` inside `recordView()` to hash IP / read user-agent for view analytics. That is page-local behavior.

The root layout uses `headers()` to read `x-nf-lang` and switch:

- `<html lang="en">` for `/en/*`
- `<html lang="es">` otherwise

### Rendering impact of the current switch

Because `headers()` is a dynamic API in Next.js, using it in the root layout opts all routes under that root into dynamic rendering. In this repo, that means the English language switch currently broadens dynamic rendering much more than necessary.

This is not hypothetical: after the current change, the build output switched from the prior static route behavior to dynamic route classification more broadly.

### Existing shared dependencies that complicate cleaner English ownership

The biggest coupling is in `src/app/layout.tsx`, which mixes:

- document ownership
- Spanish-default metadata
- shared scripts and analytics
- shared chrome that is currently Spanish in content

Specific repo-level complications:

- `src/components/StickyHeader.tsx` contains Spanish navigation labels and Spanish-first links such as `/blog`, `/nexi`, and `/nexi/precios`
- `src/components/Footer.tsx` contains Spanish labels, Spanish legal/policy wording, and Spanish-first internal links
- root metadata defaults are Spanish
- organization/schema payloads are injected from the root layout

So the problem is not only `lang`; it is that the current root layout is the single owner of all site-wide presentation defaults.

## Critique of the Current Proxy-Header Model

### What is acceptable about it

- It solved the immediate mismatch without launching a full i18n system.
- It preserved the existing `/en/*` URL strategy.
- It kept the route public and technically crawlable.
- It avoided touching page content or broad route structure.

For a short-lived cleanup, it was an efficient patch.

### What is brittle about it

- Document language depends on an out-of-band request header instead of route structure.
- The correctness of `<html lang>` now depends on middleware/proxy execution.
- Any future bypass, test harness, alternate runtime path, or partial rendering path that does not carry the header can silently regress language semantics.
- The `/en` nested layout exists but is not the real owner of the behavior, which is misleading to future maintainers.

### What it couples incorrectly

It couples presentation semantics to request-boundary infrastructure:

- `proxy.ts` should own auth/public routing/redirects and request normalization.
- document language should be owned by the route/layout branch rendering the document.

Right now the proxy is making a UI decision, and the root layout is reading request state to compensate for missing structural ownership.

### Performance and rendering consequences

The key consequence is broad dynamic rendering:

- Next.js documents `headers()` as a Dynamic API.
- Using it in a layout opts that route subtree into dynamic rendering.
- Because the current usage is in the root layout, the effect applies far beyond the English page.

In this repo, the English workaround therefore changes rendering characteristics for the whole application, not just `/en/*`.

### Long-term architecture debt as `/en` expands

As soon as `/en/nexi` and `/en/nexi/pricing` exist, the current pattern gets worse:

- more pages will rely on proxy-injected language semantics
- English metadata defaults still have no structural owner
- English chrome decisions still live outside the subtree
- future engineers will need to remember that proxy and root layout must evolve together

That is exactly the kind of cross-cutting hidden dependency that becomes costly during expansion.

## Relevant Next.js Guidance

Based on official Next.js App Router docs:

- the root layout is required and must contain `<html>` and `<body>`
- route groups can be used to define multiple root layouts
- if routes use different root layouts, navigation between them causes a full page load
- `headers()` is a Dynamic API and using it in a layout opts that route into dynamic rendering

Sources:

- Next.js route groups and multiple root layouts: https://nextjs.org/docs/app/building-your-application/routing/route-groups
- Next.js `headers()` API: https://nextjs.org/docs/app/api-reference/functions/headers
- Next.js layouts/pages: https://nextjs.org/docs/app/building-your-application/routing/defining-routes

## Architecture Options

## Option 1: Keep the current proxy-header model

### How it would work in this repo

Keep:

- `src/proxy.ts` setting `x-nf-lang` for `/en/*`
- `src/app/layout.tsx` reading `headers()` and switching `<html lang>`

Then gradually layer English chrome/metadata changes on top of the current structure.

### Pros

- lowest immediate migration cost
- no route moves required
- no duplicate root layouts
- no cross-root full reload concerns

### Cons

- wrong ownership boundary
- broad dynamic rendering remains
- proxy continues to own presentation semantics
- root layout stays overloaded
- English subtree remains structurally misleading because `src/app/en/layout.tsx` still does not actually own document semantics

### Migration cost

Low.

### Risk

Medium to high long-term architectural risk, low short-term execution risk.

### Proxy boundary fit

Poor. Proxy continues to own language semantics.

### Long-term ownership quality for `/en`

Poor.

## Option 2: Multiple root layouts via route groups

### How it would work in this repo

Restructure the app into route groups so language branches own their own root layouts.

Conceptually:

- `src/app/(es)/layout.tsx`
- `src/app/(es)/page.tsx`
- `src/app/(es)/nexi/...`
- `src/app/(en-root)/layout.tsx`
- `src/app/(en-root)/en/layout.tsx`
- `src/app/(en-root)/en/nexi/dental-clinics/page.tsx`

The top-level `src/app/layout.tsx` would be removed. Each route group root layout would contain its own `<html>` and `<body>`.

Ownership would become:

- `(es)` root layout: `<html lang="es">`
- `(en-root)` root layout: `<html lang="en">`

Shared scripts and common shell pieces can be extracted into shared components so they are imported by both root layouts without proxy involvement.

### Pros

- document language becomes structurally correct
- proxy returns to request-boundary concerns only
- no root-layout `headers()` dependency for language
- English subtree gets a real architecture owner
- English metadata defaults can live on the English branch cleanly
- scales naturally to `/en/nexi` and `/en/nexi/pricing`

### Cons

- requires route moves into groups
- shared root concerns must be extracted/reused across two root layouts
- navigation across Spanish and English root layouts will cause a full page load
- current shared chrome components are Spanish-first and need an explicit ownership decision later

### Migration cost

Medium.

### Risk

Medium implementation risk, low long-term architectural risk.

### Proxy boundary fit

Strong. Proxy can go back to auth/public/redirect concerns.

### Long-term ownership quality for `/en`

Strong.

## Option 3: Full locale-segment architecture with top-level locale modeling

### How it would work in this repo

Introduce a real locale-driven route architecture such as:

- `src/app/[locale]/...`

or a broader locale framework pattern where language branches become first-class across the app.

### Pros

- very explicit locale modeling
- potentially consistent for future multilingual growth
- can centralize locale-aware metadata and chrome decisions

### Cons

- significantly broader than current needs
- would likely force URL, routing, and metadata decisions well beyond the approved `/en/*` subtree model
- adds conceptual and migration cost before the product surface justifies it
- risks turning a bounded English rollout into a full i18n program

### Migration cost

High.

### Risk

High relative to current scope.

### Proxy boundary fit

Potentially good, but only after a much larger refactor.

### Long-term ownership quality for `/en`

Good in theory, but oversized for this repo and this rollout stage.

## Recommended Long-Term Model

Recommend Option 2: multiple root layouts via route groups.

### Why this is the best fit

It is the smallest architecture that gives the correct owner to document language.

It solves the real problem directly:

- language semantics belong to the route branch rendering the document
- proxy no longer needs to participate
- English metadata defaults can live with English routes
- the structure scales cleanly from one route to several English routes

It also matches the approved product model:

- explicit `/en/*` subtree
- no requirement to turn the entire site into locale-driven routing
- no need to translate the full site immediately

### Ownership model

Document language should be owned by:

- Spanish root layout for current non-English routes
- English root layout for the `/en/*` branch

Shared chrome should be owned by:

- subtree-specific layouts under each root branch

In practice:

- keep a reusable shared shell layer for analytics, consent, and common wrappers
- keep language-variant chrome decisions in the Spanish and English subtree layouts, not in proxy

Metadata defaults for English subtree pages should be owned by:

- the English branch layout under `/en`, with page-level overrides for individual routes

Proxy should continue owning:

- public vs protected route gating
- auth token checks
- admin-role checks
- redirects such as `www` to apex
- public-path normalization if still needed for auth/public access logic

Proxy should not own:

- document language
- presentation semantics
- language-specific metadata defaults

### Scaling to 3+ English routes

With separate English root-layout ownership:

- `/en/nexi`
- `/en/nexi/pricing`
- `/en/nexi/dental-clinics`

all inherit:

- `<html lang="en">`
- English subtree defaults
- English-specific chrome strategy when you are ready

No extra proxy logic is required as the subtree grows.

## Phased Migration Path

## Phase 0: Current state

### Scope

Current implementation:

- `proxy.ts` sets `x-nf-lang` for `/en/*`
- `src/app/layout.tsx` reads `headers()` and switches `<html lang>`
- `/en/nexi/dental-clinics` has page-level English metadata

### Risks

- broad dynamic rendering
- wrong ownership boundary
- hidden dependency between proxy and root layout

### Validation

- `/en/nexi/dental-clinics` returns `200`
- `<html lang="en">` is correct today

### What stays untouched

- public routing model
- existing Spanish routes
- page content/design

## Phase 1: Minimal architecture shift

### Scope

Introduce route groups and split root ownership:

- move existing Spanish site routes under a Spanish route group root layout
- move `/en/*` under an English route group root layout
- remove language switching from `src/app/layout.tsx`
- remove `x-nf-lang` injection from `src/proxy.ts`

Also extract shared root concerns from the current root layout into reusable components so both root layouts can consume them.

### Risks

- route moves can accidentally affect imports or metadata inheritance
- root-level scripts/analytics may be duplicated incorrectly if not extracted carefully
- cross-root navigation will become full-page reload behavior

### Validation

- build passes
- `/`, `/nexi`, `/nexi/clinicas-odontologicas`, and `/en/nexi/dental-clinics` all return `200`
- Spanish pages render with `<html lang="es">`
- English pages render with `<html lang="en">`
- build no longer relies on root-layout `headers()` for language

### What stays untouched

- page content
- English chrome translation
- route expansion beyond the current `/en` page
- full locale framework rollout

## Phase 2: English subtree ownership cleanup

### Scope

Within the English branch:

- define English subtree metadata defaults at the `/en` layout level
- make an explicit decision about whether English pages temporarily reuse Spanish shared chrome, use a reduced chrome, or get English-specific chrome later
- keep the English page scaffold minimal

### Risks

- if shared Spanish chrome remains, UX will still be linguistically inconsistent even though document semantics are correct
- if chrome is reduced, navigation parity may temporarily differ across branches

### Validation

- self-canonical remains correct on `/en/nexi/dental-clinics`
- no `x-default` unless intentionally introduced later
- no hreflang pairing to the Spanish dental page
- subtree metadata inheritance behaves as intended

### What stays untouched

- `/en/nexi`
- `/en/nexi/pricing`
- full translated navbar/footer rollout

## Phase 3: Future `/en` expansion readiness

### Scope

Prepare the branch to support:

- `/en/nexi`
- `/en/nexi/pricing`
- `/en/nexi/dental-clinics`

using the already-separated English root and subtree layouts.

At this phase, define:

- English navigation strategy
- English footer strategy
- subtree-level metadata defaults and canonical patterns
- whether any language switcher or cross-branch discoverability should exist

### Risks

- partial English route trees can expose Spanish-only destinations through shared chrome if not decided explicitly
- metadata consistency can drift if page conventions are not documented

### Validation

- every `/en/*` page inherits English document semantics structurally
- no proxy changes are required when new English routes are added
- shared chrome behavior is intentional rather than incidental

### What stays untouched

- broader locale framework rollout, unless future scope genuinely justifies it
- unrelated marketing/admin refactors

## Risks and Tradeoffs

- Multiple root layouts cause full page loads when navigating across language branches. This is a framework-level tradeoff documented by Next.js.
- The current root layout bundles many concerns, so the migration requires careful extraction of shared document/shell utilities.
- Keeping Spanish chrome temporarily under an English root may still be acceptable technically, but it should be treated as an explicit temporary product choice.
- The route-group migration is more structural than the current patch, so it needs disciplined verification even though the resulting architecture is simpler.

## Final Decisions Still Required Before Implementation

1. Should Spanish and English branches both reuse the same analytics/consent/document shell component, or should any of those concerns differ by language branch?
2. For the short term, should `/en/*` keep the current shared Spanish header/footer, or should the English branch use reduced chrome until real English navigation exists?
3. Do you want the English branch to own subtree metadata defaults at `src/app/(en-root)/en/layout.tsx`, or keep most metadata page-level until `/en/nexi` and `/en/nexi/pricing` exist?
4. Is the full-page reload between Spanish and English branches acceptable for your product expectations? Architecturally it is the cleanest outcome, but it should still be an explicit decision.
