import puppeteer from "puppeteer";

const url = process.env.VOICEPOOL_URL || "http://localhost:3502/";
const out = "src/assets/images/projects/voicepool.png";

// Realistic-looking mock fleet — varied tiers, usage levels, labels.
const day = 86_400;
const now = Math.floor(Date.now() / 1000);
const mockAccounts = [
    {
        id: 1,
        label: "production-main",
        created_at: "2024-08-15T14:22:00.000Z",
        usage: {
            character_count: 18_400,
            character_limit: 100_000,
            next_reset_unix: now + 12 * day,
            tier: "creator",
            status: "active",
            fetched_at: new Date().toISOString()
        }
    },
    {
        id: 2,
        label: "podcast-network",
        created_at: "2024-09-02T10:08:00.000Z",
        usage: {
            character_count: 245_000,
            character_limit: 500_000,
            next_reset_unix: now + 6 * day,
            tier: "pro",
            status: "active",
            fetched_at: new Date().toISOString()
        }
    },
    {
        id: 3,
        label: "ai-assistant-dev",
        created_at: "2024-09-20T18:41:00.000Z",
        usage: {
            character_count: 4_200,
            character_limit: 10_000,
            next_reset_unix: now + 3 * day,
            tier: "free",
            status: "active",
            fetched_at: new Date().toISOString()
        }
    },
    {
        id: 4,
        label: "marketing-promo",
        created_at: "2024-10-05T09:15:00.000Z",
        usage: {
            character_count: 67_500,
            character_limit: 100_000,
            next_reset_unix: now + 18 * day,
            tier: "creator",
            status: "active",
            fetched_at: new Date().toISOString()
        }
    },
    {
        id: 5,
        label: "audiobook-pipeline",
        created_at: "2024-12-01T07:30:00.000Z",
        usage: {
            character_count: 412_000,
            character_limit: 500_000,
            next_reset_unix: now + 9 * day,
            tier: "pro",
            status: "active",
            fetched_at: new Date().toISOString()
        }
    },
    {
        id: 6,
        label: "content-team-shared",
        created_at: "2024-11-10T16:00:00.000Z",
        usage: {
            character_count: 1_980_000,
            character_limit: 2_000_000,
            next_reset_unix: now + 1 * day,
            tier: "scale",
            status: "active",
            fetched_at: new Date().toISOString()
        }
    }
];

const browser = await puppeteer.launch();
const page = await browser.newPage();
// Smaller 16:9 viewport so Voicepool's centered table fills more relative
// width — less padding on the sides in the final image.
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

await page.setRequestInterception(true);
page.on("request", (req) => {
    const u = req.url();
    if (u.endsWith("/api/accounts") || u.includes("/api/accounts?")) {
        req.respond({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(mockAccounts)
        });
    } else if (u.endsWith("/api/accounts/refresh")) {
        req.respond({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ refreshed: mockAccounts.length })
        });
    } else {
        req.continue();
    }
});

await page.goto(url, { waitUntil: "networkidle2" });
// Brief settle so the React app renders the mocked rows + any animations land.
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: out, type: "png", fullPage: false });
console.log(`${url} (mocked) → ${out}`);

await browser.close();
