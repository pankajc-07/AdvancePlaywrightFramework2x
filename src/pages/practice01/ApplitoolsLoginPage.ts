import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Applitools demo login page.
 *
 *   const login = new ApplitoolsLoginPage(page);
 *   await login.open();
 *   await login.loginAs('Admin', 'Password@123');
 */
export class ApplitoolsLoginPage extends BasePage {

    static readonly PATH = '/';

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;

    constructor(page: Page) {
        super(page, 'ApplitoolsLoginPage');
        this.usernameInput = page.getByPlaceholder('Enter your username');
        this.passwordInput = page.getByPlaceholder('Enter your password');
        this.signInButton = page.getByRole('link', { name: 'Sign in' });
    }

    async open(): Promise<void> {
        this.log.info('Open Applitools login page');
        await this.goto(ApplitoolsLoginPage.PATH);
    }

    async loginAs(username: string, password: string): Promise<void> {
        this.log.info(`loginAs ${username}`);
        await this.el.fill(this.usernameInput, username);
        await this.el.fill(this.passwordInput, password);
        await this.el.click(this.signInButton);
        await this.page.waitForLoadState('domcontentloaded');
    }
}