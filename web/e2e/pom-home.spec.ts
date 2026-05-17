import { test, expect } from '@playwright/test'
import { HomePage } from './pages'

test.describe('Home Page with POM', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.goto()
  })

  test('should display hero section correctly', async () => {
    await homePage.assertHeroSection()
  })

  test('should have valid hero image', async () => {
    await homePage.assertHeroImageValid()
  })

  test('should display all sections', async () => {
    await homePage.assertAllSectionsPresent()
  })

  test('should have correct contact information', async () => {
    await homePage.assertContactInfo()
  })

  test('should have working CTA buttons', async () => {
    await homePage.assertCtaButtonsWork()
  })

  test('should navigate to portfolio page', async () => {
    await homePage.navigateToPortfolio()
    await expect(homePage.page).toHaveURL(/portfolio/)
  })

  test('should load within performance budget', async () => {
    await homePage.assertPerformanceMetrics()
  })

  test('should be mobile responsive', async () => {
    await homePage.verifyMobileResponsive()
  })

  test('should have no console errors', async () => {
    await homePage.assertNoConsoleErrors()
  })

  test('should have valid SEO meta tags', async () => {
    await homePage.assertSeoMetaTags()
  })

  test('should have no broken links', async () => {
    await homePage.assertNoBrokenLinks()
  })
})
