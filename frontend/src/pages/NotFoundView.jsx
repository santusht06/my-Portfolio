import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import SEOHead from "../components/SEOHead";
import Footer from "../components/Footer";
import { blogs } from "../data/portfolioData";

/**
 * Real 404 view. Previously every unknown URL silently redirected to "/",
 * which search engines treat as a soft-404 and a duplicate of the homepage.
 * This page is noindex and offers genuinely useful next steps.
 */
const NotFoundView = () => {
  const latest = blogs.slice(0, 3);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <SEOHead
        title="Page not found | Santusht Kotai"
        description="The page you are looking for does not exist."
        canonical="/404"
        noindex
      />

      <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#909092] mb-3">
        Error 404
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight mb-3">
        This page doesn&apos;t exist
      </h1>
      <p className="text-sm sm:text-base text-[#909092] leading-relaxed max-w-xl mb-8">
        The link may be outdated or mistyped. Here is where you can go instead.
      </p>

      <div className="flex flex-wrap gap-2 mb-12 text-xs font-mono">
        {[
          { to: "/", label: "Home" },
          { to: "/work", label: "Work & projects" },
          { to: "/blog", label: "Engineering blog" },
          { to: "/resume", label: "Resume" },
          { to: "/contact", label: "Contact" },
        ].map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="px-3 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] text-[#909092] hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-colors duration-150"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#909092] mb-4">
        Latest engineering notes
      </h2>
      <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {latest.map((b) => (
          <li key={b.id}>
            <Link
              to={`/blog/${b.id}`}
              className="group flex items-start justify-between gap-4 py-4 px-1"
            >
              <span>
                <span className="block text-sm sm:text-base font-semibold text-black dark:text-white leading-snug">
                  {b.title}
                </span>
                <span className="block text-xs sm:text-sm text-[#909092] mt-1">
                  {b.subtitle}
                </span>
              </span>
              <FiArrowRight className="mt-1 flex-shrink-0 text-[#909092] group-hover:translate-x-1 transition-transform duration-150 motion-reduce:transform-none" />
            </Link>
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default NotFoundView;
