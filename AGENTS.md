# AGENTS.md — Advance Playwright Framework 2x

> AI coding agents: read this first. Quickstart conventions and critical pitfalls for this project.

## Quick Reference

| Task | Command |
|------|---------|
| Run all tests | `npx playwright test` |
| Run single file | `npx playwright test src/tests/login.spec.ts` |
| Headed mode | `npx playwright test --headed` |
| Debug mode | `npx playwright test --debug` |
| Switch environment | `TTA_ENV=staging npx playwright test` |
| Install browsers | `npx playwright install` |

Full documentation: [README.md](./README.md)

## Architecture

This is a **Playwright + TypeScript** end-to-end test framework targeting the **TTACart** storefront (SauceDemo-style). The project uses:

- **Page Object Model** — every page extends `BasePage`
- **UtilElementLocator** — action wrapper that auto-logs every Playwright action
- **Winston** — structured logging (`src/utils/logger.ts`)
- **Faker v8** — test data generation (`src/utils/DataGenerator.ts`)
- **CommonJS** modules — `"type": "commonjs"` in package.json

## Page Object Pattern

Every page class must follow this contract:

```typescript
export class NewPage extends BasePage {
    static readonly PATH = '/relative/url';           // optional
    private readonly someLocator: Locator;             // data-test selectors only

    constructor(page: Page) {
        super(page, 'NewPage');                        // scope = class name
        this.someLocator = page.locator('[data-test="something"]');
    }

    async open(): Promise<void> {
        await this.goto(NewPage.PATH);                 // uses BasePage.goto()
    }

    async doSomething(): Promise<void> {
        await this.el.fill(this.someLocator, 'value'); // ALWAYS use this.el, never locator.fill() directly
        await this.el.click(this.someLocator);
    }
}
```

**Rules:**
- Locators are `private readonly` on the class
- Selectors use `data-test` attributes only (not CSS classes, not IDs, not XPath)
- All Playwright actions go through `this.el.*` (fill, click, type, getText, waitForVisible, etc.)
- Assertions stay in test files, NOT in page objects
- Do NOT instantiate `page` or `browser` in page objects — they receive `page` via constructor

## Test Structure

```typescript
test.describe('Feature - Subfeature', () => {
    let pageObject: SomePage;

    test.beforeEach(async ({ page }) => {
        pageObject = new SomePage(page);
        await test.step('Setup description', async () => {
            await pageObject.open();
        });
    });

    test('descriptive name @p0', async ({ page }) => {
        await test.step('Step 1 description', async () => {
            await pageObject.action();
        });
        await test.step('Step 2 description', async () => {
            await expect(page.locator('[data-test="result"]')).toBeVisible();
        });
    });
});
```

**Rules:**
- Wrap every logical step in `test.step()` for traceability
- Tags: `@p0` (critical), `@p1` (high), `@p2` (medium), `@smoke`
- Use `data-test` locators for assertions too
- Page objects are created in `beforeEach`, not in fixtures (fixtures are not yet implemented)

## 🚨 Critical Pitfalls (Must Read)

### 1. Path aliases are NOT configured
Imports like `import { LoginPage } from '@pages/LoginPage'` will fail at compile time. The `tsconfig.json` has no `paths` mapping. When creating new files, **use relative imports**:
```typescript
// ✅ Correct (relative imports)
import { LoginPage } from '../pages/LoginPage';
import { createLogger } from '../utils/logger';

// ❌ Wrong (aliases don't work yet)
import { LoginPage } from '@pages/LoginPage';
import { createLogger } from '@utils/logger';
```

### 2. CustomReporter.ts has broken imports
`src/utils/CustomReporter.ts` imports from `../ai/agents/rcaAgent`, `../ai/agents/flakyAnalyzer`, `../ai/config/providers` — these files do NOT exist. Do NOT register this reporter in `playwright.config.ts` until those imports are fixed. It is currently NOT used.

### 3. Six page files are empty stubs
`InventoryPage.ts`, `CartPage.ts`, `CheckoutStepOnePage.ts`, `CheckoutStepTwoPage.ts`, `CheckoutCompletePage.ts`, and `ItemDetailPage.ts` have zero content. They must be fully implemented before writing checkout/end-to-end tests.

### 4. No npm scripts
`npm test` does nothing. Add scripts to `package.json` before expecting `npm test` / `npm run test` to work:
```json
"scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "report": "npx playwright show-report"
}
```

### 5. Only LoginPage is implemented
The framework currently supports login flow tests only. Any test requiring Inventory, Cart, or Checkout pages needs those pages implemented first.

## Faker v8 Data Generation

```typescript
import { DataGenerator } from '../utils/DataGenerator';

// Returns typed interfaces
const creds: Credentials = DataGenerator.credentials();
// { username: "Otilia35", password: "a1b2c3d4e5f6" }

const customer: CheckoutCustomer = DataGenerator.checkoutCustomer();
// { firstName: "John", lastName: "Doe", postalCode: "90210" }
```

**Note:** This uses Faker v8 API. If upgrading to Faker v9+, `faker.internet.userName()` becomes `faker.internet.username()`.

## Environment Configuration

Set `TTA_ENV` to switch environments: `qa` (default), `stg`/`stage`/`staging`, `prod`/`production`, `dev`/`local`, `api`. See [README.md](./README.md) for the full environment table.

## Logging

Use `createLogger('scope')` from `../utils/logger`:
```typescript
import { createLogger } from '../utils/logger';
const log = createLogger('my-module');
log.info('message');
log.debug('details');
log.error('oops');
```

The `BasePage` constructor automatically creates a scoped logger for each page. Use `this.log` in page objects and a module-level logger in tests and utils.
