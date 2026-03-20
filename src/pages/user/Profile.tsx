import { useState } from 'react'
import { Save, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/contexts/AuthContext'
import { formatAddress } from '@/lib/utils'
import type { Role } from '@/types/roles'

const roleBadge: Record<Role, 'brand' | 'info' | 'success'> = {
  admin: 'brand',
  dev: 'info',
  user: 'success',
}

export function Profile() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.display_name ?? '')
  const [bio, setBio] = useState('')

  return (
    <div className="space-y-5 max-w-2xl">
      <h1 className="text-xl font-bold text-gray-100">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          {user?.role && <Badge variant={roleBadge[user.role]}>{user.role}</Badge>}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
              {name[0]?.toUpperCase() ?? 'U'}
            </div>
            <div>
              <p className="font-medium text-gray-100">{name || 'Your Name'}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <Input label="Display Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Bio</label>
            <textarea
              className="rounded-lg border border-surface-600 bg-surface-700 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
            />
          </div>
        </CardContent>
      </Card>

      {user?.wallet_address && (
        <Card>
          <CardHeader>
            <CardTitle>Connected Wallet</CardTitle>
            <Wallet size={16} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 bg-surface-700 rounded-lg px-4 py-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <code className="text-sm text-gray-300 font-mono">
                {formatAddress(user.wallet_address, 6)}
              </code>
              <Badge variant="success" className="ml-auto">Connected</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Button icon={<Save size={14} />} onClick={() => alert('Saved (demo)')}>Save Changes</Button>
    </div>
  )
}
