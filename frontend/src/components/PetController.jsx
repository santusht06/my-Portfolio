import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Cat, Heart, Power } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePet } from "@/context/PetContext";
import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
} from "@/components/animate-ui/components/base/tooltip";

const MODES = [
  { id: "followCursor", label: "Follow", emoji: "🐾" },
  { id: "runAway",      label: "Shy",    emoji: "💨" },
  { id: "nap",          label: "Nap",    emoji: "💤" },
];

const SKINS = [
  { id: "classic", label: "Classic", dot: "#d4d4d4" },
  { id: "sakura",  label: "Sakura",  dot: "#f9a8d4" },
];

export const PetController = ({ onOpenChange }) => {
  const { isEnabled, togglePet, skin, setSkin, mode, setMode, heartsCount } =
    usePet();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Notify parent (e.g. TopNav) of open state so header can raise z-index
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Fullscreen backdrop blur overlay for focus and premium feeling */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 dark:bg-black/70 backdrop-blur-md cursor-pointer"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>,
          document.body
        )}

      <div className="relative" ref={menuRef}>
        {/* Trigger Button — matches TopNav's other icon buttons exactly */}
        <Tooltip delayDuration={60}>
          <TooltipTrigger
            render={
              <button
                onClick={() => setIsOpen((p) => !p)}
                aria-label="Pet companion settings"
                className={`relative size-8 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer border ${
                  isOpen
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-md ring-2 ring-black/15 dark:ring-white/25 scale-105"
                    : isEnabled
                    ? "bg-black/[0.07] dark:bg-white/[0.07] border-black/20 dark:border-white/20 text-black dark:text-white"
                    : "bg-black/5 dark:bg-white/[0.04] border-black/10 dark:border-white/[0.08] text-[#909092] hover:bg-black/10 dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white"
                }`}
              >
                <Cat className="size-4" />
                {/* Live pulse dot */}
                {isEnabled && (
                  <span
                    className={`absolute -top-px -right-px size-[7px] rounded-full ring-1 ${
                      isOpen
                        ? "bg-emerald-400 ring-black dark:ring-white"
                        : "bg-black dark:bg-white ring-white dark:ring-black"
                    }`}
                    aria-hidden
                  />
                )}
              </button>
            }
          />
          <TooltipPanel side="bottom" sideOffset={6}>
            <p className="font-semibold text-xs text-black">
              {isEnabled ? "Neko · Active" : "Neko · Sleeping"}
            </p>
          </TooltipPanel>
        </Tooltip>

        {/* Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-[calc(100%+10px)] w-64 z-50 select-none
                         bg-white dark:bg-black
                         border border-black/15 dark:border-white/20
                         rounded-2xl shadow-2xl shadow-black/25 dark:shadow-black/90
                         ring-1 ring-black/5 dark:ring-white/10
                         overflow-hidden"
            >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-3.5 pt-3 pb-2.5 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Cat className="size-3.5 text-black dark:text-white shrink-0" />
                <span className="text-xs font-semibold text-black dark:text-white tracking-[-0.01em]">
                  Neko
                </span>
                <span className="text-[10px] font-mono text-[#909092] tabular-nums">
                  /{" "}
                  {mode === "followCursor"
                    ? "following"
                    : mode === "runAway"
                    ? "shy"
                    : "napping"}
                </span>
              </div>

              {/* Power toggle — no colour, just opacity shift */}
              <button
                onClick={togglePet}
                aria-label={isEnabled ? "Disable pet" : "Enable pet"}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono
                            border transition-all duration-150 cursor-pointer ${
                              isEnabled
                                ? "border-black/20 dark:border-white/20 text-black dark:text-white bg-black/[0.06] dark:bg-white/[0.06]"
                                : "border-black/10 dark:border-white/10 text-[#909092] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                            }`}
              >
                <Power className="size-2.5" />
                {isEnabled ? "on" : "off"}
              </button>
            </div>

            {/* ── Body ── */}
            <div className="px-3.5 pt-2.5 pb-3 space-y-3.5">

              {/* Skin row */}
              <div>
                <p className="text-[10px] font-mono text-[#909092] uppercase tracking-wider mb-1.5">
                  Skin
                </p>
                <div className="flex gap-1.5">
                  {SKINS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSkin(s.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-sans
                                  border transition-all duration-150 cursor-pointer ${
                                    skin === s.id
                                      ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-medium"
                                      : "border-black/10 dark:border-white/10 text-[#909092] hover:text-black dark:hover:text-white hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                                  }`}
                    >
                      <span
                        className="size-1.5 rounded-full shrink-0 inline-block"
                        style={{ backgroundColor: skin === s.id ? (skin === "sakura" ? "#f9a8d4" : "#d4d4d4") : s.dot }}
                      />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Behavior row */}
              <div>
                <p className="text-[10px] font-mono text-[#909092] uppercase tracking-wider mb-1.5">
                  Behavior
                </p>
                <div className="flex gap-1">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-[10px] font-mono
                                  border transition-all duration-150 cursor-pointer ${
                                    mode === m.id
                                      ? "border-black/20 dark:border-white/20 bg-black/[0.06] dark:bg-white/[0.06] text-black dark:text-white"
                                      : "border-transparent text-[#909092] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                                  }`}
                    >
                      <span className="text-sm leading-none">{m.emoji}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="px-3.5 py-2 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#909092]">
                <Heart className="size-2.5 fill-red-500 text-red-500" />
                <span>
                  <strong className="text-black dark:text-white font-medium">
                    {heartsCount}
                  </strong>{" "}
                  {heartsCount === 1 ? "pet" : "pets"}
                </span>
              </span>
              <span className="text-[10px] font-mono text-[#909092]/60">
                click to pet
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
};

export default PetController;
