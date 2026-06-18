import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothOdometer = ({ start, end, duration = 2, triggerRef }) => {
  const onesTrackRef = useRef(null);
  const tensTrackRef = useRef(null);

  // Generate digits lists
  const startOnes = start % 10;
  const startTens = Math.floor(start / 10) % 10;
  
  const diff = end - start;
  
  // Ones track: needs diff + 1 elements so it rolls forward continuously without resetting
  const onesDigits = [];
  for (let i = 0; i <= diff; i++) {
    onesDigits.push((startOnes + i) % 10);
  }

  // Tens track: needs range from startTens to endTens
  const tensDigits = [];
  const tensDiff = Math.floor(end / 10) - Math.floor(start / 10);
  for (let i = 0; i <= tensDiff; i++) {
    tensDigits.push((startTens + i) % 10);
  }

  useEffect(() => {
    if (!triggerRef.current) return;

    // Set initial position
    if (onesTrackRef.current) onesTrackRef.current.style.transform = "translate3d(0, 0px, 0)";
    if (tensTrackRef.current) tensTrackRef.current.style.transform = "translate3d(0, 0px, 0)";

    const animObj = { val: start };

    const triggerInstance = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(animObj, {
          val: end,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            const currentVal = animObj.val;
            
            // 1. Calculate continuous ones offset
            const onesOffset = (currentVal - start) * 80;
            
            // 2. Calculate continuous tens offset with fractional roll during wrap (9 to 0 transition)
            const onesValue = currentVal % 10;
            let tensValue = Math.floor(currentVal / 10);
            if (onesValue > 9) {
              tensValue += (onesValue - 9); // Slide smoothly to next tens digit when ones digit is wrapping
            }
            
            const tensOffset = (tensValue - Math.floor(start / 10)) * 80;

            // Direct DOM manipulation for buttery smooth animations (120 FPS, 0 React re-renders)
            if (onesTrackRef.current) {
              onesTrackRef.current.style.transform = `translate3d(0, -${onesOffset}px, 0)`;
            }
            if (tensTrackRef.current) {
              tensTrackRef.current.style.transform = `translate3d(0, -${tensOffset}px, 0)`;
            }
          }
        });
      }
    });

    return () => {
      triggerInstance.kill();
    };
  }, [start, end, duration, triggerRef]);

  return (
    <div 
      className="flex select-none h-[80px] overflow-hidden justify-end" 
      style={{ 
        transform: "translateZ(0)", 
        WebkitTransform: "translateZ(0)" // Fixes WebKit Safari overflow-clipping bug with 3D elements
      }}
    >
      {/* Tens Column */}
      <div 
        style={{ 
          height: "80px", 
          width: "60px", 
          overflow: "hidden", 
          position: "relative",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)"
        }}
      >
        <div ref={tensTrackRef} style={{ display: "flex", flexDirection: "column" }}>
          {tensDigits.map((d, i) => (
            <div
              key={i}
              className="text-white text-8xl font-MainLight flex items-center justify-center"
              style={{ height: "80px", width: "60px", lineHeight: "80px" }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* Ones Column */}
      <div 
        style={{ 
          height: "80px", 
          width: "60px", 
          overflow: "hidden", 
          position: "relative",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)"
        }}
      >
        <div ref={onesTrackRef} style={{ display: "flex", flexDirection: "column" }}>
          {onesDigits.map((d, i) => (
            <div
              key={i}
              className="text-white text-8xl font-MainLight flex items-center justify-center"
              style={{ height: "80px", width: "60px", lineHeight: "80px" }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmoothOdometer;
