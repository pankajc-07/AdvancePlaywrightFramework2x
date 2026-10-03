/*
Question:

import { test, expect } from '@playwright/test';

test('verify page title', async ({ page }) => {
  // TODO: Navigate to https://playwright.dev
  // TODO: Verify the page title contains "Playwright"

});
*/

import { test, expect } from '@playwright/test';

test('verify the page title', async ({ page }) => {
    await page.goto("https://playwright.dev");

    await expect(page).toHaveTitle(/Playwright/);
})