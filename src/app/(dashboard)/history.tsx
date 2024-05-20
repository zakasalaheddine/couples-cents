'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'
import { Period, Timeframe } from '@/lib/types'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import HistoryTooltip from '@/components/shared/tooltip-row'
import HistoryPeriodSelector from '@/components/shared/history-period-selector'
import { Id } from '../../../convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import {
  HistoryData,
  getMonthlyHistory,
  getYearlyHistory
} from '@/reports/history'

export default function History({ coupleId }: { coupleId: Id<'couples'> }) {
  const [isLoading, setIsLoading] = useState(false)
  const [timeframe, setTimeframe] = useState<Timeframe>('year')
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })
  const [historyData, setHistoryData] = useState<HistoryData[]>([])

  const stateQuery = useQuery(api.reports.stats, { coupleId })

  useEffect(() => {
    setIsLoading(true)
    if (stateQuery?.transactions) {
      if (timeframe === 'year') {
        setHistoryData(
          getYearlyHistory({
            data: stateQuery?.transactions,
            year: period.year
          })
        )
      } else {
        setHistoryData(
          getMonthlyHistory({
            data: stateQuery?.transactions,
            year: period.year,
            month: period.month
          })
        )
      }
      setIsLoading(false)
    }
  }, [stateQuery, timeframe, period])

  return (
    <div className="container">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />

            <div className="flex h-10 gap-2">
              <Badge
                variant={'outline'}
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                Income
              </Badge>
              <Badge
                variant={'outline'}
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={isLoading}>
            {historyData.length > 0 ? (
              <ResponsiveContainer width={'100%'} height={300}>
                <BarChart height={300} data={historyData} barCategoryGap={5}>
                  <defs>
                    <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset={'0'}
                        stopColor="#10b981"
                        stopOpacity={'1'}
                      />
                      <stop
                        offset={'1'}
                        stopColor="#10b981"
                        stopOpacity={'0'}
                      />
                    </linearGradient>

                    <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset={'0'}
                        stopColor="#ef4444"
                        stopOpacity={'1'}
                      />
                      <stop
                        offset={'1'}
                        stopColor="#ef4444"
                        stopOpacity={'0'}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="5 5"
                    strokeOpacity={'0.2'}
                    vertical={false}
                  />
                  <XAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 5, right: 5 }}
                    dataKey={(data) => {
                      const { year, month, day } = data
                      const date = new Date(year, month, day || 1)
                      if (timeframe === 'year') {
                        return date.toLocaleDateString('default', {
                          month: 'long'
                        })
                      }
                      return date.toLocaleDateString('default', {
                        day: '2-digit'
                      })
                    }}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar
                    dataKey={'income'}
                    label="Income"
                    fill="url(#incomeBar)"
                    radius={4}
                    className="cursor-pointer"
                  />
                  <Bar
                    dataKey={'expense'}
                    label="Expense"
                    fill="url(#expenseBar)"
                    radius={4}
                    className="cursor-pointer"
                  />
                  <Tooltip
                    cursor={{ opacity: 0.1 }}
                    content={({ payload }) =>
                      payload && payload?.length > 0 ? (
                        <HistoryTooltip
                          expense={payload[0].payload['expense']}
                          income={payload[0].payload['income']}
                        />
                      ) : null
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
                No data for the selected period
                <p className="text-sm text-muted-foreground">
                  Try selecting a different period or adding new transactions
                </p>
              </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  )
}
