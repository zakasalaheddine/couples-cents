'use client'

import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useToast } from '@/components/ui/use-toast'
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants'
import { differenceInDays, startOfMonth } from 'date-fns'
import { useEffect, useState } from 'react'
import StateCard from './state-card'
import { TrendingDownIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'
import CategoryCard from './category-card'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import { getStates } from '@/reports/state'

export default function Overview({ coupleId }: { coupleId: Id<'couples'> }) {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<{
    totalExpense: number
    totalIncome: number
    balance: number
  }>({ balance: 0, totalExpense: 0, totalIncome: 0 })
  const { toast } = useToast()
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date()
  })
  const transactions = useQuery(api.reports.stats, { coupleId })

  useEffect(() => {
    setIsLoading(true)
    if (transactions) {
      const { balance, totalExpense, totalIncome } = getStates({
        from: dateRange.from,
        to: dateRange.to,
        data: transactions
      })
      setStats({ balance, totalExpense, totalIncome })
      setIsLoading(false)
    }
  }, [transactions, dateRange])

  return (
    <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
      <h2 className="text-3xl font-bold">Overview</h2>
      <div className="flex items-center gap-3">
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range
            // We update the date range only if both dates are set

            if (!from || !to) return
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast({
                title: `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
              })
              return
            }

            setDateRange({ from, to })
          }}
        />
      </div>
      <div className="container flex w-full flex-col gap-2">
        <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
          <StateCard
            isLoading={isLoading}
            value={stats.totalIncome}
            title="Income"
            icon={
              <TrendingUpIcon className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
            }
          />

          <StateCard
            isLoading={isLoading}
            value={stats.totalExpense}
            title="Expense"
            icon={
              <TrendingDownIcon className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
            }
          />

          <StateCard
            isLoading={isLoading}
            value={stats.balance}
            title="Balance"
            icon={
              <WalletIcon className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
            }
          />
        </div>
        <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
          <CategoryCard isLoading={false} type="income" data={[]} />
          <CategoryCard isLoading={false} type="expense" data={[]} />
        </div>
      </div>
    </div>
  )
}
