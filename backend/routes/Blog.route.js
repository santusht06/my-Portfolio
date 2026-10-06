const express = require("express");
const router = express.Router();
const blogController = require("../controllers/Blog.controller");

// Categories aggregation route (place before :slug to prevent route shadowing)
router.get("/blogs/categories", blogController.getCategories);

// Core CRUD and querying
router.get("/blogs", blogController.getAllBlogs);
router.post("/blogs", blogController.createBlog);
router.get("/blogs/:slug", blogController.getBlogBySlug);
router.put("/blogs/:slug", blogController.updateBlog);
router.delete("/blogs/:slug", blogController.deleteBlog);

// Dynamic user interactions (Like counter)
router.post("/blogs/:slug/like", blogController.likeBlog);

module.exports = router;
