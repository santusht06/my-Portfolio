/**
 * Blog API Client
 * Connects exclusively to the Cloudflare Worker Backend API.
 * The frontend never communicates directly with the database.
 */

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

const formatBlog = (blog) => {
  if (!blog) return null;
  return {
    ...blog,
    slug: blog.id,
    readTime: blog.read_time || blog.readTime || "5 min read",
    isPublished: blog.is_published !== undefined ? blog.is_published : true,
    createdAt: blog.created_at || blog.createdAt,
    updatedAt: blog.updated_at || blog.updatedAt,
  };
};

/**
 * Fetch all published blogs via Cloudflare Worker backend API
 * GET /api/v1/blogs
 */
export async function getBlogs({ limit = 50, sort = "created_at" } = {}) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/blogs?limit=${limit}&sort=${sort}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return {
          blogs: json.data.map(formatBlog),
          categoryCounts: json.categoryCounts || null,
        };
      }
    }
  } catch (err) {
    console.error("[Blog API] Error fetching blogs from backend worker:", err);
  }

  return { blogs: [], categoryCounts: null };
}

/**
 * Fetch a single blog by ID / slug via Cloudflare Worker backend API
 * GET /api/v1/blogs/:slug
 */
export async function getBlogBySlug(slug) {
  if (!slug) return null;

  try {
    const res = await fetch(`${API_BASE}/api/v1/blogs/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return formatBlog(json.data);
      }
    }
  } catch (err) {
    console.error("[Blog API] Error fetching blog from backend worker:", slug, err);
  }

  return null;
}

/**
 * Increment blog likes counter via Cloudflare Worker backend API
 * POST /api/v1/blogs/:slug/like
 */
export async function likeBlog(slug) {
  if (!slug) return null;

  try {
    const res = await fetch(
      `${API_BASE}/api/v1/blogs/${encodeURIComponent(slug)}/like`,
      { method: "POST" }
    );
    if (res.ok) {
      const json = await res.json();
      if (json.success && typeof json.likes === "number") {
        return json.likes;
      }
    }
  } catch (err) {
    console.error("[Blog API] Error liking blog on backend worker:", slug, err);
  }

  return null;
}
