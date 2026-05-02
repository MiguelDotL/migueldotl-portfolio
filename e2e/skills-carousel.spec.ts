import { test, expect } from '@playwright/test';

const TS_AFTER_OPACITY_SELECTOR =
    '.skills-slider .react-multi-carousel-item.is-current i.devicon-typescript-plain';

const getTsCurrentAfterOpacity = async (page: import('@playwright/test').Page) => {
    return page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        return window.getComputedStyle(el, '::after').opacity;
    }, TS_AFTER_OPACITY_SELECTOR);
};

test.describe('Skills carousel', () => {
    test('TS icon shows white background when centered, hides when not', async ({ page }) => {
        await page.goto('/#skills');
        await page.locator('#skills').scrollIntoViewIfNeeded();

        const carousel = page.locator('.skills-slider');
        await expect(carousel).toBeVisible();

        // Press ArrowRight until the TS icon's `::after` reports opacity 1.
        let opacity: string | null = null;
        for (let i = 0; i < 25; i++) {
            opacity = await getTsCurrentAfterOpacity(page);
            if (opacity === '1') break;
            await page.keyboard.press('ArrowRight');
            await page.waitForTimeout(120);
        }
        expect(opacity).toBe('1');

        // Press ArrowLeft a few times — TS icon should no longer be the centered one.
        for (let i = 0; i < 6; i++) {
            await page.keyboard.press('ArrowLeft');
            await page.waitForTimeout(120);
        }
        const opacityAfter = await getTsCurrentAfterOpacity(page);
        // Either the centered item no longer contains TS (selector returns null) or
        // the ::after has faded to 0.
        expect(opacityAfter === null || opacityAfter === '0').toBe(true);
    });
});
