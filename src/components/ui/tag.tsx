import type { ReactNode } from 'react';

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-chip px-2.5 py-1 font-mono text-[11px] text-mut">
      {children}
    </span>
  );
}
