import React from "react";
import Work1 from "../assets/Pictures/Work1.webp";
import { GoArrowUpRight } from "react-icons/go";

const Work = (props) => {
  const { scrollToContact } = props;
  return (
    <div className="lg:w-[750px] lg:h-[560px] relative overflow-hidden rounded-2xl mb-10 ">
      <img
        src={props.image}
        alt="work1"
        className="w-full h-full object-cover rounded-2xl"
      />

      {/* Overlay container */}
      <div className="w-full lg:h-full absolute inset-0 z-10">
        <div className="absolute lg:top-[67%] top-[59%]  left-1/2 transform -translate-x-1/2 w-[95%] lg:h-[30%]   bg-[#00000031] backdrop-blur-md z-10 flex justify-between items-center lg:px-[10px] px-[4px]  rounded-2xl">
          {/* Left Text Section */}
          <div className="flex-1 lg:h-full   p-3">
            <h1 className="text-[#b9b9b9b2] font-MainLight lg:text-[22px]">
              {props.title}
            </h1>
            <h1 className="text-[#ffffff] font-MainLight lg:text-[43px] hover:text-[#f3500f] transition-all duration-300 ease-in-out cursor-default leading-[1.2] mt-3">
              {props.subtitle}
            </h1>
          </div>

          {/* Arrow Section - fixed width */}
          <div
            onClick={scrollToContact}
            className="lg:w-[160px] h-[90%] flex-shrink-0 border-[0.1px] cursor-pointer border-[#727272] rounded-2xl text-white text-7xl flex justify-center items-center hover:text-[#f3500f] hover:border-[#f3500f] transition-all duration-300 ease-in-out"
          >
            <GoArrowUpRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
