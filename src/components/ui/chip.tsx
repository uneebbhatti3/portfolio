import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChipProps {
  children: ReactNode;
  icon?: string;
  mono?: boolean;
}

export default function Chip({ children, icon, mono }: ChipProps) {
  return (
    <span className="inline-flex items-center gap-2.25 rounded-full border border-line px-3.5 py-1.75 text-[13px] text-fg transition-[border-color,background-color] duration-150 hover:border-acc hover:bg-chip">
      {icon && (
        <Image
          src={`/icons/${icon}.svg`}
          alt=""
          width={16}
          height={16}
          className={cn("size-4 flex-none", mono && "dark:invert")}
        />
      )}
      {children}
    </span>
  );
}
