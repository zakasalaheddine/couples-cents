'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  transactionId: Id<'transactions'>
}

function DeleteTransactionDialog({ open, setOpen, transactionId }: Props) {
  const mutation = useMutation(api.transaction.deleteTransaction)
  const { toast } = useToast()
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            transaction
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast({ title: 'Deleting Transaction' })
              mutation({ id: transactionId })
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionDialog
