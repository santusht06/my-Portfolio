'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.2,
  baseRotation = 0,
  blurStrength = 6,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom 80%',
  as: Component = 'div',
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word will-change-[filter,opacity]" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    let ctx = gsap.context(() => {
      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'power2.out',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top 95%',
              end: rotationEnd,
              scrub: true
            }
          }
        );
      }

      const wordElements = el.querySelectorAll('.word');
      if (wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          { opacity: baseOpacity },
          {
            ease: 'power1.out',
            opacity: 1,
            stagger: 0.04,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top 90%',
              end: wordAnimationEnd,
              scrub: true
            }
          }
        );

        if (enableBlur) {
          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: 'power1.out',
              filter: 'blur(0px)',
              stagger: 0.04,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top 90%',
                end: wordAnimationEnd,
                scrub: true
              }
            }
          );
        }
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <Component ref={containerRef} className={`${containerClassName}`}>
      <span className={textClassName}>{splitText}</span>
    </Component>
  );
};

export default ScrollReveal;
