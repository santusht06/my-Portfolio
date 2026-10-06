import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_ALT,
  toCanonicalPath,
  buildGraph,
  getPageMeta,
} from "../lib/seoSchema";

/**
 * Runtime SEO head manager (SPA navigation).
 *
 * The first paint for crawlers comes from scripts/prerender.js, which uses the
 * SAME helpers from lib/seoSchema, so the values written here match the static
 * HTML and never "flip" between crawl and render.
 */
export const SEOHead = ({
  title: titleProp,
  description: descriptionProp,
  keywords,
  canonical,
  ogImage = OG_IMAGE,
  ogType = "website",
  noindex = false,
  schema,
}) => {
  const location = useLocation();
  const canonicalPath = toCanonicalPath(canonical || location.pathname);
  const currentUrl = `${SITE_URL}${canonicalPath}`;
  const meta = getPageMeta(canonicalPath);
  const title = titleProp ?? meta?.title;
  const description = descriptionProp ?? meta?.description;

  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (attr, key, value) => {
      if (!value) return;
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    // Standard
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // Canonical
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", currentUrl);

    // Open Graph
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", currentUrl);
    setMeta("property", "og:image", ogImage);
    if (ogImage === OG_IMAGE) {
      setMeta("property", "og:image:width", String(OG_IMAGE_WIDTH));
      setMeta("property", "og:image:height", String(OG_IMAGE_HEIGHT));
      setMeta("property", "og:image:alt", OG_IMAGE_ALT);
    }

    // Twitter
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:url", currentUrl);
    setMeta("name", "twitter:image", ogImage);
    if (ogImage === OG_IMAGE) setMeta("name", "twitter:image:alt", OG_IMAGE_ALT);

    // JSON-LD: explicit schema wins, otherwise derive the page graph from the
    // shared registry. The prerendered <script id="dynamic-seo-schema"> is
    // reused (not duplicated) so there is only ever ONE graph in the document.
    const graph = noindex ? null : schema || buildGraph(canonicalPath);
    let schemaEl = document.getElementById("dynamic-seo-schema");
    if (graph) {
      if (!schemaEl) {
        schemaEl = document.createElement("script");
        schemaEl.id = "dynamic-seo-schema";
        schemaEl.type = "application/ld+json";
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(graph);
    } else if (schemaEl) {
      schemaEl.remove();
    }
  }, [title, description, keywords, canonicalPath, currentUrl, ogImage, ogType, noindex, schema]);

  return null;
};

export default SEOHead;
