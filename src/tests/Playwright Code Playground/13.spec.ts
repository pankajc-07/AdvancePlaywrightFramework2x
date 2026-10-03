/*
Practice Test 7: Handling New Browser Tabs / Popups
Goal: Click a link that opens a new browser tab, switch control to it, and verify its content.
*/
import { test, expect } from '@playwright/test';

test('handle new browser tab', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/windows");

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'Click Here' }).click()
    ]);
    await expect(newPage.locator('h3')).toHaveText('New Window');
})

