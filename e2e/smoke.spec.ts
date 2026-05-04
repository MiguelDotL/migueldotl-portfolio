import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
    test('home page loads with expected title', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Miguel/i);
    });

    const sections = ['home', 'skills', 'projects', 'contact'];
    for (const id of sections) {
        test(`nav anchor scrolls #${id} into view`, async ({ page }) => {
            await page.goto('/');
            // Wait for the target section to be in the DOM before clicking — ensures
            // React has finished mounting all sections so the anchor scroll fires.
            await page.waitForFunction((sectionId) => document.getElementById(sectionId) !== null, id);
            const link = page.locator(`nav a[href="#${id}"]`).first();
            await expect(link).toBeVisible();
            await link.click();
            // Wait for smooth-scroll to complete before asserting viewport position.
            await page.waitForFunction((sectionId) => {
                const el = document.getElementById(sectionId);
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.top < window.innerHeight * 0.5;
            }, id, { timeout: 10000 });
            const section = page.locator(`#${id}`);
            await expect(section).toBeInViewport({ ratio: 0.1 });
        });
    }

    test('footer renders with npm icon link', async ({ page }) => {
        await page.goto('/');
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
        await expect(footer.locator('a[href*="npmjs.com"]')).toBeVisible();
    });
});
