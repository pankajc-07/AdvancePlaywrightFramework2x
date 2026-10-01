import { test, expect } from '@fixtures/test-base';
import { applitools } from '@config/credentials';
import { summarize } from '@utils/practice01/TransactionParser';
import { requireEnv } from '@config/env';

const APPLITOOLS_BASE_URL = requireEnv('APPLITOOLS_BASE_URL');

test.describe('practice01 — Applitools Demo', () => {

    test('login, verify dashboard, calculate spent vs earned, assert total is 1996.22', async ({
        page,
        applitoolsLoginPage,
        applitoolsAppPage,
    }) => {

        // Step 1: Open the Applitools login page
        await test.step('Open Applitools login page', async () => {
            await page.goto(APPLITOOLS_BASE_URL);
            await page.waitForLoadState('domcontentloaded');
        });

        // Step 2: Log in
        await test.step('Log in as Admin', async () => {
            await applitoolsLoginPage.loginAs(applitools.username, applitools.password);
        });

        // Step 3: Verify we are on app.html
        await test.step('Verify dashboard (app.html) loaded', async () => {
            await applitoolsAppPage.assertLoaded();
        });

        // Step 4: Parse transaction amounts
        await test.step('Calculate total amount spent this month', async () => {
            const rawAmounts = await applitoolsAppPage.transactionAmounts();
            const summary = summarize(rawAmounts);

            // Log the breakdown
            console.log(`Earned: $${summary.earned.toFixed(2)}`);
            console.log(`Spent:  $${summary.spent.toFixed(2)}`);
            console.log(`Total:  $${summary.total.toFixed(2)}`);

            // Step 5: Verify total is 1996.22 (use toBeCloseTo for floating-point)
            expect(summary.total).toBeCloseTo(1996.22, 2);
        });
    });
});