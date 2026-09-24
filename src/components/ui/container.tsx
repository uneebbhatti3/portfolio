import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export default function Container({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("mx-auto max-w-260 px-6", className)} {...props} />;
}
