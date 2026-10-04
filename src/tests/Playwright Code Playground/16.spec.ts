import { test, expect } from '@playwright/test';

/*
1. Handling Iframes (Nested Content)
Goal: Switch context inside an iframe and type text into an embedded rich text editor.
*/
test('interact with an iframe text editor', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/iframe");


})