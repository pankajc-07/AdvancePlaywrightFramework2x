/*
Practice Test 8: Reading Data from an HTML Table
Goal: Locate a specific cell within a web table and verify its text content.
*/
import { test, expect } from '@playwright/test';

test('read data from a table', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');

    const emailCell = page.locator('#table1 tbody tr:first-child td:nth-child(3)');
    await expect(emailCell).toHaveText('jsmith@gmail.com');

    const webSiteCell = page.locator('#table1 tbody tr:nth-child(3) td:nth-child(5)');
    await expect(webSiteCell).toHaveText('http://www.jdoe.com');

    const firstName = page.locator('#table2 tbody tr:nth-child(4) td:nth-child(2)');
    await expect(firstName).toHaveText("Tim");
})
