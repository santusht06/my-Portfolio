import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Signature from "../assets/Pictures/Signature.webp";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INIT_SYSTEM...");

  // Refs for animation targets
  const containerRef = useRef(null);
  const blackPanelRef = useRef(null);
  const orangePanelRef = useRef(null);
  const contentRef = useRef(null);
  const logoPathRef = useRef(null);
  const signatureRef = useRef(null);

  // Update status message based on progress
  useEffect(() => {
    if (progress < 25) {
      setStatusText("INITIALIZING SYSTEM...");
    } else if (progress < 50) {
      setStatusText("ESTABLISHING DESIGN SYSTEM...");
    } else if (progress < 75) {
      setStatusText("LOADING CREATIVE MODULES...");
    } else if (progress < 100) {
      setStatusText("COMPILING EXPERIENCES...");
    } else {
      setStatusText("SYSTEM DEPLOYED. ENJOY.");
    }
  }, [progress]);

  useEffect(() => {
    // 1. Initialize logo stroke path length
    let logoLength = 0;
    if (logoPathRef.current) {
      logoLength = logoPathRef.current.getTotalLength();
      gsap.set(logoPathRef.current, {
        strokeDasharray: logoLength,
        strokeDashoffset: logoLength,
      });
    }

    // 2. Initialize signature image state
    if (signatureRef.current) {
      gsap.set(signatureRef.current, { opacity: 0, scale: 0.85, y: 15 });
    }

    // 3. Main GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Temp object to animate percentage counter
    const progressVal = { value: 0 };

    tl.to(progressVal, {
      value: 100,
      duration: 2.8,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(progressVal.value));
      },
    });

    // Parallel animations within the progress timeline
    tl.to(
      logoPathRef.current,
      {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power1.inOut",
      },
      0
    );

    // Animate signature image in
    tl.to(
      signatureRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      0.3
    );

    // Fill the logo when loading is near completion
    tl.to(
      logoPathRef.current,
      {
        fill: "white",
        duration: 0.6,
        ease: "power2.out",
      },
      2.0
    );

    // Fade Out Content text/logo once progress hits 100%
    tl.to(contentRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    });

    // Hardware-accelerated Panel Slide Out (Double Panel Retract)
    tl.to(
      blackPanelRef.current,
      {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut",
      },
      "+=0.1"
    );

    tl.to(
      orangePanelRef.current,
      {
        yPercent: -100,
        duration: 1.25,
        ease: "power4.inOut",
      },
      "<"
    );

    // Hide container fully
    tl.to(containerRef.current, {
      display: "none",
      duration: 0,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen z-[9999] overflow-hidden select-none pointer-events-none"
    >
      {/* 1. Staggered Orange Underlay Panel */}
      <div
        ref={orangePanelRef}
        className="fixed inset-0 w-screen h-screen bg-[#F3500F] z-[9998]"
      />

      {/* 2. Main Black Panel (Contains Loader elements) */}
      <div
        ref={blackPanelRef}
        className="fixed inset-0 w-screen h-screen bg-[#080808] z-[9999] overflow-hidden select-none pointer-events-auto"
      >
        {/* Main Content Wrapper (Absolute Layout to prevent squeezing) */}
        <div
          ref={contentRef}
          className="w-full h-full relative"
        >
          {/* Top bar */}
          <div className="absolute top-10 left-8 right-8 md:left-16 md:right-16 flex justify-between items-center text-xs md:text-sm font-MainLight tracking-[0.2em] text-[#888888] uppercase select-none">
            <div>SANTUSHT</div>
            <div>CREATIVE PORTFOLIO // 2026</div>
          </div>

          {/* Centerpiece: Logo and Signature (Absolutely centered in viewport) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2 pointer-events-none w-full">
            <div className="relative w-[56px] h-[64px] md:w-[70px] md:h-[80px]">
              <svg
                className="w-full h-full drop-shadow-[0_0_15px_rgba(243,80,15,0.4)]"
                viewBox="0 0 28 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  ref={logoPathRef}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.155246 20.5705L14.0776 32L28 20.5705C27.3985 18.7254 26.3888 17.1712 25.0997 15.9082C26.3234 14.658 27.2775 13.135 27.8439 11.3397L13.8096 0L0 11.5185C0.607704 13.3244 1.60659 14.8478 2.87463 16.0893C1.67188 17.3188 0.728293 18.8126 0.155246 20.5705ZM25.0997 15.9082C19.5713 21.5557 8.53828 21.6343 2.87463 16.0893C8.4125 10.4279 19.4447 10.3676 25.0997 15.9082Z"
                  stroke="#F3500F"
                  strokeWidth="0.8"
                  fill="transparent"
                />
              </svg>
            </div>

            {/* Signature Image (Upscaled for prominence) */}
            <div ref={signatureRef} className="w-[280px] sm:w-[380px] md:w-[450px] h-[120px] sm:h-[150px] md:h-[180px] flex justify-center items-center">
              <img
                src={Signature}
                alt="Signature"
                className="w-full h-full object-contain brightness-125 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] scale-110"
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-10 left-8 right-8 md:left-16 md:right-16 flex flex-col md:flex-row justify-between items-end md:items-center gap-6 select-none">
            {/* Status Message */}
            <div className="flex flex-col gap-1 items-start text-left select-none">
              <span className="text-[10px] tracking-[0.2em] text-[#666666] uppercase">
                STATUS
              </span>
              <span className="font-MainLight text-xs md:text-sm text-[#BBBBBB] tracking-[0.1em] min-w-[200px]">
                {statusText}
              </span>
            </div>

            {/* Large Odometer Percentage */}
            <div className="relative font-SB text-8xl md:text-[10rem] leading-none text-white/5 select-none tracking-tighter">
              <span className="text-[#F3500F] font-MainBold text-opacity-100">
                {progress.toString().padStart(2, "0")}
              </span>
              <span className="text-xs md:text-xl font-MainLight text-[#888888] tracking-widest uppercase align-super ml-2">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
