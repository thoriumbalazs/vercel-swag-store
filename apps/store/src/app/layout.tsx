import { Toaster } from '@repo/ui/components/sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Vercel Swag Store',
    default: 'Vercel Swag Store',
  },
  description:
    'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
  openGraph: {
    title: 'Vercel Swag Store',
    description:
      'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={inter.variable} lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Header />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  )
}
