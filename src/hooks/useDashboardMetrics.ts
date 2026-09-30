import { useMemo } from 'react'
import { useInventory } from './useInventory'
import { useSales } from './useSales'
import { useExpenses } from './useExpenses'

export function useDashboardMetrics() {
  const { activeProducts, inventoryValue, getStockStatus, isLoading: inventoryLoading } = useInventory()
  const { sales, isLoading: salesLoading } = useSales()
  const { expenses, isLoading: expensesLoading } = useExpenses()

  const isLoading = inventoryLoading || salesLoading || expensesLoading

  // Business Name
  const businessName = 'Tunde' // In future, read from a Business Profile

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

  // Weekly Activity (Current Week: Mon - Sun)
  const weeklyActivity = useMemo(() => {
    const now = new Date()
    const currentDay = now.getDay() // 0 = Sun, 1 = Mon, etc.
    const dist = currentDay === 0 ? 6 : currentDay - 1 // distance from Monday
    
    const monday = new Date(now)
    monday.setDate(now.getDate() - dist)
    monday.setHours(0, 0, 0, 0)
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const data = days.map((day, index) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + index)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)
      
      const daySales = sales.filter(s => {
        const time = new Date(s.createdAt).getTime()
        return time >= date.getTime() && time <= endOfDay.getTime()
      })
      
      return {
        name: day,
        revenue: daySales.reduce((sum, s) => sum + s.total, 0),
        hasData: daySales.length > 0
      }
    })
    
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
    getStockStatus,
    isLoading
  }
}
