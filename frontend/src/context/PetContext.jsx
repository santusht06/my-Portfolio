import React, { createContext, useContext, useState, useEffect } from "react";

const PetContext = createContext(null);

export const PetProvider = ({ children }) => {
  // Load initial settings from localStorage with safe defaults
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("playful-pet-enabled");
    return saved !== null ? saved === "true" : true;
  });

  const [skin, setSkin] = useState(() => {
    if (typeof window === "undefined") return "classic";
    return localStorage.getItem("playful-pet-skin") || "classic";
  });

  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "followCursor";
    return localStorage.getItem("playful-pet-mode") || "followCursor";
  });

  const [speed, setSpeed] = useState(10);
  const [petSize, setPetSize] = useState(38);
  const [heartsCount, setHeartsCount] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("playful-pet-enabled", String(isEnabled));
    } catch {}
  }, [isEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem("playful-pet-skin", skin);
    } catch {}
  }, [skin]);

  useEffect(() => {
    try {
      localStorage.setItem("playful-pet-mode", mode);
    } catch {}
  }, [mode]);

  const togglePet = () => setIsEnabled((prev) => !prev);
  const incrementHearts = () => setHeartsCount((prev) => prev + 1);

  const spriteSrc =
    skin === "sakura" ? "/pets/neko-pink.png?v=2" : "/pets/neko-default.png";

  return (
    <PetContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
        togglePet,
        skin,
        setSkin,
        mode,
        setMode,
        speed,
        setSpeed,
        petSize,
        setPetSize,
        heartsCount,
        incrementHearts,
        spriteSrc,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePet must be used within a PetProvider");
  }
  return context;
};

export default PetContext;
