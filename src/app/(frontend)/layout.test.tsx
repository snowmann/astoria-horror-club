import { render, screen } from '@testing-library/react'
import RootLayout from './layout'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Creepster: vi.fn().mockReturnValue({
    className: 'mock-creepster-font', // Mock className we can test for
  }),
}))

describe('RootLayout', () => {
  it('renders child content', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )
    screen.debug()

    expect(getByText('Test Content')).toBeDefined()
  })

  it('matches snapshot', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )
    expect(container).toMatchSnapshot()
  })
})
