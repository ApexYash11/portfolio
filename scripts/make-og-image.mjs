// One-off: convert the intelligence-vs-behavior SVG into a 1200x630 JPG for OG previews.
// Run: node scripts/make-og-image.mjs
import sharp from "sharp";
import { join } from "node:path";

const svgPath = join(process.cwd(), "public/blog/intelligence-vs-behavior.svg");
const outPath = join(process.cwd(), "public/blog/intelligence-vs-behavior-og.jpg");

await sharp(svgPath, { density: 300 })
  .resize(1200, 630, {
    fit: "contain",
    background: "#ffffff",
  })
  .flatten({ background: "#ffffff" })
  .jpeg({ quality: 85 })
  .toFile(outPath);

const meta = await sharp(outPath).metadata();
console.log(`Wrote ${outPath} — ${meta.width}x${meta.height}, type ${meta.format}`);
