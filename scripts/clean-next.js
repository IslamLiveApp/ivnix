/**
 * Removes `.next` so the next dev/build picks up CSS/layout changes reliably.
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), ".next");
if (fs.existsSync(dir)) {
  fs.rmSync(dir, { recursive: true, force: true });
  console.log("Removed .next");
}
