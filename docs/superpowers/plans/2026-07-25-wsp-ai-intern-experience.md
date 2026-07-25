# WSP AI Intern Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a minimal current WSP AI Intern entry to the existing Work Experience accordion.

**Architecture:** Extend the existing `DATA.work` array so the current `WorkSection` renders WSP without a new component. Add one local logo asset and keep the entry focused on the requested role details.

**Tech Stack:** Next.js 16, React 19, TypeScript

## Global Constraints

- WSP must be the first work entry.
- Use `Jul 2026` through `Present`.
- Include exactly three concise points: AI-driven solutions, workflow automation, and agentic flows.
- Keep the existing Work Experience presentation and avoid unrelated redesign.

---

### Task 1: WSP Work Experience Entry

**Files:**
- Create: `public/wsp.svg`
- Modify: `src/data/resume.tsx`

**Interfaces:**
- Consumes: the existing `DATA.work` object shape used by `WorkSection`
- Produces: a first work entry with `company`, `href`, `badges`, `location`, `title`, `logoUrl`, `start`, `end`, and `description`

- [ ] **Step 1: Add the minimal entry and logo**

Add the WSP item before Orydle in `DATA.work`, using `Remote`, `Jul 2026`, `Present`, and this three-point description:

```ts
"Working on AI-driven solutions for practical business use cases. • Building workflow automation to streamline repeatable processes. • Developing agentic flows that coordinate tools and multi-step tasks."
```

Add an official-style WSP wordmark as `public/wsp.svg`.

- [ ] **Step 2: Run project and rendered-output verification**

Run:

```bash
corepack pnpm exec eslint src/data/resume.tsx
corepack pnpm build
Select-String -Path "out/index.html" -Pattern "WSP","AI Intern","Jul 2026"
```

Expected: the changed TypeScript file passes lint, the production build succeeds, and the exported home page contains the WSP role and date. Review the three accordion points directly in `src/data/resume.tsx`, because closed Radix accordion content is not emitted into the static HTML.

- [ ] **Step 3: Commit**

```bash
git add public/wsp.svg src/data/resume.tsx docs/superpowers/plans/2026-07-25-wsp-ai-intern-experience.md
git commit -m "feat: add WSP AI intern experience"
```
