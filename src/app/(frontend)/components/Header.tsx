import { Creepster } from 'next/font/google'

const creepster = Creepster({
  subsets: ['latin'],
  weight: '400',
})

/**
 *
 * @returns Global Header coponents for AHC app
 */
export default function Header() {
  return (
    <header className="flex justify-center">
      <h1 className={`text-6xl ${creepster.className}`}>Astoria Horror Club</h1>
    </header>
  )
}
