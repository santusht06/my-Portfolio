import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function DockItem({
  icon,
  label,
  onClick,
  mouseX,
  mouseY,
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  distance = 120,
  magnification = 50,
  baseItemSize = 36,
  className = "",
  defaultExpanded = false,
  showLabel = "inline", // "inline" | "tooltip" | "none"
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(defaultExpanded);

  // Measure 2D Euclidean distance from mouse cursor (clientX, clientY) to item center
  const dist = useTransform([mouseX, mouseY], ([x, y]) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    if (x === Infinity || y === Infinity) return Infinity;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.hypot(x - centerX, y - centerY);
  });

  // Calculate target size based on proximity
  const targetSize = useTransform(
    dist,
    [0, distance],
    [magnification, baseItemSize],
    { clamp: true }
  );

  const size = useSpring(targetSize, spring);

  // Proportional icon size scaling
  const iconSize = useTransform(
    size,
    [baseItemSize, magnification],
    [16, 22]
  );

  const isOpen = isHovered || isToggled;

  const handleClick = (e) => {
    setIsToggled((prev) => !prev);
    onClick?.(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{
        height: size,
        minWidth: size,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={label}
      aria-label={label}
      className={`group/pill shrink-0 inline-flex items-center justify-center rounded-xl border transition-colors duration-200 px-2.5 cursor-pointer select-none outline-none ${
        isOpen
          ? "border-solid border-black/40 dark:border-white/40 bg-black/[0.06] dark:bg-white/[0.08]"
          : "border-dashed border-[#909092]/30 dark:border-[#909092]/40 bg-black/[0.03] dark:bg-white/[0.04] hover:border-solid hover:border-black/40 dark:hover:border-white/40 hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
      } focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white ${className}`}
    >
      <motion.span
        style={{ width: iconSize, height: iconSize }}
        className="shrink-0 flex items-center justify-center pointer-events-none"
      >
        {icon}
      </motion.span>

      {showLabel === "inline" && label && (
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-200 ease-out font-mono tracking-tight text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 pointer-events-none ${
            isOpen
              ? "max-w-48 opacity-100 ml-2"
              : "max-w-0 opacity-0 ml-0 group-hover/pill:max-w-48 group-hover/pill:opacity-100 group-hover/pill:ml-2 group-focus-visible/pill:max-w-48 group-focus-visible/pill:opacity-100 group-focus-visible/pill:ml-2"
          }`}
        >
          {label}
        </span>
      )}
    </motion.button>
  );
}

export function Dock({
  items = [],
  panelHeight = 48,
  baseItemSize = 36,
  magnification = 50,
  distance = 120,
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  className = "",
  showLabel = "inline",
}) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.div
      style={{ minHeight: panelHeight }}
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
      }}
      className={`flex flex-wrap items-center gap-2 py-1 bg-transparent border-0 shadow-none max-w-full ${className}`}
    >
      {items.map((item, idx) => (
        <DockItem
          key={item.label || idx}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
          mouseX={mouseX}
          mouseY={mouseY}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
          className={item.className}
          defaultExpanded={item.defaultExpanded}
          showLabel={showLabel}
        />
      ))}
    </motion.div>
  );
}

export default Dock;
