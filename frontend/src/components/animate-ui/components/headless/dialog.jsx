import * as React from "react";
import {
  Dialog as DialogPrimitive,
  DialogPanel as DialogPanelPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogFooter as DialogFooterPrimitive,
  DialogHeader as DialogHeaderPrimitive,
  DialogTitle as DialogTitlePrimitive,
  DialogBackdrop as DialogBackdropPrimitive,
  DialogClose as DialogClosePrimitive,
} from "@/components/animate-ui/primitives/headless/dialog";
import { cn } from "@/lib/utils";
import { FiX } from "react-icons/fi";

function Dialog(props) {
  return <DialogPrimitive {...props} />;
}

function DialogClose(props) {
  return <DialogClosePrimitive {...props} />;
}

function DialogBackdrop({ className, ...props }) {
  return (
    <DialogBackdropPrimitive
      className={cn(
        "fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}

function DialogPanel({
  className,
  children,
  showCloseButton = true,
  from = "top",
  containerClassName,
  ...props
}) {
  return (
    <>
      <DialogBackdrop />
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none",
          containerClassName
        )}
      >
        <DialogPanelPrimitive
          from={from}
          className={cn(
            "pointer-events-auto relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#0b0b0b] text-black dark:text-white border border-black/10 dark:border-white/10 p-6 shadow-2xl focus:outline-none",
            className
          )}
          {...props}
        >
          {(bag) => (
            <>
              {typeof children === "function" ? children(bag) : children}
              {showCloseButton && (
                <DialogClosePrimitive className="absolute top-4 right-4 rounded-lg p-1.5 text-[#909092] hover:text-black dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-[color,background-color] duration-150 ease-smooth cursor-pointer focus:outline-none">
                  <FiX className="text-base" />
                  <span className="sr-only">Close</span>
                </DialogClosePrimitive>
              )}
            </>
          )}
        </DialogPanelPrimitive>
      </div>
    </>
  );
}

function DialogHeader({ as = "div", className, ...props }) {
  return (
    <DialogHeaderPrimitive
      as={as}
      className={cn("flex flex-col gap-1.5 text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }) {
  return (
    <DialogFooterPrimitive
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <DialogTitlePrimitive
      className={cn(
        "text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <DialogDescriptionPrimitive
      className={cn("text-xs sm:text-sm text-[#909092]", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogBackdrop,
  DialogPanel,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
