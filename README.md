# Advance Playwright Framework 2x

A robust, scalable, and production-ready Playwright test automation framework with TypeScript, designed for end-to-end, API, and data-driven testing.

## 📁 Project Structure

```
AdvancePlaywrightFramework2x/
├── src/
│   ├── ai/               → AI agents (RCA, flaky analyzer, data gen, self-heal, LLM config, agent factory)
│   ├── api/              → API client modules (BookingApi, helpers)
│   ├── config/           → Centralized environment configuration
│   ├── fixtures/         → Custom Playwright fixtures (auth, DB, API, booker)
│   ├── pages/            → Page Object Model (POM) classes
│   ├── testdata/         → Static test data, CSV/Excel, Faker factories, booking data, JSON schemas
│   ├── cucumber/          → Cucumber BDD tests (features + step definitions)
│   │   ├── level-00-installation/  → Smoke test — Playwright + Cucumber wiring
│   │   │   ├── feature/   → Gherkin .feature files
│   │   │   └── steps/     → Step definition files
│   │   ├── level-01-basic/         → Basic login scenarios (positive + negative)
│   │   │   ├── features/  → Gherkin .feature files
│   │   │   └── steps/     → Step definition files
│   │   ├── level-02-data-driven/   → Scenario Outline, Data Tables, external JSON
│   │   │   ├── features/  → Gherkin .feature files
│   │   │   ├── steps/     → Step definition files
│   │   │   └── data/      → External JSON test data
│   │   └── support/       → World, hooks, and shared setup
│   ├── tests/            → Test specifications (*.spec.ts)
│   │   ├── aiTest/       → AI agent demo tests (RCA, flaky, self-heal, data gen)
│   │   └── apisTests/    → Restful Booker API tests (raw, ApiHelper, fixture, JSONPath, AJV schema)
│   └── utils/            → Reusable utilities (logger, validators, parsers, ApiHelper, SchemaValidator, selfHeal)
├── docs/                 → Project documentation & architecture decisions
│   ├── postman_api_collection/  → Reference Postman collection for Restful Booker API
│   ├── ai-factory.prompt.md     → AI prompt templates for agent-based test generation
│   ├── Playwright-Worker.md     → Playwright worker architecture
│   └── quality-gates.md         → Quality gate rules for AI-assisted changes
├── KB/                   → Knowledge Base articles (step-by-step file explainers)
├── rules/                → Linting rules & coding standards
├── .github/              → GitHub Actions CI/CD workflows & Copilot instructions
├── .env.example          → Environment variable template (committed)
├── .env                  → Environment variables (gitignored)
├── AGENTS.md             → AI coding agent conventions & pitfalls
├── package.json          → Dependencies & scripts
├── playwright.config.ts  → Playwright configuration (multi-env)
└── tsconfig.json         → TypeScript compiler options
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18 or higher |
| npm | Latest LTS |

### Installation

```bash
# Clone the repository
git clone https://github.com/pankajc-07/AdvancePlaywrightFramework2x.git
cd AdvancePlaywrightFramework2x

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Environment Setup

Copy the example environment file and customize it:

```bash
cp .env.example .env
```

The `.env.example` file is committed to the repo and serves as a template. The actual `.env` is gitignored.

