import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

// Mock child components
vi.mock('./SocialLinks', () => ({
  default: () => <div data-testid="social-links-mock" />,
}))

vi.mock('./CopyrightText', () => ({
  default: () => <div data-testid="copyright-text-mock" />,
}))

describe('Footer', () => {
  it('matches snapshot', () => {
    const { container } = render(<Footer />)
    expect(container).toMatchSnapshot()
  })

  it('renders the footer with correct structure', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeDefined()
  })

  it('renders the SocialLinks component', () => {
    render(<Footer />)
    expect(screen.getByTestId('social-links-mock')).toBeDefined()
  })

  it('renders the CopyrightText component', () => {
    render(<Footer />)
    expect(screen.getByTestId('copyright-text-mock')).toBeDefined()
  })
})
