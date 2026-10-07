import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlogs, getBlogBySlug, likeBlog } from "@/lib/blogApi";

/**
 * Async thunk to fetch all published blogs & category counts
 */
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (params = { limit: 50, sort: "created_at" }, { rejectWithValue }) => {
    try {
      const data = await getBlogs(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load blogs");
    }
  }
);

/**
 * Async thunk to fetch a single blog post by slug / id
 */
export const fetchBlogBySlugAsync = createAsyncThunk(
  "blogs/fetchBlogBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const blog = await getBlogBySlug(slug);
      if (!blog) {
        return rejectWithValue("Article not found");
      }
      return blog;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load blog post");
    }
  }
);

/**
 * Async thunk to increment likes for a blog post
 */
export const likeBlogAsync = createAsyncThunk(
  "blogs/likeBlog",
  async (slug, { rejectWithValue }) => {
    try {
      const likes = await likeBlog(slug);
      return { slug, likes };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to like blog post");
    }
  }
);

const initialState = {
  items: [],
  categoryCounts: null,
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,

  currentPost: null,
  postStatus: "idle", // "idle" | "loading" | "succeeded" | "failed"
  postError: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
      state.postStatus = "idle";
      state.postError = null;
    },
  },
  extraReducers: (builder) => {
    // 1. fetchBlogs
    builder
      .addCase(fetchBlogs.pending, (state) => {
        if (state.items.length === 0) {
          state.status = "loading";
        }
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.blogs || [];
        if (action.payload.categoryCounts) {
          state.categoryCounts = action.payload.categoryCounts;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch blogs";
      });

    // 2. fetchBlogBySlugAsync
    builder
      .addCase(fetchBlogBySlugAsync.pending, (state, action) => {
        if (!state.currentPost || state.currentPost.id !== action.meta.arg) {
          state.currentPost = null;
          state.postStatus = "loading";
        }
        state.postError = null;
      })
      .addCase(fetchBlogBySlugAsync.fulfilled, (state, action) => {
        state.postStatus = "succeeded";
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogBySlugAsync.rejected, (state, action) => {
        state.postStatus = "failed";
        state.postError = action.payload || "Blog post not found";
      });

    // 3. likeBlogAsync
    builder.addCase(likeBlogAsync.fulfilled, (state, action) => {
      const { slug, likes } = action.payload;
      if (state.currentPost && state.currentPost.id === slug && typeof likes === "number") {
        state.currentPost.likes = likes;
      }
      const item = state.items.find((b) => b.id === slug);
      if (item && typeof likes === "number") {
        item.likes = likes;
      }
    });
  },
});

export const { clearCurrentPost } = blogsSlice.actions;

export const selectBlogs = (state) => state.blogs.items;
export const selectCategoryCounts = (state) => state.blogs.categoryCounts;
export const selectBlogsStatus = (state) => state.blogs.status;
export const selectBlogsError = (state) => state.blogs.error;

export const selectCurrentPost = (state) => state.blogs.currentPost;
export const selectPostStatus = (state) => state.blogs.postStatus;
export const selectPostError = (state) => state.blogs.postError;

export default blogsSlice.reducer;
