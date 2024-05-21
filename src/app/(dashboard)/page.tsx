import TransactionDialog from '@/components/shared/transaction-dialog'
import { Button } from '@/components/ui/button'
import { currentUser, clerkClient } from '@clerk/nextjs/server'
import { RedirectType, redirect } from 'next/navigation'
import Greeting from './greeting'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import Overview from './overview'
import History from './history'
import { isRedirectError } from 'next/dist/client/components/redirect'

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    try {
      redirect('/', RedirectType.push)
    } catch(error) {
      if (isRedirectError(error)) {
        throw error
      } else {
        console.log('other error')
      }
      return
    }
  }

  const current = await fetchQuery(api.user.current, { userId: user.id })
  let partnerFirstName: string = ''
  if (current?.partnerUserId) {
    const partnerUser = await clerkClient.users.getUser(current?.partnerUserId)
    partnerFirstName = `${partnerUser.firstName}`
  }

  return (
    <div className="h-full bg-background pb-10">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <Greeting
            userId={user.id}
            firstName={user.firstName!}
            partnerName={partnerFirstName}
          />
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
