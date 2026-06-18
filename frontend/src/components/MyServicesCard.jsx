import React, { useEffect, useRef } from "react";
import MyServicesBG from "../assets/Pictures/MyServicesBG.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MyServicesCard = ({
  icon,
  title,
  subOne,
  subTwo,
  subThree,
  isOpen,
  onClick,
}) => {
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const pointOneRef = useRef(null);
  const pointTwoRef = useRef(null);
  const pointThreeRef = useRef(null);
  const subtitlesContainerRef = useRef(null);

  useEffect(() => {
    const logoEl = logoRef.current;
    const titleEl = titleRef.current;
    const containerEl = subtitlesContainerRef.current;
    const points = [
      pointOneRef.current,
      pointTwoRef.current,
      pointThreeRef.current,
    ];

    if (isOpen) {
      // Animate logo & title
      gsap.to(logoEl, {
        opacity: 1,
        x: 0,
        zIndex: 10,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(titleEl, {
        x: 80,
        color: "#ffffff",
        duration: 0.6,
        ease: "power3.out",
      });

      // Animate container height first
      gsap.to(containerEl, {
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Then animate subtitle points
          gsap.fromTo(
            points,
            {
              opacity: 0,
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            }
          );
        },
      });
    } else {
      // First animate subtitle points out
      gsap.to(points, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          // Then collapse the container
          gsap.to(containerEl, {
            height: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
        },
      });

      // Reverse logo and title animation
      gsap.to(logoEl, {
        opacity: 0,
        x: -20,
        zIndex: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(titleEl, {
        x: 0,
        color: "#BBBBBB",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const letterSpans = titleRef.current.querySelectorAll("span > span");

    gsap.fromTo(
      letterSpans,
      {
        x: 30,
        opacity: 0,
        skewX: 10,
      },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: { each: 0.06, from: "end" },
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div
      className="lg:w-full h-fit flex flex-col mt-10  relative transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="flex items-center relative lg:h-[80px]">
        <div
          ref={logoRef}
          className="absolute left-0 lg:top-2 w-[60px] h-[60px] rounded-2xl overflow-hidden opacity-0 z-0 translate-x-[-20px]"
        >
          <img
            src={MyServicesBG}
            alt="Background Icon"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center text-[#cfcfcf] text-4xl z-10">
            {icon}
          </div>
        </div>

        <h3
          ref={titleRef}
          className="font-MainLight text-[28px] cursor-pointer sm:text-[64px] lg:text-[65px] leading-none tracking-tighter text-[#BBBBBB] relative z-20 flex flex-wrap"
        >
          {title.split("").map((letter, index) => (
            <span key={index} className="inline-block overflow-hidden">
              <span className="inline-block translate-x-[30px] opacity-0">
                {letter === " " ? "\u00A0" : letter}
              </span>
            </span>
          ))}
        </h3>
      </div>

      <div
        ref={subtitlesContainerRef}
        className="pl-[90px] pt-4 overflow-hidden cursor-default "
        style={{ height: 0 }}
      >
        <div
          ref={pointOneRef}
          className="flex items-center gap-3 mb-4 opacity-0 translate-y-2"
        >
          <div className="h-[5px] w-[5px] rounded-full bg-[#777]" />
          <span className="text-[#777777] font-MainLight text-[18px]">
            {subOne}
          </span>
        </div>
        <div
          ref={pointTwoRef}
          className="flex items-center gap-3 mb-4 opacity-0 translate-y-2"
        >
          <div className="h-[5px] w-[5px] rounded-full bg-[#777]" />
          <span className="text-[#777777] font-MainLight text-[18px]">
            {subTwo}
          </span>
        </div>
        <div
          ref={pointThreeRef}
          className="flex items-center gap-3 mb-4 opacity-0 translate-y-2"
        >
          <div className="h-[5px] w-[5px] rounded-full bg-[#777]" />
          <span className="text-[#777777] font-MainLight text-[18px]">
            {subThree}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyServicesCard;
