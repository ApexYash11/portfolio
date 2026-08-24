import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API_ROOT = "https://api.github.com";
const DEFAULT_USERNAME = "ApexYash11";

const LANGUAGE_COLORS = {
  Python: "#3572A5",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  HTML: "#E34C26",
  "Jupyter Notebook": "#DA5B0B",
  CSS: "#563D7C",
  Other: "#8B949E",
};

function languageColor(name) {
  if (LANGUAGE_COLORS[name]) return LANGUAGE_COLORS[name];

  let hash = 0;
  for (const character of name) {
    hash = (hash * 31 + character.charCodeAt(0)) % 360;
  }
  return `hsl(${hash}, 55%, 50%)`;
}

function responseError(url, response) {
  const remaining = response.headers.get("x-ratelimit-remaining");
  const reset = response.headers.get("x-ratelimit-reset");
  const rateLimit =
    remaining === null
      ? ""
      : `, rate limit remaining ${remaining}${reset ? `, resets ${new Date(Number(reset) * 1_000).toISOString()}` : ""}`;
  return new Error(
    `GitHub request failed: ${url} (${response.status} ${response.statusText}${rateLimit})`,
  );
}

async function requestJson(fetchImpl, url, token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ApexYash11-portfolio-stats",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetchImpl(url, { headers });
  if (!response.ok) throw responseError(url, response);
  return response.json();
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  const workerCount = Math.min(Math.max(1, limit), items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

export function normalizeLanguages(languageBytes) {
  const entries = Object.entries(languageBytes)
    .filter(([, bytes]) => Number.isFinite(bytes) && bytes > 0)
    .sort((a, b) => b[1] - a[1]);
  const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (totalBytes === 0) return [];

  const primary = [];
  let otherBytes = 0;

  for (const [name, bytes] of entries) {
    if ((bytes / totalBytes) * 100 < 1) {
      otherBytes += bytes;
    } else {
      primary.push([name, bytes]);
    }
  }
  if (otherBytes > 0) primary.push(["Other", otherBytes]);

  const apportioned = primary.map(([name, bytes]) => {
    const exactTenths = (bytes / totalBytes) * 1_000;
    return {
      name,
      bytes,
      tenths: Math.floor(exactTenths),
      remainder: exactTenths - Math.floor(exactTenths),
    };
  });

  let remainingTenths =
    1_000 - apportioned.reduce((sum, language) => sum + language.tenths, 0);
  const remainderOrder = [...apportioned].sort(
    (a, b) => b.remainder - a.remainder || b.bytes - a.bytes,
  );
  for (let index = 0; index < remainingTenths; index += 1) {
    remainderOrder[index % remainderOrder.length].tenths += 1;
  }

  return apportioned.map(({ name, bytes, tenths }) => ({
    name,
    bytes,
    percentage: tenths / 10,
    color: languageColor(name),
  }));
}

const CONTRIBUTIONS_QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

async function fetchContributions({ fetchImpl, username, token, warn }) {
  if (!token) return null;
  try {
    const response = await fetchImpl("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "ApexYash11-portfolio-stats",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { login: username },
      }),
    });
    if (!response.ok) throw responseError("https://api.github.com/graphql", response);
    const payload = await response.json();
    if (payload.errors) throw new Error(payload.errors.map((e) => e.message).join("; "));
    const collection = payload.data?.user?.contributionsCollection;
    if (!collection?.contributionCalendar?.weeks) return null;

    const weeks = collection.contributionCalendar.weeks
      .map((week) => ({
        days: (week.contributionDays || []).map((day) => ({
          date: day.date,
          count: day.contributionCount,
        })),
      }))
      .filter((week) => week.days.length > 0);

    return {
      totalContributions: collection.contributionCalendar.totalContributions ?? 0,
      totalPullRequests: collection.totalPullRequestContributions ?? 0,
      totalIssues: collection.totalIssueContributions ?? 0,
      weeks,
    };
  } catch (error) {
    warn?.(`Contributions fetch failed; heatmap will be hidden: ${error.message}`);
    return null;
  }
}

