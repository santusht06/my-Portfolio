import React from "react";
import { profileData } from "../data/portfolioData";
import { ScrollReveal } from "./ScrollReveal";

const QuoteCard = () => {
  return (
    <ScrollReveal y={20} duration={0.5}>
      <div className="relative w-full my-12 p-1.5 rounded-[1.75rem] bezel-outer overflow-hidden hover-only:hover:border-black/15 dark:hover-only:hover:border-white/15 transition-[border-color,box-shadow] duration-200 ease-smooth group">
        <div className="relative bezel-inner rounded-[1.5rem] p-6 sm:p-8 flex flex-col justify-between border border-black/[0.04] dark:border-white/[0.04]">
          {/* Watermark Quote Icon */}
          <div className="absolute top-2 left-4 text-black/[0.04] dark:text-white/[0.04] group-hover:text-black/[0.07] dark:group-hover:text-white/[0.07] text-7xl sm:text-8xl font-serif pointer-events-none select-none leading-none transition-colors duration-250 ease-smooth">
            “
          </div>

          {/* Quote Content */}
          <div className="relative z-10 flex flex-col gap-4 min-h-[4rem] justify-center">
            <p className="font-mono text-black dark:text-white text-sm sm:text-base md:text-lg leading-relaxed tracking-tight italic">
              "{profileData.quote.text}"
            </p>

            <div className="flex justify-end items-center">
              <span className="font-mono text-xs sm:text-sm text-[#909092] tracking-wider uppercase">
                — {profileData.quote.author}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default QuoteCard;
