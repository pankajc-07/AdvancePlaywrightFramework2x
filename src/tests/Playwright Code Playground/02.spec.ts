/*
Question:

import { test, expect } from '@playwright/test';

test('fill login form', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  // TODO: Fill username field with "tomsmith"
  // TODO: Fill password field with "SuperSecretPassword!"
  // TODO: Click the Login button
  // TODO: Verify successful login message appears

});
*/

import { test, expect } from '@playwright/test';

test('fill login form', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");

    await page.locator("#username").fill("tomsmith");

    await page.locator("#password").fill("SuperSecretPassword!");

    await page.getByRole('button', { name: "Login" }).click();

    await expect(page.locator("#flash")).toContainText("You logged into a secure area!");
})