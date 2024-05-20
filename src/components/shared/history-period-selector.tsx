import { Period, Timeframe } from '@/lib/types'
import { useState } from 'react'
import SkeletonWrapper from '../ui/skeleton-wrapper'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import YearSelector from '../ui/year-selector'
import MonthSelector from '../ui/month-selector'

interface Props {
  period: Period
  setPeriod: (period: Period) => void
  timeframe: Timeframe
  setTimeframe: (timeframe: Timeframe) => void
}

const getYearsArray = (startYear = 2022) => {
  const currentYear = new Date().getFullYear()
  const yearsArray = []

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push(year)
  }

  return yearsArray
}

export default function HistoryPeriodSelector({
  period,
  setPeriod,
  timeframe,
  setTimeframe
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tabs
        value={timeframe}
        onValueChange={(value) => setTimeframe(value as Timeframe)}
      >
        <TabsList>
          <TabsTrigger value="year">Year</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap items-center gap-2">
        <YearSelector
          period={period}
          setPeriod={setPeriod}
          years={getYearsArray()}
        />
        {timeframe === 'month' && (
          <MonthSelector period={period} setPeriod={setPeriod} />
        )}
      </div>
    </div>
  )
}
