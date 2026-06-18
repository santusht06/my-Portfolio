import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollColorText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");

    gsap.set(chars, { opacity: 0.4 });

    gsap.to(chars, {
      color: "#ffffff",
      opacity: 1,
      ease: "power1.inOut",
      stagger: 0.02,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
        end: "bottom 40%",
        scrub: true,
      },
    });
  }, []);

  const text =
    "I offer more than just a place to live – it’s a space designed to reflect your unique style and inspiration.";

  return (
    <div className="flex justify-center items-start">
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
  );
};

export default ScrollColorText;
