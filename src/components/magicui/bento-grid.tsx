import { cn } from "@/lib/utils";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

interface BentoGridItemProps {
  className?: string;
  children: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:auto-rows-[22rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({ className, children }: BentoGridItemProps) {
  return (
    <div className={cn("h-full min-h-[20rem]", className)}>
      {children}
    </div>
  );
}
