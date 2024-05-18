import type { Metadata } from 'next'
import { Lato as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: {
    template: '%s | CouplesCents',
    default: 'CouplesCents',
  },
  description:
    'CouplesCents is a revolutionary app designed to help couples take control of their shared finances and achieve their goals as a team. Say goodbye to money tensions and hello to financial harmony with our user-friendly interface that allows you and your partner to seamlessly track expenses, set budgets, and monitor your progress in real-time.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
