import React from 'react'
import './globals.css'
import Header from './components/Header'

export const metadata = {
  description: 'The official site of Astoria Horror Club.',
  title: 'Astoria Horror Club',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="dark">
      <body>
        <Header />
        <main>{children}</main>
        {/* FOOTER */}
      </body>
    </html>
  )
}
