import React from "react";
import { experiences, achievements, projects } from "../data/portfolioData";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Footer from "../components/Footer";
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
import TechStackPills from "../components/TechStackPills";

const WorkView = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Engineering Experience & Projects | Santusht Kotai"
        description="Explore production backend engineering, distributed architectures, AWS microservices, and Supabase open-source contributions by Santusht Kotai."
        canonical="/work"
        keywords="Backend Engineer, Systems Architecture, FastAPI, Distributed Systems, Microservices, Supabase GSoC, AWS, Docker, Kubernetes"
      />
      {/* Header */}
      <ScrollReveal delay={0.04} y={16}>
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight mb-2">
            Engineering & Experience
          </h1>
          <p className="text-sm sm:text-base text-[#909092]">
            Production systems, distributed architectures, open-source work, and key milestones.
          </p>
        </div>
      </ScrollReveal>

      {/* 1. Production Experience */}
      <section className="mb-14 space-y-8">
        <ScrollReveal delay={0.04} y={14}>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#909092]">
            Work Experience
          </h2>
        </ScrollReveal>

        <ScrollRevealGroup className="space-y-8" stagger={0.09}>
          {experiences.map((exp, idx) => (
            <ScrollRevealItem key={idx}>
              <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.06] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.015] dark:hover-only:hover:bg-white/[0.035] transition-[border-color,background-color] duration-150 ease-smooth shadow-xs dark:shadow-none group">
                {/* Top row: Company & Dates */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                        {exp.company}
                      </h3>
                      {exp.status && (
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#909092] bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 px-2.5 py-0.5 rounded-full">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                          </span>
                          {exp.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#909092] mt-0.5 font-mono">{exp.role}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs font-mono text-black dark:text-white">{exp.period}</p>
                    <p className="text-xs font-mono text-[#909092] mt-0.5">
                      {exp.location}
                    </p>
                  </div>
                </div>

                {/* Technologies & Tools */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#909092] mb-2.5">
                      Technologies & Tools
                    </h4>
                    <TechStackPills technologies={exp.technologies} />
                  </div>
                )}

                {/* Bullets */}
                {exp.bullets && exp.bullets.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#909092] mb-2.5">
                      What I've Done
                    </h4>
                    <ul className="space-y-2">
                      {exp.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
                        >
                          <span className="text-[#909092] mt-1 select-none">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* 2. Key Systems Projects */}
      <section className="mb-14 space-y-6">
        <ScrollReveal delay={0.04} y={14}>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#909092]">
            Featured Systems Projects
          </h2>
        </ScrollReveal>

        <ScrollRevealGroup className="space-y-6" stagger={0.09}>
          {projects.map((proj, idx) => (
            <ScrollRevealItem key={idx}>
              <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.06] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.015] dark:hover-only:hover:bg-white/[0.035] transition-[border-color,background-color] duration-150 ease-smooth shadow-xs dark:shadow-none group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white group-hover:text-black dark:group-hover:text-white">
                      {proj.title}
                    </h3>
                    <Tooltip delayDuration={80}>
                      <TooltipTrigger
                        render={
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#909092] hover:text-black dark:hover:text-white motion-safe:active:scale-[0.97] transition-colors duration-150 ease-smooth mt-1 group/link"
                          >
                            <FiGithub className="text-sm" />
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
                  <span className="text-xs font-mono text-[#909092]">{proj.period}</span>
                </div>

                {/* Stack */}
                <div className="mb-4">
                  <TechStackPills technologies={proj.stack} />
                </div>

                {/* Bullets */}
                <ul className="space-y-2">
                  {proj.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
                    >
                      <span className="text-[#909092] mt-1 select-none">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* 3. Leadership, Open Source & Achievements */}
      <section className="mb-14 space-y-6">
        <ScrollReveal delay={0.04} y={14}>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#909092]">
            Leadership, Open Source & Achievements
          </h2>
        </ScrollReveal>

        <ScrollRevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.08}>
          {achievements.map((ach, idx) => (
            <ScrollRevealItem key={idx} className="h-full">
              <div className="p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.06] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/15 hover-only:hover:bg-black/[0.015] dark:hover-only:hover:bg-white/[0.035] transition-[border-color,background-color] duration-150 ease-smooth flex flex-col justify-between shadow-xs dark:shadow-none group h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-black dark:text-white text-sm">
                      {ach.title}
                    </h3>
                    <span className="text-[10px] font-mono text-[#909092] bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 px-2 py-0.5 rounded-full flex-shrink-0">
                      {ach.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#909092] leading-relaxed">
                    {ach.description}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#909092] mt-4">
                  Org: {ach.org}
                </span>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WorkView;
