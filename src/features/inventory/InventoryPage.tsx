import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, LayoutGrid } from 'lucide-react'

import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useInventory } from '../../hooks/useInventory'
import { formatNaira } from '../../lib/currency'
import { ProductTable } from './components/ProductTable'
import type { StockStatus } from '../../types'

export const InventoryPage: React.FC = () => {
  const { activeProducts, inventoryValue, getStockStatus } = useInventory()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | StockStatus>('all')

  const totalProducts = activeProducts.length
  const unitsInStock = activeProducts.reduce((sum, p) => sum + p.stockQuantity, 0)
  const needsAttentionCount = activeProducts.filter(
    (p) => getStockStatus(p) === 'low_stock' || getStockStatus(p) === 'out_of_stock'
  ).length

  const filteredProducts = useMemo(() => {
    return activeProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      
      if (!matchesSearch) return false

      if (statusFilter !== 'all') {
        return getStockStatus(p) === statusFilter
      }

      return true
    })
  }, [activeProducts, searchQuery, statusFilter, getStockStatus])

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5E4DA]">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl text-[#202820] font-serif tracking-tight leading-tight">
            Inventory
          </h1>
          <p className="text-[14px] text-[#73796F] font-serif italic tracking-wide">
            Know exactly what's on your shelves.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
          <Link to="/inventory/new">
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4 text-[#D7F36B]" />}
            >
              Add product
            </Button>
          </Link>
        </div>
      </div>

      {activeProducts.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          {/* Abstract CSS Illustration */}
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-[#E5E4DA] rounded-[8px] transform rotate-[-6deg] opacity-50"></div>
            <div className="absolute inset-0 bg-[#174B3A] rounded-[8px] flex items-center justify-center shadow-lg">
              <LayoutGrid className="w-10 h-10 text-[#D7F36B]" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white border border-[#E5E4DA] rounded-[6px] shadow-sm flex items-center justify-center">
               <Plus className="w-5 h-5 text-[#202820]" />
            </div>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-[#202820]">
            Your shelves are waiting.
          </h3>
          <p className="text-sm text-[#73796F] max-w-sm mt-2 mb-8 leading-relaxed">
            Add your first product and STOCKSABI will start keeping track of what you carry.
          </p>
          <Link to="/inventory/new">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Plus className="w-4 h-4 text-[#D7F36B]" />}
            >
              Add your first product
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Editorial Summary Area */}
          <div className="flex flex-col md:flex-row bg-[#F7F5EF] py-2">
            <div className="flex-1 py-4 pr-6 border-b md:border-b-0 md:border-r border-[#E5E4DA]">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                Catalog
              </p>
              <p className="text-3xl font-serif text-[#174B3A]">{totalProducts} <span className="text-lg font-sans font-normal text-[#73796F]">products</span></p>
            </div>
            <div className="flex-1 py-4 px-0 md:px-6 border-b md:border-b-0 md:border-r border-[#E5E4DA]">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                In Stock
              </p>
              <p className="text-3xl font-serif text-[#174B3A]">{unitsInStock} <span className="text-lg font-sans font-normal text-[#73796F]">units</span></p>
            </div>
            <div className="flex-1 py-4 px-0 md:px-6 border-b md:border-b-0 md:border-r border-[#E5E4DA]">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                Inventory Value
              </p>
              <p className="text-3xl font-serif text-[#174B3A]">{formatNaira(inventoryValue, { showDecimals: false })}</p>
            </div>
            <div className="flex-1 py-4 px-0 md:pl-6">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                Needs Attention
              </p>
              <p className={`text-3xl font-serif ${needsAttentionCount > 0 ? 'text-[#B74C43]' : 'text-[#73796F]'}`}>
                {needsAttentionCount} <span className="text-lg font-sans font-normal text-[#73796F]">products</span>
              </p>
            </div>
          </div>

          <div className="pt-8">
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-4 border-b border-[#E5E4DA] pb-4">
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                {(['all', 'in_stock', 'low_stock', 'out_of_stock'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                      statusFilter === filter 
                      ? 'bg-[#202820] text-white' 
                      : 'bg-transparent text-[#73796F] hover:text-[#202820] hover:bg-black/5'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter === 'in_stock' ? 'In stock' : filter === 'low_stock' ? 'Low stock' : 'Out of stock'}
                  </button>
                ))}
              </div>
              <div className="w-full md:w-72">
                <Input
                  placeholder="Search products..."
                  leftIcon={<Search className="w-4 h-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-0 border-b border-[#E5E4DA] rounded-none px-0 focus:ring-0 focus:border-[#174B3A] pl-8"
                />
              </div>
            </div>

            <ProductTable products={filteredProducts} getStockStatus={getStockStatus} />
          </div>
        </>
      )}
    </div>
  )
}
