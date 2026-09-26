import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ProductForm } from './components/ProductForm'
import type { ProductFormData } from './components/ProductForm'
import { useInventory } from '../../hooks/useInventory'
import { ArrowLeft } from 'lucide-react'

export const NewProductPage: React.FC = () => {
  const navigate = useNavigate()
  const { addProduct } = useInventory()

  const handleSubmit = (data: ProductFormData) => {
    addProduct(data)
    navigate('/inventory')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="mb-4">
        <Link to="/inventory" className="text-xs font-bold uppercase tracking-widest text-[#73796F] hover:text-[#174B3A] inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Inventory
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E5E4DA]">
        <h1 className="text-4xl font-serif font-bold text-[#202820] tracking-tight leading-tight">
          Add New Product
        </h1>
        <p className="text-sm text-[#73796F] font-serif italic tracking-wide mt-2">
          Create a new product in your inventory catalog.
        </p>
      </div>

      <ProductForm onSubmit={handleSubmit} />
    </div>
  )
}
