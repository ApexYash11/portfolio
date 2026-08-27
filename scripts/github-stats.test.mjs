import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  fetchGithubSnapshot,
  normalizeLanguages,
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
