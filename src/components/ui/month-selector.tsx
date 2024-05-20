import { Period } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select'

export default function MonthSelector({
  period,
  setPeriod
}: {
  period: Period
  setPeriod: (period: Period) => void
}) {
  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) => {
        setPeriod({
          year: period.year,
          month: parseInt(value)
        })
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
          const monthStr = new Date(period.year, month, 1).toLocaleString(
            'default',
            { month: 'long' }
          )

          return (
            <SelectItem key={month} value={month.toString()}>
              {monthStr}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
