import { test, expect } from '@playwright/test'
import { PortfolioPage } from './pages'

test.describe('Portfolio Page with POM', () => {
  let portfolioPage: PortfolioPage

  test.beforeEach(async ({ page }) => {
    portfolioPage = new PortfolioPage(page)
    await portfolioPage.goto()
  })

  test('should display portfolio heading', async () => {
    await portfolioPage.assertHeading()
  })

  test('should have correct number of portfolio items', async () => {
    const count = await portfolioPage.getPortfolioItemCount()
    expect(count).toBe(5)
  })

  test('should open modal on item click', async () => {
    await portfolioPage.clickPortfolioItem(0)
    await portfolioPage.assertModalOpen()
    await portfolioPage.closeModal()
    await portfolioPage.assertModalClosed()
  })

  test('should navigate between images in modal', async () => {
    await portfolioPage.openItemByTitle('Лечение кариеса')
    await portfolioPage.assertModalOpen()
    
    // Navigate next
    await portfolioPage.nextImage()
    let counter = await portfolioPage.getCounterText()
    expect(counter).toMatch(/2 \\/ 4/)
    
    // Navigate prev
    await portfolioPage.prevImage()
    counter = await portfolioPage.getCounterText()
    expect(counter).toMatch(/1 \\/ 4/)
    
    await portfolioPage.closeModal()
  })

  test('should navigate using thumbnails', async () => {
    await portfolioPage.openItemByTitle('Лечение кариеса')
    await portfolioPage.assertModalOpen()
    
    await portfolioPage.clickThumbnail(2)
    const counter = await portfolioPage.getCounterText()
    expect(counter).toMatch(/3 \\/ 4/)
    
    await portfolioPage.closeModal()
  })

  test('should close modal on X click', async () => {
    await portfolioPage.clickPortfolioItem(0)
    await portfolioPage.assertModalOpen()
    await portfolioPage.closeModal()
    await portfolioPage.assertModalClosed()
  })

  test('should display contact CTA section', async () => {
    await portfolioPage.assertContactCta()
  })

  test('should have valid images for all items', async () => {
    await portfolioPage.assertAllItemsHaveImages()
  })

  test('should display category badges', async () => {
    await portfolioPage.assertCategoryBadges()
  })

  test('should update counter correctly', async () => {
    await portfolioPage.assertCounterUpdates()
  })

  test('should close modal with keyboard', async () => {
    await portfolioPage.testKeyboardNavigation()
  })

  test('should be responsive on different viewports', async () => {
    await portfolioPage.assertResponsiveGrid()
  })

  test('should have no console errors', async () => {
    await portfolioPage.assertNoConsoleErrors()
  })
})
