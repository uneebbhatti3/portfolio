import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  children: ReactNode;
  size?: "md" | "xl";
  flush?: boolean;
}

const sizes = {
  md: "text-[clamp(26px,4vw,40px)] tracking-[-.03em]",
  xl: "text-[clamp(40px,8vw,96px)] leading-none tracking-[-.045em]",
} as const;

export default function SectionHeading({
  children,
  size = "md",
  flush,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "rv font-semibold",
        sizes[size],
        flush ? "mb-0" : size === "xl" ? "mb-7.5" : "mb-10",
      )}
    >
      {children}
    </h2>
  );
}
