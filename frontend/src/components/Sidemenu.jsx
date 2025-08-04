import React from "react";
import { SlHome } from "react-icons/sl";
import { VscChecklist, VscCodeReview } from "react-icons/vsc";
import { SiPolywork } from "react-icons/si";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { TfiComment } from "react-icons/tfi";

const Sidemenu = ({ onSectionClick, activeSection }) => {
  const iconClass = (section) =>
    `w-[46px] h-[46px] rounded-full transition-all ease-in-out duration-380 flex justify-center items-center text-2xl cursor-pointer ${
      activeSection === section
        ? "bg-white text-[#111111]"
        : "text-white hover:bg-[#2e2e2e]"
    }`;

  return (
    <div className="w-[54px] h-[460px] fixed top-[25%] right-[20px] bg-[#11111180] rounded-full backdrop-blur-sm hidden lg:block z-30">
      <div className="h-full w-full flex flex-col justify-between items-center py-[5px]  ">
        <div
          onClick={() => onSectionClick("home")}
          className={iconClass("home")}
        >
          <SlHome />
        </div>
        <div
          onClick={() => onSectionClick("selectedWork")}
          className={iconClass("selectedWork")}
        >
          <VscChecklist />
        </div>
        <div
          onClick={() => onSectionClick("services")}
          className={iconClass("services")}
        >
          <SiPolywork />
        </div>
        <div
          onClick={() => onSectionClick("about")}
          className={iconClass("about")}
        >
          <FiUser />
        </div>
        <div
          onClick={() => onSectionClick("testimonial")}
          className={iconClass("testimonial")}
        >
          <VscCodeReview />
        </div>
        <div onClick={() => onSectionClick("faq")} className={iconClass("faq")}>
          <TfiComment />
        </div>
        <div
          onClick={() => onSectionClick("contact")}
          className={iconClass("contact")}
        >
          <MdOutlineMail />
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
