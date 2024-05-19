import { TypeOfTransaction } from '@/components/shared/transaction-dialog/schema'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'
import { Id } from '../../../convex/_generated/dataModel'

interface CategoryCardProps {
  isLoading: boolean
  type: TypeOfTransaction
  data: {
    category: {
      _id: Id<'categories'>
      name: string
      icon: string
    }
    amount: number
    percentage: number
  }[]
}

export default function CategoryCard({
  isLoading,
  type,
  data
}: CategoryCardProps) {
  return (
    <SkeletonWrapper isLoading={isLoading}>
      <Card className="h-80 w-full col-span-6">
        <CardHeader>
          <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
            {type === 'income' ? 'Incomes' : 'Expenses'} by category
          </CardTitle>
        </CardHeader>

        <div className="flex items-center justify-between gap-2">
          {data.length === 0 && (
            <div className="flex h-60 w-full flex-col items-center justify-center">
              No data for the selected period
              <p className="text-sm text-muted-foreground">
                Try selecting a different period or try adding new{' '}
                {type === 'income' ? 'incomes' : 'expenses'}
              </p>
            </div>
          )}

          {data.length > 0 && (
            <ScrollArea className="h-60 w-full px-4">
              <div className="flex w-full flex-col gap-4 p-4">
                {data.map(({ category, amount, percentage }) => (
                  <div key={category._id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-400">
                        {category.icon} {category.name}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({percentage.toFixed(0)}%)
                        </span>
                      </span>

                      <span className="text-sm text-gray-400">{amount}</span>
                    </div>

                    <Progress
                      value={percentage}
                      indicator={
                        type === 'income' ? 'bg-emerald-500' : 'bg-red-500'
                      }
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </Card>
    </SkeletonWrapper>
  )
}
