import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, ArrowRight, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from '../../components/ui/Button'
import { formatNaira } from '../../lib/currency'
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics'
import type { StockStatus } from '../../types'

export const DashboardPage: React.FC = () => {
  const {
    businessName,
    hasNoData,
    todayRevenue,
    todayGrossProfit,
    todayOperatingExpenses,
    todayNetProfit,
    inventoryValue,
    todaysTransactionsCount,
    activeProductsCount,
    unitsInStock,
    recentTransactions,
    needsAttention,
    weeklyActivity,
    getStockStatus,
  } = useDashboardMetrics()

  const getStatusColor = (status: StockStatus) => {
    switch (status) {
      case 'in_stock': return 'bg-[#367A53]'
      case 'low_stock': return 'bg-[#B77826]'
      case 'out_of_stock': return 'bg-[#B74C43]'
    }
  }

  if (hasNoData) {
    return (
      <div className="max-w-4xl mx-auto py-20 animate-in fade-in duration-300">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#202820] tracking-tight leading-tight mb-4">
          Good morning, {businessName}.
        </h1>
        
        <div className="mt-12 bg-white border border-[#E5E4DA] rounded-[24px] p-10 md:p-16 text-center shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7F5EF] rounded-full blur-3xl -mr-20 -mt-20 opacity-60"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold text-[#17243A] mb-4">Your business starts here.</h2>
            <p className="text-[#73796F] text-lg max-w-lg mx-auto leading-relaxed mb-10 font-serif">
              Add your products and record your first sale. STOCKSABI will turn those transactions into a clearer picture of your business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/inventory/new">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]" leftIcon={<Plus className="w-4 h-4" />}>
                  Add first product
                </Button>
              </Link>
              <Link to="/sales/new">
                <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]" leftIcon={<Plus className="w-4 h-4 text-[#356AE6]" />}>
                  Record first sale
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const hasSalesThisWeek = weeklyActivity.some(d => d.hasData)

  return (
    <div className="pb-24 animate-in fade-in duration-300 space-y-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E4DA]">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#202820] tracking-tight leading-none mb-3">
            Good morning, {businessName}.
          </h1>
          <p className="text-[15px] text-[#73796F] font-serif italic tracking-wide">
            Here's what is happening in your business today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Link to="/expenses/new" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full">
              Add expense
            </Button>
          </Link>
          <Link to="/sales/new" className="w-full sm:w-auto">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4 text-[#356AE6]" />} className="w-full shadow-md">
              Record sale
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Metrics - Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-[#F7F5EF] border border-[#E5E4DA] rounded-[24px] overflow-hidden shadow-xs">
        
        {/* Dominant Metric */}
        <div className="lg:col-span-4 bg-white p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#F7F5EF] rounded-full blur-2xl opacity-60"></div>
          <div className="relative z-10">
            <h2 className="text-[11px] font-bold text-[#17243A] uppercase tracking-[0.2em] mb-4">Today's Sales</h2>
            <p className="text-5xl md:text-6xl font-mono tracking-tighter font-bold text-[#202820] mb-3">
              {formatNaira(todayRevenue, { showDecimals: false })}
            </p>
            {todayRevenue > 0 ? (
              <p className="text-sm font-medium text-[#367A53] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> Revenue recorded today
              </p>
            ) : (
              <p className="text-sm font-medium text-[#73796F]">
                No sales recorded today yet.
              </p>
            )}
          </div>
        </div>

        {/* Supporting Metrics */}
        <div className="lg:col-span-8 bg-[#17243A] p-8 md:p-10 text-white flex flex-col justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            
            <div className="border-b sm:border-b-0 sm:border-r border-[#111b2b] pb-6 sm:pb-0 sm:pr-8 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-bold text-[#356AE6]/80 uppercase tracking-[0.2em] mb-3">Gross Profit</h3>
                <p className="text-3xl md:text-4xl font-serif font-bold text-[#356AE6] mb-2">
                  {formatNaira(todayGrossProfit, { showDecimals: false })}
                </p>
              </div>
              <p className="text-[11px] text-white/70 italic font-serif">
                {todayGrossProfit > 0 
                  ? "Margin after product costs."
                  : "Revenue minus COGS."}
              </p>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-[#111b2b] pb-6 sm:pb-0 sm:pr-8 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-bold text-[#356AE6]/80 uppercase tracking-[0.2em] mb-3">Expenses</h3>
                <p className="text-3xl md:text-4xl font-serif font-bold text-[#356AE6] mb-2">
                  {formatNaira(todayOperatingExpenses, { showDecimals: false })}
                </p>
              </div>
              <p className="text-[11px] text-white/70 italic font-serif">
                Today's operating costs.
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mb-3">
                  {todayNetProfit < 0 ? 'Operating Loss' : 'Net Profit'}
                </h3>
                <p className={`text-3xl md:text-4xl font-serif font-bold mb-2 ${todayNetProfit < 0 ? 'text-[#B74C43]' : 'text-white'}`}>
                  {formatNaira(Math.abs(todayNetProfit), { showDecimals: false })}
                </p>
              </div>
              <p className="text-[11px] text-white/70 italic font-serif">
                Gross profit minus today's expenses.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Sales Activity */}
          <section>
            <div className="flex justify-between items-end mb-6 border-b border-[#E5E4DA] pb-2">
              <h2 className="text-lg font-serif font-bold text-[#202820]">Sales activity</h2>
              <span className="text-xs font-bold text-[#73796F] uppercase tracking-wider">This Week</span>
            </div>
            
            <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs h-[300px] flex items-center justify-center">
              {!hasSalesThisWeek ? (
                <div className="text-center">
                  <p className="text-[#202820] font-serif font-bold text-lg mb-1">No sales recorded yet.</p>
                  <p className="text-sm text-[#73796F]">Your first transaction will appear here.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyActivity} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#17243A" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#17243A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#73796F', fontSize: 12, fontWeight: 600 }} 
                      dy={10}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E5E4DA', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                      itemStyle={{ color: '#17243A', fontWeight: 'bold' }}
                      labelStyle={{ color: '#73796F', marginBottom: '4px' }}
                      formatter={(value: any) => [formatNaira(Number(value) || 0), 'Revenue']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#17243A" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

          {/* Recent Transactions */}
          <section>
            <div className="flex justify-between items-end mb-6 border-b border-[#E5E4DA] pb-2">
              <h2 className="text-lg font-serif font-bold text-[#202820]">Recent transactions</h2>
              <Link to="/sales" className="text-xs font-bold text-[#17243A] hover:underline uppercase tracking-wider flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentTransactions.length === 0 ? (
              <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] py-12 text-center">
                <p className="text-[#202820] font-serif font-bold mb-1">Your sales history starts here.</p>
                <p className="text-xs text-[#73796F]">Transactions will appear instantly once recorded.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
                <div className="divide-y divide-[#E5E4DA]">
                  {recentTransactions.map((sale) => (
                    <Link key={sale.id} to={`/sales/${sale.id}`} className="flex items-center justify-between p-4 hover:bg-[#F7F5EF] transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[10px] bg-[#F7F5EF] border border-[#E5E4DA] flex items-center justify-center group-hover:bg-white transition-colors">
                          <span className="text-xs font-bold text-[#202820] uppercase">{sale.paymentMethod.slice(0,1)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#202820] font-mono tracking-tight">{sale.id}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-[#73796F]">
                            <span>{sale.items.reduce((acc, i) => acc + i.quantity, 0)} items</span>
                            <span className="w-1 h-1 rounded-full bg-[#E5E4DA]"></span>
                            <span className="capitalize">{sale.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[15px] font-bold text-[#202820] font-mono tracking-tight mb-0.5">
                          {formatNaira(sale.total)}
                        </p>
                        <p className="text-[10px] text-[#73796F] uppercase tracking-wider">
                          {new Date(sale.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Needs Attention */}
          <section>
            <div className="flex justify-between items-end mb-6 border-b border-[#E5E4DA] pb-2">
              <h2 className="text-lg font-serif font-bold text-[#202820]">Needs attention</h2>
            </div>

            {needsAttention.length === 0 ? (
              <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 text-center shadow-xs">
                <CheckCircle2 className="w-6 h-6 text-[#367A53] mx-auto mb-2" />
                <p className="text-sm font-bold text-[#202820] mb-1">Everything is stocked.</p>
                <p className="text-xs text-[#73796F]">No items are currently low on stock.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {needsAttention.map((product) => {
                  const status = getStockStatus(product)
                  const isOut = status === 'out_of_stock'
                  
                  return (
                    <Link key={product.id} to={`/inventory/${product.id}`} className="block bg-white border border-[#E5E4DA] rounded-[12px] p-4 shadow-xs hover:border-[#17243A]/30 hover:shadow-sm transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-sm font-bold text-[#202820] group-hover:text-[#17243A] transition-colors pr-2 leading-tight">
                          {product.name}
                        </p>
                        <div className="shrink-0">
                          {isOut ? (
                            <AlertCircle className="w-4 h-4 text-[#B74C43]" />
                          ) : (
                            <div className={`w-2 h-2 mt-1 rounded-full ${getStatusColor(status)} shadow-sm`}></div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className={`text-2xl font-serif font-bold leading-none ${isOut ? 'text-[#B74C43]' : 'text-[#B77826]'}`}>
                            {product.stockQuantity}
                          </p>
                          <p className="text-[10px] text-[#73796F] uppercase tracking-wider font-bold mt-1">Current Stock</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#202820]">{product.lowStockThreshold}</p>
                          <p className="text-[10px] text-[#73796F] uppercase tracking-wider font-bold mt-1">Threshold</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>

          {/* Business Snapshot */}
          <section>
            <div className="flex justify-between items-end mb-6 border-b border-[#E5E4DA] pb-2">
              <h2 className="text-lg font-serif font-bold text-[#202820]">Business snapshot</h2>
            </div>
            
            <div className="bg-white border border-[#E5E4DA] rounded-[16px] shadow-xs overflow-hidden">
              <div className="divide-y divide-[#E5E4DA]">
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-[#73796F]">Active Products</span>
                  <span className="text-lg font-bold text-[#202820] font-mono">{activeProductsCount}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-[#73796F]">Units in Stock</span>
                  <span className="text-lg font-bold text-[#202820] font-mono">{unitsInStock}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-[#73796F]">Inventory Value</span>
                  <span className="text-lg font-bold text-[#202820] font-mono">{formatNaira(inventoryValue, { showDecimals: false })}</span>
                </div>
                <div className="p-4 flex justify-between items-center bg-[#F7F5EF]">
                  <span className="text-sm font-bold text-[#17243A]">Transactions Today</span>
                  <span className="text-lg font-bold text-[#17243A] font-mono">{todaysTransactionsCount}</span>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  )
}
