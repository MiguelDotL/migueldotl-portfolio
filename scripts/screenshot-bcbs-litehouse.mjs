import { chromium } from "@playwright/test";

const targets = [
    {
        url: "https://www.bluecrossnc.com/",
        out: "src/assets/images/projects/bcbs-main.png"
    },
    {
        url: "https://www.bluecrossnc.com/members/vision",
        out: "src/assets/images/projects/bcbs-litehouse.png"
    }
];

const browser = await chromium.launch();
const context = await browser.newContext({
    // 16:9 viewport at 2x retina to match the FeaturedProjectCard image area.
    viewport: { width: 1792, height: 1008 },
    deviceScaleFactor: 2
});
const page = await context.newPage();

for (const { url, out } of targets) {
    await page.goto(url, { waitUntil: "networkidle" });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: out, type: "png", fullPage: false });
    console.log(`${url} → ${out}`);
}

await browser.close();
