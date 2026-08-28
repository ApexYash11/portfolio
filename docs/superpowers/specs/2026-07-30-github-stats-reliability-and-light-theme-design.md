# GitHub Stats Reliability and Light Theme Design

## Goal

Make the portfolio's GitHub section complete, dependable, responsive, and visually balanced in light mode without exposing credentials or requiring a personal access token.

The section will include every public repository returned for `ApexYash11`, including forked repositories. Private repositories are explicitly out of scope.

## Current Problems

The current client component fetches the GitHub profile, the first page of repositories, one language endpoint per repository, public events, and third-party SVG cards whenever a visitor opens the page.

This causes four observable failures:

1. Unauthenticated browser requests share GitHub's low hourly limit, so language requests can fail partway through and produce incomplete totals.
2. Only the first repository page is requested, so the implementation cannot represent more than 100 repositories.
3. The grade and streak depend on scraped or incomplete third-party/public-event data and regularly fall back to cards that do not match the active theme.
4. The language bar can remain at zero width while the legend is visible. Filtering small languages also leaves the displayed percentages short of a complete bar. The contribution graph's fixed minimum width introduces cropping or horizontal scrolling.

Light mode compounds these issues through translucent nested surfaces, weak borders, low-contrast secondary text, and excessive empty space around the missing bar.

## Selected Approach

Generate a typed GitHub data snapshot before the Next.js build and render that snapshot directly.

The generator will:

- paginate through all public user repositories with `type=owner`, which includes public forks owned by the user;
- use the GitHub Actions-provided token when available, without requiring a personal secret;
- fetch language byte counts for every returned repository with bounded concurrency;
- calculate repository, star, and fork totals;
- normalize language percentages and combine entries below one percent into `Other`;
- retain the previous valid snapshot when GitHub is temporarily unavailable;
- record the snapshot generation timestamp.

The browser will make no GitHub REST or third-party stats-card requests. The profile avatar and contribution graph can remain remote presentation assets, but neither will determine the displayed numeric statistics or language totals.

## Data Model and Flow

The generated snapshot will contain:

- GitHub username and display name;
- account creation year;
- public repository count;
- total stars across public repositories;
- total fork count across public repositories;
- language entries with name, byte count, percentage, and color;
- generation timestamp.

Data flows in one direction:

1. The prebuild generator requests GitHub data.
2. It validates and aggregates the responses.
3. It writes the generated snapshot only after a complete successful run.
4. Next.js imports the snapshot during the static build.
5. `GithubStatsCard` renders deterministic data with no loading race.

If generation fails and a valid prior snapshot exists, the build continues with that snapshot and emits a clear warning. If no valid snapshot exists, generation fails loudly rather than publishing misleading partial data.

## Component Design

The card keeps the existing profile-led structure but becomes more compact and deterministic.

- The profile row shows the avatar, name, username, membership year, and snapshot freshness.
- Three responsive stat tiles show public repositories, stars, and forks.
- The language section places the segmented bar immediately below its heading.
- The legend uses a responsive grid with consistent row and column gaps.
- Segments render at their final widths without relying on viewport observation. A subtle opacity reveal may remain, but data visibility will never depend on animation.
- Small languages are represented by `Other`, so the bar and legend describe the entire aggregated total.
- The contribution graph scales within the available width and does not impose a 700-pixel minimum width.

## Light and Dark Theme Treatment

The outer card will use the semantic card background at full opacity, a visible semantic border, and a restrained shadow. Nested panels will use the semantic muted background instead of black or white alpha overlays.

Light mode will receive:

- stronger separation between the page, card, and nested panels;
- darker secondary text for labels and metadata;
- subdued rather than washed-out gradients;
- consistent padding and vertical rhythm.

Dark mode will preserve the current restrained appearance through the same semantic tokens rather than separate hardcoded translucent colors.

## Error Handling

- Pagination stops only when GitHub returns fewer than the requested page size.
- Non-successful repository or language responses include the endpoint and status in the error.
- A language failure aborts the new snapshot rather than silently treating a repository as zero bytes.
- The existing snapshot is validated before it can be used as fallback data.
- Remote avatar and contribution image failures do not remove the core statistics.

## Testing and Verification

Implementation will follow test-driven development.

Automated tests will cover:

- pagination across more than one repository page;
- inclusion of forked public repositories;
- aggregation of repository, star, and fork totals;
- aggregation and ordering of language bytes;
- grouping sub-one-percent languages into `Other`;
- percentages forming a complete normalized total;
- preservation of a valid snapshot when fetching fails;
- rejection of partial data when no fallback exists.

Final verification will include the focused tests, ESLint, a production static build, and visual inspection of the GitHub card at desktop and mobile widths in both themes.

## Non-Goals

- Reading or displaying private repositories.
- Adding a personal access token.
- Reconstructing an exact contribution streak from incomplete public events.
- Scraping a GitHub rank or grade from third-party SVG output.
- Redesigning unrelated portfolio sections.
