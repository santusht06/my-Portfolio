import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TooltipContext = createContext(null);

export const Tooltip = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  followCursor = false,
  delayDuration = 100,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpen = () => {
    clearTimeout(timeoutRef.current);
    if (delayDuration > 0) {
      timeoutRef.current = setTimeout(() => {
        if (!isControlled) setUncontrolledOpen(true);
        onOpenChange?.(true);
      }, delayDuration);
    } else {
      if (!isControlled) setUncontrolledOpen(true);
      onOpenChange?.(true);
    }
  };

  const handleClose = () => {
    clearTimeout(timeoutRef.current);
    if (!isControlled) setUncontrolledOpen(false);
    onOpenChange?.(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <TooltipContext.Provider
      value={{
        isOpen,
        handleOpen,
        handleClose,
        cursorPos,
        setCursorPos,
        followCursor,
        triggerRef,
      }}
    >
      <div className="relative inline-flex items-center justify-center">
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = ({ render, children, className = "", ...props }) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within Tooltip");

  const { handleOpen, handleClose, setCursorPos, followCursor, triggerRef } = context;

  const handleMouseMove = (e) => {
    if (followCursor) {
      const rect = e.currentTarget.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const triggerProps = {
    ref: triggerRef,
    onMouseEnter: (e) => {
      handleOpen();
      handleMouseMove(e);
    },
    onMouseLeave: handleClose,
    onMouseMove: handleMouseMove,
    onFocus: handleOpen,
    onBlur: handleClose,
    ...props,
  };

  if (render) {
    return React.cloneElement(render, {
      ...triggerProps,
      className: `${render.props.className || ""} ${className}`.trim(),
    });
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...triggerProps,
      className: `${children.props.className || ""} ${className}`.trim(),
    });
  }

  return (
    <button type="button" {...triggerProps} className={className}>
      {children}
    </button>
  );
};

export const TooltipPanel = ({
  children,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  showArrow = true,
  className = "",
  style = {},
  ...props
}) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipPanel must be used within Tooltip");

  const { isOpen, followCursor, cursorPos } = context;

  // Positioning calculations based on side and align
  let positionClasses = "";
  let arrowClasses = "";
  let initialTransform = {};
  let exitTransform = {};

  switch (side) {
    case "top":
      positionClasses = "bottom-full left-1/2 -translate-x-1/2";
      arrowClasses = "-bottom-1 left-1/2 -translate-x-1/2";
      initialTransform = { y: 4, scale: 0.95, opacity: 0 };
      exitTransform = { y: 4, scale: 0.95, opacity: 0 };
      break;
    case "bottom":
      positionClasses = "top-full left-1/2 -translate-x-1/2";
      arrowClasses = "-top-1 left-1/2 -translate-x-1/2";
      initialTransform = { y: -4, scale: 0.95, opacity: 0 };
      exitTransform = { y: -4, scale: 0.95, opacity: 0 };
      break;
    case "left":
      positionClasses = "right-full top-1/2 -translate-y-1/2";
      arrowClasses = "-right-1 top-1/2 -translate-y-1/2";
      initialTransform = { x: 4, scale: 0.95, opacity: 0 };
      exitTransform = { x: 4, scale: 0.95, opacity: 0 };
      break;
    case "right":
      positionClasses = "left-full top-1/2 -translate-y-1/2";
      arrowClasses = "-left-1 top-1/2 -translate-y-1/2";
      initialTransform = { x: -4, scale: 0.95, opacity: 0 };
      exitTransform = { x: -4, scale: 0.95, opacity: 0 };
      break;
    default:
      positionClasses = "bottom-full left-1/2 -translate-x-1/2";
      arrowClasses = "-bottom-1 left-1/2 -translate-x-1/2";
      initialTransform = { y: 4, scale: 0.95, opacity: 0 };
      exitTransform = { y: 4, scale: 0.95, opacity: 0 };
  }

  if (!followCursor) {
    if (align === "start") {
      positionClasses = positionClasses.replace("-translate-x-1/2", "").replace("left-1/2", "left-0");
    } else if (align === "end") {
      positionClasses = positionClasses.replace("-translate-x-1/2", "").replace("left-1/2", "right-0");
    }
  }

  const offsetStyle = !followCursor
    ? {
        marginTop: side === "bottom" ? `${sideOffset}px` : undefined,
        marginBottom: side === "top" ? `${sideOffset}px` : undefined,
        marginLeft: side === "right" ? `${sideOffset}px` : undefined,
        marginRight: side === "left" ? `${sideOffset}px` : undefined,
      }
    : {
        position: "absolute",
        left: followCursor === "y" ? "50%" : `${cursorPos.x + alignOffset}px`,
        top: followCursor === "x" ? "-36px" : `${cursorPos.y - sideOffset - 32}px`,
        transform: "translateX(-50%)",
        pointerEvents: "none",
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="tooltip"
          initial={initialTransform}
          animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          exit={exitTransform}
          transition={{
            duration: 0.15,
            ease: [0.32, 0.72, 0, 1], // --ease-out-fluid
          }}
          className={`absolute z-50 pointer-events-none whitespace-nowrap rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-black shadow-[0_6px_20px_rgba(0,0,0,0.35)] select-none ${positionClasses} ${className}`}
          style={{ ...offsetStyle, ...style }}
          {...props}
        >
          {children}
          {showArrow && (
            <span
              className={`absolute size-2 bg-white rotate-45 rounded-[1px] pointer-events-none ${arrowClasses}`}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Aliases for compatibility
export const TooltipContent = TooltipPanel;

export function BaseTooltipDemo({
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  followCursor,
  children = <p>Add to library</p>,
}) {
  return (
    <Tooltip followCursor={followCursor}>
      <TooltipTrigger
        render={
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
          >
            Hover
          </button>
        }
      />
      <TooltipPanel
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        {children}
      </TooltipPanel>
    </Tooltip>
  );
}

