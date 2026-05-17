import { test, expect } from '@playwright/test'

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio')
  })

  test('should display portfolio heading', async ({ page }) => {
    await expect(page.getByText('Портфолио работ')).toBeVisible()
  })

  test('should display portfolio grid with items', async ({ page }) => {
    const gridItems = page.locator('button.group').filter({ has: page.locator('img') })
    await expect(gridItems).toHaveCount(5)
  })

  test('should display all work categories', async ({ page }) => {
    await expect(page.getByText('Хирургия')).toBeVisible()
    await expect(page.getByText('Терапия')).toBeVisible()
    await expect(page.getByText('Ортопедия')).toHaveCount(3)
  })

  test('should open carousel modal on item click', async ({ page }) => {
    const firstItem = page.locator('button.group').first()
    await firstItem.click()
    
    // Modal should be visible
    await expect(page.locator('text=1 /')).toBeVisible()
    await expect(page.locator('text=Восстановление трёх жевательных зубов')).toBeVisible()
  })

  test('should navigate between images in carousel', async ({ page }) => {
    // Click on item with multiple images (Лечение кариеса has 4 images)
    const cariesItem = page.locator('button.group', { hasText: 'Лечение кариеса' })
    await cariesItem.click()
    
    // Check initial state
    await expect(page.locator('text=1 / 4')).toBeVisible()
    
    // Click next
    await page.locator('button:has([name="chevron-right"])').click()
    await expect(page.locator('text=2 / 4')).toBeVisible()
    
    // Click previous
    await page.locator('button:has([name="chevron-left"])').click()
    await expect(page.locator('text=1 / 4')).toBeVisible()
  })

  test('should close modal on X click', async ({ page }) => {
    const firstItem = page.locator('button.group').first()
    await firstItem.click()
    
    // Modal is open
    await expect(page.locator('text=1 /')).toBeVisible()
    
    // Click X button
    await page.locator('button:has([name="x"])').click()
    
    // Modal should be closed
    await expect(page.locator('text=1 /')).not.toBeVisible()
  })

  test('should close modal on backdrop click', async ({ page }) => {
    const firstItem = page.locator('button.group').first()
    await firstItem.click()
    
    // Modal is open
    await expect(page.locator('text=1 /')).toBeVisible()
    
    // Click on backdrop (outside modal content)
    await page.locator('.fixed.inset-0').click({ position: { x: 10, y: 10 } })
    
    // Modal should be closed
    await expect(page.locator('text=1 /')).not.toBeVisible()
  })

  test('should display thumbnails for multi-image works', async ({ page }) => {
    // Click on item with multiple images
    const cariesItem = page.locator('button.group', { hasText: 'Лечение кариеса' })
    await cariesItem.click()
    
    // Thumbnails should be visible
    const thumbnails = page.locator('.mt-4.flex button')
    await expect(thumbnails).toHaveCount(4)
  })

  test('should navigate using thumbnails', async ({ page }) => {
    const cariesItem = page.locator('button.group', { hasText: 'Лечение кариеса' })
    await cariesItem.click()
    
    // Click third thumbnail
    const thumbnails = page.locator('.mt-4.flex button')
    await thumbnails.nth(2).click()
    
    // Should show 3 / 4
    await expect(page.locator('text=3 / 4')).toBeVisible()
  })

  test('should display single image work without thumbnails', async ({ page }) => {
    // Click on Циркониевые коронки (1 image)
    const zirconiaItem = page.locator('button.group', { hasText: 'Циркониевые коронки' })
    await zirconiaItem.click()
    
    // Should show 1 / 1
    await expect(page.locator('text=1 / 1')).toBeVisible()
    
    // Should not have navigation arrows or thumbnails
    await expect(page.locator('.mt-4.flex button')).not.toBeVisible()
  })

  test('should have contact CTA section', async ({ page }) => {
    await expect(page.getByText('Хотите такой же результат?')).toBeVisible()
    await expect(page.getByText('+7 905 009-21-27')).toBeVisible()
    await expect(page.getByText('Написать в Telegram')).toBeVisible()
  })

  test('should have responsive portfolio grid', async ({ page }) => {
    // Mobile: 1 column
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('button.group').first()).toBeVisible()
    
    // Tablet: 2 columns
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('button.group').first()).toBeVisible()
    
    // Desktop: 3 columns
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('button.group').first()).toBeVisible()
  })
})
