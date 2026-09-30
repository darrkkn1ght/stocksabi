import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import type { Expense } from '../../../types'
import { Check } from 'lucide-react'

const expenseSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  amount: z.coerce.number().min(0.01, 'Must be greater than 0'),
  date: z.string().min(1, 'Date is required'),
})

export type ExpenseFormData = z.infer<typeof expenseSchema>

interface ExpenseFormProps {
  initialData?: Partial<Expense>
  onSubmit: (data: ExpenseFormData) => void
  isSubmitting?: boolean
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const navigate = useNavigate()
  
  // Format today's date for default input if no initial date
  const today = new Date().toISOString().split('T')[0]

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema) as any,
    defaultValues: {
      description: initialData?.description || '',
      category: initialData?.category || '',
      amount: initialData?.amount || 0,
      date: initialData?.date ? initialData.date.split('T')[0] : today,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      
      <section className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
        <div className="bg-[#F7F5EF]/50 px-6 py-4 border-b border-[#E5E4DA]">
          <h2 className="text-[11px] font-bold text-[#17243A] uppercase tracking-[0.15em]">
            Expense Details
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <Input
            label="Description"
            placeholder="e.g. Generator Fuel"
            {...register('description')}
            error={errors.description?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-bold text-[#202820]">
                Category
              </label>
              <select
                {...register('category')}
                className={`w-full px-4 py-3 bg-[#F7F5EF] border border-transparent rounded-[12px] text-sm text-[#202820] outline-none transition-all focus:bg-white focus:border-[#17243A] focus:ring-4 focus:ring-[#17243A]/10 ${
                  errors.category ? 'border-[#B74C43] focus:border-[#B74C43] focus:ring-[#B74C43]/10 bg-white' : ''
                }`}
              >
                <option value="">Select a category</option>
                <option value="Rent">Rent</option>
                <option value="Transport">Transport</option>
                <option value="Electricity">Electricity</option>
                <option value="Internet">Internet</option>
                <option value="Staff">Staff</option>
                <option value="Supplies">Supplies</option>
                <option value="Marketing">Marketing</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="text-xs text-[#B74C43] mt-1.5 font-medium">{errors.category.message}</p>
              )}
            </div>

            <Input
              label="Amount"
              prefixText="₦"
              type="number"
              {...register('amount')}
              error={errors.amount?.message}
            />
          </div>

          <div className="w-full md:w-1/2 md:pr-3">
            <Input
              label="Date"
              type="date"
              {...register('date')}
              error={errors.date?.message}
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5E4DA]">
        <button
          type="button"
          onClick={() => navigate('/expenses')}
          className="text-sm font-semibold text-[#73796F] hover:text-[#202820] transition-colors"
        >
          Cancel and return
        </button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto min-w-[200px]"
          isLoading={isSubmitting}
          leftIcon={<Check className="w-4 h-4 text-[#356AE6]" />}
        >
          Save Expense
        </Button>
      </div>
    </form>
  )
}
