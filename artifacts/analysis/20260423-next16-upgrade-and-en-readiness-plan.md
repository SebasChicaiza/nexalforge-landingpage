# Next.js 16 Upgrade And `/en` Readiness Plan

Date: 2026-04-23
Repo: `landing-nexal`
Scope: planning only, no runtime implementation

## Executive Summary

This repo is reasonably close to a bounded Next.js 16 upgrade, but it is not upgrade-ready as-is.

The mechanical blockers are clear:

- `package.json` is still on `next 15.4.10`, `react 19.1.0`, `react-dom 19.1.0`.
- The lint script still uses `next lint`, which Next.js 16 removes.
- request gating lives in `src/middleware.ts`, while Next.js 16 renames that convention to `proxy.ts`.

The main repo-specific upgrade risk is not Turbopack or App Router syntax. It is route gating and SEO correctness:

- The current public-route allowlist is hard-coded for Spanish paths only.
- A future explicit `/en/*` subtree would be treated as protected by default unless proxy matching becomes locale-aware.
- Sitemap and metadata are currently Spanish-first and do not yet have an English alternates architecture.

Recommendation:

1. Execute a bounded Next.js 16 upgrade now.
2. Include a small amount of `/en` shaping during that upgrade only where it prevents rework:
   - make proxy/public-route logic compatible with a future explicit `/en` prefix
   - avoid introducing any Next 16 changes that assume Spanish-only forever
3. Do not launch `/en`, locale redirects, hreflang rollout, or English sitemap entries in this upgrade.

## Repo Facts

### Package and Runtime Facts

- Root app uses App Router under `src/app`.
- `package.json` currently declares:
  - `next: 15.4.10`
  - `react: 19.1.0`
  - `react-dom: 19.1.0`
  - `eslint: ^9`
  - `eslint-config-next: 15.4.6`
- Scripts:
  - `dev: next dev --turbo`
  - `build: next build`
  - `start: next start`
  - `lint: next lint`
- Flat ESLint config exists at `eslint.config.mjs`.
- `pnpm-lock.yaml` exists, but the root `package.json` versions do not match the lockfile:
  - lockfile resolves `next 15.4.6`
  - package.json declares `next 15.4.10`
- The local shell runtime I inspected is `node v22.16.0`, which is above Next.js 16 minimum requirements.
- Container runtime in `Dockerfile` uses `node:20-alpine`, which is also above the Next.js 16 minimum `20.9.0`.

### Build and Deploy Facts

- No `.github/workflows/*` files were found.
- Deployment/build appears container-driven:
  - `Dockerfile`
  - `docker-compose.yml`
- `next.config.ts` uses:
  - `output: "standalone"`
  - `outputFileTracingRoot`
  - permissive `images.remotePatterns`
  - redirect-based SEO migrations, including Wave 2 legacy redirects
- No custom `turbopack` config exists in `next.config.ts`.
- No `turbo.json` was found.

### App Router Route Structure

Primary public site routes:

- `/`
- `/blog`
- `/blog/[slug]`
- `/blog/etiqueta/[slug]`
- `/nexi`
- `/nexi/precios`
- `/nexi/clinicas-odontologicas`
- `/nexi/[industry]`
- `/nexi/[industry]/[use-case]`
- legacy Spanish paths under `/soluciones/*`
- legal/support routes:
  - `/privacy`
  - `/terms`
  - `/refunds`
  - `/cookies`
  - `/login`
  - `/forgot-password`
  - `/demo-1`

Protected/admin surface:

- `/admin`
- `/admin/blog/*`
- `/admin/demo-leads/*`

API routes live under `src/app/api/*` and are excluded from request gating at the middleware layer.

### Metadata, Sitemap, and Robots Facts

- Root metadata in `src/app/layout.tsx` sets:
  - `metadataBase: https://nexalforge.com`
  - root canonical `/`
  - language alternates only for Spanish variants:
    - `es`
    - `es-MX`
    - `es-CO`
    - `es-EC`
- Individual route metadata is implemented with `metadata` or `generateMetadata` across App Router pages.
- Current alternates are mostly canonical-only.
- Some legacy `/soluciones/*` pages still emit Spanish language alternates.
- `src/app/sitemap.ts` is dynamic and builds:
  - root
  - blog index
  - `nexi` core routes
  - legal routes
  - selected pSEO pages
  - blog posts from Prisma when available
