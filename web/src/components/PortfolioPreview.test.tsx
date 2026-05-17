import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PortfolioPreview } from './PortfolioPreview'

describe('PortfolioPreview Component', () => {
  it('renders section heading', () => {
    render(<PortfolioPreview />)
    expect(screen.getByText('Примеры работ')).toBeInTheDocument()
  })

  it('renders portfolio items', () => {
    render(<PortfolioPreview />)
    expect(screen.getByText('Имплантация')).toBeInTheDocument()
    expect(screen.getByText('Лечение кариеса')).toBeInTheDocument()
    expect(screen.getByText('Микропротезирование (Table Tops)')).toBeInTheDocument()
  })

  it('renders portfolio images with correct src', () => {
    render(<PortfolioPreview />)
    
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(3)
    
    // Check that images use webp format
    images.forEach(img => {
      expect(img.getAttribute('src')).toMatch(/\.webp$/)
    })
  })

  it('renders category badges', () => {
    render(<PortfolioPreview />)
    expect(screen.getByText('Хирургия')).toBeInTheDocument()
    expect(screen.getByText('Терапия')).toBeInTheDocument()
    expect(screen.getByText('Ортопедия')).toBeInTheDocument()
  })

  it('renders descriptions', () => {
    render(<PortfolioPreview />)
    expect(screen.getByText('Восстановление жевательных зубов в области 44–46')).toBeInTheDocument()
    expect(screen.getByText('Устранение кариеса с эстетической реставрацией')).toBeInTheDocument()
    expect(screen.getByText('Керамические накладки для восстановления формы зубов')).toBeInTheDocument()
  })

  it('renders "View all works" link', () => {
    render(<PortfolioPreview />)
    expect(screen.getByText('Все работы')).toBeInTheDocument()
    expect(screen.getByText('Смотреть все работы')).toBeInTheDocument()
  })

  it('renders CTA text on cards', () => {
    render(<PortfolioPreview />)
    expect(screen.getAllByText('Посмотреть все фото →').length).toBe(3)
  })

  it('has working links to portfolio page', async () => {
    render(<PortfolioPreview />)
    const user = userEvent.setup()
    
    const viewAllLink = screen.getByText('Смотреть все работы')
    await user.click(viewAllLink)
    
    // Note: Actual navigation testing is better done in E2E tests
    expect(viewAllLink.closest('a')).toHaveAttribute('href', '/portfolio')
  })

  it('renders portfolio cards with images', () => {
    render(<PortfolioPreview />)
    
    // Check for images with specific alt text
    expect(screen.getByAltText('Имплантация')).toBeInTheDocument()
    expect(screen.getByAltText('Лечение кариеса')).toBeInTheDocument()
    expect(screen.getByAltText('Микропротезирование (Table Tops)')).toBeInTheDocument()
  })

  it('uses relative image paths', () => {
    render(<PortfolioPreview />)
    
    const implantImage = screen.getByAltText('Имплантация')
    expect(implantImage).toHaveAttribute('src', './images/implant-1.webp')
    
    const cariesImage = screen.getByAltText('Лечение кариеса')
    expect(cariesImage).toHaveAttribute('src', './images/caries-1.webp')
    
    const tabletopImage = screen.getByAltText('Микропротезирование (Table Tops)')
    expect(tabletopImage).toHaveAttribute('src', './images/tabletops-1.webp')
  })
})
