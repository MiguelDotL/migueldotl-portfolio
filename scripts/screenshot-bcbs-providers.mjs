import puppeteer from "puppeteer";

// Same viewport + retina as screenshot-bcbs-litehouse.mjs so the slider
// rotation is visually consistent. Drives the BCBS LiteHouse component
// library (custom elements: .login-button → lh-slideout → lh-select).
const url = "https://www.bluecrossnc.com/providers/network-participation";
const out = "src/assets/images/projects/bcbs-providers.png";

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1792, height: 1008, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

await page.click(".login-button");
await new Promise((r) => setTimeout(r, 2500));

await page.evaluate(() => {
    const select = document.querySelector("lh-slideout#login-slideout lh-select");
    if (!select) throw new Error("lh-select not found in slideout");
    select.click();
});
await new Promise((r) => setTimeout(r, 1500));

await page.screenshot({ path: out, type: "png", fullPage: false });
console.log(`Captured → ${out}`);

await browser.close();
process.exit(0);
