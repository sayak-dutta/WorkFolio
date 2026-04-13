import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://work.sayak.me'), // Fallback URL, update safely
  title: {
    default: 'Sayak | Senior Freelance Developer',
    template: '%s | Sayak',
  },
  description: 'Interactive presentation portfolio showcasing premium React, Next.js, and Custom CMS builds.',
  keywords: ['Sayak', 'Freelance Developer', 'Full Stack Developer', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Sayak', url: 'https://work.sayak.me' }],
  creator: 'Sayak',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://work.sayak.me',
    siteName: 'Sayak Portfolio',
    title: 'Sayak | Senior Freelance Developer',
    description: 'Interactive portfolio showcasing production-ready React, Next.js, and custom CMS projects.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Sayak Portfolio' }], 
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayak | Senior Freelance Developer',
    description: 'Interactive portfolio showcasing production-ready React, Next.js, and custom CMS projects.',
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
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

