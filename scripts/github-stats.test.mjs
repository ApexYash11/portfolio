import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  fetchGithubSnapshot,
  normalizeLanguages,
  normalizeOpenSource,
  refreshSnapshot,
} from "./github-stats.mjs";

const validSnapshot = {
  username: "ApexYash11",
  displayName: "Yash Maheshwari",
  memberSince: 2020,
  publicRepositoryCount: 2,
  totalStars: 3,
  totalForks: 1,
  languages: [
    { name: "TypeScript", bytes: 900, percentage: 90, color: "#3178C6" },
    { name: "Other", bytes: 100, percentage: 10, color: "#8B949E" },
  ],
  generatedAt: "2026-07-30T00:00:00.000Z",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("fetchGithubSnapshot paginates all owned public repositories, including forks", async () => {
  const firstPage = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    fork: index === 0,
    stargazers_count: index === 0 ? 5 : 0,
    forks_count: index === 0 ? 2 : 0,
    languages_url: `https://api.github.test/repos/${index + 1}/languages`,
  }));
  const secondPage = [
    {
      id: 101,
      fork: false,
      stargazers_count: 7,
      forks_count: 3,
      languages_url: "https://api.github.test/repos/101/languages",
    },
  ];

  const fetchImpl = async (url) => {
    const value = String(url);
    if (value.endsWith("/users/ApexYash11")) {
      return jsonResponse({
        name: "Yash Maheshwari",
        created_at: "2020-04-15T00:00:00Z",
      });
    }
    if (value.includes("/repos?")) {
      const page = new URL(value).searchParams.get("page");
      if (page === "1") return jsonResponse(firstPage);
      if (page === "2") return jsonResponse(secondPage);
    }
    if (value.endsWith("/repos/1/languages")) {
      return jsonResponse({ TypeScript: 990, CSS: 5 });
    }
    if (value.endsWith("/repos/101/languages")) {
      return jsonResponse({ HTML: 5 });
    }
    if (value.includes("/languages")) {
      return jsonResponse({});
    }
    return jsonResponse({ message: "Not Found" }, 404);
  };

  const snapshot = await fetchGithubSnapshot({
    fetchImpl,
    username: "ApexYash11",
    now: () => new Date("2026-07-30T12:00:00.000Z"),
  });

  assert.equal(snapshot.publicRepositoryCount, 101);
  assert.equal(snapshot.totalStars, 12);
  assert.equal(snapshot.totalForks, 5);
  assert.equal(snapshot.generatedAt, "2026-07-30T12:00:00.000Z");
  assert.deepEqual(snapshot.languages, [
    {
      name: "TypeScript",
      bytes: 990,
      percentage: 99,
      color: "#3178C6",
    },
    {
      name: "Other",
      bytes: 10,
      percentage: 1,
      color: "#8B949E",
    },
  ]);
});

