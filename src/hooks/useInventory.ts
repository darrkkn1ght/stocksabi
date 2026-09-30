import { useMemo } from 'react'
import type { Product, StockStatus } from '../types'
import { useData } from '../lib/DataContext'

export function useInventory() {
  const { products, addProduct, updateProduct, isLoading } = useData()

  const archiveProduct = (id: string) => {
    updateProduct(id, { isArchived: true })
  }

  const getProduct = (id: string) => {
    return products.find((p) => p.id === id)
  }

  const activeProducts = useMemo(() => products.filter((p) => !p.isArchived), [products])
  const archivedProducts = useMemo(() => products.filter((p) => p.isArchived), [products])

  const inventoryValue = useMemo(
    () => activeProducts.reduce((total, p) => total + p.stockQuantity * p.costPrice, 0),
    [activeProducts]
  )

  const getStockStatus = (product: Product): StockStatus => {
    if (product.stockQuantity <= 0) return 'out_of_stock'
    if (product.stockQuantity <= product.lowStockThreshold) return 'low_stock'
    return 'in_stock'
  }

  return {
    products,
    activeProducts,
    archivedProducts,
    inventoryValue,
    isLoading,
    addProduct,
    updateProduct,
    archiveProduct,
    getProduct,
    getStockStatus,
  }
}
