import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";
import {
  FaLinkedin,
  FaGithub as FaGithubBrand,
  FaGlobe,
} from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import {
  profileData,
  experiences,
  projects,
  achievements,
  blogs,
  developmentGears,
  personalItems,
} from "../data/portfolioData";
import QuoteCard from "../components/QuoteCard";
import Footer from "../components/Footer";
import DetailModal from "../components/DetailModal";
import TechStackPills from "../components/TechStackPills";
import animeAvatar from "../assets/Pictures/avatar-anime.webp";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "../components/ScrollReveal";
import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
} from "@/components/animate-ui/components/base/tooltip";
import SEOHead from "../components/SEOHead";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  selectBlogs,
  selectBlogsStatus,
} from "@/store/slices/blogsSlice";
import { HomeBlogSkeleton } from "@/components/BlogSkeleton";

const HomeView = () => {
  const dispatch = useDispatch();
  const allBlogs = useSelector(selectBlogs);
  const status = useSelector(selectBlogsStatus);
  const isLoading = status === "loading" && allBlogs.length === 0;
  const latestBlogs = allBlogs.slice(0, 4);

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

  const socialIcons = [
    {
      label: "GitHub",
      name: "GitHub",
      icon: FaGithubBrand,
      href: "https://github.com/santusht06",
    },
    {
      label: "LinkedIn",
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/santusht-kotai-8a4454323",
    },
    {
      label: "Website",
      name: "Portfolio",
      icon: FaGlobe,
      href: profileData.website,
    },
    {
      label: "Email",
      name: "Email",
      icon: MdOutlineMail,
      href: `mailto:${profileData.email}`,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead canonical="/" />

      {/* 1. Header & Summary (Matching Resume & Ramx Layout) */}
      <ScrollReveal delay={0.04} y={16}>
        <section className="mb-8 lg:mb-12">
          {/* Visual avatar and heading for desktop view; on mobile the Card directly above provides the avatar, signature, and name */}
          <div className="hidden lg:flex items-center gap-4 mb-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#909092]/25 dark:border-[#909092]/30 p-0.5 bg-white dark:bg-black shadow-md">
              <img
                src={animeAvatar}
                alt="Santusht Kotai, backend and distributed systems engineer (illustrated portrait)"
                width={64}
                height={64}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
                {profileData.name}
              </h1>
            </div>
          </div>

          {/* Accessible hidden H1 on mobile so SEO & heading hierarchy is maintained */}
          <h1 className="sr-only lg:hidden">{profileData.name} - Software Engineer & Systems Architect</h1>

          {/* Professional Summary */}
          <p className="text-xs sm:text-sm text-[#909092] dark:text-[#909092] mb-5 leading-relaxed text-justify">
            {profileData.summary}
          </p>

          {/* Social Icons Strip with animate-ui Tooltip - hidden on mobile as Card already provides social links */}
          <div className="hidden lg:flex items-center gap-3">
            {socialIcons.map((s) => {
              const Icon = s.icon;
              return (
                <Tooltip key={s.label} delayDuration={50}>
                  <TooltipTrigger
                    render={
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="text-[#909092] hover:text-black dark:text-[#909092] dark:hover:text-white transition-colors duration-150 motion-safe:active:scale-90 inline-flex items-center justify-center cursor-pointer p-1"
                      >
                        <Icon className="text-lg" />
                      </a>
                    }
                  />
                  <TooltipPanel side="top" sideOffset={8}>
                    <p className="font-semibold text-xs text-black">{s.name}</p>
                  </TooltipPanel>
                </Tooltip>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* 2. Production Experience Section */}
      <section className="mb-14">
        <ScrollReveal delay={0.04} y={14}>
          <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Experience
          </h2>
        </ScrollReveal>
        <ScrollRevealGroup className="space-y-4" stagger={0.09}>
          {experiences.map((exp, idx) => (
            <ScrollRevealItem key={idx}>
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.06] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.015] dark:hover-only:hover:bg-white/[0.035] transition-[border-color,background-color] duration-150 ease-smooth shadow-xs dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-black dark:text-white text-base group-hover:text-black dark:group-hover:text-white">
                      {exp.company}
                    </span>
                    {exp.status && (
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#909092] bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 px-2.5 py-0.5 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                        </span>
                        {exp.status}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#909092] mt-0.5 font-mono">
                    {exp.role}
                  </p>
                  <p className="text-xs text-[#909092] mt-2 max-w-xl line-clamp-2">
                    {exp.bullets[0]}
                  </p>
                </div>

                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="text-xs font-mono text-black dark:text-white">{exp.period}</p>
                  <p className="text-[11px] font-mono text-[#909092] mt-0.5">
                    {exp.location}
                  </p>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>

        <ScrollReveal delay={0.12} y={12}>
          <div className="mt-5 text-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-xs font-mono text-[#909092] hover:text-black dark:hover:text-white motion-safe:active:scale-[0.97] transition-[background-color,border-color,color,box-shadow] duration-150 ease-smooth group shadow-xs"
            >
              <span>Show all work experiences & achievements</span>
              <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-150 ease-smooth motion-reduce:transform-none text-[#909092] group-hover:text-black dark:group-hover:text-white" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Featured Systems Projects Section */}
      <section className="mb-14">
        <ScrollReveal delay={0.04} y={14}>
          <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Featured Systems Projects
          </h2>
        </ScrollReveal>
        <ScrollRevealGroup className="space-y-4" stagger={0.09}>
          {projects.map((proj, idx) => (
            <ScrollRevealItem key={idx}>
              <div className="p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.06] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.015] dark:hover-only:hover:bg-white/[0.035] transition-[border-color,background-color] duration-150 ease-smooth shadow-xs dark:shadow-none group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-base font-semibold text-black dark:text-white">
                    {proj.title}
                  </h3>
                  <span className="text-xs font-mono text-[#909092]">{proj.period}</span>
                </div>

                <div className="mb-3">
                  <Tooltip delayDuration={60}>
                    <TooltipTrigger
                      render={
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#909092] hover:text-black dark:hover:text-white motion-safe:active:scale-[0.97] transition-colors duration-150 ease-smooth group/link"
                        >
                          <FiGithub className="text-xs" />
                          <span>{proj.githubDisplay}</span>
                          <FiExternalLink className="text-[10px] group-hover/link:translate-x-0.5 transition-transform duration-150 ease-smooth motion-reduce:transform-none" />
                        </a>
                      }
                    />
                    <TooltipPanel side="top" sideOffset={6}>
                      <p className="font-semibold text-xs text-black">GitHub Repository</p>
                    </TooltipPanel>
                  </Tooltip>
                </div>

                <p className="text-xs sm:text-sm text-[#909092] leading-relaxed mb-3">
                  {proj.bullets[0]}
                </p>

                <div className="pt-1">
                  <TechStackPills technologies={proj.stack} />
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* 4. Leadership & Achievements Section */}
      <section className="mb-14">
        <ScrollReveal delay={0.04} y={14}>
          <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Leadership & Achievements
          </h2>
        </ScrollReveal>
        <ScrollRevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" stagger={0.08}>
          {achievements.slice(0, 4).map((ach, idx) => (
            <ScrollRevealItem key={idx} className="h-full">
              <div className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.06] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.015] dark:hover-only:hover:bg-white/[0.035] transition-[border-color,background-color] duration-150 ease-smooth flex flex-col justify-between shadow-xs dark:shadow-none group h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-semibold text-black dark:text-white text-xs sm:text-sm">
                      {ach.title}
                    </h3>
                    <span className="text-[10px] font-mono text-[#909092] bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 px-2 py-0.5 rounded-full flex-shrink-0">
                      {ach.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#909092] leading-relaxed line-clamp-3">
                    {ach.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#909092] mt-3">
                  {ach.org}
                </span>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* 5. Development Stack (Gears, Setup, Terminal) */}
      <section className="mb-14">
        <ScrollReveal delay={0.04} y={14}>
          <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Development & Systems
          </h2>
        </ScrollReveal>
        <ScrollRevealGroup className="space-y-3" stagger={0.08}>
          {developmentGears.map((dev) => (
            <ScrollRevealItem key={dev.title}>
              <div
                onClick={() =>
                  setModalData({
                    title: dev.title,
                    subtitle: dev.tagline,
                    items: dev.items,
                  })
                }
                className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.06] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.015] dark:hover-only:hover:bg-white/[0.045] motion-safe:active:scale-[0.98] transition-[border-color,background-color] duration-150 ease-smooth cursor-pointer group flex items-center justify-between shadow-xs dark:shadow-none"
              >
                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                    {dev.title}
                  </h3>
                  <p className="text-xs text-[#909092] mt-0.5">{dev.tagline}</p>
                </div>
                <FiArrowUpRight className="text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth text-sm" />
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* 6. Personal (Books, Interests) */}
      <section className="mb-14">
        <ScrollReveal delay={0.04} y={14}>
          <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Personal & Interests
          </h2>
        </ScrollReveal>
        <ScrollRevealGroup className="space-y-3" stagger={0.08}>
          {personalItems.map((item) => (
            <ScrollRevealItem key={item.title}>
              <div
                onClick={() =>
                  setModalData({
                    title: item.title,
                    subtitle: item.tagline,
                    items: item.items,
                  })
                }
                className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.06] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.015] dark:hover-only:hover:bg-white/[0.045] motion-safe:active:scale-[0.98] transition-[border-color,background-color] duration-150 ease-smooth cursor-pointer group flex items-center justify-between shadow-xs dark:shadow-none"
              >
                <div>
                  <h3 className="text-sm font-semibold text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#909092] mt-0.5">{item.tagline}</p>
                </div>
                <FiArrowUpRight className="text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth text-sm" />
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* 7. Latest engineering notes — internal links to the blog cluster */}
      <section className="mb-14" aria-labelledby="latest-notes-heading">
        <ScrollReveal delay={0.04} y={14}>
          <h2
            id="latest-notes-heading"
            className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 tracking-tight"
          >
            Latest Engineering Notes
          </h2>
        </ScrollReveal>
        {isLoading ? (
          <HomeBlogSkeleton count={3} />
        ) : (
          <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
            {latestBlogs.map((b) => (
              <li key={b.id}>
              <Link
                to={`/blog/${b.id}`}
                className="group flex items-start justify-between gap-4 py-4 px-3 -mx-3 rounded-xl hover-only:hover:bg-black/[0.03] dark:hover-only:hover:bg-white/[0.035] transition-colors duration-150"
              >
                <span>
                  <span className="block text-[11px] font-mono text-[#909092] mb-1">
                    {b.date} • {b.readTime || b.read_time || "5 min read"}
                  </span>
                  <span className="block text-sm sm:text-base font-semibold text-black dark:text-white leading-snug">
                    {b.title}
                  </span>
                  <span className="block text-xs sm:text-sm text-[#909092] mt-1 leading-relaxed">
                    {b.subtitle}
                  </span>
                </span>
                <FiArrowRight className="mt-5 flex-shrink-0 text-[#909092] group-hover:translate-x-1 group-hover:text-black dark:group-hover:text-white transition-transform duration-150 motion-reduce:transform-none" />
              </Link>
            </li>
          ))}
        </ul>
      )}
        <div className="mt-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#909092] hover:text-black dark:hover:text-white transition-colors duration-150 group"
          >
            <span>Read all engineering articles</span>
            <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-150 motion-reduce:transform-none" />
          </Link>
        </div>
      </section>

      {/* 8. Solo Leveling Quote Card */}
      <QuoteCard />

      {/* 8. Footer */}
      <Footer />

      {/* Detail Modal */}
      <DetailModal
        isOpen={Boolean(modalData)}
        onClose={() => setModalData(null)}
        {...modalData}
      />
    </div>
  );
};

export default HomeView;
