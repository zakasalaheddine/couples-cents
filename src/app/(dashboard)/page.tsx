import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return redirect('/sign-in')
  }
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName}! 👋</p>
        </div>
      </div>
    </div>
  )
}
