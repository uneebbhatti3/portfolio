import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  children: ReactNode;
  eyebrow: string;
  id?: string;
  aside?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  children,
  eyebrow,
  id,
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'rv mb-10 flex flex-wrap items-end justify-between gap-6',
        className,
      )}
    >
      <div>
        <p className="mb-3 font-mono text-xs tracking-[.14em] text-acc uppercase">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-.045em]"
        >
          {children}
        </h2>
      </div>
      {aside && (
        <div className="max-w-sm text-[15px] leading-7 text-mut">{aside}</div>
      )}
    </div>
  );
}
