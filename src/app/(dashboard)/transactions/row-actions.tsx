'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { TransactionHistoryRow } from './columns'
import DeleteTransactionDialog from './delete-transaction-dialog'

export default function RowActions({
  transaction
}: {
  transaction: TransactionHistoryRow
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <DeleteTransactionDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        transactionId={transaction._id}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className="h-8 w-8 p-0 ">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev)
            }}
          >
            <Trash2Icon className="h-4 w-4 text-muted-foreground" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
