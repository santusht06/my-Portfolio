'use client';

import * as React from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Animate UI Blur Primitive
 * Applies an in-view scroll blur / unblur transition using framer-motion.
 */
export const Blur = React.forwardRef(({
  children,
  initialBlur = 8,
  blur = 0,
  inView = true,
  inViewOnce = true,
  threshold = 0.15,
  duration = 0.5,
  delay = 0,
  transition,
  className = '',
  style = {},
  ...props
}, ref) => {
  const internalRef = React.useRef(null);
  const isInView = useInView(internalRef, { once: inViewOnce, amount: threshold });

  const shouldAnimate = inView ? isInView : true;

  const defaultTransition = transition || {
    type: 'spring',
    stiffness: 160,
    damping: 22,
    mass: 0.8,
    delay,
  };

  return (
    <motion.div
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      initial={{ filter: `blur(${initialBlur}px)`, opacity: 0.4 }}
      animate={
        shouldAnimate
          ? { filter: `blur(${blur}px)`, opacity: 1 }
          : { filter: `blur(${initialBlur}px)`, opacity: 0.4 }
      }
      transition={defaultTransition}
      className={`will-change-[filter,opacity] ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Blur.displayName = 'Blur';

export default Blur;
