import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from '../lib/AuthContext'
import { DataProvider } from '../lib/DataContext'

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  )
}

export default App
