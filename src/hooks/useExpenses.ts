import { useCallback } from 'react'

import { useData } from '../lib/DataContext'

export function useExpenses() {
  const { expenses, addExpense, updateExpense, deleteExpense, isLoading } = useData()

  const getExpense = useCallback((id: string) => {
    return expenses.find((e) => e.id === id)
  }, [expenses])

  return {
    expenses,
    isLoading,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpense,
  }
}
