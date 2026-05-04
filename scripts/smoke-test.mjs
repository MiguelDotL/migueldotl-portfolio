// Puppeteer smoke-test against the prod preview at http://localhost:4174.
// Renders the page, waits for lazy chunks to mount, then asserts on the
// fully-hydrated HTML via page.content(). Exit code 0 = all pass.

import puppeteer from 'puppeteer';

const URL = 'http://localhost:4174/';
const checks = [];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

const consoleErrors = [];
page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message));

await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });

// Wait for all three lazy chunks to mount.
await page.waitForSelector('#skills h2', { timeout: 5000 });
await page.waitForSelector('#projects h2', { timeout: 5000 });
await page.waitForSelector('#contact', { timeout: 5000 });
await page.waitForSelector('.skills-slider .item i.devicon', { timeout: 5000 });
await page.waitForSelector('.momentum-tab', { timeout: 5000 });

// Click the third tab (Personal) to verify tab interactivity.
const tabs = await page.$$('.momentum-tab');
if (tabs.length === 3) await tabs[2].click();
await new Promise((r) => setTimeout(r, 800));

const html = await page.content();
// Tabs: count `<button` whose role="tab" attribute set is in MomentumTabs.
const tabCount = (html.match(/role="tab"\s+aria-selected/g) || []).length;
// Skill items: count <div class="item"> wrappers (multiplied by carousel
// clones — react-multi-carousel renders [end-clones, originals, start-clones]
// so any positive count proves the carousel populated).
const skillItemCount = (html.match(/<div class="item">/g) || []).length;

checks.push({ name: 'Hero h1 contains greeting',     pass: /Hi, I&#x27;m Miguel/.test(html) || /Hi, I'm Miguel/.test(html) });
checks.push({ name: 'NavBar brand renders',          pass: /MIGUEL/.test(html) });
checks.push({ name: 'Skills h2 present',             pass: /<h2>Skills<\/h2>/.test(html) });
checks.push({ name: 'Skills carousel populated',     pass: skillItemCount > 0 });
checks.push({ name: 'Projects h2 present',           pass: /<h2>Projects<\/h2>/.test(html) });
checks.push({ name: 'MomentumTabs renders 3 tabs',   pass: tabCount === 3, detail: 'got ' + tabCount });
checks.push({ name: 'Personal tab content rendered', pass: /featured-project-image/.test(html) });
checks.push({ name: 'Contact section present',       pass: /id="contact"/.test(html) });
checks.push({ name: 'ContactForm fields present',    pass: /name="firstName"/.test(html) && /name="message"/.test(html) });
checks.push({
    name: 'No console errors',
    pass: consoleErrors.length === 0,
    detail: consoleErrors.join('; ').slice(0, 300)
});

await browser.close();

let passed = 0;
for (const c of checks) {
    const mark = c.pass ? '+' : '-';
    console.log(`${mark} ${c.name}${c.pass ? '' : ' :: ' + (c.detail || '')}`);
    if (c.pass) passed++;
}
console.log(`\n${passed}/${checks.length} checks passed`);
process.exit(passed === checks.length ? 0 : 1);
