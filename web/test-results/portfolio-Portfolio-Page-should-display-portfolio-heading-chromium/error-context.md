# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Portfolio Page >> should display portfolio heading
- Location: e2e\portfolio.spec.ts:8:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Портфолио работ')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Портфолио работ')

```

```yaml
- main:
  - text: "404"
  - paragraph: The requested path could not be found
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test.describe('Portfolio Page', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/portfolio')
  6   |   })
  7   | 
  8   |   test('should display portfolio heading', async ({ page }) => {
> 9   |     await expect(page.getByText('Портфолио работ')).toBeVisible()
      |                                                     ^ Error: expect(locator).toBeVisible() failed
  10  |   })
  11  | 
  12  |   test('should display portfolio grid with items', async ({ page }) => {
  13  |     const gridItems = page.locator('button.group').filter({ has: page.locator('img') })
  14  |     await expect(gridItems).toHaveCount(5)
  15  |   })
  16  | 
  17  |   test('should display all work categories', async ({ page }) => {
  18  |     await expect(page.getByText('Хирургия')).toBeVisible()
  19  |     await expect(page.getByText('Терапия')).toBeVisible()
  20  |     await expect(page.getByText('Ортопедия')).toHaveCount(3)
  21  |   })
  22  | 
  23  |   test('should open carousel modal on item click', async ({ page }) => {
  24  |     const firstItem = page.locator('button.group').first()
  25  |     await firstItem.click()
  26  |     
  27  |     // Modal should be visible
  28  |     await expect(page.locator('text=1 /')).toBeVisible()
  29  |     await expect(page.locator('text=Восстановление трёх жевательных зубов')).toBeVisible()
  30  |   })
  31  | 
  32  |   test('should navigate between images in carousel', async ({ page }) => {
  33  |     // Click on item with multiple images (Лечение кариеса has 4 images)
  34  |     const cariesItem = page.locator('button.group', { hasText: 'Лечение кариеса' })
  35  |     await cariesItem.click()
  36  |     
  37  |     // Check initial state
  38  |     await expect(page.locator('text=1 / 4')).toBeVisible()
  39  |     
  40  |     // Click next
  41  |     await page.locator('button:has([name="chevron-right"])').click()
  42  |     await expect(page.locator('text=2 / 4')).toBeVisible()
  43  |     
  44  |     // Click previous
  45  |     await page.locator('button:has([name="chevron-left"])').click()
  46  |     await expect(page.locator('text=1 / 4')).toBeVisible()
  47  |   })
  48  | 
  49  |   test('should close modal on X click', async ({ page }) => {
  50  |     const firstItem = page.locator('button.group').first()
  51  |     await firstItem.click()
  52  |     
  53  |     // Modal is open
  54  |     await expect(page.locator('text=1 /')).toBeVisible()
  55  |     
  56  |     // Click X button
  57  |     await page.locator('button:has([name="x"])').click()
  58  |     
  59  |     // Modal should be closed
  60  |     await expect(page.locator('text=1 /')).not.toBeVisible()
  61  |   })
  62  | 
  63  |   test('should close modal on backdrop click', async ({ page }) => {
  64  |     const firstItem = page.locator('button.group').first()
  65  |     await firstItem.click()
  66  |     
  67  |     // Modal is open
  68  |     await expect(page.locator('text=1 /')).toBeVisible()
  69  |     
  70  |     // Click on backdrop (outside modal content)
  71  |     await page.locator('.fixed.inset-0').click({ position: { x: 10, y: 10 } })
  72  |     
  73  |     // Modal should be closed
  74  |     await expect(page.locator('text=1 /')).not.toBeVisible()
  75  |   })
  76  | 
  77  |   test('should display thumbnails for multi-image works', async ({ page }) => {
  78  |     // Click on item with multiple images
  79  |     const cariesItem = page.locator('button.group', { hasText: 'Лечение кариеса' })
  80  |     await cariesItem.click()
  81  |     
  82  |     // Thumbnails should be visible
  83  |     const thumbnails = page.locator('.mt-4.flex button')
  84  |     await expect(thumbnails).toHaveCount(4)
  85  |   })
  86  | 
  87  |   test('should navigate using thumbnails', async ({ page }) => {
  88  |     const cariesItem = page.locator('button.group', { hasText: 'Лечение кариеса' })
  89  |     await cariesItem.click()
  90  |     
  91  |     // Click third thumbnail
  92  |     const thumbnails = page.locator('.mt-4.flex button')
  93  |     await thumbnails.nth(2).click()
  94  |     
  95  |     // Should show 3 / 4
  96  |     await expect(page.locator('text=3 / 4')).toBeVisible()
  97  |   })
  98  | 
  99  |   test('should display single image work without thumbnails', async ({ page }) => {
  100 |     // Click on Циркониевые коронки (1 image)
  101 |     const zirconiaItem = page.locator('button.group', { hasText: 'Циркониевые коронки' })
  102 |     await zirconiaItem.click()
  103 |     
  104 |     // Should show 1 / 1
  105 |     await expect(page.locator('text=1 / 1')).toBeVisible()
  106 |     
  107 |     // Should not have navigation arrows or thumbnails
  108 |     await expect(page.locator('.mt-4.flex button')).not.toBeVisible()
  109 |   })
```