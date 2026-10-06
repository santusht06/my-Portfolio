/**
 * seoSchema.js
 * ---------------------------------------------------------------------------
 * Single source of truth for SEO metadata + JSON-LD.
 *
 * Used by BOTH:
 *   - scripts/prerender.js  (Node, build time → static HTML for every crawler)
 *   - components/SEOHead.jsx (browser, runtime → SPA navigation)
 *
 * Keep this file free of JSX, aliases ("@/") and browser globals so it stays
 * importable from plain Node ESM.
 */
import { profileData, education, blogs } from "../data/portfolioData.js";

export const SITE_URL = "https://santusht.online";
export const SITE_NAME = "Santusht Kotai";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT =
  "Santusht Kotai — Software Engineer, Backend & Distributed Systems";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/* -------------------------------------------------------------------------- */
/* URL helpers                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Canonical form used everywhere (sitemap, <link rel=canonical>, og:url,
 * JSON-LD): leading slash + trailing slash, no query/hash.
 * The production host serves static directories, so "/work" 301s to "/work/".
 */
export const toCanonicalPath = (input = "/") => {
  const clean = String(input).split("#")[0].split("?")[0] || "/";
  const withLeading = clean.startsWith("/") ? clean : `/${clean}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
};

export const absoluteUrl = (path = "/") => `${SITE_URL}${toCanonicalPath(path)}`;

/* -------------------------------------------------------------------------- */
/* Formatting helpers                                                         */
/* -------------------------------------------------------------------------- */

/** "March 04, 2026" | "2026-03-04T…" → "2026-03-04" (timezone-safe). */
export const toIsoDate = (value) => {
  if (!value) return null;
  const str = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10);
  const parsed = new Date(`${str} 12:00:00 UTC`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
};

/** "8 min read" → "PT8M" */
export const readTimeToIso = (value) => {
  const match = /(\d+)/.exec(value || "");
  return match ? `PT${match[1]}M` : undefined;
};

/** Append brand only when the full title still fits a ~62 char SERP budget. */
export const brandTitle = (title) => {
  if (title.includes(SITE_NAME)) return title;
  const suffix = ` | ${SITE_NAME}`;
  return title.length + suffix.length <= 62 ? `${title}${suffix}` : title;
};

/** Plain visible text of an article (for wordCount + static HTML). */
export const getPostText = (post) => {
  const s = post?.sections;
  if (!s) return post?.content || "";
  return [s.tldr, s.problem, s.rootCause, s.solution, ...(s.takeaways || [])]
    .filter(Boolean)
    .join(" ");
};

/* -------------------------------------------------------------------------- */
/* Page registry — titles/descriptions tuned for intent + CTR                 */
/* -------------------------------------------------------------------------- */

export const PAGES = {
  "/": {
    title: "Santusht Kotai — Backend & Distributed Systems Engineer",
    description:
      "Santusht Kotai is a software engineer from Indore, India building FastAPI, Redis and Kubernetes systems. Google Summer of Code 2026 contributor at Supabase.",
    h1: "Santusht Kotai — Software Engineer & Systems Architect",
    breadcrumb: "Home",
  },
  "/work/": {
    title: "Work & Projects — Backend Engineering",
    description:
      "Production backend engineering by Santusht Kotai: 25+ FastAPI APIs, AWS microservices, a self-hosted mail platform, and open-source work with Supabase.",
    h1: "Engineering & Experience",
    breadcrumb: "Work",
  },
  "/blog/": {
    title: "Engineering Blog: Incidents, ADRs & Deep Dives",
    description:
      "Post-mortems, architecture decision records and deep dives on Redis, FastAPI, SSE, Docker sandboxes and distributed systems from real production work.",
    h1: "Engineering Blog & Field Notes",
    breadcrumb: "Blog",
  },
  "/resume/": {
    title: "Resume — Backend Engineer (PDF)",
    description:
      "View or download the resume of Santusht Kotai: FastAPI, PostgreSQL, Redis, AWS, Kubernetes, distributed systems, and Supabase GSoC 2026.",
    h1: "Resume",
    breadcrumb: "Resume",
  },
  "/contact/": {
    title: "Contact — Hire a Backend Engineer",
    description:
      "Contact Santusht Kotai for backend engineering roles, distributed systems consulting, API development or open-source collaboration.",
    h1: "Get in Touch",
    breadcrumb: "Contact",
  },
};

export const getPostMeta = (post) => ({
  title: brandTitle(post.title),
  description: post.subtitle,
  h1: post.title,
  breadcrumb: post.title,
});

export const getPostBySlug = (slug) => blogs.find((b) => b.id === slug);

/** Resolve metadata for any canonical path (static pages + posts). */
export const getPageMeta = (path) => {
  const canonical = toCanonicalPath(path);
  if (PAGES[canonical]) {
    return { ...PAGES[canonical], title: brandTitle(PAGES[canonical].title) };
  }
  const match = /^\/blog\/([^/]+)\/$/.exec(canonical);
  if (match) {
    const post = getPostBySlug(match[1]);
    if (post) return getPostMeta(post);
  }
  return null;
};

/** Related articles: most shared topic tags first, then most recent. */
export const getRelatedPosts = (post, limit = 3) => {
  const topics = (post.categories || []).filter((c) => c !== "Incidents & ADRs");
  return blogs
    .filter((b) => b.id !== post.id)
    .map((b) => ({
      post: b,
      score: (b.categories || []).filter((c) => topics.includes(c)).length,
    }))
    .filter((r) => r.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        (toIsoDate(b.post.date) || "").localeCompare(toIsoDate(a.post.date) || "")
    )
    .slice(0, limit)
    .map((r) => r.post);
};

/* -------------------------------------------------------------------------- */
/* JSON-LD builders                                                           */
/* -------------------------------------------------------------------------- */

const SAME_AS = [
  "https://github.com/santusht06",
  "https://www.linkedin.com/in/santusht-kotai-8a4454323",
  "https://www.instagram.com/santusht.online",
  "https://www.threads.com/@santusht_09",
];

const KNOWS_ABOUT = [
  "Backend Engineering",
  "Distributed Systems",
  "System Design",
  "Microservices",
  "FastAPI",
  "Python",
  "Go",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "OAuth 2.0",
  "API Security",
];

export const buildPerson = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: profileData.name,
  alternateName: ["Santusht"],
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/avatar-anime.png`,
  email: `mailto:${profileData.email}`,
  jobTitle: "Software Engineer",
  description:
    "Backend and distributed systems engineer from Indore, India, specializing in FastAPI, PostgreSQL, Redis, Docker and Kubernetes. Google Summer of Code 2026 contributor at Supabase and founder of Sharexpress Foundation.",
  worksFor: {
    "@type": "Organization",
    name: "Sharexpress Foundation",
    founder: { "@id": PERSON_ID },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.institution.split(",")[0].trim(),
  },
  knowsAbout: KNOWS_ABOUT,
  award: [
    "Google Summer of Code 2026 — Supabase",
    "Buildverse Education Technology Hackathon — Winner 2026",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  sameAs: SAME_AS,
});

