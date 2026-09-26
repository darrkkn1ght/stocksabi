import { useState, useEffect, useCallback } from 'react'
import type { Expense } from '../types'
import { getStorageItem, setStorageItem } from '../lib/storage'

const EXPENSES_STORAGE_KEY = 'stocksabi_expenses'

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    getStorageItem<Expense[]>(EXPENSES_STORAGE_KEY, [])
  )

  useEffect(() => {
    setStorageItem(EXPENSES_STORAGE_KEY, expenses)
  }, [expenses])

  const addExpense = useCallback((
    expenseData: Omit<Expense, 'id' | 'createdAt'>
  ) => {
    const prefix = 'EXP'
    const newId = `${prefix}-${(expenses.length + 1).toString().padStart(3, '0')}`
    
    const newExpense: Expense = {
      id: newId,
      ...expenseData,
      createdAt: new Date().toISOString(),
    }

    setExpenses((prev) => [newExpense, ...prev])
    return newExpense.id
  }, [expenses.length])

  const updateExpense = useCallback((
    id: string, 
    updates: Partial<Omit<Expense, 'id' | 'createdAt'>>
  ) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    )
  }, [])

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const getExpense = useCallback((id: string) => {
    return expenses.find((e) => e.id === id)
  }, [expenses])

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpense,
  }
}
