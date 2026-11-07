import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from './supabase'
import { useAuth } from './AuthContext'
import { getStorageItem, setStorageItem } from './storage'
import {
  INVENTORY_STORAGE_KEY,
  SALES_STORAGE_KEY,
  EXPENSES_STORAGE_KEY,
  seedLocalDemoData,
} from './demoData'
import type { Product, Sale, Expense } from '../types'

interface DataContextType {
  products: Product[]
  sales: Sale[]
  expenses: Expense[]
  isLoading: boolean
  error: string | null
  
  refreshData: () => Promise<void>
  
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>) => Promise<string>
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>
  
  addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => Promise<string>
  updateSaleStatus: (id: string, status: 'completed' | 'cancelled') => Promise<void>
  
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<string>
  updateExpense: (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

function loadFromLocalStorage() {
  const localProducts = getStorageItem<Product[]>(INVENTORY_STORAGE_KEY, [])
  const localSales = getStorageItem<Sale[]>(SALES_STORAGE_KEY, [])
  const localExpenses = getStorageItem<Expense[]>(EXPENSES_STORAGE_KEY, [])

  const sortedSales = [...localSales].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  const sortedExpenses = [...localExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return {
    products: localProducts,
    sales: sortedSales,
    expenses: sortedExpenses,
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { business, isLocalMode } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [sales, setSales] = useState<Sale[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!business) {
      setProducts([])
      setSales([])
      setExpenses([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    if (isLocalMode) {
      let local = loadFromLocalStorage()
      const isDemoStore =
        business.id === 'local-biz-1' ||
        business.name.toLowerCase().includes('tunde') ||
        business.name.toLowerCase().includes('built-in') ||
        business.name.toLowerCase().includes('stocksabi')
      if (
        isDemoStore &&
        local.products.length === 0 &&
        local.sales.length === 0 &&
        local.expenses.length === 0
      ) {
        seedLocalDemoData()
        local = loadFromLocalStorage()
      }
      setProducts(local.products)
      setSales(local.sales)
      setExpenses(local.expenses)
      setIsLoading(false)
      return
    }
    
    try {
      const [productsRes, salesRes, expensesRes, itemsRes] = await Promise.all([
        supabase.from('products').select('*').eq('business_id', business.id),
        supabase.from('sales').select('*').eq('business_id', business.id).order('created_at', { ascending: false }),
        supabase.from('expenses').select('*').eq('business_id', business.id).order('date', { ascending: false }),
        supabase.from('sale_items').select('*').eq('business_id', business.id)
      ])
      
      if (productsRes.error) throw productsRes.error
      if (salesRes.error) throw salesRes.error
      if (expensesRes.error) throw expensesRes.error
      if (itemsRes.error) throw itemsRes.error

      const mappedProducts: Product[] = productsRes.data.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        sellingPrice: Number(p.selling_price),
        costPrice: Number(p.cost_price),
        stockQuantity: p.stock_quantity,
        lowStockThreshold: p.low_stock_threshold,
        imageUrl: p.image_url,
        isArchived: p.is_archived,
        createdAt: p.created_at,
        updatedAt: p.updated_at
      }))

      const mappedSales: Sale[] = salesRes.data.map(s => {
        const items = itemsRes.data.filter(i => i.sale_id === s.id).map(i => ({
          productId: i.product_id,
          productName: i.product_name,
          quantity: i.quantity,
          sellingPrice: Number(i.selling_price),
          costPrice: Number(i.cost_price),
          lineTotal: Number(i.line_total)
        }))
        return {
          id: s.id,
          subtotal: Number(s.subtotal),
          total: Number(s.total),
          paymentMethod: s.payment_method as any,
          status: s.status as any,
          createdAt: s.created_at,
          items
        }
      })

      const mappedExpenses: Expense[] = expensesRes.data.map(e => ({
        id: e.id,
        description: e.description,
        category: e.category,
        amount: Number(e.amount),
        date: e.date,
        createdAt: e.created_at
      }))

      // If the built-in demo admin account has 0 records in Supabase, fall back to rich local demo data
      const isBuiltInOrDemoAccount =
        business.name.toLowerCase().includes('built-in') ||
        business.name.toLowerCase().includes('tunde') ||
        business.name.toLowerCase().includes('stocksabi')

      if (
        mappedProducts.length === 0 &&
        mappedSales.length === 0 &&
        mappedExpenses.length === 0 &&
        (isBuiltInOrDemoAccount || getStorageItem<Product[]>(INVENTORY_STORAGE_KEY, []).length > 0)
      ) {
        let local = loadFromLocalStorage()
        if (local.products.length === 0 && local.sales.length === 0 && local.expenses.length === 0) {
          seedLocalDemoData()
          local = loadFromLocalStorage()
        }
        setProducts(local.products)
        setSales(local.sales)
        setExpenses(local.expenses)
        setIsLoading(false)
        return
      }

      // Mirror cloud data into localStorage for resilience
      setStorageItem(INVENTORY_STORAGE_KEY, mappedProducts)
      setStorageItem(SALES_STORAGE_KEY, mappedSales)
      setStorageItem(EXPENSES_STORAGE_KEY, mappedExpenses)

      setProducts(mappedProducts)
      setSales(mappedSales)
      setExpenses(mappedExpenses)
    } catch (err: any) {
      console.warn('Cloud fetch failed, falling back to local storage:', err)
      const local = loadFromLocalStorage()
      setProducts(local.products)
      setSales(local.sales)
      setExpenses(local.expenses)
    } finally {
      setIsLoading(false)
    }
  }, [business, isLocalMode])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>) => {
    if (!business) throw new Error("No active business")
    const newId = `PRD-${String(products.length + 1).padStart(3, '0')}-${Math.floor(100 + Math.random() * 900)}`
    const now = new Date().toISOString()
    const newProduct: Product = { ...product, id: newId, isArchived: false, createdAt: now, updatedAt: now }

    if (!isLocalMode) {
      try {
        const dbId = crypto.randomUUID()
        const { error } = await supabase.from('products').insert({
          id: dbId,
          business_id: business.id,
          name: product.name,
          category: product.category,
          selling_price: product.sellingPrice,
          cost_price: product.costPrice,
          stock_quantity: product.stockQuantity,
          low_stock_threshold: product.lowStockThreshold,
          image_url: product.imageUrl,
          is_archived: false,
          created_at: now,
          updated_at: now
        })
        if (!error) {
          newProduct.id = dbId
        }
      } catch (err) {
        console.warn('Saving product locally:', err)
      }
    }

    setProducts(prev => {
      const next = [...prev, newProduct]
      setStorageItem(INVENTORY_STORAGE_KEY, next)
      return next
    })
    return newProduct.id
  }

  const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => {
    if (!business) throw new Error("No active business")
    const now = new Date().toISOString()

    if (!isLocalMode) {
      try {
        const dbUpdates: any = { updated_at: now }
        if (updates.name !== undefined) dbUpdates.name = updates.name
        if (updates.category !== undefined) dbUpdates.category = updates.category
        if (updates.sellingPrice !== undefined) dbUpdates.selling_price = updates.sellingPrice
        if (updates.costPrice !== undefined) dbUpdates.cost_price = updates.costPrice
        if (updates.stockQuantity !== undefined) dbUpdates.stock_quantity = updates.stockQuantity
        if (updates.lowStockThreshold !== undefined) dbUpdates.low_stock_threshold = updates.lowStockThreshold
        if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl
        if (updates.isArchived !== undefined) dbUpdates.is_archived = updates.isArchived

        await supabase.from('products').update(dbUpdates).eq('id', id).eq('business_id', business.id)
      } catch (err) {
        console.warn('Updating product locally:', err)
      }
    }

    setProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: now } : p)
      setStorageItem(INVENTORY_STORAGE_KEY, next)
      return next
    })
  }

  const addSale = async (sale: Omit<Sale, 'id' | 'createdAt'>) => {
    if (!business) throw new Error("No active business")
    const newSaleId = `SL-${Math.floor(1000 + Math.random() * 9000)}`
    const now = new Date().toISOString()
    let finalSaleId = newSaleId

    if (!isLocalMode) {
      try {
        const dbSaleId = crypto.randomUUID()
        const { error: saleError } = await supabase.from('sales').insert({
          id: dbSaleId,
          business_id: business.id,
          subtotal: sale.subtotal,
          total: sale.total,
          payment_method: sale.paymentMethod,
          status: sale.status,
          created_at: now
        })

        if (!saleError) {
          finalSaleId = dbSaleId
          if (sale.items.length > 0) {
            const items = sale.items.map(item => ({
              id: crypto.randomUUID(),
              business_id: business.id,
              sale_id: dbSaleId,
              product_id: item.productId,
              product_name: item.productName,
              quantity: item.quantity,
              selling_price: item.sellingPrice,
              cost_price: item.costPrice,
              line_total: item.lineTotal
            }))
            await supabase.from('sale_items').insert(items)
          }

          // Decrement product stock in Supabase
          for (const item of sale.items) {
            const prod = products.find(p => p.id === item.productId)
            if (prod) {
              const newQty = Math.max(0, prod.stockQuantity - item.quantity)
              await supabase
                .from('products')
                .update({ stock_quantity: newQty, updated_at: now })
                .eq('id', item.productId)
                .eq('business_id', business.id)
            }
          }
        }
      } catch (err) {
        console.warn('Saving sale locally:', err)
      }
    }

    // Atomically update local state & localStorage for both sales and product stock quantities
    const newSale: Sale = {
      ...sale,
      id: finalSaleId,
      createdAt: now,
    }

    setProducts(prev => {
      const next = prev.map(p => {
        const soldItem = sale.items.find(i => i.productId === p.id)
        if (!soldItem) return p
        return {
          ...p,
          stockQuantity: Math.max(0, p.stockQuantity - soldItem.quantity),
          updatedAt: now,
        }
      })
      setStorageItem(INVENTORY_STORAGE_KEY, next)
      return next
    })

    setSales(prev => {
      const next = [newSale, ...prev]
      setStorageItem(SALES_STORAGE_KEY, next)
      return next
    })

    return finalSaleId
  }

  const updateSaleStatus = async (id: string, status: 'completed' | 'cancelled') => {
    if (!business) throw new Error("No active business")
    if (!isLocalMode) {
      try {
        await supabase.from('sales').update({ status }).eq('id', id).eq('business_id', business.id)
      } catch (err) {
        console.warn('Updating sale status locally:', err)
      }
    }
    setSales(prev => {
      const next = prev.map(s => s.id === id ? { ...s, status } : s)
      setStorageItem(SALES_STORAGE_KEY, next)
      return next
    })
  }

  const addExpense = async (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    if (!business) throw new Error("No active business")
    const newId = `EXP-${Math.floor(1000 + Math.random() * 9000)}`
    const now = new Date().toISOString()
    let finalId = newId

    if (!isLocalMode) {
      try {
        const dbId = crypto.randomUUID()
        const { error } = await supabase.from('expenses').insert({
          id: dbId,
          business_id: business.id,
          description: expense.description,
          category: expense.category,
          amount: expense.amount,
          date: expense.date,
          created_at: now
        })
        if (!error) {
          finalId = dbId
        }
      } catch (err) {
        console.warn('Saving expense locally:', err)
      }
    }

    const newExpense: Expense = { ...expense, id: finalId, createdAt: now }
    setExpenses(prev => {
      const next = [newExpense, ...prev].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      setStorageItem(EXPENSES_STORAGE_KEY, next)
      return next
    })
    return finalId
  }

  const updateExpense = async (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>) => {
    if (!business) throw new Error("No active business")

    if (!isLocalMode) {
      try {
        const dbUpdates: any = {}
        if (updates.description !== undefined) dbUpdates.description = updates.description
        if (updates.category !== undefined) dbUpdates.category = updates.category
        if (updates.amount !== undefined) dbUpdates.amount = updates.amount
        if (updates.date !== undefined) dbUpdates.date = updates.date

        await supabase.from('expenses').update(dbUpdates).eq('id', id).eq('business_id', business.id)
      } catch (err) {
        console.warn('Updating expense locally:', err)
      }
    }

    setExpenses(prev => {
      const next = prev.map(e => e.id === id ? { ...e, ...updates } : e)
      setStorageItem(EXPENSES_STORAGE_KEY, next)
      return next
    })
  }

  const deleteExpense = async (id: string) => {
    if (!business) throw new Error("No active business")
    if (!isLocalMode) {
      try {
        await supabase.from('expenses').delete().eq('id', id).eq('business_id', business.id)
      } catch (err) {
        console.warn('Deleting expense locally:', err)
      }
    }
    setExpenses(prev => {
      const next = prev.filter(e => e.id !== id)
      setStorageItem(EXPENSES_STORAGE_KEY, next)
      return next
    })
  }

  return (
    <DataContext.Provider
      value={{
        products,
        sales,
        expenses,
        isLoading,
        error,
        refreshData: fetchData,
        addProduct,
        updateProduct,
        addSale,
        updateSaleStatus,
        addExpense,
        updateExpense,
        deleteExpense
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
