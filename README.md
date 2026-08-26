# Advance Playwright Framework 2x

A robust, scalable, and production-ready Playwright test automation framework with TypeScript, designed for end-to-end, API, and data-driven testing.

## 📁 Project Structure

```
AdvancePlaywrightFramework2x/
├── src/
│   ├── ai/               → AI agents (RCA, flaky analyzer, LLM config)
│   ├── api/              → API client modules (REST/GraphQL)
│   ├── config/           → Centralized environment configuration
│   ├── fixtures/         → Custom Playwright fixtures (auth, DB, API)
│   ├── pages/            → Page Object Model (POM) classes
│   ├── testdata/         → Static test data, CSV/Excel, Faker factories
│   ├── tests/            → Test specifications (*.spec.ts)
│   └── utils/            → Reusable utilities (logger, validators, parsers)
├── docs/                 → Project documentation & architecture decisions
├── rules/                → Linting rules & coding standards
├── .github/              → GitHub Actions CI/CD workflows
├── .env                  → Environment variables
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

Create or update the `.env` file in the project root:

```env
TTA_ENV=qa

# Base URLs per environment
QA_BASE_URL=https://app.thetestingacademy.com
STG_BASE_URL=https://stage.thetestingacademy.com
PROD_BASE_URL=https://app.thetestingacademy.com
DEV_BASE_URL=http://localhost:3000
API_BASE_URL=https://restful-booker.herokuapp.com
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

# Run tests for a specific project (browser)
npx playwright test --project=chromium

# Run tests with a specific environment
TTA_ENV=staging npx playwright test

# Run tests in debug mode
npx playwright test --debug
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

### Logging
Centralized Winston logger under `src/utils/` with configurable log levels, formats, and transports.

---

## � Documentation

Detailed framework documentation is available in the [`docs/`](docs/) folder:

| Document | Description |
|----------|-------------|
| [`docs/project-structure.md`](docs/project-structure.md) | Folder structure, execution flow diagram, component summaries, and known gaps |
| [`docs/deep-dive.md`](docs/deep-dive.md) | Line-by-line deep-dive of every source file — BasePage, UtilElementLocator, CustomReporter, AI agents, DataGenerator, logger, playwright config, and more |

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
| Test Directory | `./src/tests` |
| Test Timeout | 60 seconds |
| Expect Timeout | 10 seconds |
| Parallelism | Fully parallel |
| Retries (CI) | 2 |
| Retries (local) | 0 |
| Browsers | Chromium (Desktop Chrome) |
| Reporter | HTML + List + Custom TTA Reporter |
| Screenshot | On failure |
| Video | Always on |
| Trace | Always on |

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

This framework is ready for GitHub Actions. Add a `.github/workflows/playwright.yml` file to run tests on push/PR.

Example workflow:

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
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📝 License

ISC