- `src/app/robots.ts` allows all crawling and points to `https://nexalforge.com/sitemap.xml`.
- No English sitemap entries or English hreflang pairs exist today.

### Request Gating Facts

- Gating is currently implemented in `src/middleware.ts`.
- Responsibilities in the current middleware:
  - redirect `www` host to apex
  - attach debug headers (`x-nf-middleware`, `x-nf-admin`, `x-nf-user`)
  - bypass auth for a hard-coded `PUBLIC_PREFIXES` allowlist
  - require `nf_jwt` for non-public page routes
  - require `Admin` role for `/admin/*`
- Matcher excludes:
  - `/api`
  - `/_next/static`
  - `/_next/image`
  - `favicon.ico`
  - common asset extensions including `txt` and `xml`
- Important future behavior:
  - `/nexi` and `/soluciones` are public because they are listed in `PUBLIC_PREFIXES`
  - `/en/nexi` would **not** be public under current logic
  - `/en/nexi/pricing` and `/en/nexi/dental-clinics` would also be treated as protected

### Auth Architecture Facts

- Middleware/proxy does optimistic page gating only.
- API routes perform their own auth checks using cookies/JWT verification.
- Cookie name is `nf_jwt`.
- JWT verification is implemented with both `jsonwebtoken` and `jose` across the codebase.
- This means the middleware-to-proxy rename should not change API auth, but page-route redirects must be verified carefully.

## Current Version / Build / Runtime Facts

### Current Declared Versions

- Next.js: `15.4.10` in `package.json`
- React: `19.1.0`
- React DOM: `19.1.0`
- ESLint: `^9`
- `eslint-config-next`: `15.4.6`
- TypeScript: `^5`
- `@types/react`: `^19`
- `@types/react-dom`: `^19`

### Current Lockfile Versions

- Next.js resolved in `pnpm-lock.yaml`: `15.4.6`
- React resolved in `pnpm-lock.yaml`: `19.1.0`
- React DOM resolved in `pnpm-lock.yaml`: `19.1.0`
- `eslint-config-next` resolved in `pnpm-lock.yaml`: `15.4.6`

### Observed Build-System Inconsistency

There is a package-manager mismatch:

- the repo lockfile is `pnpm-lock.yaml`
- the Docker build installs with `npm ci` or `npm install`
- no `package-lock.json` was found

This is not a Next 16 blocker by itself, but it is a migration safety risk because dependency resolution can drift between local and container builds.

## Official Next.js 16 Upgrade Impacts

Official reference points used:

- Next.js 16 upgrade guide: https://nextjs.org/docs/app/guides/upgrading/version-16
- Proxy guide: https://nextjs.org/docs/app/getting-started/proxy
- Turbopack config reference: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack

Relevant official facts:

- Next.js 16 codemod can:
  - update `next.config.js` for new Turbopack config
  - migrate `next lint` to ESLint CLI
  - migrate deprecated `middleware` convention to `proxy`
- Next.js 16 minimum Node version is `20.9.0`.
- Next.js 16 uses Turbopack by default with `next dev` and `next build`.
- Starting in Next.js 16, Middleware is renamed to Proxy; functionality remains the same.
- Next.js 16 removes `next lint`.
- Next.js docs explicitly position Proxy as suitable for optimistic permission-based redirects, not full session management.

## Exact Next 16 Upgrade Impact For This Repo

### 1. Dependency Alignment Is Required

This repo will need a coordinated dependency bump:

- `next` to a 16.x version
- `eslint-config-next` to the matching 16.x line
- `react` and `react-dom` to the versions recommended by the chosen Next.js 16 release
- confirm `@types/react` and `@types/react-dom` compatibility

Why this is required here:

- current `next` and `eslint-config-next` are on the 15.x line
- the package.json / lockfile mismatch should be normalized during the upgrade, not carried forward

### 2. `next lint` Must Be Removed

Current state:

- `package.json` uses `"lint": "next lint"`

Next 16 impact:

- this command is removed
- linting must move to ESLint CLI

Repo-specific change needed:

- replace `next lint` with an ESLint CLI command that targets the current source layout
- ensure the new command works with existing flat config in `eslint.config.mjs`

Likely bounded outcome:

- `lint: eslint .` or an equivalent scoped command

### 3. `src/middleware.ts` Must Migrate To `src/proxy.ts`

Current state:

- request gating logic is implemented in `src/middleware.ts`

Next 16 impact:

