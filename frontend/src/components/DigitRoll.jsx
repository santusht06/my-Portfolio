import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const DigitRoll = ({ digit }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!isNaN(digit)) {
      gsap.to(containerRef.current, {
        y: -digit * 80,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto", // Auto-kill previous conflicting transitions for buttery smooth ticks
      });
    }
  }, [digit]);

  return (
    <div
      style={{
        height: "80px",
        width: "60px",
        overflow: "hidden",
        position: "relative",
        display: "inline-block",
        transform: "translateZ(0)", // WebKit Safari clipping bug fix
        WebkitTransform: "translateZ(0)",
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="text-white text-8xl font-MainLight flex items-center justify-center select-none"
            style={{
              height: "80px",
              width: "60px",
              lineHeight: "80px",
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitRoll;
