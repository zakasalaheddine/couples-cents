import { z } from 'zod'
import { Id } from '../../../../convex/_generated/dataModel'

export const TransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string().optional(),
  date: z.coerce.date(),
  category: z.string(),
  type: z.enum(['income', 'expense']),
  coupleId: z.custom<Id<'couples'>>(),
  userId: z.custom<Id<'users'>>()
})

export type TransactionType = z.infer<typeof TransactionSchema>

export type TypeOfTransaction = 'income' | 'expense'
