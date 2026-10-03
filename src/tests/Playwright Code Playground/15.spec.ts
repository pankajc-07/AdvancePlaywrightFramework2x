import { test, expect } from '@playwright/test';

/*
1. Successful User Login
Goal: Log into the e-commerce store with valid user credentials.
*/
test('sucessfull login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
})

/*
2. Invalid Login Error Handling
Goal: Verify that a locked-out user receives an appropriate error message.
*/
test('locked out user error message', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const errorMsg = page.locator('[data-test="error"]');

    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText("Sorry, this user has been locked out.");
})

/*
3. Sorting Products by Price (Low to High)
Goal: Change the product sorting dropdown and verify that prices are sorted ascendingly.
*/
test('sort products by price low to high', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('.product_sort_container').selectOption('lohi');

    const firstPrice = page.locator('.inventory_item_price').first();
    await expect(firstPrice).toHaveText('$7.99');
})

/*
4. Adding a Single Item to the Cart
Goal: Add a backpack to the cart and verify the shopping cart badge count updates.
*/
test('add single item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
})

/*
5. Removing an Item from the Cart
Goal: Add an item and then remove it, ensuring the cart badge disappears.
*/
test('remove item from cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('#remove-sauce-labs-bike-light').click();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
})

/*
6. Verifying Product Details Page Navigation
Goal: Click on a product title to open its detail view and verify description text.
*/
test('navigate to product details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.getByText('Sauce Labs Fleece Jacket').click();

    const desc = page.locator('.inventory_details_desc');
    await expect(desc).toBeVisible();
    await expect(desc).toContainText('It’s not every day that you come across');
});

/*
7. Completing the Checkout Information Form
Goal: Fill out customer details during the checkout process.
*/
test('fill checkout customer information', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();

    await page.locator('#first-name').fill('Pankaj');
    await page.locator('#last-name').fill('c');
    await page.locator('#postal-code').fill('1111');
    await page.locator('#continue').click();

    await expect(page.locator('.title')).toHaveText('Checkout: Overview')
});

/*
8. End-to-End Successful Order Placement
Goal: Execute a complete shopping journey from catalog selection to final order confirmation
*/
test('complete full e-commerce checkout flow', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();

    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Doe');
    await page.locator('#postal-code').fill('1234567');
    await page.locator('#continue').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    await page.locator('#finish').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

/*
9. Validating Multiple Items in Cart
Goal: Add multiple items and verify that the correct item names appear in the cart list.
*/
test('verify multiple items added to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-fleece-jacket').click();

    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('#item_4_title_link')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('#item_5_title_link')).toHaveText('Sauce Labs Fleece Jacket');
});

/*
10. Logging Out of the Application
Goal: Open the sidebar menu and perform a successful logout action.
*/
test('logout from application', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('#react-burger-menu-btn').click();

    await page.locator('#logout_sidebar_link').click();
    //await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.locator('#login-button')).toBeVisible();
});


