/*
Practice Test 2: Dropdown Selection
Goal: Select an option from a dropdown menu and verify that the correct option is chosen.
*/
import { test, expect } from '@playwright/test';

test('select option from dropdown', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/dropdown");

    const dropdown = page.locator('#dropdown');

    await dropdown.selectOption({ label: 'Option 2' });
    await expect(dropdown).toHaveValue('2');
})
