/*
Practice Test 6: File Uploading
Goal: Upload a dummy text file to a form and verify the upload success message.
*/
import { test, expect } from '@playwright/test';

test('upload a file', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/upload");

    await page.locator('#file-upload').setInputFiles({
        name: 'practice-file.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Hello Playwright file upload')
    });

    await page.getByRole('button', { name: 'Upload' }).click();

    await expect(page.locator('h3')).toHaveText('File Uploaded!');
})
