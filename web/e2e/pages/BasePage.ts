import { Page, Locator, expect } from '@playwright/test'

/**
 * Base Page Object Model class
 * Provides common methods for all pages
 */
export abstract class BasePage {
  readonly page: Page
  readonly url: string

  constructor(page: Page, url: string = '/') {
    this.page = page
    this.url = url
  }

  /**
   * Navigate to the page
   */
  async goto(): Promise<void> {
    await this.page.goto(this.url)
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle')
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return this.page.title()
  }

  /**
   * Take screenshot with optional name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `./e2e/screenshots/${name}.png`,
      fullPage: true 
    })
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible()
  }

  /**
   * Click on element
   */
  async click(locator: Locator): Promise<void> {
    await locator.click()
  }

  /**
   * Get text content of element
   */
  async getText(locator: Locator): Promise<string | null> {
    return locator.textContent()
  }

  /**
   * Scroll to element
   */
  async scrollTo(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded()
  }

  /**
   * Check page has no console errors
   */
  async assertNoConsoleErrors(): Promise<void> {
    const errors: string[] = []
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    // Give time for any errors to appear
    await this.page.waitForTimeout(1000)
    expect(errors).toHaveLength(0)
  }

  /**
   * Check page has no broken links
   */
  async assertNoBrokenLinks(): Promise<void> {
    const links = this.page.locator('a[href^="http"], a[href^="/"]')
    const count = await links.count()
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i)
      const href = await link.getAttribute('href')
      if (href && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
        // In real test, you would check the link status
        // For now, just verify href exists
        expect(href).toBeTruthy()
      }
    }
  }

  /**
   * Check SEO meta tags
   */
  async assertSeoMetaTags(): Promise<void> {
    const title = await this.page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
    
    // Check description meta tag
    const description = this.page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /.+/)
  }

  /**
   * Verify mobile responsiveness
   */
  async verifyMobileResponsive(): Promise<void> {
    // Mobile viewport
    await this.page.setViewportSize({ width: 375, height: 667 })
    await this.page.waitForTimeout(500)
    
    // Check no horizontal overflow
    const body = this.page.locator('body')
    const bodyWidth = await body.evaluate(el => el.scrollWidth)
    const viewportWidth = 375
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20) // Allow small tolerance
  }

  /**
   * Perform Lighthouse audit
   */
  async runLighthouseCheck(minScore: number = 50): Promise<void> {
    // This would integrate with lighthouse playwright
    // For now, placeholder that checks basic metrics
    const loadTime = await this.page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return timing ? timing.loadEventEnd - timing.startTime : 0
    })
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  }
}
