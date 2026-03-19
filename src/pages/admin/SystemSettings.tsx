import { useState } from 'react'
import { Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function SystemSettings() {
  const [settings, setSettings] = useState({
    platformName: 'gxq.studio',
    supportEmail: 'support@gxq.studio',
    maxUsersPerTenant: '100',
    sessionTimeout: '3600',
    enableRegistrations: true,
    enableWalletAuth: true,
    enableDevAccess: true,
    maintenanceMode: false,
  })

  const handleSave = () => {
    alert('Settings saved (demo only)')
  }

  const toggle = (key: 'enableRegistrations' | 'enableWalletAuth' | 'enableDevAccess' | 'maintenanceMode') => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const boolKeys: ('enableRegistrations' | 'enableWalletAuth' | 'enableDevAccess' | 'maintenanceMode')[] = ['enableRegistrations', 'enableWalletAuth', 'enableDevAccess', 'maintenanceMode']
  const boolLabels: Record<string, string> = {
    enableRegistrations: 'Allow new registrations',
    enableWalletAuth: 'Enable wallet authentication',
    enableDevAccess: 'Enable developer access tier',
    maintenanceMode: 'Maintenance mode',
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-100">System Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure platform-wide settings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader><CardTitle>General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Platform Name"
              value={settings.platformName}
              onChange={e => setSettings(p => ({ ...p, platformName: e.target.value }))}
            />
            <Input
              label="Support Email"
              type="email"
              value={settings.supportEmail}
              onChange={e => setSettings(p => ({ ...p, supportEmail: e.target.value }))}
            />
            <Input
              label="Max Users Per Tenant"
              type="number"
              value={settings.maxUsersPerTenant}
              onChange={e => setSettings(p => ({ ...p, maxUsersPerTenant: e.target.value }))}
            />
            <Input
              label="Session Timeout (seconds)"
              type="number"
              value={settings.sessionTimeout}
              onChange={e => setSettings(p => ({ ...p, sessionTimeout: e.target.value }))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Feature Flags</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {boolKeys.map(key => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-surface-600/30 last:border-0">
                <span className="text-sm text-gray-300">{boolLabels[key]}</span>
                <button
                  onClick={() => toggle(key)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${settings[key] ? 'bg-brand-500' : 'bg-surface-600'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${settings[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button icon={<Save size={14} />} onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  )
}
