import React, { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Search, Plus, Minus, X, CheckCircle2 } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useInventory } from '../../hooks/useInventory'
import { useSales } from '../../hooks/useSales'
import { formatNaira } from '../../lib/currency'
import type { PaymentMethod, SaleItem } from '../../types'

type CartItem = Omit<SaleItem, 'lineTotal'>

export const NewSalePage: React.FC = () => {
  const navigate = useNavigate()
  const { activeProducts } = useInventory()
  const { recordSale } = useSales()

  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  
  const [successSaleId, setSuccessSaleId] = useState<string | null>(null)
  const [successTotal, setSuccessTotal] = useState<number>(0)
  const [successPayment, setSuccessPayment] = useState<PaymentMethod | null>(null)

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return activeProducts
    return activeProducts.filter((p) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [activeProducts, searchQuery])

  const handleAddProduct = (productId: string) => {
    const product = activeProducts.find(p => p.id === productId)
    if (!product || product.stockQuantity <= 0) return

    setCart(prev => {
      const existing = prev.find(item => item.productId === productId)
      if (existing) {
        if (existing.quantity >= product.stockQuantity) return prev
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        sellingPrice: product.sellingPrice,
        costPrice: product.costPrice,
      }]
    })
    setSearchQuery('')
  }

  const updateQuantity = (productId: string, delta: number) => {
    const product = activeProducts.find(p => p.id === productId)
    if (!product) return

    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQ = item.quantity + delta
        if (newQ < 1) return item
        if (newQ > product.stockQuantity) return item
        return { ...item, quantity: newQ }
      }
      return item
    }))
  }

  const removeItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId))
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.sellingPrice), 0)
  
  const handleCompleteSale = () => {
    if (cart.length === 0 || !paymentMethod) return
    try {
      const newSaleId = recordSale(cart, paymentMethod)
      setSuccessSaleId(newSaleId)
      setSuccessTotal(subtotal)
      setSuccessPayment(paymentMethod)
      setCart([])
      setPaymentMethod(null)
    } catch (err: any) {
      alert(err.message || 'Failed to complete sale')
    }
  }

  if (successSaleId) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-[#367A53] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#202820] mb-2 tracking-tight">Sale recorded</h1>
        <p className="text-lg text-[#73796F] mb-12">
          <span className="font-bold text-[#202820]">{formatNaira(successTotal)}</span> received via <span className="capitalize font-bold text-[#202820]">{successPayment}</span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate(`/sales/${successSaleId}`)}
            className="w-full sm:w-auto min-w-[200px]"
          >
            View sale
          </Button>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => {
              setSuccessSaleId(null)
              setSearchQuery('')
            }}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Record another sale
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto pb-24 animate-in fade-in duration-200">
      <div className="mb-4">
        <Link to="/sales" className="text-xs font-bold uppercase tracking-widest text-[#73796F] hover:text-[#174B3A] inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Sales
        </Link>
      </div>

      <div className="pb-6 border-b border-[#E5E4DA] mb-8">
        <h1 className="text-4xl font-serif font-bold text-[#202820] tracking-tight leading-tight">
          Record Sale
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Product Search */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-[#E5E4DA] rounded-[16px] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E5E4DA]">
              <Input
                placeholder="Search products by name or category..."
                leftIcon={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#F7F5EF] border-transparent focus:border-[#174B3A] focus:bg-white"
              />
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2 divide-y divide-[#E5E4DA]/50">
              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center text-[#73796F]">
                  <p className="text-sm font-medium">No active products found.</p>
                </div>
              ) : (
                filteredProducts.map(product => {
                  const inCart = cart.find(c => c.productId === product.id)
                  const isOutOfStock = product.stockQuantity <= 0
                  const isMaxReached = inCart && inCart.quantity >= product.stockQuantity

                  return (
                    <div key={product.id} className={`p-3 flex items-center justify-between rounded-[8px] transition-colors ${isOutOfStock ? 'opacity-50 grayscale' : 'hover:bg-[#F7F5EF]'}`}>
                      <div>
                        <p className="text-sm font-bold text-[#202820]">{product.name}</p>
                        <div className="flex gap-3 text-xs text-[#73796F] mt-0.5">
                          <span>{formatNaira(product.sellingPrice)}</span>
                          <span className="w-px h-3 bg-[#E5E4DA] my-auto"></span>
                          <span className={product.stockQuantity > 0 ? '' : 'text-[#B74C43] font-bold'}>
                            Stock: {product.stockQuantity}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={inCart ? 'secondary' : 'primary'}
                        size="sm"
                        disabled={isOutOfStock || !!isMaxReached}
                        onClick={() => handleAddProduct(product.id)}
                        className={inCart ? 'bg-[#202820] text-white hover:bg-black' : ''}
                      >
                        {isOutOfStock ? 'Out of stock' : inCart ? 'Add more' : 'Select'}
                      </Button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Cart & Checkout */}
        <div className="lg:col-span-5">
          <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 shadow-sm sticky top-6">
            <h2 className="text-[11px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-4">Selected Items</h2>
            
            {cart.length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed border-[#E5E4DA] rounded-[12px] bg-white/50">
                <p className="text-sm text-[#73796F] font-medium">No items selected yet</p>
                <p className="text-xs text-[#A4A9A0] mt-1">Search and select products to begin.</p>
              </div>
            ) : (
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cart.map(item => {
                  const product = activeProducts.find(p => p.id === item.productId)
                  const maxStock = product?.stockQuantity || 0
                  
                  return (
                    <div key={item.productId} className="bg-white p-3 rounded-[12px] border border-[#E5E4DA] shadow-xs">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-bold text-[#202820] leading-tight pr-4">{item.productName}</p>
                        <button onClick={() => removeItem(item.productId)} className="text-[#A4A9A0] hover:text-[#B74C43] transition-colors p-1">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 bg-[#F7F5EF] border border-[#E5E4DA] rounded-[8px] p-1">
                          <button 
                            disabled={item.quantity <= 1}
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-[6px] hover:bg-white disabled:opacity-30 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button 
                            disabled={item.quantity >= maxStock}
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-[6px] hover:bg-white disabled:opacity-30 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#73796F] uppercase tracking-wider mb-0.5">{item.quantity} × {formatNaira(item.sellingPrice, { showDecimals: false })}</p>
                          <p className="text-sm font-bold text-[#202820] font-mono tracking-tight">
                            {formatNaira(item.quantity * item.sellingPrice)}
                          </p>
                        </div>
                      </div>
                      
                      {item.quantity >= maxStock && (
                        <p className="text-[10px] text-[#B77826] font-medium mt-2 text-right">
                          Only {maxStock} units available.
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <div className="border-t border-[#E5E4DA] pt-4 mb-6">
              <div className="flex justify-between items-center mb-1 text-sm text-[#73796F]">
                <span>Subtotal</span>
                <span className="font-mono tracking-tight">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-[#202820]">
                <span>Total</span>
                <span className="font-mono tracking-tight text-2xl">{formatNaira(subtotal)}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-[10px] font-bold text-[#73796F] uppercase tracking-[0.15em] mb-3">Payment Method</h2>
              <div className="grid grid-cols-3 gap-2">
                {(['cash', 'transfer', 'pos'] as const).map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-3 px-2 rounded-[10px] text-sm font-bold capitalize transition-all border ${
                      paymentMethod === method 
                        ? 'bg-[#174B3A] text-[#D7F36B] border-[#174B3A] shadow-md transform scale-[1.02]' 
                        : 'bg-white border-[#E5E4DA] text-[#73796F] hover:border-[#174B3A]/30 hover:text-[#202820]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full text-base h-14 shadow-md"
              disabled={cart.length === 0 || !paymentMethod}
              onClick={handleCompleteSale}
            >
              Complete Sale
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
