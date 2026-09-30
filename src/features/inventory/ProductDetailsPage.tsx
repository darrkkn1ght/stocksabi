import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useInventory } from '../../hooks/useInventory'
import { PackageX, Pencil, Archive, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { formatNaira } from '../../lib/currency'
import type { StockStatus } from '../../types'

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getProduct, archiveProduct, getStockStatus } = useInventory()

  const product = id ? getProduct(id) : undefined

  if (!product) {
    return (
      <div className="py-24 text-center max-w-2xl mx-auto">
        <PackageX className="w-8 h-8 text-[#A4A9A0] mx-auto mb-3 opacity-50" />
        <p className="text-lg font-serif font-bold text-[#202820]">Product not found</p>
        <p className="text-sm text-[#73796F] mt-2 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Button variant="secondary" onClick={() => navigate('/inventory')}>
          Return to Inventory
        </Button>
      </div>
    )
  }

  const handleArchive = () => {
    if (window.confirm('Are you sure you want to archive this product? It will be hidden from the active inventory list.')) {
      if (id) {
        archiveProduct(id)
        navigate('/inventory')
      }
    }
  }

  const status = getStockStatus(product)
  const inventoryValue = product.stockQuantity * product.costPrice
  const grossMargin = product.sellingPrice - product.costPrice

  const getStatusDisplay = (status: StockStatus) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="success" size="sm" dot>In stock</Badge>
      case 'low_stock':
        return <Badge variant="warning" size="sm" dot>Low stock</Badge>
      case 'out_of_stock':
        return <Badge variant="danger" size="sm" dot>Out of stock</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-6">
        <Link to="/inventory" className="text-xs font-bold uppercase tracking-widest text-[#73796F] hover:text-[#17243A] inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Inventory
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10 border-b border-[#E5E4DA]">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#202820] tracking-tight leading-none mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#73796F] font-medium">{product.category}</span>
            <div className="w-1 h-1 rounded-full bg-[#E5E4DA]"></div>
            {getStatusDisplay(status)}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="ghost"
            leftIcon={<Archive className="w-4 h-4" />}
            onClick={handleArchive}
          >
            Archive
          </Button>
          <Link to={`/inventory/${product.id}/edit`}>
            <Button
              variant="primary"
              leftIcon={<Pencil className="w-4 h-4 text-[#356AE6]" />}
            >
              Edit Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Details Section - Editorial Layout */}
      <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Pricing Column */}
        <div className="md:col-span-5 space-y-8">
          <div>
            <h2 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-4">Pricing</h2>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#73796F] mb-1">Selling Price</p>
                <p className="text-3xl font-bold font-mono tracking-tight text-[#202820]">
                  {formatNaira(product.sellingPrice)}
                </p>
              </div>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-xs text-[#73796F] mb-1">Cost Price</p>
                  <p className="text-xl font-medium font-mono tracking-tight text-[#73796F]">
                    {formatNaira(product.costPrice)}
                  </p>
                </div>
                <div className="w-px h-10 bg-[#E5E4DA]"></div>
                <div>
                  <p className="text-xs text-[#73796F] mb-1">Gross Margin</p>
                  <p className="text-xl font-bold font-mono tracking-tight text-[#367A53]">
                    {formatNaira(grossMargin)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block md:col-span-1 border-l border-[#E5E4DA]"></div>

        {/* Stock Column */}
        <div className="md:col-span-6 space-y-8">
          <div>
            <h2 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-4">Stock Status</h2>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#73796F] mb-1">Current Quantity</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-5xl font-serif tracking-tight ${product.stockQuantity === 0 ? 'text-[#B74C43]' : 'text-[#17243A]'}`}>
                    {product.stockQuantity}
                  </p>
                  <span className="text-sm font-medium text-[#73796F]">units</span>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-xs text-[#73796F] mb-1">Low-Stock Alert at</p>
                  <p className="text-lg font-medium text-[#202820]">
                    {product.lowStockThreshold} units
                  </p>
                </div>
                <div className="w-px h-10 bg-[#E5E4DA]"></div>
                <div>
                  <p className="text-xs text-[#73796F] mb-1">Total Inventory Value</p>
                  <p className="text-lg font-bold font-mono tracking-tight text-[#202820]">
                    {formatNaira(inventoryValue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
