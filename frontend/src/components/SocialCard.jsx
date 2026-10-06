import React from "react";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { DiGithubBadge } from "react-icons/di";

import { IoLogoInstagram } from "react-icons/io";

import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
} from "@/components/animate-ui/components/base/tooltip";

const SocialCard = () => {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/santusht06",
      label: "GitHub Profile",
      icon: <DiGithubBadge className="text-2xl" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/santusht.online?igsh=eDBoMGEwOTFvaHJp&utm_source=qr",
      label: "Instagram Profile",
      icon: <IoLogoInstagram className="text-xl" />,
    },
    {
      name: "Threads",
      href: "https://www.threads.com/@santusht_09?igshid=NTc4MTIwNjQ2YQ==",
      label: "Threads Profile",
      icon: <FaThreads className="text-base" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/santusht-kotai-8a4454323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      label: "LinkedIn Profile",
      icon: <FaLinkedin className="text-base" />,
    },
  ];

  return (
    <div className="mt-4 md:mt-2 flex items-center gap-4">
      {socialLinks.map((item) => (
        <Tooltip key={item.name} delayDuration={50}>
          <TooltipTrigger
            render={
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-[#909092] hover:text-black dark:text-[#909092] dark:hover:text-white transition-colors duration-150 motion-safe:active:scale-90 inline-flex items-center justify-center cursor-pointer p-1"
              >
                {item.icon}
              </a>
            }
          />
          <TooltipPanel side="top" sideOffset={8}>
            <p className="font-semibold text-xs text-black">{item.name}</p>
          </TooltipPanel>
        </Tooltip>
      ))}
    </div>
  );
};

export default SocialCard;
