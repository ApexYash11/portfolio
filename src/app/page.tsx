/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Marquee } from "@/components/magicui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import StatsSection from "@/components/section/stats-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;
const SKILL_SPLIT_INDEX = Math.ceil(DATA.skills.length / 2);
const SKILL_ROW_ONE = DATA.skills.slice(0, SKILL_SPLIT_INDEX);
const SKILL_ROW_TWO = DATA.skills.slice(SKILL_SPLIT_INDEX);

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row md:items-start md:gap-x-10">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2 md:ml-auto">
              <Avatar className="h-40 w-28 md:h-56 md:w-40 border rounded-2xl shadow-lg ring-2 ring-muted/60">
                <AvatarImage
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  className="!aspect-auto h-full w-full object-contain bg-black/20"
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="relative flex flex-col gap-3 overflow-hidden rounded-xl border border-border/60 bg-card/35 p-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-background to-transparent" />
              <Marquee duration={26}>
                {SKILL_ROW_ONE.map((skill) => (
                  <div
                    key={`row1-${skill.name}`}
                    className="border border-border/70 bg-white/[0.06] dark:bg-white/[0.06] backdrop-blur-sm ring-1 ring-white/10 rounded-xl h-8 w-fit px-4 flex items-center gap-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                  >
                    {skill.icon && (
                      <skill.icon
                        className="size-4 rounded overflow-hidden object-contain"
                        style={skill.color ? { color: skill.color, fill: skill.color } : undefined}
                      />
                    )}
                    <span className="text-foreground text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </Marquee>
              <Marquee reverse duration={30}>
                {SKILL_ROW_TWO.map((skill) => (
                  <div
                    key={`row2-${skill.name}`}
                    className="border border-border/70 bg-white/[0.06] dark:bg-white/[0.06] backdrop-blur-sm ring-1 ring-white/10 rounded-xl h-8 w-fit px-4 flex items-center gap-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                  >
                    {skill.icon && (
                      <skill.icon
                        className="size-4 rounded overflow-hidden object-contain"
                        style={skill.color ? { color: skill.color, fill: skill.color } : undefined}
                      />
                    )}
                    <span className="text-foreground text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </Marquee>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <StatsSection />
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
