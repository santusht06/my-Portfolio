import React, { useState } from "react";
import Home from "./pages/Home";
import bg2 from "../src/assets/Pictures/bg2a.mp4";
import SmoothScroll from "./components/SmoothScroll";
import Loader from "./components/Loader";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative min-h-screen w-full ${isLoaded ? "overflow-x-hidden" : "max-h-screen overflow-hidden pointer-events-none select-none"}`}>
      {/* App Loader */}
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
        src={bg2}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Black overlay to darken the video */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[-1]" />

      {/* App content */}
      {isLoaded && <SmoothScroll />}
      <Home />
    </div>
  );
};

export default App;
