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
            const link = page.locator(`nav a[href="#${id}"]`).first();
            await expect(link).toBeVisible();
            await link.click();
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
