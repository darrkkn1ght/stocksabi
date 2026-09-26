import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ProductForm } from './components/ProductForm'
import type { ProductFormData } from './components/ProductForm'
import { useInventory } from '../../hooks/useInventory'
import { PackageX, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getProduct, updateProduct } = useInventory()

  const product = id ? getProduct(id) : undefined

  if (!product) {
    return (
      <div className="py-24 text-center max-w-2xl mx-auto">
        <PackageX className="w-8 h-8 text-[#A4A9A0] mx-auto mb-3 opacity-50" />
        <p className="text-lg font-serif font-bold text-[#202820]">Product not found</p>
        <p className="text-sm text-[#73796F] mt-2 mb-8">The product you are trying to edit does not exist.</p>
        <Button variant="secondary" onClick={() => navigate('/inventory')}>
          Return to Inventory
        </Button>
      </div>
    )
  }

  const handleSubmit = (data: ProductFormData) => {
    if (id) {
      updateProduct(id, data)
      navigate(`/inventory/${id}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="mb-4">
        <Link to={`/inventory/${id}`} className="text-xs font-bold uppercase tracking-widest text-[#73796F] hover:text-[#174B3A] inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Product
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E5E4DA]">
        <h1 className="text-4xl font-serif font-bold text-[#202820] tracking-tight leading-tight">
          Edit Product
        </h1>
        <p className="text-sm text-[#73796F] font-serif italic tracking-wide mt-2">
          Updating information for <span className="font-bold not-italic">{product.name}</span>
        </p>
      </div>

      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  )
}
