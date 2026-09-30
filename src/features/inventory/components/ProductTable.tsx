import React from 'react'
import { Link } from 'react-router-dom'
import { PackageX, MoreHorizontal } from 'lucide-react'
import type { Product, StockStatus } from '../../../types'
import { Badge } from '../../../components/ui/Badge'
import { formatNaira } from '../../../lib/currency'

interface ProductTableProps {
  products: Product[]
  getStockStatus: (product: Product) => StockStatus
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, getStockStatus }) => {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-[#73796F]">
        <PackageX className="w-8 h-8 opacity-50 mx-auto mb-3" />
        <p className="text-sm font-medium text-[#202820]">No products found</p>
        <p className="text-xs">Adjust your search or filters.</p>
      </div>
    )
  }

  const getStatusIndicator = (status: StockStatus) => {
    switch (status) {
      case 'in_stock':
        return <div className="w-2 h-2 rounded-full bg-[#367A53] shadow-sm" title="In stock" />
      case 'low_stock':
        return <div className="w-2 h-2 rounded-full bg-[#B77826] shadow-sm" title="Low stock" />
      case 'out_of_stock':
        return <div className="w-2 h-2 rounded-full bg-[#B74C43] shadow-sm" title="Out of stock" />
    }
  }

  const getMobileBadge = (status: StockStatus) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="success" size="sm">In stock</Badge>
      case 'low_stock':
        return <Badge variant="warning" size="sm">Low stock</Badge>
      case 'out_of_stock':
        return <Badge variant="danger" size="sm">Out of stock</Badge>
    }
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block w-full">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#E5E4DA]">
              <th className="px-2 py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] w-8"></th>
              <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Product</th>
              <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Selling Price</th>
              <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Cost Price</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Stock</th>
              <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E4DA]/60">
            {products.map((product) => (
              <tr key={product.id} className="group hover:bg-white transition-colors duration-150">
                <td className="px-2 py-4 align-middle">
                  <div className="flex items-center justify-center">
                    {getStatusIndicator(getStockStatus(product))}
                  </div>
                </td>
                <td className="py-4">
                  <Link to={`/inventory/${product.id}`} className="block">
                    <p className="text-[15px] font-semibold text-[#202820] group-hover:text-[#17243A] transition-colors leading-tight">
                      {product.name}
                    </p>
                    <p className="text-xs text-[#73796F] mt-0.5">{product.category}</p>
                  </Link>
                </td>
                <td className="py-4 text-right">
                  <p className="text-[15px] font-medium text-[#202820] font-mono tracking-tight">
                    {formatNaira(product.sellingPrice)}
                  </p>
                </td>
                <td className="py-4 text-right">
                  <p className="text-sm text-[#73796F] font-mono tracking-tight">
                    {formatNaira(product.costPrice)}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className={`text-[15px] font-bold ${product.stockQuantity === 0 ? 'text-[#B74C43]' : 'text-[#202820]'}`}>
                    {product.stockQuantity}
                  </p>
                </td>
                <td className="py-4 text-right pr-2">
                  <Link to={`/inventory/${product.id}/edit`} className="inline-flex p-1.5 text-[#73796F] hover:text-[#17243A] hover:bg-[#F7F5EF] rounded-md transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="md:hidden divide-y divide-[#E5E4DA]">
        {products.map((product) => (
          <div key={product.id} className="py-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link to={`/inventory/${product.id}`}>
                  <h3 className="text-base font-bold text-[#202820] leading-tight">{product.name}</h3>
                </Link>
                <p className="text-xs text-[#73796F] mt-0.5">{product.category}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-sm font-semibold text-[#202820] font-mono tracking-tight">
                  {formatNaira(product.sellingPrice)}
                </p>
                {getMobileBadge(getStockStatus(product))}
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-4 pt-3 border-t border-dashed border-[#E5E4DA]">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#73796F] uppercase tracking-wider font-bold">Stock</span>
                <span className={`text-sm font-bold ${product.stockQuantity === 0 ? 'text-[#B74C43]' : 'text-[#202820]'}`}>
                  {product.stockQuantity}
                </span>
              </div>
              <Link to={`/inventory/${product.id}/edit`} className="text-xs font-semibold text-[#17243A] px-3 py-1.5 bg-white border border-[#E5E4DA] rounded-[8px]">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