```env
TTA_ENV=qa

# Base URLs per environment
QA_BASE_URL=https://app.thetestingacademy.com
STG_BASE_URL=https://stage.thetestingacademy.com
PROD_BASE_URL=https://app.thetestingacademy.com
DEV_BASE_URL=http://localhost:3000
API_BASE_URL=https://restful-booker.herokuapp.com

# Credentials (override defaults)
STANDARD_USER=standard_user
TTA_SECRET=tta_secret

# E2E checkout env-driven test
CHECKOUT_ITEM_ID=test-allthethings-tshirt-red
CHECKOUT_FIRST_NAME=Pramod
CHECKOUT_LAST_NAME=Dutta
CHECKOUT_POSTAL_CODE=560001
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed (visible) mode
npx playwright test --headed

# Run a specific test file
npx playwright test src/tests/login/login.spec.ts

# Run E2E checkout tests
npx playwright test src/tests/e2e/

# Run E2E checkout with fixture-driven approach
npx playwright test src/tests/e2e/e2e-checkout_new_fixture.spec.ts --headed

# Run tests for a specific project (browser)
npx playwright test --project=chromium

# Run tests with a specific environment
TTA_ENV=staging npx playwright test

# Run tests in debug mode
npx playwright test --debug

# Run API tests (Restful Booker)
npx playwright test --project=api

# Run a specific API spec
npx playwright test src/tests/apisTests/03_restfulbooker_fixture_e2e_api/booking-crud.e2e.spec.ts --project=api

# Run Cucumber BDD tests
npm run cucumber:level0          # Level 0 — smoke / wiring
npm run cucumber:level1          # Level 1 — basic login scenarios
npm run cucumber:level2          # Level 2 — data-driven (outline, datatable, external JSON)
npm run cucumber:headed          # Run with headed browser

# Or run a specific feature file directly
npx cucumber-js src/cucumber/level-01-basic/features/login.feature --require "src/cucumber/**/*.ts"
```

### Environment Configuration

Set the `TTA_ENV` environment variable to target different environments:

| Value | Environment | Default Base URL |
|-------|-------------|-----------------|
| `qa` | QA (default) | `https://app.thetestingacademy.com` |
| `stg` / `stage` / `staging` | Staging | `https://stage.thetestingacademy.com` |
| `prod` / `production` | Production | `https://app.thetestingacademy.com` |
| `dev` / `local` | Development | `http://localhost:3000` |
| `api` | API Testing | `https://restful-booker.herokuapp.com` |

---

## 🛠️ Tech Stack

### Core

