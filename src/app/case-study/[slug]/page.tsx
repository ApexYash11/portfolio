import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCaseStudy, getAllCaseStudySlugs } from "@/data/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} — Case Study`,
    description: study.summary,
    alternates: {
      canonical: `/case-study/${slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <section id="case-study">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-8 group"
          aria-label="Back to Home"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Back to Home
        </Link>

        <div className="flex flex-col gap-4 mb-8">
          <h1 className="font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
            {study.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {study.summary}
          </p>
        </div>

        <div className="h-px bg-border mb-10" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }} />

        {/* Problem */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">The Problem</h2>
          <p className="text-muted-foreground leading-relaxed">
            {study.problem}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {study.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-sm font-medium border-border h-7 px-3"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Key Features</h2>
          <ul className="space-y-3">
            {study.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges & Solutions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-6">Challenges &amp; Solutions</h2>
          <div className="space-y-6">
            {study.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="border border-border rounded-xl p-6"
              >
                <h3 className="font-semibold text-base mb-3">
                  {challenge.title}
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground/60 font-medium text-xs uppercase tracking-wider">Problem</span>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      {challenge.problem}
                    </p>
                  </div>
                  <div>
                    <span className="text-foreground/60 font-medium text-xs uppercase tracking-wider">Solution</span>
                    <p className="text-muted-foreground mt-1 leading-relaxed">
                      {challenge.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div className="border border-border rounded-xl p-6 bg-card/35">
          <h2 className="text-xl font-bold mb-4">Outcome</h2>
          <p className="text-muted-foreground leading-relaxed">
            {study.outcome}
          </p>
        </div>
      </div>
    </section>
  );
}
