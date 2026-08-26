# Steps to Create Playwright TypeScript Framework

## Step-by-Step Commands to Replicate Playwright TypeScript Framework

**Prerequisite:** Ensure Node.js v18+ is installed.

### 1. Create Project Folder and Initialize
```bash
# Create and navigate to new project folder
mkdir NewPlaywrightProject
cd NewPlaywrightProject

# Initialize npm project (accept defaults)
npm init -y
```

### 2. Install Core Dependencies
```bash
# Install Playwright and testing dependencies
npm install --save-dev @playwright/test @types/node

# Install utility libraries
npm install --save-dev @faker-js/faker winston dotenv

# Install additional utilities (optional but used in original)
npm install --save-dev ajv ajv-formats allure-playwright csv-parse jsonpath-plus xlsx
```

### 3. Set Up TypeScript Configuration
```bash
# Initialize TypeScript configuration
npx tsc --init

# Create tsconfig.json with proper settings (you'll need to edit manually)
```

### 4. Install Playwright Browsers
```bash
# Install browsers with dependencies
npx playwright install --with-deps
```

### 5. Create Directory Structure
```bash
# Create main source directories
mkdir -p src/{ai,api,config,fixtures,pages,testdata,tests,utils}
mkdir -p docs logs rules .github
```

### 6. Create Configuration Files
```bash
# Create package.json with proper configuration (edit existing)
# Add this to package.json:
# {
#   "type": "commonjs",
#   "scripts": {
#     "test": "npx playwright test",
#     "test:headed": "npx playwright test --headed",
#     "report": "npx playwright show-report"
#   }
# }

# Create playwright.config.ts
touch playwright.config.ts

# Create .env file for environment variables
touch .env

# Create .gitignore
touch .gitignore
```

### 7. Create Core Utility Files
```bash
# Create utility files
touch src/utils/logger.ts
touch src/utils/UtilElementLocator.ts
touch src/utils/DataGenerator.ts
touch src/pages/BasePage.ts
```

### 8. Create Example Test Files
```bash
# Create example test and page files
touch src/tests/example.spec.ts
touch src/pages/LoginPage.ts
```

### 9. Initialize Git Repository (Optional)
```bash
# Initialize git repository
git init

# Add basic .gitignore for Node.js/Playwright
echo "node_modules/" >> .gitignore
echo "logs/" >> .gitignore
echo "playwright-report/" >> .gitignore
echo "test-results/" >> .gitignore
echo ".env" >> .gitignore
```

### 10. Verify Installation
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Run a simple test to verify setup
npx playwright test --headed
```

### 11. Add Path Aliases to tsconfig.json
```bash
# Edit tsconfig.json to add path aliases:
# {
#   "compilerOptions": {
#     "baseUrl": ".",
#     "paths": {
#       "@api/*": ["src/api/*"],
#       "@config/*": ["src/config/*"],
#       "@fixtures/*": ["src/fixtures/*"],
#       "@pages/*": ["src/pages/*"],
#       "@testdata/*": ["src/testdata/*"],
#       "@utils/*": ["src/utils/*"]
#     }
#   }
# }
```

### 12. Create README and Documentation
```bash
# Create basic documentation
touch README.md
touch AGENTS.md
```

## Important Notes

1. **After running these commands**, you'll need to manually copy or create the content for the configuration files and TypeScript files based on the original project structure.

2. **Windows Users**: Use `mkdir src\ai src\api src\config src\fixtures src\pages src\testdata src\tests src\utils` instead of the `mkdir -p` command with braces.

3. **File Content**: The commands above create the folder structure and install dependencies - you'll need to populate the files with actual code from the original project or write your own implementation.

4. **Path Aliases**: The TypeScript path aliases (`@pages/*`, `@utils/*`, etc.) need to be configured in `tsconfig.json` for imports to work correctly.

5. **Environment Variables**: Create a `.env` file with necessary environment variables like `TTA_ENV`, `BASE_URL`, etc.

## Quick Reference Commands

```bash
# Complete setup (run in sequence)
mkdir NewPlaywrightProject && cd NewPlaywrightProject
npm init -y
npm install --save-dev @playwright/test @types/node @faker-js/faker winston dotenv
npx playwright install --with-deps
mkdir -p src/{ai,api,config,fixtures,pages,testdata,tests,utils}
mkdir -p docs logs rules .github
touch playwright.config.ts .env .gitignore
touch src/utils/logger.ts src/utils/UtilElementLocator.ts src/utils/DataGenerator.ts src/pages/BasePage.ts
touch src/tests/example.spec.ts src/pages/LoginPage.ts
git init
echo "node_modules/" >> .gitignore
echo "logs/" >> .gitignore
echo "playwright-report/" >> .gitignore
echo "test-results/" >> .gitignore
echo ".env" >> .gitignore
npx tsc --noEmit
```

## Configuration File Templates

### package.json additions:
```json
{
  "type": "commonjs",
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "report": "npx playwright show-report"
  }
}
```

### tsconfig.json additions:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "lib": ["ES2022"],
    "types": ["node"],
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@api/*": ["src/api/*"],
      "@config/*": ["src/config/*"],
      "@fixtures/*": ["src/fixtures/*"],
      "@pages/*": ["src/pages/*"],
      "@testdata/*": ["src/testdata/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src", "playwright.config.ts"],
  "exclude": ["node_modules"]
}
```

### .env template:
```bash
# Environment configuration
TTA_ENV=qa
BASE_URL=https://app.thetestingacademy.com

# Logging
LOG_LEVEL=info

# API configuration (if needed)
API_BASE_URL=https://restful-booker.herokuapp.com
```

### .gitignore additions:
```bash
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Playwright
playwright-report/
test-results/
trace/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```