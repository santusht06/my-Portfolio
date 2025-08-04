import React from "react";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";

const SocialCard = () => {
  return (
    <div>
      <div className="mt-4   md:mt-2 flex gap-2">
        <div className="w-[40px] h-[40px] rounded-full bg-transparent inner-shadow flex items-center justify-center text-white text-xl hover:bg-white hover:text-black transition-all ease-in-out duration-200 cursor-pointer">
          <a href="https://www.facebook.com/share/1GCtyJYEsW/?mibextid=LQQJ4d">
            <FaFacebookF />
          </a>
        </div>
        <div className="w-[40px] h-[40px] rounded-full bg-transparent inner-shadow flex items-center justify-center text-white text-3xl hover:bg-white hover:text-black transition-all ease-in-out duration-200 cursor-pointer">
          <a href="https://www.instagram.com/santusht_09?igsh=eDBoMGEwOTFvaHJp&utm_source=qr">
            <IoLogoInstagram />
          </a>
        </div>
        <div className="w-[40px] h-[40px] rounded-full bg-transparent inner-shadow flex items-center justify-center text-white text-xl hover:bg-white hover:text-black transition-all ease-in-out duration-200 cursor-pointer">
          <a href="https://www.threads.com/@santusht_09?igshid=NTc4MTIwNjQ2YQ==">
            <FaThreads />
          </a>
        </div>
        <div className="w-[40px] h-[40px] rounded-full bg-transparent inner-shadow flex items-center justify-center text-white text-xl hover:bg-white hover:text-black transition-all ease-in-out duration-200 cursor-pointer">
          <a href="https://www.linkedin.com/in/santusht-kotai-8a4454323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
