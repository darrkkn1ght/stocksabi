export type ExpenseCategory =
  | 'Rent'
  | 'Transport'
  | 'Electricity'
  | 'Internet'
  | 'Staff'
  | 'Supplies'
  | 'Marketing'
  | 'Maintenance'
  | 'Other'
  | string

export interface Expense {
  id: string
  description: string
  category: ExpenseCategory
  amount: number
  date: string // The logical date of the expense
  createdAt: string // When it was entered into the system
}
