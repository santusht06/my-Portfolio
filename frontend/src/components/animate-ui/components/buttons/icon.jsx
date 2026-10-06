'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-[background-color,border-color,color,transform,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-white/30 motion-safe:active:scale-95 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white border border-white/[0.08] hover:border-white/20 shadow-sm',
        outline:
          'border border-white/10 hover:border-white/25 bg-transparent hover:bg-white/[0.05] text-zinc-300 hover:text-white shadow-xs',
        ghost:
          'hover:bg-white/[0.08] text-zinc-400 hover:text-white',
        secondary:
          'bg-white/10 hover:bg-white/15 text-white border border-white/10',
      },
      size: {
        default: 'size-8 [&_svg]:size-4',
        sm: 'size-7 [&_svg]:size-3.5',
        lg: 'size-9 [&_svg]:size-4.5',
        icon: 'size-8 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export function IconButton({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
