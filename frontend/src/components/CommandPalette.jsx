import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHome,
  FiBriefcase,
  FiBookOpen,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCheck,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import {
  Dialog,
  DialogPanel,
} from "@/components/animate-ui/components/headless/dialog";
import { blogs, experiences, projects, profileData } from "../data/portfolioData";

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose(false);
        else onClose(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose(false);
    }, 1200);
  };

  const handleNavigate = (path) => {
    navigate(path);
    onClose(false);
  };

  const navItems = [
    { label: "Home", path: "/", icon: FiHome, category: "Navigation" },
    { label: "Work & Experience", path: "/work", icon: FiBriefcase, category: "Navigation" },
    { label: "Blog & Articles", path: "/blog", icon: FiBookOpen, category: "Navigation" },
    { label: "Resume", path: "/resume", icon: FiFileText, category: "Navigation" },
    { label: "Contact", path: "/contact", icon: FiMail, category: "Navigation" },
  ];

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const filteredExperiences = experiences.filter(
    (e) =>
      e.company.toLowerCase().includes(query.toLowerCase()) ||
      e.role.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={() => onClose(false)}
      initialFocus={inputRef}
    >
      <DialogPanel
        from="top"
        showCloseButton={false}
        containerClassName="items-start pt-16 sm:pt-24"
        className="w-full max-w-xl p-0 overflow-hidden bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-black">
          <FiSearch className="text-[#909092] text-lg flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search articles, work, links..."
            className="w-full bg-transparent text-sm text-black dark:text-white placeholder-[#909092] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-[#909092] hover:text-black dark:hover:text-white p-1 cursor-pointer motion-safe:active:scale-[0.95] transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none"
            >
              <FiX className="text-sm" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#909092] bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {/* Quick Navigation */}
          <div className="py-1">
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover-only:hover:translate-x-0.5 motion-safe:active:scale-[0.98] transition-[background-color,color,transform] duration-150 ease-smooth motion-reduce:transition-none motion-reduce:transform-none group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs font-mono text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none">
                    Jump ↵
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="py-1">
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
              Quick Actions & Links
            </div>
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover-only:hover:translate-x-0.5 motion-safe:active:scale-[0.98] transition-[background-color,color,transform] duration-150 ease-smooth motion-reduce:transition-none motion-reduce:transform-none group text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {copied ? (
                  <FiCheck className="text-black dark:text-white motion-safe:scale-110 transition-transform duration-150 ease-out-fluid" />
                ) : (
                  <FiMail className="text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none" />
                )}
                <span>{copied ? "Copied Email to Clipboard!" : `Copy Email (${profileData.email})`}</span>
              </div>
              <span className="text-xs font-mono text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none">
                {copied ? "Copied" : "Action"}
              </span>
            </button>

            <a
              href="/Santusht_Kotai_Resume.pdf"
              download="Santusht_Kotai_Resume.pdf"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover-only:hover:translate-x-0.5 motion-safe:active:scale-[0.98] transition-[background-color,color,transform] duration-150 ease-smooth motion-reduce:transition-none motion-reduce:transform-none group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <FiFileText className="text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none" />
                <span>Download Resume (PDF)</span>
              </div>
              <span className="text-xs font-mono text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none">
                Save PDF ↓
              </span>
            </a>

            <a
              href="https://github.com/santusht06"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover-only:hover:translate-x-0.5 motion-safe:active:scale-[0.98] transition-[background-color,color,transform] duration-150 ease-smooth motion-reduce:transition-none motion-reduce:transform-none group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <FiGithub className="text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none" />
                <span>GitHub Profile</span>
              </div>
              <FiExternalLink className="text-xs text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none" />
            </a>

            <a
              href="https://www.linkedin.com/in/santusht-kotai-8a4454323"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover-only:hover:translate-x-0.5 motion-safe:active:scale-[0.98] transition-[background-color,color,transform] duration-150 ease-smooth motion-reduce:transition-none motion-reduce:transform-none group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <FiLinkedin className="text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none" />
                <span>LinkedIn Profile</span>
              </div>
              <FiExternalLink className="text-xs text-[#909092] group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none" />
            </a>
          </div>

          {/* Work Experiences */}
          {filteredExperiences.length > 0 && (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
                Work Experience
              </div>
              {filteredExperiences.slice(0, 3).map((exp) => (
                <button
                  key={exp.company}
                  onClick={() => handleNavigate("/work")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover-only:hover:translate-x-0.5 motion-safe:active:scale-[0.98] transition-[background-color,color,transform] duration-150 ease-smooth motion-reduce:transition-none motion-reduce:transform-none group text-left cursor-pointer"
                >
                  <div>
                    <span className="font-medium text-black dark:text-white">{exp.company}</span>
                    <span className="text-xs text-[#909092] ml-2">({exp.role})</span>
                  </div>
                  <span className="text-xs text-[#909092] font-mono group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none">{exp.period.split("–")[0]}</span>
                </button>
              ))}
            </div>
          )}

          {/* Featured Projects */}
          {filteredProjects.length > 0 && (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
                Systems Projects
              </div>
              {filteredProjects.map((proj) => (
                <button
                  key={proj.title}
                  onClick={() => handleNavigate("/work")}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover-only:hover:translate-x-0.5 motion-safe:active:scale-[0.98] transition-[background-color,color,transform] duration-150 ease-smooth motion-reduce:transition-none motion-reduce:transform-none group text-left cursor-pointer"
                >
                  <div className="truncate pr-3">
                    <span className="font-medium text-black dark:text-white truncate block">
                      {proj.title}
                    </span>
                    <span className="text-[11px] text-[#909092] font-mono truncate block">
                      {proj.stack.slice(0, 4).join(", ")}
                    </span>
                  </div>
                  <span className="text-xs text-[#909092] group-hover:text-black dark:group-hover:text-white font-mono flex-shrink-0 group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none">
                    View
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Blog Articles */}
          {filteredBlogs.length > 0 && (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
                Blog Posts
              </div>
              {filteredBlogs.slice(0, 4).map((post) => (
                <button
                  key={post.id}
                  onClick={() => handleNavigate(`/blog/${post.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover-only:hover:translate-x-0.5 motion-safe:active:scale-[0.98] transition-[background-color,color,transform] duration-150 ease-smooth motion-reduce:transition-none motion-reduce:transform-none group text-left cursor-pointer"
                >
                  <div className="truncate pr-4">
                    <span className="font-medium text-black dark:text-white truncate block">
                      {post.title}
                    </span>
                    <span className="text-xs text-[#909092] truncate block">
                      {post.subtitle}
                    </span>
                  </div>
                  <span className="text-xs text-[#909092] font-mono flex-shrink-0 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-[color,transform] duration-150 ease-smooth motion-reduce:transform-none">
                    {post.date.split(",")[0]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-white dark:bg-black border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-[#909092] font-mono">
          <span>Navigate with arrow keys or click</span>
          <span>Press ESC to close</span>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CommandPalette;
