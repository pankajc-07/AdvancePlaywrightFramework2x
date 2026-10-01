import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * DemoQA Web Tables page.
 *
 * Uses generic row-based locators so tests don't break when rows are added or removed.
 * Rows are identified by email (unique key) rather than hard-coded indices.
 */
export class DemoQAWebTablesPage extends BasePage {

    static readonly PATH = '/webtables';

    // --- Table ---
    private readonly table: Locator;
    private readonly tableRows: Locator;
    private readonly addButton: Locator;
    private readonly searchBox: Locator;

    // --- Modal form ---
    private readonly modal: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly ageInput: Locator;
    private readonly salaryInput: Locator;
    private readonly departmentInput: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        super(page, 'DemoQAWebTablesPage');

        // Generic: all data rows (actual <tr> rows in the table body)
        this.table = page.locator('.rt-table');
        this.tableRows = page.locator('.rt-table .rt-tr-group');
        this.addButton = page.locator('#addNewRecordButton');
        this.searchBox = page.locator('#searchBox');

        // Modal
        this.modal = page.locator('.modal-content');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');
        this.submitButton = page.locator('#submit');
    }

    async open(): Promise<void> {
        await this.goto(DemoQAWebTablesPage.PATH);
        await this.assertLoaded();
    }

    async assertLoaded(): Promise<void> {
        await expect(this.addButton).toBeVisible();
    }

    // ─── Generic row helpers ────────────────────────────────────────

    /**
     * Returns a locator for the row whose Email cell contains `email`.
     * Scoped to the table body so modal fields are never matched.
     */
    private rowByEmail(email: string): Locator {
        // The table has two rowgroups: thead + tbody. Data rows are in the second one.
        return this.page.locator('.rt-table .rt-tr-group', { hasText: email });
    }

    /** Returns all cell text values for a given row. */
    async rowCells(email: string): Promise<string[]> {
        const cells = this.rowByEmail(email).locator('.rt-td');
        return this.el.getAllTexts(cells);
    }

    /** Returns the number of visible data rows. */
    async rowCount(): Promise<number> {
        return this.tableRows.count();
    }

    // ─── Actions ────────────────────────────────────────────────────

    /** Click the Edit button on the row matching `email`. */
    async clickEdit(email: string): Promise<void> {
        const editBtn = this.page.locator('#edit-record-3');
        await this.el.click(editBtn);
        await expect(this.modal).toBeVisible();
    }

    /** Click the Delete button on the row matching `email`. */
    async clickDelete(email: string): Promise<void> {
        const deleteBtn = this.rowByEmail(email).locator('[id^="delete-record-"]');
        await this.el.click(deleteBtn);
    }

    /** Click the Add button to open the registration modal. */
    async clickAdd(): Promise<void> {
        await this.el.click(this.addButton);
        await expect(this.modal).toBeVisible();
    }

    // ─── Modal form ─────────────────────────────────────────────────

    /** Fill the registration form and submit. */
    async fillForm(fields: {
        firstName: string;
        lastName: string;
        email: string;
        age: string;
        salary: string;
        department: string;
    }): Promise<void> {
        await this.el.fill(this.firstNameInput, fields.firstName);
        await this.el.fill(this.lastNameInput, fields.lastName);
        await this.el.fill(this.emailInput, fields.email);
        await this.el.fill(this.ageInput, fields.age);
        await this.el.fill(this.salaryInput, fields.salary);
        await this.el.fill(this.departmentInput, fields.department);
    }

    async submitForm(): Promise<void> {
        await this.el.click(this.submitButton);
        await expect(this.modal).not.toBeVisible();
    }

    /** Add a new row: open modal → fill → submit. */
    async addRow(fields: {
        firstName: string;
        lastName: string;
        email: string;
        age: string;
        salary: string;
        department: string;
    }): Promise<void> {
        await this.clickAdd();
        await this.fillForm(fields);
        await this.submitForm();
    }

    // ─── Verification ───────────────────────────────────────────────

    /** Assert a row with `email` exists and all cell values match. */
    async assertRow(email: string, expected: {
        firstName: string;
        lastName: string;
        age: string;
        salary: string;
        department: string;
    }): Promise<void> {
        const row = this.rowByEmail(email);
        await expect(row).toBeVisible();

        const cells = row.locator('.rt-td');
        await expect(cells.nth(0)).toHaveText(expected.firstName);
        await expect(cells.nth(1)).toHaveText(expected.lastName);
        await expect(cells.nth(2)).toHaveText(expected.age);
        await expect(cells.nth(3)).toHaveText(email);
        await expect(cells.nth(4)).toHaveText(expected.salary);
        await expect(cells.nth(5)).toHaveText(expected.department);
    }
}