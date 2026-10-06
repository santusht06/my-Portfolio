/**
 * prerender.js — static SEO generation (runs after `vite build`)
 * ---------------------------------------------------------------------------
 * For every public route this writes a real HTML file containing:
 *   - unique <title>, meta description, canonical, Open Graph, Twitter tags
 *   - JSON-LD (@graph: Person, WebSite, page/BlogPosting, BreadcrumbList)
 *   - crawlable semantic HTML (one <h1>, headings, internal links, article
 *     body) inside #root, which React replaces on mount
 * It also generates sitemap.xml, llms.txt and a noindex 404.html.
 *
 * All metadata comes from src/lib/seoSchema.js — the same module the runtime
 * <SEOHead> uses — so crawl-time and render-time values cannot drift.
 * Any missing tag in index.html FAILS the build instead of silently shipping
 * stale metadata.
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

import {
  blogs,
  profileData,
  experiences,
  projects,
  achievements,
  skillsData,
  education,
} from "../src/data/portfolioData.js";
import {
  SITE_URL,
  SITE_NAME,
  PAGES,
  buildGraph,
  getPageMeta,
  getPostMeta,
  getRelatedPosts,
  toCanonicalPath,
  absoluteUrl,
  toIsoDate,
} from "../src/lib/seoSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(frontendDir, "..");
const distDir = path.join(frontendDir, "dist");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}
const template = fs.readFileSync(templatePath, "utf-8");

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const esc = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Replace a tag; throw if it does not exist (never ship stale metadata). */
const setTag = (html, regex, replacement, label) => {
  if (!regex.test(html)) {
    throw new Error(`prerender: "${label}" tag not found in index.html template`);
  }
  return html.replace(regex, () => replacement);
};

const today = new Date().toISOString().slice(0, 10);

const gitDate = (...files) => {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${files.join(" ")}`, {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return out || today;
  } catch {
    return today;
  }
};

const maxDate = (...dates) => dates.filter(Boolean).sort().at(-1);

const a = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const internal = (p, text) => a(toCanonicalPath(p), text);

/* -------------------------------------------------------------------------- */
/* Shell content builders (semantic HTML, no layout dependence)               */
/* -------------------------------------------------------------------------- */

const navHtml = () => `<nav aria-label="Primary">${[
  ["/", "Home"],
  ["/work/", "Work"],
  ["/blog/", "Blog"],
  ["/resume/", "Resume"],
  ["/contact/", "Contact"],
]
  .map(([p, label]) => internal(p, label))
  .join("")}</nav>`;

const footerHtml = () => `<footer>
  <p>&copy; 2026 ${esc(profileData.name)} &middot; ${esc(profileData.location)}</p>
  <p>${[
    ["GitHub", "https://github.com/santusht06"],
    ["LinkedIn", "https://www.linkedin.com/in/santusht-kotai-8a4454323"],
    ["Email", `mailto:${profileData.email}`],
  ]
    .map(([label, href]) => a(href, label))
    .join(" &middot; ")}</p>
</footer>`;

const experienceHtml = (limit) =>
  experiences
    .map(
      (e) => `<article>
  <h3>${esc(e.company)} &mdash; ${esc(e.role)}</h3>
  <p>${esc(e.period)} &middot; ${esc(e.location)}</p>
  <ul>${(limit ? e.bullets.slice(0, limit) : e.bullets)
    .map((b) => `<li>${esc(b)}</li>`)
    .join("")}</ul>
</article>`
    )
    .join("\n");

const projectsHtml = (limit) =>
  projects
    .map(
      (p) => `<article>
  <h3>${esc(p.title)}</h3>
  <p>${esc(p.period)} &middot; ${a(p.github, p.githubDisplay)}</p>
  <ul>${(limit ? p.bullets.slice(0, limit) : p.bullets)
    .map((b) => `<li>${esc(b)}</li>`)
    .join("")}</ul>
  <p>Stack: ${esc(p.stack.join(", "))}</p>
</article>`
    )
    .join("\n");

const achievementsHtml = () =>
  `<ul>${achievements
    .map(
      (x) =>
        `<li><strong>${esc(x.title)}</strong> (${esc(x.badge)}, ${esc(x.org)}): ${esc(x.description)}</li>`
    )
    .join("")}</ul>`;

const skillsHtml = () =>
  `<ul>${Object.entries(skillsData)
    .map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v.join(", "))}</li>`)
    .join("")}</ul>`;

