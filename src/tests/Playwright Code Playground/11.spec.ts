/*
Practice Test 5: Handling Dynamic Loading (Waiting for Elements)
Goal: Click a button to trigger a loading spinner, then wait for hidden text to appear asynchronously.
*/
import { test, expect } from '@playwright/test';

test('handle dynamic loading', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");

    await page.getByRole('button', { name: 'Start' }).click();

    const finishText = page.locator('#finish');

    await expect(finishText).toBeVisible({ timeout: 10000 });
    await expect(finishText).toHaveText('Hello World!');
})
