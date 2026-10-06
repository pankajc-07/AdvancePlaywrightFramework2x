import { test, expect } from '@playwright/test';

/*
1. Handling Iframes (Nested Content)
Goal: Switch context inside an iframe and type text into an embedded rich text editor.
*/
test('interact with an iframe text editor', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/iframe");

    const frame = page.frameLocator("mce_0_ifr");

    const editorBody = frame.locator('#tinymce');
    await editorBody.click();
    await editorBody.press('Control+A');
    await editorBody.press('Backspace');
    await editorBody.fill("Hello Playwright inside an iframe!");

    await expect(editorBody).toContainText("Hello Playwright inside an iframe!");
})
console.log("*******************************************************************");
/*
2. Handling Keyboard Actions & Key Presses
Goal: Press specific keyboard keys (like Enter, Tab, or escape keys) and verify the recorded key result text.
*/
test('simulate keyboard key presses', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/key_presses");

    const inputField = page.locator("#target");

    await inputField.press("Backspace");
    await expect(page.locator("#result")).toContainText("You entered: BACK_SPACE");

    await inputField.press("Tab");
    await expect(page.locator("#result")).toContainText("You entered: TAB");
})
console.log("*******************************************************************");
/*
3. Handling Context Menus (Right-Click Actions)
Goal: Perform a right-click action on a box element to trigger and accept a browser JavaScript alert popup.
*/
test('handle right-click context menu alert', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/context_menu");

    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('You selected a context menu');
        await dialog.accept();
    })
    await page.locator('#hot-spot').click({ button: 'right' });
})
console.log("*******************************************************************");

/*
4. Working with Drag and Elements
Goal: Drag an element from one container box and drop it onto another container box.
*/
test('drag and drop elements', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    const sourceBox = page.locator('#column-a');
    const targetBox = page.locator('#column-b');

    // Drag source and drop onto target
    await sourceBox.dragTo(targetBox);

    // Verify elements swapped headers
    await expect(sourceBox.locator('header')).toHaveText('B');
    await expect(targetBox.locator('header')).toHaveText('A');
});
console.log("*******************************************************************");

/*
5. Handling Basic HTTP Authentication Popups
Goal: Automatically pass username and credentials directly through the page URL parameters for basic auth login.
*/
test('handle basic authentication login', async ({ page }) => {

    await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");

    await expect(page.locator('p')).toContainText("Congratulations! You must have the proper credentials.")
})
console.log("*******************************************************************");

/*
6. Working with Dynamic Elements (Disappearing Buttons)
Goal: Refresh a page until a dynamic menu button appears, then click it.
*/
test('handle dynamic disappearing buttons', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/disappearing_elements");

    const gallaryLink = page.getByRole('link', { name: 'Gallery' });

    await expect(gallaryLink).toBeVisible();
    await gallaryLink.click();

    await expect(page).toHaveURL(/gallery/);
})
console.log("*******************************************************************");

/*
7. Handling Multiple Checkboxes Selection Loop
Goal: Select a group of checkboxes together using iteration.
*/
test('select multiple checkboxes dynamically', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const checkboxes = page.locator('input.form-check-input[type="checkbox"]');

    const count = await checkboxes.count();

    for (let i = 0; i < 3; i++) {
        await checkboxes.nth(i).check();
        await expect(checkboxes.nth(i)).toBeChecked();
    }
})
console.log("*******************************************************************");

/*
8. Handling Multi-Select Dropdown Lists
Goal: Select multiple choices inside a multi-select list box.
*/
test('select multiple options from a list', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const multiselect = page.locator('#colors');

    await multiselect.selectOption(['blue', 'green', 'yellow'])
})
console.log("*******************************************************************");

/*
9. Uploading Files via File Input Element
Goal: Upload a file document using an explicit file input locator.
*/
test('upload file using input element', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Upload file buffer directly using setInputFiles
    await page.locator('#singleFileInput').setInputFiles({
        name: 'test-document.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Automated test content file upload practice.')
    });

    // Click upload button and check status
    await page.getByRole('button', { name: 'Upload Single File' }).click();
    await expect(page.locator('#singleFileStatus')).toContainText('test-document.txt');
});
console.log("*******************************************************************");

/*
10. Extracting and Verifying HTML Table Rows Dynamically
Goal: Loop through rows of an interactive table to find a specific book name matching an author's name.
*/
test('find specific book title by author in a table', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Locate the static web table row where the author is 'Mukesh'
    const targetRow = page.locator('table[name="BookTable"] tr').filter({ hasText: 'Mukesh' });

    // Verify the corresponding book name in that row is 'Learn Java'
    await expect(targetRow.locator('td').first()).toHaveText('Learn Java');
});





