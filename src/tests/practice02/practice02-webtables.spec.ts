import { test, expect } from '@fixtures/test-base';
import { requireEnv } from '@config/env';

const DEMOQA_BASE_URL = requireEnv('DEMOQA_BASE_URL');

test.describe('practice02 — DemoQA Web Tables', () => {

    test('edit 3rd row, add new row, verify in table', async ({
        page,
        demoQAWebTablesPage,
    }) => {

        // Step 1: Navigate to Web Tables
        await test.step('Navigate to Web Tables page', async () => {
            await page.goto(`${DEMOQA_BASE_URL}/webtables`);
            await page.waitForLoadState('domcontentloaded');
            await demoQAWebTablesPage.assertLoaded();
        });

        // Step 2: Click Edit on the row with email "kierra@example.com"
        await test.step('Click Edit on Kierra row', async () => {
            await demoQAWebTablesPage.clickEdit('kierra@example.com');
        });

        // Step 3: Verify the edit modal shows Kierra's data
        await test.step('Verify edit modal shows correct data', async () => {
            // Modal is open — verify form fields, not table cells
            await expect(page.locator('#firstName')).toHaveValue('Kierra');
            await expect(page.locator('#lastName')).toHaveValue('Gentry');
            await expect(page.locator('#userEmail')).toHaveValue('kierra@example.com');
            // Close the modal by clicking Submit (no changes)
            await page.locator('#submit').click();
        });

        // Step 4: Add a new row
        const newUser = {
            firstName: 'Pankaj',
            lastName: 'Chute',
            email: 'pankaj@example.com',
            age: '30',
            salary: '150000',
            department: 'Engineering',
        };

        await test.step('Add a new row via modal', async () => {
            await demoQAWebTablesPage.addRow(newUser);
        });

        // Step 5: Verify the new row appears in the table
        await test.step('Verify new row is in the table', async () => {
            await demoQAWebTablesPage.assertRow('pankaj@example.com', {
                firstName: 'Pankaj',
                lastName: 'Chute',
                age: '30',
                salary: '150000',
                department: 'Engineering',
            });
        });
    });
});