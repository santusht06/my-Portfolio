import React from "react";

/**
 * Skeleton loader for BlogView post list
 * Matches exact layout, paddings, dividers, and typography scale
 */
export const BlogListSkeleton = ({ count = 4 }) => {
  return (
    <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06] animate-pulse" aria-busy="true" aria-label="Loading blog posts">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="py-5 px-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="max-w-xl w-full space-y-2.5">
            {/* Date & read time */}
            <div className="h-3 w-28 bg-black/[0.06] dark:bg-white/[0.08] rounded" />

            {/* Title */}
            <div className="h-5 w-4/5 bg-black/[0.09] dark:bg-white/[0.12] rounded" />

            {/* Subtitle */}
            <div className="h-3.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded" />
            <div className="h-3.5 w-2/3 bg-black/[0.04] dark:bg-white/[0.06] rounded" />

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              <div className="h-4 w-14 bg-black/[0.04] dark:bg-white/[0.06] rounded" />
              <div className="h-4 w-24 bg-black/[0.04] dark:bg-white/[0.06] rounded" />
            </div>
          </div>

          {/* Right action prompt */}
          <div className="h-3 w-20 bg-black/[0.05] dark:bg-white/[0.06] rounded hidden sm:block self-center flex-shrink-0" />
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton loader for BlogPostView reading article page
 * Matches exact structure of header, meta, and systems breakdown cards
 */
export const BlogPostSkeleton = () => {
  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-pulse" aria-busy="true" aria-label="Loading article">
      {/* Back button */}
      <div className="h-4 w-28 bg-black/[0.06] dark:bg-white/[0.07] rounded mb-6" />

      {/* Category badge */}
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-20 bg-black/[0.05] dark:bg-white/[0.07] rounded-full" />
      </div>

      {/* Main Title */}
      <div className="space-y-3 mb-4">
        <div className="h-8 sm:h-10 w-full bg-black/[0.09] dark:bg-white/[0.12] rounded-lg" />
        <div className="h-8 sm:h-10 w-3/4 bg-black/[0.09] dark:bg-white/[0.12] rounded-lg" />
      </div>

      {/* Subtitle */}
      <div className="h-4 w-2/3 bg-black/[0.05] dark:bg-white/[0.07] rounded mb-6" />

      {/* Meta row */}
      <div className="flex items-center gap-3 pb-6 border-b border-black/[0.06] dark:border-white/[0.06] mb-8">
        <div className="h-3.5 w-24 bg-black/[0.05] dark:bg-white/[0.07] rounded" />
        <div className="h-3.5 w-16 bg-black/[0.05] dark:bg-white/[0.07] rounded" />
        <div className="h-3.5 w-28 bg-black/[0.05] dark:bg-white/[0.07] rounded" />
      </div>

      {/* Section Blocks */}
      <div className="space-y-7">
        {/* TLDR Summary Card */}
        <div className="p-5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] space-y-2.5">
          <div className="h-3 w-36 bg-emerald-500/20 dark:bg-emerald-500/25 rounded" />
          <div className="h-3.5 w-full bg-black/[0.05] dark:bg-white/[0.07] rounded" />
          <div className="h-3.5 w-4/5 bg-black/[0.05] dark:bg-white/[0.07] rounded" />
        </div>

        {/* Section 01 */}
        <div className="space-y-2.5">
          <div className="h-5 w-52 bg-black/[0.08] dark:bg-white/[0.1] rounded" />
          <div className="h-3.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded" />
          <div className="h-3.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded" />
          <div className="h-3.5 w-3/5 bg-black/[0.04] dark:bg-white/[0.06] rounded" />
        </div>

        {/* Section 02 (Root Cause) */}
        <div className="p-5 rounded-xl border border-rose-500/15 bg-rose-500/[0.02] space-y-2.5">
          <div className="h-4 w-44 bg-rose-500/20 dark:bg-rose-500/25 rounded" />
          <div className="h-3.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded" />
          <div className="h-3.5 w-5/6 bg-black/[0.04] dark:bg-white/[0.06] rounded" />
        </div>

        {/* Section 03 (Solution) */}
        <div className="space-y-2.5">
          <div className="h-5 w-48 bg-black/[0.08] dark:bg-white/[0.1] rounded" />
          <div className="h-3.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded" />
          <div className="h-3.5 w-4/5 bg-black/[0.04] dark:bg-white/[0.06] rounded" />
        </div>
      </div>
    </article>
  );
};

/**
 * Skeleton loader for HomeView latest notes
 */
export const HomeBlogSkeleton = ({ count = 3 }) => {
  return (
    <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06] animate-pulse" aria-busy="true">
      {Array.from({ length: count }).map((_, idx) => (
        <li key={idx} className="py-4 px-3 -mx-3 flex items-start justify-between gap-4">
          <div className="space-y-2 w-full">
            <div className="h-3 w-24 bg-black/[0.06] dark:bg-white/[0.07] rounded" />
            <div className="h-4 sm:h-5 w-4/5 bg-black/[0.09] dark:bg-white/[0.11] rounded" />
            <div className="h-3.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded" />
          </div>
          <div className="mt-5 size-4 bg-black/[0.06] dark:bg-white/[0.08] rounded flex-shrink-0" />
        </li>
      ))}
    </ul>
  );
};

export default { BlogListSkeleton, BlogPostSkeleton, HomeBlogSkeleton };
