import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DigitRoll from "./DigitRoll";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const [coffee, setCoffee] = useState(89);
  const [rate, setRate] = useState(80);

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

    // Animate number counters once when visible
    ScrollTrigger.create({
      trigger: coffeeRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(
          { val: 89 },
          {
            val: 99,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              setCoffee(Math.floor(this.targets()[0].val));
            },
          }
        );

        gsap.to(
          { val: 80 },
          {
            val: 98,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              setRate(Math.floor(this.targets()[0].val));
            },
          }
        );
      },
    });
  }, []);

  const splitDigits = (num) => num.toString().split("").map(Number);

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
          {splitDigits(coffee).map((d, i) => (
            <DigitRoll key={i} digit={d} />
          ))}
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
          {splitDigits(rate).map((d, i) => (
            <DigitRoll key={i} digit={d} />
          ))}
          <div className="text-white text-8xl font-MainLight leading-[80px]">
            %
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
