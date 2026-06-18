import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Work from "./Work";
import work1 from "../assets/Pictures/work1.webp";
import work2 from "../assets/Pictures/work2.webp";
import work3 from "../assets/Pictures/work3.webp";
import MyServices from "./MyServices";

gsap.registerPlugin(ScrollTrigger);

const SlideBanner = ({ scrollToContact }) => {
  const bannerRef = useRef();
  const lastScrollTop = useRef(window.scrollY);
  const scrollVelocity = useRef(0);
  const workRefs = useRef([]);

  useEffect(() => {
    let timeout;
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const delta = scrollTop - lastScrollTop.current;
      scrollVelocity.current = delta;
      lastScrollTop.current = scrollTop;

      gsap.to(bannerRef.current, {
        x: `-=${delta * 1.2}`,
        duration: 0.6,
        ease: "power3.out",
      });

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        scrollVelocity.current = 0;
      }, 100);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);
  useEffect(() => {
    if (!bannerRef.current) return;

    let lastX = 0;

    ScrollTrigger.create({
      trigger: bannerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1, // smooth follow
      onUpdate: (self) => {
        const velocity = self.getVelocity() / 100; // scale speed
        lastX -= velocity;
        gsap.set(bannerRef.current, { x: lastX });
      },
    });
  }, []);

  useEffect(() => {
    workRefs.current.forEach((ref, idx) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            // delay: idx * 0.5,
          }
        );
      }
    });
  }, []);

  const data = [
    {
      image: work1,
      title: "Web Development",
      subtitle: "Scalable Frontend Web Architecture",
    },
    {
      image: work2,
      title: "App Development",
      subtitle: "Custom iOS App Development",
    },
    {
      image: work3,
      title: "Cloud Automation",
      subtitle: "Automating Cloud with Precision",
    },
  ];

  return (
    <>
      <div className="lg:w-[750px]  lg:h-[189px] h-[150px]  rounded-2xl bg-[#111111] inner-shadow mt-[193px] mb-10 overflow-hidden">
        <div className="w-full h-full flex justify-center items-center overflow-hidden">
          <div
            ref={bannerRef}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            {[...Array(50)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="w-[31px] h-[31px] bg-gradient-to-br from-[#FB7F0E] to-[#fe0101] rounded-full shrink-0"></div>
                <p className="lg:text-[96px] text-[56px] font-MainLight text-white">
                  Selected Work
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div>
        {data.map((items, idx) => (
          <div
            key={idx}
            ref={(el) => (workRefs.current[idx] = el)}
            className="will-change-transform"
          >
            <Work
              image={items.image}
              title={items.title}
              subtitle={items.subtitle}
              scrollToContact={scrollToContact}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SlideBanner;
