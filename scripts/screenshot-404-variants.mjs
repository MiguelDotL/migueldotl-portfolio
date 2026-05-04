import { chromium } from "@playwright/test";

const variants = ["", "b", "c", "d", "e", "c1", "c2", "c3", "c4"];
const browser = await chromium.launch();
const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2
});
const page = await context.newPage();

for (const v of variants) {
    const file = v ? `404-${v}.html` : `404.html`;
    const out = v ? `public/preview-404-${v}.png` : `public/preview-404-a.png`;
    await page.goto(`http://localhost:3000/${file}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: out, type: "png" });
    console.log(`${file} → ${out}`);
}

await browser.close();
