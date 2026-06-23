import { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { getAllCaseStudySlugs } from "@/data/case-studies";

const base = "https://yashmaheshwari.is-a.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = allPosts.map((post) => post._meta.path.replace(/\.mdx$/, ""));
  const caseSlugs = getAllCaseStudySlugs();

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogSlugs.map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseSlugs.map((slug) => ({
      url: `${base}/case-study/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
