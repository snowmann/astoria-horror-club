import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

// Mock the next/font/google module
vi.mock('next/font/google', () => ({
  Creepster: vi.fn().mockReturnValue({
    className: 'mock-creepster-font', // Mock className we can test for
  }),
}))

describe('Header', () => {
  it('matches snapshot', () => {
    const { container } = render(<Header />)
    expect(container).toMatchSnapshot()
  })

  it('renders the header with correct text', () => {
    render(<Header />)
    expect(screen.getByText('Astoria Horror Club')).toBeDefined()
  })
})