export async function fetchGithubSnapshot({
  fetchImpl = fetch,
  username = DEFAULT_USERNAME,
  token,
  concurrency = 6,
  now = () => new Date(),
  warn = console.warn,
} = {}) {
  const encodedUsername = encodeURIComponent(username);
  const userUrl = `${API_ROOT}/users/${encodedUsername}`;
  const user = await requestJson(fetchImpl, userUrl, token);

  const repositories = [];
  const perPage = 100;
  for (let page = 1; ; page += 1) {
    const url = new URL(`${API_ROOT}/users/${encodedUsername}/repos`);
    url.searchParams.set("type", "owner");
    url.searchParams.set("sort", "updated");
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    const pageRepositories = await requestJson(fetchImpl, url, token);
    if (!Array.isArray(pageRepositories)) {
      throw new Error(`GitHub returned invalid repository data: ${url}`);
    }
    repositories.push(...pageRepositories);
    if (pageRepositories.length < perPage) break;
  }

  const languageResults = await mapWithConcurrency(
    repositories,
    concurrency,
    (repository) => requestJson(fetchImpl, repository.languages_url, token),
  );
  const languageBytes = {};
  for (const result of languageResults) {
    if (!result || Array.isArray(result) || typeof result !== "object") {
      throw new Error("GitHub returned invalid language data");
    }
    for (const [name, bytes] of Object.entries(result)) {
      if (!Number.isFinite(bytes) || bytes < 0) {
        throw new Error(`GitHub returned invalid byte count for ${name}`);
      }
      languageBytes[name] = (languageBytes[name] ?? 0) + bytes;
    }
  }

  const contributions = await fetchContributions({
    fetchImpl,
    username,
    token,
    warn,
  });

  return {
    username,
    displayName: user.name || username,
    memberSince: new Date(user.created_at).getUTCFullYear(),
    followers: user.followers ?? 0,
    publicRepositoryCount: repositories.length,
    totalStars: repositories.reduce(
      (sum, repository) => sum + (repository.stargazers_count || 0),
      0,
    ),
    totalForks: repositories.reduce(
      (sum, repository) => sum + (repository.forks_count || 0),
      0,
    ),
    contributions,
    languages: normalizeLanguages(languageBytes),
    generatedAt: now().toISOString(),
  };
}

export function isValidSnapshot(value) {
  if (!value || typeof value !== "object") return false;
  const integerFields = [
    value.memberSince,
    value.publicRepositoryCount,
    value.totalStars,
    value.totalForks,
    value.followers ?? 0,
  ];
  if (
    typeof value.username !== "string" ||
    value.username.length === 0 ||
    typeof value.displayName !== "string" ||
    value.displayName.length === 0 ||
    integerFields.some((field) => !Number.isInteger(field) || field < 0) ||
    !Array.isArray(value.languages) ||
    Number.isNaN(Date.parse(value.generatedAt))
  ) {
    return false;
  }

  if (value.contributions != null) {
    const contributions = value.contributions;
    if (
      typeof contributions !== "object" ||
      !Number.isInteger(contributions.totalContributions) ||
      contributions.totalContributions < 0 ||
      !Array.isArray(contributions.weeks)
    ) {
      return false;
    }
    const validWeeks = contributions.weeks.every(
      (week) =>
        week &&
        Array.isArray(week.days) &&
        week.days.every(
          (day) =>
            day &&
            typeof day.date === "string" &&
            !Number.isNaN(Date.parse(day.date)) &&
            Number.isInteger(day.count) &&
            day.count >= 0,
        ),
    );
    if (!validWeeks) return false;
  }

  const validLanguages = value.languages.every(
    (language) =>
      language &&
      typeof language.name === "string" &&
      Number.isFinite(language.bytes) &&
      language.bytes > 0 &&
      Number.isFinite(language.percentage) &&
      language.percentage > 0 &&
      typeof language.color === "string",
  );
  if (!validLanguages) return false;
  if (value.languages.length === 0) return true;

  const totalPercentage = value.languages.reduce(
    (sum, language) => sum + language.percentage,
    0,
  );
  return Math.abs(totalPercentage - 100) < 0.001;
}

async function readValidSnapshot(outputPath) {
  try {
    const snapshot = JSON.parse(await readFile(outputPath, "utf8"));
    return isValidSnapshot(snapshot) ? snapshot : null;
  } catch {
    return null;
  }
}

export async function refreshSnapshot({
  outputPath,
  load,
  warn = console.warn,
}) {
  try {
    const snapshot = await load();
    if (!isValidSnapshot(snapshot)) {
      throw new Error("Generated GitHub snapshot failed validation");
    }

    await mkdir(dirname(outputPath), { recursive: true });
    const temporaryPath = `${outputPath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`);
    await rename(temporaryPath, outputPath);
    return snapshot;
  } catch (error) {
    const previousSnapshot = await readValidSnapshot(outputPath);
    if (!previousSnapshot) throw error;
    warn(`GitHub stats refresh failed; keeping the previous snapshot: ${error.message}`);
    return previousSnapshot;
  }
}

async function main() {
  const outputPath = resolve("src/data/github-stats.json");
  const snapshot = await refreshSnapshot({
    outputPath,
    load: () =>
      fetchGithubSnapshot({
        username: DEFAULT_USERNAME,
        token: process.env.GITHUB_TOKEN,
      }),
  });
  console.log(
    `GitHub stats ready: ${snapshot.publicRepositoryCount} repositories, generated ${snapshot.generatedAt}`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
