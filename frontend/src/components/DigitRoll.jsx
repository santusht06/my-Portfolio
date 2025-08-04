import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const DigitRoll = ({ digit }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!isNaN(digit)) {
      gsap.to(containerRef.current, {
        y: `-${digit * 80}px`,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [digit]);

  return (
    <div className="relative h-[80px] w-[60px] overflow-hidden">
      <div ref={containerRef}>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="h-[80px] w-[60px] flex items-center justify-center text-white text-8xl font-MainLight  "
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitRoll;
