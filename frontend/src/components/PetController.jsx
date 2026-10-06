import React, { useState, useRef, useEffect } from "react";
import { Cat, Heart, Sparkles, Moon, Compass, Power } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePet } from "@/context/PetContext";
import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
} from "@/components/animate-ui/components/base/tooltip";

export const PetController = () => {
  const {
    isEnabled,
    togglePet,
    skin,
    setSkin,
    mode,
    setMode,
    heartsCount,
  } = usePet();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <Tooltip delayDuration={60}>
        <TooltipTrigger
          render={
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Pet companion settings"
              className={`relative size-8 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer ${
                isEnabled
                  ? "bg-black/10 dark:bg-white/10 text-black dark:text-white border border-black/20 dark:border-white/20 shadow-xs"
                  : "bg-black/5 dark:bg-white/[0.04] hover:bg-black/10 dark:hover:bg-white/[0.08] text-[#909092] hover:text-black dark:hover:text-white border border-black/10 dark:border-white/[0.08]"
              }`}
            >
              <Cat className="size-4 transition-transform hover:scale-110" />
              {/* Active breathing status dot */}
              {isEnabled && (
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black animate-pulse" />
              )}
            </button>
          }
        />
        <TooltipPanel side="bottom" sideOffset={6}>
          <p className="font-semibold text-xs text-black">
            {isEnabled ? "Playful Pet: Active" : "Playful Pet: Sleeping"}
          </p>
        </TooltipPanel>
      </Tooltip>

      {/* Mini Controls Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-10 w-64 p-3 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-xl z-50 text-xs font-sans text-black dark:text-white select-none"
          >
            {/* Header with Title & Power Toggle */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 font-medium">
                <Cat className="size-3.5 text-pink-500" />
                <span className="font-semibold">Playful Pet</span>
                <span className="text-[10px] font-mono text-[#909092] px-1 py-0.2 rounded bg-black/5 dark:bg-white/5">
                  Neko
                </span>
              </div>
              <button
                onClick={togglePet}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  isEnabled
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-black/5 dark:bg-white/5 text-[#909092] border border-black/10 dark:border-white/10"
                }`}
              >
                <Power className="size-3" />
                {isEnabled ? "On" : "Off"}
              </button>
            </div>

            {/* Skin Selector */}
            <div className="mb-2.5">
              <div className="text-[11px] font-mono text-[#909092] mb-1.5 flex items-center justify-between">
                <span>Skin</span>
                <Sparkles className="size-3 text-[#909092]" />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSkin("classic")}
                  className={`px-2 py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    skin === "classic"
                      ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                      : "bg-black/5 dark:bg-white/5 text-[#909092] hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span className="size-2 rounded-full bg-slate-300 border border-black/20 inline-block" />
                  Classic Cat
                </button>
                <button
                  onClick={() => setSkin("sakura")}
                  className={`px-2 py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    skin === "sakura"
                      ? "bg-pink-500 text-white font-semibold shadow-xs"
                      : "bg-black/5 dark:bg-white/5 text-[#909092] hover:text-pink-500"
                  }`}
                >
                  <span className="size-2 rounded-full bg-pink-400 border border-pink-600/20 inline-block" />
                  Sakura Pink
                </button>
              </div>
            </div>

            {/* Behavior Mode Selector */}
            <div className="mb-3">
              <div className="text-[11px] font-mono text-[#909092] mb-1.5 flex items-center justify-between">
                <span>Behavior</span>
                <Compass className="size-3 text-[#909092]" />
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "followCursor", label: "Follow", icon: "🐾" },
                  { id: "runAway", label: "Shy", icon: "💨" },
                  { id: "nap", label: "Nap", icon: "💤" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`py-1 rounded-md text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      mode === item.id
                        ? "bg-black/10 dark:bg-white/15 text-black dark:text-white font-medium border border-black/15 dark:border-white/15"
                        : "text-[#909092] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Love / Heart Stats Footer */}
            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-[#909092]">
              <span className="flex items-center gap-1">
                <Heart className="size-3 text-pink-500 fill-pink-500" />
                <span>Petted {heartsCount} times</span>
              </span>
              <span className="font-mono text-[10px]">Click pet for ❤</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetController;
