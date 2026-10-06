const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
config();

const connectDB = require("./lib/db");
const seedBlogs = require("./lib/seedBlogs");

const router = require("./routes/SendMail.route");
const quoteRouter = require("./routes/Quote.route");
const blogRouter = require("./routes/Blog.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://santusht.online"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;

// Routes
app.use("/api/v1", router);
app.use("/api/v1", quoteRouter);
app.use("/api/v1", blogRouter);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is online",
  });
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Auto-seed initial engineering articles if collection is empty
    await seedBlogs();

    app.listen(PORT, () => {
      console.log(`[Express] Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("[Express] Error starting server:", error);
    process.exit(1);
  }
};

startServer();
