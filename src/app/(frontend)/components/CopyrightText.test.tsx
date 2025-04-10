import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CopyrightText from './CopyrightText'

describe('CopyrightText', () => {
  it('matches snapshot', () => {
    const { container } = render(<CopyrightText />)
    expect(container).toMatchSnapshot()
  })

  it('renders the copyright text correctly', () => {
    render(<CopyrightText />)
    expect(screen.getByText('© 2021 Astoria Horror Club')).toBeDefined()
  })
})
