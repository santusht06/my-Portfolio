const { createClient } = require("@supabase/supabase-js");
const ws = require("ws");
const { config } = require("dotenv");
const path = require("path");
const fs = require("fs");

config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl =
  process.env.SUPABASE_URL || "https://bcehjzwewfwoalrcuvba.supabase.co";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_dBbibk3qK-DEgDNhMbLxQw_x3satGKo";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { transport: ws },
});

async function migrate() {
  console.log(`🚀 Starting migration of blogs to Supabase Postgres (${supabaseUrl})...`);

  const blogsFilePath = path.resolve(__dirname, "../data/blogs.json");
  if (!fs.existsSync(blogsFilePath)) {
    console.error(`❌ blogs.json not found at: ${blogsFilePath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(blogsFilePath, "utf-8");
  const blogs = JSON.parse(rawData);

  console.log(`📖 Loaded ${blogs.length} articles from blogs.json.`);

  const formattedBlogs = blogs.map((b) => ({
    id: b.id,
    type: b.type || "DEEP DIVE",
    title: b.title,
    subtitle: b.subtitle || "",
    date: b.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    categories: b.categories || ["Backend"],
    read_time: b.readTime || "5 min read",
    content: b.content || "",
    sections: b.sections || {},
    views: b.views || 0,
    likes: b.likes || 0,
    is_published: b.isPublished !== undefined ? b.isPublished : true,
    author: b.author || { name: "Santusht Kotai", url: "https://santusht.online" },
    updated_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from("blogs")
    .upsert(formattedBlogs, { onConflict: "id" })
    .select("id, title");

  if (error) {
    console.error("❌ Migration failed:", error.message);
    if (error.details) console.error("Details:", error.details);
    if (error.hint) console.error("Hint:", error.hint);
    process.exit(1);
  }

  console.log(`✅ Successfully migrated ${data.length} blogs into Supabase Postgres!`);
  data.forEach((item, i) => {
    console.log(`   ${i + 1}. [${item.id}] ${item.title}`);
  });
}

migrate().catch((err) => {
  console.error("Fatal migration error:", err);
  process.exit(1);
});
