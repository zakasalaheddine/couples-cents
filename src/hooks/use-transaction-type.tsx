import { TransactionType } from '@/components/shared/transaction-dialog/schema'
import { Control, useWatch } from 'react-hook-form'

export const useTransactionType = (control: Control<TransactionType>) => {
  return useWatch({ control, name: 'type' })
}
