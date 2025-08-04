import React, { useEffect, useRef } from "react";
import signature from "../assets/Pictures/Signature.webp";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sigRef = useRef(null);
  const marqueeRef = useRef(null);

  return (
    <div className="w-screen h-100 mt-40 footer-bg   ">
      <div className="lg:w-[790px] w-[95vw] mx-3 lg:mx-0     lg:h-full   relative ml-mac ml-monitor flex justify-center items-center    ">
        {/* Signature */}
        <div className="lg:h-92 lg:w-92 w-70  absolute lg:-top-30 top-6  z-10 flex justify-center items-start">
          <img
            src={signature}
            alt="signature"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Capsule Background */}
        <div className="bg-[#11111100] lg:w-full mt-30 lg:mt-0  lg:h-[264px] h-[120px] rounded-full flex items-center overflow-hidden relative backdrop-blur-xl shadow-5xl">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="10" // ← Increase for speed
            className="w-full text-8xl text-[#ffffffc6] font-MainLight"
          >
            <span className="mx-10">Book A Call</span>
            <span className="mx-10  ">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10  ">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">•</span>
            <span className="mx-10">Book A Call</span>{" "}
            <span className="mx-10">Book A Call</span>
            <span className="mx-10  ">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">•</span>
            <span className="mx-10">Book A Call</span>{" "}
            <span className="mx-10">Book A Call</span>
            <span className="mx-10  ">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">•</span>
            <span className="mx-10">Book A Call</span>
            <span className="mx-10">•</span>
            <span className="mx-10">Book A Call</span>
          </marquee>
        </div>
      </div>
    </div>
  );
};

export default Footer;
