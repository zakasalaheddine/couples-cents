import { fetchQuery, preloadQuery } from 'convex/nextjs'
import TransactionsHistory from './history'
import { api } from '../../../../convex/_generated/api'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function TransactionsPage() {
  const user = await currentUser()
  if (!user) return redirect('/sign-in')

  const current = await fetchQuery(api.user.current, { userId: user.id })
  const preLoadedTransactions = await preloadQuery(api.reports.stats, {
    coupleId: current?.couple._id!
  })
  return (
    <TransactionsHistory
      preloaded={preLoadedTransactions}
      coupleId={current?.couple._id!}
    />
  )
}
