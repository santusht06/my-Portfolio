import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 9, // longer = more inertia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
      gestureDirection: "horizontal",
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => lenis.raf);
    };
  }, []);
};
