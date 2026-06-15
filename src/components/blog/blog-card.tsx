import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  summary: string;
  readTime: number;
  slug: string;
  className?: string;
}

export function BlogCard({ title, summary, readTime, slug, className }: Props) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "flex flex-col h-full border border-border rounded-xl p-6 hover:ring-2 hover:ring-muted transition-all duration-200 group",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-base md:text-lg line-clamp-2 group-hover:text-foreground transition-colors">
          {title}
        </h3>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
        {summary}
      </p>
      <p className="text-xs text-muted-foreground/70 mt-4">
        {readTime} min read
      </p>
    </Link>
  );
}