test("fetchGithubSnapshot uses a single GraphQL request when a token is provided", async () => {
  const requests = [];
  const fetchImpl = async (url, init) => {
    requests.push({ url: String(url), method: init?.method });
    return jsonResponse({
      data: {
        user: {
          name: "Yash Maheshwari",
          createdAt: "2020-04-15T00:00:00Z",
          followers: { totalCount: 14 },
          repositories: {
            pageInfo: { hasNextPage: false, endCursor: null },
            nodes: [
              {
                stargazerCount: 5,
                forkCount: 2,
                languages: {
                  edges: [
                    { size: 900, node: { name: "TypeScript" } },
                    { size: 100, node: { name: "CSS" } },
                  ],
                },
              },
              {
                stargazerCount: 7,
                forkCount: 3,
                languages: {
                  edges: [{ size: 50, node: { name: "TypeScript" } }],
                },
              },
            ],
          },
          contributionsCollection: {
            totalCommitContributions: 10,
            totalPullRequestContributions: 2,
            totalIssueContributions: 1,
            contributionCalendar: {
              totalContributions: 13,
              weeks: [
                {
                  contributionDays: [
                    { date: "2026-07-29", contributionCount: 13 },
                  ],
                },
              ],
            },
          },
        },
        search: {
          issueCount: 2,
          nodes: [
            {
              number: 4277,
              title: "fix(cli): carry reviewers through project set-config",
              mergedAt: "2026-08-02T10:00:00Z",
              url: "https://github.com/Untrivial-ai/agent-orchestrator/pull/4277",
              repository: {
                nameWithOwner: "Untrivial-ai/agent-orchestrator",
                stargazerCount: 12_735,
                owner: { login: "Untrivial-ai" },
              },
            },
            {
              number: 4278,
              title: "feat: self PR",
              mergedAt: "2026-08-03T10:00:00Z",
              url: "https://github.com/ApexYash11/portfolio/pull/4278",
              repository: {
                nameWithOwner: "ApexYash11/portfolio",
                stargazerCount: 3,
                owner: { login: "ApexYash11" },
              },
            },
          ],
        },
      },
    });
  };

  const snapshot = await fetchGithubSnapshot({
    fetchImpl,
    username: "ApexYash11",
    token: "test-token",
    now: () => new Date("2026-09-01T12:00:00.000Z"),
    warn: () => {},
  });

  assert.deepEqual(requests, [
    { url: "https://api.github.com/graphql", method: "POST" },
  ]);
  assert.equal(snapshot.displayName, "Yash Maheshwari");
  assert.equal(snapshot.memberSince, 2020);
  assert.equal(snapshot.followers, 14);
  assert.equal(snapshot.publicRepositoryCount, 2);
  assert.equal(snapshot.totalStars, 12);
  assert.equal(snapshot.totalForks, 5);
  assert.equal(snapshot.contributions.totalContributions, 13);
  assert.deepEqual(
    snapshot.openSource.map((repository) => [
      repository.fullName,
      repository.prs.map((pr) => pr.id),
    ]),
    [["Untrivial-ai/agent-orchestrator", [4277]]],
  );
  assert.deepEqual(
    snapshot.languages.map((language) => [language.name, language.percentage]),
    [
      ["TypeScript", 90.5],
      ["CSS", 9.5],
    ],
  );
});

test("fetchGithubSnapshot falls back to REST when GraphQL fails with a token", async () => {
  const fetchImpl = async (url, init) => {
    const value = String(url);
    if (init?.method === "POST") {
      return jsonResponse({ message: "Bad credentials" }, 401);
    }
    if (value.endsWith("/users/ApexYash11")) {
      return jsonResponse({
        name: "Yash Maheshwari",
        created_at: "2020-04-15T00:00:00Z",
      });
    }
    if (value.includes("/repos?")) {
      return jsonResponse([
        {
          id: 1,
          fork: false,
          stargazers_count: 1,
          forks_count: 0,
          languages_url: "https://api.github.test/repos/1/languages",
        },
      ]);
    }
    if (value.endsWith("/repos/1/languages")) {
      return jsonResponse({ Python: 100 });
    }
    return jsonResponse({ message: "Not Found" }, 404);
  };

  const warnings = [];
  const snapshot = await fetchGithubSnapshot({
    fetchImpl,
    username: "ApexYash11",
    token: "test-token",
    warn: (message) => warnings.push(message),
  });

  assert.equal(snapshot.publicRepositoryCount, 1);
  assert.equal(snapshot.languages[0].name, "Python");
  assert.equal(
    warnings.some((message) => message.includes("falling back to REST")),
    true,
  );
});

