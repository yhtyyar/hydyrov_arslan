# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> should have working phone link
- Location: e2e\navigation.spec.ts:36:7

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('a[href^="tel:"]').first()
Expected: "tel:+79050092127"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('a[href^="tel:"]').first()

```

```yaml
- main:
  - text: "404"
  - paragraph: The requested path could not be found
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Navigation', () => {
  4  |   test('should navigate from home to portfolio page', async ({ page }) => {
  5  |     await page.goto('/')
  6  |     
  7  |     // Click on "Все работы" link
  8  |     await page.getByRole('link', { name: /Все работы/i }).click()
  9  |     
  10 |     // Should be on portfolio page
  11 |     await expect(page).toHaveURL(/portfolio/)
  12 |     await expect(page.getByText('Портфолио работ')).toBeVisible()
  13 |   })
  14 | 
  15 |   test('should navigate from portfolio to home via logo/header', async ({ page }) => {
  16 |     await page.goto('/portfolio')
  17 |     
  18 |     // Click on site title/logo to go home
  19 |     await page.getByText('Dr. Hydyrov').click()
  20 |     
  21 |     await expect(page).toHaveURL('/')
  22 |     await expect(page.getByText('Арслан Хыдыров')).toBeVisible()
  23 |   })
  24 | 
  25 |   test('should navigate to reviews page', async ({ page }) => {
  26 |     await page.goto('/')
  27 |     
  28 |     // Find and click reviews link
  29 |     const reviewsLink = page.getByRole('link', { name: /Отзывы/i })
  30 |     if (await reviewsLink.isVisible().catch(() => false)) {
  31 |       await reviewsLink.click()
  32 |       await expect(page).toHaveURL(/reviews/)
  33 |     }
  34 |   })
  35 | 
  36 |   test('should have working phone link', async ({ page }) => {
  37 |     await page.goto('/')
  38 |     
  39 |     const phoneLink = page.locator('a[href^="tel:"]').first()
> 40 |     await expect(phoneLink).toHaveAttribute('href', 'tel:+79050092127')
     |                             ^ Error: expect(locator).toHaveAttribute(expected) failed
  41 |   })
  42 | 
  43 |   test('should have working telegram link', async ({ page }) => {
  44 |     await page.goto('/')
  45 |     
  46 |     const telegramLink = page.locator('a[href="https://t.me/arsstomat"]').first()
  47 |     await expect(telegramLink).toBeVisible()
  48 |   })
  49 | 
  50 |   test('should maintain scroll position on navigation', async ({ page }) => {
  51 |     await page.goto('/')
  52 |     
  53 |     // Scroll down
  54 |     await page.evaluate(() => window.scrollTo(0, 500))
  55 |     
  56 |     // Navigate to portfolio
  57 |     await page.getByRole('link', { name: /Все работы/i }).click()
  58 |     
  59 |     // Page should load at top
  60 |     const scrollPosition = await page.evaluate(() => window.scrollY)
  61 |     expect(scrollPosition).toBe(0)
  62 |   })
  63 | })
  64 | 
```