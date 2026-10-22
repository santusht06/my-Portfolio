import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import DetailModal from "../components/DetailModal";
import SEOHead from "../components/SEOHead";
import { ScrollReveal } from "../components/ScrollReveal";
import {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanels,
  TabsPanel,
} from "@/components/animate-ui/components/base/tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  selectBlogs,
  selectCategoryCounts,
  selectBlogsStatus,
} from "@/store/slices/blogsSlice";
import { BlogListSkeleton } from "../components/BlogSkeleton";
import { getBlogCoverImage } from "@/lib/blogImage";

/**
 * Individual Blog List Item with Hover Preview Card & Blur coordination
 * Matches the exact interaction pattern and visual aesthetics of ramx.in/blog
 */
const BlogListItem = ({
  blog,
  isHovered,
  onHoverStart,
  onHoverEnd,
  canHover,
}) => {
  const articleRef = useRef(null);
  const titleRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, showAbove: false });
  const coverImage = getBlogCoverImage(blog);

  const updatePosition = (clientX) => {
    if (!articleRef.current) return;
    const articleRect = articleRef.current.getBoundingClientRect();
    const titleRect = titleRef.current
      ? titleRef.current.getBoundingClientRect()
      : { top: articleRect.top, height: 28 };

    const relX = clientX - articleRect.left;
    const relY = titleRect.top - articleRect.top;
    const cardWidth = 300;
    const cardHeight = 160;
    const showAbove = titleRect.top + 100 + cardHeight > window.innerHeight;

    // Horizontally clamp preview card so it never clips out of the container bounds
    const targetX =
      relX + 20 + cardWidth > articleRect.width - 8
        ? relX - cardWidth - 20
        : relX + 20;

    const clampedX = Math.max(8, Math.min(targetX, articleRect.width - cardWidth - 8));
    const targetY = showAbove
      ? relY - cardHeight - 14
      : relY + (titleRect.height || 28) + 14;

    setCoords({ x: clampedX, y: targetY, showAbove });
  };

  const handleMouseEnter = (e) => {
    if (!canHover) return;
    updatePosition(e.clientX);
    onHoverStart(blog.id);
  };

  const handleMouseMove = (e) => {
    if (!canHover) return;
    updatePosition(e.clientX);
  };

  const handleMouseLeave = () => {
    onHoverEnd();
  };

  return (
    <article
      ref={articleRef}
      className="blog-list-item group relative isolate"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/blog/${blog.id}`}
        className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover-only:hover:bg-black/[0.03] dark:hover-only:hover:bg-white/[0.035] px-3.5 rounded-xl motion-safe:active:scale-[0.98] transition-colors duration-150 ease-smooth block"
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
            <span className="text-[11px] font-mono text-[#909092]">
              {blog.date} • {blog.readTime}
            </span>
          </div>

          <h2
            ref={titleRef}
            className="text-base sm:text-lg font-semibold text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-150 leading-snug"
          >
            {blog.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#909092] mt-1.5 leading-relaxed">
            {blog.subtitle}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {blog.categories
              ?.filter((c) => c !== "Incidents & ADRs")
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

      {/* Floating Preview Card with framer-motion matching ramx.in */}
      <AnimatePresence>
        {isHovered && canHover && (
          <motion.div
            className="pointer-events-none absolute z-[9999] overflow-hidden rounded-xl shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c0c0e]"
            style={{
              left: coords.x,
              top: coords.y,
              width: 300,
              height: 160,
              transform: "translateZ(0px)",
            }}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src={coverImage}
              alt={blog.title}
              width={300}
              height={160}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

const BlogView = () => {
  const dispatch = useDispatch();
  const blogList = useSelector(selectBlogs);
  const liveCategoryCounts = useSelector(selectCategoryCounts);
  const status = useSelector(selectBlogsStatus);
  const isLoading = status === "loading" && blogList.length === 0;

  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [hoveredBlogId, setHoveredBlogId] = useState(null);
  const [canHover, setCanHover] = useState(false);

  // Check hover capability and min-width to ensure smooth desktop behavior
  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (min-width: 768px)");
    setCanHover(mql.matches);
    const handler = (e) => setCanHover(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    } else if (mql.addListener) {
      mql.addListener(handler);
      return () => mql.removeListener(handler);
    }
  }, []);

  // Dynamic fetch via Redux from Supabase PostgreSQL API
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

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

  // Count items per category
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
      <SEOHead canonical="/blog" />
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
              {isLoading ? (
                <BlogListSkeleton count={4} />
              ) : filteredBlogs.length === 0 ? (
                <div className="py-12 text-center text-[#909092] font-mono text-sm">
                  No posts found in this category.
                </div>
              ) : (
                <div className="blog-list blog-list-container divide-y divide-black/[0.06] dark:divide-white/[0.06] relative">
                  {filteredBlogs.map((b) => (
                    <BlogListItem
                      key={b.id}
                      blog={b}
                      isHovered={hoveredBlogId === b.id}
                      onHoverStart={setHoveredBlogId}
                      onHoverEnd={() => setHoveredBlogId(null)}
                      canHover={canHover}
                    />
                  ))}
                </div>
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
