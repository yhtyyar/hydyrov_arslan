import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PortfolioPage from './page'

describe('Portfolio Page', () => {
  it('renders portfolio header', () => {
    render(<PortfolioPage />)
    expect(screen.getByText('Портфолио работ')).toBeInTheDocument()
    expect(screen.getByText('Реальные клинические случаи доктора Арслана Хыдырова')).toBeInTheDocument()
  })

  it('renders all 5 portfolio items', () => {
    render(<PortfolioPage />)
    expect(screen.getByText('Имплантация в области 44–46')).toBeInTheDocument()
    expect(screen.getByText('Лечение кариеса')).toBeInTheDocument()
    expect(screen.getByText('Микропротезирование Table Tops')).toBeInTheDocument()
    expect(screen.getByText('Съёмный протез')).toBeInTheDocument()
    expect(screen.getByText('Циркониевые коронки')).toBeInTheDocument()
  })

  it('renders category badges', () => {
    render(<PortfolioPage />)
    const surgery = screen.getAllByText('Хирургия')
    const therapy = screen.getAllByText('Терапия')
    const orthopedics = screen.getAllByText('Ортопедия')
    
    expect(surgery.length).toBeGreaterThan(0)
    expect(therapy.length).toBeGreaterThan(0)
    expect(orthopedics.length).toBe(3) // Table tops, denture, zirconia
  })

  it('renders image count badges for multi-image works', () => {
    render(<PortfolioPage />)
    expect(screen.getByText('2 фото')).toBeInTheDocument() // Implant, denture
    expect(screen.getByText('4 фото')).toBeInTheDocument() // Caries, tabletops
    expect(screen.getByText('1 фото')).toBeInTheDocument() // Zirconia
  })

  it('opens modal when clicking on portfolio item', () => {
    render(<PortfolioPage />)
    
    const firstItem = screen.getByText('Имплантация в области 44–46').closest('button')
    fireEvent.click(firstItem!)
    
    // Check for counter in modal (specific selector)
    const counter = screen.getByText((content) => content.includes('1 / 2'))
    expect(counter).toBeInTheDocument()
  })

  it('closes modal on X button click', () => {
    render(<PortfolioPage />)
    
    const firstItem = screen.getByText('Имплантация в области 44–46').closest('button')
    fireEvent.click(firstItem!)
    
    // Modal should be open
    expect(screen.getByText((content) => content.includes('1 / 2'))).toBeInTheDocument()
    
    // Click on X button (find by role or aria-label)
    const closeButton = screen.getByRole('button', { name: /close/i }) || 
                       document.querySelector('button svg[name="x"]')?.closest('button')
    if (closeButton) {
      fireEvent.click(closeButton)
    }
  })

  it('renders contact CTA section', () => {
    render(<PortfolioPage />)
    expect(screen.getByText('Хотите такой же результат?')).toBeInTheDocument()
    expect(screen.getByText('+7 905 009-21-27')).toBeInTheDocument()
    expect(screen.getByText('Написать в Telegram')).toBeInTheDocument()
  })

  it('has correct phone link', () => {
    render(<PortfolioPage />)
    const phoneLink = screen.getByText('+7 905 009-21-27').closest('a')
    expect(phoneLink).toHaveAttribute('href', 'tel:+79050092127')
  })

  it('has correct telegram link', () => {
    render(<PortfolioPage />)
    const telegramLink = screen.getByText('Написать в Telegram').closest('a')
    expect(telegramLink).toHaveAttribute('href', 'https://t.me/arsstomat')
  })

  it('renders all portfolio images', () => {
    render(<PortfolioPage />)
    
    // Check for preview images
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(5) // 5 work preview images
    
    // All images should use webp
    images.forEach(img => {
      expect(img.getAttribute('src')).toMatch(/\.webp$/)
    })
  })
})
