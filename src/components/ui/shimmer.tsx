import { cn } from "@/lib/utils";

interface ShimmerLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ShimmerLoader = ({ className, ...props }: ShimmerLoaderProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 rounded relative overflow-hidden",
        "after:absolute after:inset-0",
        "after:translate-x-[-100%]",
        "after:animate-[shimmer_1.5s_infinite]",
        "after:bg-gradient-to-r",
        "after:from-transparent after:via-white/10 after:to-transparent",
        className
      )}
      {...props}
    />
  );
};

// Export both names for compatibility
export const Shimmer = ShimmerLoader;