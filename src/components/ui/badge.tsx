import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps extends ComponentProps<'span'> {
  dot?: boolean;
}

export default function Badge({
  children,
  dot,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-mono text-xs text-mut',
        className,
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#2fbf71] opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-[#2fbf71]" />
        </span>
      )}
      {children}
    </span>
  );
}
