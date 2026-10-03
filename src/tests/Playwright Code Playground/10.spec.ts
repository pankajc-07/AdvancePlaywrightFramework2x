/*
Practice Test 4: Hovering Over Elements
Goal: Hover your mouse over a user profile avatar to reveal hidden text content.
*/
import { test, expect } from '@playwright/test';

test('Hover your mouse over a user profile avatar to reveal hidden text content', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/hovers");

    await page.locator('.figure').first().hover();

    const caption = page.locator('.figcaption').first();
    await expect(caption).toBeVisible();
    await expect(caption.locator('h5')).toHaveText('name: user1');
})


