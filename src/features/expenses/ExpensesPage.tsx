import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ArrowRight, Wallet } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useExpenses } from '../../hooks/useExpenses'
import { formatNaira } from '../../lib/currency'

export const ExpensesPage: React.FC = () => {
  const { expenses } = useExpenses()

  const { thisMonthTotal, largestExpense, categoryBreakdown } = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    let total = 0
    let max = 0
    const catMap: Record<string, number> = {}

    for (const exp of expenses) {
      const expDate = new Date(exp.date)
      if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
        total += exp.amount
      }
      
      if (exp.amount > max) max = exp.amount
      
      catMap[exp.category] = (catMap[exp.category] || 0) + exp.amount
    }

    const breakdown = Object.entries(catMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, amount]) => ({ name, amount }))

    return { thisMonthTotal: total, largestExpense: max, categoryBreakdown: breakdown }
  }, [expenses])

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5E4DA]">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl text-[#202820] font-serif tracking-tight leading-tight">
            Expenses
          </h1>
          <p className="text-[14px] text-[#73796F] font-serif italic tracking-wide">
            See what it costs to keep your business running.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
          <Link to="/expenses/new">
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4 text-[#356AE6]" />}
            >
              Add expense
            </Button>
          </Link>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-[#E5E4DA] rounded-[8px] transform rotate-[-6deg] opacity-50"></div>
            <div className="absolute inset-0 bg-[#17243A] rounded-[8px] flex items-center justify-center shadow-lg">
              <Wallet className="w-10 h-10 text-[#356AE6]" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white border border-[#E5E4DA] rounded-[6px] shadow-sm flex items-center justify-center">
               <Plus className="w-5 h-5 text-[#202820]" />
            </div>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-[#202820]">
            Nothing logged yet.
          </h3>
          <p className="text-sm text-[#73796F] max-w-sm mt-2 mb-8 leading-relaxed">
            Track the costs behind your business so your profit tells the full story.
          </p>
          <Link to="/expenses/new">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Plus className="w-4 h-4 text-[#356AE6]" />}
            >
              Add your first expense
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Editorial Summary Area */}
          <div className="flex flex-col md:flex-row bg-[#F7F5EF] py-2">
            <div className="flex-1 py-4 pr-6 border-b md:border-b-0 md:border-r border-[#E5E4DA]">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                This Month's Expenses
              </p>
              <p className="text-3xl font-serif text-[#17243A]">
                {formatNaira(thisMonthTotal, { showDecimals: false })}
              </p>
            </div>
            <div className="flex-1 py-4 px-0 md:px-6 border-b md:border-b-0 md:border-r border-[#E5E4DA]">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                Number of Expenses
              </p>
              <p className="text-3xl font-serif text-[#17243A]">{expenses.length}</p>
            </div>
            <div className="flex-1 py-4 px-0 md:pl-6">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                Largest Expense
              </p>
              <p className="text-3xl font-serif text-[#17243A]">
                {formatNaira(largestExpense, { showDecimals: false })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            
            {/* Category Breakdown */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs sticky top-6">
                <h2 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-6">Category Breakdown</h2>
                <div className="space-y-4">
                  {categoryBreakdown.map(cat => {
                    const totalAllTime = categoryBreakdown.reduce((sum, c) => sum + c.amount, 0)
                    const percent = totalAllTime > 0 ? (cat.amount / totalAllTime) * 100 : 0
                    return (
                      <div key={cat.name}>
                        <div className="flex justify-between items-end mb-1.5">
                          <span className="text-sm font-bold text-[#202820] capitalize">{cat.name}</span>
                          <span className="text-sm font-bold text-[#202820] font-mono tracking-tight">
                            {formatNaira(cat.amount, { showDecimals: false })}
                          </span>
                        </div>
                        <div className="w-full bg-[#F7F5EF] rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-[#17243A] h-1.5 rounded-full" 
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Expenses List */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
                
                {/* Desktop Table */}
                <div className="hidden md:block w-full">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#E5E4DA] bg-[#F7F5EF]/50">
                        <th className="px-5 py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Description</th>
                        <th className="px-5 py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Category</th>
                        <th className="px-5 py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Amount</th>
                        <th className="px-5 py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Date</th>
                        <th className="px-5 py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E4DA]/60">
                      {expenses.map((expense) => (
                        <tr key={expense.id} className="group hover:bg-[#F7F5EF]/30 transition-colors duration-150">
                          <td className="px-5 py-4">
                            <Link to={`/expenses/${expense.id}`} className="block">
                              <p className="text-[15px] font-semibold text-[#202820] group-hover:text-[#17243A] transition-colors leading-tight">
                                {expense.description}
                              </p>
                            </Link>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-block px-2 py-1 bg-[#F7F5EF] border border-[#E5E4DA] text-[#202820] rounded-[6px] text-xs font-semibold capitalize">
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <p className="text-[15px] font-bold text-[#202820] font-mono tracking-tight">
                              {formatNaira(expense.amount)}
                            </p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-[#73796F]">
                              {new Date(expense.date).toLocaleDateString('en-GB', { 
                                day: 'numeric', month: 'short', year: 'numeric'
                              })}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <Link to={`/expenses/${expense.id}`} className="inline-flex p-1.5 text-[#73796F] hover:text-[#17243A] hover:bg-white rounded-md transition-colors border border-transparent hover:border-[#E5E4DA]">
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile List */}
                <div className="md:hidden divide-y divide-[#E5E4DA]">
                  {expenses.map((expense) => (
                    <Link key={expense.id} to={`/expenses/${expense.id}`} className="block p-4 hover:bg-[#F7F5EF] transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-[15px] font-bold text-[#202820] leading-tight pr-4">{expense.description}</h3>
                          <p className="text-xs text-[#73796F] mt-1 font-semibold capitalize">
                            {expense.category}
                          </p>
                        </div>
                        <p className="text-[15px] font-bold text-[#202820] font-mono tracking-tight shrink-0">
                          {formatNaira(expense.amount)}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end mt-3 pt-3 border-t border-dashed border-[#E5E4DA]">
                        <p className="text-xs text-[#73796F]">
                          {new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </p>
                        <ArrowRight className="w-4 h-4 text-[#73796F]" />
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            </div>
            
          </div>
        </>
      )}
    </div>
  )
}