const educationHtml = () =>
  `<p>${esc(education.degree)}, ${esc(education.institution)} (${esc(education.period)}). Coursework: ${esc(education.coursework)}.</p>`;

const articleListHtml = (posts) =>
  `<ul>${posts
    .map(
      (b) =>
        `<li>${internal(`/blog/${b.id}`, b.title)} &mdash; ${esc(b.subtitle)} <small>(${esc(b.date)}, ${esc(b.readTime)}; ${esc((b.categories || []).join(", "))})</small></li>`
    )
    .join("")}</ul>`;

const shell = (inner) =>
  `<div class="seo-shell">${navHtml()}<main>${inner}</main>${footerHtml()}</div>`;

const buildShell = {
  "/": () =>
    shell(`<h1>${esc(PAGES["/"].h1)}</h1>
<p>${esc(profileData.summary)}</p>
<p>${esc(profileData.title)} &middot; ${esc(profileData.location)}</p>
<h2>Experience</h2>
${experienceHtml(2)}
<h2>Featured Systems Projects</h2>
${projectsHtml(2)}
<h2>Leadership &amp; Achievements</h2>
${achievementsHtml()}
<h2>Latest Engineering Notes</h2>
${articleListHtml(blogs.slice(0, 4))}
<p>${internal("/blog/", "Read all engineering articles")} &middot; ${internal("/work/", "See all work and projects")}</p>`),

  "/work/": () =>
    shell(`<h1>${esc(PAGES["/work/"].h1)}</h1>
<p>Production systems, distributed architectures, open-source work, and key milestones.</p>
<h2>Work Experience</h2>
${experienceHtml()}
<h2>Systems Projects</h2>
${projectsHtml()}
<h2>Achievements</h2>
${achievementsHtml()}
<h2>Technical Skills</h2>
${skillsHtml()}
<h2>Education</h2>
${educationHtml()}
<p>Deep dives on this work: ${internal("/blog/", "engineering blog")}.</p>`),

  "/blog/": () =>
    shell(`<h1>${esc(PAGES["/blog/"].h1)}</h1>
<p>Real systems problems faced while building production platforms &mdash; what broke, root-cause investigations, and architectural redesigns.</p>
<h2>All articles (${blogs.length})</h2>
${articleListHtml(blogs)}`),

  "/resume/": () =>
    shell(`<h1>${esc(PAGES["/resume/"].h1)} &mdash; ${esc(profileData.name)}</h1>
<p>${esc(profileData.title)}. ${a("/Santusht_Kotai_Resume.pdf", "Download the resume (PDF)")}.</p>
<h2>Experience</h2>
${experienceHtml(2)}
<h2>Technical Skills</h2>
${skillsHtml()}
<h2>Education</h2>
${educationHtml()}`),

  "/contact/": () =>
    shell(`<h1>${esc(PAGES["/contact/"].h1)}</h1>
<p>Have a project, role, or collaboration in mind? Reach out for backend engineering roles, distributed systems consulting, or open-source collaboration.</p>
<ul>
  <li>Email: ${a(`mailto:${profileData.email}`, profileData.email)}</li>
  <li>Location: ${esc(profileData.location)}</li>
  <li>${a("https://github.com/santusht06", "GitHub")}</li>
  <li>${a("https://www.linkedin.com/in/santusht-kotai-8a4454323", "LinkedIn")}</li>
</ul>`),
};

