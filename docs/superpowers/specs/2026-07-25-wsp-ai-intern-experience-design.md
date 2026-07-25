# WSP AI Intern Experience Design

## Goal

Add Yash Maheshwari's current AI Intern role at WSP to the portfolio's Work Experience section using the LinkedIn announcement as the supporting link.

## Content

- Company: WSP
- Role: AI Intern
- Location: Remote
- Dates: Jul 2026 – Present
- Supporting link: https://www.linkedin.com/feed/update/urn:li:activity:7486422068474044416/
- Description: concise portfolio bullets covering work on AI and GenAI solutions, AI agents, Azure AI, and business automation.

The wording must avoid unverified performance metrics or project claims that are not present in the supplied context.

## Presentation

The WSP role will be the first item in the existing Work Experience accordion because it is the current role. It will use the same typography, spacing, date treatment, logo treatment, and expandable description behavior as the other entries.

The expanded link label should identify LinkedIn rather than GitHub. Existing GitHub contribution links should keep their current label.

## Assets

Add a local WSP logo image or vector under `public/` and reference it from the resume data. The logo must remain legible inside the existing circular, contained logo frame in both light and dark themes.

## Implementation Boundaries

- Extend the existing `DATA.work` collection rather than creating a separate experience component.
- Update the work-section link label so it reflects the destination.
- Do not redesign unrelated sections or rewrite existing experience entries.
- Preserve responsive behavior and accessibility attributes.

## Verification

- Run lint and the production build.
- Confirm WSP appears first with `Jul 2026 – Present`.
- Confirm the accordion expands and its LinkedIn link opens the supplied post in a new tab.
- Confirm existing GitHub links continue to display correctly.
- Visually inspect the Work Experience section at desktop and mobile widths.
