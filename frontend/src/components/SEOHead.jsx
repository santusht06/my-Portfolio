import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://santusht.online";
const DEFAULT_IMAGE = "https://santusht.online/og-image.webp";

export const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  schema = null,
}) => {
  const rawPath = canonical || location.pathname;
  const normalizedPath = rawPath === "/" ? "/" : rawPath.endsWith("/") ? rawPath : `${rawPath}/`;
  const currentUrl = `${BASE_URL}${normalizedPath}`;

  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // Helper to set meta tags
    const setMetaTag = (selector, attribute, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (selector.startsWith('meta[name=')) {
          el.setAttribute("name", selector.match(/name="([^"]+)"/)?.[1] || "");
        } else if (selector.startsWith('meta[property=')) {
          el.setAttribute("property", selector.match(/property="([^"]+)"/)?.[1] || "");
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', "content", description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', "content", keywords);
    }

    // 3. Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

    // 4. OpenGraph
    setMetaTag('meta[property="og:title"]', "content", title);
    setMetaTag('meta[property="og:description"]', "content", description);
    setMetaTag('meta[property="og:url"]', "content", currentUrl);
    setMetaTag('meta[property="og:image"]', "content", ogImage);

    // 5. Twitter Card
    setMetaTag('meta[name="twitter:title"]', "content", title);
    setMetaTag('meta[name="twitter:description"]', "content", description);
    setMetaTag('meta[name="twitter:url"]', "content", currentUrl);
    setMetaTag('meta[name="twitter:image"]', "content", ogImage);

    // 6. JSON-LD Dynamic Schema
    let dynamicSchemaEl = document.getElementById("dynamic-seo-schema");
    if (schema) {
      if (!dynamicSchemaEl) {
        dynamicSchemaEl = document.createElement("script");
        dynamicSchemaEl.id = "dynamic-seo-schema";
        dynamicSchemaEl.type = "application/ld+json";
        document.head.appendChild(dynamicSchemaEl);
      }
      dynamicSchemaEl.textContent = JSON.stringify(schema);
    } else if (dynamicSchemaEl) {
      dynamicSchemaEl.remove();
    }
  }, [title, description, keywords, currentUrl, ogImage, schema]);

  return null;
};

export default SEOHead;
