# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility >> home page should have proper heading hierarchy
- Location: e2e\accessibility.spec.ts:4:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('h1')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('h1')
    13 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- main [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e4]: "404"
    - paragraph [ref=e5]: The requested path could not be found
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test.describe('Accessibility', () => {
  4   |   test('home page should have proper heading hierarchy', async ({ page }) => {
  5   |     await page.goto('/')
  6   |     
  7   |     // Should have h1
  8   |     const h1 = page.locator('h1')
> 9   |     await expect(h1).toHaveCount(1)
      |                      ^ Error: expect(locator).toHaveCount(expected) failed
  10  |     
  11  |     // Check heading levels don't skip
  12  |     const headings = await page.locator('h1, h2, h3').all()
  13  |     let previousLevel = 0
  14  |     
  15  |     for (const heading of headings) {
  16  |       const level = parseInt(await heading.evaluate(el => el.tagName)[1])
  17  |       expect(level).toBeLessThanOrEqual(previousLevel + 1)
  18  |       previousLevel = level
  19  |     }
  20  |   })
  21  | 
  22  |   test('images should have alt text', async ({ page }) => {
  23  |     await page.goto('/')
  24  |     
  25  |     const images = page.locator('img')
  26  |     const count = await images.count()
  27  |     
  28  |     for (let i = 0; i < count; i++) {
  29  |       const alt = await images.nth(i).getAttribute('alt')
  30  |       expect(alt).toBeTruthy()
  31  |     }
  32  |   })
  33  | 
  34  |   test('links should have discernible text', async ({ page }) => {
  35  |     await page.goto('/')
  36  |     
  37  |     const links = page.locator('a')
  38  |     const count = await links.count()
  39  |     
  40  |     for (let i = 0; i < count; i++) {
  41  |       const text = await links.nth(i).textContent()
  42  |       const ariaLabel = await links.nth(i).getAttribute('aria-label')
  43  |       
  44  |       expect(text?.trim() || ariaLabel).toBeTruthy()
  45  |     }
  46  |   })
  47  | 
  48  |   test('buttons should have accessible names', async ({ page }) => {
  49  |     await page.goto('/portfolio')
  50  |     
  51  |     const buttons = page.locator('button')
  52  |     const count = await buttons.count()
  53  |     
  54  |     for (let i = 0; i < Math.min(count, 10); i++) {
  55  |       const button = buttons.nth(i)
  56  |       const text = await button.textContent()
  57  |       const ariaLabel = await button.getAttribute('aria-label')
  58  |       
  59  |       expect(text?.trim() || ariaLabel).toBeTruthy()
  60  |     }
  61  |   })
  62  | 
  63  |   test('color contrast should be sufficient', async ({ page }) => {
  64  |     await page.goto('/')
  65  |     
  66  |     // Check that text is readable (this is a basic check)
  67  |     const body = page.locator('body')
  68  |     const color = await body.evaluate(el => getComputedStyle(el).color)
  69  |     const bgColor = await body.evaluate(el => getComputedStyle(el).backgroundColor)
  70  |     
  71  |     expect(color).not.toBe('rgba(0, 0, 0, 0)')
  72  |     expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
  73  |   })
  74  | 
  75  |   test('should be keyboard navigable', async ({ page }) => {
  76  |     await page.goto('/')
  77  |     
  78  |     // Press Tab multiple times
  79  |     for (let i = 0; i < 5; i++) {
  80  |       await page.keyboard.press('Tab')
  81  |     }
  82  |     
  83  |     // Some element should have focus
  84  |     const activeElement = await page.evaluate(() => document.activeElement?.tagName)
  85  |     expect(activeElement).not.toBe('BODY')
  86  |   })
  87  | 
  88  |   test('portfolio modal should trap focus', async ({ page }) => {
  89  |     await page.goto('/portfolio')
  90  |     
  91  |     // Open modal
  92  |     await page.locator('button.group').first().click()
  93  |     
  94  |     // Modal should be visible
  95  |     await expect(page.locator('text=1 /')).toBeVisible()
  96  |     
  97  |     // Close button should be visible and clickable
  98  |     const closeButton = page.locator('button:has([name="x"])')
  99  |     await expect(closeButton).toBeVisible()
  100 |   })
  101 | })
  102 | 
```