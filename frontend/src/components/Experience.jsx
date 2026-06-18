import React, { useEffect, useRef } from "react";
import ScrollColorText from "./ScrollColorText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  const experiences = [
    {
      company: "Cognifyz Technologies",
      role: "Frontend Engineer",
      duration: "2025",
    },
    {
      company: "Alphawizz Technologies",
      role: "Backend Developer",
      duration: "2025",
    },
    {
      company: "Freelancer",
      role: "Software Developer",
      duration: "Present",
    },
  ];

  return (
    <>
      <div>
        <div className="mt-72 lg:mt-21  flex justify-start items-center gap-3">
          <div className="h-[5px] w-[5px] rounded-full bg-[#777777]" />
          <div className="text-[#777777] font-MainLight text-[18px]">
            Experiences
          </div>
        </div>
        <div>
          <div className="text-white font-MainLight text-[44px] leading-12 max-w-[750px]">
            <ScrollColorText />

            <div className="flex flex-col gap-2 mt-10">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  className="w-full flex flex-col justify-start will-change-transform"
                >
                  <h3 className="text-[#777777] font-MainLight text-[18px]">
                    {exp.company}
                  </h3>
                  <div className="hover:text-[#F3500F] transition-all ease-in-out duration-280">
                    <div className="flex justify-between text-[24px]">
                      <div>{exp.role}</div>
                      <div className="px-[24px] w-[124px] h-[34px] flex justify-center items-center rounded-full bg-[#11111180] backdrop-blur-sm text-[14px]">
                        {exp.duration}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#343434]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
