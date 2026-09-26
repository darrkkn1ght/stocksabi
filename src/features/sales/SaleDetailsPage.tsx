import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, ReceiptText } from 'lucide-react'
import { useSales } from '../../hooks/useSales'
import { Button } from '../../components/ui/Button'
import { formatNaira } from '../../lib/currency'

export const SaleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getSale } = useSales()

  const sale = id ? getSale(id) : undefined

  if (!sale) {
    return (
      <div className="py-24 text-center max-w-2xl mx-auto">
        <ReceiptText className="w-8 h-8 text-[#A4A9A0] mx-auto mb-3 opacity-50" />
        <p className="text-lg font-serif font-bold text-[#202820]">Sale not found</p>
        <p className="text-sm text-[#73796F] mt-2 mb-8">The transaction you are looking for does not exist.</p>
        <Button variant="secondary" onClick={() => navigate('/sales')}>
          Return to Sales
        </Button>
      </div>
    )
  }

  const cogs = sale.items.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0)
  const grossProfit = sale.total - cogs

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-200">
      <div className="mb-6">
        <Link to="/sales" className="text-xs font-bold uppercase tracking-widest text-[#73796F] hover:text-[#174B3A] inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Sales History
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10 border-b border-[#E5E4DA]">
        <div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-[#202820] tracking-tight leading-none mb-3">
            {sale.id}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#73796F]">
            <span>
              {new Date(sale.createdAt).toLocaleDateString('en-GB', { 
                weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' 
              })} at {new Date(sale.createdAt).toLocaleTimeString('en-GB', { 
                hour: '2-digit', minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Column: Items */}
        <div className="lg:col-span-8">
          <h2 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-6">Purchased Items</h2>
          
          <div className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#E5E4DA] bg-[#F7F5EF]/50">
                    <th className="px-5 py-3 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em]">Product</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-center">Qty</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Unit Price</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E4DA]">
                  {sale.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F5EF]/30 transition-colors">
                      <td className="px-5 py-4 text-[15px] font-bold text-[#202820]">
                        {item.productName}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-block px-2 py-1 bg-[#F7F5EF] text-[#202820] rounded-[6px] text-sm font-bold">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right text-sm text-[#73796F] font-mono tracking-tight">
                        {formatNaira(item.sellingPrice)}
                      </td>
                      <td className="px-5 py-4 text-right text-[15px] font-bold text-[#202820] font-mono tracking-tight">
                        {formatNaira(item.lineTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile items */}
            <div className="md:hidden divide-y divide-[#E5E4DA]">
              {sale.items.map((item, idx) => (
                <div key={idx} className="p-4 flex justify-between items-start">
                  <div>
                    <p className="text-[15px] font-bold text-[#202820] leading-tight mb-1">{item.productName}</p>
                    <p className="text-xs text-[#73796F] uppercase tracking-wider">
                      {item.quantity} × {formatNaira(item.sellingPrice, { showDecimals: false })}
                    </p>
                  </div>
                  <p className="text-[15px] font-bold text-[#202820] font-mono tracking-tight">
                    {formatNaira(item.lineTotal)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals Footer */}
            <div className="bg-[#F7F5EF] p-5 border-t border-[#E5E4DA]">
              <div className="flex justify-between items-center mb-2 text-sm text-[#73796F]">
                <span>Subtotal</span>
                <span className="font-mono tracking-tight">{formatNaira(sale.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#E5E4DA]/50 text-xl font-bold text-[#202820]">
                <span>Total</span>
                <span className="font-mono tracking-tight">{formatNaira(sale.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Column: Summary & Profit */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <h2 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-4">Transaction Details</h2>
            <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs space-y-6">
              
              <div>
                <p className="text-xs text-[#73796F] mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#367A53] shadow-sm"></div>
                  <span className="text-[15px] font-bold text-[#202820] capitalize">{sale.status}</span>
                </div>
              </div>

              <div className="w-full h-px bg-[#E5E4DA]"></div>

              <div>
                <p className="text-xs text-[#73796F] mb-1">Payment Method</p>
                <p className="text-[15px] font-bold text-[#202820] capitalize">
                  {sale.paymentMethod}
                </p>
              </div>

              <div className="w-full h-px bg-[#E5E4DA]"></div>

              <div>
                <p className="text-xs text-[#73796F] mb-1">Items Sold</p>
                <p className="text-[15px] font-bold text-[#202820]">
                  {sale.items.reduce((sum, item) => sum + item.quantity, 0)} units
                </p>
              </div>

            </div>
          </div>

          <div>
            <h2 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-4">Profit Analysis</h2>
            <div className="bg-[#174B3A] border border-[#10372B] rounded-[16px] p-6 shadow-sm">
              <p className="text-xs text-[#D7F36B]/70 mb-1">Gross Profit</p>
              <p className="text-3xl font-bold font-mono tracking-tight text-[#D7F36B] mb-2">
                {formatNaira(grossProfit)}
              </p>
              <p className="text-[10px] text-white/60 leading-relaxed">
                Calculated using the exact cost price at the moment this sale was recorded.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
