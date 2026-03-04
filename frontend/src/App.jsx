import React from "react";
import Home from "./pages/Home";
import bg2 from "../src/assets/Pictures/bg2a.mp4";
import SmoothScroll from "./components/SmoothScroll";
const App = () => {
  // useLenis();
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
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
      <SmoothScroll />
      <Home />
    </div>
  );
};

export default App;
