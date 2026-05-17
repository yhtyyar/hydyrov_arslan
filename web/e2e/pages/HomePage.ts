import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Home Page Object Model
 */
export class HomePage extends BasePage {
  // Locators
  readonly heroHeading: Locator
  readonly doctorName: Locator
  readonly phoneLink: Locator
  readonly telegramLink: Locator
  readonly portfolioSection: Locator
  readonly reviewsSection: Locator
  readonly servicesSection: Locator
  readonly contactSection: Locator
  readonly viewAllWorksLink: Locator
  readonly heroImage: Locator
  readonly ctaButtons: Locator

  constructor(page: Page) {
    super(page, '/')
    
    // Initialize locators
    this.heroHeading = page.locator('h1')
    this.doctorName = page.getByText('Арслан Хыдыров')
    this.phoneLink = page.locator('a[href^="tel:"]')
    this.telegramLink = page.locator('a[href="https://t.me/arsstomat"]')
    this.portfolioSection = page.locator('text=Примеры работ')
    this.reviewsSection = page.locator('text=Отзывы пациентов')
    this.servicesSection = page.locator('text=Услуги')
    this.contactSection = page.locator('text=Контакты')
    this.viewAllWorksLink = page.getByRole('link', { name: /Все работы/i })
    this.heroImage = page.locator('img[alt*="Арслан Хыдыров"]')
    this.ctaButtons = page.locator('a').filter({ hasText: /\+7|Бесплатная/ })
  }

  /**
   * Navigate to home page
   */
  async goto(): Promise<void> {
    await this.page.goto('/')
    await this.waitForLoad()
  }

  /**
   * Verify hero section is displayed
   */
  async assertHeroSection(): Promise<void> {
    await expect(this.heroHeading).toBeVisible()
    await expect(this.doctorName).toBeVisible()
    await expect(this.heroImage).toBeVisible()
  }

  /**
   * Navigate to portfolio page
   */
  async navigateToPortfolio(): Promise<void> {
    await this.viewAllWorksLink.click()
    await this.page.waitForURL(/portfolio/)
  }

  /**
   * Get hero heading text
   */
  async getHeroHeading(): Promise<string | null> {
    return this.heroHeading.textContent()
  }

  /**
   * Click phone link
   */
  async clickPhoneLink(): Promise<void> {
    await this.phoneLink.first().click()
  }

  /**
   * Verify all sections are present
   */
  async assertAllSectionsPresent(): Promise<void> {
    await expect(this.portfolioSection).toBeVisible()
    await expect(this.reviewsSection).toBeVisible()
    await expect(this.servicesSection).toBeVisible()
    await expect(this.contactSection).toBeVisible()
  }

  /**
   * Check hero has valid image
   */
  async assertHeroImageValid(): Promise<void> {
    const img = this.heroImage
    await expect(img).toBeVisible()
    
    // Check image loads successfully
    const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth)
    expect(naturalWidth).toBeGreaterThan(0)
  }

  /**
   * Verify contact information
   */
  async assertContactInfo(): Promise<void> {
    await expect(this.phoneLink.first()).toBeVisible()
    const phoneText = await this.phoneLink.first().textContent()
    expect(phoneText).toMatch(/\+7/)
  }

  /**
   * Check CTA buttons work
   */
  async assertCtaButtonsWork(): Promise<void> {
    const buttons = await this.ctaButtons.count()
    expect(buttons).toBeGreaterThan(0)
    
    // Verify first button is clickable
    await expect(this.ctaButtons.first()).toBeEnabled()
  }

  /**
   * Take visual regression screenshot of hero
   */
  async screenshotHero(): Promise<void> {
    const hero = this.page.locator('section').first()
    await hero.screenshot({ path: './e2e/screenshots/home-hero.png' })
  }

  /**
   * Check page load performance
   */
  async assertPerformanceMetrics(): Promise<void> {
    const metrics = await this.page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: timing ? timing.domContentLoadedEventEnd - timing.startTime : 0,
        loadComplete: timing ? timing.loadEventEnd - timing.startTime : 0,
      }
    })
    
    // DOM should be ready within 3 seconds
    expect(metrics.domContentLoaded).toBeLessThan(3000)
    // Page should fully load within 5 seconds
    expect(metrics.loadComplete).toBeLessThan(5000)
  }
}
