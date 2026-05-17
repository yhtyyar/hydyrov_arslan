import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Portfolio Page Object Model
 */
export class PortfolioPage extends BasePage {
  // Locators
  readonly heading: Locator
  readonly portfolioGrid: Locator
  readonly portfolioItems: Locator
  readonly modal: Locator
  readonly modalCloseButton: Locator
  readonly modalCounter: Locator
  readonly modalPrevButton: Locator
  readonly modalNextButton: Locator
  readonly thumbnails: Locator
  readonly contactCta: Locator
  readonly phoneNumber: Locator
  readonly telegramButton: Locator

  constructor(page: Page) {
    super(page, '/portfolio')
    
    // Initialize locators
    this.heading = page.getByText('Портфолио работ')
    this.portfolioGrid = page.locator('.grid').filter({ has: page.locator('button.group') })
    this.portfolioItems = page.locator('button.group')
    this.modal = page.locator('.fixed.inset-0').filter({ has: page.locator('img') })
    this.modalCloseButton = page.locator('button[aria-label="Close"]')
    this.modalCounter = page.locator('text=/\\d+ \\/ \\d+/')
    this.modalPrevButton = page.locator('button').filter({ has: page.locator('svg[name="chevron-left"]') })
    this.modalNextButton = page.locator('button').filter({ has: page.locator('svg[name="chevron-right"]') })
    this.thumbnails = page.locator('.mt-4.flex button')
    this.contactCta = page.getByText('Хотите такой же результат?')
    this.phoneNumber = page.getByText('+7 905 009-21-27')
    this.telegramButton = page.getByText('Написать в Telegram')
  }

  /**
   * Navigate to portfolio page
   */
  async goto(): Promise<void> {
    await this.page.goto('/portfolio')
    await this.waitForLoad()
  }

  /**
   * Verify page heading
   */
  async assertHeading(): Promise<void> {
    await expect(this.heading).toBeVisible()
  }

  /**
   * Get count of portfolio items
   */
  async getPortfolioItemCount(): Promise<number> {
    return this.portfolioItems.count()
  }

  /**
   * Click on portfolio item by index
   */
  async clickPortfolioItem(index: number): Promise<void> {
    await this.portfolioItems.nth(index).click()
    await this.page.waitForTimeout(300)
  }

  /**
   * Open portfolio item by title
   */
  async openItemByTitle(title: string): Promise<void> {
    const item = this.page.locator('button.group', { hasText: title })
    await item.click()
    await this.page.waitForTimeout(300)
  }

  /**
   * Verify modal is open
   */
  async assertModalOpen(): Promise<void> {
    await expect(this.modal).toBeVisible()
    await expect(this.modalCounter).toBeVisible()
  }

  /**
   * Close modal
   */
  async closeModal(): Promise<void> {
    await this.modalCloseButton.click()
    await this.page.waitForTimeout(300)
  }

  /**
   * Verify modal is closed
   */
  async assertModalClosed(): Promise<void> {
    await expect(this.modal).not.toBeVisible()
  }

  /**
   * Navigate to next image in modal
   */
  async nextImage(): Promise<void> {
    await this.modalNextButton.click()
    await this.page.waitForTimeout(200)
  }

  /**
   * Navigate to previous image in modal
   */
  async prevImage(): Promise<void> {
    await this.modalPrevButton.click()
    await this.page.waitForTimeout(200)
  }

  /**
   * Click on thumbnail
   */
  async clickThumbnail(index: number): Promise<void> {
    await this.thumbnails.nth(index).click()
    await this.page.waitForTimeout(200)
  }

  /**
   * Get current image counter text
   */
  async getCounterText(): Promise<string | null> {
    return this.modalCounter.textContent()
  }

  /**
   * Verify contact CTA section
   */
  async assertContactCta(): Promise<void> {
    await expect(this.contactCta).toBeVisible()
    await expect(this.phoneNumber).toBeVisible()
    await expect(this.telegramButton).toBeVisible()
  }

  /**
   * Check all portfolio items have images
   */
  async assertAllItemsHaveImages(): Promise<void> {
    const count = await this.portfolioItems.count()
    expect(count).toBeGreaterThan(0)
    
    for (let i = 0; i < count; i++) {
      const item = this.portfolioItems.nth(i)
      const img = item.locator('img')
      await expect(img).toBeVisible()
      
      // Verify image loads
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth)
      expect(naturalWidth).toBeGreaterThan(0)
    }
  }

  /**
   * Check category badges are present
   */
  async assertCategoryBadges(): Promise<void> {
    const categories = ['Хирургия', 'Терапия', 'Ортопедия']
    for (const category of categories) {
      const badge = this.page.locator('text=' + category).first()
      await expect(badge).toBeVisible()
    }
  }

  /**
   * Verify image counter updates correctly
   */
  async assertCounterUpdates(): Promise<void> {
    // Open an item with multiple images
    await this.openItemByTitle('Лечение кариеса')
    await this.assertModalOpen()
    
    // Check initial counter
    const initialCounter = await this.getCounterText()
    expect(initialCounter).toMatch(/1 \\/ 4/)
    
    // Navigate next
    await this.nextImage()
    const nextCounter = await this.getCounterText()
    expect(nextCounter).toMatch(/2 \\/ 4/)
    
    // Navigate prev
    await this.prevImage()
    const prevCounter = await this.getCounterText()
    expect(prevCounter).toMatch(/1 \\/ 4/)
    
    await this.closeModal()
  }

  /**
   * Test keyboard navigation in modal
   */
  async testKeyboardNavigation(): Promise<void> {
    await this.openItemByTitle('Имплантация в области 44–46')
    await this.assertModalOpen()
    
    // Press Escape to close
    await this.page.keyboard.press('Escape')
    await this.assertModalClosed()
  }

  /**
   * Verify responsive grid layout
   */
  async assertResponsiveGrid(): Promise<void> {
    // Desktop
    await this.page.setViewportSize({ width: 1280, height: 800 })
    await this.page.waitForTimeout(500)
    const desktopItems = await this.portfolioItems.count()
    expect(desktopItems).toBeGreaterThan(0)
    
    // Tablet
    await this.page.setViewportSize({ width: 768, height: 1024 })
    await this.page.waitForTimeout(500)
    const tabletItems = await this.portfolioItems.count()
    expect(tabletItems).toBe(desktopItems)
    
    // Mobile
    await this.page.setViewportSize({ width: 375, height: 667 })
    await this.page.waitForTimeout(500)
    const mobileItems = await this.portfolioItems.count()
    expect(mobileItems).toBe(desktopItems)
  }

  /**
   * Take portfolio grid screenshot
   */
  async screenshotGrid(): Promise<void> {
    await this.portfolioGrid.screenshot({ path: './e2e/screenshots/portfolio-grid.png' })
  }
}
