import { Card } from '@/components/ui/card'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'
import { ReactNode } from 'react'
import CountUp from 'react-countup'

interface StateCardProps {
  icon: ReactNode
  title: string
  value: number
  isLoading: boolean
}
export default function StateCard({
  icon,
  title,
  value,
  isLoading
}: StateCardProps) {
  return (
    <SkeletonWrapper isLoading={isLoading}>
      <Card className="flex h-24 w-full items-center gap-2 p-4">
        {icon}
        <div className="flex flex-col items-start gap-0">
          <p className="text-muted-foreground">{title}</p>
          <CountUp
            preserveValue
            redraw={false}
            end={value}
            decimals={2}
            className="text-2xl"
          />
        </div>
      </Card>
    </SkeletonWrapper>
  )
}
