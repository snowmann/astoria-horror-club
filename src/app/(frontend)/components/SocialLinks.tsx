import {
  AHC_DISCORD_INVITE_URL,
  AHC_INSTAGRAM_URL,
  DISCORD_ICON_SVG_URL,
  INSTAGRAM_ICON_SVG_URL,
} from '@/app/constants'
import Image from 'next/image'

export function SocialLinks() {
  return (
    <div className="flex py-9 px-5 w-full justify-between">
      <span className="flex items-center">
        Join Our Discord{' '}
        <a href={AHC_DISCORD_INVITE_URL} target="_blank">
          <Image
            height={24}
            width={24}
            alt="discord social media icon"
            src={DISCORD_ICON_SVG_URL}
          />
        </a>
      </span>
      <span className="flex items-center">
        Follow Us On Instagram{' '}
        <a href={AHC_INSTAGRAM_URL} target="_blank">
          <Image
            height={24}
            width={24}
            alt="instagram social media icon"
            src={INSTAGRAM_ICON_SVG_URL}
          />
        </a>
      </span>
    </div>
  )
}
