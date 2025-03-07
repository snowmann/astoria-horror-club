import { Creepster } from 'next/font/google'

const creepster = Creepster({
  subsets: ['latin'],
  weight: '400',
})

export default function Header() {
  return (
    <header>
      <h1 className={`text-6xl ${creepster.className}`}>Astoria Horror Club</h1>
    </header>
  )
}
