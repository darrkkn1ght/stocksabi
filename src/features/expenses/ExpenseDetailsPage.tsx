import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Wallet, Pencil, Trash2, AlertTriangle } from 'lucide-react'
import { useExpenses } from '../../hooks/useExpenses'
import { Button } from '../../components/ui/Button'
import { formatNaira } from '../../lib/currency'

export const ExpenseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getExpense, deleteExpense } = useExpenses()
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const expense = id ? getExpense(id) : undefined

  if (!expense) {
    return (
      <div className="py-24 text-center max-w-2xl mx-auto">
        <Wallet className="w-8 h-8 text-[#A4A9A0] mx-auto mb-3 opacity-50" />
        <p className="text-lg font-serif font-bold text-[#202820]">Expense not found</p>
        <p className="text-sm text-[#73796F] mt-2 mb-8">The record you are looking for does not exist.</p>
        <Button variant="secondary" onClick={() => navigate('/expenses')}>
          Return to Expenses
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    if (id) {
      deleteExpense(id)
      navigate('/expenses')
    }
  }

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-in fade-in duration-200 relative">
      <div className="mb-6">
        <Link to="/expenses" className="text-xs font-bold uppercase tracking-widest text-[#73796F] hover:text-[#174B3A] inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Expenses History
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10 border-b border-[#E5E4DA]">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#202820] tracking-tight leading-none mb-3">
            {expense.description}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#73796F]">
            <span className="capitalize font-bold text-[#174B3A] bg-[#F7F5EF] px-2 py-0.5 rounded-[6px]">
              {expense.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#E5E4DA]"></span>
            <span>
              {new Date(expense.date).toLocaleDateString('en-GB', { 
                weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' 
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            className="hover:bg-[#B74C43]/10 hover:text-[#B74C43] hover:border-[#B74C43]/30"
            leftIcon={<Trash2 className="w-4 h-4" />}
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete
          </Button>
          <Link to={`/expenses/${expense.id}/edit`}>
            <Button
              variant="primary"
              leftIcon={<Pencil className="w-4 h-4 text-[#D7F36B]" />}
            >
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="pt-10">
        <h2 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-4">Amount</h2>
        <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-8 shadow-xs flex items-center justify-center">
          <p className="text-5xl md:text-6xl font-bold font-mono tracking-tighter text-[#202820]">
            {formatNaira(expense.amount)}
          </p>
        </div>
        
        <div className="mt-8 text-center text-xs text-[#73796F]">
          <p>Record created on: {new Date(expense.createdAt).toLocaleString('en-GB')}</p>
          <p className="font-mono mt-1 opacity-50">ID: {expense.id}</p>
        </div>
      </div>

      {/* Delete Confirmation Modal Overlay */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202820]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] shadow-lg max-w-md w-full p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#B74C43]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-[#B74C43]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#202820] mb-2">Delete this expense?</h3>
            <p className="text-[#73796F] mb-8 leading-relaxed">
              This expense will be removed from your business records and no longer affect your net profit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                size="lg" 
                className="w-full"
                onClick={handleDelete}
              >
                Delete expense
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
