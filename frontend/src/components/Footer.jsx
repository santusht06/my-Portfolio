import React from "react";
import { profileData } from "../data/portfolioData";
import {
  FaXTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaThreads,
} from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
} from "@/components/animate-ui/components/base/tooltip";
import { ScrollReveal } from "./ScrollReveal";

const Footer = () => {
  const socialLinks = [
    {
      label: "X",
      name: "X (Twitter)",
      icon: FaXTwitter,
      href: "https://x.com",
    },
    {
      label: "LinkedIn",
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/santusht-kotai-8a4454323",
    },
    {
      label: "GitHub",
      name: "GitHub",
      icon: FaGithub,
      href: "https://github.com/santusht06",
    },
    {
      label: "Instagram",
      name: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/santusht.online",
    },
    {
      label: "Threads",
      name: "Threads",
      icon: FaThreads,
      href: "https://www.threads.com/@santusht_09",
    },
    {
      label: "Email",
      name: "Email",
      icon: MdOutlineMail,
      href: `mailto:${profileData.email}`,
    },
  ];

  return (
    <footer className="w-full pt-16 pb-12 mt-12 border-t border-black/[0.06] dark:border-white/[0.06] text-[#909092]">
      <ScrollReveal delay={0.04} y={16}>
        <div className="mb-10">
          {/* CONNECT */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#909092] mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Tooltip key={item.label} delayDuration={50}>
                    <TooltipTrigger
                      render={
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          className="text-[#909092] hover:text-black dark:text-[#909092] dark:hover:text-white transition-colors duration-150 motion-safe:active:scale-90 inline-flex items-center justify-center cursor-pointer p-1"
                        >
                          <Icon className="text-lg" />
                        </a>
                      }
                    />
                    <TooltipPanel side="top" sideOffset={8}>
                      <p className="font-semibold text-xs text-black">{item.name}</p>
                    </TooltipPanel>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1} y={10}>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-black/[0.04] dark:border-white/[0.04] text-xs font-mono text-[#909092] gap-2">
          <p>© 2026 {profileData.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-[#909092]/80">
            Crafted with React, Tailwind & Animate UI
          </p>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
