'use client'

import { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { DataTableFacetedFilter } from '@/components/ui/datatable/FacetedFilters'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-react'
import { DataTableViewOptions } from '@/components/ui/datatable/ColumnToggle'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true
})

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  categories: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export default function TransactionsDataTable<TData, TValue>({
  columns,
  data,
  categories,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const handleExportCSV = (data: any[]) => {
    const csv = generateCsv(csvConfig)(data)
    download(csvConfig)(csv)
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-2 py-4">
        <div className="flex gap-2">
          {table.getColumn('category') && (
            <DataTableFacetedFilter
              title="Category"
              column={table.getColumn('category')}
              options={categories}
            />
          )}
          {table.getColumn('type') && (
            <DataTableFacetedFilter
              title="Type"
              column={table.getColumn('type')}
              options={[
                { label: 'Income', value: 'income' },
                { label: 'Expense', value: 'expense' }
              ]}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {/* <Button
            variant={'outline'}
            size={'sm'}
            className="ml-auto h-8 lg:flex"
            onClick={() => {
              const data = table.getFilteredRowModel().rows.map((row) => ({
                category: row.original.category,
                categoryIcon: row.original.categoryIcon,
                description: row.original.description,
                type: row.original.type,
                amount: row.original.amount,
                formattedAmount: row.original.formattedAmount,
                date: row.original.date
              }))
              handleExportCSV(data)
            }}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button> */}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <SkeletonWrapper isLoading={isLoading}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </SkeletonWrapper>
    </div>
  )
}
