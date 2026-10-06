const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    tldr: { type: String, default: "" },
    problem: { type: String, default: "" },
    rootCause: { type: String, default: "" },
    solution: { type: String, default: "" },
    takeaways: [{ type: String }],
  },
  { _id: false }
);

const BlogSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["INCIDENT", "ARCHITECTURE", "BUILD LOG", "DEEP DIVE"],
      default: "DEEP DIVE",
      index: true,
    },
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
    },
    categories: {
      type: [String],
      default: ["Backend"],
      index: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    content: {
      type: String,
      default: "",
    },
    sections: {
      type: SectionSchema,
      default: () => ({}),
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    author: {
      name: { type: String, default: "Santusht Kotai" },
      url: { type: String, default: "https://santusht.online" },
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for search across title, subtitle, and content
BlogSchema.index({
  title: "text",
  subtitle: "text",
  content: "text",
  "sections.tldr": "text",
  "sections.problem": "text",
});

module.exports = mongoose.model("Blog", BlogSchema);
