import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollTextAnimationHome = (props) => {
  const textRef = useRef(null);
  useEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");

    gsap.set(chars, { opacity: 0, y: 10 }); // Start lower + invisible

    gsap.to(chars, {
      color: "#ffffff",
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: props.stagger || 0.03,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 95%",
        end: "bottom 20%",
        scrub: props.scrub,
      },
    });
  }, []);

  const text = `${props.title}`;

  const width = props.width
    ? `w-[${props.width}]`
    : " max-w-[82vw] lg:w-[700px]   ";

  return (
    <div className="flex justify-start items-start">
      <h1
        ref={textRef}
        className="text-[28px] lg:text-[64px]  text-[#444] mt-10 lg:leading-18 font-MainLight flex flex-wrap   "
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
      </h1>
    </div>
  );
};

export default ScrollTextAnimationHome;
