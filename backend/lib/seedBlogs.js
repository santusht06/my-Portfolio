const Blog = require("../models/Blog.model");
const initialBlogs = require("../data/blogs.json");

/**
 * Automatically seeds the database with initial engineering articles
 * if the collection is empty.
 */
const seedBlogs = async () => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log(`[MongoDB] No blogs found in DB. Seeding ${initialBlogs.length} initial engineering articles...`);
      await Blog.insertMany(initialBlogs);
      console.log("[MongoDB] Blogs seeded successfully!");
    } else {
      console.log(`[MongoDB] Existing blogs collection found with ${count} articles. Ready.`);
    }
  } catch (error) {
    console.error("[MongoDB] Error seeding blogs:", error.message);
  }
};

module.exports = seedBlogs;
