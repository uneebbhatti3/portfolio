import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// twMerge lets a caller's className override a primitive's default utilities.
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
