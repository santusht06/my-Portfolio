import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import ScrollTextAnimationHome from "./ScrollTextAnimationHome";
import FAQCard from "./FAQCard";
import gsap from "gsap";

const FAQ = ({ scrollToContact }) => {
  const data = [
    {
      question: "What services do you offer?",
      answer:
        "I specialize in full-stack web development, UI/UX design, mobile application development, and backend architecture. My focus is on building clean, responsive, and scalable digital products tailored to your business needs.",
    },
    {
      question: "How do you typically work with clients?",
      answer:
        "I follow a collaborative, transparent approach. After understanding your requirements, I propose a structured timeline, share regular updates, and ensure each milestone is delivered with precision. Communication is key throughout the project lifecycle.",
    },
    {
      question: "Do you offer post-launch support or maintenance?",
      answer:
        "Yes, I offer flexible post-launch support packages that include bug fixes, performance monitoring, feature updates, and security enhancements to ensure your application stays optimized over time.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on scope and complexity. A standard portfolio website may take 2–3 weeks, while a fully-featured web or mobile app could span 4–8 weeks or more. I always provide a clear timeline estimate after discussing your project in detail.",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "I work with modern technologies including React, Next.js, Node.js, Tailwind CSS, MongoDB, Firebase, Express.js, and more. For mobile, I use React Native and Flutter, depending on the project requirements.",
    },
    {
      question: "How much do you charge for a project?",
      answer:
        "Pricing depends on the project's scope, features, and timeline. After an initial consultation, I provide a detailed proposal outlining the estimated cost. I aim to deliver high-value solutions within a fair and transparent pricing model.",
    },
    {
      question: "Can you work with my existing design or codebase?",
      answer:
        "Absolutely. I can integrate into ongoing projects, refactor existing code, or work alongside your in-house team to improve performance, scalability, or visual design.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply reach out through the contact form, or email me directly with a brief overview of your project. I’ll respond promptly to schedule a discovery call and guide you through the next steps.",
    },
  ];
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4); // instead of slice directly

  const handleToggleAll = () => {
    if (isOpen) {
      // Animate closing items (after index 3)
      const items = containerRef.current.querySelectorAll(".faq-item");
      const extraItems = Array.from(items).slice(4);

      gsap.to(extraItems, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          setVisibleCount(4); // hide after animation completes
          setIsOpen(false);
        },
      });
    } else {
      setVisibleCount(data.length); // show all immediately
      setIsOpen(true);
    }
  };

  // Animate on open (new items)
  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const items = containerRef.current.querySelectorAll(".faq-item");
      const newItems = Array.from(items).slice(4);

      gsap.fromTo(
        newItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [visibleCount]);

  return (
    <div className="w-[750px] mt-30 mb-30">
      <h1 className="text-start">
        <ScrollTextAnimationHome title={"FAQs"} stagger={0.05} />
      </h1>

      <div ref={containerRef}>
        {data.slice(0, visibleCount).map((item, idx) => (
          <div
            key={idx}
            className="faq-item"
            ref={(el) => (itemRefs.current[idx] = el)}
          >
            <FAQCard
              question={item.question}
              answer={item.answer}
              isActive={activeIndex === idx}
              onToggle={() => setActiveIndex(activeIndex === idx ? null : idx)}
            />
          </div>
        ))}
      </div>

      <div className="lg:w-[750px] w-[91vw] mt-3 flex items-center justify-between gap-3 lg:mt-5">
        <button
          className="text-md text-[#BBBBBB] cursor bg-[#111111] px-6 rounded-full font-MainLight py-1 transition-all duration-300 relative overflow-hidden h-10 w-[140px]"
          onClick={handleToggleAll}
        >
          <span
            key={isOpen ? "show-less" : "view-all"}
            className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out animate-fade-slide"
          >
            {isOpen ? "Show Less" : "View All"}
          </span>
        </button>

        <div className="text-left">
          <h1 className="text-[#BBBBBB] font-MainLight text-sm">
            Do you have any other questions?
          </h1>
          <h1
            onClick={scrollToContact}
            className="text-[#ffffffe0] font-MainLight underline text-sm hover:text-orange-500 transition-all ease-in-out duration-280 cursor-pointer"
          >
            Ask me directly
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