test("normalizeLanguages groups individually sub-one-percent entries and totals exactly 100 percent", () => {
  const languages = normalizeLanguages({
    TypeScript: 9_901,
    CSS: 50,
    HTML: 49,
  });

  assert.deepEqual(languages, [
    {
      name: "TypeScript",
      bytes: 9_901,
      percentage: 99,
      color: "#3178C6",
    },
    {
      name: "Other",
      bytes: 99,
      percentage: 1,
      color: "#8B949E",
    },
  ]);
  assert.equal(
    languages.reduce((sum, language) => sum + language.percentage, 0),
    100,
  );
});

test("fetchGithubSnapshot skips individual language failures instead of failing the whole refresh", async () => {
  const fetchImpl = async (url) => {
    const value = String(url);
    if (value.endsWith("/users/ApexYash11")) {
      return jsonResponse({
        name: "Yash Maheshwari",
        created_at: "2020-04-15T00:00:00Z",
      });
    }
    if (value.includes("/repos?")) {
      return jsonResponse([
        {
          id: 1,
          name: "ok-repo",
          fork: false,
          stargazers_count: 1,
          forks_count: 0,
          languages_url: "https://api.github.test/repos/1/languages",
        },
        {
          id: 2,
          name: "rate-limited-repo",
          fork: false,
          stargazers_count: 2,
          forks_count: 1,
          languages_url: "https://api.github.test/repos/2/languages",
        },
      ]);
    }
    if (value.endsWith("/repos/1/languages")) {
      return jsonResponse({ TypeScript: 900 });
    }
    if (value.endsWith("/repos/2/languages")) {
      return jsonResponse({ message: "rate limit exceeded" }, 403);
    }
    return jsonResponse({ message: "Not Found" }, 404);
  };

  const warnings = [];
  const snapshot = await fetchGithubSnapshot({
    fetchImpl,
    username: "ApexYash11",
    warn: (message) => warnings.push(message),
  });

  assert.equal(snapshot.publicRepositoryCount, 2);
  assert.equal(snapshot.totalStars, 3);
  assert.deepEqual(snapshot.languages, [
    {
      name: "TypeScript",
      bytes: 900,
      percentage: 100,
      color: "#3178C6",
    },
  ]);
  assert.equal(
    warnings.some((message) => message.includes("rate-limited-repo")),
    true,
  );
});

test("fetchGithubSnapshot rejects when every language fetch fails", async () => {
  const fetchImpl = async (url) => {
    const value = String(url);
    if (value.endsWith("/users/ApexYash11")) {
      return jsonResponse({
        name: "Yash Maheshwari",
        created_at: "2020-04-15T00:00:00Z",
      });
    }
    if (value.includes("/repos?")) {
      return jsonResponse([
        {
          id: 1,
          name: "broken-repo",
          fork: false,
          stargazers_count: 1,
          forks_count: 0,
          languages_url: "https://api.github.test/repos/1/languages",
        },
      ]);
    }
    if (value.includes("/languages")) {
      return jsonResponse({ message: "rate limit exceeded" }, 403);
    }
    return jsonResponse({ message: "Not Found" }, 404);
  };

  await assert.rejects(
    fetchGithubSnapshot({
      fetchImpl,
      username: "ApexYash11",
      warn: () => {},
    }),
    /All repository language fetches failed/,
  );
});

