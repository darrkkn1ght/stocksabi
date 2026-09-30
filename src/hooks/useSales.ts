import { useMemo, useCallback } from 'react'
import type { SaleItem, PaymentMethod } from '../types'
import { useData } from '../lib/DataContext'

export function useSales() {
  const { sales, products, addSale, isLoading } = useData()

  const recordSale = useCallback(async (
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

    // 3. Create the sale via context
    const newSaleId = await addSale({
      items: saleItems,
      subtotal,
      total,
      paymentMethod,
      status: 'completed'
    })

    return newSaleId
  }, [products, addSale])

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
    isLoading,
    recordSale,
    getSale,
    todaySalesTotal,
    transactionCount: sales.length,
    averageTransactionValue,
  }
}
