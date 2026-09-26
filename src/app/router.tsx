import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { SalesPage } from '../features/sales/SalesPage'
import { NewSalePage } from '../features/sales/NewSalePage'
import { SaleDetailsPage } from '../features/sales/SaleDetailsPage'
import { InventoryPage } from '../features/inventory/InventoryPage'
import { NewProductPage } from '../features/inventory/NewProductPage'
import { ProductDetailsPage } from '../features/inventory/ProductDetailsPage'
import { EditProductPage } from '../features/inventory/EditProductPage'
import { ExpensesPage } from '../features/expenses/ExpensesPage'
import { NewExpensePage } from '../features/expenses/NewExpensePage'
import { ExpenseDetailsPage } from '../features/expenses/ExpenseDetailsPage'
import { EditExpensePage } from '../features/expenses/EditExpensePage'
import { InsightsPage } from '../features/insights/InsightsPage'
import { SettingsPage } from '../features/settings/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'sales',
        children: [
          {
            index: true,
            element: <SalesPage />,
          },
          {
            path: 'new',
            element: <NewSalePage />,
          },
          {
            path: ':id',
            element: <SaleDetailsPage />,
          }
        ]
      },
      {
        path: 'inventory',
        children: [
          {
            index: true,
            element: <InventoryPage />,
          },
          {
            path: 'new',
            element: <NewProductPage />,
          },
          {
            path: ':id',
            element: <ProductDetailsPage />,
          },
          {
            path: ':id/edit',
            element: <EditProductPage />,
          },
        ]
      },
      {
        path: 'expenses',
        children: [
          {
            index: true,
            element: <ExpensesPage />,
          },
          {
            path: 'new',
            element: <NewExpensePage />,
          },
          {
            path: ':id',
            element: <ExpenseDetailsPage />,
          },
          {
            path: ':id/edit',
            element: <EditExpensePage />,
          }
        ]
      },
      {
        path: 'insights',
        element: <InsightsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