- middleware convention is deprecated in favor of proxy

Repo-specific change needed:

- rename file convention to `src/proxy.ts`
- rename exported function from `middleware` to `proxy` or use default export
- preserve existing `config.matcher`

Important repo risk:

- because this file controls page-route authentication and public-path bypasses, the rename is mechanically simple but behaviorally important
- after migration, redirects and cookie-based gating must be revalidated on:
  - `/`
  - `/login`
  - `/nexi`
  - `/nexi/precios`
  - `/blog`
  - `/admin`

### 4. Turbopack Script Cleanup Is Advisable

Current state:

- `dev` script is `next dev --turbo`
- `build` script is `next build`
- no custom `turbopack` config exists

Next 16 impact:

- Turbopack is the default for `next dev` and `next build`
- no `experimental.turbo` migration is needed because this repo does not use it

Repo-specific change needed:

- remove the explicit `--turbo` flag from `dev`
- keep `build` plain unless a deliberate fallback decision is made

### 5. `next.config.ts` Requires Review, But Not Major Structural Rework

Current state:

- standalone output
- output tracing root
- image remote patterns
- redirect rules
- no removed `eslint` key
- no `experimental.turbo`
- no runtime config keys like `serverRuntimeConfig` / `publicRuntimeConfig`

Next 16 impact:

- no mandatory `next.config.ts` rewrite is visible from current repo facts
- redirects should keep working as-is
- standalone output remains relevant for the Docker deployment

Repo-specific validation needed:

- verify build output still produces the expected standalone layout for the Docker entrypoint
- verify redirect rules still cover Wave 1 / Wave 2 SEO migration paths after dependency bump

### 6. App Router Metadata Behavior Does Not Show A Hard Next 16 Blocker

Current state:

- App Router metadata usage is standard:
  - `metadata`
  - `generateMetadata`
  - canonical paths
  - Open Graph
  - robots
  - root `metadataBase`
- `sitemap.ts` and `robots.ts` follow App Router metadata file conventions

Next 16 impact:

- no obvious metadata API removal is in use here
- no AMP config is present
- no removed route segment config surfaced in inspected files

Repo-specific risk:

- not a framework breakage risk
- the real issue is future SEO architecture for `/en`, not Next 16 compatibility

## Required Code / Config Changes

Required now for a bounded Next 16 upgrade:

1. Upgrade `next`, `eslint-config-next`, `react`, `react-dom`, and related type packages to the chosen 16-compatible set.
2. Replace `lint: next lint` with ESLint CLI.
3. Migrate `src/middleware.ts` to `src/proxy.ts`.
4. Remove explicit `--turbo` from `dev`.
5. Normalize dependency resolution strategy so package manifest, lockfile, and container install method agree.

Not clearly required now:

- introducing Next.js i18n config
- rewriting metadata architecture globally
- changing redirect structure for existing Spanish SEO migrations
- changing app route structure to route groups just for the upgrade

## Proxy Migration Analysis

### What Changes

Mechanical changes expected:

- `src/middleware.ts` -> `src/proxy.ts`
- `export async function middleware(...)` -> `export async function proxy(...)`
- keep existing `config.matcher`

### What Must Be Preserved

- apex redirect from `www.*`
- public-route bypass behavior for current Spanish public routes
- protected redirect to `/login`
- admin-role enforcement for `/admin/*`
- `/api` exclusion
- asset exclusions

### Repo-Specific Risk

The current public-route model is path-prefix based and Spanish-only. That is fine for current production traffic, but it will fail for any future explicit English subtree unless shaped now.

Today, these are public:

- `/`
- `/login`
- `/blog`
- `/nexi`
- `/soluciones`
- legal pages

But these future routes would currently be protected:

- `/en/nexi`
- `/en/nexi/pricing`
- `/en/nexi/dental-clinics`

### Recommendation For Proxy Design

During the Next 16 migration, make the proxy/public-route check capable of understanding an optional leading locale segment, but do not introduce locale redirects or a full locale system.

Bounded target:

- keep current Spanish paths working exactly as they do now
- shape the public-path matcher so that future `/en/...` equivalents can be marked public without duplicating the entire proxy later

Good boundary:

- helper logic that normalizes pathname into:
  - optional locale prefix
  - route remainder
- current supported locale prefixes can stay effectively one of:
  - none
  - reserved future `en`

What should not happen yet:

