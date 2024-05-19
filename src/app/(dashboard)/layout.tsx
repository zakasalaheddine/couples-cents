import Navbar from '@/components/shared/navbar'
import { ReactNode } from 'react'
import { initiateCouple } from './initate-couple'

export default async function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  initiateCouple()
  return (
    <main>
      <Navbar />
      <section>{children}</section>
    </main>
  )
}
