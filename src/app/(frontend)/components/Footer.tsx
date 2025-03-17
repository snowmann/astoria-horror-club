import CopyrightText from './CopyrightText'
import SocialLinks from './SocialLinks'

/**
 *
 * @returns Global Footer coponent for AHC app
 */
export default function Footer() {
  return (
    <footer className="flex flex-col justify-between items-center">
      <SocialLinks />
      <CopyrightText />
    </footer>
  )
}
