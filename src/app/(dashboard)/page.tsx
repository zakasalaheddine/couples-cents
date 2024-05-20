import TransactionDialog from '@/components/shared/transaction-dialog'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Greeting from './greeting'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import Overview from './overview'
import History from './history'

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return redirect('/sign-in')
  }

  const current = await fetchQuery(api.user.current, { userId: user.id })

  return (
    <div className="h-full bg-background pb-10">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <Greeting />
          <div className="flex items-center gap-3">
            <TransactionDialog
              trigger={
                <Button
                  variant="outline"
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
                >
                  New income 🤑
                </Button>
              }
              type="income"
              coupleId={current?.couple._id!}
              userId={current?.user._id!}
            />

            <TransactionDialog
              trigger={
                <Button
                  variant="outline"
                  className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
                >
                  New expense 😤
                </Button>
              }
              type="expense"
              coupleId={current?.couple._id!}
              userId={current?.user._id!}
            />
          </div>
        </div>
      </div>
      <Overview coupleId={current?.couple._id!} />
      <History coupleId={current?.couple._id!} />
    </div>
  )
}
