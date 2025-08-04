import React from "react";
import Logo from "../assets/Pictures/logo-1.svg";
import Signature from "../assets/Pictures/Signature.webp";

import { GoArrowUpRight } from "react-icons/go";
import me2f from "../assets/Pictures/me2f.webp";
import SocialCard from "./SocialCard";

const Card = ({ onGetStarted }) => {
  return (
    <>
      <div className="min-h-[85vh] lg:min-h-[85vh] xl:min-h-[85vh] 2xl:min-h-[85vh] overflow-hidden md:min-h-[98vh] sm:min-h-[90vh] w-[92vw] lg:w-full max-w-7xl mx-auto bg-[#111111] rounded-3xl inner-shadow relative flex flex-col justify-start lg:ml-0 mt-5 lg:mt-0">
        <div className="flex flex-col items-center justify-start h-full px-4 sm:px-6 lg:px-0">
          {/* Header */}
          <div className="w-full flex justify-between mt-6 sm:mt-8 lg:mt-10 text-white px-5 sm:px-7 lg:px-14 items-center">
            {/* logo */}
            <div className="flex-shrink-0">
              <img src={Logo} alt="" className="h-6 sm:h-8 lg:h-auto w-auto" />
            </div>

            {/* NavLogo */}
            <div className="flex-1 max-w-[200px] sm:max-w-sm lg:max-w-md h-9 sm:h-10 lg:h-11 text-xs sm:text-[13px] rounded-full border-[0.1px] border-[#3e3e3e] font-MonstrateEXLight tracking-tight font-extralight text-[#BBBBBB] flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 ml-4 sm:ml-6 lg:ml-8">
              <div className="w-2 h-2 sm:w-[10px] sm:h-[10px] rounded-full bg-[#F3500F] flex-shrink-0"></div>
              <div className="text-center">
                <h1>
                  Available for{" "}
                  <span className="text-gray-200">3 projects</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Profile Image Container */}
          <div className="relative mt-8 sm:mt-10 lg:mt-13 mb-4 sm:mb-6 lg:mb-8">
            <div className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-[270px] lg:w-[270px] xl:h-78 xl:w-78 rounded-2xl bg-white overflow-hidden relative">
              <img
                src={me2f}
                alt="Me"
                className="h-full w-full object-cover"
                width={270}
                height={270}
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Signature Overlay */}
            <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
              <div className="w-32 sm:w-36 lg:w-44 transform translate-y-13 sm:translate-y-15 lg:translate-y-18">
                <img
                  src={Signature}
                  alt="signature"
                  className="h-28 sm:h-32 lg:h-40 w-full scale-110 sm:scale-120 lg:scale-150"
                />
              </div>
            </div>
          </div>

          {/* Email and Location */}
          <div className="flex flex-col gap-1 sm:gap-2 items-center mt-4 sm:mt-5 lg:mt-6">
            <h1 className="text-[#BBBBBB] font-MainLight text-base sm:text-lg lg:text-[19px] xl:text-[22px] text-center px-4">
              santushtkotai1221@gmail.com
            </h1>
            <h1 className="text-[#393939] font-MainLight text-sm sm:text-[15px] lg:text-[16px] tracking-wide">
              Based in Indore, India
            </h1>
          </div>

          {/* Social Card */}
          <div className="mt-4 sm:mt-5 lg:mt-6 mb-20 sm:mb-24 lg:mb-28">
            <SocialCard />
          </div>
        </div>

        {/* Get Started Button - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-9">
          <button
            onClick={onGetStarted}
            className="w-full border-[0.1px] border-[#3e3e3e] font-MainLight text-sm sm:text-md text-[#BBBBBB] h-12 sm:h-14 lg:h-[56px] rounded-full  transition-all duration-300"
          >
            <div className="flex justify-between items-center px-[3px] h-full">
              <h1 className="flex-1 text-left px-3 sm:px-4 hover:text-[#F3500F] transition-all duration-300 ease-in-out cursor-pointer">
                Get Started
              </h1>
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[48px] lg:h-[48px] bg-white rounded-full flex justify-center items-center text-[#575757] text-lg sm:text-xl lg:text-2xl hover:text-[#F3500F] transition-all duration-300 ease-in-out cursor-pointer flex-shrink-0">
                <GoArrowUpRight />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
