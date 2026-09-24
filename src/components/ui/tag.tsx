import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-chip px-2.25 py-0.75 font-mono text-[11px] text-mut">
      {children}
    </span>
  );
}