- no automatic locale negotiation
- no `/` -> `/es` or `/en` redirecting
- no `next.config` i18n locale rollout

## Lint Migration Analysis

### Current State

- flat ESLint config already exists in `eslint.config.mjs`
- this is a good starting point for the Next 16 lint migration

### Required Change

- replace `next lint` with direct ESLint CLI usage

### Repo Risk

Low framework risk, but moderate workflow risk:

- CI or local scripts may currently assume `next lint`
- Next 16 no longer runs linting via `next build`, so lint must be treated as an explicit validation step

### Recommendation

- convert lint script to explicit ESLint CLI
- add validation expectations in the upgrade plan that lint is run separately from build

## Turbopack / Config Analysis

### Current State

- `dev` opts into Turbopack with `--turbo`
- `build` does not opt in explicitly
- no custom `turbopack` config
- no old `experimental.turbo` key

### Next 16 Impact

- this repo does not need a Turbopack config migration
- the main cleanup is script simplification because Turbopack becomes default

### Risk

Low, with one operational caveat:

- validate Docker standalone output after the upgrade because the deployment depends on `.next/standalone` and a fallback server startup script

## Build / Runtime / Deploy Risks

### Risk 1: Package-Manager Drift

Observed:

- `pnpm-lock.yaml` exists
- Docker builds with npm
- `package.json` and lockfile already disagree on `next`

Impact:

- upgrade may appear to work locally and differ in container builds

Recommendation:

- choose one package manager path for the upgrade and keep lockfile/build tooling consistent

### Risk 2: Proxy Rename Regresses Public Routes

Observed:

- page access control is centralized in middleware

Impact:

- accidental auth redirects on public SEO pages would be a production regression

Recommendation:

- treat proxy verification as its own explicit phase

### Risk 3: Proxy Logic Is Not `/en`-Aware

Observed:

- current public prefixes are Spanish-only

Impact:

- future `/en/*` launch would require touching auth/public path logic again

Recommendation:

- make pathname normalization locale-aware now, but do not expose English routes yet

### Risk 4: Sitemap / Canonical Architecture Is Spanish-Only

Observed:

- no English alternates or English sitemap entries

Impact:

- not a Next 16 blocker
- but later `/en` launch would create rework if English pages are added ad hoc

Recommendation:

- define the alternates strategy now
- implement English alternates only when English content actually exists

## Separate Tracks

## A. Next 16 Upgrade Work Required Now

This is in scope now:

- dependency upgrade to the chosen Next 16-compatible package set
- lint script migration from `next lint` to ESLint CLI
- `middleware` convention migration to `proxy`
- dev script cleanup for Turbopack default behavior
- post-upgrade validation of build, routing, redirects, sitemap, and protected routes
- small internal proxy-path normalization so future `/en/*` does not force another auth-gating rewrite

This is explicitly not in scope now:

- launching English routes
- translating content
- generating English pages
- adding locale redirects
- emitting English sitemap URLs
- publishing hreflang pairs for English pages that do not exist yet

## B. `/en` Readiness Work To Shape During The Upgrade

### Recommended Future Routing Approach

Use a simple explicit `/en` subtree first.

For the upcoming expansion, the safest first step is:

- `/en/nexi`
- `/en/nexi/pricing`
- `/en/nexi/dental-clinics`

Why this is the right boundary for this repo:

- current site is already explicit-path SEO driven
- there is no locale system today
- Spanish routes are already the canonical production surface
- a subtree approach avoids unnecessary full locale migration risk

### What Should Be Shaped Now

1. Proxy/public-route logic should become locale-aware now.
2. New upgrade work should avoid hard-coding assumptions that all future public product pages start at root Spanish paths only.
3. Metadata helper patterns should be reviewed with future alternates in mind.

### What Should Wait Until English Content Exists

- actual `/en/*` pages
- English metadata copy
- English canonical and language alternates
- English sitemap entries
- `hreflang` pairs between Spanish and English route twins
- internal linking between English pages
- English-specific structured data copy

### Sitemap / `hreflang` Recommendation

Do not add placeholder English URLs to sitemap or alternates.

When English content exists:

- add per-page language alternates only for routes that have real twins
- add `/en/*` sitemap entries only after the pages are indexable
- avoid broad site-wide `en` alternates before content parity exists

### Public Route Matcher Recommendation

Yes, proxy logic should become locale-aware now.

Reason:

- this is the one `/en` readiness change that directly reduces future rework
- it is internal plumbing, not a product launch
- it avoids a later auth regression when `/en` is introduced

## Recommended Phased Implementation Plan

## Phase 0: Assessment

Exact scope:

- capture current dependency, routing, metadata, and deployment facts
- identify current middleware/public-route behavior
- confirm official Next 16 requirements

Risks:

- under-scoping proxy or build-system drift

Must validate:

- current package and lockfile mismatch
- current public/protected route expectations
- current sitemap/canonical behavior

Must stay untouched:

- homepage polish
- current URL migration behavior
- content structure
- `/en` launch work

## Phase 1: Next 16 Mechanical Upgrade

Exact scope:

- upgrade Next.js and aligned packages
- migrate lint script to ESLint CLI
- migrate `middleware.ts` to `proxy.ts`
- simplify Turbopack scripts for Next 16 defaults
- keep `next.config.ts` behaviorally equivalent unless required by framework changes

Risks:

- dependency resolution drift
- unexpected build-output differences in standalone mode
- missed script/workflow references to `next lint`

Must validate:

- install resolution is deterministic
- lint command works from repo root
- `next build` succeeds
- standalone output still supports current Docker startup path

Must stay untouched:

- redirect map intent
- sitemap URL inventory
- page copy
- public URL architecture

## Phase 2: Proxy / Auth / Public-Route Verification

Exact scope:

- verify migrated proxy behavior against existing routes
- ensure public pages remain public
- ensure protected pages remain protected
- shape public-path logic so a future `/en/*` subtree can be public without another proxy rewrite

Risks:

- false redirects to `/login` on SEO pages
- admin routes losing role enforcement
- locale-aware normalization accidentally widening public access beyond intended routes

Must validate:

- `/`
- `/nexi`
- `/nexi/precios`
- `/nexi/clinicas-odontologicas`
- `/blog`
- `/privacy`
- `/login`
- `/admin` unauthenticated redirect
- `/admin` authenticated non-admin rejection
- `/admin` authenticated admin access

Must stay untouched:

- API route auth model
- existing cookie name and JWT contract
- no English routes exposed yet

## Phase 3: Post-Upgrade Validation

Exact scope:

- rerun build and lint validation
- verify redirect behavior for migrated SEO URLs
- verify metadata file outputs and sitemap generation

Risks:

- redirect regressions affecting Wave 1 / Wave 2 migration
- sitemap failures if Prisma fetch behavior changes under the new dependency set
- Docker runtime mismatch if standalone output shape shifts

Must validate:

- `robots.txt`
- `sitemap.xml`
- key redirect paths:
  - `/pricing` -> `/nexi/precios`
  - `/asistente-virtual-nexi` -> `/nexi`
  - `/soluciones/*` legacy redirects
- container build still produces a runnable image

Must stay untouched:

- homepage redesign
- content expansion
- English launch

## Phase 4: Optional `/en` Foundation Follow-Up

Exact scope:

- optional small follow-up after the successful Next 16 upgrade
- introduce reusable pathname/metadata helpers for explicit `/en` subtree support
- no public English launch

Risks:

- scope creep into full bilingual architecture

Must validate:

- internal helpers support future `/en/nexi`, `/en/nexi/pricing`, `/en/nexi/dental-clinics`
- no current Spanish route changes

Must stay untouched:

- actual English content
- locale redirects
- English sitemap and `hreflang` publication

## Final Decisions Still Required Before Implementation

1. Version policy:
   - pin to the current latest stable Next.js 16.x line at implementation time, or pin to a narrower approved 16.x target.
2. Package manager policy:
   - standardize on pnpm end-to-end, or intentionally keep npm in Docker and regenerate lock strategy to match.
3. Proxy shaping boundary:
   - approve locale-aware pathname normalization now, even though `/en` routes will not launch yet.
4. Validation depth:
   - decide whether post-upgrade verification is limited to lint/build/manual smoke tests or includes automated route checks.
5. `/en` SEO policy for later:
   - confirm the future plan is an explicit subtree-first model, not an immediate full locale-system rollout.

## Recommended Decision Set

My recommendation for implementation approval:

1. Approve a bounded Next.js 16 upgrade only.
2. Approve proxy migration plus locale-aware public-path normalization now.
3. Do not approve `/en` route launch, hreflang rollout, or English sitemap work in this upgrade.
4. Standardize dependency resolution before or during the upgrade so local and container builds use the same package manager path.

