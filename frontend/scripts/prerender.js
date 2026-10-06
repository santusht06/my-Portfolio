import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf-8");

import { blogs } from "../src/data/portfolioData.js";

const routes = [
  {
    path: "/",
    title: "Santusht Kotai | Software Engineer & Systems Architect",
    description: "Backend and distributed systems engineer specializing in FastAPI, PostgreSQL, Redis, Docker, and Kubernetes. GSoC contributor to Supabase.",
    heading: "Santusht Kotai",
    content: "Living between terminal windows, lofi beats, and real-world wonder — crafting things that work silently so life can happen loudly.",
  },
  {
    path: "/work",
    title: "Engineering Experience & Systems Projects | Santusht Kotai",
    description: "Explore production backend engineering, distributed architectures, AWS microservices, and Supabase open-source contributions by Santusht Kotai.",
    heading: "Engineering & Experience",
    content: "Production systems, distributed architectures, open-source work, and key milestones. Featuring work at 47 Billion, Sharexpress Foundation, and Supabase.",
  },
  {
    path: "/blog",
    title: "Engineering Blog & Systems Post-Mortems | Santusht Kotai",
    description: "Real engineering problems, post-mortems, architectural decision records (ADRs), and deep dives from building production systems by Santusht Kotai.",
    heading: "Engineering Blog & Field Notes",
    content: "Deep technical articles covering FastAPI production architectures, self-hosted mail servers, non-root Docker sandboxes, and PostgreSQL query optimization.",
  },
  {
    path: "/resume",
    title: "Resume & Qualifications | Santusht Kotai",
    description: "View and download the professional software engineer resume of Santusht Kotai. Backend development, distributed systems, FastAPI, and Supabase GSoC.",
    heading: "Santusht Kotai Resume",
    content: "Official curriculum vitae and qualifications of Santusht Kotai. Hands-on experience with FastAPI, AWS, Docker, Kubernetes, and distributed systems.",
  },
  {
    path: "/contact",
    title: "Contact & Work Inquiries | Santusht Kotai",
    description: "Get in touch with Santusht Kotai for backend engineering roles, distributed systems consulting, API development, or collaborations.",
    heading: "Get in Touch",
    content: "Contact Santusht Kotai for software engineering roles, distributed systems consulting, or technical collaborations. Direct email: santushtkotai1221@gmail.com.",
  },
  ...blogs.map((b) => ({
    path: `/blog/${b.id}`,
    title: `${b.title} — Santusht Kotai`,
    description: b.subtitle,
    heading: b.title,
    content: b.content,
  })),
];

console.log("⚡ Generating SSG prerendered static pages...");

routes.forEach((route) => {
  let html = template;
  const canonicalUrl = `https://santusht.online${route.path === "/" ? "/" : route.path + "/"}`;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OpenGraph & Twitter
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content=".*?" \/>/i,
    `<meta name="twitter:url" content="${canonicalUrl}" />`
  );

  // Pre-seed crawlable, standard semantic HTML inside <noscript> for search engine bots without causing visual FOUC for users
  const preRenderedContent = `
    <div id="root"></div>
    <noscript>
      <header>
        <nav aria-label="Primary Navigation">
          <a href="/">Home</a>
          <a href="/work">Work</a>
          <a href="/blog">Blog</a>
          <a href="/resume">Resume</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main>
        <h1>${route.heading}</h1>
        <p>${route.content}</p>
      </main>
    </noscript>
  `.trim();

  html = html.replace('<div id="root"></div>', preRenderedContent);

  // Write file
  let targetFile;
  if (route.path === "/") {
    targetFile = templatePath;
  } else {
    const routeDir = path.join(distDir, route.path);
    fs.mkdirSync(routeDir, { recursive: true });
    targetFile = path.join(routeDir, "index.html");
  }

  fs.writeFileSync(targetFile, html, "utf-8");
  console.log(`✓ Prerendered SSG: ${route.path} -> ${path.relative(distDir, targetFile)}`);
});

console.log("✨ Prerendering complete! All SEO routes generated with full semantic HTML & metadata.");
