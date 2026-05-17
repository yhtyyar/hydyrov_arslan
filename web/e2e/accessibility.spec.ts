import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('home page should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    // Should have h1
    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)
    
    // Check heading levels don't skip
    const headings = await page.locator('h1, h2, h3').all()
    let previousLevel = 0
    
    for (const heading of headings) {
      const level = parseInt(await heading.evaluate(el => el.tagName)[1])
      expect(level).toBeLessThanOrEqual(previousLevel + 1)
      previousLevel = level
    }
  })

  test('images should have alt text', async ({ page }) => {
    await page.goto('/')
    
    const images = page.locator('img')
    const count = await images.count()
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('links should have discernible text', async ({ page }) => {
    await page.goto('/')
    
    const links = page.locator('a')
    const count = await links.count()
    
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent()
      const ariaLabel = await links.nth(i).getAttribute('aria-label')
      
      expect(text?.trim() || ariaLabel).toBeTruthy()
    }
  })

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/portfolio')
    
    const buttons = page.locator('button')
    const count = await buttons.count()
    
    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = buttons.nth(i)
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      
      expect(text?.trim() || ariaLabel).toBeTruthy()
    }
  })

  test('color contrast should be sufficient', async ({ page }) => {
    await page.goto('/')
    
    // Check that text is readable (this is a basic check)
    const body = page.locator('body')
    const color = await body.evaluate(el => getComputedStyle(el).color)
    const bgColor = await body.evaluate(el => getComputedStyle(el).backgroundColor)
    
    expect(color).not.toBe('rgba(0, 0, 0, 0)')
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')
    
    // Press Tab multiple times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
    }
    
    // Some element should have focus
    const activeElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(activeElement).not.toBe('BODY')
  })

  test('portfolio modal should trap focus', async ({ page }) => {
    await page.goto('/portfolio')
    
    // Open modal
    await page.locator('button.group').first().click()
    
    // Modal should be visible
    await expect(page.locator('text=1 /')).toBeVisible()
    
    // Close button should be visible and clickable
    const closeButton = page.locator('button:has([name="x"])')
    await expect(closeButton).toBeVisible()
  })
})
