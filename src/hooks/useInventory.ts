import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Product, StockStatus } from '../types'
import { getStorageItem, setStorageItem } from '../lib/storage'

const INVENTORY_STORAGE_KEY = 'stocksabi_inventory'

export function useInventory() {
  const [products, setProducts] = useState<Product[]>(() =>
    getStorageItem<Product[]>(INVENTORY_STORAGE_KEY, [])
  )

  useEffect(() => {
    setStorageItem(INVENTORY_STORAGE_KEY, products)
  }, [products])

  const addProduct = useCallback((product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>) => {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setProducts((prev) => [...prev, newProduct])
    return newProduct.id
  }, [])

  const updateProduct = useCallback((id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    )
  }, [])

  const archiveProduct = useCallback((id: string) => {
    updateProduct(id, { isArchived: true })
  }, [updateProduct])

  const getProduct = useCallback((id: string) => {
    return products.find((p) => p.id === id)
  }, [products])

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
    addProduct,
    updateProduct,
    archiveProduct,
    getProduct,
    getStockStatus,
  }
}
