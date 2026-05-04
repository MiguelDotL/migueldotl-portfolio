import { test, expect } from '@playwright/test';

test.describe('MomentumTabs', () => {
    test('switching tabs swaps content', async ({ page }) => {
        await page.goto('/#projects');

        const featuredTab = page.getByRole('tab', { name: 'Featured Projects' });
        const clientTab = page.getByRole('tab', { name: 'Client Projects' });
        const personalTab = page.getByRole('tab', { name: 'Personal Projects' });

        await expect(featuredTab).toHaveAttribute('aria-selected', 'true');
        await expect(page.getByText('BCBS NC — LiteHouse')).toBeVisible();

        await clientTab.click();
        await expect(clientTab).toHaveAttribute('aria-selected', 'true');
        await expect(page.getByText('T R I M Agency')).toBeVisible();

        await personalTab.click();
        await expect(personalTab).toHaveAttribute('aria-selected', 'true');
        await expect(page.getByText('Voicepool')).toBeVisible();
    });

    test('perimeter SVG present and aria-hidden', async ({ page }) => {
        await page.goto('/#projects');
        // Ensure the projects section is scrolled into view so the
        // IntersectionObserver fires and enables MomentumTabs to measure.
        const tabBar = page.locator('.momentum-tabs');
        await tabBar.scrollIntoViewIfNeeded();
        const perimeter = page.locator('.momentum-tabs__perimeter');
        // Wait for the SVG to render — it appears after the indicator effect runs.
        await expect(perimeter.first()).toBeVisible({ timeout: 10000 });
        await expect(perimeter.first()).toHaveAttribute('aria-hidden', 'true');
    });

    test('tabs realign after viewport resize', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto('/#projects');
        const tabBar = page.locator('.momentum-tabs');
        const activeTab = tabBar.locator('.momentum-tab.is-active').first();
        await activeTab.scrollIntoViewIfNeeded();
        const perimeter = page.locator('.momentum-tabs__perimeter').first();

        const beforeBox = await perimeter.boundingBox();
        const tabBoxBefore = await activeTab.boundingBox();

        await page.setViewportSize({ width: 800, height: 800 });
        // Allow layout + indicator transition to settle.
        await page.waitForTimeout(700);
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.waitForTimeout(700);

        const afterBox = await perimeter.boundingBox();
        const tabBoxAfter = await activeTab.boundingBox();

        expect(beforeBox).not.toBeNull();
        expect(afterBox).not.toBeNull();
        expect(tabBoxBefore).not.toBeNull();
        expect(tabBoxAfter).not.toBeNull();
        // Perimeter should still hug the active tab (within a few pixels).
        expect(Math.abs(afterBox!.x - tabBoxAfter!.x)).toBeLessThan(8);
        expect(Math.abs(afterBox!.width - tabBoxAfter!.width)).toBeLessThan(12);
    });
});
