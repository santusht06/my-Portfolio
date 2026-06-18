import React, { useState } from "react";
import MyServicesCard from "./MyServicesCard";
import { LiaPenNibSolid } from "react-icons/lia";
import { FaReact } from "react-icons/fa";
import { GrServerCluster } from "react-icons/gr";
import { MdCrop } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import { GoArrowUpRight } from "react-icons/go";

const MyServices = ({ scrollToContact }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleCard = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const data = [
    {
      icon: <FaReact />,
      title: "Frontend Development",
      subtitle: {
        one: "Responsive UI Architecture",
        two: "Interactive & Animated Interfaces",
        three: "Accessibility & Performance Optimization",
      },
    },
    {
      icon: <GrServerCluster />,
      title: "Backend Development",
      subtitle: {
        one: "Server Management",
        two: "Database Architecture",
        three: "API Design & Auth",
      },
    },
    {
      icon: <MdCrop />,
      title: "Webflow Dev",
      subtitle: {
        one: "CMS Integration",
        two: "Responsive Animations",
        three: "SEO Optimization",
      },
    },
    {
      icon: <LiaPenNibSolid />,
      title: "Graphic Design",
      subtitle: {
        one: "Web Interface Design",
        two: "Design Systems & Guidelines",
        three: "Asset Optimization for Web",
      },
    },
  ];

  return (
    <div className="lg:w-full lg:max-w-[750px] lg:h-fit bg-[#111111] inner-shadow lg:mt-50 mt-44  rounded-3xl transition-all duration-300 ease-in-out mb-10   ">
      <div className="lg:px-15   lg:pt-20 px-4 pt-10  ">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[5px] w-[5px] rounded-full bg-[#777]" />
          <span className="text-[#777777] font-MainLight text-[18px]">
            My Services
          </span>
        </div>

        {data.map((items, idx) => (
          <MyServicesCard
            key={idx}
            icon={items.icon}
            title={items.title}
            subOne={items.subtitle.one}
            subTwo={items.subtitle.two}
            subThree={items.subtitle.three}
            isOpen={idx === activeIndex}
            onClick={() => toggleCard(idx)}
          />
        ))}

        <div className="w-full flex justify-between items-center mt-17 pb-20">
          <div className="flex items-center gap-3">
            <div className="text-[#BBBBBB] text-sm">
              <TfiWorld />
            </div>
            <p className="text-md text-[#BBBBBB] font-MainLight">
              Available to <span className="text-white ml-1">Worldwide</span>
            </p>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer "
            onClick={scrollToContact}
          >
            <p className="text-[#FFFFFF] font-MainLight text-[16px] hover:text-[#F3500F] transition-all ease-in-out duration-280 flex justify-center items-center gap-1">
              Contact me{" "}
              <span className="text-xl">
                <GoArrowUpRight />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServices;
