import { ColumnDef } from '@tanstack/react-table'
import { Id } from '../../../../convex/_generated/dataModel'
import { DataTableColumnHeader } from '@/components/ui/datatable/ColumnHeader'
import { cn } from '@/lib/utils'
import RowActions from './row-actions'

export interface TransactionHistoryRow {
  _id: Id<'transactions'>
  _creationTime: number
  type: string
  couple: Id<'couples'>
  description: string
  amount: number
  date: string
  category: {
    _id: Id<'categories'>
    _creationTime: number
    couple: Id<'couples'>
    type: string
    name: string
    icon: string
  }
  user: Id<'users'>
}

export const columns: ColumnDef<TransactionHistoryRow>[] = [
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as any)._id)
    },
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.category.icon}
        <div className="capitalize">{row.original.category.name}</div>
      </div>
    )
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.original.description}</div>
    )
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      const formattedDate = date.toLocaleDateString('default', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      return <div className="text-muted-foreground">{formattedDate}</div>
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: ({ row }) => (
      <div
        className={cn(
          'capitalize rounded-lg text-center p-2',
          row.original.type === 'income' &&
            'bg-emerald-400/10 text-emerald-500',
          row.original.type === 'expense' && 'bg-red-400/10 text-red-500'
        )}
      >
        {row.original.type}
      </div>
    )
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <p className="text-md rounded-lg bg-gray-400/5 p-2 text-center font-medium">
        {row.original.amount}
      </p>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <RowActions transaction={row.original} />
  }
]
