import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero Component', () => {
  it('renders main heading with doctor name', () => {
    render(<Hero />)
    expect(screen.getByText('Арслан Хыдыров')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<Hero />)
    expect(screen.getByText(/Врач-стоматолог/i)).toBeInTheDocument()
  })

  it('renders phone number', () => {
    render(<Hero />)
    expect(screen.getByText('+7 905 009-21-27')).toBeInTheDocument()
  })

  it('renders doctor image with correct alt text', () => {
    render(<Hero />)
    const image = screen.getByAltText(/Арслан Хыдыров — стоматолог/i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', './images/doctor.webp')
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('Позвонить')).toBeInTheDocument()
    expect(screen.getByText('Написать в Telegram')).toBeInTheDocument()
  })

  it('renders experience information', () => {
    render(<Hero />)
    expect(screen.getByText(/7 лет практики/i)).toBeInTheDocument()
  })

  it('renders trust badge', () => {
    render(<Hero />)
    expect(screen.getByText(/500+ пациентов/i)).toBeInTheDocument()
  })

  it('has correct phone link', () => {
    render(<Hero />)
    const phoneLink = screen.getByRole('link', { name: /Позвонить/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:+79050092127')
  })

  it('has correct telegram link', () => {
    render(<Hero />)
    const telegramLink = screen.getByRole('link', { name: /Написать в Telegram/i })
    expect(telegramLink).toHaveAttribute('href', 'https://t.me/arsstomat')
  })
})
