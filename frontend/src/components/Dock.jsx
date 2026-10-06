import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export function DockItem({
  icon,
  label,
  onClick,
  mouseX,
  mouseY,
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  distance = 130,
  magnification = 54,
  baseItemSize = 38,
  className = "",
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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
    [18, 26]
  );

  const handleClick = (e) => {
    onClick?.(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{
        width: size,
        height: size,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={label}
      aria-label={label}
      className={`group/pill relative shrink-0 flex items-center justify-center rounded-xl border border-dashed border-[#909092]/30 dark:border-[#909092]/40 bg-black/[0.03] dark:bg-white/[0.04] hover:border-solid hover:border-black/40 dark:hover:border-white/40 hover:bg-black/[0.07] dark:hover:bg-white/[0.09] transition-[border-color,background-color] duration-150 cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white ${className}`}
    >
      {/* Floating Tooltip at exact top of the icon */}
      <AnimatePresence>
        {isHovered && label && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none z-50 px-2 py-0.5 rounded-md bg-black/95 dark:bg-white text-white dark:text-black text-[11px] font-mono whitespace-nowrap shadow-md border border-white/10 dark:border-black/10 flex items-center justify-center tracking-tight"
          >
            <span>{label}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-black/95 dark:bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered scaling icon */}
      <motion.span
        style={{ width: iconSize, height: iconSize }}
        className="shrink-0 flex items-center justify-center pointer-events-none"
      >
        {icon}
      </motion.span>
    </motion.button>
  );
}

export function Dock({
  items = [],
  panelHeight = 52,
  baseItemSize = 38,
  magnification = 54,
  distance = 130,
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  className = "",
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
      className={`flex flex-wrap items-center gap-2.5 pt-7 pb-2 bg-transparent border-0 shadow-none max-w-full overflow-visible ${className}`}
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
        />
      ))}
    </motion.div>
  );
}

export default Dock;
