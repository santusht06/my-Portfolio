import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

// Subtle floating music notes data
const FLOATING_NOTES = [
  { id: "n1", symbol: "♪", left: "16%", top: "28%", xDrift: -16, yDrift: -48, rot: -14, delay: 0.1, duration: 2.5, size: "text-xs sm:text-sm" },
  { id: "n2", symbol: "♫", left: "76%", top: "24%", xDrift: 18, yDrift: -52, rot: 16, delay: 0.7, duration: 2.8, size: "text-sm sm:text-base" },
  { id: "n3", symbol: "♬", left: "24%", top: "42%", xDrift: -12, yDrift: -44, rot: -10, delay: 1.3, duration: 2.9, size: "text-[11px] sm:text-xs" },
  { id: "n4", symbol: "♪", left: "82%", top: "44%", xDrift: 14, yDrift: -46, rot: 12, delay: 1.9, duration: 2.7, size: "text-xs sm:text-sm" },
];

/**
 * CharacterListeningAvatar
 * -------------------------------------------------------------
 * Displays the 1024x1024 character listening video with alpha transparency.
 * - ZERO automatic sound: video is muted and plays visually on hover/tap.
 * - Never degrades SEO or Lighthouse: strictly zero unsolicited audio playback.
 * - Dynamic Island bubble displays visual equalizer bars, track title, and an
 *   OPTIONAL manual sound toggle so user can explicitly choose to unmute.
 */
const CharacterListeningAvatar = ({
  videoSrc = "/character_listening.webm",
  posterSrc = "/character_listening_poster.webp",
  audioSrc = "/audio/lofi_chill.mp3",
  trackTitle = "Midnight Vibes",
  artistName = "Santusht",
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Ensure initial frame is stopped at 0 on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  // Clean up any audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Start visual playback on hover/focus (video only, zero auto audio)
  const handleStartPlayback = useCallback(() => {
    setIsPlaying(true);

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }

    // Only play audio if user explicitly unmuted via the speaker button
    if (isAudioEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [isAudioEnabled]);

  // Stop playback gracefully when hover ends
  const handleStopPlayback = useCallback(() => {
    setIsPlaying(false);

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  // Explicit user click to toggle audio
  const handleToggleAudio = useCallback((e) => {
    e.stopPropagation();

    // Lazy initialization so zero audio bytes are downloaded on initial page load
    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.volume = 0.45;
      audioRef.current = audio;
    }

    setIsAudioEnabled((prev) => {
      const next = !prev;
      if (next) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
      return next;
    });
  }, [audioSrc]);

  // Pointer enter / leave handlers
  const handleMouseEnter = () => {
    handleStartPlayback();
  };

  const handleMouseLeave = () => {
    handleStopPlayback();
  };

  // Touch tap toggle for iOS / Android mobile support
  const handleTouchToggle = () => {
    if (isPlaying) {
      handleStopPlayback();
    } else {
      handleStartPlayback();
    }
  };

  // Keyboard accessibility (Space or Enter to toggle)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isPlaying) {
        handleStopPlayback();
      } else {
        handleStartPlayback();
      }
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${trackTitle} - ${artistName}. Hover or press Enter to view listening animation.`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTouchToggle}
      onKeyDown={handleKeyDown}
      className={`relative group cursor-pointer outline-none select-none ${className}`}
    >
      {/* 1. Main Avatar Container */}
      <div className="relative h-52 w-52 sm:h-60 sm:w-60 lg:h-[260px] lg:w-[260px] rounded-2xl overflow-hidden border border-[#909092]/25 dark:border-[#909092]/30 bg-white dark:bg-black shadow-lg dark:shadow-2xl transition-all duration-300 group-hover:border-black/30 dark:group-hover:border-white/30 group-hover:shadow-2xl">
        {/* Subtle background glow when listening */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 transition-opacity duration-500 pointer-events-none ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Transparent Character Video (strictly muted by default, no SEO penalty) */}
        <video
          ref={videoRef}
          poster={posterSrc}
          playsInline
          muted
          loop
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-contain pointer-events-none select-none"
        >
          <source src={videoSrc} type="video/webm" />
          <source src="/character_listening.mp4" type="video/mp4" />
        </video>

        {/* 2. Floating Musical Notes around the character */}
        <AnimatePresence>
          {isPlaying && !prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {FLOATING_NOTES.map((note) => (
                <motion.span
                  key={note.id}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5, rotate: 0 }}
                  animate={{
                    opacity: [0, 0.75, 0.7, 0],
                    x: [0, note.xDrift * 0.5, note.xDrift],
                    y: [0, note.yDrift * 0.5, note.yDrift],
                    scale: [0.5, 1.05, 0.85],
                    rotate: [0, note.rot, note.rot * 1.3],
                  }}
                  transition={{
                    duration: note.duration,
                    delay: note.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  style={{ left: note.left, top: note.top }}
                  className={`absolute font-mono select-none text-zinc-800 dark:text-zinc-200 drop-shadow-sm ${note.size}`}
                >
                  {note.symbol}
                </motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Apple-like Floating Dynamic Island Bubble */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 8, scale: 0.92 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 6, scale: 0.94 }
            }
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 26,
              mass: 0.8,
            }}
            className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto whitespace-nowrap"
          >
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/85 dark:bg-black/90 backdrop-blur-md border border-white/15 dark:border-white/20 shadow-xl shadow-black/35 text-white">
              {/* Mini Animated Equalizer */}
              <div
                className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5"
                aria-hidden="true"
              >
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? { height: "8px" }
                      : { height: ["3px", "13px", "4px", "11px", "3px"] }
                  }
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-[2.5px] bg-emerald-400 rounded-full"
                />
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? { height: "12px" }
                      : { height: ["11px", "4px", "14px", "5px", "11px"] }
                  }
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.15,
                  }}
                  className="w-[2.5px] bg-emerald-400 rounded-full"
                />
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? { height: "6px" }
                      : { height: ["5px", "12px", "3px", "13px", "5px"] }
                  }
                  transition={{
                    duration: 0.85,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="w-[2.5px] bg-emerald-400 rounded-full"
                />
              </div>

              {/* Music Details */}
              <div className="flex flex-col text-left leading-tight pr-1">
                <span className="text-[11px] font-mono font-semibold tracking-tight text-white">
                  {trackTitle}
                </span>
                <span className="text-[9.5px] font-mono text-zinc-400 tracking-tight">
                  {artistName}
                </span>
              </div>

              {/* Interactive Audio Mute / Unmute Toggle Button */}
              <button
                type="button"
                onClick={handleToggleAudio}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                title={isAudioEnabled ? "Mute music" : "Click to play sound (unmute)"}
                aria-label={isAudioEnabled ? "Mute music" : "Click to play sound"}
              >
                {isAudioEnabled ? (
                  <FiVolume2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <FiVolumeX className="w-3.5 h-3.5 text-zinc-400" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterListeningAvatar;
