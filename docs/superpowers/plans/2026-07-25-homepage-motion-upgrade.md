# Homepage Motion Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the homepage a restrained Motion UI-inspired animation system across the hero, projects, Work Experience, stats, and dock.

**Architecture:** Keep the homepage server-rendered and isolate animation inside existing or small client components. Centralize springs, stagger timings, and travel distances in one module, then reuse those tokens across every interaction. Use the installed `motion` package only.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion 12

## Global Constraints

- Homepage-only visual scope.
- No Motion+ code and no new runtime dependency.
- Respect `prefers-reduced-motion` everywhere.
- Preserve keyboard behavior, links, Radix Accordion semantics, responsive layout, and content.
- Do not commit; leave all changes in the working tree for local review.

---

### Task 1: Shared Motion System and Reveal Cleanup

**Files:**
- Create: `src/lib/motion.ts`
- Modify: `src/components/magicui/blur-fade.tsx`
- Create: `src/components/motion/stagger-reveal.tsx`

**Interfaces:**
- Produces: `motionTokens`, `StaggerReveal`, and `StaggerItem`
- Preserves: existing `BlurFade` props and call sites

- [ ] Add spring presets `snap`, `ui`, and `gentle`; stagger timings `tight`, `base`, and `relaxed`; and travel distances `hover`, `enter`, and `section`.
- [ ] Refactor `BlurFade` to use `useReducedMotion`, remove `AnimatePresence`, preserve its prop surface, and immediately render final states when reduced motion is enabled.
- [ ] Add a once-only in-view stagger container and item component driven by the shared tokens.
- [ ] Run targeted ESLint on the three files.

### Task 2: Editorial Hero Motion

**Files:**
- Create: `src/components/motion/hero-motion.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: existing hero text, avatar, and CTA markup through child slots
- Produces: `HeroMotion`, `HeroHeadline`, `HeroAvatar`, and `Magnetic`

- [ ] Replace the basic headline reveal with a masked word-by-word editorial stagger.
- [ ] Sequence supporting copy and CTA entrance through the hero container.
- [ ] Add a scroll-linked avatar translation clamped to 10px.
- [ ] Add a pointer-only magnetic transform clamped to 4px for both CTAs, with keyboard/touch behavior unchanged.
- [ ] Disable stagger travel, avatar drift, and magnetism under reduced motion.
- [ ] Run targeted ESLint on the hero files.

### Task 3: Project Card Motion

**Files:**
- Modify: `src/components/section/projects-section.tsx`
- Modify: `src/components/project-card.tsx`

**Interfaces:**
- Preserves: `ProjectCard` props and link behavior
- Adds: internal hover lift, fine-pointer tilt, media scale, border highlight, and arrow travel

- [ ] Replace per-card cumulative delays with a section-local stagger group.
- [ ] Convert the card shell to `motion.article` with a maximum 4px lift.
- [ ] Drive restrained 3D rotation from pointer position through smoothed motion values.
- [ ] Reset rotation on pointer leave and skip tilt for coarse pointers or reduced motion.
- [ ] Scale image/video media to 1.03 and animate the arrow diagonally on hover/focus-within.
- [ ] Add a non-looping hover border sheen using a pseudo-element or motion overlay.
- [ ] Preserve nested link click handling and keyboard activation.
- [ ] Run targeted ESLint on both project files.

### Task 4: Work Experience Accordion Motion

**Files:**
- Modify: `src/components/section/work-section.tsx`

**Interfaces:**
- Preserves: Radix single/collapsible accordion behavior and `DATA.work`
- Adds: controlled open value solely for visual state

- [ ] Track the single open accordion value without changing Radix keyboard behavior.
- [ ] Spring the active logo from 1 to 1.04 scale and rotate/swap the chevron using shared tokens.
- [ ] Animate expanded copy with a short blur, fade, and 8px vertical reveal.
- [ ] Render reduced-motion content without blur or travel.
- [ ] Keep all existing descriptions, links, and list formatting unchanged.
- [ ] Run targeted ESLint on the work section.

### Task 5: Real Stats Motion

**Files:**
- Create: `src/components/motion/animated-number.tsx`
- Modify: `src/components/stats/github-stats-card.tsx`

**Interfaces:**
- Produces: `AnimatedNumber({ value, suffix?, format? })`
- Consumes: real numeric star and streak values only

- [ ] Animate stars and streak from zero once their real values are visible.
- [ ] Preserve locale formatting for stars and append ` days` to streak.
- [ ] Fade/scale the grade without numeric interpolation.
- [ ] Animate language-bar segments from zero to their real percentages after loading.
- [ ] Immediately show final values under reduced motion and never animate `null`, fallback images, or loading skeletons.
- [ ] Run targeted ESLint on the stats files.

### Task 6: Dock Refinement

**Files:**
- Modify: `src/components/magicui/dock.tsx`
- Modify: `src/components/navbar.tsx`

**Interfaces:**
- Preserves: `DockProps`, `DockIconProps`, tooltips, links, and theme toggle
- Adds: optional `active` state to `DockIcon`

- [ ] Replace the dock’s local spring constant with the shared `ui` preset.
- [ ] Add a reduced-motion path that keeps icons at their base size.
- [ ] Animate the dock into view with a restrained fade and 12px rise.
- [ ] Add a small springing active-route dot for Home and Blog using `usePathname`.
- [ ] Preserve external-link behavior and all tooltip/focus states.
- [ ] Run targeted ESLint on both dock files.

### Task 7: Homepage Orchestration and Verification

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Removes: large page-wide delay multiplication
- Keeps: section order, IDs, content, and responsive layout

- [ ] Convert homepage section reveals to once-only in-view motion with small local staggers.
- [ ] Keep Contact Console’s existing word-generation animation unchanged.
- [ ] Run targeted ESLint across every changed file.
- [ ] Run `corepack pnpm build`.
- [ ] Verify the exported homepage still contains the hero, WSP experience, projects, stats, contact, and writing sections.
- [ ] Review the final diff and leave every change uncommitted.
