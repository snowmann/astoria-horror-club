import React from 'react'
import './globals.css'

export const metadata = {
  description: 'The official site of Astoria Horror Club.',
  title: 'Astoria Horror Club',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
