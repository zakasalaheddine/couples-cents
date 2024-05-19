import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { api } from '../../../convex/_generated/api'
import { redirect } from 'next/navigation'
import { fetchQuery } from 'convex/nextjs'

export default async function Greeting() {
  const user = await currentUser()
  if (!user) return redirect('/sign-in')

  const current = await fetchQuery(api.user.current, { userId: user.id })
  if (!current) return redirect('/sign-in')

  let partner
  if (current.partnerUserId) {
    partner = await clerkClient.users.getUser(current.partnerUserId)
  }
  return (
    <div>
      <p className="text-3xl font-bold">Hello, {user.firstName}! 👋</p>
      <p className="text-3xl font-bold">
        {partner ? `Partner with: ${partner.firstName}` : <span>Invite Link</span>}
      </p>
    </div>
  )
}
