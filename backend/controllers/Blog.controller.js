const Blog = require("../models/Blog.model");

/**
 * GET /api/v1/blogs
 * Retrieve all published blogs with dynamic filtering, search, pagination, and category counts
 */
exports.getAllBlogs = async (req, res) => {
  try {
    const { category, type, search, q, page = 1, limit = 50, sort = "createdAt" } = req.query;

    const filter = { isPublished: true };

    // Filter by Category
    if (category && category !== "ALL") {
      filter.categories = { $in: [category] };
    }

    // Filter by Type (INCIDENT, ARCHITECTURE, BUILD LOG, DEEP DIVE)
    if (type) {
      filter.type = type.toUpperCase();
    }

    // Search query across title, subtitle, content
    const searchTerm = search || q;
    if (searchTerm && searchTerm.trim().length > 0) {
      const regex = new RegExp(searchTerm.trim(), "i");
      filter.$or = [
        { title: regex },
        { subtitle: regex },
        { content: regex },
        { "sections.tldr": regex },
        { "sections.problem": regex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Fetch blogs and total count matching filter
    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Blog.countDocuments(filter),
    ]);

    // Dynamic category aggregation across all published blogs
    const categoryStats = await Blog.aggregate([
      { $match: { isPublished: true } },
      { $unwind: "$categories" },
      { $group: { _id: "$categories", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const totalPublished = await Blog.countDocuments({ isPublished: true });
    const categoryCounts = { ALL: totalPublished };
    categoryStats.forEach((c) => {
      categoryCounts[c._id] = c.count;
    });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      categoryCounts,
      data: blogs,
    });
  } catch (error) {
    console.error("Error in getAllBlogs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve blogs",
      error: error.message,
    });
  }
};

/**
 * GET /api/v1/blogs/categories
 * Get all available categories with article counts dynamically from MongoDB
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { isPublished: true } },
      { $unwind: "$categories" },
      { $group: { _id: "$categories", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
      { $sort: { count: -1 } },
    ]);

    const total = await Blog.countDocuments({ isPublished: true });

    return res.status(200).json({
      success: true,
      total,
      data: [{ category: "ALL", count: total }, ...categories],
    });
  } catch (error) {
    console.error("Error in getCategories:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
      error: error.message,
    });
  }
};

/**
 * GET /api/v1/blogs/:slug
 * Retrieve a single blog post by its slug (or _id) and atomically increment view count
 */
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Atomically find and increment views
    let blog = await Blog.findOneAndUpdate(
      { id: slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    // Fallback search by Mongo ObjectId if not matched by slug id
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findOneAndUpdate(
        { _id: slug, isPublished: true },
        { $inc: { views: 1 } },
        { new: true }
      ).lean();
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog post with slug '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error in getBlogBySlug:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve blog post",
      error: error.message,
    });
  }
};

/**
 * POST /api/v1/blogs/:slug/like
 * Dynamic interaction: Increment the like counter for a blog post in MongoDB
 */
exports.likeBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOneAndUpdate(
      { id: slug, isPublished: true },
      { $inc: { likes: 1 } },
      { new: true, select: "id likes title" }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog post '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      likes: blog.likes,
      message: "Liked successfully",
    });
  } catch (error) {
    console.error("Error in likeBlog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to like blog post",
      error: error.message,
    });
  }
};

/**
 * POST /api/v1/blogs
 * Create a new blog post in MongoDB
 */
exports.createBlog = async (req, res) => {
  try {
    const { title, subtitle, categories, content, sections, type, readTime, id } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // Auto-generate slug ID if not provided
    const slugId =
      id ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Check if ID already exists
    const existing = await Blog.findOne({ id: slugId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Blog with slug '${slugId}' already exists`,
      });
    }

    const blog = new Blog({
      id: slugId,
      type: type || "DEEP DIVE",
      title,
      subtitle: subtitle || "",
      categories: Array.isArray(categories) ? categories : ["Backend"],
      readTime: readTime || "5 min read",
      content: content || "",
      sections: sections || {},
    });

    await blog.save();

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error in createBlog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create blog post",
      error: error.message,
    });
  }
};

/**
 * PUT /api/v1/blogs/:slug
 * Update an existing blog post in MongoDB
 */
exports.updateBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const updatedBlog = await Blog.findOneAndUpdate(
      { id: slug },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: `Blog post '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error in updateBlog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update blog post",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/v1/blogs/:slug
 * Delete a blog post from MongoDB
 */
exports.deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await Blog.findOneAndDelete({ id: slug });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Blog post '${slug}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog post",
      error: error.message,
    });
  }
};
