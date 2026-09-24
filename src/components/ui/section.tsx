import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const spacings = {
  default: "pt-[110px] pb-[30px]",
  cta: "pt-[120px] pb-20",
  none: "",
} as const;

interface SectionProps extends ComponentProps<"section"> {
  spacing?: keyof typeof spacings;
}

export default function Section({
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return <section className={cn(spacings[spacing], className)} {...props} />;
}
