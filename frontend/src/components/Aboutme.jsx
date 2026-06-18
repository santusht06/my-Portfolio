import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import DesignsAM from "./DesignsAM";
gsap.registerPlugin(ScrollTrigger);

const Aboutme = () => {
  return (
    <>
      <div className="mt-21 flex justify-start items-center gap-3  ">
        <div className="h-[5px] w-[5px] rounded-full bg-[#777]" />
        <div className="text-[#777777] font-MainLight text-[18px]">
          About me
        </div>
      </div>
      <ScrollColorText />
      <div className="lg:w-[750px] h-fit mt-10">
        <p className="lg:text-[16px] text-[#ffffffB2] font-MainLight tracking-tight ">
          Behind every interface I design is a journey — shaped by curiosity,
          self-discipline, and a relentless drive to create something
          meaningful. I come from a place where nothing was handed over. Every
          skill I have today was earned through late nights, self-learning, and
          the belief that passion can outpace privilege.
        </p>
        <p className="lg:text-[16px] text-[#ffffffB2] font-MainLight tracking-tight mt-5">
          I started with curiosity and grew through challenges. I learned
          everything from scratch — through self-doubt, failure, and small wins.
          Today, I create with clarity and purpose, driven by passion and an
          unshakable belief in what’s possible.
        </p>
      </div>
    </>
  );
};

export default Aboutme;

const ScrollColorText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");

    gsap.set(chars, { opacity: 0.5 }); // Set initial low opacity

    gsap.to(chars, {
      color: "#ffffff",
      opacity: 1,
      ease: "power1.inOut",
      stagger: 0.05,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 95%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  const text = "Every pixel has a purpose. Every function tells a story.";

  return (
    <>
      <div className=" lg:max-w-[750px] flex justify-center items-start">
        <h2
          ref={textRef}
          className="text-[28px] lg:text-[42px] text-start text-[#444] mt-10 leading-relaxed font-MainLight flex flex-wrap"
        >
          {text.split(" ").map((word, i) => (
            <span key={i} className="word mr-2 inline-block">
              {word.split("").map((char, j) => (
                <span key={j} className="char inline-block">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </>
  );
};
