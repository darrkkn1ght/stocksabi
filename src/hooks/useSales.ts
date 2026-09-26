import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Sale, SaleItem, PaymentMethod } from '../types'
import { getStorageItem, setStorageItem } from '../lib/storage'
import { useInventory } from './useInventory'

const SALES_STORAGE_KEY = 'stocksabi_sales'

export function useSales() {
  const [sales, setSales] = useState<Sale[]>(() =>
    getStorageItem<Sale[]>(SALES_STORAGE_KEY, [])
  )

  const { products, updateProduct } = useInventory()

  useEffect(() => {
    setStorageItem(SALES_STORAGE_KEY, sales)
  }, [sales])

  const recordSale = useCallback((
    items: Omit<SaleItem, 'lineTotal'>[],
    paymentMethod: PaymentMethod
  ) => {
    // 1. Calculate totals and create SaleItems
    const saleItems: SaleItem[] = items.map((item) => ({
      ...item,
      lineTotal: item.quantity * item.sellingPrice,
    }))

    const subtotal = saleItems.reduce((sum, item) => sum + item.lineTotal, 0)
    const total = subtotal

    // 2. Validate all stock levels first (Fail-fast)
    for (const item of saleItems) {
      const product = products.find((p) => p.id === item.productId)
      if (!product || product.isArchived) {
        throw new Error(`Product ${item.productName} is unavailable or archived.`)
      }
      if (product.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productName}.`)
      }
    }

    // 3. Create the sale
    const prefix = 'SALE'
    const newId = `${prefix}-${(sales.length + 1).toString().padStart(3, '0')}`
    
    const newSale: Sale = {
      id: newId,
      items: saleItems,
      subtotal,
      total,
      paymentMethod,
      status: 'completed',
      createdAt: new Date().toISOString(),
    }

    // 4. Update inventory (decrease stock)
    for (const item of saleItems) {
      const product = products.find((p) => p.id === item.productId)!
      updateProduct(product.id, {
        stockQuantity: product.stockQuantity - item.quantity,
      })
    }

    // 5. Save the sale
    setSales((prev) => [newSale, ...prev])

    return newSale.id
  }, [products, sales.length, updateProduct])

  const getSale = useCallback((id: string) => {
    return sales.find((s) => s.id === id)
  }, [sales])

  // Summary Metrics
  const todayStart = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d.getTime()
  }, [])

  const todaysSales = useMemo(() => {
    return sales.filter((s) => new Date(s.createdAt).getTime() >= todayStart)
  }, [sales, todayStart])

  const todaySalesTotal = useMemo(() => {
    return todaysSales.reduce((sum, s) => sum + s.total, 0)
  }, [todaysSales])

  const averageTransactionValue = useMemo(() => {
    if (sales.length === 0) return 0
    const allTotals = sales.reduce((sum, s) => sum + s.total, 0)
    return allTotals / sales.length
  }, [sales])

  return {
    sales,
    recordSale,
    getSale,
    todaySalesTotal,
    transactionCount: sales.length,
    averageTransactionValue,
  }
}
