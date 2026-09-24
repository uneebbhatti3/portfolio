import type { ComponentProps } from "react";
import Container from "@/components/ui/container";
import { cn } from "@/lib/cn";

export default function TwoColumn({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <Container
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.6fr] md:gap-10",
        className,
      )}
      {...props}
    />
  );
}
