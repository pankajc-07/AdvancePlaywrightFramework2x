# Advance Playwright Framework 2x

A robust, scalable Playwright test automation framework with TypeScript support.

## 📁 Project Structure

```
AdvancePlaywrightFramework2x
├── src/
│   ├── api/          → API clients
│   ├── config/       → Environment configuration
│   ├── fixtures/     → Custom Playwright fixtures
│   ├── pages/        → Page Object Model
│   ├── testdata/     → Test data
│   ├── tests/        → Test cases
│   └── utils/        → Reusable utilities
├── docs/             → Documentation
├── rules/            → Rules
├── .github/          → GitHub workflows
├── .env              → Environment variables
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run a specific test file
npx playwright test src/tests/example.spec.ts

# Run tests with a specific environment
TTA_ENV=qa npx playwright test
```

### Environment Configuration

Set the `TTA_ENV` environment variable to target different environments:

| Value | Environment |
|-------|-------------|
| `qa` | QA (default) |
| `stg` / `stage` / `staging` | Staging |
| `prod` / `production` | Production |
| `dev` / `local` | Development |
| `api` | API Testing |

## 🛠️ Tech Stack

- **Playwright** — End-to-end testing
- **TypeScript** — Type-safe test development
- **dotenv** — Environment variable management
- **Allure** — Test reporting
- **AJV** — JSON schema validation
- **Winston** — Logging
- **Faker.js** — Test data generation
- **xlsx / csv-parse** — Data-driven testing

## 📊 Reports

```bash
# Generate Allure report
npx allure generate ./allure-results --clean
npx allure open
```

## 📝 License

ISC