const buildPostShell = (post) => {
  const s = post.sections;
  const related = getRelatedPosts(post, 3);
  const body = s
    ? `<p><strong>TL;DR:</strong> ${esc(s.tldr)}</p>
<h2>01. The Problem &amp; Observed Symptoms</h2><p>${esc(s.problem)}</p>
<h2>02. Root Cause Investigation</h2><p>${esc(s.rootCause)}</p>
<h2>03. Architectural Redesign &amp; Fix</h2><p>${esc(s.solution)}</p>
<h2>Key Engineering Takeaways</h2><ul>${(s.takeaways || [])
        .map((t) => `<li>${esc(t)}</li>`)
        .join("")}</ul>`
    : `<p>${esc(post.content)}</p>`;

  return shell(`<nav aria-label="Breadcrumb">${internal("/", "Home")} / ${internal("/blog/", "Blog")} / ${esc(post.title)}</nav>
<article>
<h1>${esc(post.title)}</h1>
<p>${esc(post.subtitle)}</p>
<p>${esc(post.date)} &middot; ${esc(post.readTime)} &middot; By ${esc(profileData.name)}</p>
${body}
</article>
${
  related.length
    ? `<h2>Related engineering notes</h2>${articleListHtml(related)}`
    : ""
}
<p>Questions about this implementation? ${internal("/contact/", "Get in touch")} or see ${a("https://github.com/santusht06", "GitHub")}.</p>`);
};

const buildNotFoundShell = () =>
  shell(`<h1>Page not found</h1>
<p>The page you are looking for does not exist. Try the ${internal("/", "homepage")}, the ${internal("/blog/", "engineering blog")} or ${internal("/work/", "work and projects")}.</p>`);

/* -------------------------------------------------------------------------- */
/* Page assembly                                                              */
/* -------------------------------------------------------------------------- */

const renderPage = ({ canonicalPath, title, description, shellHtml, graph, ogType = "website", noindex = false }) => {
  const url = `${SITE_URL}${canonicalPath}`;
  let html = template;

  html = setTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`, "title");
  html = setTag(html, /<meta name="description" content="[^"]*" \/>/i, `<meta name="description" content="${esc(description)}" />`, "description");
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/i, `<link rel="canonical" href="${url}" />`, "canonical");
  html = setTag(
    html,
    /<meta name="robots" content="[^"]*" \/>/i,
    `<meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}" />`,
    "robots"
  );
  html = setTag(html, /<meta property="og:type" content="[^"]*" \/>/i, `<meta property="og:type" content="${ogType}" />`, "og:type");
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/i, `<meta property="og:title" content="${esc(title)}" />`, "og:title");
  html = setTag(html, /<meta property="og:description" content="[^"]*" \/>/i, `<meta property="og:description" content="${esc(description)}" />`, "og:description");
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/i, `<meta property="og:url" content="${url}" />`, "og:url");
  html = setTag(html, /<meta name="twitter:title" content="[^"]*" \/>/i, `<meta name="twitter:title" content="${esc(title)}" />`, "twitter:title");
  html = setTag(html, /<meta name="twitter:description" content="[^"]*" \/>/i, `<meta name="twitter:description" content="${esc(description)}" />`, "twitter:description");
  html = setTag(html, /<meta name="twitter:url" content="[^"]*" \/>/i, `<meta name="twitter:url" content="${url}" />`, "twitter:url");

  if (graph) {
    const json = JSON.stringify(graph).replace(/</g, "\\u003c");
    html = setTag(
      html,
      /<\/head>/i,
      `<script type="application/ld+json" id="dynamic-seo-schema">${json}</script>\n</head>`,
      "</head>"
    );
  }

  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${shellHtml}</div>`, "#root");
  return html;
};

const writeRoute = (canonicalPath, html, fileOverride) => {
  const target =
    fileOverride ||
    (canonicalPath === "/"
      ? templatePath
      : path.join(distDir, canonicalPath, "index.html"));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html, "utf-8");
  console.log(`✓ ${canonicalPath.padEnd(48)} -> ${path.relative(distDir, target)}`);
};

console.log("⚡ Generating static SEO pages...");

const warnings = [];
const check = (p, title, description) => {
  if (title.length > 65) warnings.push(`${p}: title is ${title.length} chars (>65)`);
  if (description.length > 165) warnings.push(`${p}: description is ${description.length} chars (>165)`);
  if (description.length < 70) warnings.push(`${p}: description is only ${description.length} chars`);
};

/* Static pages */
for (const key of Object.keys(PAGES)) {
  const meta = getPageMeta(key);
  check(key, meta.title, meta.description);
  writeRoute(
    key,
    renderPage({
      canonicalPath: key,
      title: meta.title,
      description: meta.description,
      shellHtml: buildShell[key](),
      graph: buildGraph(key),
    })
  );
}

/* Blog posts */
for (const post of blogs) {
  const key = toCanonicalPath(`/blog/${post.id}`);
  const meta = getPostMeta(post);
  check(key, meta.title, meta.description);
  writeRoute(
    key,
    renderPage({
      canonicalPath: key,
      title: meta.title,
      description: meta.description,
      shellHtml: buildPostShell(post),
      graph: buildGraph(key),
      ogType: "article",
    })
  );
}

/* 404 (served by nginx `error_page 404 /404.html`; noindex, no schema) */
writeRoute(
  "/404/",
  renderPage({
    canonicalPath: "/404/",
    title: `Page not found | ${SITE_NAME}`,
    description: "The page you are looking for does not exist.",
    shellHtml: buildNotFoundShell(),
    graph: null,
    noindex: true,
  }),
  path.join(distDir, "404.html")
);

/* -------------------------------------------------------------------------- */
/* sitemap.xml — only canonical, indexable, 200-OK URLs                       */
/* -------------------------------------------------------------------------- */

const latestPostDate = maxDate(...blogs.map((b) => toIsoDate(b.date)));
const dataFile = "frontend/src/data/portfolioData.js";

const sitemapEntries = [
  { path: "/", lastmod: gitDate(dataFile, "frontend/src/pages/HomeView.jsx") },
  { path: "/work/", lastmod: gitDate(dataFile, "frontend/src/pages/WorkView.jsx") },
  { path: "/blog/", lastmod: maxDate(latestPostDate, gitDate("frontend/src/pages/BlogView.jsx")) },
  { path: "/resume/", lastmod: gitDate("frontend/public/Santusht_Kotai_Resume.pdf", "frontend/src/pages/ResumeView.jsx") },
  { path: "/contact/", lastmod: gitDate("frontend/src/pages/ContactView.jsx") },
  ...blogs.map((b) => ({
    path: toCanonicalPath(`/blog/${b.id}`),
    lastmod: toIsoDate(b.date),
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.path}</loc>
    <lastmod>${e.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf-8");
console.log(`✓ sitemap.xml (${sitemapEntries.length} URLs)`);

/* -------------------------------------------------------------------------- */
/* llms.txt — concise, citable site map for AI answer engines                 */
/* -------------------------------------------------------------------------- */

const llms = `# ${profileData.name}

