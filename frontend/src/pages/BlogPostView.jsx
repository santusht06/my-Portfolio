import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiCheck, FiHeart, FiEye } from "react-icons/fi";
import { blogs, profileData } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const BlogPostView = () => {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const staticPost = blogs.find((b) => b.id === slug);
  const [post, setPost] = useState(staticPost);
  const [likes, setLikes] = useState(staticPost?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(staticPost?.views || 0);

  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/v1/blogs/${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.success && json.data) {
            setPost(json.data);
            if (typeof json.data.likes === "number") setLikes(json.data.likes);
            if (typeof json.data.views === "number") setViews(json.data.views);
          }
        }
      } catch (err) {
        console.debug("Backend fetch failed, using static data:", err);
      }
    };
    if (slug) fetchPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleLike = async () => {
    if (hasLiked) return;
    setLikes((prev) => prev + 1);
    setHasLiked(true);
    toast.success("Thank you for reading!");
    try {
      await fetch(`/api/v1/blogs/${slug}/like`, { method: "POST" });
    } catch (err) {
      console.debug("Like sync failed:", err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.subtitle,
    "author": {
      "@type": "Person",
      "name": profileData.name,
      "url": "https://santusht.online"
    },
    "datePublished": post.date,
    "publisher": {
      "@type": "Person",
      "name": profileData.name
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://santusht.online/blog/${post.id}`
    }
  };

  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <SEOHead
        title={`${post.title} — Santusht Kotai`}
        description={post.subtitle}
        canonical={`/blog/${post.id}`}
        keywords={`${post.categories.join(", ")}, Backend Engineering, Distributed Systems, Santusht Kotai`}
        schema={schema}
      />

      <ScrollReveal delay={0.02} y={12}>
        {/* Navigation & Share Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#909092] hover:text-black dark:hover:text-white transition-colors duration-150 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-150 ease-smooth" />
            <span>Back to all articles</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md border transition-all duration-150 cursor-pointer ${
                hasLiked
                  ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                  : "bg-black/[0.03] dark:bg-white/[0.04] text-[#909092] border-black/[0.06] dark:border-white/[0.06] hover:text-rose-500 hover:border-rose-500/30"
              }`}
              title="Like this engineering report"
            >
              <FiHeart className={hasLiked ? "fill-rose-500 text-rose-500" : ""} />
              <span>{likes > 0 ? likes : "Like"}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#909092] hover:text-black dark:hover:text-white px-2.5 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] hover:border-black/20 dark:hover:border-white/20 transition-all duration-150 cursor-pointer"
              title="Share article"
            >
              {copied ? (
                <>
                  <FiCheck className="text-black dark:text-white" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <FiShare2 />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Type Badge & Categories */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {post.type && (
            <span
              className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded border ${
                post.type === "INCIDENT"
                  ? "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30"
                  : post.type === "ARCHITECTURE"
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
                  : post.type === "BUILD LOG"
                  ? "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/30"
                  : "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
              }`}
            >
              {post.type}
            </span>
          )}
          {post.categories.map((cat) => (
            <span
              key={cat}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#909092] border border-black/[0.08] dark:border-white/[0.08]"
            >
              #{cat}
            </span>
          ))}
        </div>

        {/* Article Title & Subtitle */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white mb-3 leading-tight">
          {post.title}
        </h1>
        <p className="text-base sm:text-lg text-[#909092] font-mono leading-relaxed mb-6">
          {post.subtitle}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-[#909092] pb-6 border-b border-black/[0.06] dark:border-white/[0.06] mb-8 flex-wrap">
          <span className="flex items-center gap-1.5">
            <FiCalendar className="text-[#909092]" />
            {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <FiClock className="text-[#909092]" />
            {post.readTime}
          </span>
          {views > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FiEye className="text-xs" />
                {views} {views === 1 ? "view" : "views"}
              </span>
            </>
          )}
          <span>•</span>
          <span>By {profileData.name}</span>
        </div>
      </ScrollReveal>

      {/* Main Body Content */}
      <ScrollReveal delay={0.06} y={16}>
        <div className="max-w-none text-black/90 dark:text-white/90 space-y-8">
          {post.sections?.tldr && (
            <div className="p-5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] font-mono text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#909092] mb-2 flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Executive Summary / TL;DR
              </div>
              <p>{post.sections.tldr}</p>
            </div>
          )}

          {post.sections?.problem && (
            <div className="space-y-2.5">
              <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight">
                01. The Problem & Observed Symptoms
              </h2>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {post.sections.problem}
              </p>
            </div>
          )}

          {post.sections?.rootCause && (
            <div className="space-y-2.5 p-5 rounded-xl bg-rose-500/[0.03] dark:bg-rose-500/[0.04] border border-rose-500/20">
              <h2 className="text-base sm:text-lg font-bold text-rose-700 dark:text-rose-400 tracking-tight">
                02. Root Cause Investigation
              </h2>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {post.sections.rootCause}
              </p>
            </div>
          )}

          {post.sections?.solution && (
            <div className="space-y-2.5">
              <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight">
                03. Architectural Redesign & Fix
              </h2>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {post.sections.solution}
              </p>
            </div>
          )}

          {!post.sections && (
            <p className="text-base sm:text-lg leading-relaxed font-sans">
              {post.content}
            </p>
          )}

          {/* Key Engineering Takeaways */}
          <div className="p-5 sm:p-6 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08]">
            <h3 className="text-base font-bold text-black dark:text-white mb-3">
              Key Engineering Takeaways
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-mono">
              {(post.sections?.takeaways || [
                "Low-latency connection pooling and asynchronous worker pipelines.",
                "Graceful degradation and circuit-breaking under high-concurrency traffic bursts.",
                "Security-first authorization decorators aligned with OWASP Top 10 vulnerabilities.",
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#909092] mt-0.5 select-none font-bold">
                    0{idx + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm sm:text-base leading-relaxed font-sans text-[#909092] pt-4">
            For technical discussions or questions regarding this implementation, reach out directly via the{" "}
            <Link
              to="/contact"
              className="text-black dark:text-white underline font-medium hover:opacity-80"
            >
              contact page
            </Link>{" "}
            or check source implementations on{" "}
            <a
              href="https://github.com/santusht06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white underline font-medium hover:opacity-80"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </ScrollReveal>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
        <Footer />
      </div>
    </article>
  );
};

export default BlogPostView;
