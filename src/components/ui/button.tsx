import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ComponentProps<typeof Link> {
  variant?: "primary" | "secondary";
}

const variants = {
  primary: "border-fg bg-fg text-bg",
  secondary:
    "border-line bg-transparent text-fg hover:border-mut hover:bg-chip",
} as const;

export default function Button({
  variant = "secondary",
  className,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(
        "mag inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium",
        "transition-[transform,background-color,border-color] duration-160 ease-emil active:scale-[.97]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