> ${profileData.name} is a software engineer from ${profileData.location} specializing in backend and distributed systems (FastAPI, PostgreSQL, Redis, Docker, Kubernetes, AWS). Google Summer of Code 2026 contributor at Supabase and founder of Sharexpress Foundation.

## Key pages
- [Home](${absoluteUrl("/")}): ${PAGES["/"].description}
- [Work & projects](${absoluteUrl("/work/")}): ${PAGES["/work/"].description}
- [Engineering blog](${absoluteUrl("/blog/")}): ${PAGES["/blog/"].description}
- [Resume](${absoluteUrl("/resume/")}): ${PAGES["/resume/"].description}
- [Contact](${absoluteUrl("/contact/")}): ${PAGES["/contact/"].description}

## Engineering articles
${blogs.map((b) => `- [${b.title}](${absoluteUrl(`/blog/${b.id}`)}): ${b.subtitle}`).join("\n")}

## Profiles
- [GitHub](https://github.com/santusht06)
- [LinkedIn](https://www.linkedin.com/in/santusht-kotai-8a4454323)
`;
fs.writeFileSync(path.join(distDir, "llms.txt"), llms, "utf-8");
console.log("✓ llms.txt");

if (warnings.length) {
  console.warn("\n⚠ SEO warnings:\n" + warnings.map((w) => `  - ${w}`).join("\n"));
}
console.log("✨ Prerendering complete: metadata, JSON-LD, crawlable HTML, sitemap, llms.txt, 404.");
