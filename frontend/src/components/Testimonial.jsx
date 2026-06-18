import React from "react";
import testimonialbg from "../assets/Pictures/testimonialbg.webp";
import testimonial1 from "../assets/Pictures/Testimonial1.webp";

const Testimonial = () => {
  return (
    <>
      <div>
        <div className="lg:w-[750px] lg:h-250 bg-black rounded-3xl overflow-hidden relative lg:mt-40 mt-30">
          <div
            className="lg:h-full h-auto lg:w-full rounded-3xl lg:px-16 lg:py-20 px-4 py-10 inner-shadow relative inset-0 z-20"
            style={{
              backgroundImage: `linear-gradient(-155deg, #000000 40%, #7D36139E 100%)`,
            }}
          >
            <div className="flex justify-start items-center gap-3">
              <div className="h-[5px] w-[5px] rounded-full bg-[#777777]" />
              <div className="text-[#777777] font-MainLight text-[18px]">
                Testimonial
              </div>
            </div>

            <div className="lg:mt-20 mt-6">
              <blockquote className="text-[#ffffffd7] lg:text-3xl text-lg font-MainLight tracking-tight text-start">
                "I had an amazing experience getting my business
                website—rideaunestrealty.ca—developed by Santusht! He was
                professional, listened to my needs, and delivered a beautiful,
                user-friendly site in just 3 days. His fast communication,
                attention to detail, and great support after launch made
                everything effortless. I highly recommend Santusht to anyone
                looking for a top-notch online presence! 👏"
              </blockquote>
            </div>

            {/* Image section */}
            <div
              className="
                lg:absolute lg:right-15 lg:bottom-15 
                mt-8 lg:mt-0 
                flex justify-center
              "
            >
              <div className="relative lg:w-[280px] w-[250px] lg:h-[370px] h-[350px] overflow-hidden rounded-2xl">
                <img
                  src={testimonial1}
                  alt="Kishan Patel, CEO of Rideau Nest Realty"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 rounded-2xl" />
                <div className="absolute bottom-9 left-4 z-20 text-white font-MainLight text-xl tracking-wide px-3">
                  <h3 className="font-MainLight text-xl text-white">Kishan Patel</h3>
                  <p className="text-sm tracking-tight text-[#BBBBBB] mt-1 font-MainLight">
                    CEO Rideau Nest Realty
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 h-60 w-60 ml-17 z-10">
            <img src={testimonialbg} alt="background" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
