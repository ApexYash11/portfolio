import BlurFade from "@/components/magicui/blur-fade";
import GithubStatsCard from "@/components/stats/github-stats-card";
import DeveloperEcosystem from "@/components/DeveloperEcosystem";
import DailyQuoteCard from "@/components/stats/daily-quote-card";

export default function StatsSection() {
  return (
    <section id="stats" className="flex flex-col gap-6 w-full">
      <BlurFade inView>
        <GithubStatsCard />
      </BlurFade>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BlurFade inView>
          <DeveloperEcosystem />
        </BlurFade>
        <BlurFade inView delay={0.08}>
          <DailyQuoteCard />
        </BlurFade>
      </div>
    </section>
  );
}
