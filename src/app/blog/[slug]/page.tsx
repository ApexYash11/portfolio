import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { extractToc, readMarkdownFile } from "@/lib/article-markdown";
import { MarkdownRenderer } from "@/components/mdx/markdown-renderer";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { join } from "path";

const DOC_BACKED_BLOGS: Record<string, string> = {
  "deep-agents": join("old-site", "docs", "deepagents", "deep_agents_complete.md"),
  "mcp": join("old-site", "docs", "mcp", "mcp_blog_plan.md"),
  "rag-langsmith": join("old-site", "docs", "langsmith-rag", "rag_langsmith_blog_plan.md"),
};

function getSortedPosts() {
  return [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug);

  if (!post) {
    return undefined;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      ...(image && {
        images: [
          {
            url: `${DATA.url}${image}`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [`${DATA.url}${image}`],
      }),
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const docsRelativePath = DOC_BACKED_BLOGS[slug];
  const isDocBackedPost = Boolean(docsRelativePath);
  const docBackedMarkdown = isDocBackedPost
    ? readMarkdownFile(join(process.cwd(), docsRelativePath))
    : "";
  const tocItems = isDocBackedPost ? extractToc(docBackedMarkdown) : [];

  const getSlug = (post: (typeof sortedPosts)[0]) =>
    post._meta.path.replace(/\.mdx$/, "");

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${DATA.url}${post.image}`
      : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: DATA.name,
    },
  }).replace(/</g, "\\u003c");

  const blogShellClassName = isDocBackedPost
    ? "relative left-1/2 w-screen -translate-x-1/2 px-6 sm:px-8"
    : "";

  const blogInnerClassName = isDocBackedPost
    ? "mx-auto w-full max-w-6xl"
    : "";

  return (
    <section id="blog">
      <div className={blogShellClassName}>
        <div className={blogInnerClassName}>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: jsonLdContent,
            }}
          />
          <div className="flex justify-start gap-4 items-center">
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group" aria-label="Back to Blog">
              <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
              Back to Blog
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
              {post.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.publishedAt)}
            </p>
          </div>
          <div className="my-6 flex w-full items-center">
            <div
              className="flex-1 h-px bg-border"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              }}
            />
          </div>
          {isDocBackedPost ? (
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="min-w-0">
            {tocItems.length > 0 && (
              <details className="group lg:hidden rounded-2xl border border-border bg-background/80 p-4 backdrop-blur-sm">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
                  On this page
                </summary>
                <nav aria-label="Table of contents" className="mt-4">
                  <ol className="space-y-2 text-sm leading-6">
                    {tocItems.map((item) => (
                      <li
                        key={`${item.id}-mobile-${item.level}`}
                        className={item.level === 3 ? "pl-4" : item.level === 4 ? "pl-8" : ""}
                      >
                        <a
                          href={`#${item.id}`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>
            )}
            <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <MarkdownRenderer markdown={docBackedMarkdown} />
            </article>
          </div>

          {tocItems.length > 0 && (
            <aside className="hidden lg:block lg:pl-2">
              <div className="sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background/80 p-5 backdrop-blur-sm animate-in fade-in-0 slide-in-from-right-4 duration-700">
                <div className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  On this page
                </div>
                <TableOfContents items={tocItems} className="min-h-0 flex-1 overflow-y-auto pr-2" />
              </div>
            </aside>
          )}
        </div>
      ) : (
        <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <MDXContent code={post.mdx} components={mdxComponents} />
        </article>
      )}

          <nav className="mt-12 pt-8 max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {previousPost ? (
            <Link
              href={`/blog/${getSlug(previousPost)}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {previousPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${getSlug(nextPost)}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
