import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ChipProps {
  children: ReactNode;
  icon?: string;
  mono?: boolean;
}

export default function Chip({ children, icon, mono }: ChipProps) {
  return (
    <span className="inline-flex items-center gap-2.25 rounded-full border border-line bg-chip px-3.5 py-2 text-[13px] text-fg transition-[border-color] duration-150 hover:border-mut">
      {icon && (
        <Image
          src={`/icons/${icon}.svg`}
          alt=""
          width={16}
          height={16}
          className={cn('size-4 flex-none', mono && 'dark:invert')}
        />
      )}
      {children}
    </span>
  );
}
