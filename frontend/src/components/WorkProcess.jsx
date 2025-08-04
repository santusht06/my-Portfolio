import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ScrollTextAnimationHome from "./ScrollTextAnimationHome";
import WorkProcessCard from "./WorkProcessCard";
import { FaRegLightbulb } from "react-icons/fa";
import { BsClipboard2Check } from "react-icons/bs";
import { LiaPenNibSolid } from "react-icons/lia";
import { IoCogSharp } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { GoRocket } from "react-icons/go";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { useLenis } from "../utils/useLenis";

const WorkProcess = () => {
  const data = [
    {
      step: "01",
      title: "Idea Discovery",
      icon: <FaRegLightbulb />,
      subtitle: "Understanding the problem and identifying core user needs.",
    },
    {
      step: "02",
      title: "Requirement Analysis",
      icon: <BsClipboard2Check />,
      subtitle:
        "Define features, goals, and key technical constraints clearly.",
    },
    {
      step: "03",
      title: "UI/UX Design",
      icon: <LiaPenNibSolid />,
      subtitle:
        "Create intuitive, accessible interfaces with consistent user flow.",
    },
    {
      step: "04",
      title: "Tech Planning",
      icon: <IoCogSharp />,
      subtitle:
        "Choose stack, architecture, and define development milestones.",
    },
    {
      step: "05",
      title: "Code Development",
      icon: <FaCode />,
      subtitle: "Build scalable features using clean, modular code structures.",
    },
    {
      step: "06",
      title: "Testing Phase",
      icon: <MdErrorOutline />,
      subtitle: "Identify bugs and validate against all project requirements.",
    },
    {
      step: "07",
      title: "Deployment Stage",
      icon: <GoRocket />,
      subtitle: "Launch to production with CI/CD and versioning systems.",
    },
    {
      step: "08",
      title: "Feedback Loop",
      icon: <FiRefreshCcw />,
      subtitle: "Collect feedback and monitor performance post-deployment.",
    },
    {
      step: "09",
      title: "Maintenance Mode",
      icon: <HiOutlineWrenchScrewdriver />,
      subtitle:
        "Fix issues, update dependencies, and refine features continuously.",
    },
  ];

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1900, // 900ms for smoother scroll
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  return (
    <div className="w-full max-w-[750px]  mt-50 mb-20">
      <ScrollTextAnimationHome title={"Work Process"} stagger={0.05} />

      <Slider {...settings} key={data.length}>
        {data.map((item, idx) => (
          <div key={idx} className="lg:px-4 px-1 ">
            <WorkProcessCard
              title={item.title}
              icon={item.icon}
              subtitle={item.subtitle}
              steps={item.step}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WorkProcess;
