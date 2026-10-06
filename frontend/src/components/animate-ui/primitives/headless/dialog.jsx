import * as React from "react";
import {
  Dialog as DialogPrimitive,
  DialogBackdrop as DialogBackdropPrimitive,
  DialogPanel as DialogPanelPrimitive,
  DialogTitle as DialogTitlePrimitive,
  Description as DialogDescriptionPrimitive,
  CloseButton,
} from "@headlessui/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function Dialog({ className, open, onClose, children, ...props }) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <DialogPrimitive
          data-slot="dialog"
          open={open}
          onClose={onClose}
          className={className}
          static
          {...props}
        >
          {children}
        </DialogPrimitive>
      )}
    </AnimatePresence>
  );
}

function DialogBackdrop({
  as = motion.div,
  transition = { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  ...props
}) {
  return (
    <DialogBackdropPrimitive
      key="dialog-backdrop"
      data-slot="dialog-backdrop"
      as={as}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition }}
      exit={{ opacity: 0, transition: { duration: 0.12, ease: "easeIn" } }}
      style={{ willChange: "opacity" }}
      {...props}
    />
  );
}

function DialogPanel({
  children,
  as = motion.div,
  from = "top",
  transition,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const isVertical = from === "top" || from === "bottom";

  // Production-grade micro-offset (never extreme 18deg or 20deg warping)
  const initialOffset = isVertical ? (from === "bottom" ? 10 : -10) : (from === "right" ? 10 : -10);
  const initialRotate = isVertical ? (from === "bottom" ? 3 : -3) : (from === "right" ? -3 : 3);

  const initialProps = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        scale: 0.97,
        y: isVertical ? initialOffset : 0,
        x: !isVertical ? initialOffset : 0,
        rotateX: isVertical ? initialRotate : 0,
        rotateY: !isVertical ? initialRotate : 0,
      };

  const animateProps = shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        rotateX: 0,
        rotateY: 0,
        transition: transition || {
          type: "spring",
          stiffness: 460,
          damping: 34,
          mass: 0.8,
        },
      };

  const exitProps = shouldReduceMotion
    ? { opacity: 0, transition: { duration: 0.1 } }
    : {
        opacity: 0,
        scale: 0.98,
        y: isVertical ? (from === "bottom" ? 6 : -6) : 0,
        x: !isVertical ? (from === "right" ? 6 : -6) : 0,
        transition: {
          duration: 0.12,
          ease: [0.32, 0, 0.67, 0],
        },
      };

  const transformOrigin =
    from === "top"
      ? "50% 0%"
      : from === "bottom"
      ? "50% 100%"
      : from === "left"
      ? "0% 50%"
      : "100% 50%";

  return (
    <DialogPanelPrimitive
      key="dialog-panel"
      data-slot="dialog-panel"
      as={as}
      initial={initialProps}
      animate={animateProps}
      exit={exitProps}
      style={{
        transformPerspective: 1200,
        transformOrigin,
        willChange: "transform, opacity",
      }}
      {...props}
    >
      {(bag) => (
        <>{typeof children === "function" ? children(bag) : children}</>
      )}
    </DialogPanelPrimitive>
  );
}

function DialogClose({ as = "button", ...props }) {
  return (
    <CloseButton
      data-slot="dialog-close"
      as={as}
      {...props}
    />
  );
}

function DialogHeader({ as: Component = "div", ...props }) {
  return <Component data-slot="dialog-header" {...props} />;
}

function DialogFooter({ as: Component = "div", ...props }) {
  return <Component data-slot="dialog-footer" {...props} />;
}

function DialogTitle(props) {
  return <DialogTitlePrimitive data-slot="dialog-title" {...props} />;
}

function DialogDescription(props) {
  return (
    <DialogDescriptionPrimitive data-slot="dialog-description" {...props} />
  );
}

export {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
};
