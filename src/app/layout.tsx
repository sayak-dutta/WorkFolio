import type { Metadata } from 'next'
import { Lexend, Barlow_Condensed } from 'next/font/google'
import './globals.css'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Workfolio | Sayak',
  description: 'Full-screen portfolio presentation web app for a senior freelance developer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  )
}
