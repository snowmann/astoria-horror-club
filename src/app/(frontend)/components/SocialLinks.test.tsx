import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SocialLinks from './SocialLinks'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, string>) => <img alt="" {...props} />,
}))

describe('SocialLinks', () => {
  it('matches snapshot', () => {
    const { container } = render(<SocialLinks />)
    expect(container).toMatchSnapshot()
  })

  it('renders both social links with correct text and icons', () => {
    render(<SocialLinks />)

    expect(screen.getByText('Join Our Discord')).toBeDefined()
    const discordIcon = screen.getByAltText('discord social media icon')
    expect(discordIcon).toBeDefined()

    expect(screen.getByText('Follow Us On Instagram')).toBeDefined()
    const instagramIcon = screen.getByAltText('instagram social media icon')
    expect(instagramIcon).toBeDefined()
  })
})
