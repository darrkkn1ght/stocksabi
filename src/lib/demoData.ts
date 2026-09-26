import type { Product } from '../types/product'
import type { Sale } from '../types/sale'
import type { Expense } from '../types/expense'
import { setStorageItem, removeStorageItem } from './storage'

const INVENTORY_STORAGE_KEY = 'stocksabi_inventory'
const SALES_STORAGE_KEY = 'stocksabi_sales'
const EXPENSES_STORAGE_KEY = 'stocksabi_expenses'

export function loadDemoData() {
  const now = new Date()
  
  // Helper to generate a date relative to now
  const daysAgo = (days: number, hours: number = 0) => {
    const d = new Date(now)
    d.setDate(d.getDate() - days)
    d.setHours(d.getHours() - hours)
    return d.toISOString()
  }

  // 1. PRODUCTS
  const demoProducts: Product[] = [
    {
      id: 'demo-prod-1',
      name: 'Peak Milk 400g',
      category: 'Groceries',
      costPrice: 2800,
      sellingPrice: 3500,
      stockQuantity: 45, // Healthy
      lowStockThreshold: 10,
      isArchived: false,
      createdAt: daysAgo(30),
      updatedAt: daysAgo(2)
    },
    {
      id: 'demo-prod-2',
      name: 'Indomie Instant Noodles (Carton)',
      category: 'Groceries',
      costPrice: 11500,
      sellingPrice: 13500,
      stockQuantity: 8, // Low stock
      lowStockThreshold: 10,
      isArchived: false,
      createdAt: daysAgo(30),
      updatedAt: daysAgo(1)
    },
    {
      id: 'demo-prod-3',
      name: 'Golden Penny Spaghetti',
      category: 'Groceries',
      costPrice: 900,
      sellingPrice: 1200,
      stockQuantity: 60, // Healthy
      lowStockThreshold: 15,
      isArchived: false,
      createdAt: daysAgo(25),
      updatedAt: daysAgo(5)
    },
    {
      id: 'demo-prod-4',
      name: 'Milo 500g',
      category: 'Groceries',
      costPrice: 3200,
      sellingPrice: 4000,
      stockQuantity: 0, // Out of stock
      lowStockThreshold: 5,
      isArchived: false,
      createdAt: daysAgo(28),
      updatedAt: daysAgo(1)
    },
    {
      id: 'demo-prod-5',
      name: 'Dettol Antiseptic 250ml',
      category: 'Health & Beauty',
      costPrice: 1800,
      sellingPrice: 2500,
      stockQuantity: 22, // Healthy
      lowStockThreshold: 5,
      isArchived: false,
      createdAt: daysAgo(20),
      updatedAt: daysAgo(10)
    },
    {
      id: 'demo-prod-6',
      name: 'Closeup Toothpaste 140g',
      category: 'Health & Beauty',
      costPrice: 850,
      sellingPrice: 1100,
      stockQuantity: 4, // Low stock
      lowStockThreshold: 10,
      isArchived: false,
      createdAt: daysAgo(20),
      updatedAt: daysAgo(2)
    },
    {
      id: 'demo-prod-7',
      name: 'Sunlight Detergent 900g',
      category: 'Household',
      costPrice: 2100,
      sellingPrice: 2700,
      stockQuantity: 18, // Healthy
      lowStockThreshold: 5,
      isArchived: false,
      createdAt: daysAgo(15),
      updatedAt: daysAgo(3)
    },
    {
      id: 'demo-prod-8',
      name: 'Nivea Body Lotion 400ml',
      category: 'Health & Beauty',
      costPrice: 4200,
      sellingPrice: 5500, // Strong margin
      stockQuantity: 12, // Healthy
      lowStockThreshold: 5,
      isArchived: false,
      createdAt: daysAgo(18),
      updatedAt: daysAgo(4)
    },
    {
      id: 'demo-prod-9',
      name: 'Power Oil 1L',
      category: 'Groceries',
      costPrice: 2400,
      sellingPrice: 2900,
      stockQuantity: 30, // Healthy
      lowStockThreshold: 8,
      isArchived: false,
      createdAt: daysAgo(12),
      updatedAt: daysAgo(2)
    },
    {
      id: 'demo-prod-10',
      name: 'Peak Milk Sachet Pack (Roll)',
      category: 'Groceries',
      costPrice: 1400,
      sellingPrice: 1700,
      stockQuantity: 5, // Low stock
      lowStockThreshold: 10,
      isArchived: false,
      createdAt: daysAgo(10),
      updatedAt: daysAgo(1)
    },
    {
      id: 'demo-prod-11',
      name: 'Ariel Detergent 1kg',
      category: 'Household',
      costPrice: 2600,
      sellingPrice: 3200,
      stockQuantity: 25, // Healthy
      lowStockThreshold: 6,
      isArchived: false,
      createdAt: daysAgo(8),
      updatedAt: daysAgo(2)
    },
    {
      id: 'demo-prod-12',
      name: 'Coca-Cola 50cl (Pack of 12)',
      category: 'Drinks',
      costPrice: 3800,
      sellingPrice: 4500,
      stockQuantity: 15, // Healthy
      lowStockThreshold: 5,
      isArchived: false,
      createdAt: daysAgo(22),
      updatedAt: daysAgo(5)
    }
  ]

  // 2. SALES
  const demoSales: Sale[] = [
    // Today
    {
      id: 'demo-sale-1',
      items: [
        { productId: 'demo-prod-1', productName: 'Peak Milk 400g', quantity: 2, sellingPrice: 3500, costPrice: 2800, lineTotal: 7000 },
        { productId: 'demo-prod-3', productName: 'Golden Penny Spaghetti', quantity: 5, sellingPrice: 1200, costPrice: 900, lineTotal: 6000 }
      ],
      subtotal: 13000,
      total: 13000,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(0, 2)
    },
    {
      id: 'demo-sale-2',
      items: [
        { productId: 'demo-prod-8', productName: 'Nivea Body Lotion 400ml', quantity: 1, sellingPrice: 5500, costPrice: 4200, lineTotal: 5500 },
        { productId: 'demo-prod-5', productName: 'Dettol Antiseptic 250ml', quantity: 1, sellingPrice: 2500, costPrice: 1800, lineTotal: 2500 }
      ],
      subtotal: 8000,
      total: 8000,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(0, 5)
    },
    // Yesterday
    {
      id: 'demo-sale-3',
      items: [
        { productId: 'demo-prod-2', productName: 'Indomie Instant Noodles (Carton)', quantity: 1, sellingPrice: 13500, costPrice: 11500, lineTotal: 13500 },
        { productId: 'demo-prod-12', productName: 'Coca-Cola 50cl (Pack of 12)', quantity: 2, sellingPrice: 4500, costPrice: 3800, lineTotal: 9000 }
      ],
      subtotal: 22500,
      total: 22500,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(1, 4)
    },
    {
      id: 'demo-sale-4',
      items: [
        { productId: 'demo-prod-10', productName: 'Peak Milk Sachet Pack (Roll)', quantity: 3, sellingPrice: 1700, costPrice: 1400, lineTotal: 5100 }
      ],
      subtotal: 5100,
      total: 5100,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(1, 8)
    },
    // 2 days ago
    {
      id: 'demo-sale-5',
      items: [
        { productId: 'demo-prod-3', productName: 'Golden Penny Spaghetti', quantity: 10, sellingPrice: 1200, costPrice: 900, lineTotal: 12000 },
        { productId: 'demo-prod-9', productName: 'Power Oil 1L', quantity: 2, sellingPrice: 2900, costPrice: 2400, lineTotal: 5800 }
      ],
      subtotal: 17800,
      total: 17800,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(2, 3)
    },
    {
      id: 'demo-sale-6',
      items: [
        { productId: 'demo-prod-6', productName: 'Closeup Toothpaste 140g', quantity: 2, sellingPrice: 1100, costPrice: 850, lineTotal: 2200 },
        { productId: 'demo-prod-7', productName: 'Sunlight Detergent 900g', quantity: 1, sellingPrice: 2700, costPrice: 2100, lineTotal: 2700 }
      ],
      subtotal: 4900,
      total: 4900,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(2, 6)
    },
    // 3 days ago
    {
      id: 'demo-sale-7',
      items: [
        { productId: 'demo-prod-4', productName: 'Milo 500g', quantity: 4, sellingPrice: 4000, costPrice: 3200, lineTotal: 16000 },
        { productId: 'demo-prod-1', productName: 'Peak Milk 400g', quantity: 4, sellingPrice: 3500, costPrice: 2800, lineTotal: 14000 }
      ],
      subtotal: 30000,
      total: 30000,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(3, 2)
    },
    {
      id: 'demo-sale-8',
      items: [
        { productId: 'demo-prod-11', productName: 'Ariel Detergent 1kg', quantity: 2, sellingPrice: 3200, costPrice: 2600, lineTotal: 6400 }
      ],
      subtotal: 6400,
      total: 6400,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(3, 5)
    },
    // 4 days ago
    {
      id: 'demo-sale-9',
      items: [
        { productId: 'demo-prod-2', productName: 'Indomie Instant Noodles (Carton)', quantity: 3, sellingPrice: 13500, costPrice: 11500, lineTotal: 40500 }
      ],
      subtotal: 40500,
      total: 40500,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(4, 1)
    },
    {
      id: 'demo-sale-10',
      items: [
        { productId: 'demo-prod-8', productName: 'Nivea Body Lotion 400ml', quantity: 2, sellingPrice: 5500, costPrice: 4200, lineTotal: 11000 },
        { productId: 'demo-prod-5', productName: 'Dettol Antiseptic 250ml', quantity: 3, sellingPrice: 2500, costPrice: 1800, lineTotal: 7500 }
      ],
      subtotal: 18500,
      total: 18500,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(4, 4)
    },
    // 5 days ago
    {
      id: 'demo-sale-11',
      items: [
        { productId: 'demo-prod-3', productName: 'Golden Penny Spaghetti', quantity: 15, sellingPrice: 1200, costPrice: 900, lineTotal: 18000 }
      ],
      subtotal: 18000,
      total: 18000,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(5, 2)
    },
    {
      id: 'demo-sale-12',
      items: [
        { productId: 'demo-prod-12', productName: 'Coca-Cola 50cl (Pack of 12)', quantity: 1, sellingPrice: 4500, costPrice: 3800, lineTotal: 4500 }
      ],
      subtotal: 4500,
      total: 4500,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(5, 6)
    },
    // 6 days ago
    {
      id: 'demo-sale-13',
      items: [
        { productId: 'demo-prod-1', productName: 'Peak Milk 400g', quantity: 1, sellingPrice: 3500, costPrice: 2800, lineTotal: 3500 },
        { productId: 'demo-prod-10', productName: 'Peak Milk Sachet Pack (Roll)', quantity: 2, sellingPrice: 1700, costPrice: 1400, lineTotal: 3400 }
      ],
      subtotal: 6900,
      total: 6900,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(6, 3)
    },
    // 7 days ago
    {
      id: 'demo-sale-14',
      items: [
        { productId: 'demo-prod-4', productName: 'Milo 500g', quantity: 2, sellingPrice: 4000, costPrice: 3200, lineTotal: 8000 },
        { productId: 'demo-prod-9', productName: 'Power Oil 1L', quantity: 3, sellingPrice: 2900, costPrice: 2400, lineTotal: 8700 }
      ],
      subtotal: 16700,
      total: 16700,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(7, 2)
    },
    // 9 days ago
    {
      id: 'demo-sale-15',
      items: [
        { productId: 'demo-prod-2', productName: 'Indomie Instant Noodles (Carton)', quantity: 2, sellingPrice: 13500, costPrice: 11500, lineTotal: 27000 },
        { productId: 'demo-prod-3', productName: 'Golden Penny Spaghetti', quantity: 8, sellingPrice: 1200, costPrice: 900, lineTotal: 9600 }
      ],
      subtotal: 36600,
      total: 36600,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(9, 4)
    },
    // 10 days ago
    {
      id: 'demo-sale-16',
      items: [
        { productId: 'demo-prod-7', productName: 'Sunlight Detergent 900g', quantity: 2, sellingPrice: 2700, costPrice: 2100, lineTotal: 5400 },
        { productId: 'demo-prod-11', productName: 'Ariel Detergent 1kg', quantity: 1, sellingPrice: 3200, costPrice: 2600, lineTotal: 3200 }
      ],
      subtotal: 8600,
      total: 8600,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(10, 5)
    },
    // 12 days ago
    {
      id: 'demo-sale-17',
      items: [
        { productId: 'demo-prod-8', productName: 'Nivea Body Lotion 400ml', quantity: 3, sellingPrice: 5500, costPrice: 4200, lineTotal: 16500 }
      ],
      subtotal: 16500,
      total: 16500,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(12, 1)
    },
    // 14 days ago
    {
      id: 'demo-sale-18',
      items: [
        { productId: 'demo-prod-12', productName: 'Coca-Cola 50cl (Pack of 12)', quantity: 3, sellingPrice: 4500, costPrice: 3800, lineTotal: 13500 },
        { productId: 'demo-prod-9', productName: 'Power Oil 1L', quantity: 1, sellingPrice: 2900, costPrice: 2400, lineTotal: 2900 }
      ],
      subtotal: 16400,
      total: 16400,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(14, 2)
    },
    // 15 days ago
    {
      id: 'demo-sale-19',
      items: [
        { productId: 'demo-prod-1', productName: 'Peak Milk 400g', quantity: 5, sellingPrice: 3500, costPrice: 2800, lineTotal: 17500 },
        { productId: 'demo-prod-4', productName: 'Milo 500g', quantity: 2, sellingPrice: 4000, costPrice: 3200, lineTotal: 8000 }
      ],
      subtotal: 25500,
      total: 25500,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(15, 3)
    },
    // 18 days ago
    {
      id: 'demo-sale-20',
      items: [
        { productId: 'demo-prod-2', productName: 'Indomie Instant Noodles (Carton)', quantity: 4, sellingPrice: 13500, costPrice: 11500, lineTotal: 54000 }
      ],
      subtotal: 54000,
      total: 54000,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(18, 5)
    },
    // 20 days ago
    {
      id: 'demo-sale-21',
      items: [
        { productId: 'demo-prod-5', productName: 'Dettol Antiseptic 250ml', quantity: 4, sellingPrice: 2500, costPrice: 1800, lineTotal: 10000 },
        { productId: 'demo-prod-6', productName: 'Closeup Toothpaste 140g', quantity: 5, sellingPrice: 1100, costPrice: 850, lineTotal: 5500 }
      ],
      subtotal: 15500,
      total: 15500,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(20, 2)
    }
  ]

  // 3. EXPENSES
  const demoExpenses: Expense[] = [
    {
      id: 'demo-exp-1',
      description: 'Shop rent (monthly)',
      category: 'Rent',
      amount: 45000,
      date: daysAgo(2),
      createdAt: daysAgo(2)
    },
    {
      id: 'demo-exp-2',
      description: 'Transport for supplier pickup',
      category: 'Transport',
      amount: 3500,
      date: daysAgo(3),
      createdAt: daysAgo(3)
    },
    {
      id: 'demo-exp-3',
      description: 'PHCN electricity payment',
      category: 'Electricity',
      amount: 12000,
      date: daysAgo(5),
      createdAt: daysAgo(5)
    },
    {
      id: 'demo-exp-4',
      description: 'Spectranet internet subscription',
      category: 'Internet',
      amount: 10000,
      date: daysAgo(8),
      createdAt: daysAgo(8)
    },
    {
      id: 'demo-exp-5',
      description: 'Staff allowance (Cashier)',
      category: 'Staff',
      amount: 25000,
      date: daysAgo(10),
      createdAt: daysAgo(10)
    },
    {
      id: 'demo-exp-6',
      description: 'Nylon bags and packaging',
      category: 'Supplies',
      amount: 4500,
      date: daysAgo(12),
      createdAt: daysAgo(12)
    },
    {
      id: 'demo-exp-7',
      description: 'Instagram ad boost',
      category: 'Marketing',
      amount: 5000,
      date: daysAgo(14),
      createdAt: daysAgo(14)
    },
    {
      id: 'demo-exp-8',
      description: 'Generator fuel',
      category: 'Electricity',
      amount: 8500,
      date: daysAgo(15),
      createdAt: daysAgo(15)
    },
    {
      id: 'demo-exp-9',
      description: 'Transport for market run',
      category: 'Transport',
      amount: 4000,
      date: daysAgo(18),
      createdAt: daysAgo(18)
    },
    {
      id: 'demo-exp-10',
      description: 'Shelf repair and nails',
      category: 'Maintenance',
      amount: 3000,
      date: daysAgo(20),
      createdAt: daysAgo(20)
    }
  ]

  // Clear existing and set new demo data
  setStorageItem(INVENTORY_STORAGE_KEY, demoProducts)
  setStorageItem(SALES_STORAGE_KEY, demoSales)
  setStorageItem(EXPENSES_STORAGE_KEY, demoExpenses)
  
  // Reload the window to ensure all states pick up the new local storage data
  window.location.href = '/'
}

export function resetDemoData() {
  removeStorageItem(INVENTORY_STORAGE_KEY)
  removeStorageItem(SALES_STORAGE_KEY)
  removeStorageItem(EXPENSES_STORAGE_KEY)
  
  window.location.href = '/'
}
