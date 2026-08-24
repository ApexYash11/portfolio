import BlurFade from "@/components/magicui/blur-fade";
import BentoGrid from "@/components/stats/bento-grid";

export default function StatsSection() {
  return (
    <section id="stats" className="flex flex-col gap-6 w-full">
      <BlurFade inView>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            A live snapshot of what I build, ship, and share.
          </p>
        </div>
      </BlurFade>
      <BlurFade inView delay={0.08}>
        <BentoGrid />
      </BlurFade>
    </section>
  );
}
