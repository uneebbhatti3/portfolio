import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  dot?: boolean;
}

export default function Badge({ children, dot }: BadgeProps) {
  return (
    <span className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-mut">
      {dot && (
        <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-[#2fbf71]" />
      )}
      {children}
    </span>
  );
}
