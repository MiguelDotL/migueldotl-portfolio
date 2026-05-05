import { chromium } from "@playwright/test";

const url = process.env.PA_URL || "http://localhost:5173";
const outDir = "src/assets/images/projects";

// Synthetic projects across the pipeline's stages. Generic placeholder names
// only — never reuse real pattern titles from the live channel. Titles
// follow the "The X Y" structure of real entries so screenshots read as a
// working dashboard, not a stub.
const mockProjects = [
    { stage: "broll_ready", n: 1, title: "The Open Door" },
    { stage: "built", n: 2, title: "The Quiet Echo" },
    { stage: "complete", n: 3, title: "The First Pause" },
    { stage: "complete", n: 4, title: "The Steady Beat" },
    { stage: "posted", n: 5, title: "The Slow Climb" },
    { stage: "posted", n: 6, title: "The Bright Signal" },
    { stage: "posted", n: 7, title: "The Calm Before" },
    { stage: "posted", n: 8, title: "The Soft Reset" },
    { stage: "posted", n: 9, title: "The Long Wait" },
    { stage: "posted", n: 10, title: "The Final Take" },
    { stage: "posted", n: 11, title: "The Last Chapter" },
    { stage: "failed", n: 12, title: "The Second Glance" }
].map(({ stage, n, title }) => ({
    project_id: String(n).padStart(4, "0"),
    project_name: `sample_pattern_${String(n).padStart(2, "0")}`,
    project_dir: `/tmp/projects/${String(n).padStart(4, "0")}_sample_pattern_${String(n).padStart(2, "0")}`,
    dir_name: `${String(n).padStart(4, "0")}_sample_pattern_${String(n).padStart(2, "0")}`,
    stage,
    config: {
        format: "short",
        pattern_number: n,
        pattern_name: title,
        category: "Demo Category",
        script: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        broll_queries: ["abstract neutral", "soft lighting indoor", "calm landscape"],
        thumbnail: { headline: "DEMO HEADLINE", subhead: "Subhead text" },
        youtube: { title: title, description: "Demo description for portfolio screenshot.", tags: ["demo", "sample"] },
        instagram: { caption: "Demo caption" },
        tiktok: { caption: "Demo caption" }
    }
}));

const projectsById = Object.fromEntries(mockProjects.map((p) => [p.project_id, p]));

const browser = await chromium.launch();
const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
});
const page = await context.newPage();

await page.route("**/*", (route) => {
    const u = new URL(route.request().url());
    const reqPath = u.pathname;

    // Mock the projects list
    if (reqPath === "/api/projects") {
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(mockProjects)
        });
    }

    // Mock pairs list with 4 newly-paired entries (status='paired') so
    // the autopilot banner reads "1 actively building of 5 in flight".
    if (reqPath === "/api/pairs") {
        const newPairs = Array.from({ length: 4 }, (_, i) => {
            const idx = i + 13;
            const projectId = String(idx).padStart(4, "0");
            return {
                id: idx,
                audio_file: `${projectId}_pending.mp3`,
                config_file: `${projectId}_pending.json`,
                config_name: null,
                status: "paired",
                project_id: projectId
            };
        });
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(newPairs)
        });
    }

    // Mock individual project lookups (used by Wizard)
    const projMatch = reqPath.match(/^\/api\/projects\/([^/]+)$/);
    if (projMatch) {
        const id = projMatch[1];
        const proj = projectsById[id];
        if (proj) {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(proj)
            });
        }
    }

    // Mock the YouTube uploaded-videos list (Library's "Uploaded" section).
    // 5 entries total: 3 scheduled (private, future scheduled_at) + 2
    // posted (public). Generic titles only.
    if (reqPath === "/api/youtube/videos") {
        const entries = [
            { title: "The Open Door", scheduled: true, daysOffset: 3 },
            { title: "The Quiet Echo", scheduled: true, daysOffset: 2 },
            { title: "The First Pause", scheduled: true, daysOffset: 1 },
            { title: "The Steady Beat", scheduled: false, daysOffset: -1 },
            { title: "The Slow Climb", scheduled: false, daysOffset: -2 }
        ];
        const now = Date.now();
        const mockVideos = entries.map(({ title, scheduled, daysOffset }, i) => {
            const projectId = String(i + 1).padStart(4, "0");
            const at = new Date(now + daysOffset * 86400000).toISOString();
            return {
                video_id: `mock_video_${projectId}`,
                title,
                url: `https://example.com/watch?v=mock_${projectId}`,
                thumbnail: "",
                published_at: at,
                view_count: scheduled ? 0 : 80 + i * 47,
                like_count: scheduled ? 0 : 4 + i * 3,
                privacy_status: scheduled ? "private" : "public",
                scheduled_at: scheduled ? at : undefined,
                project_id: projectId,
                pattern_name: title,
                pattern_number: i + 1,
                tags: ["demo", "sample"],
                fetched_at: new Date().toISOString(),
                local_thumbnail: ""
            };
        });
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                connected: true,
                videos: mockVideos,
                last_synced: new Date().toISOString()
            })
        });
    }

    // Mock build-progress endpoints with a partial-progress payload so the
    // queue rows render their progress bars.
    if (reqPath.match(/\/build-progress$/)) {
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ stage: "building", overall_pct: 58, sub_stage: "pass2" })
        });
    }
    if (reqPath.match(/\/broll-progress$/)) {
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ stage: "broll", overall_pct: 65 })
        });
    }

    // Mock worker status so the building project shows as actively
    // running (active_project_ids → 'active' rowState → green sub-line
    // with segmented progress bar in the queue row).
    if (reqPath === "/api/worker/status") {
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                running: true,
                active: ["0001"],
                active_project_ids: ["0001"],
                queued: 2,
                completed: [],
                failed: [],
                cancelled: []
            })
        });
    }

    // Pass everything else through (youtube/status, etc.)
    route.continue();
});

const shots = [
    { name: "pattern-archive-dashboard.png", route: "/", waitMs: 1500 },
    { name: "pattern-archive-library.png", route: "/library", waitMs: 1500 },
    { name: "pattern-archive-wizard-editor.png", route: "/wizard/0001/editor", waitMs: 1500 },
    { name: "pattern-archive-wizard-build.png", route: "/wizard/0001/build", waitMs: 1500 }
];

for (const { name, route, waitMs } of shots) {
    await page.goto(`${url}${route}`, { waitUntil: "networkidle" });
    await new Promise((r) => setTimeout(r, waitMs));
    // Library page caps the "Uploaded" list height with overflow-y:auto
    // (3 rows collapsed, ~viewport when expanded). Inject a style override
    // so the entire list renders inline, then fullPage captures all rows.
    if (route === "/library") {
        await page.addStyleTag({
            content: `[data-testid="uploaded-videos-scroll"] {
                max-height: none !important;
                overflow: visible !important;
            }`
        });
        await new Promise((r) => setTimeout(r, 400));
    }
    const out = `${outDir}/${name}`;
    await page.screenshot({ path: out, type: "png", fullPage: true });
    console.log(`${url}${route} → ${out}`);
}

await browser.close();
