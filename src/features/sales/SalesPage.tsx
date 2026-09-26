import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, ArrowRight, ReceiptText } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useSales } from '../../hooks/useSales'
import { formatNaira } from '../../lib/currency'

export const SalesPage: React.FC = () => {
  const { sales, todaySalesTotal, transactionCount, averageTransactionValue } = useSales()

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E5E4DA]">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl text-[#202820] font-serif tracking-tight leading-tight">
            Sales
          </h1>
          <p className="text-[14px] text-[#73796F] font-serif italic tracking-wide">
            Every transaction, clearly accounted for.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
          <Link to="/sales/new">
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4 text-[#D7F36B]" />}
            >
              Record sale
            </Button>
          </Link>
        </div>
      </div>

      {sales.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-[#E5E4DA] rounded-[8px] transform rotate-[6deg] opacity-50"></div>
            <div className="absolute inset-0 bg-[#174B3A] rounded-[8px] flex items-center justify-center shadow-lg">
              <ReceiptText className="w-10 h-10 text-[#D7F36B]" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white border border-[#E5E4DA] rounded-[6px] shadow-sm flex items-center justify-center">
               <Plus className="w-5 h-5 text-[#202820]" />
            </div>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-[#202820]">
            Your sales history starts here.
          </h3>
          <p className="text-sm text-[#73796F] max-w-sm mt-2 mb-8 leading-relaxed">
            Record your first sale and STOCKSABI will start showing you what your business is really doing.
          </p>
          <Link to="/sales/new">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Plus className="w-4 h-4 text-[#D7F36B]" />}
            >
              Record first sale
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Editorial Summary Area */}
          <div className="flex flex-col md:flex-row bg-[#F7F5EF] py-2">
            <div className="flex-1 py-4 pr-6 border-b md:border-b-0 md:border-r border-[#E5E4DA]">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                Today's Sales
              </p>
              <p className="text-3xl font-serif text-[#174B3A]">{formatNaira(todaySalesTotal, { showDecimals: false })}</p>
            </div>
            <div className="flex-1 py-4 px-0 md:px-6 border-b md:border-b-0 md:border-r border-[#E5E4DA]">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                Transactions
              </p>
              <p className="text-3xl font-serif text-[#174B3A]">{transactionCount}</p>
            </div>
            <div className="flex-1 py-4 px-0 md:pl-6">
              <p className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-1">
                Avg Transaction Value
              </p>
              <p className="text-3xl font-serif text-[#174B3A]">
                {formatNaira(averageTransactionValue, { showDecimals: false })}
              </p>
            </div>
          </div>

          <div className="pt-8">
            <div className="w-full">
              {/* Desktop Table */}
              <div className="hidden md:block w-full">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#E5E4DA]">
                      <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Transaction</th>
                      <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Items</th>
                      <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Total</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Payment</th>
                      <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Date</th>
                      <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Status</th>
                      <th className="py-4 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E4DA]/60">
                    {sales.map((sale) => (
                      <tr key={sale.id} className="group hover:bg-white transition-colors duration-150">
                        <td className="py-4">
                          <Link to={`/sales/${sale.id}`} className="block">
                            <p className="text-[15px] font-semibold text-[#202820] group-hover:text-[#174B3A] transition-colors leading-tight font-mono tracking-tight">
                              {sale.id}
                            </p>
                          </Link>
                        </td>
                        <td className="py-4">
                          <p className="text-[15px] font-medium text-[#202820]">
                            {sale.items.reduce((sum, item) => sum + item.quantity, 0)} items
                          </p>
                          <p className="text-xs text-[#73796F] mt-0.5 truncate max-w-[200px]">
                            {sale.items.map(i => i.productName).join(', ')}
                          </p>
                        </td>
                        <td className="py-4 text-right">
                          <p className="text-[15px] font-bold text-[#202820] font-mono tracking-tight">
                            {formatNaira(sale.total)}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-[6px] text-xs font-semibold bg-[#F7F5EF] border border-[#E5E4DA] text-[#202820] capitalize">
                            {sale.paymentMethod}
                          </span>
                        </td>
                        <td className="py-4">
                          <p className="text-sm text-[#73796F]">
                            {new Date(sale.createdAt).toLocaleDateString('en-GB', { 
                              day: 'numeric', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit' 
                            })}
                          </p>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#367A53] shadow-sm"></div>
                            <span className="text-xs font-medium text-[#202820] capitalize">{sale.status}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right pr-2">
                          <Link to={`/sales/${sale.id}`} className="inline-flex p-1.5 text-[#73796F] hover:text-[#174B3A] hover:bg-[#F7F5EF] rounded-md transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List */}
              <div className="md:hidden divide-y divide-[#E5E4DA]">
                {sales.map((sale) => (
                  <Link key={sale.id} to={`/sales/${sale.id}`} className="block py-4 hover:bg-white transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-bold text-[#202820] font-mono leading-tight tracking-tight">{sale.id}</h3>
                        <p className="text-xs text-[#73796F] mt-0.5">
                          {new Date(sale.createdAt).toLocaleDateString('en-GB', { 
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-[#202820] font-mono tracking-tight">
                        {formatNaira(sale.total)}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-3 pt-3 border-t border-dashed border-[#E5E4DA]">
                      <div className="flex items-center gap-2">
                         <span className="text-xs text-[#73796F]">
                           {sale.items.reduce((sum, item) => sum + item.quantity, 0)} items
                         </span>
                         <span className="w-1 h-1 rounded-full bg-[#E5E4DA]"></span>
                         <span className="text-xs font-semibold text-[#202820] capitalize">{sale.paymentMethod}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#73796F]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
