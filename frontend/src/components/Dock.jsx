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
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  distance = 130,
  magnification = 70,
  baseItemSize = 44,
  className = "",
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Measure distance from mouse cursor to item center
  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return val - (rect.left + rect.width / 2);
  });

  // Calculate target size based on proximity
  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );

  const size = useSpring(targetSize, spring);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={label}
      className={`relative shrink-0 flex items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/30 dark:hover:border-white/30 hover:bg-black/[0.08] dark:hover:bg-white/[0.09] transition-colors cursor-pointer select-none outline-none group ${className}`}
    >
      {/* Floating Dock Tooltip */}
      <AnimatePresence>
        {isHovered && label && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none z-40 px-2 py-0.5 rounded-md bg-black/95 dark:bg-white text-white dark:text-black text-[11px] font-mono whitespace-nowrap shadow-md border border-white/10 dark:border-black/10 flex items-center justify-center"
          >
            <span>{label}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-black/95 dark:bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon display area */}
      <div className="w-full h-full flex items-center justify-center p-2 pointer-events-none">
        {icon}
      </div>
    </motion.div>
  );
}

export function Dock({
  items = [],
  panelHeight = 68,
  baseItemSize = 44,
  magnification = 70,
  distance = 130,
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  className = "",
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      style={{ minHeight: panelHeight }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`inline-flex items-center gap-2 p-1.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] backdrop-blur-md max-w-full overflow-x-auto no-scrollbar scroll-smooth ${className}`}
    >
      {items.map((item, idx) => (
        <DockItem
          key={item.label || idx}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
          mouseX={mouseX}
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
