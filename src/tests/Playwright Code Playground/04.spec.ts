/*
Question:

import { test, expect } from '@playwright/test';

test('use different locator strategies', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // TODO: Find the "Get Started" link using getByRole
  // TODO: Find a heading using getByText
  // TODO: Find an element using CSS selector
  // TODO: Verify the element is visible

});
*/

import { test, expect } from '@playwright/test';

test("web-first assertions", async ({ page }) => {

    await page.goto("https://playwright.dev/");

    const getStartedLink = page.getByRole('link', { name: 'Get started' });

    const headingText = page.getByText('Playwright enables reliable');

    const navbar = page.locator('nav.navbar');

    await expect(getStartedLink).toBeVisible();

    await expect(headingText).toBeVisible();

    await expect(navbar).toBeVisible();
})