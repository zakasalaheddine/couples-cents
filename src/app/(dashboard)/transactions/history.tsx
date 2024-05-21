'use client'

import { useEffect, useState } from 'react'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants'
import { differenceInDays, startOfMonth } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import TransactionsDataTable from './data-table'
import { TransactionHistoryRow, columns } from './columns'

interface TransactionsHistoryProps {
  preloaded: Preloaded<typeof api.reports.stats>
  coupleId: Id<'couples'>
}

export default function TransactionsHistory({
  coupleId,
  preloaded
}: TransactionsHistoryProps) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date()
  })
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<TransactionHistoryRow[]>([])
  const { toast } = useToast()
  const stats = usePreloadedQuery(preloaded)
  useEffect(() => {
    setIsLoading(true)
    if (stats) {
      const { categories, transactions } = stats
      const extendedTransaction = transactions.map((tr) => {
        const category = categories.find((item) => item._id === tr.category)
        return { ...tr, category: category! }
      })
      setData(extendedTransaction)
    }
    setIsLoading(false)
  }, [stats])
  return (
    <>
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Transactions history</p>
          </div>
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
                  title: `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`,
                  variant: 'destructive'
                })
                return
              }

              setDateRange({ from, to })
            }}
          />
        </div>
      </div>
      <div className="container">
        Table
        <TransactionsDataTable
          columns={columns}
          isLoading={isLoading}
          data={data}
          categories={stats.categories.map((category) => ({
            label: category.name,
            value: `${category._id}`,
            icon: ({ className }) => (
              <span className={className}>{category.icon}</span>
            )
          }))}
        />
      </div>
    </>
  )
}
