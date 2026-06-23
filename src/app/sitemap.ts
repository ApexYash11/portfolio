import { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { getAllCaseStudySlugs } from "@/data/case-studies";

const base = "https://yashmaheshwari.is-a.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const caseSlugs = getAllCaseStudySlugs();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...allPosts.map((post) => {
      const slug = post._meta.path.replace(/\.mdx$/, "");
      return {
        url: `${base}/blog/${slug}`,
        lastModified: new Date(post.updatedAt ?? post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
    ...caseSlugs.map((slug) => ({
      url: `${base}/case-study/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
