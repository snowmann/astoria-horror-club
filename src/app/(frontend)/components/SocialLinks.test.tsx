import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SocialLinks from './SocialLinks'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: any) => <img {...props} />,
}))

describe('SocialLinks', () => {
  it('matches snapshot', () => {
    const { container } = render(<SocialLinks />)
    expect(container).toMatchSnapshot()
  })

  it('renders both social links with correct text and icons', () => {
    render(<SocialLinks />)

    // Check Discord link
    const discordLink = screen.getByRole('link', { name: /discord social media icon/i })
    expect(discordLink).toBeDefined()
    expect(screen.getByText('Join Our Discord')).toBeDefined()
    const discordIcon = screen.getByAltText('discord social media icon')
    expect(discordIcon).toBeDefined()

    // Check Instagram link
    const instagramLink = screen.getByRole('link', { name: /instagram social media icon/i })
    expect(instagramLink).toBeDefined()
    expect(screen.getByText('Follow Us On Instagram')).toBeDefined()
    const instagramIcon = screen.getByAltText('instagram social media icon')
    expect(instagramIcon).toBeDefined()
  })
})
