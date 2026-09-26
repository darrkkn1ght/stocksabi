export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export interface Product {
  id: string
  name: string
  category: string
  sellingPrice: number
  costPrice: number
  stockQuantity: number
  lowStockThreshold: number
  imageUrl?: string
  isArchived: boolean
  createdAt: string
  updatedAt: string
}
