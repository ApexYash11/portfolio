# Reliable GitHub Stats Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the portfolio's GitHub statistics visible by rendering a validated build-time snapshot instead of depending on browser-time GitHub and third-party requests.

**Architecture:** A dependency-free Node generator fetches and validates all public repository data, aggregates totals and languages, and atomically updates a committed JSON snapshot. The client card imports that snapshot and renders it immediately; failed refreshes preserve the last valid snapshot.

**Tech Stack:** Node.js 20 test runner, GitHub REST API, Next.js 16, React 19, TypeScript, Tailwind CSS 4

## Global Constraints

- Include all public repositories owned by `ApexYash11`, including public forks.
- Do not require or expose a personal access token.
- Never replace a valid snapshot with partial or invalid data.
- Keep the card responsive and legible in light and dark themes.
- Do not add a runtime dependency.
- Do not commit changes.

---

### Task 1: Snapshot aggregation and fallback

**Files:**
- Create: `scripts/github-stats.mjs`
- Create: `scripts/github-stats.test.mjs`
- Create: `src/data/github-stats.json`
- Modify: `package.json`

**Interfaces:**
- Produces: `fetchGithubSnapshot({ fetchImpl, username, token, concurrency })`, `normalizeLanguages(languageBytes)`, `isValidSnapshot(value)`, and `refreshSnapshot({ outputPath, load })`
- Produces: a validated JSON object consumed by the card

- [ ] Write Node tests that prove multi-page repositories (including forks) are aggregated, language percentages total 100%, sub-one-percent languages become `Other`, and refresh failures preserve only valid snapshots.
- [ ] Run `node --test scripts/github-stats.test.mjs` and confirm it fails because the generator does not exist.
- [ ] Implement bounded fetching, status-aware errors, validation, normalized percentages, and atomic snapshot replacement.
- [ ] Run `node --test scripts/github-stats.test.mjs` and confirm all focused tests pass.
- [ ] Add `stats:refresh`, `test`, and `prebuild` package scripts, then generate or retain a valid initial snapshot.

### Task 2: Deterministic card rendering

**Files:**
- Modify: `src/components/stats/github-stats-card.tsx`

**Interfaces:**
- Consumes: `src/data/github-stats.json`
- Preserves: profile link, avatar, language colors, animated numeric totals, and contribution graph
- Removes: browser GitHub REST calls, event-derived streak, scraped grade, and third-party fallback cards

- [ ] Add a source-level regression test that imports the rendered card module and verifies the browser-time request path is gone through its observable static render contract.
- [ ] Run the focused test and confirm it fails against the current client-fetching component.
- [ ] Render repository, star, and fork totals directly from the snapshot; always render normalized language segments at their final widths.
- [ ] Replace translucent nested surfaces with semantic card/muted surfaces and remove the graph's fixed 700-pixel minimum width.
- [ ] Run focused tests and targeted ESLint.

### Task 3: Build refresh and deployment

**Files:**
- Modify: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `GITHUB_TOKEN` when GitHub Actions provides it
- Preserves: existing GitHub Pages build and deployment

- [ ] Pass `${{ secrets.GITHUB_TOKEN }}` only to the build step so refreshes receive authenticated rate limits without a personal secret.
- [ ] Run the full Node test suite and ESLint.
- [ ] Run `corepack pnpm build` and confirm the static export succeeds with a valid snapshot.
- [ ] Inspect the final diff for unrelated changes and verify the homepage output still contains the GitHub stats section.

### Task 4: Visual verification

**Files:**
- Verify only; no new files expected

**Interfaces:**
- Consumes: locally built portfolio
- Verifies: desktop/mobile layouts and light/dark themes

- [ ] Open the local site and inspect the GitHub card at desktop and mobile widths.
- [ ] Confirm the three stat tiles, complete language bar and legend, and contribution graph remain visible without horizontal card overflow.
- [ ] Confirm secondary text, borders, and nested surfaces remain legible in both themes.
