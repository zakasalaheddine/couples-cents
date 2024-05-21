import Logo from '@/components/shared/logo'
import Image from 'next/image'
import { ReactNode } from 'react'

export default function AuthenticationLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center gap-2 border border-input shadow-lg rounded-md">
        <section className="h-full">
          <Image
            src="/assets/auth-banner.png"
            alt="Auth Banner Quote"
            width={720}
            height={1280}
            className="w-auto h-full object-contain"
          />
        </section>
        <section className="flex flex-col gap-10 flex-1 h-full items-center justify-center p-10">
          <Logo />
          {children}
        </section>
      </div>
    </main>
  )
}
