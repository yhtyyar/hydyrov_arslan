/**
 * Page Object Model exports
 * Centralized export for all page objects
 */

export { BasePage } from './BasePage'
export { HomePage } from './HomePage'
export { PortfolioPage } from './PortfolioPage'

// Page factory for creating page instances
import { Page } from '@playwright/test'
import { HomePage } from './HomePage'
import { PortfolioPage } from './PortfolioPage'

export class PageFactory {
  constructor(private page: Page) {}

  homePage(): HomePage {
    return new HomePage(this.page)
  }

  portfolioPage(): PortfolioPage {
    return new PortfolioPage(this.page)
  }
}
