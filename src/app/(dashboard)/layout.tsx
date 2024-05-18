import Navbar from '@/components/shared/navbar'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      <section>{children}</section>
    </main>
  )
}
