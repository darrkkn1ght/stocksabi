import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { ExpenseForm } from './components/ExpenseForm'
import type { ExpenseFormData } from './components/ExpenseForm'
import { useExpenses } from '../../hooks/useExpenses'
import { Button } from '../../components/ui/Button'

export const NewExpensePage: React.FC = () => {
  const navigate = useNavigate()
  const { addExpense } = useExpenses()
  
  const [successExpenseId, setSuccessExpenseId] = useState<string | null>(null)

  const handleSubmit = (data: ExpenseFormData) => {
    // Add time component back to date to keep it consistent
    const expenseDate = new Date(data.date).toISOString()
    
    const newId = addExpense({
      ...data,
      date: expenseDate,
    })
    
    setSuccessExpenseId(newId)
  }

  if (successExpenseId) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-[#367A53] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#202820] mb-2 tracking-tight">Expense recorded</h1>
        <p className="text-lg text-[#73796F] mb-12 font-serif italic">
          Successfully added to your business records.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/expenses')}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Back to expenses
          </Button>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setSuccessExpenseId(null)}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Record another expense
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="mb-4">
        <Link to="/expenses" className="text-xs font-bold uppercase tracking-widest text-[#73796F] hover:text-[#174B3A] inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Expenses
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E5E4DA]">
        <h1 className="text-4xl font-serif font-bold text-[#202820] tracking-tight leading-tight">
          Add Expense
        </h1>
        <p className="text-sm text-[#73796F] font-serif italic tracking-wide mt-2">
          Record a new cost for your business.
        </p>
      </div>

      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  )
}
