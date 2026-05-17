# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home Page >> should display portfolio preview section
- Location: e2e\home.spec.ts:24:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3002/
Call log:
  - navigating to "http://localhost:3002/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Home Page', () => {
  4  |   test.beforeEach(async ({ page }) => {
> 5  |     await page.goto('/')
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3002/
  6  |   })
  7  | 
  8  |   test('should display the main heading', async ({ page }) => {
  9  |     await expect(page.getByRole('heading', { name: /Арслан Хыдыров/i })).toBeVisible()
  10 |   })
  11 | 
  12 |   test('should display doctor photo', async ({ page }) => {
  13 |     const doctorImage = page.locator('img[alt*="Арслан Хыдыров"]')
  14 |     await expect(doctorImage).toBeVisible()
  15 |     
  16 |     // Check image loads successfully
  17 |     await expect(doctorImage).toHaveAttribute('src', /doctor\.webp/)
  18 |   })
  19 | 
  20 |   test('should display phone number', async ({ page }) => {
  21 |     await expect(page.getByText('+7 905 009-21-27')).toBeVisible()
  22 |   })
  23 | 
  24 |   test('should display portfolio preview section', async ({ page }) => {
  25 |     await expect(page.getByText('Примеры работ')).toBeVisible()
  26 |   })
  27 | 
  28 |   test('should have working navigation to portfolio page', async ({ page }) => {
  29 |     const portfolioLink = page.getByRole('link', { name: /Все работы/i })
  30 |     await portfolioLink.click()
  31 |     
  32 |     await expect(page).toHaveURL(/portfolio/)
  33 |     await expect(page.getByText('Портфолио работ')).toBeVisible()
  34 |   })
  35 | 
  36 |   test('should display portfolio cards with images', async ({ page }) => {
  37 |     const cards = page.locator('.group:has(img)').first()
  38 |     await expect(cards).toBeVisible()
  39 |     
  40 |     // Check that portfolio images are loaded
  41 |     const portfolioImages = page.locator('img[alt="Имплантация"], img[alt="Лечение кариеса"], img[alt="Микропротезирование"]')
  42 |     await expect(portfolioImages.first()).toBeVisible()
  43 |   })
  44 | 
  45 |   test('should have responsive design', async ({ page }) => {
  46 |     // Mobile viewport
  47 |     await page.setViewportSize({ width: 375, height: 667 })
  48 |     await expect(page.getByRole('heading', { name: /Арслан Хыдыров/i })).toBeVisible()
  49 |     
  50 |     // Tablet viewport
  51 |     await page.setViewportSize({ width: 768, height: 1024 })
  52 |     await expect(page.getByRole('heading', { name: /Арслан Хыдыров/i })).toBeVisible()
  53 |     
  54 |     // Desktop viewport
  55 |     await page.setViewportSize({ width: 1920, height: 1080 })
  56 |     await expect(page.getByRole('heading', { name: /Арслан Хыдыров/i })).toBeVisible()
  57 |   })
  58 | 
  59 |   test('should have no console errors', async ({ page }) => {
  60 |     const consoleErrors: string[] = []
  61 |     
  62 |     page.on('console', (msg) => {
  63 |       if (msg.type() === 'error') {
  64 |         consoleErrors.push(msg.text())
  65 |       }
  66 |     })
  67 |     
  68 |     await page.goto('/')
  69 |     await page.waitForLoadState('networkidle')
  70 |     
  71 |     // Filter out favicon errors
  72 |     const relevantErrors = consoleErrors.filter(
  73 |       error => !error.includes('favicon') && !error.includes('Failed to load resource')
  74 |     )
  75 |     
  76 |     expect(relevantErrors).toHaveLength(0)
  77 |   })
  78 | })
  79 | 
```