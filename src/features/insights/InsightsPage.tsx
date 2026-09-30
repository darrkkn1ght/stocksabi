import React from 'react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { PageHeader } from '../../components/layout/PageHeader'
import { useInsights } from '../../hooks/useInsights'
import { formatNaira } from '../../lib/currency'
import { AlertTriangle, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react'

export const InsightsPage: React.FC = () => {
  const {
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
    hasSales,
    hasExpenses,
    hasProducts,
  } = useInsights()

  if (!hasProducts && !hasSales && !hasExpenses) {
    return (
      <div className="max-w-4xl mx-auto py-20 animate-in fade-in duration-300">
        <PageHeader 
          title="Business Insights" 
          subtitle="See what your sales, stock and expenses are telling you."
          serifTitle
        />
        <div className="mt-12 bg-[#F7F5EF] border border-[#E5E4DA] rounded-[24px] p-10 md:p-16 text-center shadow-xs">
          <h2 className="text-2xl font-serif font-bold text-[#17243A] mb-2">No data available yet.</h2>
          <p className="text-[#73796F]">
            Insights will automatically generate once you start adding products and recording sales.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24 animate-in fade-in duration-300 space-y-10">
      <PageHeader 
        title="Business Insights" 
        subtitle="See what your sales, stock and expenses are telling you."
        serifTitle
      />

      {/* 4. TOP BUSINESS SNAPSHOT */}
      <section>
        <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-4">All recorded activity</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs divide-y sm:divide-y-0 sm:divide-x divide-[#E5E4DA]">
          <div className="p-6">
            <h3 className="text-xs font-bold text-[#73796F] mb-1">Revenue</h3>
            <p className="text-3xl font-mono font-bold text-[#202820] tracking-tight">{formatNaira(totalRevenue, { showDecimals: false })}</p>
          </div>
          <div className="p-6">
            <h3 className="text-xs font-bold text-[#73796F] mb-1">Gross Profit</h3>
            <p className="text-3xl font-mono font-bold text-[#367A53] tracking-tight">{formatNaira(totalGrossProfit, { showDecimals: false })}</p>
          </div>
          <div className="p-6">
            <h3 className="text-xs font-bold text-[#73796F] mb-1">Operating Expenses</h3>
            <p className="text-3xl font-mono font-bold text-[#B77826] tracking-tight">{formatNaira(totalOperatingExpenses, { showDecimals: false })}</p>
          </div>
          <div className="p-6 bg-[#F7F5EF]">
            <h3 className="text-xs font-bold text-[#73796F] mb-1">Net Operating Profit</h3>
            <p className={`text-3xl font-mono font-bold tracking-tight ${totalNetOperatingProfit < 0 ? 'text-[#B74C43]' : 'text-[#202820]'}`}>
              {formatNaira(Math.abs(totalNetOperatingProfit), { showDecimals: false })}
            </p>
            {totalNetOperatingProfit < 0 && (
              <p className="text-[10px] text-[#B74C43] uppercase tracking-wider font-bold mt-1">Operating Loss</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid: 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* 5. SALES PERFORMANCE */}
          <section>
            <h2 className="text-lg font-serif font-bold text-[#202820] mb-4 border-b border-[#E5E4DA] pb-2">
              Sales Performance
            </h2>
            <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs h-[300px] flex items-center justify-center">
              {revenueTrend.length === 0 ? (
                <div className="text-center">
                  <p className="text-[#202820] font-serif font-bold text-lg mb-1">No sales data yet</p>
                  <p className="text-sm text-[#73796F]">Complete a sale to start seeing your business trend.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrend} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#17243A" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#17243A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#73796F', fontSize: 12, fontWeight: 600 }} 
                      dy={10}
                      tickFormatter={(val: string) => {
                        const parts = val.split('/')
                        return `${parts[0]}/${parts[1]}` // DD/MM
                      }}
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
                      fill="url(#colorTrend)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

          {/* 6. TOP PRODUCTS */}
          <section>
            <h2 className="text-lg font-serif font-bold text-[#202820] mb-4 border-b border-[#E5E4DA] pb-2">
              Products Driving Sales
            </h2>
            {topProducts.length === 0 ? (
              <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 text-center">
                <p className="text-sm text-[#73796F]">No product sales recorded yet.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#F7F5EF]/50 border-b border-[#E5E4DA]">
                        <th className="px-5 py-3 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Product</th>
                        <th className="px-5 py-3 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-center">Units Sold</th>
                        <th className="px-5 py-3 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Revenue</th>
                        <th className="px-5 py-3 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Margin %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E4DA]">
                      {topProducts.map(p => (
                        <tr key={p.id} className="hover:bg-[#F7F5EF]/30 transition-colors">
                          <td className="px-5 py-4">
                            <Link to={`/inventory/${p.id}`} className="text-[14px] font-bold text-[#202820] hover:text-[#17243A]">
                              {p.name}
                            </Link>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span className="inline-block px-2 py-1 bg-[#F7F5EF] text-[#202820] rounded-[6px] text-xs font-bold">
                              {p.unitsSold}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="text-[14px] font-bold text-[#202820] font-mono tracking-tight">
                              {formatNaira(p.revenue)}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className={`text-[14px] font-bold font-mono tracking-tight ${p.margin < 0 ? 'text-[#B74C43]' : 'text-[#367A53]'}`}>
                              {Math.round(p.margin)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* 8. MARGIN INSIGHTS */}
          <section>
            <h2 className="text-lg font-serif font-bold text-[#202820] mb-4 border-b border-[#E5E4DA] pb-2">
              Margin Watch
            </h2>
            {!marginInsights ? (
              <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 text-center">
                <p className="text-sm text-[#73796F]">Sell a product to start seeing margin performance.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs">
                  <h3 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-3">Highest Margin</h3>
                  <p className="text-lg font-serif font-bold text-[#202820] leading-tight mb-2">
                    {marginInsights.highest.name} has a {Math.round(marginInsights.highest.margin)}% gross margin across {marginInsights.highest.unitsSold} units sold.
                  </p>
                  <p className="text-xs text-[#73796F]">
                    {formatNaira(marginInsights.highest.revenue, { showDecimals: false })} revenue · {formatNaira(marginInsights.highest.grossProfit, { showDecimals: false })} gross profit
                  </p>
                </div>
                <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs">
                  <h3 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-3">Lowest Margin</h3>
                  <p className="text-lg font-serif font-bold text-[#202820] leading-tight mb-2">
                    {marginInsights.lowest.name} has a {Math.round(marginInsights.lowest.margin)}% gross margin across {marginInsights.lowest.unitsSold} units sold.
                  </p>
                  <p className="text-xs text-[#73796F]">
                    {formatNaira(marginInsights.lowest.revenue, { showDecimals: false })} revenue · {formatNaira(marginInsights.lowest.grossProfit, { showDecimals: false })} gross profit
                  </p>
                </div>
              </div>
            )}
          </section>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* 7. INVENTORY RISKS */}
          <section>
            <h2 className="text-lg font-serif font-bold text-[#202820] mb-4 border-b border-[#E5E4DA] pb-2">
              Stock to Watch
            </h2>
            {stockRisks.length === 0 ? (
              <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 text-center shadow-xs">
                <p className="text-sm font-bold text-[#202820] mb-1">Your shelves are in good shape.</p>
                <p className="text-xs text-[#73796F]">No stock risks detected.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stockRisks.map(risk => (
                  <Link key={risk.id} to={`/inventory/${risk.id}`} className="block bg-white border border-[#E5E4DA] rounded-[12px] p-4 shadow-xs hover:border-[#17243A]/30 hover:shadow-sm transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-bold text-[#202820] group-hover:text-[#17243A] transition-colors pr-2 leading-tight">
                        {risk.name}
                      </p>
                      {risk.status === 'out_of_stock' && <AlertTriangle className="w-4 h-4 text-[#B74C43] shrink-0" />}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className={`text-xl font-serif font-bold leading-none ${risk.status === 'out_of_stock' ? 'text-[#B74C43]' : 'text-[#B77826]'}`}>
                          {risk.stockQuantity}
                        </p>
                        <p className="text-[10px] text-[#73796F] uppercase tracking-wider font-bold mt-1">Current Stock</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#202820] font-mono tracking-tight">{formatNaira(risk.value, { showDecimals: false })}</p>
                        <p className="text-[10px] text-[#73796F] uppercase tracking-wider font-bold mt-1">Est. Value</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* 9. EXPENSE CONCENTRATION */}
          <section>
            <h2 className="text-lg font-serif font-bold text-[#202820] mb-4 border-b border-[#E5E4DA] pb-2">
              Where Your Money Goes
            </h2>
            {expenseBreakdown.length === 0 ? (
              <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 text-center">
                <p className="text-sm text-[#73796F]">No expenses recorded yet.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs">
                <div className="space-y-4">
                  {expenseBreakdown.map(cat => (
                    <div key={cat.name}>
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-sm font-bold text-[#202820] capitalize">{cat.name} <span className="text-[#73796F] font-normal">— {Math.round(cat.percentage)}%</span></span>
                        <span className="text-sm font-bold text-[#202820] font-mono tracking-tight">
                          {formatNaira(cat.amount, { showDecimals: false })}
                        </span>
                      </div>
                      <div className="w-full bg-[#F7F5EF] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#B77826] h-1.5 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 10. PAYMENT MIX */}
          <section>
            <h2 className="text-lg font-serif font-bold text-[#202820] mb-4 border-b border-[#E5E4DA] pb-2">
              How Customers Pay
            </h2>
            {paymentMix.length === 0 ? (
              <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 text-center">
                <p className="text-sm text-[#73796F]">Payment activity will appear here after your first sale.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs">
                <div className="space-y-4">
                  {paymentMix.map(mix => (
                    <div key={mix.method} className="flex justify-between items-center pb-3 border-b border-[#E5E4DA] last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-bold text-[#202820] capitalize">{mix.method}</p>
                        <p className="text-[10px] text-[#73796F] uppercase tracking-wider font-bold mt-0.5">{Math.round(mix.percentage)}%</p>
                      </div>
                      <p className="text-[15px] font-bold text-[#202820] font-mono tracking-tight">
                        {formatNaira(mix.amount, { showDecimals: false })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 11. INVENTORY VALUE */}
          <section>
            <h2 className="text-lg font-serif font-bold text-[#202820] mb-4 border-b border-[#E5E4DA] pb-2">
              Money in Stock
            </h2>
            <div className="bg-white border border-[#E5E4DA] rounded-[16px] shadow-xs overflow-hidden">
              <div className="divide-y divide-[#E5E4DA]">
                <div className="p-5 flex justify-between items-center">
                  <span className="text-sm font-bold text-[#202820]">Inventory Cost Value</span>
                  <span className="text-lg font-bold text-[#202820] font-mono tracking-tight">{formatNaira(moneyInStock.costValue, { showDecimals: false })}</span>
                </div>
                <div className="p-5 flex justify-between items-center bg-[#F7F5EF]">
                  <span className="text-sm font-medium text-[#73796F]">Potential Sales Value</span>
                  <span className="text-lg font-bold text-[#202820] font-mono tracking-tight">{formatNaira(moneyInStock.salesValue, { showDecimals: false })}</span>
                </div>
                <div className="p-5 flex justify-between items-center bg-[#F7F5EF]">
                  <span className="text-sm font-medium text-[#73796F]">Potential Gross Profit</span>
                  <span className="text-lg font-bold text-[#202820] font-mono tracking-tight">{formatNaira(moneyInStock.potentialGrossProfit, { showDecimals: false })}</span>
                </div>
              </div>
              <div className="p-4 bg-[#F7F5EF]/50 border-t border-[#E5E4DA]">
                <p className="text-[11px] text-[#73796F] italic font-serif leading-relaxed">
                  Based on current stock and current selling prices. Actual profit depends on future sales.
                </p>
              </div>
            </div>
          </section>

        </div>

      </div>

      {/* 12. GENERATED BUSINESS OBSERVATIONS */}
      {observations.length > 0 && (
        <section className="pt-8 mt-8 border-t border-[#E5E4DA]">
          <h2 className="text-2xl font-serif font-bold text-[#202820] mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#356AE6]" /> What Stands Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {observations.map((obs, idx) => (
              <div key={idx} className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1 h-full ${
                  obs.type === 'warning' ? 'bg-[#B74C43]' : obs.type === 'positive' ? 'bg-[#367A53]' : 'bg-[#17243A]'
                }`}></div>
                <h3 className="text-lg font-serif font-bold text-[#202820] mb-2 leading-tight pr-4">
                  {obs.title}
                </h3>
                {obs.text && (
                  <p className="text-sm text-[#73796F] leading-relaxed">
                    {obs.text}
                  </p>
                )}
                {obs.type === 'positive' && <TrendingUp className="w-12 h-12 text-[#367A53]/5 absolute bottom-[-10px] right-[-10px]" />}
                {obs.type === 'warning' && <TrendingDown className="w-12 h-12 text-[#B74C43]/5 absolute bottom-[-10px] right-[-10px]" />}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
