import { supabase } from './supabase'
import { getStorageItem } from './storage'
import type { Product, Sale, Expense } from '../types'

// Export data to a JSON file
export async function backupLocalStorage() {
  const inventory = getStorageItem('stocksabi_inventory', [])
  const sales = getStorageItem('stocksabi_sales', [])
  const expenses = getStorageItem('stocksabi_expenses', [])
  
  const backup = {
    inventory,
    sales,
    expenses,
    timestamp: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `stocksabi_backup_${new Date().getTime()}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Get preview counts
export function getMigrationPreview() {
  const inventory = getStorageItem<Product[]>('stocksabi_inventory', [])
  const sales = getStorageItem<Sale[]>('stocksabi_sales', [])
  const expenses = getStorageItem<Expense[]>('stocksabi_expenses', [])
  
  return {
    products: inventory.length,
    sales: sales.length,
    expenses: expenses.length,
  }
}

// Migrate to Supabase
export async function migrateDataToSupabase(businessId: string) {
  if (!businessId) throw new Error("Business ID is required for migration")
  
  const inventory = getStorageItem<Product[]>('stocksabi_inventory', [])
  const sales = getStorageItem<Sale[]>('stocksabi_sales', [])
  const expenses = getStorageItem<Expense[]>('stocksabi_expenses', [])
  
  const results = {
    products: { total: inventory.length, success: 0, failed: 0 },
    sales: { total: sales.length, success: 0, failed: 0 },
    expenses: { total: expenses.length, success: 0, failed: 0 }
  }
  
  const idMap = new Map<string, string>()
  
  // 1. Migrate Products
  for (const prod of inventory) {
    try {
      const { data: existing } = await supabase
        .from('products')
        .select('id, name')
        .eq('business_id', businessId)
        .eq('name', prod.name)
        .maybeSingle()
        
      if (existing) {
        idMap.set(prod.id, existing.id)
        results.products.success++
        continue
      }
      
      const newId = crypto.randomUUID()
      idMap.set(prod.id, newId)
      
      const { error } = await supabase.from('products').insert({
        id: newId,
        business_id: businessId,
        name: prod.name,
        category: prod.category,
        selling_price: prod.sellingPrice || 0,
        cost_price: prod.costPrice || 0,
        stock_quantity: prod.stockQuantity || 0,
        low_stock_threshold: prod.lowStockThreshold || 0,
        image_url: prod.imageUrl || null,
        is_archived: prod.isArchived || false,
        created_at: prod.createdAt || new Date().toISOString(),
        updated_at: prod.updatedAt || new Date().toISOString()
      })
      
      if (error) throw error
      results.products.success++
    } catch (err) {
      console.error("Failed to migrate product", prod, err)
      results.products.failed++
    }
  }
  
  // 2. Migrate Sales
  for (const sale of sales) {
    try {
      const { data: existing } = await supabase
        .from('sales')
        .select('id')
        .eq('business_id', businessId)
        .eq('created_at', sale.createdAt) 
        .maybeSingle()
        
      if (existing) {
        results.sales.success++
        continue
      }
      
      const newSaleId = crypto.randomUUID()
      
      const { error: saleError } = await supabase.from('sales').insert({
        id: newSaleId,
        business_id: businessId,
        subtotal: sale.subtotal || 0,
        total: sale.total || 0,
        payment_method: sale.paymentMethod || 'cash',
        status: sale.status || 'completed',
        created_at: sale.createdAt || new Date().toISOString()
      })
      
      if (saleError) throw saleError
      
      if (sale.items && sale.items.length > 0) {
        const saleItems = sale.items.map(item => ({
          id: crypto.randomUUID(),
          business_id: businessId,
          sale_id: newSaleId,
          product_id: idMap.get(item.productId) || null,
          product_name: item.productName || 'Unknown',
          quantity: item.quantity || 1,
          selling_price: item.sellingPrice || 0,
          cost_price: item.costPrice || 0,
          line_total: item.lineTotal || 0
        }))
        
        const { error: itemsError } = await supabase.from('sale_items').insert(saleItems)
        if (itemsError) throw itemsError
      }
      
      results.sales.success++
    } catch (err) {
      console.error("Failed to migrate sale", sale, err)
      results.sales.failed++
    }
  }
  
  // 3. Migrate Expenses
  for (const exp of expenses) {
    try {
      const { data: existing } = await supabase
        .from('expenses')
        .select('id')
        .eq('business_id', businessId)
        .eq('created_at', exp.createdAt)
        .maybeSingle()
        
      if (existing) {
        results.expenses.success++
        continue
      }
      
      const newId = crypto.randomUUID()
      const { error } = await supabase.from('expenses').insert({
        id: newId,
        business_id: businessId,
        description: exp.description || 'Expense',
        category: exp.category || 'Other',
        amount: exp.amount || 0,
        date: exp.date || new Date().toISOString(),
        created_at: exp.createdAt || new Date().toISOString()
      })
      
      if (error) throw error
      results.expenses.success++
    } catch (err) {
      console.error("Failed to migrate expense", exp, err)
      results.expenses.failed++
    }
  }
  
  return results
}
