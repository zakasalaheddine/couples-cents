import { z } from 'zod'

export const CategorySchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().max(20),
  type: z.enum(['income', 'expense'])
})

export type Category = z.infer<typeof CategorySchema>
