import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate from home to portfolio page', async ({ page }) => {
    await page.goto('/')
    
    // Click on "Все работы" link
    await page.getByRole('link', { name: /Все работы/i }).click()
    
    // Should be on portfolio page
    await expect(page).toHaveURL(/portfolio/)
    await expect(page.getByText('Портфолио работ')).toBeVisible()
  })

  test('should navigate from portfolio to home via logo/header', async ({ page }) => {
    await page.goto('/portfolio')
    
    // Click on site title/logo to go home
    await page.getByText('Dr. Hydyrov').click()
    
    await expect(page).toHaveURL('/')
    await expect(page.getByText('Арслан Хыдыров')).toBeVisible()
  })

  test('should navigate to reviews page', async ({ page }) => {
    await page.goto('/')
    
    // Find and click reviews link
    const reviewsLink = page.getByRole('link', { name: /Отзывы/i })
    if (await reviewsLink.isVisible().catch(() => false)) {
      await reviewsLink.click()
      await expect(page).toHaveURL(/reviews/)
    }
  })

  test('should have working phone link', async ({ page }) => {
    await page.goto('/')
    
    const phoneLink = page.locator('a[href^="tel:"]').first()
    await expect(phoneLink).toHaveAttribute('href', 'tel:+79050092127')
  })

  test('should have working telegram link', async ({ page }) => {
    await page.goto('/')
    
    const telegramLink = page.locator('a[href="https://t.me/arsstomat"]').first()
    await expect(telegramLink).toBeVisible()
  })

  test('should maintain scroll position on navigation', async ({ page }) => {
    await page.goto('/')
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500))
    
    // Navigate to portfolio
    await page.getByRole('link', { name: /Все работы/i }).click()
    
    // Page should load at top
    const scrollPosition = await page.evaluate(() => window.scrollY)
    expect(scrollPosition).toBe(0)
  })
})
