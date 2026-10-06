import React from "react";

export const Button = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-mono font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-smooth motion-safe:active:scale-[0.97] motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      default: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-sm",
      outline:
        "border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:border-black/20 dark:hover:border-white/20 text-[#909092] hover:text-black dark:hover:text-white shadow-sm",
      secondary: "bg-black/[0.05] dark:bg-white/[0.08] text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12]",
      ghost: "hover:bg-black/[0.05] dark:hover:bg-white/[0.06] text-[#909092] hover:text-black dark:hover:text-white",
      link: "text-[#909092] hover:text-black dark:hover:text-white underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-8 px-3.5 py-1.5",
      sm: "h-7 rounded-md px-2.5 text-[11px]",
      lg: "h-9 rounded-lg px-4 text-sm",
      icon: "h-8 w-8 rounded-full",
    };

    const combinedClassName = `${baseStyles} ${variants[variant] || variants.default} ${
      sizes[size] || sizes.default
    } ${className}`;

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
