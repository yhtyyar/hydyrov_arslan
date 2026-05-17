import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Арслан Хыдыров/i })).toBeVisible()
  })

  test('should display doctor photo', async ({ page }) => {
    const doctorImage = page.locator('img[alt*="Арслан Хыдыров"]')
    await expect(doctorImage).toBeVisible()
    
    // Check image loads successfully
    await expect(doctorImage).toHaveAttribute('src', /doctor\.webp/)
  })

  test('should display phone number', async ({ page }) => {
    await expect(page.getByText('+7 905 009-21-27')).toBeVisible()
  })

  test('should display portfolio preview section', async ({ page }) => {
    await expect(page.getByText('Примеры работ')).toBeVisible()
  })

  test('should have working navigation to portfolio page', async ({ page }) => {
    const portfolioLink = page.getByRole('link', { name: /Все работы/i })
    await portfolioLink.click()
    
    await expect(page).toHaveURL(/portfolio/)
    await expect(page.getByText('Портфолио работ')).toBeVisible()
  })

  test('should display portfolio cards with images', async ({ page }) => {
    const cards = page.locator('.group:has(img)').first()
    await expect(cards).toBeVisible()
    
    // Check that portfolio images are loaded
    const portfolioImages = page.locator('img[alt="Имплантация"], img[alt="Лечение кариеса"], img[alt="Микропротезирование"]')
    await expect(portfolioImages.first()).toBeVisible()
  })

  test('should have responsive design', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('heading', { name: /Арслан Хыдыров/i })).toBeVisible()
    
    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('heading', { name: /Арслан Хыдыров/i })).toBeVisible()
    
    // Desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByRole('heading', { name: /Арслан Хыдыров/i })).toBeVisible()
  })

  test('should have no console errors', async ({ page }) => {
    const consoleErrors: string[] = []
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Filter out favicon errors
    const relevantErrors = consoleErrors.filter(
      error => !error.includes('favicon') && !error.includes('Failed to load resource')
    )
    
    expect(relevantErrors).toHaveLength(0)
  })
})
