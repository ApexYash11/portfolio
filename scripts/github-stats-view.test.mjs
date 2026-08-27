import assert from "node:assert/strict";
import test from "node:test";

import { getGithubStatTiles } from "../src/lib/github-stats-view.mjs";

test("getGithubStatTiles always returns repository, star, and fork totals from the snapshot", () => {
  const tiles = getGithubStatTiles({
    publicRepositoryCount: 30,
    totalStars: 2,
    totalForks: 4,
  });

  assert.deepEqual(tiles, [
    { label: "Repositories", value: 30 },
    { label: "Stars", value: 2 },
    { label: "Forks", value: 4 },
  ]);
});
