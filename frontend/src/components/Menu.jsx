import React, { useEffect, useRef } from "react";
import { IoLogoInstagram, IoMdClose } from "react-icons/io";
import { SlHome } from "react-icons/sl";
import { LiaSuitcaseSolid } from "react-icons/lia";
import { VscChecklist } from "react-icons/vsc";
import { MdClearAll } from "react-icons/md";
import {
  FaRegUser,
  FaXTwitter,
  FaFacebookF,
  FaLinkedin,
  FaThreads,
} from "react-icons/fa6";
import { DiGithubBadge } from "react-icons/di";
import { AiOutlineGithub } from "react-icons/ai";

import { BsBlockquoteRight, BsChatRightText } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import gsap from "gsap";

const Menu = ({ onClose, isVisible, onSectionClick }) => {
  const menuRef = useRef();
  const itemsRef = useRef([]);
  const socialsRef = useRef([]);

  const menuItems = [
    { icon: <SlHome />, title: "Home", key: "home" },
    { icon: <LiaSuitcaseSolid />, title: "Experience", key: "experience" },
    { icon: <VscChecklist />, title: "Selected Work", key: "selectedWork" },
    { icon: <MdClearAll />, title: "Services", key: "services" },
    { icon: <FaRegUser />, title: "About", key: "about" },
    { icon: <BsBlockquoteRight />, title: "Testimonial", key: "testimonial" },
    { icon: <BsChatRightText />, title: "FAQs", key: "faq" },
    { icon: <HiOutlineMail />, title: "Contact", key: "contact" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (isVisible) {
        tl.fromTo(
          menuRef.current,
          { x: 324, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4 }
        )
          .fromTo(
            itemsRef.current,
            { opacity: 0, x: 20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.09,
            },
            "-=0.2"
          )
          .fromTo(
            socialsRef.current,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
            },
            "-=0.4"
          );
      }
    });

    return () => ctx.revert(); // Clean-up on unmount or re-render
  }, [isVisible]);

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <div
        onClick={onClose}
        className={`fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-md z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 -right-12 lg:right-0  h-screen w-[324px] bg-transparent z-100    ${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <div className="h-full px-17 lg:px-10  py-8 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="h-[5px] w-[5px] rounded-full bg-[#777]" />
                <div className="text-[#777777] font-MainLight text-[20px]">
                  Menu
                </div>
              </div>
              <div
                onClick={onClose}
                className="text-2xl text-white cursor-pointer hover:text-[#F3500F] transition"
              >
                <IoMdClose />
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-7">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  onClick={() => onSectionClick?.(item.key)}
                  className="flex items-center gap-4 text-[#BBBBBB] hover:text-white transition-all cursor-pointer text-lg font-MainLight opacity-0 translate-x-4"
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* Social Section */}
          <div>
            <div className="flex items-center gap-3 mt-10 mb-4  ">
              <div className="h-[5px] w-[5px] rounded-full bg-[#777]" />
              <div className="text-[#777777] font-MainLight text-[20px]">
                Social Network
              </div>
            </div>

            <div className="flex gap-3">
              {[
                {
                  icon: AiOutlineGithub,
                  link: "https://github.com/santusht06",
                },
                {
                  icon: IoLogoInstagram,
                  link: "https://www.instagram.com/santusht.me?igsh=eDBoMGEwOTFvaHJp&utm_source=qr",
                },
                {
                  icon: FaThreads,
                  link: "https://www.threads.com/@santusht_09?igshid=NTc4MTIwNjQ2YQ==",
                },
                {
                  icon: FaLinkedin,
                  link: "https://www.linkedin.com/in/santusht-kotai-8a4454323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                },
              ].map(({ icon: Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => (socialsRef.current[idx] = el)}
                  className="w-[40px] h-[40px] rounded-full bg-transparent inner-shadow flex items-center justify-center text-white text-xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer opacity-0 translate-y-2"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
