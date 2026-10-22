/**
 * Returns the cover image URL for a blog post.
 * Prefers explicitly provided cover images from Supabase, then falls back to
 * the high-resolution bespoke SVG diagrams in /blog-covers/[slug].svg,
 * and finally to the default /og-image.jpg.
 */
export const getBlogCoverImage = (blog) => {
  if (!blog) return "/og-image.jpg";
  if (blog.image && typeof blog.image === "string") return blog.image;
  if (blog.cover_image && typeof blog.cover_image === "string") return blog.cover_image;
  if (blog.coverImage && typeof blog.coverImage === "string") return blog.coverImage;

  const slug = blog.id || blog.slug;
  if (slug) {
    return `/blog-covers/${slug}.svg`;
  }
  return "/og-image.jpg";
};

export default getBlogCoverImage;
