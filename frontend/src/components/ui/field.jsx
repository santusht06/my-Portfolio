import * as React from "react";
import { cn } from "@/lib/utils";

export const FieldGroup = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col gap-4.5", className)} {...props}>
      {children}
    </div>
  );
});
FieldGroup.displayName = "FieldGroup";

export const Field = React.forwardRef(
  ({ className, orientation = "vertical", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "flex-row items-center justify-end gap-3"
            : "flex-col gap-1.5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Field.displayName = "Field";

export const FieldLabel = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-xs font-mono font-medium text-black dark:text-white tracking-tight flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
});
FieldLabel.displayName = "FieldLabel";

export const FieldDescription = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-[11px] font-mono text-[#909092] leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FieldDescription.displayName = "FieldDescription";

export const FieldError = React.forwardRef(({ className, errors, children, ...props }, ref) => {
  const errorText = errors && errors.length > 0 ? errors[0]?.message : children;
  if (!errorText) return null;

  return (
    <p
      ref={ref}
      className={cn("text-[11px] font-mono text-red-500 flex items-center gap-1", className)}
      role="alert"
      {...props}
    >
      <span>⚠</span> {errorText}
    </p>
  );
});
FieldError.displayName = "FieldError";
