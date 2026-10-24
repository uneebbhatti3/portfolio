import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

/** Rounded bento surface. Translucent so the 3D scene reads faintly behind it. */
export default function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rv relative overflow-hidden rounded-3xl border border-line bg-card p-6 sm:p-8',
        className,
      )}
      {...props}
    />
  );
}
