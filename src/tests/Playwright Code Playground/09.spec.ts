/*
Practice Test 3: Handling JavaScript Alerts
Goal: Trigger a JavaScript alert popup, accept it, and verify the resulting success message on the page.
*/
import { test, expect } from '@playwright/test';

test('handel JavaScript alerts ', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('I am a JS Alert');
        await dialog.accept();
    })
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toHaveText("You successfully clicked an alert")
})


