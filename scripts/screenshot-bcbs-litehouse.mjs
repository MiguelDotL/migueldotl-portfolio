import puppeteer from "puppeteer";

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

const browser = await puppeteer.launch();
const page = await browser.newPage();
// 16:9 viewport at 2x retina to match the FeaturedProjectCard image area.
await page.setViewport({ width: 1792, height: 1008, deviceScaleFactor: 2 });

for (const { url, out } of targets) {
    await page.goto(url, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: out, type: "png", fullPage: false });
    console.log(`${url} → ${out}`);
}

await browser.close();
