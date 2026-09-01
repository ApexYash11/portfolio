# Bug Triage

Triage, diagnose, and fix bugs in this Next.js portfolio repo (static-export site, `output: "export"`, deployed to https://yashmaheshwari.is-a.dev).

## Triage workflow

1. **Reproduce** — Run `pnpm dev` and load the affected route. For live-site bugs, fetch the deployed URL (`https://yashmaheshwari.is-a.dev/...`) and compare against local behavior. Never fix from a hunch; confirm the failure first.
2. **Classify severity**
   - **P0 (broken core):** page 404s, blank screen, broken build/deploy, social preview image missing (link unfurl is broken).
   - **P1 (visible defect):** layout broken on mobile, hydration errors, images failing to load, broken links.
   - **P2 (quality):** console warnings, lint failures, minor style issues, slow loads.
3. **Localize** — Trace the symptom to source:
   - Routes/pages → `src/app/**`
   - UI pieces → `src/components/**`
   - Content/config → `src/data/resume.tsx`, `src/data/*.json`
   - Build/CI issues → `next.config.mjs`, `scripts/*`
4. **Diagnose root cause** — Distinguish the repo's known constraints:
   - `output: "export"` means **no server routes**: API routes, route handlers, and file-convention dynamic metadata (`opengraph-image.tsx`, dynamic rewrites) will 404 in production even if they work in `next dev`. Anything server-generated must become a static asset in `public/` or build-time generation (`prebuild` scripts like `scripts/github-stats.mjs`).
   - `images: { unoptimized: true }` — no Next image optimization; large files hurt mobile crawlers. Keep link-preview images < 300KB (1200×630 JPEG).
   - `metadataBase` is hardcoded — absolute URLs in metadata must match the production domain.
5. **Fix minimally** — Smallest change that addresses the root cause, matching existing conventions (Tailwind classes, `@/` path aliases, shadcn/magicui components).
6. **Verify**
   - `pnpm lint` and `pnpm test`
   - `pnpm build` (runs the stats prebuild); for metadata bugs, inspect the exported HTML in `.next/` or deploy preview for correct `<meta>` tags
   - For social preview bugs: check og:image URL resolves with HTTP 200 and is < 300KB

## Known past bugs (reference)

- **Social preview image 404 (fixed 2026-09):** static `opengraph-image.png`/`twitter-image.png` file conventions don't survive static export. Fix: `public/og-image.jpg` + explicit `openGraph.images`/`twitter.images` in `src/app/layout.tsx`.
- **GitHub stats rate limits (fixed):** snapshot pipeline (`src/data/github-stats.json`) refreshed by prebuild. When `GITHUB_TOKEN` is present, the whole snapshot (user, repos, languages, contributions) is fetched in a single paginated GraphQL request (1 rate-limit point instead of ~54 REST calls); without a token it falls back to the REST pipeline, which tolerates individual per-repo language failures instead of discarding the snapshot. Don't add client-side live GitHub API calls.

## Report format

For each bug found, report: severity (P0–P2), symptom, root cause, file(s) touched, fix, and verification result.