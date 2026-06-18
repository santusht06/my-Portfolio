import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  Suspense,
  lazy,
} from "react";
import { LuMenu } from "react-icons/lu";
import Experience from "./Experience";
import StatsSection from "./StatsSection";
import SlideBanner from "./SlideBanner";
import ScrollTextAnimationHome from "./ScrollTextAnimationHome";
import MyServices from "./MyServices";
import Menu from "./Menu";
import Aboutme from "./Aboutme";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Sidemenu from "./Sidemenu";
import WorkProcess from "./WorkProcess";

import gsap from "gsap";
import TechStack from "./TechStack";
gsap.registerPlugin(ScrollTrigger);

const Content = ({ contactRef }) => {
  const [isMobile, setIsMobile] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeMenu = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };
  const skillRefs = useRef([]);

  skillRefs.current = [];

  const addToRefs = useCallback((el) => {
    if (el && !skillRefs.current.includes(el)) {
      skillRefs.current.push(el);
    }
  }, []);
  const [time, setTime] = useState({ time: "", meridiem: "" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const meridiem = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;

      setTime({
        time: `${hours}:${minutes < 10 ? "0" + minutes : minutes}`,
        meridiem,
      });
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  useEffect(() => {
    skillRefs.current.forEach((el, index) => {
      if (!el) return;

      const from = { opacity: 0, y: isMobile ? 25 : 40 };

      const to = {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.2 : 0.7,
        ease: "power3.out",
        delay: isMobile ? index * 0.15 : index * 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      };

      gsap.fromTo(el, from, to);
    });
  }, [isMobile]);

  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 0, x: -100 });
      }
    });

    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onUpdate: (self) => {
          if (self.progress > 0.7 && itemRefs.current[index + 1]) {
            const nextEl = itemRefs.current[index + 1];
            if (!nextEl.dataset.animated) {
              animateElement(nextEl);
              nextEl.dataset.animated = "true";
            }
          }
        },
        onEnter: () => {
          if (!el.dataset.animated) {
            animateElement(el);
            el.dataset.animated = "true";
          }
        },
      });
    });

    function animateElement(el) {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, []);

  const timeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!timeRef.current) return;

    gsap.set(timeRef.current, { autoAlpha: 0, y: 30, scale: 0.97 });

    ScrollTrigger.create({
      trigger: timeRef.current,
      start: isMobile ? "top 90%" : "top 95%",
      once: true,
      onEnter: () => {
        gsap.to(timeRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  }, [isMobile]);

  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = {
    home: useRef(null),
    experience: useRef(null),
    selectedWork: useRef(null),
    services: useRef(null),
    about: useRef(null),
    techstack: useRef(null), // ✅ new ref
    testimonial: useRef(null),
    workprocess: useRef(null), // ✅ also separate this
    faq: useRef(null),
    contact: useRef(null),
  };

  const handleSectionClick = (section) => {
    closeMenu(); // hide menu
    setTimeout(() => {
      sectionRefs[section]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300); // wait for menu close animation
  };

  useEffect(() => {
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (!ref.current) return;

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(key),
        onEnterBack: () => setActiveSection(key),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToContact = () => {
    setActiveSection("contact");
    sectionRefs.contact?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full min-h-screen  ">
      <div className="mt-24 w-full flex justify-between items-center  ">
        <p
          ref={timeRef}
          className="text-start text-xl font-MainLight text-[#BBBBBB]"
        >
          Indore, India&nbsp;
          <span>{time.time}</span>
          <span className="ml-2 tracking-widest uppercase ">
            {time.meridiem}
          </span>
        </p>
        <div
          className={`
    ${isMobile ? "fixed top-6 right-6 z-50" : "relative"}
    block md:block
  `}
        >
          <div
            className="w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center text-2xl cursor-pointer hover:bg-[#F3500F] hover:text-white transition-all ease-in-out duration-300"
            onClick={openMenu}
          >
            <LuMenu />
          </div>

          {isOpen && (
            <Menu
              isVisible={isVisible}
              onClose={closeMenu}
              onSectionClick={handleSectionClick}
            />
          )}
        </div>
      </div>

      <Sidemenu
        onSectionClick={handleSectionClick}
        activeSection={activeSection}
      />

      {/* introduction */}

      <div className=" h-100 flex flex-col justify-start gap-10      ">
        <div className="mt-21 flex justify-start items-center gap-3    ">
          <div className="h-[5px] w-[5px] bg-[#777777]  rounded-full "></div>
          <div className="text-[#777777] font-MainLight text-[18px]   ">
            Introduction
          </div>
        </div>

        <ScrollTextAnimationHome
          title={"Empowering Innovation for Scalable Solutions."}
          scrub={false}
          textSize={44}
          as="h1"
        />

        <div className="text-[#777777] font-MainLight text-md lg:w-[750px]  tracking-tight  ">
          <p>
            I design and develop clean, scalable digital interfaces that
            translate complex requirements into intuitive, high-performance user
            experiences—driven by clarity, precision, and usability.
          </p>
        </div>
      </div>

      <div className="w-[50vw] lg:max-w-xl  flex  gap-2 lg:gap-2  mt-10 lg:mt-23  flex-wrap mb-10     ">
        {[
          "Frontend Development",
          "Backend Development",
          "SEO",
          "Database Design",
          "Cloud System Design",
        ].map((text, idx) => (
          <div
            key={text}
            ref={(el) => addToRefs(el)}
            className="px-5 py-2 bg-[#111111] backdrop-blur-sm text-[#BBBBBB] w-fit rounded-full font-MainLight hover:bg-white hover:text-[#111111] transition-all ease-in-out duration-300 cursor-pointer"
          >
            {text}
          </div>
        ))}
      </div>
      <div ref={sectionRefs.home}>
        <StatsSection />
      </div>
      <div ref={sectionRefs.experience}>
        <Experience />
      </div>
      <div ref={sectionRefs.selectedWork}>
        <SlideBanner scrollToContact={scrollToContact} />
      </div>
      <div ref={sectionRefs.services}>
        <MyServices scrollToContact={scrollToContact} />
      </div>
      <div ref={sectionRefs.about}>
        <Aboutme />
      </div>
      <div ref={sectionRefs.techstack}>
        <TechStack />
      </div>

      <div ref={sectionRefs.testimonial}>
        <Testimonial />
      </div>

      <div ref={sectionRefs.workprocess}>
        <WorkProcess />
      </div>

      <div ref={sectionRefs.faq}>
        <FAQ scrollToContact={scrollToContact} />
      </div>
      <div ref={sectionRefs.contact}>
        <Contact ref={contactRef} />
      </div>
    </div>
  );
};

export default Content;
