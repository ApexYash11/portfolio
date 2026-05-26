import BlurFade from "@/components/magicui/blur-fade";
import GithubStatsCard from "@/components/stats/github-stats-card";
import SocialNetworkCard from "@/components/stats/social-network-card";
import DailyQuoteCard from "@/components/stats/daily-quote-card";

const BLUR_FADE_DELAY = 0.04;

export default function StatsSection() {
  return (
    <section id="stats" className="flex flex-col gap-6">
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <GithubStatsCard />
      </BlurFade>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <SocialNetworkCard />
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <DailyQuoteCard />
        </BlurFade>
      </div>
    </section>
  );
}
