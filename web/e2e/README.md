# E2E Tests Documentation

## Page Object Model (POM) Architecture

This directory contains end-to-end tests using Playwright with Page Object Model pattern.

### Structure

```
e2e/
├── pages/              # Page Object Models
│   ├── BasePage.ts     # Base class with common methods
│   ├── HomePage.ts     # Home page specific methods
│   ├── PortfolioPage.ts # Portfolio page specific methods
│   └── index.ts        # Centralized exports
├── *.spec.ts           # Test files using POM
└── screenshots/        # Generated screenshots
```

### Page Object Model Benefits

1. **Code Reusability** - Common actions encapsulated in page classes
2. **Maintainability** - UI changes only require updates in one place
3. **Readability** - Tests read like natural language
4. **Abstraction** - Test logic separated from implementation details

### Example Usage

```typescript
import { test } from '@playwright/test'
import { HomePage } from './pages'

test('hero section is visible', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.goto()
  await homePage.assertHeroSection()
})
```

### Best Practices

1. **Use PageFactory** for creating multiple pages
2. **Add assertions to page objects** for common checks
3. **Use meaningful method names** describing user actions
4. **Keep locators private** - expose only methods
5. **Handle waits automatically** in page methods

### Running Tests

```bash
# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test e2e/pom-home.spec.ts

# Run with UI mode
npx playwright test --ui

# Run with specific browser
npx playwright test --project=chromium
```

### Visual Regression Testing

Screenshots are saved to `e2e/screenshots/` and can be used for visual regression.

### CI/CD Integration

Tests run automatically on:
- Pull requests to main
- Pushes to main/develop

Reports are uploaded as artifacts.
