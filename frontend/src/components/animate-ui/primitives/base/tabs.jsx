import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext(null);

export function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a Tabs component");
  }
  return context;
}

export const Tabs = React.forwardRef(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    const tabsId = React.useId();

    const setValue = React.useCallback(
      (newValue) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    return (
      <TabsContext.Provider value={{ value, setValue, tabsId, orientation }}>
        <div
          ref={ref}
          data-slot="tabs"
          data-orientation={orientation}
          className={cn("flex flex-col gap-2", className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef(
  ({ className = "", children, ...props }, ref) => {
    const { orientation } = useTabs();

    return (
      <div
        ref={ref}
        role="tablist"
        data-slot="tabs-list"
        data-orientation={orientation}
        className={cn(
          "inline-flex items-center justify-center bg-transparent border-0 p-0 text-[#909092] select-none gap-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

export const TabsTab = React.forwardRef(
  (
    {
      value,
      disabled = false,
      indicatorClassName = "",
      indicatorTransition,
      asChild = false,
      render,
      onClick,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const { value: activeValue, setValue, tabsId } = useTabs();
    const isSelected = activeValue === value;

    const handleClick = (e) => {
      onClick?.(e);
      if (!disabled) {
        setValue(value);
      }
    };

    const indicator = isSelected ? (
      <motion.div
        layoutId={`tabs-highlight-${tabsId}`}
        data-slot="tabs-indicator"
        className={cn(
          "absolute inset-0 rounded-md bg-white dark:bg-white/10 shadow-xs z-0 pointer-events-none",
          indicatorClassName
        )}
        transition={
          indicatorTransition || {
            type: "spring",
            stiffness: 450,
            damping: 35,
          }
        }
      />
    ) : null;

    if (render) {
      return React.cloneElement(render, {
        ref,
        role: "tab",
        "aria-selected": isSelected,
        "data-slot": "tabs-tab",
        "data-state": isSelected ? "active" : "inactive",
        "data-selected": isSelected ? "" : undefined,
        tabIndex: isSelected ? 0 : -1,
        disabled,
        onClick: (e) => {
          render.props.onClick?.(e);
          handleClick(e);
        },
        className: cn(
          "relative inline-flex items-center justify-center",
          className,
          render.props.className
        ),
        children: (
          <>
            {indicator}
            <span className="relative z-10 inline-flex items-center justify-center gap-1.5 w-full">
              {render.props.children}
            </span>
          </>
        ),
        ...props,
      });
    }

    if (asChild && React.isValidElement(children)) {
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        ref,
        role: "tab",
        "aria-selected": isSelected,
        "data-slot": "tabs-tab",
        "data-state": isSelected ? "active" : "inactive",
        "data-selected": isSelected ? "" : undefined,
        tabIndex: isSelected ? 0 : -1,
        disabled,
        onClick: (e) => {
          child.props.onClick?.(e);
          handleClick(e);
        },
        className: cn(
          "relative inline-flex items-center justify-center",
          className,
          child.props.className
        ),
        children: (
          <>
            {indicator}
            <span className="relative z-10 inline-flex items-center justify-center gap-1.5 w-full">
              {child.props.children}
            </span>
          </>
        ),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        data-slot="tabs-tab"
        data-state={isSelected ? "active" : "inactive"}
        data-selected={isSelected ? "" : undefined}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 select-none",
          isSelected
            ? "text-zinc-950 dark:text-white font-semibold"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white",
          className
        )}
        {...props}
      >
        {indicator}
        <span className="relative z-10 inline-flex items-center justify-center gap-1.5 w-full">
          {children}
        </span>
      </button>
    );
  }
);
TabsTab.displayName = "TabsTab";

export const TabsPanels = React.forwardRef(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="tabs-panels"
        className={cn("relative w-full", className)}
        {...props}
      >
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </div>
    );
  }
);
TabsPanels.displayName = "TabsPanels";

export const TabsPanel = React.forwardRef(
  (
    {
      value,
      keepMounted = false,
      transition,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const { value: activeValue } = useTabs();
    const isSelected = activeValue === value;

    if (!isSelected) {
      if (keepMounted) {
        return (
          <div
            ref={ref}
            hidden
            data-slot="tabs-panel"
            className="hidden"
            {...props}
          >
            {children}
          </div>
        );
      }
      return null;
    }

    return (
      <motion.div
        ref={ref}
        key={value}
        role="tabpanel"
        data-slot="tabs-panel"
        data-state="active"
        tabIndex={0}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={
          transition || {
            duration: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }
        }
        className={cn("flex-1 outline-none", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
TabsPanel.displayName = "TabsPanel";

// Compatibility exports for Highlight primitives
export const TabsHighlight = TabsList;
export const TabsHighlightItem = TabsTab;
