import { readFileSync } from "fs";

export type TocItem = {
  level: number;
  text: string;
  id: string;
};

export function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]*/, "");
}

export function slugifyText(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function cleanHeadingText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/<br\s*\/?>(\s*)/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractToc(markdown: string) {
  const body = stripFrontmatter(markdown);
  const toc: TocItem[] = [];

  for (const line of body.split(/\r?\n/)) {
    const match = /^(#{2,4})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = cleanHeadingText(match[2]);

    if (!text || /^table of contents$/i.test(text)) {
      continue;
    }

    toc.push({
      level,
      text,
      id: slugifyText(text),
    });
  }

  return toc;
}

export function readMarkdownFile(filePath: string) {
  return readFileSync(filePath, "utf8");
}