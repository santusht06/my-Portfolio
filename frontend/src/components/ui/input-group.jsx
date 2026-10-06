import * as React from "react";
import { cn } from "@/lib/utils";

export const InputGroup = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black focus-within:ring-1 focus-within:ring-black dark:focus-within:ring-white transition-[border-color,box-shadow] duration-150 overflow-hidden flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
InputGroup.displayName = "InputGroup";

export const InputGroupTextarea = React.forwardRef(
  ({ className, rows = 5, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full bg-transparent p-3 text-sm text-black dark:text-white placeholder-[#909092] outline-none resize-none font-sans leading-relaxed focus:outline-none",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroupTextarea.displayName = "InputGroupTextarea";

export const InputGroupAddon = React.forwardRef(
  ({ className, align = "block-end", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center px-3 py-1.5 bg-black/[0.02] dark:bg-white/[0.02]",
          align === "block-end" ? "justify-end border-t border-black/[0.06] dark:border-white/[0.06]" : "justify-start border-b border-black/[0.06] dark:border-white/[0.06]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
InputGroupAddon.displayName = "InputGroupAddon";

export const InputGroupText = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("text-[11px] font-mono text-[#909092]", className)}
      {...props}
    >
      {children}
    </span>
  );
});
InputGroupText.displayName = "InputGroupText";
