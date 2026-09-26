import { useMemo } from 'react'
import { useInventory } from './useInventory'
import { useSales } from './useSales'
import { useExpenses } from './useExpenses'

export function useInsights() {
  const { activeProducts, getStockStatus } = useInventory()
  const { sales } = useSales()
  const { expenses } = useExpenses()

  // 1. Top Business Snapshot (All recorded activity)
  const totalRevenue = useMemo(() => sales.reduce((sum, s) => sum + s.total, 0), [sales])
  
  const totalGrossProfit = useMemo(() => {
    let profit = 0
    for (const sale of sales) {
      const cogs = sale.items.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0)
      profit += (sale.total - cogs)
    }
    return profit
  }, [sales])

  const totalOperatingExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses])
  
  const totalNetOperatingProfit = totalGrossProfit - totalOperatingExpenses

  // 2. Sales Performance (Revenue Trend)
  const revenueTrend = useMemo(() => {
    const trendMap: Record<string, number> = {}
    for (const sale of sales) {
      const dateKey = new Date(sale.createdAt).toLocaleDateString('en-GB')
      trendMap[dateKey] = (trendMap[dateKey] || 0) + sale.total
    }
    
    // Sort by date chronologically
    return Object.entries(trendMap)
      .map(([dateStr, revenue]) => {
        const [day, month, year] = dateStr.split('/')
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day))
        return { dateStr, dateObj, revenue }
      })
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
      .map(item => ({ date: item.dateStr, revenue: item.revenue }))
  }, [sales])

  // 3. Top Products (Products driving sales)
  const topProducts = useMemo(() => {
    const productMap: Record<string, { id: string, name: string, unitsSold: number, revenue: number, cogs: number }> = {}
    
    for (const sale of sales) {
      for (const item of sale.items) {
        if (!productMap[item.productId]) {
          productMap[item.productId] = {
            id: item.productId,
            name: item.productName,
            unitsSold: 0,
            revenue: 0,
            cogs: 0
          }
        }
        productMap[item.productId].unitsSold += item.quantity
        productMap[item.productId].revenue += item.lineTotal
        productMap[item.productId].cogs += (item.quantity * item.costPrice)
      }
    }

    return Object.values(productMap).map(p => {
      const grossProfit = p.revenue - p.cogs
      const margin = p.revenue > 0 ? (grossProfit / p.revenue) * 100 : 0
      return { ...p, grossProfit, margin }
    }).sort((a, b) => b.revenue - a.revenue).slice(0, 5) // top 5
  }, [sales])

  // 4. Inventory Risks
  const stockRisks = useMemo(() => {
    const risks = activeProducts.filter(p => p.stockQuantity <= p.lowStockThreshold)
    return risks.sort((a, b) => {
      if (a.stockQuantity === 0 && b.stockQuantity > 0) return -1
      if (b.stockQuantity === 0 && a.stockQuantity > 0) return 1
      const aPct = a.lowStockThreshold > 0 ? a.stockQuantity / a.lowStockThreshold : 0
      const bPct = b.lowStockThreshold > 0 ? b.stockQuantity / b.lowStockThreshold : 0
      return aPct - bPct
    }).map(p => ({
      ...p,
      status: getStockStatus(p),
      value: p.stockQuantity * p.costPrice
    })).slice(0, 5)
  }, [activeProducts, getStockStatus])

  // 5. Margin Insights
  const marginInsights = useMemo(() => {
    if (topProducts.length === 0) return null
    
    const validProducts = topProducts.filter(p => p.unitsSold > 0 && p.revenue > 0)
    if (validProducts.length === 0) return null

    const sortedByMargin = [...validProducts].sort((a, b) => b.margin - a.margin)
    const highest = sortedByMargin[0]
    const lowest = sortedByMargin[sortedByMargin.length - 1]

    return { highest, lowest }
  }, [topProducts])

  // 6. Expense Concentration
  const expenseBreakdown = useMemo(() => {
    const catMap: Record<string, number> = {}
    for (const exp of expenses) {
      catMap[exp.category] = (catMap[exp.category] || 0) + exp.amount
    }
    
    return Object.entries(catMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: totalOperatingExpenses > 0 ? (amount / totalOperatingExpenses) * 100 : 0
      }))
  }, [expenses, totalOperatingExpenses])

  // 7. Payment Mix
  const paymentMix = useMemo(() => {
    const mix = { cash: 0, transfer: 0, pos: 0 }
    for (const sale of sales) {
      if (sale.paymentMethod in mix) {
        mix[sale.paymentMethod as keyof typeof mix] += sale.total
      }
    }
    return Object.entries(mix)
      .filter(([_, amount]) => amount > 0)
      .map(([method, amount]) => ({
        method,
        amount,
        percentage: totalRevenue > 0 ? (amount / totalRevenue) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [sales, totalRevenue])

  // 8. Inventory Value (Money in Stock)
  const moneyInStock = useMemo(() => {
    let costValue = 0
    let salesValue = 0
    for (const p of activeProducts) {
      costValue += (p.stockQuantity * p.costPrice)
      salesValue += (p.stockQuantity * p.sellingPrice)
    }
    return {
      costValue,
      salesValue,
      potentialGrossProfit: salesValue - costValue
    }
  }, [activeProducts])

  // 9. Generated Business Observations
  const observations = useMemo(() => {
    const obs: { title: string, text: string, type: 'neutral' | 'warning' | 'positive' }[] = []

    // Stock observation
    const outOfStockCount = activeProducts.filter(p => p.stockQuantity === 0).length
    if (outOfStockCount > 0) {
      obs.push({
        title: `${outOfStockCount} product${outOfStockCount > 1 ? 's are' : ' is'} currently out of stock.`,
        text: 'Review these items before your next restock.',
        type: 'warning'
      })
    }

    const lowStockCount = activeProducts.filter(p => p.stockQuantity > 0 && p.stockQuantity <= p.lowStockThreshold).length
    if (lowStockCount > 0) {
      obs.push({
        title: `${lowStockCount} product${lowStockCount > 1 ? 's are' : ' is'} approaching their stock threshold.`,
        text: 'These items may need replenishment soon.',
        type: 'warning'
      })
    }

    // Sales concentration
    if (topProducts.length > 0 && totalRevenue > 0) {
      const topSelling = topProducts[0]
      const topSellingPct = (topSelling.revenue / totalRevenue) * 100
      if (topSellingPct >= 25) {
        obs.push({
          title: `${topSelling.name} generated ${Math.round(topSellingPct)}% of recorded sales revenue.`,
          text: '',
          type: 'neutral'
        })
      }
    }

    // Expense concentration
    if (expenseBreakdown.length > 0 && expenseBreakdown[0].percentage >= 30) {
      const topExp = expenseBreakdown[0]
      obs.push({
        title: `${topExp.name} accounts for ${Math.round(topExp.percentage)}% of recorded expenses.`,
        text: '',
        type: 'neutral'
      })
    }

    // Margin observation
    if (marginInsights?.highest) {
      obs.push({
        title: `${marginInsights.highest.name} currently has the highest recorded gross margin at ${Math.round(marginInsights.highest.margin)}%.`,
        text: '',
        type: 'positive'
      })
    }

    // Inventory observation
    if (moneyInStock.costValue > 0) {
      let valStr = ''
      if (moneyInStock.costValue >= 1000000) {
        valStr = `₦${(moneyInStock.costValue / 1000000).toFixed(1)}M`
      } else {
        valStr = `₦${moneyInStock.costValue.toLocaleString('en-NG')}`
      }

      obs.push({
        title: `${valStr} of capital is currently represented by inventory at cost.`,
        text: '',
        type: 'neutral'
      })
    }

    // Profit observation
    if (totalNetOperatingProfit < 0) {
      obs.push({
        title: 'Recorded operating expenses currently exceed gross profit.',
        text: '',
        type: 'warning'
      })
    } else if (totalNetOperatingProfit > 0) {
      obs.push({
        title: 'Recorded sales currently generate positive operating profit after expenses.',
        text: '',
        type: 'positive'
      })
    }

    return obs
  }, [activeProducts, topProducts, totalRevenue, expenseBreakdown, marginInsights, moneyInStock, totalNetOperatingProfit])

  return {
    totalRevenue,
    totalGrossProfit,
    totalOperatingExpenses,
    totalNetOperatingProfit,
    revenueTrend,
    topProducts,
    stockRisks,
    marginInsights,
    expenseBreakdown,
    paymentMix,
    moneyInStock,
    observations,
    hasSales: sales.length > 0,
    hasExpenses: expenses.length > 0,
    hasProducts: activeProducts.length > 0
  }
}
