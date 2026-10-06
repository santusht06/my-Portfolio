import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Single-element ScrollReveal component with hardware-accelerated fluid motion.
 * Respects prefers-reduced-motion gracefully (Tier 2/3: gentle opacity fade without displacement).
 */
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.55,
  y = 20,
  viewportMargin = "0px 0px -40px 0px",
  once = true,
  as = "div",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return (
      <Component
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: viewportMargin }}
        transition={{ duration: 0.2, delay }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Staggered container for lists, grids, and collections of cards.
 */
export const ScrollRevealGroup = ({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  viewportMargin = "0px 0px -40px 0px",
  once = true,
  as = "div",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <Component
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: viewportMargin }}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Individual item inside a ScrollRevealGroup container.
 */
export const ScrollRevealItem = ({
  children,
  className = "",
  y = 18,
  duration = 0.5,
  as = "div",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <Component className={className} variants={itemVariants} {...props}>
      {children}
    </Component>
  );
};

export default ScrollReveal;
