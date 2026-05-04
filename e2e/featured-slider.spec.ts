import { test, expect } from '@playwright/test';

test.describe('featured slider + lightbox', () => {
    test('arrows advance the active dot', async ({ page }) => {
        await page.goto('/#projects');
        const slider = page
            .locator('.featured-image-slider')
            .filter({ has: page.locator('img[alt^="BCBS"]') })
            .first();
        await slider.scrollIntoViewIfNeeded();
        await slider.hover();

        const dots = slider.locator('.featured-image-slider__dot');
        await expect(dots.nth(0)).toHaveAttribute('aria-selected', 'true');

        await slider.locator('button[aria-label="Next image"]').first().click();
        await expect(dots.nth(1)).toHaveAttribute('aria-selected', 'true');
    });

    test('clicking active slide opens lightbox; Escape dismisses', async ({ page }) => {
        await page.goto('/#projects');
        const slider = page
            .locator('.featured-image-slider')
            .filter({ has: page.locator('img[alt^="BCBS"]') })
            .first();
        await slider.scrollIntoViewIfNeeded();
        await slider.hover();

        await slider.locator('img.is-active').click();

        const dialog = page.locator('[role="dialog"][aria-modal="true"]');
        await expect(dialog).toBeVisible();

        await page.keyboard.press('ArrowRight');
        // Lightbox image should still be visible after navigating.
        await expect(dialog.locator('img').first()).toBeVisible();

        await page.keyboard.press('Escape');
        await expect(dialog).toBeHidden();
    });
});
