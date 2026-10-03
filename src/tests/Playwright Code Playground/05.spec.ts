/*
Question:

import { test, expect } from '@playwright/test';

test('mock API response', async ({ page }) => {
  // TODO: Intercept GET requests to an API endpoint
  // TODO: Return a mocked JSON response
  // TODO: Navigate to the page that calls the API
  // TODO: Verify the mocked data is displayed

  await page.route('/api / users', async (route) => {
await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
        { id: 1, name: 'Mock User', email: 'mock@test.com' }
    ]),
});
  });
  // Navigate and verify...
});
*/
import { test, expect } from '@playwright/test';

test("mock API response", async ({ page }) => {

    await page.route('**/api/users', async (route) => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify([
                { id: 1, name: 'Mock User', email: 'mock@test.com' }
            ]),
        });
    });

    await page.goto("https://example.com/users");

    // await expect(page.getByText('Mock User')).toBeVisible();
})
