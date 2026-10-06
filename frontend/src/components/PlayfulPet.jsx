import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePet } from "@/context/PetContext";

const SPRITE_SETS = {
  rest: [[0, 0]],
  notice: [[-1, 0]],
  drowsy: [[-2, 0]],
  asleep: [
    [-3, 0],
    [-4, 0],
  ],
  selfGroom: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  north: [
    [0, -1],
    [-1, -1],
  ],
  south: [
    [-2, -1],
    [-3, -1],
  ],
  east: [
    [-4, -1],
    [-5, -1],
  ],
  west: [
    [-6, -1],
    [-7, -1],
  ],
  northeast: [
    [0, -2],
    [-1, -2],
  ],
  northwest: [
    [-2, -2],
    [-3, -2],
  ],
  southeast: [
    [-4, -2],
    [-5, -2],
  ],
  southwest: [
    [-6, -2],
    [-7, -2],
  ],
  scratchWallTop: [
    [0, -3],
    [-1, -3],
  ],
  scratchWallBottom: [
    [-2, -3],
    [-3, -3],
  ],
  scratchWallRight: [
    [-4, -3],
    [-5, -3],
  ],
  scratchWallLeft: [
    [-6, -3],
    [-7, -3],
  ],
};

export const PlayfulPet = () => {
  const {
    isEnabled,
    skin,
    mode,
    speed,
    petSize,
    incrementHearts,
    spriteSrc,
  } = usePet();

  const petElRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // Position and Physics Refs (Avoid React re-renders on every animation frame)
  const petPosRef = useRef({ x: 96, y: 96 });
  const mousePosRef = useRef({ x: 96, y: 96 });
  const hasMouseMovedRef = useRef(false);

  const frameCountRef = useRef(0);
  const idleTimeRef = useRef(0);
  const idleAnimRef = useRef(null);
  const idleAnimFrameRef = useRef(0);
  const groomingCoolDownRef = useRef(false);

  const scale = petSize / 32;
  const halfSize = petSize / 2;

  // Apply sprite background position
  const setSprite = useCallback(
    (name, frameIndex = 0) => {
      if (!petElRef.current) return;
      const frames = SPRITE_SETS[name] || SPRITE_SETS.rest;
      const coord = frames[frameIndex % frames.length];
      const posX = coord[0] * 32 * scale;
      const posY = coord[1] * 32 * scale;
      petElRef.current.style.backgroundPosition = `${posX}px ${posY}px`;
    },
    [scale]
  );

  // Trigger floating heart particles when petted
  const handlePetClick = (e) => {
    e.stopPropagation();
    incrementHearts();

    const rect = petElRef.current?.getBoundingClientRect();
    if (!rect) return;

    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const count = 7;
    const newHearts = [];
    for (let i = 0; i < count; i++) {
      const id = `${Date.now()}-${i}-${Math.random()}`;
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const distance = 30 + Math.random() * 40;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 25; // drift upward
      const rot = (Math.random() - 0.5) * 60;
      const heartScale = 0.8 + Math.random() * 0.6;

      newHearts.push({ id, originX, originY, dx, dy, rot, scale: heartScale });
    }

    setParticles((prev) => [...prev, ...newHearts]);

    // Happy reaction animation
    setSprite("notice", 0);
    setTimeout(() => {
      setSprite("selfGroom", 1);
    }, 150);

    // Auto-clean particles after 900ms
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newHearts.some((nh) => nh.id === p.id))
      );
    }, 950);
  };

  // Idle cycle handling (sleeping, grooming, scratch wall)
  const handleIdle = useCallback(() => {
    idleTimeRef.current += 1;

    // After idle for ~1.5s, randomly pick an animation
    if (
      idleTimeRef.current > 12 &&
      Math.floor(Math.random() * 70) === 0 &&
      !idleAnimRef.current
    ) {
      const candidates = ["asleep", "selfGroom"];
      const { x, y } = petPosRef.current;

      if (x < halfSize + 20) candidates.push("scratchWallLeft");
      if (y < halfSize + 20) candidates.push("scratchWallTop");
      if (x > window.innerWidth - (halfSize + 20)) candidates.push("scratchWallRight");
      if (y > window.innerHeight - (halfSize + 20)) candidates.push("scratchWallBottom");

      idleAnimRef.current =
        candidates[Math.floor(Math.random() * candidates.length)];
    }

    const currentAnim = idleAnimRef.current;
    if (!currentAnim) {
      setSprite("rest", 0);
      return;
    }

    switch (currentAnim) {
      case "asleep":
        if (idleAnimFrameRef.current < 8) {
          setSprite("drowsy", 0);
        } else {
          setSprite("asleep", Math.floor(idleAnimFrameRef.current / 4));
          if (idleAnimFrameRef.current > 160) {
            idleAnimRef.current = null;
            idleAnimFrameRef.current = 0;
          }
        }
        break;

      case "scratchWallTop":
      case "scratchWallBottom":
      case "scratchWallRight":
      case "scratchWallLeft":
      case "selfGroom":
        setSprite(currentAnim, idleAnimFrameRef.current);
        if (idleAnimFrameRef.current > 10) {
          idleAnimRef.current = null;
          idleAnimFrameRef.current = 0;
        }
        break;

      default:
        setSprite("rest", 0);
        return;
    }

    idleAnimFrameRef.current += 1;
  }, [halfSize, setSprite]);

  // Main animation frame tick (runs ~10fps sprite update with smooth position)
  useEffect(() => {
    if (!isEnabled) return;

    let animationFrameId;
    let lastTickTime = 0;
    const FRAME_RATE_MS = 100; // 10 fps retro sprite loop

    // Initialize pet position to near bottom-right on startup
    if (!hasMouseMovedRef.current) {
      const startX = Math.min(window.innerWidth - 80, 260);
      const startY = Math.min(window.innerHeight - 80, 260);
      petPosRef.current = { x: startX, y: startY };
      mousePosRef.current = { x: startX, y: startY };
      if (petElRef.current) {
        petElRef.current.style.transform = `translate3d(${startX - halfSize}px, ${
          startY - halfSize
        }px, 0)`;
      }
      setSprite("rest", 0);
    }

    const updatePhysics = () => {
      const pet = petPosRef.current;
      const mouse = mousePosRef.current;

      const diffX = pet.x - mouse.x;
      const diffY = pet.y - mouse.y;
      const distance = Math.hypot(diffX, diffY);

      // Nap mode: pet stays asleep peacefully
      if (mode === "nap") {
        handleIdle();
        return;
      }

      // Run Away mode: shy pet runs away when cursor gets too close
      if (mode === "runAway") {
        frameCountRef.current += 1;
        if (distance < 160 && distance > 5) {
          idleAnimRef.current = null;
          idleAnimFrameRef.current = 0;
          idleTimeRef.current = 0;

          let dir = diffY / distance > 0.5 ? "south" : diffY / distance < -0.5 ? "north" : "";
          dir += diffX / distance > 0.5 ? "east" : diffX / distance < -0.5 ? "west" : "";
          if (!dir) dir = "south";

          setSprite(dir, frameCountRef.current);

          pet.x += (diffX / distance) * speed;
          pet.y += (diffY / distance) * speed;

          pet.x = Math.max(halfSize, Math.min(pet.x, window.innerWidth - halfSize));
          pet.y = Math.max(halfSize, Math.min(pet.y, window.innerHeight - halfSize));

          if (petElRef.current) {
            petElRef.current.style.transform = `translate3d(${pet.x - halfSize}px, ${
              pet.y - halfSize
            }px, 0)`;
          }
        } else {
          handleIdle();
        }
        return;
      }

      // Default followCursor mode:
      // If mouse is within 48px, pet relaxes
      if (distance < 48 || distance < speed) {
        handleIdle();
        return;
      }

      idleAnimRef.current = null;
      idleAnimFrameRef.current = 0;

      // Notice alert when mouse first moves away after being idle
      if (idleTimeRef.current > 1) {
        setSprite("notice", 0);
        idleTimeRef.current = Math.min(idleTimeRef.current, 5) - 1;
        return;
      }

      frameCountRef.current += 1;

      // Determine 8-way directional heading
      let dir = "";
      if (diffY / distance > 0.5) dir += "north";
      else if (diffY / distance < -0.5) dir += "south";

      if (diffX / distance > 0.5) dir += "west";
      else if (diffX / distance < -0.5) dir += "east";

      if (!dir) dir = "south";

      setSprite(dir, frameCountRef.current);

      // Step towards cursor
      pet.x -= (diffX / distance) * speed;
      pet.y -= (diffY / distance) * speed;

      // Clamp within viewport
      pet.x = Math.max(halfSize, Math.min(pet.x, window.innerWidth - halfSize));
      pet.y = Math.max(halfSize, Math.min(pet.y, window.innerHeight - halfSize));

      if (petElRef.current) {
        petElRef.current.style.transform = `translate3d(${pet.x - halfSize}px, ${
          pet.y - halfSize
        }px, 0)`;
      }
    };

    const onFrame = (now) => {
      if (!lastTickTime) lastTickTime = now;
      if (now - lastTickTime >= FRAME_RATE_MS) {
        lastTickTime = now;
        updatePhysics();
      }
      animationFrameId = requestAnimationFrame(onFrame);
    };

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      hasMouseMovedRef.current = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mousePosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        hasMouseMovedRef.current = true;
      }
    };

    const handleResize = () => {
      const pet = petPosRef.current;
      pet.x = Math.max(halfSize, Math.min(pet.x, window.innerWidth - halfSize));
      pet.y = Math.max(halfSize, Math.min(pet.y, window.innerHeight - halfSize));
      if (petElRef.current) {
        petElRef.current.style.transform = `translate3d(${pet.x - halfSize}px, ${
          pet.y - halfSize
        }px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    animationFrameId = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [isEnabled, speed, mode, halfSize, handleIdle, setSprite]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Floating Pet Element */}
      <div
        ref={petElRef}
        role="button"
        tabIndex={0}
        aria-label="Playful Pet (Click to interact)"
        onClick={handlePetClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${petSize}px`,
          height: `${petSize}px`,
          zIndex: 999999,
          pointerEvents: "auto",
          cursor: "pointer",
          backgroundImage: `url(${spriteSrc})`,
          backgroundSize: `${256 * scale}px ${128 * scale}px`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          willChange: "transform",
          transition: "filter 0.15s ease",
          filter: isHovered
            ? "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25))"
            : "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12))",
        }}
        className="select-none outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white rounded-md"
      >
        {/* Subtle Hover Tooltip */}
        {isHovered && (
          <div
            className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap px-2 py-0.5 rounded-full bg-black/90 dark:bg-white text-white dark:text-black text-[10px] font-mono tracking-tight shadow-md flex items-center gap-1 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <span>Pet me!</span>
            <span className="text-pink-400 dark:text-pink-500">❤</span>
          </div>
        )}
      </div>

      {/* Floating Heart Burst Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: `${p.originX}px`,
            top: `${p.originY}px`,
            zIndex: 1000000,
            pointerEvents: "none",
            transform: `translate(calc(-50% + ${p.dx}px), calc(-50% + ${p.dy}px)) rotate(${p.rot}deg) scale(${p.scale})`,
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            fontSize: "16px",
            color: skin === "sakura" ? "#ec4899" : "#f43f5e",
            textShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
          className="animate-in fade-in zoom-in-50 duration-200"
        >
          ❤
        </div>
      ))}
    </>
  );
};

export default PlayfulPet;
