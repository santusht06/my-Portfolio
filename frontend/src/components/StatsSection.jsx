import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothOdometer from "./SmoothOdometer";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const statBoxRefs = useRef([]);
  const coffeeRef = useRef();
  const rateRef = useRef();

  useEffect(() => {
    // Animate boxes from bottom to top
    statBoxRefs.current.forEach((box, i) => {
      if (box) {
        gsap.fromTo(
          box,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.3,
          }
        );
      }
    });
  }, []);

  return (
    <div className="max-w-2xl h-[217px] flex flex-col lg:flex-row   gap-3 mt-monitor mt-mac mb-10">
      {/* Cups of Coffee */}
      <div
        className="w-[90vw] lg:w-1/2 pb-5 lg-pb-0   bg-[#111111] rounded-3xl inner-shadow"
        ref={(el) => (statBoxRefs.current[0] = el)}
      >
        <div className="flex items-center justify-start p-5 gap-3">
          <div className="h-[5px] w-[5px] bg-[#777777] rounded-full"></div>
          <div className="text-[#777777] font-MainLight text-[18px]">
            Optimization Rate
          </div>
        </div>
        <div
          ref={coffeeRef}
          className="w-full flex justify-end items-end mt-6 px-10 "
        >
          <SmoothOdometer start={89} end={99} duration={2} triggerRef={coffeeRef} />
          <div className="text-white text-8xl font-MainLight leading-[80px]">
            %
          </div>
        </div>
      </div>

      {/* Success Rate */}
      <div
        className="w-[90vw] lg:w-1/2 pb-5 lg-pb-0 h-full bg-[#111111] rounded-3xl inner-shadow"
        ref={(el) => (statBoxRefs.current[1] = el)}
      >
        <div className="flex items-center justify-start p-5 gap-3">
          <div className="h-[5px] w-[5px] bg-[#777777] rounded-full"></div>
          <div className="text-[#777777] font-MainLight text-[18px]">
            Success Rate
          </div>
        </div>
        <div
          ref={rateRef}
          className="w-full flex justify-end items-end mt-6 px-10 "
        >
          <SmoothOdometer start={80} end={98} duration={2} triggerRef={rateRef} />
          <div className="text-white text-8xl font-MainLight leading-[80px]">
            %
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
