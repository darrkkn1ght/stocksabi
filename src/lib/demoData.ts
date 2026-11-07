import type { Product } from '../types/product'
import type { Sale } from '../types/sale'
import type { Expense } from '../types/expense'
import { setStorageItem, removeStorageItem } from './storage'

export const INVENTORY_STORAGE_KEY = 'stocksabi_inventory'
export const SALES_STORAGE_KEY = 'stocksabi_sales'
export const EXPENSES_STORAGE_KEY = 'stocksabi_expenses'
export const BUSINESS_STORAGE_KEY = 'stocksabi_business'
export const SESSION_STORAGE_KEY = 'stocksabi_session'

export function generateDemoData() {
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
      id: 'PRD-001',
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
      id: 'PRD-002',
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
      id: 'PRD-003',
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
      id: 'PRD-004',
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
      id: 'PRD-005',
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
      id: 'PRD-006',
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
      id: 'PRD-007',
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
      id: 'PRD-008',
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
      id: 'PRD-009',
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
      id: 'PRD-010',
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
      id: 'PRD-011',
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
      id: 'PRD-012',
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
      id: 'SL-8492',
      items: [
        { productId: 'PRD-001', productName: 'Peak Milk 400g', quantity: 2, sellingPrice: 3500, costPrice: 2800, lineTotal: 7000 },
        { productId: 'PRD-003', productName: 'Golden Penny Spaghetti', quantity: 5, sellingPrice: 1200, costPrice: 900, lineTotal: 6000 }
      ],
      subtotal: 13000,
      total: 13000,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(0, 1)
    },
    {
      id: 'SL-8491',
      items: [
        { productId: 'PRD-008', productName: 'Nivea Body Lotion 400ml', quantity: 1, sellingPrice: 5500, costPrice: 4200, lineTotal: 5500 },
        { productId: 'PRD-005', productName: 'Dettol Antiseptic 250ml', quantity: 1, sellingPrice: 2500, costPrice: 1800, lineTotal: 2500 }
      ],
      subtotal: 8000,
      total: 8000,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(0, 2)
    },
    // Yesterday
    {
      id: 'SL-8490',
      items: [
        { productId: 'PRD-002', productName: 'Indomie Instant Noodles (Carton)', quantity: 1, sellingPrice: 13500, costPrice: 11500, lineTotal: 13500 },
        { productId: 'PRD-012', productName: 'Coca-Cola 50cl (Pack of 12)', quantity: 2, sellingPrice: 4500, costPrice: 3800, lineTotal: 9000 }
      ],
      subtotal: 22500,
      total: 22500,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(1, 4)
    },
    {
      id: 'SL-8489',
      items: [
        { productId: 'PRD-010', productName: 'Peak Milk Sachet Pack (Roll)', quantity: 3, sellingPrice: 1700, costPrice: 1400, lineTotal: 5100 }
      ],
      subtotal: 5100,
      total: 5100,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(1, 8)
    },
    // 2 days ago
    {
      id: 'SL-8488',
      items: [
        { productId: 'PRD-003', productName: 'Golden Penny Spaghetti', quantity: 10, sellingPrice: 1200, costPrice: 900, lineTotal: 12000 },
        { productId: 'PRD-009', productName: 'Power Oil 1L', quantity: 2, sellingPrice: 2900, costPrice: 2400, lineTotal: 5800 }
      ],
      subtotal: 17800,
      total: 17800,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(2, 3)
    },
    {
      id: 'SL-8487',
      items: [
        { productId: 'PRD-006', productName: 'Closeup Toothpaste 140g', quantity: 2, sellingPrice: 1100, costPrice: 850, lineTotal: 2200 },
        { productId: 'PRD-007', productName: 'Sunlight Detergent 900g', quantity: 1, sellingPrice: 2700, costPrice: 2100, lineTotal: 2700 }
      ],
      subtotal: 4900,
      total: 4900,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(2, 6)
    },
    // 3 days ago
    {
      id: 'SL-8486',
      items: [
        { productId: 'PRD-004', productName: 'Milo 500g', quantity: 4, sellingPrice: 4000, costPrice: 3200, lineTotal: 16000 },
        { productId: 'PRD-001', productName: 'Peak Milk 400g', quantity: 4, sellingPrice: 3500, costPrice: 2800, lineTotal: 14000 }
      ],
      subtotal: 30000,
      total: 30000,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(3, 2)
    },
    {
      id: 'SL-8485',
      items: [
        { productId: 'PRD-011', productName: 'Ariel Detergent 1kg', quantity: 2, sellingPrice: 3200, costPrice: 2600, lineTotal: 6400 }
      ],
      subtotal: 6400,
      total: 6400,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(3, 5)
    },
    // 4 days ago
    {
      id: 'SL-8484',
      items: [
        { productId: 'PRD-002', productName: 'Indomie Instant Noodles (Carton)', quantity: 3, sellingPrice: 13500, costPrice: 11500, lineTotal: 40500 }
      ],
      subtotal: 40500,
      total: 40500,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(4, 1)
    },
    {
      id: 'SL-8483',
      items: [
        { productId: 'PRD-008', productName: 'Nivea Body Lotion 400ml', quantity: 2, sellingPrice: 5500, costPrice: 4200, lineTotal: 11000 },
        { productId: 'PRD-005', productName: 'Dettol Antiseptic 250ml', quantity: 3, sellingPrice: 2500, costPrice: 1800, lineTotal: 7500 }
      ],
      subtotal: 18500,
      total: 18500,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(4, 4)
    },
    // 5 days ago
    {
      id: 'SL-8482',
      items: [
        { productId: 'PRD-003', productName: 'Golden Penny Spaghetti', quantity: 15, sellingPrice: 1200, costPrice: 900, lineTotal: 18000 }
      ],
      subtotal: 18000,
      total: 18000,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(5, 2)
    },
    {
      id: 'SL-8481',
      items: [
        { productId: 'PRD-012', productName: 'Coca-Cola 50cl (Pack of 12)', quantity: 1, sellingPrice: 4500, costPrice: 3800, lineTotal: 4500 }
      ],
      subtotal: 4500,
      total: 4500,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(5, 6)
    },
    // 6 days ago
    {
      id: 'SL-8480',
      items: [
        { productId: 'PRD-001', productName: 'Peak Milk 400g', quantity: 1, sellingPrice: 3500, costPrice: 2800, lineTotal: 3500 },
        { productId: 'PRD-010', productName: 'Peak Milk Sachet Pack (Roll)', quantity: 2, sellingPrice: 1700, costPrice: 1400, lineTotal: 3400 }
      ],
      subtotal: 6900,
      total: 6900,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(6, 3)
    },
    // 7 days ago
    {
      id: 'SL-8479',
      items: [
        { productId: 'PRD-004', productName: 'Milo 500g', quantity: 2, sellingPrice: 4000, costPrice: 3200, lineTotal: 8000 },
        { productId: 'PRD-009', productName: 'Power Oil 1L', quantity: 3, sellingPrice: 2900, costPrice: 2400, lineTotal: 8700 }
      ],
      subtotal: 16700,
      total: 16700,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(7, 2)
    },
    // 9 days ago
    {
      id: 'SL-8478',
      items: [
        { productId: 'PRD-002', productName: 'Indomie Instant Noodles (Carton)', quantity: 2, sellingPrice: 13500, costPrice: 11500, lineTotal: 27000 },
        { productId: 'PRD-003', productName: 'Golden Penny Spaghetti', quantity: 8, sellingPrice: 1200, costPrice: 900, lineTotal: 9600 }
      ],
      subtotal: 36600,
      total: 36600,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(9, 4)
    },
    // 10 days ago
    {
      id: 'SL-8477',
      items: [
        { productId: 'PRD-007', productName: 'Sunlight Detergent 900g', quantity: 2, sellingPrice: 2700, costPrice: 2100, lineTotal: 5400 },
        { productId: 'PRD-011', productName: 'Ariel Detergent 1kg', quantity: 1, sellingPrice: 3200, costPrice: 2600, lineTotal: 3200 }
      ],
      subtotal: 8600,
      total: 8600,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(10, 5)
    },
    // 12 days ago
    {
      id: 'SL-8476',
      items: [
        { productId: 'PRD-008', productName: 'Nivea Body Lotion 400ml', quantity: 3, sellingPrice: 5500, costPrice: 4200, lineTotal: 16500 }
      ],
      subtotal: 16500,
      total: 16500,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(12, 1)
    },
    // 14 days ago
    {
      id: 'SL-8475',
      items: [
        { productId: 'PRD-012', productName: 'Coca-Cola 50cl (Pack of 12)', quantity: 3, sellingPrice: 4500, costPrice: 3800, lineTotal: 13500 },
        { productId: 'PRD-009', productName: 'Power Oil 1L', quantity: 1, sellingPrice: 2900, costPrice: 2400, lineTotal: 2900 }
      ],
      subtotal: 16400,
      total: 16400,
      paymentMethod: 'cash',
      status: 'completed',
      createdAt: daysAgo(14, 2)
    },
    // 15 days ago
    {
      id: 'SL-8474',
      items: [
        { productId: 'PRD-001', productName: 'Peak Milk 400g', quantity: 5, sellingPrice: 3500, costPrice: 2800, lineTotal: 17500 },
        { productId: 'PRD-004', productName: 'Milo 500g', quantity: 2, sellingPrice: 4000, costPrice: 3200, lineTotal: 8000 }
      ],
      subtotal: 25500,
      total: 25500,
      paymentMethod: 'pos',
      status: 'completed',
      createdAt: daysAgo(15, 3)
    },
    // 18 days ago
    {
      id: 'SL-8473',
      items: [
        { productId: 'PRD-002', productName: 'Indomie Instant Noodles (Carton)', quantity: 4, sellingPrice: 13500, costPrice: 11500, lineTotal: 54000 }
      ],
      subtotal: 54000,
      total: 54000,
      paymentMethod: 'transfer',
      status: 'completed',
      createdAt: daysAgo(18, 5)
    },
    // 20 days ago
    {
      id: 'SL-8472',
      items: [
        { productId: 'PRD-005', productName: 'Dettol Antiseptic 250ml', quantity: 4, sellingPrice: 2500, costPrice: 1800, lineTotal: 10000 },
        { productId: 'PRD-006', productName: 'Closeup Toothpaste 140g', quantity: 5, sellingPrice: 1100, costPrice: 850, lineTotal: 5500 }
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
      id: 'EXP-001',
      description: 'Generator fuel (10L)',
      category: 'Electricity',
      amount: 3500,
      date: daysAgo(0, 1),
      createdAt: daysAgo(0, 1)
    },
    {
      id: 'EXP-002',
      description: 'Shop rent (monthly)',
      category: 'Rent',
      amount: 45000,
      date: daysAgo(2),
      createdAt: daysAgo(2)
    },
    {
      id: 'EXP-003',
      description: 'Transport for supplier pickup',
      category: 'Transport',
      amount: 3500,
      date: daysAgo(3),
      createdAt: daysAgo(3)
    },
    {
      id: 'EXP-004',
      description: 'PHCN electricity payment',
      category: 'Electricity',
      amount: 12000,
      date: daysAgo(5),
      createdAt: daysAgo(5)
    },
    {
      id: 'EXP-005',
      description: 'Spectranet internet subscription',
      category: 'Internet',
      amount: 10000,
      date: daysAgo(8),
      createdAt: daysAgo(8)
    },
    {
      id: 'EXP-006',
      description: 'Staff allowance (Cashier)',
      category: 'Staff',
      amount: 25000,
      date: daysAgo(10),
      createdAt: daysAgo(10)
    },
    {
      id: 'EXP-007',
      description: 'Nylon bags and packaging',
      category: 'Supplies',
      amount: 4500,
      date: daysAgo(12),
      createdAt: daysAgo(12)
    },
    {
      id: 'EXP-008',
      description: 'Instagram ad boost',
      category: 'Marketing',
      amount: 5000,
      date: daysAgo(14),
      createdAt: daysAgo(14)
    },
    {
      id: 'EXP-009',
      description: 'Generator fuel',
      category: 'Electricity',
      amount: 8500,
      date: daysAgo(15),
      createdAt: daysAgo(15)
    },
    {
      id: 'EXP-010',
      description: 'Transport for market run',
      category: 'Transport',
      amount: 4000,
      date: daysAgo(18),
      createdAt: daysAgo(18)
    },
    {
      id: 'EXP-011',
      description: 'Shelf repair and nails',
      category: 'Maintenance',
      amount: 3000,
      date: daysAgo(20),
      createdAt: daysAgo(20)
    }
  ]

  return { demoProducts, demoSales, demoExpenses }
}

export function seedLocalDemoData() {
  const { demoProducts, demoSales, demoExpenses } = generateDemoData()
  setStorageItem(INVENTORY_STORAGE_KEY, demoProducts)
  setStorageItem(SALES_STORAGE_KEY, demoSales)
  setStorageItem(EXPENSES_STORAGE_KEY, demoExpenses)
  return { demoProducts, demoSales, demoExpenses }
}

export function loadDemoData() {
  seedLocalDemoData()
  // Reload the window to ensure all states pick up the new local storage data
  window.location.href = '/'
}

export function resetDemoData() {
  removeStorageItem(INVENTORY_STORAGE_KEY)
  removeStorageItem(SALES_STORAGE_KEY)
  removeStorageItem(EXPENSES_STORAGE_KEY)
  
  window.location.href = '/'
}
