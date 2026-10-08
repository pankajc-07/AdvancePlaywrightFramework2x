import { test, expect } from '@playwright/test';

/*
1. New User Registration
Goal: Register a brand new banking account on the portal.
*/
test('', async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    await page.getByRole('link', { name: 'Register' }).click();

    await page.locator("#customer\\.firstName").fill('John');
    await page.locator("#customer\\.lastName").fill('Doe');
    await page.locator("#customer\\.address\\.street").fill('ABCD');
    await page.locator("#customer\\.address\\.city").fill('Pune');
    await page.locator("#customer\\.address\\.state").fill('MH');
    await page.locator("#customer\\.address\\.zipCode").fill('112233');
    await page.locator("#customer\\.phoneNumber").fill('1234567890');
    await page.locator("#customer\\.ssn").fill('1111');

    await page.locator("#customer\\.username").fill('JohnDoe02');
    await page.locator("#customer\\.password").fill('1234567');
    await page.locator("#repeatedPassword").fill('1234567');

    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully')
})
console.log("***********************************");

/*
2. User Login
Goal: Log into the online banking dashboard using valid credentials.
*/
test('Login with valid creadentials', async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    await page.locator('input[name="username"]').fill("JohnDoe02");
    await page.locator('input[name="password"]').fill("1234567");
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.locator('h1.title')).toHaveText("Accounts Overview");
})
console.log("***********************************");

/*
3. User Login
Goal: Log into the online banking dashboard using invalid credentials.
*/
test('Login with invalid creadentials', async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    await page.locator('input[name="username"]').fill("JohnDoe02");
    await page.locator('input[name="password"]').fill("1234567");
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.locator('h1.title')).toHaveText("Error!");
})
console.log("***********************************");

/*
3. Verify Account Overview Balance
Goal: Check that open accounts and their balances are visible after logging in.
*/
test('verify account overview and balances', async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    await page.locator('input[name="username"]').fill("john");
    await page.locator('input[name="password"]').fill("demo");
    await page.getByRole('button', { name: 'Log In' }).click();

    const accountTable = page.locator('#accountTable');
    await expect(accountTable).toBeVisible();
    await expect(page.locator('#accountTable tr').nth(1)).toContainText('13344')
})
console.log("***********************************");

/*
4. Open a New Savings Account
Goal: Navigate to the open account page and create a new savings account.
*/
test('open a new savings account', async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    await page.locator('input[name="username"]').fill("john");
    await page.locator('input[name="password"]').fill("demo");
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Open New Account' }).click();
    await page.locator('#type').selectOption('1');
    await page.getByRole('button', { name: 'Open New Account' });

    await expect(page.locator('#rightPanel')).toContainText('Account Opened!');
})
console.log("***********************************");

/*
5. Transfer Funds Between Accounts
Goal: Transfer money from one internal bank account to another.
*/
test('transfer funds between accounts', async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    await page.locator('input[name="username"]').fill("john");
    await page.locator('input[name="password"]').fill("demo");
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Transfer Funds' }).click();
    await page.locator('#amount').fill('10000')
    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.locator('#showResult')).toContainText('Transfer Complete!')
})
console.log("***********************************");

/*
6. Find Transactions by ID
Goal: Search for a specific financial transaction record inside the account history.
*/
test('find transactions by ID', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').fill('john');
    await page.locator('input[name="password"]').fill('demo');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Find Transactions' }).click();
    await page.locator('#transactionId').fill('12345');
    await page.getByRole('button', { name: 'Find Transactions' }).click();

    await expect(page.locator('#rightPanel')).toContainText('Transaction Results');
});
console.log("***********************************");

/*
7. Update Customer Contact Information
Goal: Edit and update user phone number or address details in profile settings.
*/
test('update customer contact information', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').fill('john');
    await page.locator('input[name="password"]').fill('demo');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Update Contact Info' }).click();
    await page.locator('#customer\\.phoneNumber').fill('555-9999');
    await page.getByRole('button', { name: 'Update Profile' }).click();

    await expect(page.locator('#rightPanel')).toContainText('Profile Updated');
});
console.log("***********************************");

/*
8. Request a Bank Loan
Goal: Submit an online application form for a bank loan.
*/
test('request a bank loan', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').fill('john');
    await page.locator('input[name="password"]').fill('demo');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Request Loan' }).click();
    await page.locator('#amount').fill('10000');
    await page.locator('#downPayment').fill('1000');
    await page.getByRole('button', { name: 'Apply Now' }).click();

    await expect(page.locator('#rightPanel')).toContainText('Loan Request Processed');
});
console.log("***********************************");

/*
8. Request a Bank Loan
Goal: Submit an online application form for a bank loan.
*/
test('request a bank loan from specific account', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').fill('john');
    await page.locator('input[name="password"]').fill('demo');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Request Loan' }).click();
    await page.locator('#amount').fill('10000');
    await page.locator('#downPayment').fill('1000');
    await page.locator('#fromAccountId').selectOption('48642');
    //await page.pause();
    await page.getByRole('button', { name: 'Apply Now' }).click();

    await expect(page.locator('#rightPanel')).toContainText('Loan Request Processed');
});
console.log("***********************************");

/*
9. Bill Pay Service
Goal: Fill out payee details and execute an online bill payment.
*/
test('pay a bill using online banking', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').fill('john');
    await page.locator('input[name="password"]').fill('demo');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Bill Pay' }).click();

    await page.locator('input[name="payee.name"]').fill('Electric');
    await page.locator('input[name="payee.address.street"]').fill('ABC');
    await page.locator('input[name="payee.address.city"]').fill('Pune');
    await page.locator('input[name="payee.address.state"]').fill('MH');
    await page.locator('input[name="payee.address.zipCode"]').fill('1122');
    await page.locator('input[name="payee.phoneNumber"]').fill('1234567890');
    await page.locator('input[name="payee.accountNumber"]').fill('1111');
    await page.locator('input[name="verifyAccount"]').fill('1111');
    await page.locator('input[name="amount"]').fill('1000');

    await page.locator('select[name="fromAccountId"]').selectOption('53970');
    //await page.pause();

    await page.getByRole('button', { name: 'Send Payment' }).click();
    await expect(page.locator('#rightPanel')).toContainText('Bill Payment Complete');
});
console.log("***********************************");

/*
10. Secure Logout
Goal: Click the logout button to securely close the banking session.
*/
test('logout from banking portal', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').fill('john');
    await page.locator('input[name="password"]').fill('demo');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('link', { name: 'Log Out' }).click();
    await expect(page.locator('#loginPanel')).toBeVisible();
});
