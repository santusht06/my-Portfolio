import React, { useRef, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import gsap from "gsap";

const FAQCard = ({ question, answer, isActive, onToggle }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const el = contentRef.current;

    if (isActive) {
      el.style.display = "block"; // ensure it's visible before animation
      gsap.to(el, {
        height: el.scrollHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          el.style.display = "none";
        },
      });
    }
  }, [isActive]);

  return (
    <div className="lg:w-full lg:h-fit mt-10 transition-all duration-500 ease-in-out">
      <div
        className="lg:w-full w-[95vw] pr-5 lg:pr-0 flex justify-between items-start cursor-pointer gap-4"
        onClick={onToggle}
      >
        <div className="pr-4 flex-1">
          <h3 className="lg:text-xl font-MainLight text-[#ffffffc0]">
            {question}
          </h3>

          <div
            ref={contentRef}
            className="overflow-hidden mt-5"
            style={{
              height: 0,
              opacity: 0,
              display: "none",
            }}
          >
            <p className="text-sm font-MainLight text-[#ffffff6d] lg:max-w-xl w-[65vw]">
              {answer}
            </p>
          </div>
        </div>

        <div className="h-12 w-12 min-w-[3rem] min-h-[3rem] flex-shrink-0 rounded-full flex justify-center items-center border border-[#ffffff86] text-[#ffffff86] text-2xl transition-all duration-300 ease-in-out">
          {isActive ? <FiMinus /> : <GoPlus />}
        </div>
      </div>

      <div className="h-[1px] lg:w-full w-[91vw]  bg-[#bbbbbb51] rounded-2xl mt-5" />
    </div>
  );
};

export default FAQCard;
