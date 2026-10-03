/*
Question:

import { test, expect } from '@playwright/test';

test('web-first assertions', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // TODO: Assert the page has a specific title
  // TODO: Assert a specific element is visible
  // TODO: Assert an element has specific text content
  // TODO: Assert a list has a specific number of items
  // TODO: Assert an element has a specific CSS class

});
*/
import { test, expect } from '@playwright/test';

test('web-first assertions', async ({ page }) => {
    await page.goto("https://playwright.dev");

    await expect(page).toHaveTitle(/Playwright/);

    await expect(page.getByRole('link', { name: "Get started" })).toBeVisible();

    await expect(page.locator(".navbar__title")).toHaveText("Playwright");

    await expect(page.locator('.navbar__items > .navbar__item')).toHaveCount(7);

    await expect(page.locator("nav.navbar")).toHaveClass(/navbar/);
})
