import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import TopNav from "./TopNav";
import CommandPalette from "./CommandPalette";
import PlayfulPet from "./PlayfulPet";

const PortfolioLayout = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const location = useLocation();

  // Reset scroll to top instantly on route change to keep transition silky smooth
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-black dark:text-white overflow-x-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-250">
      {/* Background ambient lighting - calibrated to theme neutral palette #909092 */}
      <div className="fixed inset-0 pointer-events-none z-0 dark:opacity-35 opacity-20 transition-opacity duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#909092]/15 dark:from-[#909092]/[0.08] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#909092]/[0.08] dark:from-[#909092]/[0.04] rounded-full blur-3xl"></div>
      </div>

      {/* Main Split Layout: Fixed Left on Desktop, Scrolling Right */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left Section: Fixed Sidebar on Desktop, only shown on Home view on mobile */}
        <aside
          className={`w-full lg:w-[430px] xl:w-[460px] lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-6 z-20 ${
            isHome
              ? "flex flex-col items-center pt-20 sm:pt-24 lg:pt-6 p-4 sm:p-6"
              : "hidden lg:flex"
          }`}
        >
          <Card onOpenCommand={() => setIsCommandOpen(true)} />
        </aside>

        {/* Right Section: Scrolling Content Area */}
        <main
          className={`w-full lg:ml-[430px] xl:ml-[460px] min-h-screen flex flex-col flex-1 pb-16 ${
            isHome ? "pt-4 sm:pt-8 lg:pt-20" : "pt-16 sm:pt-20"
          }`}
        >
          {/* Fixed Frosted Top Navigation Bar */}
          <TopNav onOpenCommand={() => setIsCommandOpen(true)} />

          {/* Active View Route Content with Smooth GPU Hardware Acceleration */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex-1 w-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Interactive Desktop Pet (Neko) cursor companion */}
      <PlayfulPet />

      {/* Global shadcn-style Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </div>
  );
};

export default PortfolioLayout;
