import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Wallet } from 'lucide-react'
import { ExpenseForm } from './components/ExpenseForm'
import type { ExpenseFormData } from './components/ExpenseForm'
import { useExpenses } from '../../hooks/useExpenses'
import { Button } from '../../components/ui/Button'

export const EditExpensePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getExpense, updateExpense } = useExpenses()
  
  const expense = id ? getExpense(id) : undefined

  if (!expense) {
    return (
      <div className="py-24 text-center max-w-2xl mx-auto">
        <Wallet className="w-8 h-8 text-[#A4A9A0] mx-auto mb-3 opacity-50" />
        <p className="text-lg font-serif font-bold text-[#202820]">Expense not found</p>
        <p className="text-sm text-[#73796F] mt-2 mb-8">The record you are trying to edit does not exist.</p>
        <Button variant="secondary" onClick={() => navigate('/expenses')}>
          Return to Expenses
        </Button>
      </div>
    )
  }

  const handleSubmit = (data: ExpenseFormData) => {
    if (id) {
      // Keep date format ISO string
      const expenseDate = new Date(data.date).toISOString()
      
      updateExpense(id, {
        ...data,
        date: expenseDate,
      })
      navigate(`/expenses/${id}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="mb-4">
        <Link to={`/expenses/${id}`} className="text-xs font-bold uppercase tracking-widest text-[#73796F] hover:text-[#17243A] inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Expense
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E5E4DA]">
        <h1 className="text-4xl font-serif font-bold text-[#202820] tracking-tight leading-tight">
          Edit Expense
        </h1>
        <p className="text-sm text-[#73796F] font-serif italic tracking-wide mt-2">
          Updating record for <span className="font-bold not-italic">{expense.description}</span>
        </p>
      </div>

      <ExpenseForm initialData={expense} onSubmit={handleSubmit} />
    </div>
  )
}
