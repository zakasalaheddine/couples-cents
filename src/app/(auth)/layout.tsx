import Image from 'next/image'
import { ReactNode } from 'react'

export default function AuthenticationLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <main className="flex items-center min-h-screen">
      <section className="h-full">
        <Image
          src="/assets/auth-banner.png"
          alt="Auth Banner Quote"
          width={720}
          height={1280}
          className="w-auto h-screen object-contain"
        />
      </section>
      <section className="flex flex-1 h-full items-center justify-center">
        {children}
      </section>
    </main>
  )
}
