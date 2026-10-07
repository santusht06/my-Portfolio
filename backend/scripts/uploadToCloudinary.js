const path = require("path");
const fs = require("fs");
const { config } = require("dotenv");

config({ path: path.resolve(__dirname, "../.env") });

const cloudinary = require("../lib/cloudinary");

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error("❌ Error: Cloudinary credentials missing in backend/.env.");
  console.log("Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env.");
  process.exit(1);
}

const PICTURES_DIR = path.resolve(__dirname, "../../frontend/src/assets/Pictures");
const PUBLIC_DIR = path.resolve(__dirname, "../../frontend/public");
const OUTPUT_MANIFEST = path.resolve(__dirname, "../../frontend/src/data/cloudinaryManifest.json");

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"];

function getImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    })
    .map((file) => path.join(dir, file));
}

async function uploadAllImages() {
  console.log(`☁️  Connecting to Cloudinary (${CLOUD_NAME})...`);

  const pictureFiles = getImageFiles(PICTURES_DIR);
  const publicImages = getImageFiles(PUBLIC_DIR);
  const allImages = [...pictureFiles, ...publicImages];

  console.log(`📁 Found ${allImages.length} images to upload.`);

  const manifest = {};
  let successCount = 0;

  for (const filePath of allImages) {
    const filename = path.basename(filePath);
    const ext = path.extname(filename);
    const cleanName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, "_");

    try {
      console.log(`⏳ Uploading ${filename}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "santusht-portfolio",
        public_id: cleanName,
        overwrite: true,
        resource_type: "auto",
      });

      manifest[filename] = result.secure_url;
      manifest[cleanName] = result.secure_url;
      successCount++;
      console.log(`   ✅ ${filename} -> ${result.secure_url}`);
    } catch (err) {
      console.error(`   ❌ Failed to upload ${filename}:`, err.message);
    }
  }

  // Save manifest
  fs.writeFileSync(OUTPUT_MANIFEST, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`\n🎉 Upload complete! ${successCount}/${allImages.length} images uploaded.`);
  console.log(`💾 Saved Cloudinary manifest to: ${OUTPUT_MANIFEST}`);
}

uploadAllImages().catch((err) => {
  console.error("Fatal upload error:", err);
  process.exit(1);
});
