import React from 'react'
import { Store, RotateCcw } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Settings & Store Profile"
        subtitle="Manage business information, currency preferences, and demo environment."
      />

      {/* Store Profile Card */}
      <div className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E4DA]">
          <div className="w-9 h-9 rounded-[8px] bg-[#E8F1EC] text-[#174B3A] flex items-center justify-center">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#202820]">Business Details</h3>
            <p className="text-xs text-[#73796F]">Store identity shown on sales receipts</p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <Input label="Business Name" defaultValue="Tunde Provisions" />
          <Input label="Store Location" defaultValue="Ibadan, Oyo State" />
          <Input label="Operating Currency" defaultValue="Nigerian Naira (NGN, ₦)" disabled />
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-[#174B3A]">Demo Mode</h3>
          <p className="text-xs text-[#73796F] leading-relaxed mt-1">
            Load a realistic sample retail business to explore STOCKSABI.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (window.confirm("This will replace the current local demo data with a sample business. Continue?")) {
                import('../../lib/demoData').then(({ loadDemoData }) => {
                  loadDemoData()
                  alert("Demo business loaded successfully.")
                })
              }
            }}
          >
            Load Demo Business
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#B74C43]" />}
            onClick={() => {
              if (window.confirm("This will remove all demo data and return the application to an empty state. Continue?")) {
                import('../../lib/demoData').then(({ resetDemoData }) => {
                  resetDemoData()
                  alert("Demo data has been reset.")
                })
              }
            }}
          >
            Reset Demo Data
          </Button>
        </div>
      </div>
    </div>
  )
}
