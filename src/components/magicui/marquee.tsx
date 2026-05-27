import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: number;
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  duration = 28,
}: MarqueeProps) {
  return (
    <div className={cn("group relative flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex min-w-max shrink-0 items-center gap-3 animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
