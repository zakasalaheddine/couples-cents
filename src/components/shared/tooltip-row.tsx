import { cn } from '@/lib/utils'
import CountUp from 'react-countup'

export default function HistoryTooltip({
  expense,
  income
}: {
  expense: number
  income: number
}) {
  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      <TooltipRow
        label="Expense"
        value={expense}
        bgColor="bg-red-500"
        textColor="text-red-500"
      />
      <TooltipRow
        label="Income"
        value={income}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
      />
    </div>
  )
}

function TooltipRow({
  label,
  value,
  bgColor,
  textColor
}: {
  label: string
  textColor: string
  bgColor: string
  value: number
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn('h-4 w-4 rounded-full', bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn('text-sm font-bold', textColor)}>
          <CountUp
            duration={0.5}
            preserveValue
            end={value}
            decimals={0}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  )
}
