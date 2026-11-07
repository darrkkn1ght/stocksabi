import React, { useState, useEffect } from 'react'
import { Store, RotateCcw, Database, Download, UploadCloud, Check } from 'lucide-react'
import { useAuth } from '../../lib/AuthContext'
import { loadDemoData, resetDemoData } from '../../lib/demoData'
import { backupLocalStorage, getMigrationPreview, migrateDataToSupabase } from '../../lib/migration'
import { PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export const SettingsPage: React.FC = () => {
  const { business, updateBusinessProfile } = useAuth()
  const [name, setName] = useState(business?.name || 'Tunde Provisions')
  const [location, setLocation] = useState(business?.location || 'Ibadan, Oyo State')
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)

  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null)

  useEffect(() => {
    if (business) {
      setName(business.name || 'Tunde Provisions')
      setLocation(business.location || 'Ibadan, Oyo State')
    }
  }, [business])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)
    setProfileSaved(false)
    await updateBusinessProfile({ name, location })
    setIsSavingProfile(false)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  const handleMigration = async () => {
    if (!business) return
    const preview = getMigrationPreview()
    if (preview.products === 0 && preview.sales === 0 && preview.expenses === 0) {
      alert("No local data found to migrate.")
      return
    }

    if (window.confirm(`Found ${preview.products} products, ${preview.sales} sales, and ${preview.expenses} expenses locally. Are you sure you want to migrate these to your cloud business account? (It is recommended to backup first)`)) {
      setIsMigrating(true)
      setMigrationStatus("Migrating...")
      try {
        const res = await migrateDataToSupabase(business.id)
        setMigrationStatus(`Success: Migrated ${res.products.success} products, ${res.sales.success} sales, ${res.expenses.success} expenses. Failed: ${res.products.failed + res.sales.failed + res.expenses.failed}`)
      } catch (err: any) {
        console.error(err)
        setMigrationStatus(`Migration failed: ${err.message}`)
      } finally {
        setIsMigrating(false)
      }
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Settings & Store Profile"
        subtitle="Manage business information, currency preferences, and demo environment."
      />

      {/* Store Profile Card */}
      <form onSubmit={handleSaveProfile} className="bg-white border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E5E4DA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[8px] bg-[#DDE8FF] text-[#17243A] flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#202820]">Business Details</h3>
              <p className="text-xs text-[#73796F]">Store identity shown across your workspace</p>
            </div>
          </div>
          {profileSaved && (
            <span className="text-xs font-bold text-[#367A53] flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="space-y-4 pt-2">
          <Input
            label="Business Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Store Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input label="Operating Currency" defaultValue="Nigerian Naira (NGN, ₦)" disabled />
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="primary" size="sm" isLoading={isSavingProfile}>
            Save Changes
          </Button>
        </div>
      </form>

      {/* Data Migration Card */}
      <div className="bg-[#F0F4F8] border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E4DA]">
          <div className="w-9 h-9 rounded-[8px] bg-blue-100 text-blue-700 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#202820]">Data Backup & Cloud Sync</h3>
            <p className="text-xs text-[#73796F]">Export local data as JSON or migrate to cloud account</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={backupLocalStorage}
          >
            Backup Local Data
          </Button>
          
          <Button
            type="button"
            variant="primary"
            size="sm"
            leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
            onClick={handleMigration}
            disabled={isMigrating || !business}
          >
            {isMigrating ? 'Migrating...' : 'Migrate to Cloud'}
          </Button>
        </div>
        {migrationStatus && (
          <p className="text-xs font-medium text-blue-700 mt-2">{migrationStatus}</p>
        )}
      </div>

      {/* Demo Reset Card */}
      <div className="bg-[#F7F5EF] border border-[#E5E4DA] rounded-[16px] p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-[#17243A]">Demo Mode</h3>
          <p className="text-xs text-[#73796F] leading-relaxed mt-1">
            Load a realistic sample retail business to explore STOCKSABI during live demonstrations.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              if (window.confirm("This will replace the current data with fresh sample business data. Continue?")) {
                loadDemoData()
              }
            }}
          >
            Load Demo Business
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#B74C43]" />}
            onClick={() => {
              if (window.confirm("This will remove all demo data and return the application to an empty state. Continue?")) {
                resetDemoData()
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
