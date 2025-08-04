import React from "react";
import { GoRocket } from "react-icons/go";
import backgroudbg from "../assets/Pictures/MyServicesBG.webp";

const WorkProcessCard = (props) => {
  return (
    <>
      <div className="lg:w-full lg:h-[388px] lg:p-14 p-6 bg-[#1111116a] inner-shadow  flex rounded-2xl mt-10  backdrop-blur-[7px]  ">
        <div className="lg:w-[750px] h-full  flex flex-col justify-between   ">
          <div className="bg-[#25252580] px-6 py-[6px] w-fit rounded-full text-white ">
            <div className=" flex justify-start items-center gap-2">
              <div className="h-[5px] w-[5px] rounded-full bg-[#ffffff7d]" />
              <div className="text-[#ffffff7d] font-MainLight lg:text-[18px] text-sm ">
                Step {props.steps}
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-white font-MainLight lg:text-[48px] leading-13 ">
                {props.title}
              </h1>
            </div>
            <div className="text-[#BBBBBB] font-MainLight tracking-tight text-md mt-3   ">
              {props.subtitle}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:h-full flex justify-center items-center">
          <div className="relative lg:w-[187px] w-[80px] h-[80px]  lg:h-[187px] rounded-full overflow-hidden flex items-center justify-center lg:text-9xl text-8xl  text-[#FFFFFF]">
            {/* Background image */}
            <img
              src={backgroudbg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Black overlay */}
            <div className="absolute inset-0 bg-black opacity-10"></div>

            {/* Icon on top */}
            <div className="relative z-10  lg:text-9xl text-5xl ">
              {props.icon}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkProcessCard;
