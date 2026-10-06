import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
} from "@/components/animate-ui/components/base/tooltip";

const TopNav = ({ onOpenCommand }) => {
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Work", path: "/work" },
    { label: "Blog", path: "/blog" },
    { label: "Resume", path: "/resume" },
    { label: "Contact", path: "/contact" },
  ];

  const activeValue = navLinks.some((l) => l.path === location.pathname)
    ? location.pathname
    : navLinks.find((l) => l.path !== "/" && location.pathname.startsWith(l.path))?.path || "/";

  return (
    <header
      className="fixed top-0 right-0 left-0 lg:left-[430px] xl:left-[460px] z-40 py-2.5 sm:py-3.5 bg-white/45 dark:bg-black/35 backdrop-blur-xl transition-colors pointer-events-none"
      style={{
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-3 sm:px-6 pointer-events-auto">
        {/* Navigation links - clean without any enclosing box container */}
        <nav className="flex items-center gap-0.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-shrink min-w-0 pr-1">
          {navLinks.map((link) => {
            const isActive = activeValue === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 ease-smooth motion-safe:active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none select-none whitespace-nowrap ${
                  isActive
                    ? "text-black dark:text-white font-semibold"
                    : "text-[#909092] hover:text-black dark:text-[#909092] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.05]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/[0.1] border border-black/15 dark:border-white/[0.12] shadow-xs dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right tool: Theme Toggler & Search / Command Palette (Cmd+K) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <Tooltip delayDuration={60}>
            <TooltipTrigger
              render={
                <ThemeTogglerButton
                  variant="default"
                  size="default"
                  direction="btt"
                  modes={["light", "dark"]}
                  className="rounded-full bg-black/5 dark:bg-white/[0.04] hover:bg-black/10 dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 text-[#909092] hover:text-black dark:text-[#909092] dark:hover:text-white size-8 flex items-center justify-center cursor-pointer transition-colors"
                />
              }
            />
            <TooltipPanel side="bottom" sideOffset={6}>
              <p className="font-semibold text-xs text-black">Toggle theme</p>
            </TooltipPanel>
          </Tooltip>

          <button
            onClick={onOpenCommand}
            aria-label="Open command palette"
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full bg-black/5 dark:bg-white/[0.04] hover:bg-black/10 dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 text-[#909092] hover:text-black dark:text-[#909092] dark:hover:text-white motion-safe:active:scale-[0.97] transition-[background-color,border-color,color,box-shadow] duration-150 ease-smooth text-xs group shadow-xs cursor-pointer"
          >
            <FiSearch className="text-xs group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none text-[#909092]" />
            <span className="hidden sm:inline text-[#909092] group-hover:text-black dark:group-hover:text-white text-[11px] font-sans transition-colors duration-150 ease-smooth">
              Search
            </span>
            <div className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono text-[#909092] bg-black/5 dark:bg-white/[0.06] group-hover:bg-black/10 dark:group-hover:bg-white/[0.1] group-hover:text-black dark:group-hover:text-white group-hover:border-black/20 dark:group-hover:border-white/20 px-1.5 py-0.5 rounded border border-black/10 dark:border-white/[0.06] transition-[border-color,background-color,color] duration-150 ease-smooth">
              <span>⌘</span>
              <span>K</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
