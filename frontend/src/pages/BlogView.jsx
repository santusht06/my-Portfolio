import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import { blogs } from "../data/portfolioData";
import Footer from "../components/Footer";
import DetailModal from "../components/DetailModal";
import SEOHead from "../components/SEOHead";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "../components/ScrollReveal";
import {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanels,
  TabsPanel,
} from "@/components/animate-ui/components/base/tabs";

const BlogView = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [blogList, setBlogList] = useState(blogs);
  const [liveCategoryCounts, setLiveCategoryCounts] = useState(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // Dynamic fetch from MongoDB API
  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/v1/blogs");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
            setBlogList(json.data);
            setIsLiveConnected(true);
            if (json.categoryCounts) {
              setLiveCategoryCounts(json.categoryCounts);
            }
          }
        }
      } catch (err) {
        console.debug("Backend API offline, serving static dataset fallback:", err);
      }
    };
    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Engineering-first categories matching systems identity
  const categories = [
    { label: "ALL", key: "ALL" },
    { label: "BACKEND", key: "Backend" },
    { label: "DISTRIBUTED SYSTEMS", key: "Distributed Systems" },
    { label: "SECURITY", key: "Security" },
    { label: "INFRASTRUCTURE", key: "Infrastructure" },
    { label: "AI ENGINEERING", key: "AI Engineering" },
    { label: "INCIDENTS & ADRs", key: "Incidents & ADRs" },
  ];

  const getTypeBadge = (type) => {
    switch (type) {
      case "INCIDENT":
        return "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30";
      case "ARCHITECTURE":
        return "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30";
      case "BUILD LOG":
        return "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/30";
      case "DEEP DIVE":
      default:
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    }
  };

  // Count items per category (dynamic MongoDB counts if available)
  const getCount = (key) => {
    if (liveCategoryCounts && liveCategoryCounts[key] !== undefined) {
      return liveCategoryCounts[key];
    }
    if (key === "ALL") return blogList.length;
    return blogList.filter((b) => b.categories?.includes(key)).length;
  };

  // Filtered list
  const filteredBlogs = blogList.filter((b) => {
    const matchesCategory =
      selectedCategory === "ALL" || b.categories?.includes(selectedCategory);
    const matchesSearch =
      b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead
        title="Engineering Blog & Systems Post-Mortems | Santusht Kotai"
        description="Real engineering problems, post-mortems, architectural decision records (ADRs), and deep dives from building production systems by Santusht Kotai."
        canonical="/blog"
        keywords="Backend Engineering Blog, Systems Architecture, Post-Mortems, ADR, Distributed Systems, FastAPI, Redis Streams, Docker Sandboxes, Interleet, Sharexpress"
      />
      {/* Header */}
      <ScrollReveal delay={0.04} y={16}>
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight mb-2">
            Engineering Blog & Field Notes
          </h1>
          <p className="text-sm sm:text-base text-[#909092] leading-relaxed max-w-2xl">
            Real systems problems faced while building production platforms — what broke, root-cause investigations, and architectural redesigns.
          </p>
        </div>
      </ScrollReveal>

      {/* Filter Tabs with animate-ui */}
      <ScrollReveal delay={0.08} y={12}>
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 bg-transparent border-0 p-0 h-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              const count = getCount(cat.key);
              return (
                <TabsTab
                  key={cat.key}
                  value={cat.key}
                  indicatorClassName="rounded-full bg-black dark:bg-white shadow-md border border-black dark:border-white"
                  className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono motion-safe:active:scale-[0.95] transition-colors duration-150 ease-smooth cursor-pointer ${
                    isSelected
                      ? "text-white dark:text-black font-semibold border border-transparent"
                      : "bg-black/[0.03] dark:bg-white/[0.04] text-[#909092] hover:text-black dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20"
                  }`}
                >
                  <span className={isSelected ? "text-white dark:text-black font-semibold" : "text-[#909092] hover:text-black dark:hover:text-white"}>
                    {cat.label}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full transition-colors duration-150 ${
                      isSelected
                        ? "bg-white/20 dark:bg-black/15 text-white dark:text-black font-semibold"
                        : "bg-black/[0.05] dark:bg-white/[0.06] text-[#909092]"
                    }`}
                  >
                    {count}
                  </span>
                </TabsTab>
              );
            })}
          </TabsList>

          {/* Blog Posts List with animate-ui TabsPanels */}
          <TabsPanels>
            <TabsPanel value={selectedCategory}>
              {filteredBlogs.length === 0 ? (
                <div className="py-12 text-center text-[#909092] font-mono text-sm">
                  No posts found in this category.
                </div>
              ) : (
                <ScrollRevealGroup
                  className="divide-y divide-black/[0.06] dark:divide-white/[0.06]"
                  stagger={0.06}
                >
                  {filteredBlogs.map((b) => (
                    <ScrollRevealItem key={b.id}>
                      <Link
                        to={`/blog/${b.id}`}
                        className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover-only:hover:bg-black/[0.03] dark:hover-only:hover:bg-white/[0.035] px-3.5 rounded-xl motion-safe:active:scale-[0.98] transition-colors duration-150 ease-smooth block"
                      >
                        <div className="max-w-xl">
                          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                            {b.type && (
                              <span
                                className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getTypeBadge(
                                  b.type
                                )}`}
                              >
                                {b.type}
                              </span>
                            )}
                            <span className="text-[11px] font-mono text-[#909092]">
                              {b.date} • {b.readTime}
                              {typeof b.views === "number" && b.views > 0 ? ` • ${b.views} views` : ""}
                              {typeof b.likes === "number" && b.likes > 0 ? ` • ${b.likes} ❤️` : ""}
                            </span>
                          </div>

                          <h2 className="text-base sm:text-lg font-semibold text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-150 leading-snug">
                            {b.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-[#909092] mt-1.5 leading-relaxed">
                            {b.subtitle}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {b.categories
                              .filter((c) => c !== "Incidents & ADRs")
                              .map((c) => (
                                <span
                                  key={c}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/[0.03] dark:bg-white/[0.04] text-[#909092] border border-black/[0.06] dark:border-white/[0.08] hover-only:hover:border-black/20 dark:hover-only:hover:border-white/20 hover-only:hover:text-black dark:hover-only:hover:text-white transition-[border-color,color] duration-150"
                                >
                                  {c}
                                </span>
                              ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#909092] group-hover:text-black dark:group-hover:text-white transition-colors duration-150 flex-shrink-0 self-start sm:self-center">
                          <span>Read report</span>
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-150 ease-smooth motion-reduce:transform-none text-[#909092] group-hover:text-black dark:group-hover:text-white" />
                        </div>
                      </Link>
                    </ScrollRevealItem>
                  ))}
                </ScrollRevealGroup>
              )}
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </ScrollReveal>

      {/* Footer */}
      <Footer />

      {/* Reading Modal with headless Dialog effect */}
      <DetailModal
        isOpen={Boolean(activeArticle)}
        onClose={() => setActiveArticle(null)}
        title={activeArticle?.title}
        subtitle={activeArticle?.subtitle}
        content={activeArticle?.content}
        date={activeArticle?.date}
        tags={activeArticle?.categories}
      />
    </div>
  );
};

export default BlogView;
