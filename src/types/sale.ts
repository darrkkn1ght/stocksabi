export type PaymentMethod = 'cash' | 'transfer' | 'pos'

export interface SaleItem {
  productId: string
  productName: string
  quantity: number
  sellingPrice: number
  costPrice: number
  lineTotal: number
}

export interface Sale {
  id: string
  items: SaleItem[]
  subtotal: number
  total: number
  paymentMethod: PaymentMethod
  status: 'completed' | 'cancelled'
  createdAt: string
}
