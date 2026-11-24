import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".output");
const outputPublicDir = path.join(outputDir, "public");
const distDir = path.join(root, "dist");

try {
  if (fs.existsSync(outputPublicDir)) {
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    fs.cpSync(outputPublicDir, distDir, { recursive: true });
    console.log("✓ Copied .output/public to dist directory successfully.");
  }

  // Also ensure .output is mirrored or present inside dist if a platform searches dist/.output
  const distOutputDir = path.join(distDir, ".output");
  if (fs.existsSync(outputDir) && !fs.existsSync(distOutputDir)) {
    fs.cpSync(outputDir, distOutputDir, { recursive: true });
    console.log("✓ Mirrored .output inside dist/.output.");
  }
} catch (err) {
  console.warn("Postbuild copy warning:", err);
}
