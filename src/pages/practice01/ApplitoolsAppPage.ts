import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Applitools demo dashboard (app.html) — shows Financial Overview and Recent Transactions.
 *
 *   const app = new ApplitoolsAppPage(page);
 *   await app.assertLoaded();
 *   const amounts = await app.transactionAmounts();
 */
export class ApplitoolsAppPage extends BasePage {

    static readonly PATH = '/app.html';

    private readonly transactionRows: Locator;
    private readonly amountCells: Locator;

    constructor(page: Page) {
        super(page, 'ApplitoolsAppPage');
        this.transactionRows = page.locator('table tbody tr');
        this.amountCells = page.locator('table tbody td:last-child');
    }

    async assertLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/app\.html/);
        await expect(this.page.getByRole('heading', { name: 'Financial Overview' })).toBeVisible();
    }

    /** Returns raw amount strings from every transaction row (e.g. "+ 1,250 USD", "- 320 USD"). */
    async transactionAmounts(): Promise<string[]> {
        return this.el.getAllTexts(this.amountCells);
    }

    /** Returns the number of transaction rows in the table. */
    async transactionCount(): Promise<number> {
        return this.transactionRows.count();
    }
}