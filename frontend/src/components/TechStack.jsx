import React, { useRef, useEffect, useState, useCallback } from "react";
import xcode from "../assets/Pictures/xcode-8x.webp";
import AndriodStudio from "../assets/Pictures/andriodstudio.webp";
import react from "../assets/Pictures/react.webp";
import redis from "../assets/Pictures/redis-8x.webp";
import tailwindcss from "../assets/Pictures/tailwindcss-icon-8x.webp";
import nextjs from "../assets/Pictures/nextjs-original-8x.webp";
import postgres from "../assets/Pictures/postgresql-original-8x.webp";
import mongodb from "../assets/Pictures/mongodb-original-8x.webp";
import docker from "../assets/Pictures/docker-plain-8x.webp";
import redux from "../assets/Pictures/redux-8x.webp";
import git from "../assets/Pictures/git-original-8x.webp";
import TechStackCard from "./TechStackCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import figma from "../assets/Pictures/figma-original-8x.webp";
import ScrollTextAnimationHome from "./ScrollTextAnimationHome";
import Slider from "react-slick";

const TechStack = () => {
  // useLenis();

  const data = [
    // Add duplicates at the beginning for infinite scroll
    {
      image: figma,
      title: "Figma",
      subtitle: "Collaborative UI/UX design platform",
    },
    {
      image: redux,
      title: "Redux JS",
      subtitle: "State manager for React apps",
    },
    {
      image: docker,
      title: "Docker",
      subtitle: "Containerize apps for portability",
    },
    // Original data
    {
      image: xcode,
      title: "Xcode",
      subtitle: "iOS app development and testing",
    },
    {
      image: AndriodStudio,
      title: "Android Studio",
      subtitle: "Android apps with native tools",
    },
    {
      image: react,
      title: "React",
      subtitle: "Component-based frontend UI library",
    },
    {
      image: redis,
      title: "Redis",
      subtitle: "In-memory data store and cache",
    },
    {
      image: tailwindcss,
      title: "Tailwind CSS",
      subtitle: "Utility-first CSS styling framework",
    },
    {
      image: nextjs,
      title: "Next JS",
      subtitle: "React framework with SSR support",
    },
    {
      image: mongodb,
      title: "Mongo DB",
      subtitle: "Document-based NoSQL database system",
    },
    {
      image: git,
      title: "Git",
      subtitle: "Distributed Version Control System",
    },

    {
      image: postgres,
      title: "Postgres",
      subtitle: "Advanced open-source relational database",
    },
    {
      image: docker,
      title: "Docker",
      subtitle: "Containerize apps for portability",
    },
    {
      image: redux,
      title: "Redux JS",
      subtitle: "State manager for React apps",
    },
    {
      image: figma,
      title: "Figma",
      subtitle: "Collaborative UI/UX design platform",
    },
    {
      image: xcode,
      title: "Xcode",
      subtitle: "iOS app development and testing",
    },
    {
      image: AndriodStudio,
      title: "Android Studio",
      subtitle: "Android apps with native tools",
    },
    {
      image: react,
      title: "React",
      subtitle: "Component-based frontend UI library",
    },
  ];

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1900,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    pauseOnFocus: false,

    responsive: [
      {
        breakpoint: 1024, // for screens < 1024px
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1280, // for screens >= 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1536, // for 2K screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="lg:w-full h-fit lg:max-w-[750px] relative z-0 mb-40 flex flex-col mt-30   ">
      <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-MainLight text-white tracking-tight pt-10 mb-10">
        <ScrollTextAnimationHome title={"Tech Stack"} stagger={0.05} />
      </h1>

      <Slider {...settings}>
        {data.map((item, idx) => (
          <div
            key={idx}
            className="lg:w-[280px]   h-[310px] flex-shrink-0 px-4" // px-5 = spacing between cards
          >
            <TechStackCard
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TechStack;
