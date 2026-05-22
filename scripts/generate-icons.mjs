import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = path.join(root, "public", "ivnix_icon.svg");

async function png(size) {
  return sharp(svgPath).resize(size, size).png().toBuffer();
}

const appDir = path.join(root, "src", "app");

await mkdir(appDir, { recursive: true });

await sharp(svgPath).resize(512, 512).png().toFile(path.join(appDir, "icon.png"));
await sharp(svgPath).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));

const faviconIco = await pngToIco([await png(16), await png(32), await png(48)]);
await writeFile(path.join(appDir, "favicon.ico"), faviconIco);

console.log("Generated app/icon.png, app/apple-icon.png, app/favicon.ico");
