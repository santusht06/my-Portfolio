/**
 * Cloudflare Worker Backend for Santusht's Portfolio
 * Replaces on-premise/ground Express server with serverless edge functions.
 * Connects directly to Supabase PostgreSQL at the edge with zero cold starts.
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
  "Access-Control-Max-Age": "86400",
};

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

function formatBlog(blog) {
  if (!blog) return null;
  return {
    ...blog,
    slug: blog.id,
    readTime: blog.read_time || blog.readTime || "5 min read",
    isPublished: blog.is_published !== undefined ? blog.is_published : true,
    createdAt: blog.created_at || blog.createdAt,
    updatedAt: blog.updated_at || blog.updatedAt,
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;
    const isGet = method === "GET" || method === "HEAD";

    // Handle CORS preflight
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    const SUPABASE_URL =
      env.SUPABASE_URL || "https://bcehjzwewfwoalrcuvba.supabase.co";
    const SUPABASE_KEY =
      env.SUPABASE_SERVICE_ROLE_KEY ||
      env.SUPABASE_ANON_KEY ||
      "sb_publishable_dBbibk3qK-DEgDNhMbLxQw_x3satGKo";

    const supabaseHeaders = {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    };

    // Health check
    if (pathname === "/" || pathname === "/test" || pathname === "/api/health") {
      return jsonResponse({
        success: true,
        message: "Portfolio API is online (Cloudflare Edge Worker)",
        runtime: "Cloudflare Workers",
        database: "Supabase PostgreSQL",
        timestamp: new Date().toISOString(),
      });
    }

    try {
      // 1. GET /api/v1/blogs/categories
      if (pathname === "/api/v1/blogs/categories" && isGet) {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/blogs?select=categories&is_published=eq.true`,
          { headers: supabaseHeaders }
        );
        if (!res.ok) {
          return jsonResponse({ success: false, message: "Failed to fetch categories" }, res.status);
        }
        const data = await res.json();
        const counts = {};
        (data || []).forEach((b) => {
          if (Array.isArray(b.categories)) {
            b.categories.forEach((cat) => {
              counts[cat] = (counts[cat] || 0) + 1;
            });
          }
        });

        const categories = Object.entries(counts)
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count);

        const total = data ? data.length : 0;
        return jsonResponse({
          success: true,
          total,
          data: [{ category: "ALL", count: total }, ...categories],
        });
      }

      // 2. GET /api/v1/blogs/:slug
      const singleBlogMatch = pathname.match(/^\/api\/v1\/blogs\/([^/]+)$/);
      if (singleBlogMatch && isGet) {
        const slug = decodeURIComponent(singleBlogMatch[1]);
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/blogs?id=eq.${encodeURIComponent(slug)}&select=*`,
          { headers: supabaseHeaders }
        );

        if (!res.ok) {
          return jsonResponse({ success: false, message: "Failed to fetch blog post" }, res.status);
        }
        const list = await res.json();
        if (!list || list.length === 0) {
          return jsonResponse({ success: false, message: `Blog post '${slug}' not found` }, 404);
        }

        const blog = formatBlog(list[0]);

        // Increment view count via RPC asynchronously in background
        ctx.waitUntil(
          fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_blog_views`, {
            method: "POST",
            headers: supabaseHeaders,
            body: JSON.stringify({ blog_slug: slug }),
          }).catch((err) => console.error("Error incrementing views:", err))
        );

        return jsonResponse({
          success: true,
          data: blog,
        });
      }

      // 3. POST /api/v1/blogs/:slug/like
      const likeMatch = pathname.match(/^\/api\/v1\/blogs\/([^/]+)\/like$/);
      if (likeMatch && method === "POST") {
        const slug = decodeURIComponent(likeMatch[1]);
        const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_blog_likes`, {
          method: "POST",
          headers: supabaseHeaders,
          body: JSON.stringify({ blog_slug: slug }),
        });

        if (res.ok) {
          const likes = await res.json();
          return jsonResponse({
            success: true,
            likes: typeof likes === "number" ? likes : 1,
            message: "Liked successfully",
          });
        }

        return jsonResponse({ success: false, message: "Failed to increment like" }, 400);
      }

      // 4. GET /api/v1/blogs (List & Search & Filter)
      if (pathname === "/api/v1/blogs" && isGet) {
        const searchParams = url.searchParams;
        const category = searchParams.get("category");
        const type = searchParams.get("type");
        const search = searchParams.get("search") || searchParams.get("q");
        const sort = searchParams.get("sort") || "created_at";
        const limit = parseInt(searchParams.get("limit") || "50", 10);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const offset = (page - 1) * limit;

        let query = `${SUPABASE_URL}/rest/v1/blogs?select=*&is_published=eq.true`;

        if (category && category !== "ALL") {
          query += `&categories=cs.{${encodeURIComponent(category)}}`;
        }
        if (type) {
          query += `&type=eq.${encodeURIComponent(type.toUpperCase())}`;
        }
        if (search && search.trim().length > 0) {
          const term = encodeURIComponent(`*${search.trim()}*`);
          query += `&or=(title.ilike.${term},subtitle.ilike.${term},content.ilike.${term})`;
        }

        const sortCol = sort === "views" ? "views.desc" : "created_at.desc";
        query += `&order=${sortCol}&limit=${limit}&offset=${offset}`;

        // Fetch blogs + category stats in parallel
        const [blogsRes, countsRes] = await Promise.all([
          fetch(query, {
            headers: {
              ...supabaseHeaders,
              Prefer: "count=exact",
            },
          }),
          fetch(
            `${SUPABASE_URL}/rest/v1/blogs?select=categories&is_published=eq.true`,
            { headers: supabaseHeaders }
          ),
        ]);

        if (!blogsRes.ok) {
          return jsonResponse({ success: false, message: "Failed to fetch blogs" }, blogsRes.status);
        }

        const rawBlogs = await blogsRes.json();
        const contentRange = blogsRes.headers.get("content-range") || "";
        const totalMatch = contentRange.match(/\/(\d+)$/);
        const total = totalMatch ? parseInt(totalMatch[1], 10) : rawBlogs.length;

        const blogs = (rawBlogs || []).map(formatBlog);

        const categoryCounts = { ALL: total };
        if (countsRes.ok) {
          const allCategories = await countsRes.json();
          categoryCounts.ALL = allCategories.length;
          allCategories.forEach((b) => {
            if (Array.isArray(b.categories)) {
              b.categories.forEach((cat) => {
                categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
              });
            }
          });
        }

        return jsonResponse({
          success: true,
          count: blogs.length,
          total,
          page,
          totalPages: Math.ceil(total / limit) || 1,
          categoryCounts,
          data: blogs,
        });
      }

      // 5. GET /api/v1/quote
      if (pathname === "/api/v1/quote" && isGet) {
        try {
          const quoteRes = await fetch("https://zenquotes.io/api/random");
          if (quoteRes.ok) {
            const data = await quoteRes.json();
            if (Array.isArray(data) && data.length > 0) {
              return jsonResponse({
                success: true,
                quote: data[0].q,
                author: data[0].a,
              });
            }
          }
        } catch {
          // Fallback quote
        }

        return jsonResponse({
          success: true,
          quote: "Talk is cheap. Show me the code.",
          author: "Linus Torvalds",
        });
      }

      // 6. POST /api/v1/sendmail (Contact form)
      if (pathname === "/api/v1/sendmail" && method === "POST") {
        const body = await request.json().catch(() => ({}));
        const { name, email, message } = body;

        if (!name || !email || !message) {
          return jsonResponse(
            { success: false, message: "Name, email, and message are required" },
            400
          );
        }

        // Store contact inquiry in Supabase if table exists
        ctx.waitUntil(
          fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
            method: "POST",
            headers: supabaseHeaders,
            body: JSON.stringify({
              name,
              email,
              phone: body.phone || "",
              message,
              created_at: new Date().toISOString(),
            }),
          }).catch(() => {})
        );

        return jsonResponse({
          success: true,
          message: "Message received successfully",
        });
      }

      // 404 for unknown endpoints
      return jsonResponse(
        {
          success: false,
          message: `Endpoint ${method} ${pathname} not found on Cloudflare Worker`,
        },
        404
      );
    } catch (err) {
      console.error("[Worker Error]:", err);
      return jsonResponse(
        {
          success: false,
          message: "Internal worker error",
          error: err.message,
        },
        500
      );
    }
  },
};
