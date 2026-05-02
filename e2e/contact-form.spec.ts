import { test, expect } from '@playwright/test';

test.describe('contact form', () => {
    test('happy path: fills + submits + shows success', async ({ page }) => {
        await page.goto('/#contact');
        await page.getByLabel('First Name (required)').fill('Test');
        await page.getByLabel('Last Name (required)').fill('User');
        await page.getByLabel('Email Address (required)').fill('test@example.com');
        await page.getByLabel('Phone Number').fill('555-555-5555');
        await page.getByLabel('Message (required)').fill('Hello from Playwright');

        await page.getByRole('button', { name: /send/i }).click();

        const status = page.getByRole('status');
        await expect(status).toContainText(/Thanks for reaching out/i);
        await expect(page.getByRole('button')).toContainText(/Sent/);
    });

    test('empty submit blocked by HTML5 validation', async ({ page }) => {
        await page.goto('/#contact');
        await page.getByRole('button', { name: /send/i }).click();
        const firstName = page.getByLabel('First Name (required)');
        const isInvalid = await firstName.evaluate(
            (el) => (el as HTMLInputElement).validity.valueMissing
        );
        expect(isInvalid).toBe(true);
    });
});
