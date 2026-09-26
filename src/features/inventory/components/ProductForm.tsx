import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import type { Product } from '../../../types'
import { Check } from 'lucide-react'

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  sellingPrice: z.coerce.number().min(0, 'Must be a positive number'),
  costPrice: z.coerce.number().min(0, 'Must be a positive number'),
  stockQuantity: z.coerce.number().int().min(0, 'Must be a positive integer'),
  lowStockThreshold: z.coerce.number().int().min(0, 'Must be a positive integer'),
})

export type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: Partial<Product>
  onSubmit: (data: ProductFormData) => void
  isSubmitting?: boolean
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      sellingPrice: initialData?.sellingPrice || 0,
      costPrice: initialData?.costPrice || 0,
      stockQuantity: initialData?.stockQuantity || 0,
      lowStockThreshold: initialData?.lowStockThreshold || 5,
    },
  })

  const sellingPrice = watch('sellingPrice')
  const costPrice = watch('costPrice')
  
  const showMarginWarning = sellingPrice > 0 && costPrice > 0 && sellingPrice <= costPrice

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 pb-20">
      
      {/* Product Information Section */}
      <section className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
        <div className="bg-[#F7F5EF]/50 px-6 py-4 border-b border-[#E5E4DA]">
          <h2 className="text-[11px] font-bold text-[#174B3A] uppercase tracking-[0.15em]">
            Product Information
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Product Name"
            placeholder="e.g. Peak Milk 400g"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Category"
            placeholder="e.g. Dairy & Beverages"
            {...register('category')}
            error={errors.category?.message}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
        <div className="bg-[#F7F5EF]/50 px-6 py-4 border-b border-[#E5E4DA]">
          <h2 className="text-[11px] font-bold text-[#174B3A] uppercase tracking-[0.15em]">
            Pricing
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Cost Price"
            prefixText="₦"
            type="number"
            {...register('costPrice')}
            error={errors.costPrice?.message}
            helperText="How much you pay your supplier."
          />
          <div className="space-y-1">
            <Input
              label="Selling Price"
              prefixText="₦"
              type="number"
              {...register('sellingPrice')}
              error={errors.sellingPrice?.message}
              helperText="How much you sell it for."
            />
            {showMarginWarning && (
              <p className="text-xs text-[#B77826] font-medium mt-1">
                ⚠️ Warning: Selling price is not greater than cost price.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stock Section */}
      <section className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
        <div className="bg-[#F7F5EF]/50 px-6 py-4 border-b border-[#E5E4DA]">
          <h2 className="text-[11px] font-bold text-[#174B3A] uppercase tracking-[0.15em]">
            Stock
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Current Stock Quantity"
            type="number"
            {...register('stockQuantity')}
            error={errors.stockQuantity?.message}
          />
          <Input
            label="Low-Stock Threshold"
            type="number"
            {...register('lowStockThreshold')}
            error={errors.lowStockThreshold?.message}
            helperText="Alert when stock falls to this number."
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5E4DA]">
        <button
          type="button"
          onClick={() => navigate('/inventory')}
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
          leftIcon={<Check className="w-4 h-4 text-[#D7F36B]" />}
        >
          Save Product
        </Button>
      </div>
    </form>
  )
}
