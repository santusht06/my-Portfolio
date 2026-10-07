import manifest from "../data/cloudinaryManifest.json";

/**
 * Returns the secure Cloudinary CDN URL for any uploaded portfolio asset.
 * If not found, gracefully falls back to the original local asset or provided fallback.
 *
 * Example:
 *   getCloudinaryUrl("avatar-anime.webp")
 *   -> "https://res.cloudinary.com/dnay8iqz3/image/upload/v1791356716/santusht-portfolio/avatar-anime.webp"
 */
export const getCloudinaryUrl = (filename, fallback = null) => {
  if (!filename) return fallback;
  const basename = filename.split("/").pop();
  const cleanKey = basename.replace(/\.[^/.]+$/, "");
  return manifest[basename] || manifest[cleanKey] || manifest[filename] || fallback || filename;
};

export { manifest };
export default getCloudinaryUrl;
