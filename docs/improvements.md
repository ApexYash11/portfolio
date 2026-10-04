# Improvement Backlog

Findings from a full audit of this portfolio. Ordered by impact. Not started —
this file is the working list.

## 1. Delete `old-site/` (94 MB of dead weight in git)

52 tracked files: duplicate HTML/JS/CSS, a second copy of every image, blog
drafts, and planning docs. Already superseded by the Next.js site.

- [ ] Remove the directory from the working tree and from git history tracking
- [ ] Confirm nothing links to `old-site/` assets (the MCP/RAG blog images are
      also copied into `public/`)

## 2. Repo hygiene

- [ ] Delete the duplicate root `YASH_MAHESHWARI_RESUME (3).pdf` (byte-identical
      to `public/resume.pdf`)
- [ ] Add `dev.log` and `image.png` to `.gitignore`
- [ ] Consider a CONTRIBUTING note that generated files
      (`.content-collections/generated/`) are committed intentionally

## 3. Page weight: home page HTML is ~798 KB

- [ ] Recompress `public/stock-iq.mp4` (6.2 MB) and `public/jasper-demo.mp4`
      (3.5 MB) the way `gatewise.mp4` was done: 1280px wide, 30fps, CRF 30,
      faststart, no audio — 10.8 MB became 947 KB for Gatewise
- [ ] Audit what else is inlined into the HTML payload
- [ ] Re-measure LCP after the change

## 4. Work section duplicates the Open Source section

`src/data/resume.tsx` lists Traceroot AI, TracerCloud, and AgentWrapper as
"Open Source Contributor" roles while the Open Source section now renders the
same merged PRs live from the GitHub API.

- [ ] Remove the three manual OSS entries from `DATA.work`
- [ ] The AgentWrapper description is a wall of text that will go stale; it is
      already covered by the live PR list

## 5. Add a `/case-study` index page

Case studies are in the sitemap but only reachable from project badges. An index
page (mirroring `/blog`) gives them a second entry point.

- [ ] `src/app/case-study/page.tsx` listing every entry from `getAllCaseStudies()`
- [ ] Include it in `src/app/sitemap.ts` with a higher priority than individual
      case studies
- [ ] Add it to the navbar

## 6. Remove or use the dead `active: false` project field

Set on every project in `resume.tsx` and never read.

- [ ] Either render it as a Live / Archived badge or delete it

## 7. Tighten two resume claims

- [ ] Orydle: "Improved backend reliability and throughput by 30%" — add how it
      was measured, or state the qualitative result only
- [ ] devx AI labs: "Improved forecast accuracy by around 70%" — same

## 8. Smaller items

- [ ] No web manifest: no installable PWA, no `theme-color` for mobile browser
      chrome
- [ ] The GitHub Pages mirror (`apexyash11.github.io/portfolio`) duplicates the
      canonical `yashmaheshwari.is-a.dev`. Note the canonical host in the README
      so link equity stays on one domain

## Done already

- [x] Gatewise project card, case study, and compressed demo video
- [x] Open Source section synced from the GitHub API (`is:pr is:merged author:…`
      folded into the existing single GraphQL snapshot request), with a
      configurable star floor (`OSS_MIN_REPO_STARS`, default 200) so patches to
      tiny personal or hackathon repos do not read as padding