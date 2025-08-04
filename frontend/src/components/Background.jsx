import React from "react";
import BackgroundBG from "../assets/BackgroundBG.mp4";
const Background = () => {
  return (
    <div className="min-h-screen w-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="background-video w-full h-full object-cover"
      >
        <source src={BackgroundBG} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Background;
