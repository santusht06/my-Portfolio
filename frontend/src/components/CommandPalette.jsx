import React, { useState, useEffect, useRef, useMemo } from "react";
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
  FiCornerDownLeft,
} from "react-icons/fi";
import {
  Dialog,
  DialogPanel,
} from "@/components/animate-ui/components/headless/dialog";
import { experiences, projects, profileData } from "../data/portfolioData";
import { usePet } from "@/context/PetContext";
import { useSelector, useDispatch } from "react-redux";
import { selectBlogs, fetchBlogs } from "@/store/slices/blogsSlice";

export const CommandPalette = ({ isOpen, onClose }) => {
  const { isEnabled, togglePet, skin, setSkin, mode, setMode } = usePet();
  const dispatch = useDispatch();
  const allBlogs = useSelector(selectBlogs);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const selectedItemRef = useRef(null);
  const navigate = useNavigate();

  // Reset query, load dynamic blogs, and focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);

      if (allBlogs.length === 0) {
        dispatch(fetchBlogs());
      }

      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen, allBlogs.length, dispatch]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 900);
  };

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  // 1. Navigation items
  const navItems = useMemo(
    () => [
      { id: "nav-home", label: "Home", path: "/", icon: FiHome, category: "Navigation" },
      { id: "nav-work", label: "Work & Experience", path: "/work", icon: FiBriefcase, category: "Navigation" },
      { id: "nav-blog", label: "Blog & Articles", path: "/blog", icon: FiBookOpen, category: "Navigation" },
      { id: "nav-resume", label: "Resume", path: "/resume", icon: FiFileText, category: "Navigation" },
      { id: "nav-contact", label: "Contact", path: "/contact", icon: FiMail, category: "Navigation" },
    ],
    []
  );

  const filteredNavItems = useMemo(() => {
    if (!query) return navItems;
    const q = query.toLowerCase();
    return navItems.filter(
      (item) => item.label.toLowerCase().includes(q) || item.path.toLowerCase().includes(q)
    );
  }, [navItems, query]);

  // 2. Quick actions & links
  const quickActions = useMemo(() => {
    return [
      {
        id: "act-copy-email",
        label: copied ? "Copied Email to Clipboard!" : `Copy Email (${profileData.email})`,
        action: handleCopyEmail,
        icon: copied ? FiCheck : FiMail,
        badge: copied ? "Copied" : "Action",
      },
      {
        id: "act-resume",
        label: "Download Resume (PDF)",
        action: () => {
          const a = document.createElement("a");
          a.href = "/Santusht_Kotai_Resume.pdf";
          a.download = "Santusht_Kotai_Resume.pdf";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          onClose();
        },
        icon: FiFileText,
        badge: "Download",
      },
      {
        id: "act-github",
        label: "GitHub Profile (santusht06)",
        action: () => {
          window.open("https://github.com/santusht06", "_blank", "noopener,noreferrer");
          onClose();
        },
        icon: FiGithub,
        isExternal: true,
      },
      {
        id: "act-linkedin",
        label: "LinkedIn Profile",
        action: () => {
          window.open("https://www.linkedin.com/in/santusht-kotai-8a4454323", "_blank", "noopener,noreferrer");
          onClose();
        },
        icon: FiLinkedin,
        isExternal: true,
      },
    ];
  }, [copied, onClose]);

  const filteredQuickActions = useMemo(() => {
    if (!query) return quickActions;
    const q = query.toLowerCase();
    return quickActions.filter(
      (act) => act.label.toLowerCase().includes(q) || act.id.toLowerCase().includes(q)
    );
  }, [quickActions, query]);

  // 3. Playful Pet Commands
  const petCommands = useMemo(() => {
    return [
      {
        id: "pet-toggle",
        label: isEnabled ? "Disable Playful Pet" : "Enable Playful Pet",
        sublabel: isEnabled ? "Put Neko to sleep" : "Wake Neko up",
        emoji: "🐱",
        action: () => {
          togglePet();
          onClose();
        },
        badge: isEnabled ? "Turn Off" : "Turn On",
      },
      {
        id: "pet-skin",
        label: `Switch Skin: ${skin === "classic" ? "Sakura Pink" : "Classic White"}`,
        sublabel: skin === "classic" ? "Switch to cherry blossom pink" : "Switch to monochrome white",
        emoji: "🌸",
        action: () => {
          setSkin(skin === "classic" ? "sakura" : "classic");
          onClose();
        },
        badge: "Toggle Skin",
      },
      {
        id: "pet-mode",
        label: `Cycle Behavior: ${
          mode === "followCursor"
            ? "Follow Cursor"
            : mode === "runAway"
            ? "Shy (Run Away)"
            : "Nap (Sleep)"
        }`,
        sublabel: "Change interactive cursor physics",
        emoji: "🐾",
        action: () => {
          const nextMode =
            mode === "followCursor"
              ? "runAway"
              : mode === "runAway"
              ? "nap"
              : "followCursor";
          setMode(nextMode);
          onClose();
        },
        badge: "Cycle Mode",
      },
    ];
  }, [isEnabled, skin, mode, togglePet, setSkin, setMode, onClose]);

  const filteredPetCommands = useMemo(() => {
    if (!query) return petCommands;
    const q = query.toLowerCase();
    const matchesPetGeneral = ["pet", "neko", "cat", "companion", "cursor"].some((k) =>
      q.includes(k)
    );
    if (matchesPetGeneral) return petCommands;
    return petCommands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.sublabel.toLowerCase().includes(q) ||
        cmd.id.toLowerCase().includes(q)
    );
  }, [petCommands, query]);

  // 4. Experiences
  const filteredExperiences = useMemo(() => {
    if (!query) return experiences.slice(0, 3);
    const q = query.toLowerCase();
    return experiences.filter(
      (e) =>
        e.company.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q))
    );
  }, [query]);

  // 5. Projects
  const filteredProjects = useMemo(() => {
    if (!query) return projects.slice(0, 4);
    const q = query.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.stack?.some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  // 6. Blog Posts
  const filteredBlogs = useMemo(() => {
    if (!query) return allBlogs.slice(0, 4);
    const q = query.toLowerCase();
    return allBlogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.subtitle?.toLowerCase().includes(q) ||
        (Array.isArray(b.categories) && b.categories.some((c) => c.toLowerCase().includes(q))) ||
        (Array.isArray(b.tags) && b.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [allBlogs, query]);

  // Flattened list for unified keyboard navigation (Arrow Up/Down, Enter)
  const flatItems = useMemo(() => {
    const items = [];

    // Navigation
    filteredNavItems.forEach((nav) => {
      items.push({
        id: nav.id,
        onSelect: () => handleNavigate(nav.path),
      });
    });

    // Quick Actions
    filteredQuickActions.forEach((act) => {
      items.push({
        id: act.id,
        onSelect: act.action,
      });
    });

    // Pet Commands
    filteredPetCommands.forEach((cmd) => {
      items.push({
        id: cmd.id,
        onSelect: cmd.action,
      });
    });

    // Experiences
    filteredExperiences.forEach((exp) => {
      items.push({
        id: `exp-${exp.company}`,
        onSelect: () => handleNavigate("/work"),
      });
    });

    // Projects
    filteredProjects.forEach((proj) => {
      items.push({
        id: `proj-${proj.title}`,
        onSelect: () => handleNavigate("/work"),
      });
    });

    // Blogs
    filteredBlogs.forEach((post) => {
      items.push({
        id: `blog-${post.id}`,
        onSelect: () => handleNavigate(`/blog/${post.id}`),
      });
    });

    return items;
  }, [
    filteredNavItems,
    filteredQuickActions,
    filteredPetCommands,
    filteredExperiences,
    filteredProjects,
    filteredBlogs,
  ]);

  // Clamp selectedIndex when items list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation listener (ArrowUp, ArrowDown, Enter, Esc, Cmd+K)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Toggle / Close on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (flatItems.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flatItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatItems[selectedIndex]) {
          flatItems[selectedIndex].onSelect();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, onClose]);

  let currentItemIndex = 0;

  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={() => onClose()}
      initialFocus={inputRef}
    >
      <DialogPanel
        from="top"
        showCloseButton={false}
        containerClassName="items-start pt-16 sm:pt-24"
        className="w-full max-w-xl p-0 overflow-hidden bg-white dark:bg-black border border-black/10 dark:border-white/15 rounded-2xl shadow-2xl flex flex-col"
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
              aria-label="Clear search query"
              className="text-[#909092] hover:text-black dark:hover:text-white p-1 cursor-pointer motion-safe:active:scale-[0.95] transition-colors"
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
        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-black/[0.04] dark:divide-white/[0.04]"
        >
          {flatItems.length === 0 ? (
            <div className="py-12 px-6 text-center select-none">
              <div className="inline-flex items-center justify-center size-9 rounded-full bg-black/5 dark:bg-white/5 mb-3 text-[#909092]">
                <FiSearch className="size-4" />
              </div>
              <p className="text-sm font-medium text-black dark:text-white">
                No results found for <span className="font-mono text-[#909092]">"{query}"</span>
              </p>
              <p className="text-xs text-[#909092] mt-1.5">
                Try searching for blog posts, projects, Redis, Docker, or commands.
              </p>
            </div>
          ) : (
            <>
              {/* Quick Navigation */}
              {filteredNavItems.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
                    Navigation
                  </div>
                  {filteredNavItems.map((item) => {
                    const idx = currentItemIndex++;
                    const isSelected = idx === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        ref={isSelected ? selectedItemRef : null}
                        onClick={() => handleNavigate(item.path)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-100 text-left cursor-pointer ${
                          isSelected
                            ? "bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white font-medium"
                            : "text-black/80 dark:text-white/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`text-base transition-colors ${
                              isSelected ? "text-black dark:text-white" : "text-[#909092]"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                        <span
                          className={`text-xs font-mono transition-opacity flex items-center gap-1 ${
                            isSelected ? "opacity-100 text-black dark:text-white" : "opacity-0 text-[#909092]"
                          }`}
                        >
                          Jump <FiCornerDownLeft className="text-[10px]" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Quick Actions & Links */}
              {filteredQuickActions.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
                    Quick Actions & Links
                  </div>
                  {filteredQuickActions.map((act) => {
                    const idx = currentItemIndex++;
                    const isSelected = idx === selectedIndex;
                    const Icon = act.icon;
                    return (
                      <button
                        key={act.id}
                        ref={isSelected ? selectedItemRef : null}
                        onClick={act.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-100 text-left cursor-pointer ${
                          isSelected
                            ? "bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white font-medium"
                            : "text-black/80 dark:text-white/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`text-base transition-colors ${
                              isSelected ? "text-black dark:text-white" : "text-[#909092]"
                            }`}
                          />
                          <span>{act.label}</span>
                        </div>
                        {act.isExternal ? (
                          <FiExternalLink
                            className={`text-xs ${
                              isSelected ? "text-black dark:text-white" : "text-[#909092]"
                            }`}
                          />
                        ) : (
                          <span
                            className={`text-xs font-mono ${
                              isSelected ? "text-black dark:text-white" : "text-[#909092]"
                            }`}
                          >
                            {act.badge || "Action"}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Playful Pet Controls */}
              {filteredPetCommands.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092] flex items-center justify-between">
                    <span>Playful Pet (Neko Companion)</span>
                    <span className="text-[10px]">{isEnabled ? "Active" : "Sleeping"}</span>
                  </div>
                  {filteredPetCommands.map((cmd) => {
                    const idx = currentItemIndex++;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={cmd.id}
                        ref={isSelected ? selectedItemRef : null}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-100 text-left cursor-pointer ${
                          isSelected
                            ? "bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white font-medium"
                            : "text-black/80 dark:text-white/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{cmd.emoji}</span>
                          <div>
                            <div>{cmd.label}</div>
                            <div className="text-[11px] text-[#909092] font-mono">{cmd.sublabel}</div>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-mono ${
                            isSelected ? "text-black dark:text-white" : "text-[#909092]"
                          }`}
                        >
                          {cmd.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Work Experience */}
              {filteredExperiences.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
                    Work Experience
                  </div>
                  {filteredExperiences.map((exp) => {
                    const idx = currentItemIndex++;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={`exp-${exp.company}`}
                        ref={isSelected ? selectedItemRef : null}
                        onClick={() => handleNavigate("/work")}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-100 text-left cursor-pointer ${
                          isSelected
                            ? "bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white font-medium"
                            : "text-black/80 dark:text-white/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                        }`}
                      >
                        <div>
                          <span className="font-medium">{exp.company}</span>
                          <span className="text-xs text-[#909092] ml-2">({exp.role})</span>
                        </div>
                        <span className="text-xs text-[#909092] font-mono">
                          {exp.period.split("–")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Featured Projects */}
              {filteredProjects.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
                    Systems Projects
                  </div>
                  {filteredProjects.map((proj) => {
                    const idx = currentItemIndex++;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={`proj-${proj.title}`}
                        ref={isSelected ? selectedItemRef : null}
                        onClick={() => handleNavigate("/work")}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-100 text-left cursor-pointer ${
                          isSelected
                            ? "bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white font-medium"
                            : "text-black/80 dark:text-white/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="truncate pr-3">
                          <span className="font-medium truncate block">{proj.title}</span>
                          <span className="text-[11px] text-[#909092] font-mono truncate block">
                            {proj.stack?.slice(0, 4).join(", ")}
                          </span>
                        </div>
                        <span className="text-xs text-[#909092] font-mono flex-shrink-0">
                          View ↵
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Blog Posts */}
              {filteredBlogs.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#909092]">
                    Blog Posts
                  </div>
                  {filteredBlogs.map((post) => {
                    const idx = currentItemIndex++;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={`blog-${post.id}`}
                        ref={isSelected ? selectedItemRef : null}
                        onClick={() => handleNavigate(`/blog/${post.id}`)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-100 text-left cursor-pointer ${
                          isSelected
                            ? "bg-black/[0.06] dark:bg-white/[0.08] text-black dark:text-white font-medium"
                            : "text-black/80 dark:text-white/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="truncate pr-4">
                          <span className="font-medium truncate block">{post.title}</span>
                          <span className="text-xs text-[#909092] truncate block">
                            {post.subtitle}
                          </span>
                        </div>
                        <span className="text-xs text-[#909092] font-mono flex-shrink-0">
                          {post.date?.split(",")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-white dark:bg-black border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-[#909092] font-mono select-none">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>·</span>
            <span>↵ Select</span>
          </div>
          <span>ESC to close</span>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CommandPalette;
