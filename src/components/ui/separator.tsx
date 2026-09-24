import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export default function Separator({
  className,
  ...props
}: ComponentProps<"hr">) {
  return (
    <hr className={cn("my-12 border-t border-line", className)} {...props} />
  );
}
