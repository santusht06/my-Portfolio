/**
 * seoSchema.js
 * ---------------------------------------------------------------------------
 * Single source of truth for SEO metadata + JSON-LD + Google Sitelinks Architecture.
 *
 * Used by BOTH:
 *   - scripts/prerender.js  (Node, build time → static HTML for every crawler)
 *   - components/SEOHead.jsx (browser, runtime → SPA navigation)
 *
 * Keep this file free of JSX, aliases ("@/") and browser globals so it stays
 * importable from plain Node ESM.
 */
import { profileData, education, blogs, faqData } from "../data/portfolioData.js";

export const SITE_URL = "https://santusht.online";
export const SITE_NAME = "Santusht Kotai";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT =
  "Santusht Kotai — Software Engineer, Backend & Distributed Systems";
export const AVATAR_IMAGE = `${SITE_URL}/avatar-anime.png`;
export const FAVICON_512 = `${SITE_URL}/favicon-512x512.png`;

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SITELINKS_ID = `${SITE_URL}/#sitelinks`;
export const FAQ_ID = `${SITE_URL}/#faqpage`;

/* -------------------------------------------------------------------------- */
/* URL helpers                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Canonical form used everywhere (sitemap, <link rel=canonical>, og:url,
 * JSON-LD): leading slash + trailing slash, no query/hash.
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
  const suffix = ` — ${SITE_NAME}`;
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
/* Page registry — titles/descriptions tuned for intent + CTR + Sitelinks      */
/* -------------------------------------------------------------------------- */

export const PAGES = {
  "/": {
    title: "Santusht Kotai — Software Engineer & Systems Architect",
    description:
      "Santusht Kotai is a backend and distributed systems engineer from Indore, India. Explore FastAPI APIs, Redis engines, GSoC Supabase work, and technical articles.",
    h1: "Santusht Kotai — Software Engineer & Systems Architect",
    breadcrumb: "Home",
  },
  "/work/": {
    title: "Projects & Systems Architecture — Santusht Kotai",
    description:
      "Production backend engineering and systems projects by Santusht Kotai: 25+ FastAPI APIs, AWS microservices, Sharexpress Mail, and Supabase GSoC 2026.",
    h1: "Projects & Systems Architecture",
    breadcrumb: "Projects",
  },
  "/blog/": {
    title: "Engineering Blog: Incidents, ADRs & Deep Dives — Santusht Kotai",
    description:
      "In-depth post-mortems, architecture decision records, Redis engines, Docker sandboxes, and distributed systems deep dives from production.",
    h1: "Engineering Blog & Field Notes",
    breadcrumb: "Blog",
  },
  "/resume/": {
    title: "Resume — Santusht Kotai | Software Engineer",
    description:
      "Technical resume of Santusht Kotai: Backend engineering, distributed systems, FastAPI, PostgreSQL, Redis, AWS, Kubernetes, and Supabase GSoC 2026.",
    h1: "Resume",
    breadcrumb: "Resume",
  },
  "/contact/": {
    title: "Contact & Collaboration — Santusht Kotai",
    description:
      "Get in touch with Santusht Kotai for backend engineering roles, distributed systems consulting, API development, or open-source collaboration.",
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
/* JSON-LD builders (Google Rich Snippets & Sitelinks Architecture)           */
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
  "High-Concurrency Architectures",
];

export const buildPerson = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: profileData.name,
  alternateName: ["Santusht", "santusht06"],
  url: `${SITE_URL}/`,
  image: AVATAR_IMAGE,
  email: `mailto:${profileData.email}`,
  jobTitle: "Software Engineer & Systems Architect",
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
    "LeetCode Knight (Top 1.2% Globally)",
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
  alternateName: [
    "Santusht",
    "santusht.online",
    "santusht06",
    "Santusht Kotai — Portfolio",
  ],
  description:
    "Software Engineer & Systems Architect specializing in Backend Engineering, FastAPI, Redis, and Distributed Systems.",
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
  image: AVATAR_IMAGE,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog/?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  hasPart: [
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl("/work/")}#webpage`,
      name: "Projects & Systems Architecture",
      url: absoluteUrl("/work/"),
    },
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl("/blog/")}#webpage`,
      name: "Engineering Blog",
      url: absoluteUrl("/blog/"),
    },
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl("/resume/")}#webpage`,
      name: "Resume",
      url: absoluteUrl("/resume/"),
    },
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl("/contact/")}#webpage`,
      name: "Contact",
      url: absoluteUrl("/contact/"),
    },
  ],
});

/**
 * SiteNavigationElement structured data explicitly maps out Google Sitelinks
 */
export const buildSiteNavigation = () => ({
  "@type": "ItemList",
  "@id": SITELINKS_ID,
  name: "Santusht Kotai — Primary Navigation & Sitelinks",
  description:
    "Primary navigation structure and featured links for Santusht Kotai's systems portfolio.",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "Projects",
      description:
        "Production backend systems, distributed architectures, 25+ FastAPI APIs, and open-source contributions.",
      url: absoluteUrl("/work/"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "Engineering Blog",
      description:
        "In-depth engineering notes, incident post-mortems, and architectural decision records.",
      url: absoluteUrl("/blog/"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "Resume",
      description:
        "Technical resume of Santusht Kotai: Backend engineering, distributed systems, and GSoC 2026.",
      url: absoluteUrl("/resume/"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "Contact",
      description:
        "Get in touch for backend engineering roles, system design consulting, and collaboration.",
      url: absoluteUrl("/contact/"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 5,
      name: "ADR-001: Why Kafka Was the Wrong Choice",
      description:
        "Why Kafka was rejected in favor of a native Redis engine for asynchronous worker queues.",
      url: absoluteUrl("/blog/why-i-didnt-use-kafka/"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 6,
      name: "Building a Self-Hosted Mail Server",
      description:
        "Architecting a compliant self-hosted mail server supporting SMTP, IMAP4, and POP3 from scratch.",
      url: absoluteUrl("/blog/self-hosted-mail-infrastructure/"),
    },
    {
      "@type": "SiteNavigationElement",
      position: 7,
      name: "The FAQ",
      description:
        "Frequently asked questions covering backend architecture, services, timeline, and collaboration.",
      url: `${SITE_URL}/#faq`,
    },
  ],
});

/**
 * FAQPage structured data for rich FAQ expandable cards in Google Search
 */
export const buildFAQPage = () => {
  const faqs = faqData || [];
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    "@id": FAQ_ID,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

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
    // Add Sitelinks & FAQ structured data to homepage
    graph.push(buildSiteNavigation());
    const faqPage = buildFAQPage();
    if (faqPage) graph.push(faqPage);
  } else if (canonical === "/work/") {
    graph.push({
      "@type": "CollectionPage",
      ...base,
      about: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        name: "Featured Systems Projects",
        itemListElement: [
          {
            "@type": "SoftwareApplication",
            position: 1,
            name: "Sharexpress Mail Infrastructure & Cloud Services",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Linux, Cloud",
            offers: { "@type": "Offer", price: "0" },
            url: "https://github.com/santusht06/sharexpress",
          },
          {
            "@type": "SoftwareApplication",
            position: 2,
            name: "Interleet – AI Interview & Systems Sandbox",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Linux, Cloud",
            offers: { "@type": "Offer", price: "0" },
            url: "https://github.com/santusht06/interleet",
          },
        ],
      },
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
