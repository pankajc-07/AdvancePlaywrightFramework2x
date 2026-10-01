import { test, expect } from '@fixtures/test-base';
import { requireEnv } from '@config/env';

const DEMOQA_BASE_URL = requireEnv('DEMOQA_BASE_URL');

const LOREM_IPSUM = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

test.describe('practice03 — DemoQA Modal Dialogs', () => {

    test('open large modal and verify content', async ({
        page,
        demoQAModalDialogsPage,
    }) => {

        // Step 1: Navigate to Modal Dialogs page
        await test.step('Navigate to Modal Dialogs page', async () => {
            await page.goto(`${DEMOQA_BASE_URL}/modal-dialogs`);
            await page.waitForLoadState('domcontentloaded');
            await demoQAModalDialogsPage.assertLoaded();
        });

        // Step 2: Open the Large Modal
        await test.step('Open Large Modal', async () => {
            await demoQAModalDialogsPage.openLargeModal();
        });

        // Step 3: Verify heading
        await test.step('Verify modal heading is "Large Modal"', async () => {
            const heading = await demoQAModalDialogsPage.modalHeading();
            expect(heading).toBe('Large Modal');
        });

        // Step 4: Verify body contains the Lorem Ipsum text
        await test.step('Verify modal body contains Lorem Ipsum', async () => {
            const body = await demoQAModalDialogsPage.modalBody();
            expect(body).toBe(LOREM_IPSUM);
        });

        // Step 5: Close the modal
        await test.step('Close the modal', async () => {
            await demoQAModalDialogsPage.closeModal();
        });
    });
});