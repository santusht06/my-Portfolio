import React, { useRef } from "react";
import Card from "../components/Card";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Home = () => {
  const contactRef = useRef(null);

  const handleGetStarted = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div className="w-screen h-fit  flex flex-col lg:flex-row  ">
        {/* Fixed Sidebar Card */}
        <div className=" md:flex Tablets    px-0 lg:fixed left-0 top-0 z-10 w-[480px] h-full justify-center items-center lg:px-8 md:px-7   mobile-center ">
          <Card onGetStarted={handleGetStarted} />
        </div>

        {/* Main Content */}
        <div className="w-full h-full px-5 lg:px-5  md:px-5 ml-mac ml-monitor  ">
          <Content contactRef={contactRef} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