export const buildWebSite = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
});

const buildBreadcrumb = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const buildBlogPosting = (post) => {
  const url = absoluteUrl(`/blog/${post.id}`);
  const iso = toIsoDate(post.date);
  const words = getPostText(post).split(/\s+/).filter(Boolean).length;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title.slice(0, 110),
    description: post.subtitle,
    ...(iso ? { datePublished: iso, dateModified: iso } : {}),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    image: [OG_IMAGE],
    inLanguage: "en",
    isAccessibleForFree: true,
    isPartOf: { "@id": `${absoluteUrl("/blog/")}#webpage` },
    articleSection: post.categories?.[0],
    keywords: (post.categories || []).join(", "),
    wordCount: words,
    timeRequired: readTimeToIso(post.readTime),
  };
};

/**
 * Full @graph for a canonical path. Pass `post` to override the static dataset
 * (used when an article is loaded from the API at runtime).
 */
export const buildGraph = (path, { post } = {}) => {
  const canonical = toCanonicalPath(path);
  const url = `${SITE_URL}${canonical}`;
  const meta = getPageMeta(canonical);
  const graph = [buildPerson(), buildWebSite()];

  const slugMatch = /^\/blog\/([^/]+)\/$/.exec(canonical);
  const article = post || (slugMatch ? getPostBySlug(slugMatch[1]) : null);

  if (article) {
    graph.push(buildBlogPosting(article));
    graph.push(
      buildBreadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Blog", url: absoluteUrl("/blog/") },
        { name: article.title, url },
      ])
    );
    return { "@context": "https://schema.org", "@graph": graph };
  }

  if (!meta) return { "@context": "https://schema.org", "@graph": graph };

  const base = {
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: OG_IMAGE,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
    },
  };

  if (canonical === "/") {
    graph.push({
      "@type": "ProfilePage",
      ...base,
      mainEntity: { "@id": PERSON_ID },
      about: { "@id": PERSON_ID },
    });
  } else if (canonical === "/blog/") {
    graph.push({
      "@type": "CollectionPage",
      ...base,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: blogs.length,
        itemListElement: blogs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/blog/${b.id}`),
          name: b.title,
        })),
      },
    });
  } else if (canonical === "/contact/") {
    graph.push({ "@type": "ContactPage", ...base, about: { "@id": PERSON_ID } });
  } else {
    graph.push({ "@type": "WebPage", ...base, about: { "@id": PERSON_ID } });
  }

  if (canonical !== "/") {
    graph.push(
      buildBreadcrumb([
        { name: "Home", url: `${SITE_URL}/` },
        { name: meta.breadcrumb, url },
      ])
    );
  }

  return { "@context": "https://schema.org", "@graph": graph };
};
