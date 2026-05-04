import puppeteer from "puppeteer";

const url = process.env.VOICEPOOL_URL || "http://localhost:3502/";

const variants = [
    { branch: "main", out: "src/assets/images/projects/branch-beacon-voicepool-crop.png" },
    { branch: "dev", out: "src/assets/images/projects/branch-beacon-voicepool-crop-dev.png" },
    {
        branch: "feat/dashboard-redesign",
        out: "src/assets/images/projects/branch-beacon-voicepool-crop-feat.png"
    },
    {
        branch: "fix/auth-422",
        out: "src/assets/images/projects/branch-beacon-voicepool-crop-fix.png"
    },
    {
        branch: "chore/deps",
        out: "src/assets/images/projects/branch-beacon-voicepool-crop-chore.png"
    }
];

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 });

await page.setRequestInterception(true);
let currentBranch = "main";
page.on("request", (req) => {
    const u = req.url();
    if (u.includes("/api/dev/git-branch")) {
        req.respond({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ branch: currentBranch })
        });
    } else {
        req.continue();
    }
});

for (const { branch, out } of variants) {
    currentBranch = branch;
    await page.goto(url, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 800));
    // Tighter crop = branch-beacon takes more of the frame when displayed at
    // the same cell width.
    await page.screenshot({
        path: out,
        type: "png",
        clip: { x: 237, y: 0, width: 200, height: 56 }
    });
    console.log(`${url} (branch=${branch}) → ${out}`);
}

await browser.close();
