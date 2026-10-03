/*
Practice Test 1: Checkbox Selection
Goal: Navigate to the checkboxes page, check an unchecked box, and verify that it is checked.
https://the-internet.herokuapp.com/checkboxes
*/

import { test, expect } from '@playwright/test';

test('verify the checkbox selection', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    const checkbox = page.locator('input[type="checkbox"]').first();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
})