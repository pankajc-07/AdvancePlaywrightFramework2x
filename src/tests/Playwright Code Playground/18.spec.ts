import { test, expect } from '@playwright/test';

/*
1. Search for a Product Using the Search Bar
Goal: Type a product name into the search input and verify that relevant products appear in the grid.
*/
test('search a product', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    const searchInput = page.locator('#search-query');
    await searchInput.fill('Pliers');
    await page.getByRole('button', { name: 'Search ' }).click();

    const productCard = page.locator('.card-title').first();
    await expect(productCard).toContainText('Pliers')
})
console.log("*********************************************************");

/*
2. Filter Products by Category
Goal: Select a specific category from the filter menu to narrow down the product catalog.
*/
test('filter', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.getByRole('button', { name: "Categories" }).click();
    await page.getByRole('link', { name: 'Hand Tools' }).click();

    await expect(page.getByText('Category: Hand Tools')).toBeVisible();
})
console.log("*********************************************************");

/*
3. Filter Products by Price Range Slider
Goal: Adjust the price range filter slider and verify that the product catalog updates.
*/
test('filter products using price range slider', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    const priceSlider = page.locator('input[type="range"]');
    await priceSlider.fill('50');

    const catlog = page.locator('.container');
    await expect(catlog).toBeVisible();
})
console.log("*********************************************************");

/*
4. View Product Details & Specification Attributes
Goal: Click on a specific product card to view its detailed page, price, and stock status.
*/
test('view product details and stock status', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    // Click on the first product card
    await page.locator('.card').first().click();

    // Verify product details elements are displayed
    await expect(page.locator('.unit-price')).toBeVisible();
    await expect(page.locator('#btn-add-to-cart')).toBeVisible();
});
console.log("*********************************************************");

/*
5. Change Product Quantity Before Adding to Cart
Goal: Increase the item quantity counter on the product detail page before clicking "Add to Cart".
*/
test('increase product quantity and add to cart', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.locator('.card').first().click();

    // Increment quantity using the plus button or fill input
    const quantityInput = page.locator('#quantity');
    await quantityInput.fill('3');

    await page.locator('#btn-add-to-cart').click();

    // Verify cart counter badge reflects the updated quantity
    await expect(page.locator('#lbl-cart-count')).toHaveText('3');
});
console.log("*********************************************************");

/*
1. OrangeHRM Portal Login (HR Management System)
Goal: Log into an enterprise HR management portal using administrator credentials.
*/
test('', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/')

    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('.oxd-brand-banner')).toBeVisible();
})
console.log("*********************************************************");

/*
2. OrangeHRM Employee Record Search
Goal: Navigate to the PIM (Personnel Information Management) section and search for an employee record.
*/
test('Employee Record Search', async ({ page }) => {
    await page.goto(('https://opensource-demo.orangehrmlive.com/'));

    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'PIM' }).click();

    await page.locator('.oxd-input.oxd-input--active').nth(1).fill('Aaliyah');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('.oxd-table-card')).toBeVisible();
})
console.log("*********************************************************");

/*
3. DemoQA Text Box Form Submission
Goal: Fill out user registration fields like Full Name, Email, and Addresses on a developer practice form. record.
*/
test('fill demoqa text box form', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    await page.locator('#userName').fill('Jane Doe');
    await page.locator('#userEmail').fill('jane.doe@example.com');
    await page.locator('#currentAddress').fill('123 Elm Street');
    await page.locator('#permanentAddress').fill('456 Oak Avenue');
    await page.locator('#submit').click();

    await expect(page.locator('#output #name')).toContainText('Jane Doe');
    await expect(page.locator('#output #email')).toContainText('jane.doe@example.com');
})
console.log("*********************************************************");

/*
4. DemoQA Radio Button Interaction
Goal: Select a custom radio option and verify that the feedback text updates successfully.
*/
test('check radio button', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');

    await page.getByText('Impressive').click();

    await expect(page.locator('.text-success')).toHaveText('Impressive')
})
console.log("*********************************************************");

/*
5. DemoQA Web Tables (Adding a New Record)
Goal: Open a modal dialog box, add a new user profile record, and check it inside a data grid table.
*/
test('add new record to web table', async ({ page }) => {
    await page.goto("https://demoqa.com/webtables");

    await page.locator('#addNewRecordButton').click();
    await page.locator('#firstName').fill('jane');
    await page.locator('#lastName').fill('deo');
    await page.locator('#userEmail').fill('janedeo@gmail.com');
    await page.locator('#age').fill('27');
    await page.locator('#salary').fill('50000');
    await page.locator('#department').fill('Sales');
    //await page.getByRole('button', { name: 'Submit' });
    await page.locator('#submit').click();

    await expect(page.locator('table.-striped.-highlight.table.table-striped.table-bordered.table-hover')).toContainText('jane')
})
console.log("*********************************************************");

/*
6. DemoQA Advanced Mouse Actions (Double & Right Click)
Goal: Perform specialized mouse actions like double-clicking and right-clicking buttons.
*/
test('perform double click and right click', async ({ page }) => {
    await page.goto("https://demoqa.com/buttons");

    await page.locator('#doubleClickBtn').dblclick();
    await expect(page.locator('#doubleClickMessage')).toContainText('You have done a double click');

    await page.locator('#rightClickBtn').click({ button: 'right' });
    await expect(page.locator('#rightClickMessage')).toContainText('You have done a right click');
})
console.log("*********************************************************");

/*
7. DemoQA Accordion Widget Expansion
Goal: Expand a collapsible accordion panel section to reveal hidden descriptive body content.
*/
test('expand collapsible accordion section', async ({ page }) => {
    await page.goto('https://demoqa.com/accordian');

    // Click the first accordion header to expand it
    const sectionHeader = page.locator('#section1Heading');
    await sectionHeader.click();

    // Verify that the body text container is visible
    await expect(page.locator('#section1Content')).toBeVisible();
});
console.log("*********************************************************");

/*
8. DemoQA Tooltips Interaction
Goal: Hover over a button element to trigger and verify the appearance of a custom tooltip container.
*/
test('verify tooltip text on hover', async ({ page }) => {
    await page.goto('https://demoqa.com/tool-tips');

    await page.locator('#toolTipButton').hover();
    const tooltip = page.locator('.tooltip-inner');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('Thank you for hovering');
})
console.log("*********************************************************");

/*
9. TodoMVC Task Management (Create & Complete)
Goal: Add a new task item into a modern JavaScript task manager app and check it off as complete.
*/
test('add and complete task in todo app', async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');

    // Type a new task into input and press Enter
    const newTodoInput = page.locator('.new-todo');
    await newTodoInput.fill('Learn Playwright Automation');
    await newTodoInput.press('Enter');

    // Verify task appears in the list
    const todoItem = page.locator('.todo-list li');
    await expect(todoItem).toHaveText('Learn Playwright Automation');

    // Click checkbox to complete the task
    await todoItem.locator('.toggle').click();
    await expect(todoItem).toHaveClass(/completed/);
});
console.log("*********************************************************");

/*
10. DataTables Search & Filter Grid
Goal: Type a keyword into a global data table search bar to dynamically filter rows.
*/
test('filter rows in datatables search bar', async ({ page }) => {
    await page.goto('https://datatables.net/');

    // Type search keyword into the global filter search input
    const searchBox = page.locator('input[type="search"]');
    await searchBox.fill('London');

    // Verify that filtered result rows contain the keyword "London"
    const tableRow = page.locator('#example tbody tr').first();
    await expect(tableRow).toContainText('London');
});
