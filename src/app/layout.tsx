import type { Metadata } from 'next'
import { Lato as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
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
  )
}
