import React, { useState } from "react";
import Home from "./pages/Home";
import SmoothScroll from "./components/SmoothScroll";
import Loader from "./components/Loader";
import Galaxy from "./components/Galaxy";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative min-h-screen w-full ${isLoaded ? "overflow-x-hidden" : "max-h-screen overflow-hidden pointer-events-none select-none"}`}>
      {/* App Loader (Stays mounted; GSAP sets display:none on completion without React DOM unmount flash) */}
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Background: Galaxy */}
      <div className="fixed top-0 left-0 w-full h-full z-[-2] pointer-events-none bg-black">
        <Galaxy
          starSpeed={0.2}
          density={3}
          hueShift={140}
          speed={1}
          glowIntensity={0.25}
          saturation={0}
          mouseRepulsion
          repulsionStrength={2}
          twinkleIntensity={0.2}
          rotationSpeed={0.1}
          transparent
        />
      </div>

      {/* Background overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-[-1] pointer-events-none" />

      {/* App content */}
      <SmoothScroll />
      <Home />
    </div>
  );
};

export default App;
