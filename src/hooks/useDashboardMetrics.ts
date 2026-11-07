import { useMemo } from 'react'
import { useInventory } from './useInventory'
import { useSales } from './useSales'
import { useExpenses } from './useExpenses'
import { useAuth } from '../lib/AuthContext'

export function useDashboardMetrics() {
  const { business, user } = useAuth()
  const { activeProducts, inventoryValue, getStockStatus, isLoading: inventoryLoading } = useInventory()
  const { sales, isLoading: salesLoading } = useSales()
  const { expenses, isLoading: expensesLoading } = useExpenses()

  const isLoading = inventoryLoading || salesLoading || expensesLoading

  // Business Name or Owner first name
  const businessName = useMemo(() => {
    const metaName = user?.user_metadata?.full_name as string | undefined
    if (metaName && metaName.trim()) {
      return metaName.trim().split(' ')[0]
    }
    if (business?.name) {
      return business.name.split(' ')[0]
    }
    return 'Tunde'
  }, [business, user])

  // Determine empty state
  const hasNoData = !isLoading && activeProducts.length === 0 && sales.length === 0 && expenses.length === 0

  // Today's metrics
  const todayStart = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d.getTime()
  }, [])

  const todaysSales = useMemo(() => {
    return sales.filter((s) => new Date(s.createdAt).getTime() >= todayStart)
  }, [sales, todayStart])

  const todaysExpenses = useMemo(() => {
    return expenses.filter((e) => new Date(e.date).getTime() >= todayStart)
  }, [expenses, todayStart])

  const todayRevenue = useMemo(() => {
    return todaysSales.reduce((sum, s) => sum + s.total, 0)
  }, [todaysSales])

  const todayGrossProfit = useMemo(() => {
    let profit = 0
    for (const sale of todaysSales) {
      const cogs = sale.items.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0)
      profit += (sale.total - cogs)
    }
    return profit
  }, [todaysSales])

  const todayOperatingExpenses = useMemo(() => {
    return todaysExpenses.reduce((sum, e) => sum + e.amount, 0)
  }, [todaysExpenses])

  const todayNetProfit = todayGrossProfit - todayOperatingExpenses

  // Best-selling product insight
  const topSellingInsight = useMemo(() => {
    const sourceSales = todaysSales.length > 0 ? todaysSales : sales
    if (sourceSales.length === 0) return null

    const productMap: Record<string, { name: string; revenue: number; units: number }> = {}
    for (const sale of sourceSales) {
      for (const item of sale.items) {
        if (!productMap[item.productId]) {
          productMap[item.productId] = { name: item.productName, revenue: 0, units: 0 }
        }
        productMap[item.productId].revenue += item.lineTotal
        productMap[item.productId].units += item.quantity
      }
    }

    const sorted = Object.values(productMap).sort((a, b) => b.revenue - a.revenue)
    if (sorted.length === 0) return null

    return {
      ...sorted[0],
      period: todaysSales.length > 0 ? 'today' : 'overall',
    }
  }, [todaysSales, sales])

  // Recent transactions
  const recentTransactions = useMemo(() => {
    return sales.slice(0, 5)
  }, [sales])

  // Needs attention
  const needsAttention = useMemo(() => {
    const attention = activeProducts.filter(p => p.stockQuantity <= p.lowStockThreshold)
    return attention.sort((a, b) => {
      // Out of stock first
      if (a.stockQuantity === 0 && b.stockQuantity > 0) return -1
      if (b.stockQuantity === 0 && a.stockQuantity > 0) return 1
      
      // Then by percentage of threshold
      const aPct = a.lowStockThreshold > 0 ? a.stockQuantity / a.lowStockThreshold : 0
      const bPct = b.lowStockThreshold > 0 ? b.stockQuantity / b.lowStockThreshold : 0
      return aPct - bPct
    }).slice(0, 5)
  }, [activeProducts])

  // Last 7 Days Activity (rolling 7 days ending today)
  const weeklyActivity = useMemo(() => {
    const now = new Date()
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const data = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      const daySales = sales.filter(s => {
        const time = new Date(s.createdAt).getTime()
        return time >= date.getTime() && time <= endOfDay.getTime()
      })

      data.push({
        name: i === 0 ? 'Today' : dayNames[date.getDay()],
        revenue: daySales.reduce((sum, s) => sum + s.total, 0),
        hasData: daySales.length > 0,
      })
    }

    return data
  }, [sales])

  return {
    businessName,
    hasNoData,
    todayRevenue,
    todayGrossProfit,
    todayOperatingExpenses,
    todayNetProfit,
    inventoryValue,
    todaysTransactionsCount: todaysSales.length,
    activeProductsCount: activeProducts.length,
    unitsInStock: activeProducts.reduce((sum, p) => sum + p.stockQuantity, 0),
    recentTransactions,
    needsAttention,
    weeklyActivity,
    topSellingInsight,
    getStockStatus,
    isLoading
  }
}
