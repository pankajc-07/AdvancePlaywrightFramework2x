import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * DemoQA Modal Dialogs page.
 *
 * Opens and verifies the Large Modal dialog content.
 */
export class DemoQAModalDialogsPage extends BasePage {

    static readonly PATH = '/modal-dialogs';

    private readonly largeModalButton: Locator;
    private readonly dialog: Locator;

    constructor(page: Page) {
        super(page, 'DemoQAModalDialogsPage');

        this.largeModalButton = page.getByRole('button', { name: 'Large modal' });
        this.dialog = page.getByRole('dialog');
    }

    async open(): Promise<void> {
        await this.goto(DemoQAModalDialogsPage.PATH);
        await this.assertLoaded();
    }

    async assertLoaded(): Promise<void> {
        await expect(this.largeModalButton).toBeVisible();
    }

    /** Click the "Large modal" button to open the dialog. */
    async openLargeModal(): Promise<void> {
        await this.el.click(this.largeModalButton);
        await expect(this.dialog).toBeVisible();
    }

    /** Get the heading text inside the dialog. */
    async modalHeading(): Promise<string> {
        const heading = this.dialog.locator('.modal-title');
        return this.el.getText(heading);
    }

    /** Get the body text inside the dialog. */
    async modalBody(): Promise<string> {
        const body = this.dialog.locator('p');
        return this.el.getText(body);
    }

    /** Close the modal via the Close button. */
    async closeModal(): Promise<void> {
        const closeBtn = this.dialog.getByRole('button', { name: 'Close' }).first();
        await this.el.click(closeBtn);
        await expect(this.dialog).not.toBeVisible();
    }
}