test("normalizeOpenSource groups merged PRs by repo, drops self-owned repos and sorts newest first", () => {
  const repositories = normalizeOpenSource(
    [
      {
        number: 1152,
        title: "ship a version badge feature",
        mergedAt: "2026-05-02T00:00:00Z",
        url: "https://github.com/traceroot-ai/traceroot/pull/1152",
        repository: {
          nameWithOwner: "traceroot-ai/traceroot",
          stargazerCount: 900,
          owner: { login: "traceroot-ai" },
        },
      },
      {
        number: 2767,
        title: "preflight reviewer binary",
        mergedAt: "2026-06-11T00:00:00Z",
        url: "https://github.com/traceroot-ai/traceroot/pull/2767",
        repository: {
          nameWithOwner: "traceroot-ai/traceroot",
          stargazerCount: 900,
          owner: { login: "traceroot-ai" },
        },
      },
      {
        number: 1,
        title: "own repo change",
        mergedAt: "2026-07-01T00:00:00Z",
        url: "https://github.com/ApexYash11/gatewise/pull/1",
        repository: {
          nameWithOwner: "ApexYash11/gatewise",
          stargazerCount: 1,
          owner: { login: "ApexYash11" },
        },
      },
      {
        number: 2,
        title: "still open",
        mergedAt: null,
        url: "https://github.com/opensre/opensre/pull/2",
        repository: {
          nameWithOwner: "opensre/opensre",
          stargazerCount: 10,
          owner: { login: "opensre" },
        },
      },
      null,
    ],
    "ApexYash11",
  );

  assert.deepEqual(repositories, [
    {
      repo: "traceroot",
      fullName: "traceroot-ai/traceroot",
      url: "https://github.com/traceroot-ai/traceroot",
      stars: 900,
      prs: [
        {
          id: 2767,
          title: "preflight reviewer binary",
          mergedAt: "2026-06-11T00:00:00.000Z",
          url: "https://github.com/traceroot-ai/traceroot/pull/2767",
        },
        {
          id: 1152,
          title: "ship a version badge feature",
          mergedAt: "2026-05-02T00:00:00.000Z",
          url: "https://github.com/traceroot-ai/traceroot/pull/1152",
        },
      ],
    },
  ]);
});

test("normalizeOpenSource hides repositories below the star threshold", () => {
  const nodes = [
    {
      number: 10,
      title: "established fix",
      mergedAt: "2026-08-02T00:00:00Z",
      url: "https://github.com/bigorg/toolkit/pull/10",
      repository: {
        nameWithOwner: "bigorg/toolkit",
        stargazerCount: 4_200,
        owner: { login: "bigorg" },
      },
    },
    {
      number: 3,
      title: "hackathon fix",
      mergedAt: "2026-08-02T00:00:00Z",
      url: "https://github.com/someone-else/hackathon-repo/pull/3",
      repository: {
        nameWithOwner: "someone-else/hackathon-repo",
        stargazerCount: 0,
        owner: { login: "someone-else" },
      },
    },
  ];

  assert.deepEqual(
    normalizeOpenSource(nodes, "ApexYash11").map((repo) => repo.fullName),
    ["bigorg/toolkit", "someone-else/hackathon-repo"],
  );
  assert.deepEqual(
    normalizeOpenSource(nodes, "ApexYash11", { minStars: 200 }).map(
      (repo) => repo.fullName,
    ),
    ["bigorg/toolkit"],
  );
});

test("refreshSnapshot preserves a valid snapshot when refresh fails", async () => {
  const directory = await mkdtemp(join(tmpdir(), "github-stats-"));
  const outputPath = join(directory, "github-stats.json");
  await writeFile(outputPath, `${JSON.stringify(validSnapshot, null, 2)}\n`);

  const snapshot = await refreshSnapshot({
    outputPath,
    load: async () => {
      throw new Error("GitHub unavailable");
    },
    warn: () => {},
  });

  assert.deepEqual(snapshot, validSnapshot);
  assert.deepEqual(
    JSON.parse(await readFile(outputPath, "utf8")),
    validSnapshot,
  );
});

test("refreshSnapshot rejects a failed refresh when no valid snapshot exists", async () => {
  const directory = await mkdtemp(join(tmpdir(), "github-stats-"));
  const outputPath = join(directory, "github-stats.json");
  await writeFile(outputPath, '{"partial":true}\n');

  await assert.rejects(
    refreshSnapshot({
      outputPath,
      load: async () => {
        throw new Error("GitHub unavailable");
      },
      warn: () => {},
    }),
    /GitHub unavailable/,
  );
  assert.equal(await readFile(outputPath, "utf8"), '{"partial":true}\n');
});