| Package | Purpose |
|---------|---------|
| [Playwright](https://playwright.dev) | End-to-end browser & API testing |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test development |

### Utilities

| Package | Purpose |
|---------|---------|
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [Winston](https://github.com/winstonjs/winston) | Structured logging |
| [Faker.js](https://fakerjs.dev) | Realistic test data generation |
| [AJV](https://ajv.js.org) | JSON schema validation |
| [ajv-formats](https://github.com/ajv-validator/ajv-formats) | Extended format validation for AJV |
| [jsonpath-plus](https://github.com/JSONPath-Plus/JSONPath) | JSON path query expressions |

### Data-Driven Testing

| Package | Purpose |
|---------|---------|
| [xlsx](https://sheetjs.com) | Read/write Excel (.xlsx) test data |
| [csv-parse](https://csv.js.org/parse) | Parse CSV test data files |

### Reporting

| Package | Purpose |
|---------|---------|
| [Allure Playwright](https://github.com/allure-framework/allure-js) | Rich HTML test reports with history & trends |

### BDD

| Package | Purpose |
|---------|---------|
| [@cucumber/cucumber](https://github.com/cucumber/cucumber-js) | Gherkin-based BDD test runner |

---

## 🧩 Framework Features

### Multi-Environment Support
Centralized configuration via `TTA_ENV` environment variable. Add new environments by extending the switch in `playwright.config.ts`.

### Page Object Model (POM)
Organise page interactions into reusable classes under `src/pages/`. Each class encapsulates locators, actions, and verifications for a single page or component.

### Custom Fixtures
Extend Playwright's built-in fixtures with custom ones in `src/fixtures/` for:
- **Page Object Fixtures** — Pre-constructed page objects (`loginPage`, `inventoryPage`, `cartPage`, etc.) injected directly into tests — no manual `new` required
- **State Fixtures** — Reusable application states that set up only when a test requests them:
  - `invalidLogin` — locked-out user state (negative path)
  - `validLogin` — authenticated standard user
  - `loginWithInventory` — logged in + inventory page loaded
  - `loginWithSelectedItem` — logged in + one item already in cart
- Authenticated browser contexts
- API request contexts with auth tokens
- Shared test data setup/teardown
- Database connections (future)

**Usage:**
```typescript
import { test, expect } from '@fixtures/test-base';

test('complete checkout', async ({
    loginWithSelectedItem,  // auto-login + item in cart
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
}) => {
    await cartPage.open();
    await cartPage.checkout();
    await checkoutStepOnePage.fillGuest({ firstName: 'John', lastName: 'Doe', postalCode: '90210' });
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.finish();
    await checkoutCompletePage.assertOrderComplete();
});
```

### API Testing
Dedicated API clients under `src/api/` with built-in support for:
- JSON schema validation via AJV
- JSON path querying via jsonpath-plus
- Request/response logging via Winston

**BookingApi** (`src/api/BookingApi.ts`) — a typed API client for the [Restful Booker](https://restful-booker.herokuapp.com) service with:
- Full CRUD operations (`create`, `get`, `update`, `partialUpdate`, `delete`)
- Automatic token management with 403-based re-auth and retry
- Typed request/response interfaces (`Booking`, `CreateBookingResponse`, `BookingFilters`)

**ApiHelper** (`src/utils/APiHelper.ts`) — a generic HTTP helper class for making typed `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` requests with built-in retry logic, reusable across any test case.

**API Test Suites** (`src/tests/apisTests/`) — organized into progressive layers:

| Directory | Covers |
|-----------|--------|
| `01_restfulbooker_raw/` | Raw Playwright API specs — ping, POST, PUT, CRUD against Restful Booker |
| `02_restfulbooker_apiHelper/` | Tests using the `ApiHelper` wrapper — create & update booking |
| `03_restfulbooker_fixture_e2e_api/` | Fixture-driven E2E API tests — full CRUD lifecycle & negative scenarios |
| `04_jsonpath_plus/` | JSONPath query examples with a static `store.json` dataset |
| `05_ajv_json_schema/` | AJV-based JSON schema validation tests — validate booking payloads against schemas |

**Booker Fixture** (`src/fixtures/booker.fixture.ts`) — custom fixture providing `bookingApi` and `bookerToken` to tests, with automatic token generation via `POST /auth`.

**Booking Test Data** (`src/testdata/booking.data.ts`) — typed booking builders using `DataGenerator` for randomized yet reproducible test data.

**Postman collection** (`docs/postman_api_collection/`) — reference Postman collection for the Restful Booker API, useful for manual exploration and contract comparison. Also includes AI prompt templates (`ai-factory.prompt.md`, `Playwright-Worker.md`) for agent-based test generation.

### JSON Schema Validation

**SchemaValidator** (`src/utils/SchemaValidator.ts`) — a reusable AJV-based validator that compiles JSON schemas and validates API responses with detailed error reporting.

**JSON Schemas** (`src/testdata/schemas/`) — typed JSON Schema definitions for:
- `create-booking.schema.json` — booking payload validation
- `ai-booking-payload.schema.json` — AI-generated booking payload schema
- `ai-rca-verdict.schema.json` — RCA agent output schema
- `ai-flaky-summary.schema.json` — flaky analyzer output schema
- `ai-heal-candidates.schema.json` — self-heal candidate schema

### AI Agent Suite

The framework includes a suite of AI-powered agents under `src/ai/`:

| Agent | File | Purpose |
|-------|------|---------|
| **RCA Agent** | `src/ai/agents/rcaAgent.ts` | Root Cause Analysis — analyzes failed tests and produces a verdict with likely cause and fix suggestion |
| **Flaky Analyzer** | `src/ai/agents/flakyAnalyzer.ts` | Compares current vs previous build results to detect flaky tests and compute stability scores |
| **Data Gen Agent** | `src/ai/agents/dataGenAgent.ts` | Generates realistic test data (credentials, customers, bookings) using LLM prompts |
| **Self-Heal Agent** | `src/ai/agents/selfHealAgent.ts` | Analyzes broken locators and suggests resilient alternatives when tests fail due to selector changes |

**Agent Infrastructure:**
- **LLM Client** (`src/ai/LLMClient.ts`) — unified interface for LLM API calls with multi-provider support (DeepSeek, OpenAI, Anthropic)
- **Agent Factory** (`src/ai/agentFactory.ts`) — factory pattern for creating and configuring AI agents with built-in schema validation and retry
- **Providers** (`src/ai/config/providers.ts`) — LLM provider resolution from environment variables (`DEEPSEEK_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`)

**AI Demo Tests** (`src/tests/aiTest/`) — executable demos showcasing each agent:
- `RcaDemo.spec.ts` — demonstrates RCA agent on a simulated failure
- `FlakyDemo.spec.ts` — demonstrates flaky test detection
- `SelfHealDemo.spec.ts` — demonstrates self-healing locator suggestions
- `CustomDataGen.spec.ts` — demonstrates AI-powered test data generation

### Self-Healing Locators

**SelfHeal** (`src/utils/selfHeal.ts`) — a utility that intercepts locator failures and attempts to find alternative selectors using role-based, text-based, and test-id-based strategies before the test fails.

### Data-Driven Testing
Drive tests from external data sources:
- JSON test data files (e.g., `src/testdata/logintestdata.json`)
- CSV files (via `csv-parse`)
- Excel spreadsheets (via `xlsx`)
- Programmatic data generation (via `@faker-js/faker`)

### Visual Step Logging
The `visualStep` utility (`src/utils/visualStep.ts`) wraps Playwright's `test.step()` with automatic screenshot capture, providing visual traceability for every logical step in your tests.

### Centralized Credentials
Environment-aware credentials in `src/config/credentials.ts` — defaults to `standard_user` / `tta_secret` with environment variable overrides (`STANDARD_USER`, `TTA_SECRET`).

### Environment Config Module (`@config/env`)
The `src/config/env.ts` module provides a safe, centralized way to read environment variables. Importing it automatically loads `.env` via dotenv — no manual `dotenv.config()` needed.

| Export | Purpose |
|--------|---------|
| `requireEnv(key)` | Returns the value; throws if unset or blank |
| `envOr(key, fallback)` | Returns the value or a fallback default |
| `assertEnv(...keys)` | Validates multiple keys exist; reports all missing at once |

```typescript
import { requireEnv, envOr, assertEnv } from '@config/env';

// Required — throws at collection time if missing
const ITEM_ID = requireEnv('CHECKOUT_ITEM_ID');

// Optional with fallback
const logLevel = envOr('LOG_LEVEL', 'info');

// Batch validation
assertEnv('STANDARD_USER', 'TTA_SECRET');
```

### Env-Driven E2E Checkout Test
`src/tests/e2e/e2e-checkout-env.spec.ts` is a checkout test driven entirely by `.env` variables. It reads credentials, item ID, and customer details from the environment, falling back to Faker for optional fields. This makes it easy to run the same flow with different data across environments without touching test code.

### Cucumber BDD Testing

Behavior-Driven Development (BDD) tests using Cucumber + Playwright, located under `src/cucumber/`.

**Structure:**

| Directory | Purpose |
|-----------|---------|
| `src/cucumber/level-00-installation/` | Smoke test — verifies Playwright + Cucumber wiring works |
| `src/cucumber/level-01-basic/` | Basic login scenarios — positive path, locked-out user, wrong password |
| `src/cucumber/level-02-data-driven/` | Data-driven patterns — Scenario Outline, Data Tables, external JSON |
| `src/cucumber/support/world.ts` | Custom World — shared state, page objects, and browser context across steps |
| `src/cucumber/support/hooks.ts` | Lifecycle hooks — `BeforeAll`, `AfterAll`, `Before`, `After` with screenshot on failure |
| `src/cucumber/tsconfig.json` | Dedicated TypeScript config for cucumber (CommonJS, path aliases, ts-node) |

**Custom World** (`src/cucumber/support/world.ts`):
- Manages `Browser`, `BrowserContext`, and `Page` lifecycle
- Pre-initializes all Page Objects (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutStepOnePage`, `CheckoutStepTwoPage`, `CheckoutCompletePage`)
- Provides a `scratch` bag for sharing arbitrary data between steps
- Reads `BASE_URL`, `STANDARD_USER`, and `TTA_SECRET` from environment variables

**Hooks** (`src/cucumber/support/hooks.ts`):
- `BeforeAll` — launches a shared Chromium browser instance
- `AfterAll` — closes the browser
- `Before` — creates a fresh context + page per scenario, calls `initPages()`
- `After` — attaches a screenshot on failure, then closes page and context

#### Level 0 — Smoke / Wiring (`level-00-installation/`)

Verifies that Playwright + Cucumber are correctly wired together.

**Feature** (`feature/smoke.feature`):
```gherkin
@level0 @smoke
Feature: Cucumber + Playwright wiring (Level 0)

    Scenario: The TTACart login page loads
        Given I open the TTACart login page
        Then the page title should contain "TTACart"
```

**Step Definition** (`steps/smoke.steps.ts`):
```typescript
Given('I open the TTACart login page', async function (this: CustomWorld) {
    await this.page.goto(LoginPage.PATH);
});

Then('the page title should contain {string}', async function (this: CustomWorld, expected: string) {
    await expect(this.page).toHaveTitle(new RegExp(expected, 'i'));
});
```

#### Level 1 — Basic Login Scenarios (`level-01-basic/`)

Covers positive and negative login paths using `Background` for shared setup.

**Feature** (`features/login.feature`):
```gherkin
@level1 @login
Feature: TTACart Login (Level 1 — basic scenarios)

  Background:
    Given I am on the TTACart login page

  @smoke @P0
  Scenario: A standard user can log in
    When I log in as "standard_user" with password "tta_secret"
    Then I should land on the products page

  @negative
  Scenario: A locked-out user is refused
    When I log in as "locked_out_user" with password "tta_secret"
    Then I should see a login error containing "locked out"

  @negative
  Scenario: Wrong password is rejected
    When I log in as "standard_user" with password "wrong_password"
    Then I should see a login error containing "do not match"
```

**Step Definition** (`steps/login.steps.ts`):
```typescript
Given('I am on the TTACart login page', async function (this: CustomWorld) {
    await this.loginPage.open();
});

When('I log in as {string} with password {string}',
    async function (this: CustomWorld, username: string, password: string) {
        await this.loginPage.loginAs(username, password);
    });

Then('I should land on the products page', async function (this: CustomWorld) {
    await this.inventoryPage.assertLoaded();
});

Then('I should see a login error containing {string}',
    async function (this: CustomWorld, fragment: string) {
        const error = this.page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText(fragment);
    });
```

#### Level 2 — Data-Driven Patterns (`level-02-data-driven/`)

Demonstrates three data-driven BDD patterns:

| Pattern | Feature File | Description |
|---------|-------------|-------------|
| **Scenario Outline** | `features/login-outline.feature` | Parameterized login with `Examples` tables — valid users land on products, rejected users see errors |
| **Data Table** | `features/cart-datatable.feature` | Inline `DataTable` — add multiple products to cart in a single step |
| **External JSON** | `features/checkout-external-data.feature` | Persona-driven checkout — customer data loaded from `data/customers.json` |

**Scenario Outline** (`features/login-outline.feature`):
```gherkin
@level2 @outline
Feature: TTACart login outcomes (Level 2 — Scenario Outline)

  Background:
    Given I am on the TTACart login page

  Scenario Outline: <username> logging in ends on the <outcome>
    When I log in as "<username>" with password "<password>"
    Then I should see the "<outcome>"

    Examples: valid users
      | username                | password   | outcome  |
      | standard_user           | tta_secret | products |
      | problem_user            | tta_secret | products |
      | performance_glitch_user | tta_secret | products |

    Examples: rejected attempts
      | username        | password      | outcome |
      | locked_out_user | tta_secret    | error   |
      | standard_user   | wrong_password| error   |
```

**Data Table** (`features/cart-datatable.feature`):
```gherkin
@level2 @datatable
Feature: Adding products from a Data Table (Level 2)

  Background:
    Given I am logged in as a standard user
    And I am on the products page

  Scenario: Add three products to the cart in one step
    When I add the following products to the cart:
      | productId                    |
      | tta-practice-backpack        |
      | tta-bike-light               |
      | test-allthethings-tshirt-red |
    Then the cart should contain 3 products
```

**External JSON** (`features/checkout-external-data.feature`):
```gherkin
@level2 @external @e2e
Feature: End-to-end checkout, data from an external JSON file (Level 2)

  Background:
    Given I am logged in as a standard user

  Scenario Outline: <persona> completes a full checkout
    When I add product "test-allthethings-tshirt-red" to the cart
    And I check out as the "<persona>" customer
    Then the order should be confirmed

    Examples:
      | persona |
      | alice   |
      | bob     |
      | carol   |
```

**External Data** (`data/customers.json`):
```json
{
  "alice": { "firstName": "Alice", "lastName": "Walker", "postalCode": "560001" },
  "bob":   { "firstName": "Bob",   "lastName": "Singh",  "postalCode": "110011" },
  "carol": { "firstName": "Carol", "lastName": "Mendes", "postalCode": "400001" }
}
```

**Running Cucumber Tests:**
```bash
# Via npm scripts (recommended)
npm run cucumber:level0          # Level 0 — smoke / wiring
npm run cucumber:level1          # Level 1 — basic login scenarios
npm run cucumber:level2          # Level 2 — data-driven patterns
npm run cucumber:headed          # Run with headed browser

# Or run a specific feature file directly
npx cucumber-js src/cucumber/level-01-basic/features/login.feature --require "src/cucumber/**/*.ts"
npx cucumber-js src/cucumber/level-02-data-driven/features/**/*.feature --require "src/cucumber/**/*.ts"
```

### Logging
Centralized Winston logger under `src/utils/` with configurable log levels, formats, and transports.

---

## � Documentation

Detailed framework documentation is available in the [`docs/`](docs/) folder:

| Document | Description |
|----------|-------------|
| [`docs/project-structure.md`](docs/project-structure.md) | Folder structure, execution flow diagram, component summaries, and known gaps |
| [`docs/deep-dive.md`](docs/deep-dive.md) | Line-by-line deep-dive of every source file — BasePage, UtilElementLocator, CustomReporter, AI agents, DataGenerator, logger, playwright config, and more |
| [`docs/quality-gates.md`](docs/quality-gates.md) | Quality gates for AI-assisted changes — ai-slop, ponytail, over-engineering, and framework-patterns checks to run before raising a PR |
| [`docs/ai-factory.prompt.md`](docs/ai-factory.prompt.md) | AI prompt templates for agent-based test generation |
| [`docs/Playwright-Worker.md`](docs/Playwright-Worker.md) | Playwright worker architecture and execution model |
### 📖 Knowledge Base (KB)

Step-by-step explainers for key framework files — ideal for onboarding and presentations:

| Article | Covers |
|---------|--------|
| [`KB/KB-test-base-fixtures-explained.md`](KB/KB-test-base-fixtures-explained.md) | `src/fixtures/test-base.ts` — custom fixture definitions, dependency chain, page-object & state fixtures, `base.extend()` explained |
| [`KB/KB-e2e-checkout-spec-explained.md`](KB/KB-e2e-checkout-spec-explained.md) | `src/tests/e2e/e2e-checkout.spec.ts` — full checkout flow walkthrough, `visualStep` usage, `DataGenerator`, assertions, logging |
| [`KB/2026-08-12-custom-reporter-wiring.md`](KB/2026-08-12-custom-reporter-wiring.md) | CustomReporter wiring — how the TTA reporter hooks into Playwright's reporter API |
| [`KB/2026-08-28-dotenv-in-playwright-specs.md`](KB/2026-08-28-dotenv-in-playwright-specs.md) | dotenv in Playwright specs — why `dotenv.config()` in a spec fails due to Babel hoisting, and how `@config/env` solves it |
| [`KB/2026-09-02-playwright-testdir-scoping.md`](KB/2026-09-02-playwright-testdir-scoping.md) | Playwright `testDir` scoping — why `npx playwright test src/api/spec.ts` reports "no tests found" when the spec lives outside `testDir`, and the two-project fix |
| [`KB/2026-09-07-module-not-found-alias-and-case.md`](KB/2026-09-07-module-not-found-alias-and-case.md) | Module not found errors — alias resolution and case-sensitivity pitfalls in TypeScript + Playwright projects |
| [`src/utils/ELI5.md`](src/utils/ELI5.md) | ELI5 Skill — Claude skill that explains any topic, code, concept, or error tailored to a specific audience (age, role, relationship, education level) |
Also see [`AGENTS.md`](AGENTS.md) for AI coding agent conventions and critical pitfalls for this project.

---

## �📊 Reports

### Playwright Built-in Report

```bash
# View built-in HTML report
npx playwright show-report
```

### Custom TTA Reporter (`src/utils/CustomReporter.ts`)

A **real-time HTML report** is generated automatically on every test run at `tta-report/report_<timestamp>.html`. Features:

- **Live Refresh** — report updates every 5 seconds while tests are running
- **Test Step Details** — expand rows to see per-step duration, console logs, screenshots, and stack traces
- **Video & Trace Links** — embedded video player and downloadable Playwright traces
- **Filtering** — filter by priority (`@p0`, `@p1`, `@smoke`) or status (passed/failed/skipped)
- **AI Verdict Tab** — RCA (Root Cause Analysis) for failed tests via LLM agent
- **Flaky Analyzer Tab** — compares current build vs previous build to detect flaky tests
- **History Page** — browse all past reports at `tta-report/history.html`

```bash
# Reports are generated automatically — just run tests
npx playwright test

# Open the latest report
# Open tta-report/index.html (redirects to latest) or any timestamped report
```

### Allure Report

```bash
# Run tests with Allure reporting
npx playwright test --reporter=allure-playwright

# Generate and open Allure report
npx allure generate ./allure-results --clean
npx allure open
```

---

## ⚙️ Playwright Configuration

| Setting | Value |
|---------|-------|
| Test Directory | `./src/tests` (chromium), `./src/api` (api) |
| Test Timeout | 60 seconds |
| Expect Timeout | 10 seconds |
| Parallelism | Fully parallel |
| Retries (CI) | 2 |
| Retries (local) | 0 |
| Browsers | Chromium (Desktop Chrome) |
| Headless | `false` (headed by default) |
| Viewport | 1920×1080 |
| Reporter | HTML + List + Custom TTA Reporter |
| Screenshot | Gated by `ATTACH_SCREENSHOTS=true` |
| Video | Always on |
| Trace | Always on |

### Multi-Project Setup

The framework uses two Playwright projects to scope test discovery:

| Project | `testDir` | Purpose |
|---------|-----------|---------|
| `chromium` | `./src/tests` | E2E browser tests (TTACart storefront) |
| `api` | `./src/tests/apisTests` | API tests (Restful Booker) |

This means you can run API tests without the browser project overhead:

```bash
# Run only API tests
npx playwright test --project=api

# Run only E2E browser tests
npx playwright test --project=chromium
```

### TypeScript Path Aliases

Import utilities, pages, and fixtures using `@` aliases instead of relative paths:

| Alias | Maps to |
|-------|---------|
| `@pages/*` | `src/pages/*` |
| `@utils/*` | `src/utils/*` |
| `@api/*` | `src/api/*` |
| `@config/*` | `src/config/*` |
| `@fixtures/*` | `src/fixtures/*` |
| `@testdata/*` | `src/testdata/*` |

```typescript
// ✅ With aliases
import { LoginPage } from '@pages/LoginPage';
import { createLogger } from '@utils/logger';

// ❌ Without aliases (works but verbose)
import { LoginPage } from '../pages/LoginPage';
```

---

## 🔧 CI/CD Integration

This framework includes two GitHub Actions workflows:

### Playwright Tests (`.github/workflows/playwright.yml`)

Runs on push/PR to `master`:

- **Checkout** → **Setup Node.js 18** → **Install deps** → **Install Playwright browsers**
- **Seeds `.env`** from `.env.example` before running tests
- **Runs tests** with `xvfb-run` (headless Chromium in CI)
- **Uploads** `playwright-report/` as an artifact (30-day retention)

```yaml
name: Playwright Tests
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: cp .env.example .env
      - run: xvfb-run --auto-servernum npx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Quality Gate (`.github/workflows/quality-gate.yml`)

Runs on PR to `master`/`main`. Enforces the four quality gates from [`docs/quality-gates.md`](docs/quality-gates.md):

- **framework-patterns** — typecheck, spec filename validation, no committed secrets
- **ai-slop** — ESLint, no hallucinated APIs or dead code
- **ponytail** — no duplicate logging or redundant test wrappers
- **over-engineering** — no single-caller abstractions or unused exports

See [`docs/quality-gates.md`](docs/quality-gates.md) for the full ruleset.

---

## 📝 License

ISC