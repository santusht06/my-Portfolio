import React, { useState, useEffect } from "react";
import Logo from "../assets/Pictures/logo-1.svg";
import Signature from "../assets/Pictures/Signature.webp";
import CharacterListeningAvatar from "./CharacterListeningAvatar";
import { GoArrowUpRight } from "react-icons/go";
import { FiCopy, FiCheck, FiSearch } from "react-icons/fi";
import SocialCard from "./SocialCard";
import { profileData } from "../data/portfolioData";

const Card = ({ onOpenCommand }) => {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState({ time: "", meridiem: "" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const meridiem = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTime({
        time: `${hours}:${minutes < 10 ? "0" + minutes : minutes}`,
        meridiem,
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-[92vw] sm:w-[420px] lg:w-full max-w-[440px] mx-auto p-1.5 rounded-[2rem] bezel-outer overflow-hidden shadow-xl dark:shadow-2xl transition-[border-color,box-shadow] duration-200">
      <div className="bezel-inner rounded-[calc(2rem-0.375rem)] p-5 sm:p-6 lg:p-7 relative flex flex-col justify-between min-h-[580px] lg:min-h-[620px] lg:h-[84vh] lg:max-h-[760px] border border-black/[0.05] dark:border-white/[0.04]">
        {/* Top Header: Logo & Live Time */}
        <div className="w-full flex justify-between items-center pb-4 border-b border-black/[0.06] dark:border-white/[0.05]">
          <div className="flex-shrink-0">
            <img src={Logo} alt="Santusht Logo" className="h-6 sm:h-7 w-auto dark:invert-0" />
          </div>
          <div className="text-xs font-mono text-black dark:text-white font-medium">
            {time.time} {time.meridiem}
          </div>
        </div>

        {/* Profile Image with Listening Animation */}
        <div className="flex flex-col items-center my-3 sm:my-5 pb-2">
          <div className="relative">
            <CharacterListeningAvatar
              videoSrc="/character_listening.webm"
              posterSrc="/character_listening_poster.webp"
              audioSrc="/audio/lofi_chill.mp3"
              trackTitle="Midnight Vibes"
              artistName="Santusht"
            />

            {/* Hand-written Signature Overlay */}
            <div className="absolute -bottom-5 sm:-bottom-6 inset-x-0 flex justify-center pointer-events-none z-10">
              <img
                src={Signature}
                alt="Hand-written Signature"
                width={180}
                height={70}
                loading="eager"
                className="h-16 sm:h-20 lg:h-22 w-auto scale-110 drop-shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Identity & Location */}
        <div className="flex flex-col items-center text-center gap-1.5 my-2">
          <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight">
            {profileData.name}
          </h2>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#909092] hover:text-black dark:text-[#909092] dark:hover:text-white cursor-pointer group bg-black/[0.03] hover:bg-black/[0.07] dark:bg-white/[0.03] dark:hover:bg-white/[0.07] px-3 py-1 rounded-full border border-black/[0.06] hover:border-black/20 dark:border-white/[0.06] dark:hover:border-white/20 motion-safe:active:scale-[0.95] transition-[background-color,border-color,color] duration-150 ease-smooth"
            title="Click to copy email"
          >
            <span className="truncate max-w-[240px] sm:max-w-none">{profileData.email}</span>
            {copied ? (
              <FiCheck className="text-black dark:text-white text-xs motion-safe:scale-110 transition-transform duration-150 ease-out-fluid" />
            ) : (
              <FiCopy className="text-[#909092] group-hover:text-black dark:text-[#909092] dark:group-hover:text-white text-xs transition-colors duration-150" />
            )}
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#909092] mt-1">
            <span>{profileData.location}</span>
          </div>
        </div>

        {/* Social Icons Strip */}
        <div className="flex justify-center my-3">
          <SocialCard />
        </div>

        {/* Bottom CTA: Quick Command Menu (⌘K) with nested circle */}
        <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.05]">
          <button
            onClick={onOpenCommand}
            className="w-full flex items-center justify-between p-1.5 pl-4 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.07] dark:hover:bg-white/[0.08] motion-safe:active:scale-[0.97] transition-[background-color,border-color,color,box-shadow] duration-150 ease-smooth cursor-pointer group shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#909092] group-hover:text-black dark:group-hover:text-white transition-colors duration-150">
              <FiSearch className="text-sm text-[#909092] group-hover:text-black dark:group-hover:text-white transition-colors duration-150" />
              <span>Command Menu</span>
              <span className="text-[10px] bg-black/[0.06] dark:bg-white/[0.08] group-hover:bg-black/[0.1] dark:group-hover:bg-white/[0.12] px-1.5 py-0.5 rounded text-[#909092] group-hover:text-black dark:group-hover:text-white border border-black/[0.06] dark:border-white/[0.06] transition-[background-color,color] duration-150 ease-smooth">
                ⌘K
              </span>
            </div>

            {/* Nested trailing icon circle */}
            <div className="w-9 h-9 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-sm group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_0_12px_rgba(255,255,255,0.25)] transition-[transform,box-shadow] duration-150 ease-smooth motion-reduce:transform-none">
              <GoArrowUpRight className="transition-transform duration-150 ease-smooth" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
