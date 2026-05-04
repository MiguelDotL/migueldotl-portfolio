import { chromium } from "@playwright/test";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = "file://" + path.resolve(__dirname, "branch-beacon-callout.html");
const out = "src/assets/images/projects/branch-beacon.png";

const browser = await chromium.launch();
const context = await browser.newContext({
    // Match the FeaturedProjectCard aspect ratio (16:9), retina.
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2
});
const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: out, type: "png", fullPage: false });
console.log(`${url} → ${out}`);

await browser.close();
